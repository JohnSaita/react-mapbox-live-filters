import { useCallback, useState } from 'react';

import { type Filters, INITIAL_FILTERS } from '../map/filters';
import type { FuelId } from '../map/fuels';

export const useFilters = () => {
  const [filters, setFilters] = useState<Filters>(INITIAL_FILTERS);

  const toggleFuel = useCallback((id: FuelId) => {
    setFilters((f) => ({
      ...f,
      fuels: f.fuels.includes(id) ? f.fuels.filter((x) => x !== id) : [...f.fuels, id],
    }));
  }, []);

  const update = useCallback((patch: Partial<Filters>) => {
    setFilters((f) => ({ ...f, ...patch }));
  }, []);

  return { filters, toggleFuel, update };
};
