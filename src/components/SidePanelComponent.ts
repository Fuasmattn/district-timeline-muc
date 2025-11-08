import * as d3 from 'd3';
import type { AggregatedDistrictData } from '../types';
import { DISTRICTS, DISTRICT_IMAGES } from '../data/districts';

export class SidePanelComponent {
  private panel: HTMLElement;
  private closeBtn: HTMLElement;
  private districtImage: HTMLImageElement;
  private districtName: HTMLElement;
  private districtInfo: HTMLElement;
  private districtChart: HTMLElement;

  constructor() {
    this.panel = document.getElementById('side-panel')!;
    this.closeBtn = document.getElementById('close-panel')!;
    this.districtImage = document.getElementById('district-image') as HTMLImageElement;
    this.districtName = document.getElementById('district-name')!;
    this.districtInfo = document.getElementById('district-info')!;
    this.districtChart = document.getElementById('district-chart')!;

    this.closeBtn.addEventListener('click', () => this.hide());
  }

  public show(districtNumber: number, data: Map<number, AggregatedDistrictData>, currentYear: number) {
    const district = DISTRICTS.find(d => d.number === districtNumber);
    const districtData = data.get(districtNumber);

    if (!district || !districtData) return;

    // Update image
    const imagePath = DISTRICT_IMAGES[districtNumber];
    if (imagePath) {
      this.districtImage.src = imagePath;
      this.districtImage.alt = district.name;
      this.districtImage.style.display = 'block';
      // Use placeholder if image doesn't exist
      this.districtImage.onerror = () => {
        this.districtImage.style.display = 'none';
      };
    } else {
      this.districtImage.style.display = 'none';
    }

    // Update name
    this.districtName.textContent = `${district.number}. ${district.name}`;

    // Update info
    this.updateInfo(districtData, currentYear);

    // Update chart
    this.updateChart(districtData);

    // Show panel
    this.panel.classList.remove('hidden');
  }

  public hide() {
    this.panel.classList.add('hidden');
  }

  private updateInfo(districtData: AggregatedDistrictData, currentYear: number) {
    const currentValue = districtData.yearlyData.get(currentYear);
    
    this.districtInfo.innerHTML = `
      <div class="info-item">
        <span class="info-label">District Name:</span>
        <span class="info-value">${districtData.districtName}</span>
      </div>
      <div class="info-item">
        <span class="info-label">Average Age (${currentYear}):</span>
        <span class="info-value">${currentValue !== undefined ? currentValue.toFixed(1) + ' years' : 'N/A'}</span>
      </div>
    `;
  }

  private updateChart(districtData: AggregatedDistrictData) {
    this.districtChart.innerHTML = '<div class="chart-title">Age Trend Over Time</div>';

    const years = Array.from(districtData.yearlyData.keys()).sort();
    const values = years.map(year => districtData.yearlyData.get(year)!);

    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const width = 320 - margin.left - margin.right;
    const height = 200 - margin.top - margin.bottom;

    const svg = d3.select(this.districtChart)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const x = d3.scaleLinear()
      .domain([d3.min(years)!, d3.max(years)!])
      .range([0, width]);

    const y = d3.scaleLinear()
      .domain([d3.min(values)! * 0.95, d3.max(values)! * 1.05])
      .range([height, 0]);

    // Area
    const area = d3.area<number>()
      .x((_value, i) => x(years[i]))
      .y0(height)
      .y1(value => y(value));

    svg.append('path')
      .datum(values)
      .attr('class', 'area')
      .attr('d', area);

    // Line
    const line = d3.line<number>()
      .x((_value, i) => x(years[i]))
      .y(value => y(value));

    svg.append('path')
      .datum(values)
      .attr('class', 'area-line')
      .attr('d', line);

    // X Axis
    svg.append('g')
      .attr('class', 'axis')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x).ticks(5).tickFormat(d => d.toString()));

    // Y Axis
    svg.append('g')
      .attr('class', 'axis')
      .call(d3.axisLeft(y).ticks(5));

    // Add label
    svg.append('text')
      .attr('transform', `translate(${width / 2},${height + margin.bottom})`)
      .style('text-anchor', 'middle')
      .style('font-size', '12px')
      .text('Year');
  }
}
