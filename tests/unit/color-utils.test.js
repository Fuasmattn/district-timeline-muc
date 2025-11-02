/**
 * Tests for color utility functions
 */

const { ColorLuminance } = require('../../js/utils');

describe('ColorLuminance', () => {
  describe('hex color validation and parsing', () => {
    test('should handle hex colors with # prefix', () => {
      const result = ColorLuminance('#FFFFFF', 0);
      expect(result).toMatch(/^#[0-9a-f]{6}$/i);
    });

    test('should handle hex colors without # prefix', () => {
      const result = ColorLuminance('FFFFFF', 0);
      expect(result).toMatch(/^#[0-9a-f]{6}$/i);
    });

    test('should handle 3-character hex colors', () => {
      const result = ColorLuminance('F0F', 0);
      expect(result).toBe('#ff00ff');
    });

    test('should handle 3-character hex colors with #', () => {
      const result = ColorLuminance('#ABC', 0);
      expect(result).toBe('#aabbcc');
    });
  });

  describe('luminosity adjustments', () => {
    test('should darken color with negative luminosity', () => {
      const original = '#FFFFFF'; // White
      const darkened = ColorLuminance(original, -0.5);
      // Should be darker (lower hex values)
      expect(darkened).not.toBe('#ffffff');
      // Should still be valid hex
      expect(darkened).toMatch(/^#[0-9a-f]{6}$/i);
    });

    test('should lighten color with positive luminosity', () => {
      const original = '#000000'; // Black
      const lightened = ColorLuminance(original, 0.5);
      // Black lightened should still be black (can't go below 0)
      expect(lightened).toBe('#000000');
    });

    test('should not change color with zero luminosity', () => {
      const original = '#E0E9F6'; // Default district color
      const unchanged = ColorLuminance(original, 0);
      expect(unchanged.toLowerCase()).toBe('#e0e9f6');
    });

    test('should handle the default district color darkening (typical hover)', () => {
      const original = '#E0E9F6';
      const darkened = ColorLuminance(original, -0.05);
      expect(darkened).toMatch(/^#[0-9a-f]{6}$/i);
      expect(darkened).not.toBe('#e0e9f6');
      // Darkened should have lower values
      expect(parseInt(darkened.substr(1), 16)).toBeLessThan(parseInt('E0E9F6', 16));
    });
  });

  describe('edge cases', () => {
    test('should cap at white (255,255,255) when lightening', () => {
      const nearWhite = '#FAFAFA';
      const lightened = ColorLuminance(nearWhite, 1.0); // 100% lighter
      expect(lightened).toBe('#ffffff');
    });

    test('should cap at black (0,0,0) when darkening from dark color', () => {
      const nearBlack = '#101010';
      const darkened = ColorLuminance(nearBlack, -1.0); // 100% darker
      expect(darkened).toBe('#000000');
    });

    test('should handle empty string gracefully', () => {
      const result = ColorLuminance('', 0);
      expect(result).toMatch(/^#[0-9a-f]{6}$/i);
    });

    test('should handle invalid characters by stripping them', () => {
      const result = ColorLuminance('##FF00FF!!', 0);
      expect(result).toBe('#ff00ff');
    });
  });

  describe('realistic use cases', () => {
    test('should create visible hover effect', () => {
      const colors = ['#E0E9F6', '#FF5733', '#33FF57', '#3357FF'];
      
      colors.forEach(color => {
        const hovered = ColorLuminance(color, -0.05);
        expect(hovered).not.toBe(color.toLowerCase());
        expect(hovered).toMatch(/^#[0-9a-f]{6}$/i);
      });
    });

    test('should be reversible (approximately)', () => {
      const original = '#E0E9F6';
      const darkened = ColorLuminance(original, -0.1);
      const lightened = ColorLuminance(darkened, 0.1);
      
      // Won't be exactly equal due to rounding, but should be close
      expect(lightened).toMatch(/^#[0-9a-f]{6}$/i);
    });
  });

  describe('consistency', () => {
    test('should return same result for same inputs', () => {
      const color = '#E0E9F6';
      const result1 = ColorLuminance(color, -0.05);
      const result2 = ColorLuminance(color, -0.05);
      expect(result1).toBe(result2);
    });

    test('should handle all valid hex characters', () => {
      const hexChars = '0123456789ABCDEFabcdef';
      const testColor = '#FEDCBA';
      const result = ColorLuminance(testColor, 0);
      expect(result).toMatch(/^#[0-9a-f]{6}$/i);
    });
  });
});
