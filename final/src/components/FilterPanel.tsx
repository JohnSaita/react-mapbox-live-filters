import { type Filters, MAX_MW, MAX_YEAR, MIN_YEAR } from '../map/filters';
import { FUELS, type FuelId } from '../map/fuels';

interface Props {
  filters: Filters;
  count: number;
  total: number;
  onToggleFuel: (id: FuelId) => void;
  onUpdate: (patch: Partial<Filters>) => void;
}

/** Plain React: it reads the filters and reports changes. It never touches the map. */
export const FilterPanel = ({ filters, count, total, onToggleFuel, onUpdate }: Props) => (
  <aside className="panel" aria-label="Filter power plants">
    <header>
      <p className="eyebrow">Geo Intelligence Lab</p>
      <h1>World power plants</h1>
    </header>

    <div className="count">
      <output data-testid="count">{count.toLocaleString('en-US')}</output>
      <span>of {total.toLocaleString('en-US')} plants</span>
    </div>

    <fieldset className="fuels">
      <legend>
        Fuel
        <span className="quick">
          <button type="button" onClick={() => onUpdate({ fuels: FUELS.map((f) => f.id) })}>All</button>
          <button type="button" onClick={() => onUpdate({ fuels: [] })}>None</button>
        </span>
      </legend>
      {FUELS.map((f) => (
        <label key={f.id} className="chip">
          <input type="checkbox" checked={filters.fuels.includes(f.id)} onChange={() => onToggleFuel(f.id)} />
          <span className="dot" style={{ background: f.color }} />
          {f.id}
        </label>
      ))}
    </fieldset>

    <label className="range">
      <span>
        Capacity at least <b>{filters.minMw.toLocaleString('en-US')} MW</b>
      </span>
      <input
        type="range"
        aria-label="Minimum capacity"
        min={0}
        max={MAX_MW}
        step={50}
        value={filters.minMw}
        onChange={(e) => onUpdate({ minMw: Number(e.target.value) })}
      />
    </label>

    <label className="range">
      <span>
        Built from <b>{filters.minYear === MIN_YEAR ? 'any year' : filters.minYear}</b>
      </span>
      <input
        type="range"
        aria-label="Built from"
        min={MIN_YEAR}
        max={MAX_YEAR}
        step={1}
        value={filters.minYear}
        onChange={(e) => onUpdate({ minYear: Number(e.target.value) })}
      />
    </label>

    <label className="unknown">
      <input
        type="checkbox"
        checked={filters.includeUnknownYear}
        onChange={(e) => onUpdate({ includeUnknownYear: e.target.checked })}
      />
      Include plants with no known year
    </label>
  </aside>
);
