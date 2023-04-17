/* eslint-disable import/no-extraneous-dependencies */
import dynamic from 'next/dynamic';
import React from 'react';

import BreadcrumbsWrapper from '@/components/Breadcrumbs';
import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

import kecamatanData from '../../../public/kecamatan.json';
// eslint-disable-next-line import/no-named-as-default
import Filter from './components/Filter';
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
          <div>bread</div>
          <div className="grid grid-cols-2 gap-3">
            <div className="col-span-1">
              <div className="py-3">
                <Filter />
              </div>
              <div className="flex flex-col justify-center">
                <h1 className="pb-5 text-left">Peta Kecamatan Garut</h1>
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
            <div className="col-span-1">
              <div className="py-3">
                <Filter />
              </div>
              <div className="flex flex-col justify-center">
                <h1 className="pb-5 text-left">Peta Kecamatan Garut</h1>
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
