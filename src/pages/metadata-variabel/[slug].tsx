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
  nama_variabel: any;
  alias: string;
  konsep: string;
  tipe_data: string;
  definisi: string;
  referensi_pemilihan: string;
  referensi_waktu: string;
  kualifikasi_isian: string;
  aturan_validasi: string;
  kalimat_pertanyaan: string;
  akses_umum: number;
  metadata_indikator: any;
};

const MetadataVariabel = ({ data }: { data: DetalMsVarType }) => {
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
          title={`Dataset ${dataDetail?.nama_variabel}`}
          description={`Data terkait Dataset ${dataDetail?.nama_variabel}`}
        />
      }
    >
      <BreadcrumbsWrapper>
        <div className="px-4">
          <h1 className="mb-2 text-xl font-bold sm:text-2xl">
            {dataDetail?.nama_variabel
              ? capitalizeFirstLetterOfEachWord(dataDetail?.nama_variabel)
              : ''}
          </h1>
          <div className="grid grid-cols-2 gap-4 text-base">
            <div>
              <div className="font-semibold">Nama Variable :</div>
              <div className="font-normal">
                {dataDetail.nama_variabel || '-'}
              </div>
            </div>
            <div>
              <div className="font-semibold">Alias :</div>
              <div className="font-normal">{dataDetail.alias || '-'}</div>
            </div>
            <div>
              <div className="font-semibold">Definisi Variabel :</div>
              <div className="font-normal">{dataDetail.konsep || '-'}</div>
            </div>
            <div>
              <div className="font-semibold">Konsep :</div>
              <div className="font-normal">{dataDetail.tipe_data || '-'}</div>
            </div>
            <div>
              <div className="font-semibold">Referensi Pemilihan :</div>
              <div className="font-normal">{dataDetail.definisi || '-'}</div>
            </div>
            <div>
              <div className="font-semibold">Referensi Waktu :</div>
              <div className="font-normal">
                {dataDetail.referensi_pemilihan || '-'}
              </div>
            </div>
            <div>
              <div className="font-semibold">Tipe Data :</div>
              <div className="font-normal">
                {dataDetail.referensi_waktu || '-'}
              </div>
            </div>
            <div>
              <div className="font-semibold">Klasifikasi Isian :</div>
              <div className="font-normal">
                {dataDetail.kualifikasi_isian || '-'}
              </div>
            </div>
            <div>
              <div className="font-semibold">Aturan Validasi :</div>
              <div className="font-normal">
                {dataDetail.aturan_validasi || '-'}
              </div>
            </div>
            <div>
              <div className="font-semibold">Kalimat Pertanyaan :</div>
              <div className="font-normal">
                {dataDetail.kalimat_pertanyaan || '-'}
              </div>
            </div>
            <div>
              <div className="font-semibold">Dapat Diakses Umum?</div>
              <div className="font-normal">
                {dataDetail.akses_umum === 1 ? 'Ya' : 'Tidak'}
              </div>
            </div>
            <div>
              <div className="font-semibold">Nama Kegiatan :</div>
              <Link
                href={`/metadata-kegiatan/${dataDetail.ms_keg.slug}`}
                className="no-underline decoration-black hover:no-underline"
              >
                <div className="font-normal">
                  {dataDetail.ms_keg.judul || '-'}
                </div>
              </Link>
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
  const res = await http().get(`msvar/${slug}`);

  const { data } = res;

  return {
    props: { data },
  };
};

export default MetadataVariabel;
