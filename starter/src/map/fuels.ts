export const FUELS = [
  { id: 'Solar', color: '#F7C948' },
  { id: 'Wind', color: '#4FD1C5' },
  { id: 'Hydro', color: '#4C9BF5' },
  { id: 'Gas', color: '#F2894B' },
  { id: 'Coal', color: '#A6ADBB' },
  { id: 'Oil', color: '#C77DDB' },
  { id: 'Nuclear', color: '#FF5C7A' },
  { id: 'Geothermal', color: '#7BE36A' },
  { id: 'Other', color: '#8A94A6' },
] as const;

export type FuelId = (typeof FUELS)[number]['id'];
