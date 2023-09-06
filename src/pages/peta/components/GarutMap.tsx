// Import next-absolute-url
import 'leaflet/dist/leaflet.css';

import type { LatLngTuple } from 'leaflet';
import React from 'react';
import { GeoJSON, MapContainer, TileLayer } from 'react-leaflet';

import GarutGeoJSON from './garut.json';

function GarutMap() {
  const center = [-7.3708, 107.8167];

  return (
    <MapContainer className="z-0" center={center as LatLngTuple} zoom={9}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <GeoJSON data={GarutGeoJSON} style={{ color: 'blue', weight: 2 }} />
    </MapContainer>
  );
}

export default GarutMap;
