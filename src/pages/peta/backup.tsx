/* eslint-disable import/no-extraneous-dependencies */
import dynamic from 'next/dynamic';
import React, { Suspense, useEffect, useState } from 'react';
import { FiColumns } from 'react-icons/fi';

import BreadcrumbsWrapper from '@/components/Breadcrumbs';
import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

import kecamatanData from '../../../public/kecamatan.json';
import Filter from './components/Filter';
import dataPeta from './dummy.json';
// eslint-disable-next-line import/no-named-as-default
// import Tabel from './Tabel';
const Pembanding = () => {
  const MapWithNoSSR = dynamic(() => import('./components/Map'), {
    ssr: false,
    loading: () => <p>Loading map...</p>,
  });

  const Tabel = dynamic(() => import('./components/Tabel'), {
    ssr: false,
    loading: () => <p>Loading table...</p>,
  });

  const [showMap3, setShowMap3] = useState(false);
  const [showMap4, setShowMap4] = useState(false);

  const handleAddMap = () => {
    if (!showMap3) {
      setShowMap3(true);
    } else if (!showMap4) {
      setShowMap4(true);
    }
  };

  const [dataMap, setDataMap] = useState(kecamatanData);
  const [dataMap2, setDataMap2] = useState(kecamatanData);

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
  useEffect(() => {
    if (typeof window !== 'undefined' && dataMap2.url) {
      fetch(`http://localhost:3000/${dataMap2.url}`)
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error('Failed to fetch data');
        })
        .then((data) => {
          setDataMap2(data);
        })
        .catch((error) => console.error(error));
    }
  }, [dataMap2.url]);

  const featureCollection2 = {
    type: 'FeatureCollection',
    features: dataMap2.features?.map((feature) => ({
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

  const handleFilterSubmit2 = (dataMap2: any) => {
    setDataMap2(dataMap2);
  };
  return (
    <Main
      meta={
        <Meta
          title="Peta Pembanding"
          description="Satu Data Garut adalah portal terintegrasi untuk pengelolaan, keterbukaan, dan kemudahan akses data bagi warga dan pemerintah Kabupaten Garut."
        />
      }
    >
      <BreadcrumbsWrapper>
        <div className="w-full">
          <div className="flex flex-row justify-between py-3">
            <h1 className="pb-5 text-left">Peta Pembanding</h1>
            <button
              className="flex items-center space-x-2 rounded bg-blue-500 px-3 py-1 text-sm text-white hover:bg-blue-700"
              onClick={handleAddMap}
            >
              <FiColumns />
              <span>Tambah Peta</span>
            </button>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="col-span-1 rounded border p-2">
              <div className="py-3">
                <Filter dataFilter={dataPeta} onSubmit={handleFilterSubmit} />
              </div>
              <div className="flex flex-col justify-center">
                <h1 className="pb-5 text-left">Peta Kecamatan Garut</h1>
                <div id="map" className=" w-full">
                  {dataMap.features ? (
                    <div id="map" className="w-full">
                      <React.Suspense fallback={<p>Loading map...</p>}>
                        {MapWithNoSSR && (
                          <MapWithNoSSR dataKecamatan={featureCollection} />
                        )}
                      </React.Suspense>
                    </div>
                  ) : (
                    <p>Loading map...</p>
                  )}
                </div>
              </div>
              <div className="w-full">
                {dataMap.features ? (
                  <React.Suspense fallback={<p>Loading table...</p>}>
                    <Tabel data={dataMap} />
                  </React.Suspense>
                ) : (
                  <p>Loading table...</p>
                )}
              </div>
            </div>
            <div className="col-span-1 rounded border p-2">
              <Filter dataFilter={dataPeta} onSubmit={handleFilterSubmit2} />
              <div className="flex flex-col justify-center">
                <h1 className="pb-5 text-left">Peta Kecamatan Garut</h1>
                <div id="map" className=" w-full">
                  {dataMap2.features ? (
                    <div id="map" className="w-full">
                      <Suspense fallback={<p>Loading map...</p>}>
                        {MapWithNoSSR && (
                          <MapWithNoSSR dataKecamatan={featureCollection2} />
                        )}
                      </Suspense>
                    </div>
                  ) : (
                    <p>Loading map...</p>
                  )}
                </div>
              </div>

              <div className="w-full">
                <React.Suspense fallback={<p>Loading table...</p>}>
                  <Tabel data={kecamatanData} />
                </React.Suspense>
              </div>
            </div>
            {/* peta ke 3 */}
            <div
              className={`col-span-1 rounded border p-2 ${
                showMap3 ? '' : 'hidden'
              }`}
            >
              <div className="py-3">{/* <Filter /> */}</div>
              <div className="flex flex-col justify-center">
                <div className="flex flex-row justify-between">
                  <h1 className="pb-5 text-left">Peta Kecamatan Garut</h1>
                  <div>
                    <svg
                      onClick={() => setShowMap3(false)}
                      className="h-6 w-6 cursor-pointer"
                      viewBox="0 0 20 20"
                      fill="red"
                    >
                      <path
                        fillRule="evenodd"
                        d="M11.2929,10 L16.6464,4.64645 C17.2374,4.05547 17.2374,3.09632 16.6464,2.50534 C16.0555,1.91436 15.0963,1.91436 14.5053,2.50534 L9.15176,7.85888 L3.79822,2.50534 C3.20724,1.91436 2.24809,1.91436 1.65711,2.50534 C1.06613,3.09632 1.06613,4.05547 1.65711,4.64645 L7.01066,10 L1.65711,15.3536 C1.06613,15.9445 1.06613,16.9037 1.65711,17.4947 C2.24809,18.0856 3.20724,18.0856 3.79822,17.4947 L9.15176,12.1411 L14.5053,17.4947 C15.0963,18.0856 16.0555,18.0856 16.6464,17.4947 C17.2374,16.9037 17.2374,15.9445 16.6464,15.3536 L11.2929,10 Z"
                      />
                    </svg>
                  </div>
                </div>

                <div id="map" className=" w-full">
                  <MapWithNoSSR dataKecamatan={kecamatanData} />
                </div>
              </div>

              <div className="w-full">
                <React.Suspense fallback={<p>Loading table...</p>}>
                  <Tabel data={kecamatanData} />
                </React.Suspense>
              </div>
            </div>
            {/* peta ke 4 */}
            <div
              className={`col-span-1 rounded border p-2 ${
                showMap4 ? '' : 'hidden'
              }`}
            >
              <div className="py-3">{/* <Filter /> */}</div>
              <div className="flex flex-col justify-center">
                <div className="flex flex-row justify-between">
                  <h1 className="pb-5 text-left">Peta Kecamatan Garut</h1>
                  <div>
                    <svg
                      onClick={() => setShowMap4(false)}
                      className="h-6 w-6 cursor-pointer"
                      viewBox="0 0 20 20"
                      fill="red"
                    >
                      <path
                        fillRule="evenodd"
                        d="M11.2929,10 L16.6464,4.64645 C17.2374,4.05547 17.2374,3.09632 16.6464,2.50534 C16.0555,1.91436 15.0963,1.91436 14.5053,2.50534 L9.15176,7.85888 L3.79822,2.50534 C3.20724,1.91436 2.24809,1.91436 1.65711,2.50534 C1.06613,3.09632 1.06613,4.05547 1.65711,4.64645 L7.01066,10 L1.65711,15.3536 C1.06613,15.9445 1.06613,16.9037 1.65711,17.4947 C2.24809,18.0856 3.20724,18.0856 3.79822,17.4947 L9.15176,12.1411 L14.5053,17.4947 C15.0963,18.0856 16.0555,18.0856 16.6464,17.4947 C17.2374,16.9037 17.2374,15.9445 16.6464,15.3536 L11.2929,10 Z"
                      />
                    </svg>
                  </div>
                </div>

                <div id="map" className=" w-full">
                  <MapWithNoSSR dataKecamatan={kecamatanData} />
                </div>
              </div>

              <div className="w-full">
                <React.Suspense fallback={<p>Loading table...</p>}>
                  <Tabel data={kecamatanData} />
                </React.Suspense>
              </div>
            </div>
          </div>
        </div>
      </BreadcrumbsWrapper>
    </Main>
  );
};

export default Pembanding;