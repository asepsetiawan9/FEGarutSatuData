/* eslint-disable import/no-extraneous-dependencies */
import dynamic from 'next/dynamic';
import router from 'next/router';
import React from 'react';
import { FiColumns } from 'react-icons/fi';

import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

import kecamatanData from '../../../public/kecamatan.json';
// eslint-disable-next-line import/no-named-as-default
import Filter from './components/Filter';
// import Tabel from './Tabel';

const Index = () => {
  const MapWithNoSSR = dynamic(() => import('./components/Map'), {
    ssr: false,
    loading: () => <p>Loading map...</p>,
  });

  const Tabel = dynamic(() => import('./components/Tabel'), {
    ssr: false,
    loading: () => <p>Loading table...</p>,
  });

  return (
    <Main
      meta={
        <Meta
          title="Peta"
          description="Satu Data Garut adalah portal terintegrasi untuk pengelolaan, keterbukaan, dan kemudahan akses data bagi warga dan pemerintah Kabupaten Garut."
        />
      }
    >
      <div className="w-full">
        <div>bread</div>
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
          <Filter />
        </div>
        <div className="flex  w-full flex-col  justify-center">
          <div id="map" className=" w-full">
            <MapWithNoSSR dataKecamatan={kecamatanData} />
          </div>
        </div>

        <React.Suspense fallback={<p>Loading table...</p>}>
          <Tabel data={kecamatanData} />
        </React.Suspense>
      </div>
    </Main>
  );
};

export default Index;
