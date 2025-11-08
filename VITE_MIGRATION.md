# Vite Migration Guide

This project has been migrated from a plain HTML/JS setup to use Vite as a modern build tool.

## What Changed

### ✅ Completed Migrations

1. **Build System**: Migrated to Vite for modern development and build tooling
2. **D3.js**: Upgraded from v3 to v7 and installed via npm
3. **Raphael**: Installed via npm instead of local file
4. **Ion Range Slider**: Replaced with native HTML5 range input
5. **Module System**: Converted to ES6 modules

### 📦 Dependencies

#### Production Dependencies
- `d3@^7.9.0` - Data visualization library (upgraded from v3)
- `d3-dsv@^3.0.1` - CSV parsing utilities
- `raphael@^2.3.0` - SVG manipulation library

#### Development Dependencies
- `vite@^7.2.2` - Build tool and dev server

### 🗂️ New Project Structure

```
district-timeline-muc/
├── public/               # Static assets (data.csv, images, CSS)
│   ├── data.csv
│   ├── img/
│   └── css/
├── src/                  # Source code (ES modules)
│   ├── main.js          # Entry point
│   ├── interaction.js   # Main application logic
│   ├── map.js           # Map initialization
│   ├── map-data.js      # Auto-generated district paths
│   └── utils.js         # Utility functions
├── tests/                # Test files
│   ├── utils-test.js    # CommonJS version for Jest
│   └── unit/
├── index.html           # Main HTML (Vite-compatible)
├── vite.config.js       # Vite configuration
└── package.json         # Updated with new scripts
```

### 🚀 New npm Scripts

```bash
# Development server with hot reload
npm run dev

# Production build
npm run build

# Preview production build
npm run preview

# Run tests
npm test
```

## Development Workflow

### Starting Development

```bash
# Install dependencies
npm install

# Start dev server (http://localhost:3000)
npm run dev
```

The dev server includes:
- Hot Module Replacement (HMR)
- Instant updates on file changes
- Source maps for debugging

### Building for Production

```bash
# Create optimized production build
npm run build

# Output will be in dist/ directory
```

The build includes:
- Code minification and bundling
- Tree shaking (removes unused code)
- Asset optimization
- Source maps generation

### Preview Production Build

```bash
npm run preview
```

## Key Changes in Code

### 1. D3.js v3 → v7

**Before (v3):**
```javascript
var x = d3.time.scale().range([0, width]);
var y = d3.scale.linear().range([height, 0]);
var xAxis = d3.svg.axis().scale(x);
```

**After (v7):**
```javascript
const x = d3.scaleLinear().range([0, width]);
const y = d3.scaleLinear().range([height, 0]);
const yAxis = d3.axisLeft(y).ticks(4);
```

### 2. CSV Loading

**Before:**
```javascript
d3.csv('../data.csv', function(error, data) {
  if (error) throw error;
  // process data
});
```

**After (Promise-based):**
```javascript
d3.csv('/data.csv').then(data => {
  // process data
}).catch(error => {
  console.error('Error loading data:', error);
});
```

### 3. Ion Range Slider → Native Input

**Before (Ion Range Slider):**
```html
<input type="range" id="slider" />
<script src="js/ion.rangeSlider.min.js"></script>
<link rel="stylesheet" href="css/ion.rangeSlider.css"/>
```

**After (Native):**
```html
<span id="sliderValue">2015</span>
<input type="range" step="1" min="2001" max="2015" id="slider" value="2015" />
```

```javascript
slider.addEventListener('input', function() {
  sliderValue.textContent = this.value;
  // Update visualization
});
```

### 4. Module System

**Before:**
```html
<script src="js/d3.min.js"></script>
<script src="js/interaction.js"></script>
```

**After:**
```html
<script type="module" src="/src/main.js"></script>
```

```javascript
// src/main.js
import './interaction.js';

// src/interaction.js
import * as d3 from 'd3';
import Raphael from 'raphael';
import { ColorLuminance } from './utils.js';
```

## Removed Files

The following files were removed as they're now managed by npm:

- `js/d3.js` and `js/d3.min.js` → now `d3` npm package
- `js/ion.rangeSlider.js` and `js/ion.rangeSlider.min.js` → replaced with native
- `css/ion.rangeSlider*.css` → removed with ion.rangeSlider
- `raphael-min.js` → now `raphael` npm package

## Browser Compatibility

Modern browsers with ES6 module support:
- Chrome 61+
- Firefox 60+
- Safari 11+
- Edge 79+

For older browsers, the production build includes necessary polyfills.

## Testing

Tests continue to work with Jest:

```bash
npm test              # Run all tests
npm run test:watch    # Watch mode
npm run test:coverage # With coverage report
```

Tests use a CommonJS-compatible version (`tests/utils-test.js`) to work with Jest.

## Troubleshooting

### Dev server not starting

Make sure all dependencies are installed:
```bash
rm -rf node_modules package-lock.json
npm install
```

### Build fails

Check that all imports are correct and files exist in `src/` or `public/` directories.

### Tests failing

Ensure `tests/utils-test.js` is in sync with `src/utils.js`. This file is necessary for Jest compatibility.

## Migration Benefits

✅ **Faster Development**: Hot Module Replacement for instant updates
✅ **Modern Tooling**: ES6 modules, async/await, latest JavaScript features
✅ **Optimized Builds**: Minification, tree-shaking, code splitting
✅ **Better DX**: Source maps, better error messages
✅ **Dependency Management**: npm packages instead of vendored files
✅ **Smaller Bundle**: Tree-shaking removes unused code from libraries

## Next Steps

Future improvements could include:
- TypeScript for type safety
- Vue/React for component-based UI
- Automated testing in CI/CD
- Progressive Web App (PWA) features
- Additional visualizations and analytics
