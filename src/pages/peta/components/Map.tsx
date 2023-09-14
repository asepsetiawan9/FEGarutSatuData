/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/no-use-before-define */
import 'leaflet/dist/leaflet.css';

import type { FeatureCollection } from 'geojson';
import type { LeafletMouseEvent } from 'leaflet';
import { useState } from 'react';
import { GeoJSON, MapContainer, TileLayer, useMap } from 'react-leaflet';

interface Coords {
  lat: number;
  lng: number;
}

function ChangeView({ coords }: { coords: Coords }): null {
  const map = useMap();
  map.setView(coords, 12);
  map.setView(coords, map.getZoom() - 2);
  return null;
}

type MapProps = {
  dataKecamatan: FeatureCollection;
};
export default function Map({ dataKecamatan }: MapProps) {
  const featureCollection = {
    type: 'FeatureCollection',
    features: dataKecamatan[0]?.peta_values.map((feature) => ({
      type: 'Feature',
      geometry: {
        type: 'MultiPolygon',
        coordinates: JSON.parse(feature.geometry.coordinates),
      },
      properties: {
        kabupaten: 'GARUT',
        tahun: dataKecamatan[0].judul,
        kecamatan: feature.kec_name,
        provinsi: 'JAWA BARAT',
        nilai: feature.nilai,
        judulData: dataKecamatan[0].judul,
        keterangan: feature.keterangan,
      },
    })),
  };

  const [geoData] = useState<Coords>({
    lat: -7.3708,
    lng: 107.8167,
  });
  const center: [number, number] = [geoData.lat, geoData.lng];
  const rangeColors = ['#0B2447', '#27529e', '#576CBC', '#7b8ac4', '#A5D7E8'];

  const getColor = (value: number, _ranges: number) => {
    const index = result.range.findIndex((range: string) => {
      const rangeParts = range.split('-');
      const lowerBound = rangeParts[0] ? parseInt(rangeParts[0], 10) : 0;
      const upperBound = rangeParts[1] ? parseInt(rangeParts[1], 10) : 0;
      return lowerBound <= value && value <= upperBound;
    });
    return rangeColors[index];
  };

  const geoJsonStyle = (feature: any) => {
    const nilaiValue = parseInt(feature.properties.nilai, 10);
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const arr = featureCollection.features.map((feature: any) =>
      parseInt(feature.properties.nilai, 10)
    );
    const maxValue = Math.max(...arr);
    const range = Math.ceil(maxValue / 5);

    return {
      fillColor: getColor(nilaiValue, range),
      weight: 1,
      opacity: 2,
      color: '#fff', // warna border
      // dashArray: '3',
      fillOpacity: 0.9,
      // feature._leaflet_pos || new Point(0, 0),
    };
    // return el._leaflet_pos || new Point(0, 0);
  };

  const onEachFeature = (feature: any, layer: any) => {
    layer.on({
      mouseover: (event: LeafletMouseEvent) => {
        // eslint-disable-next-line @typescript-eslint/no-shadow
        const layer = event.target;
        const nilaiAsString = feature.properties.nilai;

        const nilaiAsInteger = parseInt(nilaiAsString, 10);

        const formattedNumber = nilaiAsInteger.toLocaleString();
        layer.setStyle({ color: '#232323', weight: 3 });
        layer
          .bindPopup(
            `Judul Data : <b> ${feature.properties.judulData}</b> <br />
            Kecamatan : <b> ${feature.properties.kecamatan}</b><br />
            Kabupaten : <b> Garut</b><br />
             Total : ${formattedNumber}<br />
             Keterangan: ${
               feature.properties.nilai === null
                 ? feature.properties.keterangan
                 : 'Tidak Ada Keterangan'
             }`
          )
          .openPopup();
      },

      mouseout: () => {
        layer.setStyle({ color: '#fff', weight: 1 });
        layer.closePopup();
      },
    });
  };

  const arr = featureCollection.features.map((feature: any) =>
    parseInt(feature.properties.nilai, 10)
  );
  const maxValue = Math.max(...arr);
  const range = Math.ceil(maxValue / 5);

  const initialCount = new Array(Math.ceil((maxValue + 1) / range)).fill(0);

  const result = arr.reduce(
    (acc: { count: number[]; range: string[] }, val: number) => {
      const index = Math.floor(val / range);
      acc.count[index] = (acc.count[index] || 0) + 1;
      const min = index * range;
      const max = (index + 1) * range - 1;
      const rangeStr = `${min}-${max}`;
      if (!acc.range.includes(rangeStr)) {
        acc.range.push(rangeStr);
      }
      return acc;
    },
    { count: initialCount, range: [] }
  );

  result.range.sort((a: string, b: string) => {
    const rangePartsA = a.split('-');
    const rangePartsB = b.split('-');
    const maxA = rangePartsA[1] ? parseInt(rangePartsA[1], 10) : 0;
    const maxB = rangePartsB[1] ? parseInt(rangePartsB[1], 10) : 0;
    return maxB - maxA;
  });

  const legend = (
    // eslint-disable-next-line tailwindcss/no-custom-classname
    <div className="leaflet-bottom leaflet-left posis mb-2 ml-2 rounded bg-white px-4 py-2">
      <div>Keterangan :</div>
      {result.range.map((range, index) => {
        const [minStr, maxStr] = range.split('-');
        const min = parseInt(minStr, 10);
        const max = parseInt(maxStr, 10);
        return (
          <div key={index}>
            <i
              style={{
                backgroundColor: rangeColors[index],
                display: 'inline-block',
                width: '15px',
                height: '15px',
                marginRight: '5px',
              }}
            ></i>
            {`${min.toLocaleString()} - ${max.toLocaleString()}`}
          </div>
        );
      })}
    </div>
  );

  return (
    <>
      <MapContainer className="z-0" center={center} zoom={11}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ChangeView coords={{ lat: center[0], lng: center[1] }} />

        <GeoJSON
          data={featureCollection}
          onEachFeature={onEachFeature}
          style={geoJsonStyle}
        />
        {legend}
      </MapContainer>
    </>
  );
}
