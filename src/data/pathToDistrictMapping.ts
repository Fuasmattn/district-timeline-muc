// Mapping from SVG path IDs to actual Munich district numbers  
// The SVG file uses path1-path25, but these need to be mapped to correct district numbers
// based on geographic position

// CONFIRMED MAPPINGS (verified by user):
// - path24 (northeast position) → District 12 (Schwabing-Freimann)

// TODO: Complete remaining mappings once more examples are provided
// Many districts still use 1:1 mapping as placeholder - this is incorrect for most

export const PATH_TO_DISTRICT_MAPPING: Record<number, number> = {
  // Mapping format: SVG_PATH_ID: MUNICH_DISTRICT_NUMBER
  
  // ===  VERIFIED MAPPINGS ===
  24: 12,  // Northeast → Schwabing-Freimann [CONFIRMED]
  12: 24,  // Assuming swap: Far North → Feldmoching-Hasenbergl [NEEDS VERIFICATION]
  
  // === PLACEHOLDER 1:1 MAPPINGS (likely incorrect) ===
  // These will be updated as more examples are provided
  1: 1,
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  10: 10,
  11: 11,
  // 12: mapped above
  13: 13,
  14: 14,
  15: 15,
  16: 16,
  17: 17,
  18: 18,
  19: 19,
  20: 20,
  21: 21,
  22: 22,
  23: 23,
  // 24: mapped above
  25: 25,
};
