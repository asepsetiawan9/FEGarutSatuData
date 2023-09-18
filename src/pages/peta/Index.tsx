import dynamic from 'next/dynamic';
import React, { Suspense, useEffect, useState } from 'react';
import { BsTable } from 'react-icons/bs';
import { FiColumns, FiMapPin, FiX } from 'react-icons/fi';

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
  const [activeTab, setActiveTab] = useState('peta');
  const [activeTab2, setActiveTab2] = useState('peta');
  const [activeTab3, setActiveTab3] = useState('peta');
  const [activeTab4, setActiveTab4] = useState('peta');
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

  const handleTabClick = (tabName: React.SetStateAction<string>) => {
    setActiveTab(tabName);
  };
  const handleTabClick2 = (tabName: React.SetStateAction<string>) => {
    setActiveTab2(tabName);
  };
  const handleTabClick3 = (tabName: React.SetStateAction<string>) => {
    setActiveTab3(tabName);
  };
  const handleTabClick4 = (tabName: React.SetStateAction<string>) => {
    setActiveTab4(tabName);
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

            <div className="flex flex-row justify-between border-b-2">
              <ul className="flex flex-wrap text-center text-sm font-medium text-gray-500 dark:text-gray-400">
                <li className="mr-2 rounded border-x border-t">
                  <a
                    role="button"
                    className={`${
                      activeTab === 'peta' ? 'activeTab ' : ''
                    }inline-flex rounded-t-lg border-b-2 ${
                      activeTab === 'peta' ? 'border-blue-600 ' : ''
                    }p-4 hover:border-gray-300 hover:text-gray-600 dark:hover:text-gray-300`}
                    onClick={() => handleTabClick('peta')}
                  >
                    <FiMapPin className="mr-1 mt-1" />
                    <span className="hidden md:inline-block">Peta</span>
                  </a>
                </li>

                <li className="mr-2 rounded border-x border-t">
                  <a
                    role="button"
                    className={`${
                      activeTab === 'tabel' ? 'activeTab ' : ''
                    }inline-flex rounded-t-lg border-b-2 border-transparent p-4 hover:border-gray-300 hover:text-gray-600 dark:hover:text-gray-300`}
                    onClick={() => handleTabClick('tabel')}
                  >
                    <BsTable className="mr-1 mt-1" />
                    <span className="hidden md:inline-block">Tabel</span>
                  </a>
                </li>
              </ul>
            </div>
            {/* Peta & tabel 1 */}
            {activeTab === 'peta' && (
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
            )}

            {activeTab === 'tabel' && (
              <div className="flex w-full flex-col justify-center">
                {dataMap[0] ? (
                  <Suspense fallback={<p>Loading table...</p>}>
                    <Tabel data={dataMap} />
                  </Suspense>
                ) : (
                  <div className="flex items-center justify-center py-5">
                    Pilih Filter Untuk Menampilkan Data Tabel
                  </div>
                )}
              </div>
            )}
          </div>
          {showSecondMap && (
            <div className="col-span-1 rounded border p-2">
              <div className="flex justify-end">
                <button
                  className="absolute inline text-red-500 hover:text-red-700"
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

              <div className="flex flex-row justify-between border-b-2">
                <ul className="flex flex-wrap text-center text-sm font-medium text-gray-500 dark:text-gray-400">
                  <li className="mr-2 rounded border-x border-t">
                    <a
                      role="button"
                      className={`${
                        activeTab2 === 'peta' ? 'activeTab ' : ''
                      }inline-flex rounded-t-lg border-b-2  ${
                        activeTab2 === 'peta' ? 'border-blue-600 ' : ''
                      }p-4 hover:border-gray-300 hover:text-gray-600 dark:hover:text-gray-300`}
                      onClick={() => handleTabClick2('peta')}
                    >
                      <FiMapPin className="mr-1 mt-1" />
                      <span className="hidden md:inline-block">Peta</span>
                    </a>
                  </li>

                  <li className="mr-2 rounded border-x border-t">
                    <a
                      role="button"
                      className={`${
                        activeTab2 === 'tabel' ? 'activeTab ' : ''
                      }inline-flex rounded-t-lg border-b-2 border-transparent p-4 hover:border-gray-300 hover:text-gray-600 dark:hover:text-gray-300`}
                      onClick={() => handleTabClick2('tabel')}
                    >
                      <BsTable className="mr-1 mt-1" />
                      <span className="hidden md:inline-block">Tabel</span>
                    </a>
                  </li>
                </ul>
              </div>
              {activeTab2 === 'peta' && (
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
              )}

              {activeTab2 === 'tabel' && (
                <div className="flex w-full flex-col justify-center">
                  {secondMapData[0] ? (
                    <Suspense fallback={<p>Loading table...</p>}>
                      <Tabel data={secondMapData} />
                    </Suspense>
                  ) : (
                    <div className="flex items-center justify-center py-5">
                      Pilih Filter Untuk Menampilkan Data Tabel
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
          {showThirdMap && (
            <div className="col-span-1 rounded border p-2">
              <div className="flex justify-end">
                <button
                  className="absolute inline text-red-500 hover:text-red-700"
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

              <div className="flex flex-row justify-between border-b-2">
                <ul className="flex flex-wrap text-center text-sm font-medium text-gray-500 dark:text-gray-400">
                  <li className="mr-2 rounded border-x border-t">
                    <a
                      role="button"
                      className={`${
                        activeTab3 === 'peta' ? 'activeTab ' : ''
                      }inline-flex rounded-t-lg border-b-2 ${
                        activeTab3 === 'peta' ? 'border-blue-600 ' : ''
                      }p-4 hover:border-gray-300 hover:text-gray-600 dark:hover:text-gray-300`}
                      onClick={() => handleTabClick3('peta')}
                    >
                      <FiMapPin className="mr-1 mt-1" />
                      <span className="hidden md:inline-block">Peta</span>
                    </a>
                  </li>

                  <li className="mr-2 rounded border-x border-t">
                    <a
                      role="button"
                      className={`${
                        activeTab3 === 'tabel' ? 'activeTab ' : ''
                      }inline-flex rounded-t-lg border-b-2 border-transparent p-4 hover:border-gray-300 hover:text-gray-600 dark:hover:text-gray-300`}
                      onClick={() => handleTabClick3('tabel')}
                    >
                      <BsTable className="mr-1 mt-1" />
                      <span className="hidden md:inline-block">Tabel</span>
                    </a>
                  </li>
                </ul>
              </div>

              {activeTab3 === 'peta' && (
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
              )}
              {activeTab3 === 'tabel' && (
                <div className="flex w-full flex-col justify-center">
                  {thirdMapData[0] ? (
                    <Suspense fallback={<p>Loading table...</p>}>
                      <Tabel data={thirdMapData} />
                    </Suspense>
                  ) : (
                    <div className="flex items-center justify-center py-5">
                      Pilih Filter Untuk Menampilkan Data Tabel
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
          {showFourthMap && (
            <div className="col-span-1 rounded border p-2">
              <div className="flex justify-end">
                <button
                  className="absolute inline text-red-500 hover:text-red-700"
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

              <div className="flex flex-row justify-between border-b-2">
                <ul className="flex flex-wrap text-center text-sm font-medium text-gray-500 dark:text-gray-400">
                  <li className="mr-2 rounded border-x border-t">
                    <a
                      role="button"
                      className={`${
                        activeTab4 === 'peta' ? 'activeTab ' : ''
                      }inline-flex rounded-t-lg border-b-2 ${
                        activeTab4 === 'peta' ? 'border-blue-600 ' : ''
                      }p-4 hover:border-gray-300 hover:text-gray-600 dark:hover:text-gray-300`}
                      onClick={() => handleTabClick4('peta')}
                    >
                      <FiMapPin className="mr-1 mt-1" />
                      <span className="hidden md:inline-block">Peta</span>
                    </a>
                  </li>

                  <li className="mr-2 rounded border-x border-t">
                    <a
                      role="button"
                      className={`${
                        activeTab4 === 'tabel' ? 'activeTab ' : ''
                      }inline-flex rounded-t-lg border-b-2 border-transparent p-4 hover:border-gray-300 hover:text-gray-600 dark:hover:text-gray-300`}
                      onClick={() => handleTabClick4('tabel')}
                    >
                      <BsTable className="mr-1 mt-1" />
                      <span className="hidden md:inline-block">Tabel</span>
                    </a>
                  </li>
                </ul>
              </div>

              {activeTab4 === 'peta' && (
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
              )}
              {activeTab4 === 'tabel' && (
                <div className="flex w-full flex-col justify-center">
                  {fourthMapData[0] ? (
                    <Suspense fallback={<p>Loading table...</p>}>
                      <Tabel data={fourthMapData} />
                    </Suspense>
                  ) : (
                    <div className="flex items-center justify-center py-5">
                      Pilih Filter Untuk Menampilkan Data Tabel
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </BreadcrumbsWrapper>
    </Main>
  );
};

export default Index;
