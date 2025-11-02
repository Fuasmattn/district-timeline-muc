# Testing Documentation

This directory contains tests for the Munich District Timeline project.

## Test Structure

```
tests/
├── unit/                      # Unit tests for individual functions
│   ├── color-utils.test.js   # Tests for color manipulation utilities
│   └── data-processing.test.js # Tests for CSV data loading and processing
├── integration/               # Integration tests (future)
└── fixtures/                  # Test data files
    └── sample-data.csv        # Sample CSV data for tests
```

## Running Tests

### Run all tests
```bash
npm test
```

### Run tests in watch mode (auto-rerun on file changes)
```bash
npm run test:watch
```

### Run tests with coverage report
```bash
npm run test:coverage
```

## Test Coverage

Current test coverage includes:

### Unit Tests

#### color-utils.test.js
Tests for the `ColorLuminance` function:
- ✅ Hex color validation and parsing
- ✅ Luminosity adjustments (darken/lighten)
- ✅ Edge cases (empty strings, invalid input)
- ✅ Realistic hover effects
- ✅ Consistency checks

#### data-processing.test.js
Tests for CSV data processing:
- ✅ CSV structure validation
- ✅ District identification and numbering
- ✅ Data filtering (as used in interaction.js)
- ✅ Time series data validation
- ✅ Data transformation for D3 charts
- ✅ Real data.csv validation

## Test Results

All tests passing (33 tests total):
```
Test Suites: 2 passed, 2 total
Tests:       33 passed, 33 total
```

## Writing New Tests

### Test File Naming
- Unit tests: `*.test.js` in `tests/unit/`
- Integration tests: `*.test.js` in `tests/integration/`
- Use descriptive names: `component-name.test.js`

### Test Structure
```javascript
describe('Component or Function Name', () => {
  describe('specific functionality', () => {
    test('should do something specific', () => {
      // Arrange
      const input = 'test';
      
      // Act
      const result = functionToTest(input);
      
      // Assert
      expect(result).toBe('expected');
    });
  });
});
```

### Best Practices

1. **Test one thing at a time**: Each test should verify one specific behavior
2. **Use descriptive names**: Test names should clearly state what is being tested
3. **Arrange-Act-Assert**: Structure tests with clear setup, execution, and verification
4. **Test edge cases**: Include tests for boundary conditions and error cases
5. **Keep tests independent**: Tests should not depend on each other
6. **Use fixtures**: Store sample data in `fixtures/` directory

## Testing Strategy

### What to Test

✅ **Currently Tested:**
- Utility functions (ColorLuminance)
- Data loading and parsing
- Data filtering logic
- CSV structure validation

🔄 **Future Testing Needs:**
- Map rendering and interactions
- Chart generation with D3
- Timeline controls
- User interactions (clicks, hovers)
- Configuration loading
- Error handling

### What NOT to Test

- External libraries (D3, jQuery, Raphael) - already tested by their authors
- Browser APIs - assumed to work correctly
- Simple getters/setters with no logic

## Integration Testing (Future)

Future integration tests should cover:
- Complete user workflows (select district → view chart)
- Map and chart synchronization
- Timeline slider interactions
- Data loading from remote URL
- Error scenarios (network failures, malformed data)

## Testing Tools

- **Jest**: Test runner and assertion library
- **csv-parse**: CSV parsing for test data
- **jsdom**: DOM environment for browser-like testing (when needed)

## Continuous Integration

Tests are designed to run in CI/CD pipelines:
- Fast execution (< 1 second currently)
- No external dependencies required
- Deterministic results
- Clear pass/fail output

## Troubleshooting

### Tests fail with "module not found"
Ensure all dependencies are installed:
```bash
npm install
```

### Tests fail with "Cannot read property"
Check that test fixtures exist:
```bash
ls tests/fixtures/
```

### Tests pass locally but fail in CI
Verify node version compatibility. Project uses Node 16+.

## Coverage Goals

Target coverage:
- **Utility functions**: 100%
- **Data processing**: 90%+
- **Core application logic**: 80%+
- **UI interactions**: 70%+ (when implemented)

Current coverage can be viewed by running:
```bash
npm run test:coverage
```

## Contributing

When adding new features:
1. Write tests first (TDD approach recommended)
2. Ensure tests pass before committing
3. Maintain or improve coverage percentage
4. Update this README if adding new test types

## Resources

- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [Testing Best Practices](https://testingjavascript.com/)
- [D3 Testing Guide](https://observablehq.com/@d3/testing)
