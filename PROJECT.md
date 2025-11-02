# Munich District Timeline - Project Documentation

## Overview

This project is an interactive visualization showing demographic data (average age) across Munich's 25 districts over time (2000-2019). It presents the data on an SVG map of Munich where each district can be explored individually.

## Technology Stack

### Current Implementation (Circa 2015)

- **Frontend Framework**: jQuery 2.1.3, Materialize 0.97.3
- **Visualization Libraries**: 
  - D3.js v3 for charts and data processing
  - Raphael.js for SVG map rendering
  - Ion Range Slider for timeline controls
- **Data Format**: CSV (from Munich Open Data Portal)
- **Architecture**: Single-page application with inline JavaScript

### File Structure

```
district-timeline-muc/
├── index.html                 # Main HTML file with embedded map SVG paths
├── data.csv                   # Demographic data (average age by district/year)
├── map.js                     # Raphael SVG map definitions (alternative to inline)
├── raphael-min.js            # Raphael.js library
├── css/
│   ├── ion.rangeSlider*.css  # Range slider styles
│   ├── normalize.css          # CSS reset
│   └── style.css              # Custom styles
├── js/
│   ├── d3.js / d3.min.js     # D3.js v3 library
│   ├── interaction.js         # Core application logic
│   └── ion.rangeSlider*.js   # Range slider library
├── img/
│   └── districts/             # District images
└── München_-_Stadtbezirke*.svg # Source SVG map files
```

## Data Structure

### CSV Format (data.csv)

The data comes from Munich's Open Data portal and contains demographic indicators:

**Columns:**
- `Indikator`: Indicator type (e.g., "Altersdurchschnitt" = Average Age)
- `Ausprägung`: Population group (e.g., "Deutsche" = German citizens)
- `Jahr`: Year (2000-2019)
- `Räumliche Gliederung`: Geographic unit (district name with number prefix)
- `Indikatorwert`: Indicator value (e.g., average age)
- `Basiswert 1-5`: Base values for calculation
- `Name Basiswert 1-5`: Names of base values

**Districts (25 total):**
1. Altstadt - Lehel
2. Ludwigsvorstadt - Isarvorstadt
3. Maxvorstadt
4. Schwabing - West
5. Au - Haidhausen
6. Sendling
7. Sendling - Westpark
8. Schwanthalerhöhe
9. Neuhausen - Nymphenburg
10. Moosach
11. Milbertshofen - Am Hart
12. Schwabing - Freimann
13. Bogenhausen
14. Berg am Laim
15. Trudering - Riem
16. Ramersdorf - Perlach
17. Obergiesing - Fasangarten
18. Untergiesing - Harlaching
19. Thalkirchen - Obersendling - Forstenried - Fürstenried - Solln
20. Hadern
21. Pasing - Obermenzing
22. Aubing - Lochhausen - Langwied
23. Allach - Untermenzing
24. Feldmoching - Hasenbergl
25. Laim

## Application Components

### 1. Map Visualization (index.html)

The main HTML file contains:
- 25 SVG path elements representing Munich districts
- Interactive map rendered using Raphael.js
- Mouse hover effects (luminosity changes)
- Click handlers for district selection

### 2. Data Processing (js/interaction.js)

Key functions:
- `showExample()`: Loads CSV data, filters by district, creates D3 area chart
- `addTimeline()`: Generates year list (2015-2001) for timeline navigation
- `ColorLuminance()`: Utility function for color adjustments on hover

**Current Implementation:**
- Hardcoded to show district #7 (Sendling - Westpark)
- Filters data by district number (`NUMMER == 7`)
- Creates small area chart showing age trends

### 3. User Interface

**Left Panel:**
- District name display
- District image
- D3.js area chart showing age trends

**Right Panel:**
- Timeline years list
- Range slider for year selection (2001-2015)

**Center:**
- Interactive SVG map of Munich
- Hover effects on districts
- Click to select and view district details

## Data Flow

1. **Page Load**: 
   - jQuery loads HTML structure
   - Raphael creates SVG map with district paths
   - D3.js loads data.csv

2. **Data Processing**:
   - CSV parsed by D3
   - Filtered by district and valid values
   - Converted to time series format

3. **Visualization**:
   - Area chart rendered in left panel
   - Map colors updated based on data
   - Timeline controls enable year navigation

4. **User Interaction**:
   - Hover on district: color changes
   - Click district: updates left panel chart
   - Slider changes: updates visualization for selected year

## Known Issues & Limitations

### Technical Debt
1. **Outdated Dependencies**: Libraries from 2015 (jQuery 2.1.3, D3 v3, Materialize 0.97.3)
2. **No Build System**: No npm, webpack, or module bundler
3. **Inline JavaScript**: Map paths embedded directly in HTML
4. **Hardcoded Values**: District #7 hardcoded, no configuration
5. **No Tests**: No unit or integration tests
6. **No Documentation**: Minimal code comments

### Functionality Issues
1. **Limited Interactivity**: Timeline slider not fully connected to visualization
2. **Single District**: Only shows one district at a time
3. **Hardcoded Data Source**: CSV path not configurable
4. **No Error Handling**: No fallback for missing data or network errors

## Data Source

Original data from Munich Open Data Portal:
- URL: https://www.opengov-muenchen.de/dataset/9b072087-6098-4558-b221-01e7d119b512/resource/9177f886-7341-49d2-9bfa-15d4d8631327/download/indikatorenatlas2103bevoelkerungaltersdurchschnitt.csv
- Indicator: Average Age by District
- License: Open Data (check Munich portal for specific license)
- Update Frequency: Periodic (check portal for updates)

## Future Improvements

### High Priority
- [ ] Add test infrastructure
- [ ] Create configuration file for data source
- [ ] Update to modern library versions (D3 v7, vanilla JS or modern framework)
- [ ] Modularize code structure

### Medium Priority
- [ ] Connect timeline slider to visualizations
- [ ] Add multiple district comparison
- [ ] Improve mobile responsiveness
- [ ] Add data export functionality

### Low Priority
- [ ] Add more indicators beyond average age
- [ ] Historical data animation
- [ ] Statistical analysis tools
- [ ] Print-friendly views

## Development Setup

### Current Setup (No Build Required)

1. Clone repository
2. Open `index.html` in a web browser
3. No build step or server needed (all client-side)

### Future Setup (With Build System)

Will include:
- `package.json` for dependency management
- Build scripts for bundling
- Development server with hot reload
- Test runner configuration

## Browser Compatibility

Targets modern browsers (2015 era):
- Chrome 40+
- Firefox 35+
- Safari 8+
- IE 11+ (with polyfills)

## License

Check repository for license information.

## Contributors

See git history for contributors.

## Last Updated

Project dates from approximately 2015-2016 based on library versions and data dates.
