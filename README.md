# Munich District Timeline

Interactive visualization of demographic data (average age) across Munich's 25 administrative districts over time (2000-2019).

## Quick Start

### Running the Application

Simply open `index.html` in a web browser. No build step required.

### Running Tests

```bash
# Install dependencies
npm install

# Run tests
npm test

# Run tests with coverage
npm run test:coverage
```

## Documentation

- **[PROJECT.md](PROJECT.md)** - Complete project documentation, architecture, and technical details
- **[AGENT_CONTEXT.md](AGENT_CONTEXT.md)** - Comprehensive guide for AI agents and developers
- **[MODERNIZATION_SUMMARY.md](MODERNIZATION_SUMMARY.md)** - Summary of modernization work completed
- **[tests/README.md](tests/README.md)** - Testing documentation and strategy

## Features

- 📍 Interactive SVG map of Munich's 25 districts
- 📊 Time series visualization of average age data
- 🕐 Timeline controls (2001-2015)
- 🖱️ Hover effects and district selection
- 📈 D3.js charts showing demographic trends

## Data Source

The data is sourced from Munich's Open Data Portal:
https://www.opengov-muenchen.de/dataset/9b072087-6098-4558-b221-01e7d119b512/resource/9177f886-7341-49d2-9bfa-15d4d8631327/download/indikatorenatlas2103bevoelkerungaltersdurchschnitt.csv

Data can be configured in `config.js` to use local or remote sources.

## Project Status

✅ **Phase 1 Complete**: Documentation and Tests
- Comprehensive documentation created
- Test infrastructure implemented (33 tests passing)
- Configuration system added
- Ready for modernization with test safety net

## Technology Stack

- **Visualization**: D3.js v3, Raphael.js
- **UI**: jQuery 2.1.3, Materialize CSS 0.97.3
- **Testing**: Jest with 100% coverage of utility functions

## Testing

```bash
npm test              # Run all tests
npm run test:watch    # Run tests in watch mode
npm run test:coverage # Run tests with coverage report
```

Current test coverage: 33 tests passing, 100% coverage of utility functions.

## Contributing

See documentation files for detailed information about the codebase architecture and development guidelines.

## License

Check repository for license information.