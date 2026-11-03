import type { ExpressionSpecification } from 'mapbox-gl';

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

/** The filter state as a Mapbox expression. This first version has bugs: the video finds them. */
export const buildFilter = ({ fuels, minMw, minYear }: Filters) =>
  [
    'all',
    ['in', ['get', 'fuel'], fuels],
    ['>=', ['get', 'mw'], minMw],
    ['>=', ['get', 'year'], minYear],
  ] as unknown as ExpressionSpecification;
