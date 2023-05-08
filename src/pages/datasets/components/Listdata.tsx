/* eslint-disable react/jsx-key */
import React from 'react';
import { FiCalendar, FiEye } from 'react-icons/fi';

const Listdata = ({ dataSend }) => {
  return (
    <>
      <div className="pb-2 text-base font-bold">Daftar Data</div>
      <div className="flex flex-col gap-2 text-base">
        {dataSend.map(
          (data: {
            id: React.Key | null | undefined;
            judul:
              | string
              | number
              | boolean
              | React.ReactElement<
                  any,
                  string | React.JSXElementConstructor<any>
                >
              | React.ReactFragment
              | React.ReactPortal
              | null
              | undefined;
            tahun:
              | string
              | number
              | boolean
              | React.ReactElement<
                  any,
                  string | React.JSXElementConstructor<any>
                >
              | React.ReactFragment
              | React.ReactPortal
              | null
              | undefined;
            waktu:
              | string
              | number
              | boolean
              | React.ReactElement<
                  any,
                  string | React.JSXElementConstructor<any>
                >
              | React.ReactFragment
              | React.ReactPortal
              | null
              | undefined;
          }) => (
            <div key={data.id} className="flex flex-row justify-between">
              <div>
                {data.judul} - Tahun {data.tahun}
              </div>
              <div className="flex flex-row gap-2">
                <div className="flex flex-row gap-1 !text-sm">
                  <FiCalendar className="mt-1" /> {data.waktu}
                </div>
                <div className="flex flex-row gap-1 !text-sm">
                  <FiEye className="mt-1" /> 10
                </div>
              </div>
            </div>
          )
        )}
      </div>
      <div className="pb-2 pt-5 text-base font-bold">Rekomendasi Dataset</div>
      <div className="flex flex-col gap-2 text-base">
        <div>
          Jumlah Penduduk Berdasarkan Usia Per Kecamatan di Kabupaten Garut
        </div>
        <div>Jumlah PNS di Kabupaten Garut</div>
        <div>Ketersediaan Pangan di Kabupaten Garut</div>
      </div>
    </>
  );
};

export default Listdata;
