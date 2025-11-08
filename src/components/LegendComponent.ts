import * as d3 from 'd3';

export class LegendComponent {
  private container: HTMLElement;

  constructor(container: HTMLElement) {
    this.container = container;
  }

  public render(colorScale: d3.ScaleSequential<string>, title: string = 'Average Age') {
    this.container.innerHTML = '';

    const legendDiv = document.createElement('div');
    
    const titleEl = document.createElement('div');
    titleEl.className = 'legend-title';
    titleEl.textContent = title;
    legendDiv.appendChild(titleEl);

    const scaleDiv = document.createElement('div');
    scaleDiv.className = 'legend-scale';

    // Create gradient
    const domain = colorScale.domain();
    const steps = 100;
    const gradient = Array.from({ length: steps }, (_, i) => {
      const value = domain[0] + (domain[1] - domain[0]) * (i / (steps - 1));
      return colorScale(value);
    });

    const gradientDiv = document.createElement('div');
    gradientDiv.className = 'legend-gradient';
    gradientDiv.style.background = `linear-gradient(to right, ${gradient.join(', ')})`;
    scaleDiv.appendChild(gradientDiv);

    legendDiv.appendChild(scaleDiv);

    // Add labels
    const labelsDiv = document.createElement('div');
    labelsDiv.className = 'legend-labels';
    
    const minLabel = document.createElement('span');
    minLabel.textContent = domain[0].toFixed(1);
    
    const maxLabel = document.createElement('span');
    maxLabel.textContent = domain[1].toFixed(1);
    
    labelsDiv.appendChild(minLabel);
    labelsDiv.appendChild(maxLabel);
    legendDiv.appendChild(labelsDiv);

    this.container.appendChild(legendDiv);
  }
}
