import './styles/main.css';
import { MapComponent } from './components/MapComponent';
import { LegendComponent } from './components/LegendComponent';
import { SidePanelComponent } from './components/SidePanelComponent';
import { loadDistrictData, aggregateDataByDistrict, getColorScale } from './utils/dataUtils';
import type { AggregatedDistrictData } from './types';

class App {
  private mapComponent?: MapComponent;
  private legendComponent?: LegendComponent;
  private sidePanelComponent?: SidePanelComponent;
  private data?: Map<number, AggregatedDistrictData>;
  private currentYear: number = 2019;

  async init() {
    try {
      // Show loading state
      this.showLoading();

      // Load and process data
      const rawData = await loadDistrictData();
      this.data = aggregateDataByDistrict(rawData);

      // Get available years
      const allYears = new Set<number>();
      this.data.forEach(district => {
        district.yearlyData.forEach((_, year) => allYears.add(year));
      });
      
      const years = Array.from(allYears).sort();
      const minYear = Math.min(...years);
      const maxYear = Math.max(...years);
      
      // Update slider
      const slider = document.getElementById('year-slider') as HTMLInputElement;
      slider.min = minYear.toString();
      slider.max = maxYear.toString();
      slider.value = maxYear.toString();
      this.currentYear = maxYear;
      
      // Update year display
      document.getElementById('year-display')!.textContent = this.currentYear.toString();

      // Initialize components
      const mapContainer = document.getElementById('map')!;
      const legendContainer = document.getElementById('legend')!;

      this.mapComponent = new MapComponent(mapContainer, this.data);
      this.legendComponent = new LegendComponent(legendContainer);
      this.sidePanelComponent = new SidePanelComponent();

      // Set up event handlers
      this.mapComponent.setDistrictClickHandler((districtNumber) => {
        if (districtNumber > 0) {
          this.sidePanelComponent!.show(districtNumber, this.data!, this.currentYear);
        } else {
          this.sidePanelComponent!.hide();
        }
      });

      slider.addEventListener('input', (e) => {
        const target = e.target as HTMLInputElement;
        this.currentYear = parseInt(target.value);
        document.getElementById('year-display')!.textContent = this.currentYear.toString();
        this.updateVisualization();
      });

      // Initial render
      this.updateVisualization();

      // Hide loading state
      this.hideLoading();

    } catch (error) {
      console.error('Error initializing app:', error);
      this.showError('Failed to load data. Please refresh the page.');
    }
  }

  private updateVisualization() {
    if (!this.data || !this.mapComponent || !this.legendComponent) return;

    const colorScale = getColorScale(this.data, this.currentYear);
    this.mapComponent.updateColors(this.currentYear, colorScale);
    this.legendComponent.render(colorScale, `Average Age (${this.currentYear})`);
  }

  private showLoading() {
    const mapContainer = document.getElementById('map')!;
    mapContainer.innerHTML = '<div class="loading"><div class="spinner"></div></div>';
  }

  private hideLoading() {
    const loadingEl = document.querySelector('.loading');
    if (loadingEl) {
      loadingEl.remove();
    }
  }

  private showError(message: string) {
    const mapContainer = document.getElementById('map')!;
    mapContainer.innerHTML = `<div style="padding: 2rem; text-align: center; color: #d32f2f;">${message}</div>`;
  }
}

// Initialize the app
const app = new App();
app.init();
