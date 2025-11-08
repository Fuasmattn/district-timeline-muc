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
      // Load the SVG file containing district boundaries
      const response = await fetch('/map.svg');
      const svgText = await response.text();
      
      // Parse the SVG
      const parser = new DOMParser();
      const svgDoc = parser.parseFromString(svgText, 'image/svg+xml');
      
      // Extract all polygon elements that represent districts
      const polygons = svgDoc.querySelectorAll('polygon[id^="path"]');
      
      polygons.forEach((polygon) => {
        const id = polygon.getAttribute('id');
        const points = polygon.getAttribute('points');
        
        if (id && points) {
          // Extract district number from id (e.g., "path1" -> 1)
          const match = id.match(/path(\d+)/);
          if (match) {
            const districtNum = parseInt(match[1]);
            const district = DISTRICTS.find(d => d.number === districtNum);
            
            if (district) {
              // Convert points to path data
              const pathData = this.pointsToPath(points);
              this.createDistrictPath(pathData, district.number, district.name);
            }
          }
        }
      });
      
      this.fitToViewBox();
    } catch (error) {
      console.error('Error loading SVG paths:', error);
      this.createFallbackGrid();
    }
  }

  private pointsToPath(points: string): string {
    // Convert SVG polygon points to path data
    const coords = points.trim().split(/\s+/);
    if (coords.length === 0) return '';
    
    const pairs: string[] = [];
    for (let i = 0; i < coords.length; i += 2) {
      if (i + 1 < coords.length) {
        pairs.push(`${coords[i]},${coords[i + 1]}`);
      }
    }
    
    if (pairs.length === 0) return '';
    
    // Create path: M (move to first point) L (line to subsequent points) Z (close path)
    return `M ${pairs[0]} L ${pairs.slice(1).join(' ')} Z`;
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

  private createFallbackGrid() {
    // Fallback grid layout if SVG loading fails
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
        .attr('rx', 4)
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
    this.g.selectAll<SVGPathElement | SVGRectElement, unknown>('.district').each((_d, i, nodes) => {
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
