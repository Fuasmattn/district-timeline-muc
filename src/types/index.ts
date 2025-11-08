export interface District {
  id: string;
  name: string;
  number: number;
}

export interface DistrictData {
  indicator: string;
  specification: string;
  year: number;
  spatialDivision: string;
  indicatorValue: number;
  districtNumber: number;
  districtName: string;
}

export interface AggregatedDistrictData {
  districtNumber: number;
  districtName: string;
  yearlyData: Map<number, number>;
}

export interface GeoFeature {
  type: 'Feature';
  id: string;
  properties: {
    id: string;
    name: string;
    number: number;
  };
  geometry: {
    type: 'Polygon';
    coordinates: number[][][];
  };
}

export interface GeoJSON {
  type: 'FeatureCollection';
  features: GeoFeature[];
}
