import dynamic from 'next/dynamic';
import router from 'next/router';
import React, { Suspense, useEffect, useState } from 'react';
import { FiColumns } from 'react-icons/fi';
import { ColorRing } from 'react-loader-spinner';

import http from '@/helpers/http';
import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

import BreadcrumbsWrapper from '../../components/Breadcrumbs';
import Filter from './components/Filter';

type PetaDataType = {
  judul: string;
};
const Index = () => {
  // console.log(dummy);

  const [dataMap, setDataMap] = useState('');
  const [data, setData] = useState<PetaDataType[]>([]);
  const [, setIsLoading] = useState(true);
  const MapWithNoSSR = dynamic(() => import('./components/Map'), {
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

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const handleFilterSubmit = (dataMap: any) => {
    setDataMap(dataMap);
  };
  // console.log(featureCollection);

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
          {/* filter */}
          <div className="py-3">
            <Filter dataFilter={data} onSubmit={handleFilterSubmit} />
          </div>
        </div>
        {/* peta */}
        <div className="flex w-full flex-col justify-center">
          {dataMap[0] ? (
            <div id="map" className="w-full">
              <Suspense fallback={<p>Loading map...</p>}>
                {<MapWithNoSSR dataKecamatan={dataMap} />}
              </Suspense>
            </div>
          ) : (
            <p>Loading map...</p>
          )}
        </div>
        {/* tabel */}
        <div className="flex w-full flex-col justify-center">
          {dataMap[0] ? (
            <Suspense fallback={<p>Loading table...</p>}>
              <Tabel data={dataMap} />
            </Suspense>
          ) : (
            <div className="flex items-center justify-center">
              <ColorRing
                visible={true}
                height={80}
                width={80}
                ariaLabel="blocks-loading"
                colors={['#b8c480', '#B2A3B5', '#F4442E', '#51E5FF', '#429EA6']}
              />
            </div>
          )}
        </div>
      </BreadcrumbsWrapper>
    </Main>
  );
};

export default Index;
