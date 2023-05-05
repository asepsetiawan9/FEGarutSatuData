import dynamic from 'next/dynamic';
import router from 'next/router';
import React, { Suspense, useEffect, useState } from 'react';
import { FiColumns } from 'react-icons/fi';

import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

import kecamatanData from '../../../public/kecamatan.json';
import BreadcrumbsWrapper from '../../components/Breadcrumbs';
import Filter from './components/Filter';
import dataPeta from './dummy.json';

const Index = () => {
  const MapWithNoSSR = dynamic(() => import('./components/Map'), {
    ssr: false,
    loading: () => <p>Loading map...</p>,
  });

  const Tabel = dynamic(() => import('./components/Tabel'), {
    ssr: false,
    loading: () => <p>Loading table...</p>,
  });

  const [dataMap, setDataMap] = useState(kecamatanData);

  useEffect(() => {
    if (typeof window !== 'undefined' && dataMap.url) {
      fetch(`http://localhost:3000/${dataMap.url}`)
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error('Failed to fetch data');
        })
        .then((data) => {
          setDataMap(data);
        })
        .catch((error) => console.error(error));
    }
  }, [dataMap.url]);

  const featureCollection = {
    type: 'FeatureCollection',
    features: dataMap.features?.map((feature) => ({
      type: 'Feature',
      geometry: {
        type: 'MultiPolygon',
        coordinates: feature.geometry.coordinates,
      },
      properties: {
        ...feature.properties,
      },
    })),
  };

  const handleFilterSubmit = (dataMap: any) => {
    setDataMap(dataMap);
  };

  return (
    <Main
      meta={
        <Meta
          title="Peta"
          description="Satu Data Garut adalah portal terintegrasi untuk pengelolaan, keterbukaan, dan kemudahan akses data bagi warga dan pemerintah Kabupaten Garut."
        />
      }
    >
      <BreadcrumbsWrapper>
        <div className="w-full">
          <div className="flex flex-row justify-between">
            <h1 className="pb-5 text-left">Peta Kecamatan Garut</h1>
            <button
              className="flex items-center space-x-2 rounded bg-blue-500 px-3 py-1 text-sm text-white hover:bg-blue-700"
              onClick={() => router.push('/peta/pembanding')}
            >
              <FiColumns />
              <span>Peta Pembanding</span>
            </button>
          </div>
          <div className="py-3">
            <Filter dataFilter={dataPeta} onSubmit={handleFilterSubmit} />
          </div>
        </div>
      </BreadcrumbsWrapper>
      <div className="flex w-full flex-col justify-center">
        {dataMap.features ? (
          <div id="map" className="w-full">
            <Suspense fallback={<p>Loading map...</p>}>
              {MapWithNoSSR && (
                <MapWithNoSSR dataKecamatan={featureCollection} />
              )}
            </Suspense>
          </div>
        ) : (
          <p>Loading map...</p>
        )}
      </div>
      <div className="flex w-full flex-col justify-center">
        {dataMap.features ? (
          <Suspense fallback={<p>Loading table...</p>}>
            <Tabel data={dataMap} />
          </Suspense>
        ) : (
          <p>Loading table...</p>
        )}
      </div>
    </Main>
  );
};

export default Index;
