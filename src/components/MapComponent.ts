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
    // For demonstration, create a simple grid layout of districts
    // In a production app, this would load actual GeoJSON or SVG paths
    const gridSize = 5;
    const rectWidth = 100;
    const rectHeight = 100;
    const padding = 5;

    DISTRICTS.forEach((district, index) => {
      const row = Math.floor(index / gridSize);
      const col = index % gridSize;
      const x = col * (rectWidth + padding);
      const y = row * (rectHeight + padding);

      this.g.append('rect')
        .attr('x', x)
        .attr('y', y)
        .attr('width', rectWidth)
        .attr('height', rectHeight)
        .attr('class', 'district')
        .attr('data-district', district.number)
        .attr('data-name', district.name)
        .attr('rx', 4) // Rounded corners
        .on('click', () => {
          this.handleDistrictClick(district.number);
        })
        .on('mouseover', function() {
          d3.select(this).classed('hover', true);
        })
        .on('mouseout', function() {
          d3.select(this).classed('hover', false);
        });

      // Add district number as text
      this.g.append('text')
        .attr('x', x + rectWidth / 2)
        .attr('y', y + rectHeight / 2)
        .attr('text-anchor', 'middle')
        .attr('dominant-baseline', 'middle')
        .attr('font-size', '14px')
        .attr('font-weight', 'bold')
        .attr('fill', '#333')
        .attr('pointer-events', 'none')
        .text(district.number);
    });

    this.fitToViewBox();
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
    this.g.selectAll<SVGRectElement, unknown>('.district').each((_d, i, nodes) => {
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
