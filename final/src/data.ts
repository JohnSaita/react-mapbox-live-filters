import type { Plants } from './types';

export const loadPlants = async (): Promise<Plants> => {
  const res = await fetch(`${import.meta.env.BASE_URL}data/plants.geojson`);
  if (!res.ok) throw new Error(`Could not load plants.geojson (${res.status})`);
  return (await res.json()) as Plants;
};
