import type { Feature, FeatureCollection, Point } from 'geojson';

export interface PlantProps {
  name: string;
  country: string;
  fuel: string;
  mw: number;
  /** Year commissioned. null when the source does not know it. */
  year: number | null;
}

export type Plant = Feature<Point, PlantProps>;
export type Plants = FeatureCollection<Point, PlantProps>;
