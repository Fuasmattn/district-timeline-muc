/**
 * Tests for data processing functionality
 */

const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse/sync');

describe('Data Processing', () => {
  let sampleData;

  beforeAll(() => {
    // Load sample CSV data
    const csvPath = path.join(__dirname, '../fixtures/sample-data.csv');
    const csvContent = fs.readFileSync(csvPath, 'utf-8');
    sampleData = parse(csvContent, {
      columns: true,
      skip_empty_lines: true
    });
  });

  describe('CSV structure validation', () => {
    test('should load sample CSV data', () => {
      expect(sampleData).toBeDefined();
      expect(Array.isArray(sampleData)).toBe(true);
      expect(sampleData.length).toBeGreaterThan(0);
    });

    test('should have expected columns', () => {
      const expectedColumns = [
        'Indikator',
        'Ausprägung',
        'Jahr',
        'Räumliche Gliederung',
        'Indikatorwert'
      ];

      expectedColumns.forEach(col => {
        expect(sampleData[0]).toHaveProperty(col);
      });
    });

    test('should have numeric indicator values', () => {
      sampleData.forEach(row => {
        const value = parseFloat(row.Indikatorwert);
        expect(isNaN(value)).toBe(false);
        expect(value).toBeGreaterThan(0);
      });
    });

    test('should have valid year values', () => {
      sampleData.forEach(row => {
        const year = parseInt(row.Jahr);
        expect(isNaN(year)).toBe(false);
        expect(year).toBeGreaterThanOrEqual(2000);
        expect(year).toBeLessThanOrEqual(2025);
      });
    });
  });

  describe('District identification', () => {
    test('should extract district numbers from names', () => {
      const districts = sampleData.map(row => {
        const match = row['Räumliche Gliederung'].match(/^(\d+)\s/);
        return match ? parseInt(match[1]) : null;
      });

      // All districts should have valid numbers (1-25)
      districts.forEach(num => {
        if (num !== null) {
          expect(num).toBeGreaterThanOrEqual(1);
          expect(num).toBeLessThanOrEqual(25);
        }
      });
    });

    test('should identify district 07 (Sendling - Westpark)', () => {
      const district7 = sampleData.filter(row => 
        row['Räumliche Gliederung'].includes('07 Sendling - Westpark')
      );

      expect(district7.length).toBeGreaterThan(0);
      expect(district7[0]['Räumliche Gliederung']).toContain('Sendling - Westpark');
    });

    test('should have data for multiple districts', () => {
      const districts = new Set();
      sampleData.forEach(row => {
        const match = row['Räumliche Gliederung'].match(/^(\d+)\s/);
        if (match) districts.add(match[1]);
      });

      expect(districts.size).toBeGreaterThan(1);
    });
  });

  describe('Data filtering (as in interaction.js)', () => {
    test('should filter valid numeric values', () => {
      const filtered = sampleData.filter(row => {
        const value = parseFloat(row.Indikatorwert);
        return !isNaN(value) && value > 0;
      });

      expect(filtered.length).toBe(sampleData.length);
    });

    test('should filter by specific district', () => {
      // Simulate filtering for district 7
      const district7Data = sampleData.filter(row => {
        const value = parseFloat(row.Indikatorwert);
        const match = row['Räumliche Gliederung'].match(/^(\d+)\s/);
        const districtNum = match ? parseInt(match[1]) : null;
        
        return !isNaN(value) && value > 0 && districtNum === 7;
      });

      expect(district7Data.length).toBeGreaterThan(0);
      district7Data.forEach(row => {
        expect(row['Räumliche Gliederung']).toContain('07 Sendling - Westpark');
      });
    });

    test('should handle missing or invalid data gracefully', () => {
      const invalidData = [
        { Indikatorwert: 'invalid' },
        { Indikatorwert: '-1' },
        { Indikatorwert: '0' },
        { Indikatorwert: '' }
      ];

      const filtered = invalidData.filter(row => {
        const value = parseFloat(row.Indikatorwert);
        return !isNaN(value) && value > 0;
      });

      expect(filtered.length).toBe(0);
    });
  });

  describe('Time series data', () => {
    test('should have chronological data', () => {
      const district7 = sampleData
        .filter(row => row['Räumliche Gliederung'].includes('07 Sendling - Westpark'))
        .map(row => parseInt(row.Jahr))
        .sort((a, b) => a - b);

      // Should be in ascending order
      for (let i = 1; i < district7.length; i++) {
        expect(district7[i]).toBeGreaterThan(district7[i - 1]);
      }
    });

    test('should have data for multiple years per district', () => {
      const yearsByDistrict = {};
      
      sampleData.forEach(row => {
        const district = row['Räumliche Gliederung'];
        if (!yearsByDistrict[district]) {
          yearsByDistrict[district] = new Set();
        }
        yearsByDistrict[district].add(row.Jahr);
      });

      Object.values(yearsByDistrict).forEach(years => {
        expect(years.size).toBeGreaterThan(1);
      });
    });
  });

  describe('Data transformation for D3', () => {
    test('should convert to format suitable for D3 charts', () => {
      const d3Data = sampleData
        .filter(row => row['Räumliche Gliederung'].includes('07 Sendling - Westpark'))
        .map(row => ({
          JAHR: row.Jahr,
          INDIKATOR_WERT: parseFloat(row.Indikatorwert),
          NAME: row['Räumliche Gliederung']
        }));

      expect(d3Data.length).toBeGreaterThan(0);
      d3Data.forEach(item => {
        expect(item.JAHR).toBeDefined();
        expect(typeof item.INDIKATOR_WERT).toBe('number');
        expect(item.NAME).toBeDefined();
      });
    });

    test('should calculate extent for scales', () => {
      const values = sampleData
        .map(row => parseFloat(row.Indikatorwert))
        .filter(v => !isNaN(v));

      const min = Math.min(...values);
      const max = Math.max(...values);

      expect(min).toBeGreaterThan(0);
      expect(max).toBeGreaterThan(min);
    });
  });

  describe('Real data validation', () => {
    test('should validate actual data.csv exists', () => {
      const dataPath = path.join(__dirname, '../../data.csv');
      expect(fs.existsSync(dataPath)).toBe(true);
    });

    test('should load and parse actual data.csv', () => {
      const dataPath = path.join(__dirname, '../../data.csv');
      const csvContent = fs.readFileSync(dataPath, 'utf-8');
      const actualData = parse(csvContent, {
        columns: true,
        skip_empty_lines: true
      });

      expect(actualData.length).toBeGreaterThan(100); // Should have many rows
      expect(actualData[0]).toHaveProperty('Indikator');
    });

    test('actual data should have all 25 districts', () => {
      const dataPath = path.join(__dirname, '../../data.csv');
      const csvContent = fs.readFileSync(dataPath, 'utf-8');
      const actualData = parse(csvContent, {
        columns: true,
        skip_empty_lines: true
      });

      const districts = new Set();
      actualData.forEach(row => {
        const match = row['Räumliche Gliederung']?.match(/^(\d+)\s/);
        if (match) districts.add(parseInt(match[1]));
      });

      // Should have districts 1-25
      expect(districts.size).toBeGreaterThanOrEqual(25);
      for (let i = 1; i <= 25; i++) {
        expect(districts.has(i)).toBe(true);
      }
    });
  });
});
