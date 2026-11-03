import { useEffect, useMemo, useState } from 'react';

import { FilterPanel } from './components/FilterPanel';
import { MapView } from './components/MapView';
import { loadPlants } from './data';
import { useFilters } from './hooks/useFilters';
import { matches } from './map/filters';
import type { Plants } from './types';

const TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

export const App = () => {
  const [data, setData] = useState<Plants | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { filters, toggleFuel, update } = useFilters();

  useEffect(() => {
    loadPlants().then(setData, (e: Error) => setError(e.message));
  }, []);

  // Counted from the data, so the number is the same at every zoom.
  const count = useMemo(
    () => data?.features.filter((f) => matches(f.properties, filters)).length ?? 0,
    [data, filters],
  );

  if (!TOKEN) return <p className="message">Add VITE_MAPBOX_TOKEN to a .env file (see .env.example), then restart npm run dev.</p>;
  if (error) return <p className="message">{error}</p>;
  if (!data) return <p className="message">Loading…</p>;

  return (
    <div className="layout">
      <MapView token={TOKEN} data={data} filters={filters} />
      <FilterPanel
        filters={filters}
        count={count}
        total={data.features.length}
        onToggleFuel={toggleFuel}
        onUpdate={update}
      />
    </div>
  );
};
