# Live Map Filters with Mapbox Expressions in React (starter)

The broken version from the Geo Intelligence Lab video. It has three bugs:

1. `src/map/filters.ts`: the fuel list isn't wrapped in `literal`, so Mapbox rejects the filter
2. `src/map/filters.ts`: comparing a null year fails, so half the plants vanish
3. `src/components/MapView.tsx`: the count uses `queryRenderedFeatures`, so it changes with the zoom

Run it the same way as `final`, then fix each one along with the video.
