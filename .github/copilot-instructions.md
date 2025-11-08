# GitHub Copilot Instructions for District Timeline Munich

## Project Overview

This is a data visualization project that displays age demographics over time for different districts in Munich, Germany. The visualization uses an interactive SVG map of Munich's districts (Stadtbezirke) with a timeline slider to show changes in average age across different years.

## Technology Stack

- **D3.js**: Main library for data visualization and chart rendering
- **jQuery**: DOM manipulation and event handling
- **Materialize CSS**: UI framework for styling and layout
- **Raphael.js**: SVG rendering library for the interactive map
- **Ion Range Slider**: Interactive timeline slider component

## Project Structure

- `index.html`: Main HTML file with page structure and layout
- `map.js`: Contains Raphael SVG path definitions for Munich district map
- `js/interaction.js`: Interactive functionality and D3.js visualizations
- `data.csv`: CSV data source for district demographics
- `css/`: Stylesheets including Ion Range Slider and custom styles
- `img/districts/`: District images for detail view

## Data Source

The demographic data is sourced from Munich's Open Government portal:
https://www.opengov-muenchen.de/dataset/9b072087-6098-4558-b221-01e7d119b512/resource/9177f886-7341-49d2-9bfa-15d4d8631327/download/indikatorenatlas2103bevoelkerungaltersdurchschnitt.csv

## Code Style Guidelines

### JavaScript
- Use meaningful variable names that describe the data they hold
- Maintain consistent indentation (spaces preferred)
- Comment complex D3.js transformations and data processing logic
- Keep DOM manipulation code separate from data processing
- Use jQuery's document ready pattern for initialization

### HTML
- Follow semantic HTML5 structure
- Keep inline scripts minimal (prefer external files)
- Maintain clear class naming for styling hooks

### SVG/Map
- Map paths are generated from official Munich district boundaries
- Each path should have unique id, fill, stroke properties
- Maintain data attributes for linking districts to data

## Development Best Practices

1. **Data Handling**
   - Always validate CSV data format before processing
   - Handle missing or malformed data gracefully
   - Cache parsed data to avoid redundant processing

2. **Interactivity**
   - Ensure map interactions are responsive
   - Provide visual feedback for hover and click events
   - Test slider functionality across different browsers

3. **Performance**
   - Minimize DOM reflows during updates
   - Use efficient D3.js update patterns (enter/update/exit)
   - Consider throttling/debouncing for high-frequency events

4. **Browser Compatibility**
   - Test with modern browsers (Chrome, Firefox, Safari, Edge)
   - SVG rendering should work consistently
   - Ensure external CDN resources have fallbacks

## Common Tasks

### Adding New Districts
1. Update `map.js` with new SVG path definitions
2. Add district images to `img/districts/`
3. Ensure data.csv includes data for the new district
4. Update hover and click handlers in interaction.js

### Updating Data
1. Download latest CSV from Open Government portal
2. Validate format matches existing structure
3. Test visualization with new data points
4. Update year range if needed

### Modifying Visualizations
1. D3.js code is in `js/interaction.js`
2. Use appropriate scales (time, linear) for data
3. Update axes when data ranges change
4. Maintain consistent color schemes

## Testing Guidance

- Manually test map interactivity (hover, click)
- Verify timeline slider updates visualization correctly
- Check that district details display properly
- Validate data loads from CSV without errors
- Test responsive layout on different screen sizes

## Dependencies

All major libraries are loaded from CDNs:
- jQuery 2.1.3
- Materialize CSS 0.97.3
- D3.js (local minified version)
- Ion Range Slider (local)
- Raphael.js (local minified version)

## Notes

- This is a static HTML/JavaScript application
- No build process or package manager is required
- Can be served directly from a web server
- Map SVG paths are Munich-specific and should not be modified without proper geographic data
