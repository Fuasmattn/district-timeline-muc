import * as d3 from 'd3';
import Raphael from 'raphael';
import { ColorLuminance } from './utils.js';
import { initMap } from './map.js';

// Initialize the application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  initMap();
  showExample();
  addTimeline();
  initNativeSlider();
});

function showExample() {
  const margin = { top: 20, right: 20, bottom: 30, left: 50 };
  const width = 200;
  const height = 100;

  const x = d3.scaleLinear().range([0, width]);
  const y = d3.scaleLinear().range([height, 0]);

  const yAxis = d3.axisLeft(y).ticks(4);

  const area = d3.area()
    .x(d => x(d.JAHR))
    .y0(height)
    .y1(d => y(d.INDIKATOR_WERT));

  const valueline = d3.line()
    .x(d => x(d.JAHR))
    .y(d => y(d.INDIKATOR_WERT));

  const svg = d3.select("#test").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  d3.csv('/data.csv').then(data => {
    let districtName;

    // Filter valid entries
    const filteredData = data.filter(a => {
      return !isNaN(a.INDIKATOR_WERT) && a.INDIKATOR_WERT > 0 && a.NUMMER == 7;
    });

    filteredData.forEach(d => {
      districtName = d.NAME;
      console.log(d.INDIKATOR_AUSPRAEGUNG);
      d.JAHR = +d.JAHR;
      d.INDIKATOR_WERT = +d.INDIKATOR_WERT;
    });

    x.domain(d3.extent(filteredData, d => d.JAHR));
    y.domain([0, d3.max(filteredData, d => d.INDIKATOR_WERT)]);

    d3.select("#districtName").html(districtName.substr(3));

    svg.append("path")
      .datum(filteredData)
      .attr("class", "area")
      .attr("d", area);

    svg.append("path")
      .attr("class", "arealine")
      .attr("d", valueline(filteredData));

    svg.append("g")
      .attr("class", "y axis")
      .call(yAxis);

    svg.append("text")
      .attr("transform", `translate(${width / 2},${height + margin.bottom - 5})`)
      .style("text-anchor", "middle")
      .text(`Average age (since ${d3.min(filteredData, d => d.JAHR)})`);
  }).catch(error => {
    console.error('Error loading data:', error);
  });
}

function addTimeline() {
  const timeline = document.getElementById('timeline');
  for (let i = 2015; i > 2000; i--) {
    const li = document.createElement('li');
    li.textContent = i;
    timeline.appendChild(li);
  }
}

function initNativeSlider() {
  const slider = document.getElementById('slider');
  const output = document.getElementById('sliderValue');
  
  // Display the default slider value
  if (output) {
    output.textContent = slider.value || slider.max;
  }

  // Update the current slider value (each time you drag the slider handle)
  slider.addEventListener('input', function() {
    if (output) {
      output.textContent = this.value;
    }
    // Here you can add logic to update the visualization based on the year
    console.log('Selected year:', this.value);
  });
}

export { showExample, addTimeline, initNativeSlider };
