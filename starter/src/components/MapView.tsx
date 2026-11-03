import mapboxgl from 'mapbox-gl';
import { useEffect, useRef } from 'react';

import { buildFilter, type Filters } from '../map/filters';
import { LAYER_ID, plantsLayer, STYLE } from '../map/layers';
import type { Plants } from '../types';

const ATTRIBUTION = 'Data: WRI Global Power Plant Database v1.3.0 (CC BY 4.0).';

interface Props {
  token: string;
  data: Plants;
  filters: Filters;
  onCount: (count: number) => void;
}

export const MapView = ({ token, data, filters, onCount }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);

  // Create the map once.
  useEffect(() => {
    if (!containerRef.current) return;

    const map = new mapboxgl.Map({
      container: containerRef.current,
      accessToken: token,
      style: STYLE,
      projection: 'mercator',
      renderWorldCopies: false,
      center: [24, 22],
      zoom: 1.5,
      customAttribution: ATTRIBUTION,
    });
    mapRef.current = map;
    map.addControl(new mapboxgl.NavigationControl({ showCompass: false }), 'top-right');

    map.on('style.load', () => {
      map.addSource('plants', { type: 'geojson', data });
      map.addLayer(plantsLayer);
    });

    // Ask the map how many plants it has drawn.
    map.on('idle', () => {
      if (map.getLayer(LAYER_ID)) onCount(map.queryRenderedFeatures({ layers: [LAYER_ID] }).length);
    });

    return () => {
      map.remove();
      mapRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, data]);

  // Filters changed: hand Mapbox the new expression. Skip the first run: nothing is filtered yet.
  const firstRun = useRef(true);
  useEffect(() => {
    if (firstRun.current) { firstRun.current = false; return; }
    const map = mapRef.current;
    if (map?.getLayer(LAYER_ID)) map.setFilter(LAYER_ID, buildFilter(filters));
  }, [filters]);

  return <div ref={containerRef} className="map" />;
};
