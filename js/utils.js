/**
 * Utility functions for the Munich District Timeline
 */

/**
 * Adjusts the luminosity of a hex color
 * @param {string} hex - Hex color string (with or without #)
 * @param {number} lum - Luminosity adjustment factor (-1 to 1, typically -0.1 to 0.1)
 * @returns {string} Adjusted hex color string with # prefix
 * 
 * @example
 * ColorLuminance("#E0E9F6", -0.05) // Returns darker version
 * ColorLuminance("E0E9F6", 0.1)    // Returns lighter version
 */
function ColorLuminance(hex, lum) {
	// validate hex string
	hex = String(hex).replace(/[^0-9a-f]/gi, '');
	
	// Handle empty or invalid hex strings
	if (hex.length === 0) {
		hex = '000000';
	} else if (hex.length < 6) {
		hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
	}
	lum = lum || 0;

	// convert to decimal and change luminosity
	var rgb = "#", c, i;
	for (i = 0; i < 3; i++) {
		c = parseInt(hex.substr(i*2,2), 16);
		c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
		rgb += ("00"+c).substr(c.length);
	}

	return rgb;
}

// Export for Node.js environment (tests)
if (typeof module !== 'undefined' && module.exports) {
	module.exports = { ColorLuminance };
}
