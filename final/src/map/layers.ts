import type { ExpressionSpecification, LayerSpecification } from 'mapbox-gl';

import { FUELS } from './fuels';

export const STYLE = 'mapbox://styles/mapbox/dark-v11';
export const LAYER_ID = 'plants-circle';

const fuelColor = [
  'match', ['get', 'fuel'],
  ...FUELS.flatMap((f) => [f.id, f.color]),
  '#8A94A6',
] as ExpressionSpecification;

/** A bigger plant gets a bigger circle, and every circle grows as you zoom in. */
const sizeByCapacity = (scale: number): ExpressionSpecification => [
  'interpolate', ['linear'], ['get', 'mw'],
  1, 1.2 * scale,
  100, 2.2 * scale,
  1000, 4.5 * scale,
  5000, 8 * scale,
];

export const plantsLayer = (filter: ExpressionSpecification): LayerSpecification => ({
  id: LAYER_ID,
  type: 'circle',
  source: 'plants',
  filter,
  paint: {
    'circle-color': fuelColor,
    'circle-radius': ['interpolate', ['linear'], ['zoom'], 1, sizeByCapacity(1), 8, sizeByCapacity(2.6)],
    'circle-opacity': 0.85,
  },
});
