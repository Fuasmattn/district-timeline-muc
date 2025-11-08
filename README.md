# Munich District Timeline

Interactive visualization of demographic data (average age) across Munich's 25 administrative districts over time (2000-2019).

**Now powered by Vite!** ⚡ This project has been modernized with Vite build tooling, ES6 modules, and updated dependencies.

## Quick Start

### Development

```bash
# Install dependencies
npm install

# Start development server (http://localhost:3000)
npm run dev
```

### Production Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

### Running Tests

```bash
npm test              # Run all tests
npm run test:watch    # Run tests in watch mode
npm run test:coverage # Run tests with coverage report
```

## What's New in This Version

✅ **Vite Build System**: Fast development server with Hot Module Replacement (HMR)
✅ **ES6 Modules**: Modern JavaScript module system
✅ **Updated D3.js**: Upgraded from v3 to v7 with npm installation
✅ **Native Range Slider**: Replaced ion.rangeSlider with HTML5 native input
✅ **npm Dependencies**: All libraries now managed through npm

See [VITE_MIGRATION.md](VITE_MIGRATION.md) for detailed migration information.

## Features

- 📍 Interactive SVG map of Munich's 25 districts
- 📊 Time series visualization of average age data
- 🕐 Timeline controls (2001-2015)
- 🖱️ Hover effects and district selection
- 📈 D3.js charts showing demographic trends

## Documentation

- **[VITE_MIGRATION.md](VITE_MIGRATION.md)** - Migration guide and what changed
- **[PROJECT.md](PROJECT.md)** - Complete project documentation, architecture, and technical details
- **[AGENT_CONTEXT.md](AGENT_CONTEXT.md)** - Comprehensive guide for AI agents and developers
- **[MODERNIZATION_SUMMARY.md](MODERNIZATION_SUMMARY.md)** - Summary of modernization work completed
- **[tests/README.md](tests/README.md)** - Testing documentation and strategy

## Data Source

The data is sourced from Munich's Open Data Portal:
https://www.opengov-muenchen.de/dataset/9b072087-6098-4558-b221-01e7d119b512/resource/9177f886-7341-49d2-9bfa-15d4d8631327/download/indikatorenatlas2103bevoelkerungaltersdurchschnitt.csv

Data can be configured in `config.js` to use local or remote sources.

## Project Structure

```
district-timeline-muc/
├── public/           # Static assets (data, images, CSS)
├── src/              # Source code (ES6 modules)
│   ├── main.js
│   ├── interaction.js
│   ├── map.js
│   ├── map-data.js
│   └── utils.js
├── tests/            # Test files
├── dist/             # Production build output
└── index.html        # Main HTML file
```

## Technology Stack

### Production
- **D3.js v7**: Data visualization and chart rendering
- **Raphael.js**: SVG map rendering and interaction
- **Vite**: Build tool and development server

### Development
- **Jest**: Testing framework with 100% coverage of utility functions
- **ESLint**: Code linting (configurable)

## Browser Compatibility

Modern browsers with ES6 module support:
- Chrome 61+
- Firefox 60+
- Safari 11+
- Edge 79+

## Testing

Current test coverage: 33 tests passing, 100% coverage of utility functions.

Tests use Jest and validate:
- Color manipulation utilities
- CSV data loading and validation
- District identification and filtering
- Data transformation for visualizations

## Contributing

See documentation files for detailed information about the codebase architecture and development guidelines.

## License

Check repository for license information.