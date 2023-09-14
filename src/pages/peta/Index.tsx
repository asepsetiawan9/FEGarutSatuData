import dynamic from 'next/dynamic';
import React, { Suspense, useEffect, useState } from 'react';
import { FiColumns, FiX } from 'react-icons/fi';

import http from '@/helpers/http';
import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

import BreadcrumbsWrapper from '../../components/Breadcrumbs';
import Filter from './components/Filter';

type PetaDataType = {
  judul: string;
};

const Index = () => {
  const [dataMap, setDataMap] = useState('');
  const [secondMapData, setSecondMapData] = useState('');
  const [thirdMapData, setThirdMapData] = useState(''); // State untuk peta ketiga
  const [fourthMapData, setFourthMapData] = useState(''); // State untuk peta keempat
  const [data, setData] = useState<PetaDataType[]>([]);
  const [showSecondMap, setShowSecondMap] = useState(false);
  const [showThirdMap, setShowThirdMap] = useState(false); // State untuk peta ketiga
  const [showFourthMap, setShowFourthMap] = useState(false); // State untuk peta keempat
  const [, setIsLoading] = useState(true);
  const MapWithNoSSR = dynamic(() => import('./components/Map'), {
    ssr: false,
    loading: () => <p>Loading map...</p>,
  });
  const DynamicGarutMap = dynamic(() => import('./components/GarutMap'), {
    ssr: false,
    loading: () => <p>Loading map...</p>,
  });

  const Tabel = dynamic(() => import('./components/Tabel'), {
    ssr: false,
    loading: () => <p>Loading table...</p>,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await http().get('/peta');
        const resultData = response.data;
        setData(resultData);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleFilterSubmit = (dataMap: any) => {
    setDataMap(dataMap);
  };

  const handleSecondMapFilterSubmit = (secondMapData: any) => {
    setSecondMapData(secondMapData);
  };

  const handleThirdMapFilterSubmit = (thirdMapData: any) => {
    setThirdMapData(thirdMapData);
  };

  const handleFourthMapFilterSubmit = (fourthMapData: any) => {
    setFourthMapData(fourthMapData);
  };

  const showSecondMapOnClick = () => {
    if (showSecondMap === false) {
      setShowSecondMap(true);
      setShowThirdMap(false);
      setShowFourthMap(false);
    } else if (showThirdMap === false) {
      setShowSecondMap(true);
      setShowThirdMap(true);
      setShowFourthMap(false);
    } else if (showFourthMap === false) {
      setShowSecondMap(true);
      setShowThirdMap(true);
      setShowFourthMap(true);
    } else {
      setShowSecondMap(false);
      setShowThirdMap(false);
      setShowFourthMap(false);
    }
  };

  const showThirdMapOnClick = () => {
    setShowThirdMap(!showThirdMap);
  };

  const showFourthMapOnClick = () => {
    setShowFourthMap(!showFourthMap);
  };

  const closeSecondMap = () => {
    setShowSecondMap(!showSecondMap);
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
              onClick={showSecondMapOnClick}
            >
              {showFourthMap ? <FiX /> : <FiColumns />}
              <span>{showFourthMap ? 'Tutup Peta' : 'Peta Pembanding'}</span>
            </button>
          </div>
        </div>
        <div
          className={`grid grid-cols-1 gap-3 ${
            showSecondMap || showThirdMap || showFourthMap
              ? 'sm:grid-cols-2'
              : 'sm:grid-cols-1'
          } `}
        >
          <div
            className={`col-span-1 rounded border p-2 ${
              showSecondMap || showThirdMap || showFourthMap ? '' : ' w-full'
            }`}
          >
            <div className="py-3">
              <Filter dataFilter={data} onSubmit={handleFilterSubmit} />
            </div>
            <div className="flex w-full flex-col justify-center">
              {dataMap[0] ? (
                <div id="map" className="h-full w-full">
                  <Suspense fallback={<p>Loading map...</p>}>
                    {<MapWithNoSSR dataKecamatan={dataMap} />}
                  </Suspense>
                </div>
              ) : (
                <div id="map" className="h-full w-full">
                  <Suspense fallback={<p>Loading map...</p>}>
                    {<DynamicGarutMap />}
                  </Suspense>
                </div>
              )}
            </div>
            <div className="flex w-full flex-col justify-center">
              {dataMap[0] ? (
                <Suspense fallback={<p>Loading table...</p>}>
                  <Tabel data={dataMap} />
                </Suspense>
              ) : (
                <div className="flex items-center justify-center">
                  {/* tampilkan peta kabupaten garut dengan border  */}
                </div>
              )}
            </div>
          </div>
          {showSecondMap && (
            <div className="col-span-1 rounded border p-2">
              <div className="flex justify-end">
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={closeSecondMap}
                >
                  <FiX /> {/* Ikon Close */}
                </button>
              </div>
              <div className="py-3">
                <Filter
                  dataFilter={data}
                  onSubmit={handleSecondMapFilterSubmit}
                />
              </div>
              <div className="flex w-full flex-col justify-center">
                {secondMapData[0] ? (
                  <div id="map" className="w-full">
                    <Suspense fallback={<p>Loading map...</p>}>
                      {<MapWithNoSSR dataKecamatan={secondMapData} />}
                    </Suspense>
                  </div>
                ) : (
                  <div id="map" className="w-full">
                    <Suspense fallback={<p>Loading map...</p>}>
                      {<DynamicGarutMap />}
                    </Suspense>
                  </div>
                )}
              </div>
              <div className="flex w-full flex-col justify-center">
                {secondMapData[0] ? (
                  <Suspense fallback={<p>Loading table...</p>}>
                    <Tabel data={secondMapData} />
                  </Suspense>
                ) : (
                  <div className="flex items-center justify-center">
                    {/* tampilkan peta kabupaten garut dengan border  */}
                  </div>
                )}
              </div>
            </div>
          )}
          {showThirdMap && (
            <div className="col-span-1 rounded border p-2">
              <div className="flex justify-end">
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={showThirdMapOnClick}
                >
                  <FiX /> {/* Ikon Close */}
                </button>
              </div>
              <div className="py-3">
                <Filter
                  dataFilter={data}
                  onSubmit={handleThirdMapFilterSubmit}
                />
              </div>
              <div className="flex w-full flex-col justify-center">
                {thirdMapData[0] ? (
                  <div id="map" className="w-full">
                    <Suspense fallback={<p>Loading map...</p>}>
                      {<MapWithNoSSR dataKecamatan={thirdMapData} />}
                    </Suspense>
                  </div>
                ) : (
                  <div id="map" className="w-full">
                    <Suspense fallback={<p>Loading map...</p>}>
                      {<DynamicGarutMap />}
                    </Suspense>
                  </div>
                )}
              </div>
              <div className="flex w-full flex-col justify-center">
                {thirdMapData[0] ? (
                  <Suspense fallback={<p>Loading table...</p>}>
                    <Tabel data={thirdMapData} />
                  </Suspense>
                ) : (
                  <div className="flex items-center justify-center">
                    {/* tampilkan peta kabupaten garut dengan border  */}
                  </div>
                )}
              </div>
            </div>
          )}
          {showFourthMap && (
            <div className="col-span-1 rounded border p-2">
              <div className="flex justify-end">
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={showFourthMapOnClick}
                >
                  <FiX /> {/* Ikon Close */}
                </button>
              </div>
              <div className="py-3">
                <Filter
                  dataFilter={data}
                  onSubmit={handleFourthMapFilterSubmit}
                />
              </div>
              <div className="flex w-full flex-col justify-center">
                {fourthMapData[0] ? (
                  <div id="map" className="w-full">
                    <Suspense fallback={<p>Loading map...</p>}>
                      {<MapWithNoSSR dataKecamatan={fourthMapData} />}
                    </Suspense>
                  </div>
                ) : (
                  <div id="map" className="w-full">
                    <Suspense fallback={<p>Loading map...</p>}>
                      {<DynamicGarutMap />}
                    </Suspense>
                  </div>
                )}
              </div>
              <div className="flex w-full flex-col justify-center">
                {fourthMapData[0] ? (
                  <Suspense fallback={<p>Loading table...</p>}>
                    <Tabel data={fourthMapData} />
                  </Suspense>
                ) : (
                  <div className="flex items-center justify-center">
                    {/* tampilkan peta kabupaten garut dengan border  */}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </BreadcrumbsWrapper>
    </Main>
  );
};

export default Index;
