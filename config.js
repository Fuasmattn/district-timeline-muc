/**
 * Configuration file for Munich District Timeline
 * 
 * This file centralizes all configuration options for the application,
 * making it easy to modify data sources, display settings, and other parameters.
 */

var Config = {
  /**
   * Data Source Configuration
   */
  data: {
    // Path to the CSV data file (relative to index.html)
    // Can be a local file or URL
    csvPath: 'data.csv',
    
    // Alternative: Use the original URL from Munich Open Data Portal
    // Uncomment the line below to use remote data instead of local file
    // csvPath: 'https://www.opengov-muenchen.de/dataset/9b072087-6098-4558-b221-01e7d119b512/resource/9177f886-7341-49d2-9bfa-15d4d8631327/download/indikatorenatlas2103bevoelkerungaltersdurchschnitt.csv',
    
    // Expected column names in CSV
    columns: {
      indicator: 'Indikator',
      expression: 'Ausprägung',
      year: 'Jahr',
      district: 'Räumliche Gliederung',
      value: 'Indikatorwert'
    }
  },

  /**
   * Map Configuration
   */
  map: {
    // Raphael canvas dimensions
    width: 600,
    height: 600,
    
    // ViewBox settings for map positioning
    viewBox: {
      x: 0,
      y: 150,
      width: 600,
      height: 450
    },
    
    // Default district colors
    colors: {
      default: '#E0E9F6',    // Light blue
      border: '#ffffff',      // White borders
      borderWidth: '0.8'
    },
    
    // Hover effect settings
    hover: {
      luminosityAdjustment: -0.05  // Darken by 5% on hover
    }
  },

  /**
   * Timeline Configuration
   */
  timeline: {
    // Year range for timeline
    minYear: 2001,
    maxYear: 2015,  // Note: Data extends to 2019, but UI currently shows 2001-2015
    
    // Slider settings
    slider: {
      step: 1,
      defaultYear: 2015
    }
  },

  /**
   * Chart Configuration
   */
  chart: {
    // D3 chart dimensions
    margin: {
      top: 20,
      right: 20,
      bottom: 30,
      left: 50
    },
    width: 200,
    height: 100,
    
    // Number of ticks on axes
    ticks: {
      x: 4,
      y: 4
    }
  },

  /**
   * Display Configuration
   */
  display: {
    // Default district to show on load
    defaultDistrict: 7,  // Sendling - Westpark
    
    // District image path pattern
    // {district} will be replaced with district name
    districtImagePath: 'img/districts/{district}.png',
    
    // Text labels
    labels: {
      chartYearLabel: 'Average age (since {minYear})',
      districtNamePlaceholder: 'Bezirkname'
    }
  },

  /**
   * Development/Debug Configuration
   */
  debug: {
    // Enable console logging
    enabled: false,
    
    // Log data filtering
    logFiltering: false,
    
    // Log map interactions
    logInteractions: false
  }
};

// Export for Node.js environment (tests)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Config;
}
