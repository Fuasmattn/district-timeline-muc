import * as d3 from 'd3';
import type { DistrictData, AggregatedDistrictData } from '../types';

export async function loadDistrictData(): Promise<DistrictData[]> {
  const data = await d3.csv('/data.csv');
  
  return data
    .map((row: any) => {
      // Extract district number from "Räumliche Gliederung" field
      const spatialDivision = row['Räumliche Gliederung'] || '';
      const match = spatialDivision.match(/^(\d+)/);
      const districtNumber = match ? parseInt(match[1]) : 0;
      
      return {
        indicator: row['Indikator'] || '',
        specification: row['Ausprägung'] || '',
        year: parseInt(row['Jahr']) || 0,
        spatialDivision,
        indicatorValue: parseFloat(row['Indikatorwert']) || 0,
        districtNumber,
        districtName: spatialDivision.replace(/^\d+\s*/, '')
      };
    })
    .filter(d => 
      d.districtNumber > 0 && 
      d.districtNumber <= 25 && 
      d.indicator === 'Altersdurchschnitt' &&
      !isNaN(d.indicatorValue) && 
      d.indicatorValue > 0
    );
}

export function aggregateDataByDistrict(data: DistrictData[]): Map<number, AggregatedDistrictData> {
  const districtMap = new Map<number, AggregatedDistrictData>();
  
  data.forEach(row => {
    if (!districtMap.has(row.districtNumber)) {
      districtMap.set(row.districtNumber, {
        districtNumber: row.districtNumber,
        districtName: row.districtName,
        yearlyData: new Map()
      });
    }
    
    const district = districtMap.get(row.districtNumber)!;
    district.yearlyData.set(row.year, row.indicatorValue);
  });
  
  return districtMap;
}

export function getColorScale(data: Map<number, AggregatedDistrictData>, year: number): d3.ScaleSequential<string> {
  const values = Array.from(data.values())
    .map(d => d.yearlyData.get(year))
    .filter(v => v !== undefined) as number[];
  
  const extent = d3.extent(values) as [number, number];
  
  return d3.scaleSequential()
    .domain(extent)
    .interpolator(d3.interpolateBlues);
}

export function formatValue(value: number | undefined): string {
  if (value === undefined) return 'N/A';
  return value.toFixed(1);
}
