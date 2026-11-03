import type { ExpressionSpecification } from 'mapbox-gl';

import type { PlantProps } from '../types';
import { FUELS, type FuelId } from './fuels';

export const MIN_YEAR = 1890;
export const MAX_YEAR = 2020;
export const MAX_MW = 3000;

export interface Filters {
  fuels: FuelId[];
  minMw: number;
  minYear: number;
  includeUnknownYear: boolean;
}

export const INITIAL_FILTERS: Filters = {
  fuels: FUELS.map((f) => f.id),
  minMw: 0,
  minYear: MIN_YEAR,
  includeUnknownYear: true,
};

/** The filter state as a Mapbox expression. Mapbox runs this on every feature, inside the map. */
export const buildFilter = ({
  fuels, minMw, minYear, includeUnknownYear,
}: Filters): ExpressionSpecification => [
  'all',
  ['in', ['get', 'fuel'], ['literal', fuels]],
  ['>=', ['get', 'mw'], minMw],
  ['case',
    ['==', ['get', 'year'], null], includeUnknownYear,
    ['>=', ['get', 'year'], minYear],
  ],
];

/** The same rules in plain JavaScript, for the count. Keep it next to buildFilter so the two never drift. */
export const matches = (
  p: PlantProps,
  { fuels, minMw, minYear, includeUnknownYear }: Filters,
) =>
  fuels.includes(p.fuel as FuelId) &&
  p.mw >= minMw &&
  (p.year === null ? includeUnknownYear : p.year >= minYear);
