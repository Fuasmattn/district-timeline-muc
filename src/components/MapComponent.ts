import * as d3 from 'd3';
import type { AggregatedDistrictData } from '../types';
import { DISTRICTS } from '../data/districts';

export class MapComponent {
  private svg: d3.Selection<SVGSVGElement, unknown, null, undefined>;
  private g: d3.Selection<SVGGElement, unknown, null, undefined>;
  private selectedDistrict: number | null = null;
  private onDistrictClick?: (districtNumber: number) => void;

  constructor(
    container: HTMLElement,
    private data: Map<number, AggregatedDistrictData>
  ) {
    // Create SVG
    this.svg = d3.select(container)
      .append('svg')
      .attr('viewBox', '0 0 600 600')
      .attr('preserveAspectRatio', 'xMidYMid meet');

    this.g = this.svg.append('g');
    
    this.loadSVGPaths();
  }

  private async loadSVGPaths() {
    try {
      const response = await fetch('/map.svg');
      const svgText = await response.text();
      
      // Parse the SVG
      const parser = new DOMParser();
      const svgDoc = parser.parseFromString(svgText, 'image/svg+xml');
      
      // Extract all path elements
      const paths = svgDoc.querySelectorAll('path[id^="path"]');
      
      paths.forEach((pathEl) => {
        const id = pathEl.getAttribute('id');
        const d = pathEl.getAttribute('d');
        
        if (id && d) {
          const district = DISTRICTS.find(dist => dist.id === id);
          if (district) {
            this.createDistrictPath(d, district.number, district.name);
          }
        }
      });
      
      this.fitToViewBox();
    } catch (error) {
      console.error('Error loading SVG paths:', error);
      this.createFallbackPaths();
    }
  }

  private createFallbackPaths() {
    // Use the paths from the old map.js if SVG loading fails
    const pathData = {
      path25: "M 336.057,292.342 335.809,295.34 336.809,304.583 336.057,304.583 337.557,315.076 320.07,315.326 316.074,317.073 316.074,316.573 314.076,316.075 313.076,316.573 302.084,314.576 297.837,315.076 291.342,314.826 287.596,314.076 282.099,311.828 272.108,308.331 264.364,306.332 260.116,303.835 257.37,304.083 250.874,302.085 242.131,300.087 234.136,298.337 233.637,297.589 230.14,295.09 224.894,292.342 225.394,289.345 227.392,287.346 227.141,278.104 232.138,276.105 231.388,270.11 218.898,255.372 228.891,251.625 228.891,251.374 230.639,250.874 230.39,246.128 235.135,247.628 235.386,246.128 234.635,241.632 235.135,236.136 234.886,234.388 234.635,231.14 234.635,230.142 237.633,224.645 237.883,223.646 236.884,218.65 239.132,218.4 239.132,215.653 238.133,213.403 238.133,212.405 238.633,211.656 238.883,210.656 237.633,207.409 238.133,203.412 250.625,199.664 250.625,198.166 253.372,198.166 256.37,199.164 259.118,199.664 262.864,201.164 268.611,202.911 283.599,212.155 285.347,212.405 291.342,230.89 292.841,231.888 296.338,231.888 296.338,233.638 301.084,234.887 309.83,237.136 309.83,237.635 314.324,238.633 314.574,239.883 319.07,240.382 321.318,241.883 323.316,247.628 335.059,245.629 334.811,247.628 335.307,247.628 336.057,249.875 335.059,249.875 337.059,254.872 333.809,254.872 333.059,255.122 333.059,255.372 334.309,255.872 332.811,260.617 332.811,261.616 334.561,277.604 335.059,286.348 z",
      // Add more paths as needed...
    };

    Object.entries(pathData).forEach(([id, d]) => {
      const district = DISTRICTS.find(dist => dist.id === id);
      if (district) {
        this.createDistrictPath(d, district.number, district.name);
      }
    });
  }

  private createDistrictPath(pathData: string, number: number, name: string) {
    this.g.append('path')
      .attr('d', pathData)
      .attr('class', 'district')
      .attr('data-district', number)
      .attr('data-name', name)
      .on('click', () => {
        this.handleDistrictClick(number);
      })
      .on('mouseover', function() {
        d3.select(this).classed('hover', true);
      })
      .on('mouseout', function() {
        d3.select(this).classed('hover', false);
      });
  }

  private fitToViewBox() {
    try {
      const bbox = this.g.node()?.getBBox();
      if (bbox) {
        const padding = 20;
        this.svg.attr('viewBox', 
          `${bbox.x - padding} ${bbox.y - padding} ${bbox.width + padding * 2} ${bbox.height + padding * 2}`
        );
      }
    } catch (e) {
      console.error('Error fitting to viewBox:', e);
    }
  }

  private handleDistrictClick(districtNumber: number) {
    // Deselect previous
    if (this.selectedDistrict === districtNumber) {
      this.selectedDistrict = null;
      this.g.selectAll('.district').classed('selected', false);
      if (this.onDistrictClick) {
        this.onDistrictClick(0); // Pass 0 to indicate deselection
      }
    } else {
      this.selectedDistrict = districtNumber;
      this.g.selectAll('.district').classed('selected', false);
      this.g.selectAll(`[data-district="${districtNumber}"]`).classed('selected', true);
      if (this.onDistrictClick) {
        this.onDistrictClick(districtNumber);
      }
    }
  }

  public updateColors(year: number, colorScale: d3.ScaleSequential<string>) {
    this.g.selectAll<SVGPathElement, unknown>('.district').each((_d, i, nodes) => {
      const element = nodes[i];
      const districtNumber = parseInt(element.getAttribute('data-district') || '0');
      const districtData = this.data.get(districtNumber);
      const value = districtData?.yearlyData.get(year);
      
      if (value !== undefined) {
        d3.select(element).style('fill', colorScale(value));
      } else {
        d3.select(element).style('fill', '#e0e9f6');
      }
    });
  }

  public setDistrictClickHandler(handler: (districtNumber: number) => void) {
    this.onDistrictClick = handler;
  }

  public destroy() {
    this.svg.remove();
  }
}
