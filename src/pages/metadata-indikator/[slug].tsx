import 'react-toastify/dist/ReactToastify.css';

import type { GetServerSideProps, GetServerSidePropsContext } from 'next';
import Link from 'next/link';
import React, { useState } from 'react';

import BreadcrumbsWrapper from '@/components/Breadcrumbs';
import http from '@/helpers/http';
import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

// import data from './dummydetail.json';

type DetalMsVarType = {
  ms_keg: any;
  nama_indikator: any;
  konsep: string;
  definisi: string;
  interpretasi: string;
  metode_rumus: string;
  ukuran: string;
  satuan: string;
  kualifikasi_isian: string;
  klasifikasi_penyajian: string;
  komposit: number;
  ip_publikasi_ketersediaan: string;
  ip_nama: string;
  vp_kegiatan_penghasil: string;
  vp_kode_keg: string;
  vp_nama: string;
  level_estimasi: string;
  akses_umum: number;
  metadata_indikator: any;
};

const MetadataIndikator = ({ data }: { data: DetalMsVarType }) => {
  const [dataDetail] = useState(data);

  function capitalizeFirstLetterOfEachWord(str) {
    return str
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  return (
    <Main
      meta={
        <Meta
          title={`Dataset ${dataDetail?.nama_indikator}`}
          description={`Data terkait Dataset ${dataDetail?.nama_indikator}`}
        />
      }
    >
      <BreadcrumbsWrapper>
        <div className="px-4">
          <h1 className="mb-2 text-xl font-bold sm:text-2xl">
            {dataDetail?.nama_indikator
              ? capitalizeFirstLetterOfEachWord(dataDetail?.nama_indikator)
              : ''}
          </h1>
          <div className="pt-2 text-base">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="font-semibold">Nama Indikator :</div>
                <div className="font-normal">
                  {dataDetail.nama_indikator || '-'}
                </div>
              </div>
              <div>
                <div className="font-semibold">Konsep :</div>
                <div className="font-normal">{dataDetail.konsep || '-'}</div>
              </div>
              <div>
                <div className="font-semibold">Definisi :</div>
                <div className="font-normal">{dataDetail.definisi || '-'}</div>
              </div>
              <div>
                <div className="font-semibold">Interpretasi :</div>
                <div className="font-normal">
                  {dataDetail.interpretasi || '-'}
                </div>
              </div>
              <div>
                <div className="font-semibold">Metode/Rumus Penghitungan :</div>
                <div className="font-normal">
                  {dataDetail.metode_rumus || '-'}
                </div>
              </div>
              <div>
                <div className="font-semibold">Ukuran:</div>
                <div className="font-normal">{dataDetail.ukuran || '-'}</div>
              </div>
              <div>
                <div className="font-semibold">Satuan :</div>
                <div className="font-normal">{dataDetail.satuan || '-'}</div>
              </div>
              <div>
                <div className="font-semibold">Klasifikasi Isian :</div>
                <div className="font-normal">
                  {dataDetail.kualifikasi_isian || '-'}
                </div>
              </div>
              <div>
                <div className="font-semibold">Klasifikasi Penyajian :</div>
                <div className="font-normal">
                  {dataDetail.klasifikasi_penyajian || '-'}
                </div>
              </div>

              <div>
                <div className="font-semibold">Indikator Komposit?</div>
                <div className="font-normal">
                  {dataDetail.komposit === 1 ? 'Ya' : 'Tidak'}
                </div>
              </div>
            </div>
            <hr />
            <div className="py-2 font-bold">Indikator Pembangun</div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="font-semibold">Publikasi Ketersediaan :</div>
                <div className="font-normal">
                  {dataDetail.ip_publikasi_ketersediaan || '-'}
                </div>
              </div>
              <div>
                <div className="font-semibold">Nama :</div>
                <div className="font-normal">{dataDetail.ip_nama || '-'}</div>
              </div>
            </div>
            <hr />
            <div className="py-2 font-bold">Variabel Pembangun</div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="font-semibold">Kegiatan Penghasil :</div>
                <div className="font-normal">
                  {dataDetail.vp_kegiatan_penghasil || '-'}
                </div>
              </div>
              <div>
                <div className="font-semibold">Kode Keg. (diisi petugas) :</div>
                <div className="font-normal">
                  {dataDetail.vp_kode_keg || '-'}
                </div>
              </div>
              <div>
                <div className="font-semibold">Nama :</div>
                <div className="font-normal">{dataDetail.vp_nama || '-'}</div>
              </div>
              <div>
                <div className="font-semibold">Level Estimasi :</div>
                <div className="font-normal">
                  {dataDetail.level_estimasi || '-'}
                </div>
              </div>
              <div>
                <div className="font-semibold">Dapat Diakses Umum?</div>
                <div className="font-normal">
                  {dataDetail.akses_umum === 1 ? 'Ya' : 'Tidak'}
                </div>
              </div>
              <div></div>
              <div>
                <div className="font-semibold">Nama Kegiatan :</div>
                <Link
                  href={`/metadata-kegiatan/${dataDetail.ms_keg.slug}`}
                  className="no-underline decoration-black hover:no-underline"
                >
                  <div className="font-bold">
                    {dataDetail.ms_keg.judul || '-'}
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </BreadcrumbsWrapper>
    </Main>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  params,
}: GetServerSidePropsContext) => {
  const { slug } = params as { slug: string };
  // Fetch data from your backend API using the 'slug'
  const res = await http().get(`msind/${slug}`);

  const { data } = res;

  return {
    props: { data },
  };
};

export default MetadataIndikator;
