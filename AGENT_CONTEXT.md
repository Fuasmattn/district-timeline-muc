# Agent Context - Munich District Timeline

## Purpose

This document provides context for AI agents working on the Munich District Timeline project. It explains the codebase structure, key concepts, and common tasks.

## Project Type

**Interactive Data Visualization** - A single-page web application that visualizes demographic data (average age) across Munich's 25 administrative districts over time.

## Quick Understanding

### What It Does
- Displays an interactive SVG map of Munich divided into 25 districts
- Shows demographic trends (average age) for each district from 2000-2019
- Provides timeline controls to navigate through years
- Shows detailed charts for selected districts

### Core Technologies
- **D3.js v3**: Data processing and chart rendering
- **Raphael.js**: SVG map rendering and interaction
- **jQuery 2.1.3**: DOM manipulation and event handling
- **Materialize CSS 0.97.3**: UI framework (sidebar, styling)

## Code Architecture

### Entry Point: index.html

The HTML file serves multiple roles:
1. **HTML Structure**: Sidebars, containers, and UI elements
2. **SVG Map Definition**: 25 path elements (one per district) with inline Raphael initialization
3. **Library Loading**: Scripts loaded in specific order

**Critical Script Loading Order:**
```html
1. jQuery (from CDN)
2. Materialize CSS/JS (from CDN)
3. D3.js (local)
4. Ion Range Slider CSS
5. interaction.js (MUST load last - depends on others)
6. Raphael.js
7. Ion Range Slider JS
```

### Key JavaScript Components

#### 1. interaction.js

**Location**: `js/interaction.js`

**Primary Functions:**

```javascript
// Color utility for hover effects
ColorLuminance(hex, lum)
  - Input: hex color string, luminosity adjustment
  - Output: adjusted hex color
  - Used for: district hover effects

// Initialize example visualization
showExample()
  - Loads data.csv using D3
  - Filters data for district #7 (hardcoded)
  - Creates area chart in #test div
  - Sets up D3 scales and axes
  
// Generate timeline
addTimeline()
  - Creates <li> elements for years 2015-2001
  - Appends to #timeline ul
```

**Data Processing:**
```javascript
// CSV loaded via D3.csv()
d3.csv('../data.csv', function(error, data) {
  // Filters:
  // - !isNaN(a.INDIKATOR_WERT): valid numbers only
  // - a.INDIKATOR_WERT > 0: positive values
  // - a.NUMMER == 7: district #7 only
  
  // Field mappings:
  // d.JAHR → year (string, not parsed as date)
  // d.INDIKATOR_WERT → numeric indicator value
  // d.NAME → district name
});
```

#### 2. Inline Map Code (index.html)

**Location**: Lines 72-159 in `index.html`

**Key Elements:**

```javascript
// Raphael canvas setup
var w = 600, h = 450;
var map = Raphael('map', '600', '600');
map.setViewBox(0,150,w,h,true);
map.setSize('100%', '100%');

// District paths (25 total)
var path1 = map.path("M 336.057,292.342 ..."); // District path coordinates
path1.attr({
  id: 'path1',
  fill: '#E0E9F6',           // Default fill color
  stroke: '#ffffff',          // White border
  'stroke-width': '0.8',
  parent: 'munich'
});

// Set data attributes
path1.data('id', 'path1');
path1.node.id = 'path1';

// Hover interactions
path1.mouseover(function(e) {
  // Darken color by 5%
  var newFill = ColorLuminance(oldFill, -0.05);
  this.node.setAttribute('fill', newFill);
});

path1.mouseout(function(e) {
  // Restore original color
  this.node.setAttribute('fill', oldFill);
});
```

**Path Numbering:**
- `path1` to `path25` correspond to district numbers
- IDs match Munich's official district numbering
- Each path is added to `munich` set for group operations

### Data Structure

#### CSV Schema (data.csv)

```csv
"Indikator","Ausprägung","Jahr","Räumliche Gliederung","Indikatorwert","Basiswert 1",...
"Altersdurchschnitt","Deutsche","2019","07 Sendling - Westpark","42.3","1806152",...
```

**Key Fields:**
- `INDIKATOR`: Always "Altersdurchschnitt" (average age)
- `INDIKATOR_AUSPRAEGUNG`: Population group (e.g., "Deutsche")
- `JAHR`: Year as string (2000-2019)
- `RAEUMLICHE_GLIEDERUNG`: District name with number prefix
- `INDIKATOR_WERT`: Numeric value (average age)
- `NUMMER`: District number (derived from name, used in code)

**District Numbering:**
```
01 = Altstadt - Lehel
02 = Ludwigsvorstadt - Isarvorstadt
...
25 = Laim
```

### UI Components

#### Left Sidebar
```html
<ul id="nav-mobile" class="side-nav fixed detailbar left">
  <li>
    <img class="districtImage" src="img/districts/lehel.png"/>
    <div class="districtDetails">
      <h5 id="districtName">Bezirkname</h5>
      <p>Details...</p>
      <div id="test"></div>  <!-- D3 chart inserted here -->
    </div>
  </li>
</ul>
```

#### Right Sidebar
```html
<ul class="side-nav fixed detailbar right">
  <div class="row">
    <div class="col m4">
      <ul id="timeline"></ul>  <!-- Years list -->
    </div>
    <div class="col m4">
      <input type="range" id="slider" name="timeline_slider"
             step="1" min="2001" max="2015" value="" />
    </div>
  </div>
</ul>
```

#### Center Map
```html
<div class="mapContainer" id="map"></div>
<!-- Raphael canvas created here via JavaScript -->
```

## Common Tasks & Solutions

### 1. Changing Which District is Displayed

**Current Code** (interaction.js line 73):
```javascript
if( !isNaN(a.INDIKATOR_WERT) && a.INDIKATOR_WERT > 0 && a.NUMMER == 7 )
```

**To Change:**
Replace `7` with desired district number (1-25)

### 2. Modifying Data Source

**Current Code** (interaction.js line 66):
```javascript
d3.csv('../data.csv', function(error, data) {
```

**To Change:**
- Update path to new CSV location
- Ensure CSV follows same schema
- Add error handling for missing fields

### 3. Adjusting Year Range

**Timeline** (interaction.js line 130):
```javascript
for(var i=2015; i> 2000; i--){
  $('#timeline').append('<li>'+i+'</li>');
}
```

**Slider** (index.html line 54):
```html
<input type="range" min="2001" max="2015" ... />
```

**To Change:**
- Update loop bounds in JavaScript
- Update min/max attributes in HTML
- Ensure data exists for new year range

### 4. Adding New Districts to Map

**Required Steps:**
1. Get SVG path coordinates for new district
2. Add new `path` variable in index.html
3. Set attributes (id, fill, stroke, data)
4. Add to `munich` set
5. Add hover event handlers
6. Update district count (currently 25)

### 5. Updating Libraries

**Challenges:**
- **D3 v3 → v7**: Major API changes (scales, axes, selections)
- **jQuery 2 → 3+**: Minimal changes expected
- **Materialize**: Discontinued, consider alternatives (Bootstrap, Material-UI)
- **Raphael**: Still maintained, or migrate to native SVG/D3

## Important Constants & Magic Numbers

```javascript
// Map dimensions
w = 600, h = 450  // Internal viewBox dimensions
'600', '600'      // Canvas size (width, height)
setViewBox(0,150,w,h)  // x=0, y=150 (crops top of map)

// Colors
'#E0E9F6'  // Default district fill (light blue)
'#ffffff'  // District borders (white)
-0.05      // Hover darkening amount (5% darker)

// Years
2001-2015  // Slider range (note: data goes to 2019)
2015-2001  // Timeline display order (newest first)

// Districts
7  // Hardcoded district in showExample()
25 // Total number of districts
```

## Data Processing Pipeline

```
CSV File (data.csv)
  ↓
D3.csv() parser
  ↓
Filter by:
  - Valid numbers (INDIKATOR_WERT)
  - Positive values (> 0)
  - District number (NUMMER == 7)
  ↓
Data transformation:
  - JAHR → year (kept as string)
  - INDIKATOR_WERT → numeric
  ↓
D3 scale creation:
  - x: time scale (year extent)
  - y: linear scale (0 to max age)
  ↓
D3 area generator
  ↓
SVG path rendering in #test div
```

## Testing Considerations

### Current State
- **No test framework**
- **No tests**
- Manual testing only

### What to Test (When Implementing)

1. **Data Loading**
   - CSV parsing
   - Field validation
   - Missing data handling

2. **District Selection**
   - Correct data filtering
   - Chart updates
   - Name display

3. **Map Interactions**
   - Hover effects
   - Click handlers
   - Color changes

4. **Timeline Controls**
   - Year selection
   - Data filtering by year
   - Slider synchronization

### Suggested Test Structure
```
tests/
  ├── unit/
  │   ├── data-processing.test.js
  │   ├── color-utils.test.js
  │   └── timeline.test.js
  ├── integration/
  │   ├── map-interaction.test.js
  │   └── chart-rendering.test.js
  └── fixtures/
      └── sample-data.csv
```

## Debugging Tips

### 1. Map Not Showing
- Check Raphael.js is loaded
- Verify `#map` div exists
- Check browser console for SVG errors
- Confirm path coordinates are valid

### 2. Chart Not Rendering
- Ensure D3.js loaded before interaction.js
- Check CSV path is correct
- Verify data filtering returns results
- Look for D3 console errors

### 3. No Data Displayed
- Check NUMMER field extraction from district name
- Verify year format matches data
- Ensure INDIKATOR_WERT is numeric
- Check for CSV parsing errors

### 4. Hover Effects Not Working
- Confirm ColorLuminance function exists
- Check mouseover/mouseout handlers attached
- Verify oldFill variable captured correctly
- Test with different fill colors

## Browser DevTools

### Useful Console Commands

```javascript
// Check if libraries loaded
typeof $ !== 'undefined'        // jQuery
typeof d3 !== 'undefined'       // D3.js
typeof Raphael !== 'undefined'  // Raphael

// Inspect map
map                     // Raphael canvas object
munich                  // District paths set
munich.length           // Should be 25

// Debug data loading
d3.csv('data.csv', function(err, data) {
  console.log(data.length);  // Total rows
  console.log(data[0]);       // First row
});
```

## Performance Considerations

### Current Performance
- **Good**: Lightweight, no build step, fast initial load
- **Issues**: Large inline SVG in HTML, no code splitting

### Optimization Opportunities
1. Externalize map SVG paths to separate file
2. Minify JavaScript files
3. Lazy load district images
4. Cache CSV data
5. Debounce hover events

## Security Considerations

### Current Issues
1. **No CSP headers**: Allows inline scripts
2. **CDN dependencies**: External resource loading
3. **No input validation**: CSV data trusted implicitly
4. **XSS potential**: District names inserted into DOM

### Improvements Needed
- Add Content Security Policy
- Validate and sanitize CSV data
- Use DOM APIs instead of innerHTML
- Consider subresource integrity for CDN assets

## Modernization Strategy

### Phase 1: Documentation & Tests
- [x] Create PROJECT.md
- [x] Create AGENT_CONTEXT.md
- [ ] Add test framework
- [ ] Write basic tests

### Phase 2: Configuration
- [ ] Create config.js
- [ ] Externalize data source URL
- [ ] Add environment variables

### Phase 3: Code Organization
- [ ] Extract inline JavaScript
- [ ] Modularize code
- [ ] Add build system

### Phase 4: Library Updates
- [ ] Update to D3 v7
- [ ] Replace jQuery with vanilla JS
- [ ] Update or replace Materialize

## Glossary

**Bezirk**: District (German)
**Altersdurchschnitt**: Average age (German)
**Indikator**: Indicator (metric being measured)
**Ausprägung**: Expression/manifestation (population subset)

## Additional Resources

- [D3.js v3 Documentation](https://github.com/d3/d3-3.x-api-reference/blob/master/API-Reference.md)
- [Raphael.js Documentation](http://dmitrybaranovskiy.github.io/raphael/)
- [Munich Open Data Portal](https://www.opengov-muenchen.de/)
- [Ion Range Slider](http://ionden.com/a/plugins/ion.rangeSlider/)

## Questions to Ask When Making Changes

1. **Does this break existing functionality?** (No tests to verify)
2. **Is the data structure still compatible?** (CSV format)
3. **Are library dependencies updated together?** (D3 API changes)
4. **Does the map still render correctly?** (SVG paths)
5. **Are all 25 districts handled?** (Hardcoded values)

## Last Updated

This document was created during the modernization analysis phase.
