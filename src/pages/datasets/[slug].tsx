/* eslint-disable react/jsx-key */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable tailwindcss/no-custom-classname */
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import {
  FaClipboardList,
  FaElementor,
  FaFacebookSquare,
  FaLink,
  FaTwitterSquare,
  FaWhatsappSquare,
} from 'react-icons/fa';
import { FiCalendar, FiClock, FiEye, FiGrid, FiUser } from 'react-icons/fi';

import BreadcrumbsWrapper from '@/components/Breadcrumbs';
import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

import data from './dummydetail.json';
import daftarData from './dummylistdata.json';

const Slug = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router = useRouter();
  const [dataDetail] = useState(data);
  const [activeTab, setActiveTab] = useState('deskripsi');

  const { slug } = router.query;

  const handleTabClick = (tabName: React.SetStateAction<string>) => {
    setActiveTab(tabName);
  };
  return (
    <Main
      meta={
        <Meta
          title={`Dataset ${dataDetail?.judul}`}
          description={`Data terkait Dataset ${dataDetail?.judul}`}
        />
      }
    >
      <BreadcrumbsWrapper>
        <div className="px-4">
          <h1 className="mb-2 font-bold">{dataDetail?.judul}</h1>
          <div className="flex justify-between text-sm">
            <div className="flex flex-row gap-3">
              <div className="flex flex-row gap-1">
                {' '}
                <FiUser className="mt-1" />
                {dataDetail.opd}
              </div>
              <div className="flex flex-row gap-1">
                {' '}
                <FiGrid className="mt-1" />
                {dataDetail.sektoral}
              </div>
              <div className="flex flex-row gap-1">
                {' '}
                <FiCalendar className="mt-1" />
                2020-2022 (3)
              </div>
            </div>
            <div className="flex flex-row gap-3">
              <div className="flex flex-row gap-1">
                {' '}
                <FiClock className="mt-1" />5 Hari Yang Lalu
              </div>
              <div className="flex flex-row gap-1">
                {' '}
                <FiEye className="mt-1" />
                90
              </div>
            </div>
          </div>

          <div className="flex flex-row justify-between border-b">
            <div>
              <ul className="-mb-px flex flex-wrap  text-center text-sm font-medium text-gray-500 dark:text-gray-400">
                <li className="mr-2 rounded border-x border-t">
                  <a
                    role="button"
                    className={`${
                      activeTab === 'deskripsi' ? 'activeTab ' : 'group '
                    }inline-flex rounded-t-lg border-b-2 ${
                      activeTab === 'deskripsi' ? 'border-blue-600 ' : ''
                    }p-4 hover:border-gray-300 hover:text-gray-600 dark:hover:text-gray-300`}
                    onClick={() => handleTabClick('deskripsi')}
                  >
                    <FaElementor className="mr-1 mt-1" />
                    Deskripsi
                  </a>
                </li>

                <li className="mr-2 rounded border-x border-t">
                  <a
                    role="button"
                    className={`${
                      activeTab === 'metadata' ? 'activeTab ' : 'group '
                    }inline-flex rounded-t-lg border-b-2 border-transparent p-4 hover:border-gray-300 hover:text-gray-600 dark:hover:text-gray-300`}
                    onClick={() => handleTabClick('metadata')}
                  >
                    <FaClipboardList className="mr-1 mt-1" />
                    Metadata
                  </a>
                </li>
              </ul>
            </div>
            <div className="mt-8 flex flex-row gap-2 text-sm">
              <span>Bagikan :</span>
              <FaFacebookSquare className="mt-0.5 !text-lg text-[#A5A5A5]" />
              <FaTwitterSquare className="mt-0.5 !text-lg text-[#A5A5A5]" />
              <FaWhatsappSquare className="mt-0.5 !text-lg text-[#A5A5A5]" />
              <FaLink className="mt-0.5 !text-lg text-[#A5A5A5]" />
            </div>
          </div>
        </div>
      </BreadcrumbsWrapper>
      <div className="py-4 pb-6">
        {activeTab === 'deskripsi' && (
          <div className="prose lg:prose-xl text-base">
            <h2 className="mb-4  font-bold">Deskripsi</h2>
            <div>
              <p>
                Dataset ini berisi data jumlah pegawai negeri sipil (PNS) yang
                mengikuti Pendidikan dan Pelatihan di kabupaten Garut Tahun
                2016-2022
              </p>
              <p>
                Penjelasan mengenai variabel di dalam Dataset ini sebagai
                berikut:
              </p>
              <ul>
                <li>Tahun : menyatakan tahun masehi</li>
                <li>
                  Pelatihan Kepemimpinan Nasional (PKN): pelatihan struktural
                  kepemimpinan pratama yang diikuti oleh Pegawai Negeri Sipil
                  yang menduduki JPT Pratama atau yang telah memenuhi
                  persyaratan dokumen sesuai dengan ketentuan yang berlaku.
                </li>
                <li>
                  Pelatihan Kepemimpinan Administrator (PKA): pelatihan
                  struktural kepemimpinan administrator sebagaimana diatur dalam
                  peraturan pemerintah yang mengatur mengenai manajemen pegawai
                  negeri sipil, yang bertujuan untuk mengembangkan Kompetensi
                  Peserta dalam rangka memenuhi standar Kompetensi manajerial
                  Jabatan Administrator.
                </li>
                <li>
                  Pelatihan Kepemimpinan Pengawas (PKP): pelatihan struktural
                  kepemimpinan pengawas sebagaimana diatur dalam peraturan
                  pemerintah yang mengatur mengenai manajemen pegawai negeri
                  sipil, yang bertujuan untuk mengembangkan Kompetensi Peserta
                  dalam rangka memenuhi standar Kompetensi manajerial Jabatan
                  Pengawas.
                </li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'metadata' && (
          <div>
            <h2 className="mb-4 text-base font-bold">Metadata</h2>
            <table className="w-full border text-left text-base">
              <tr>
                <th className="border font-medium">
                  <div className="m-2 ">
                    <span className="rounded bg-green-400 px-3 py-1 text-sm">
                      Dibuat:
                    </span>
                  </div>
                </th>
                <td className="border ">
                  <div className="mx-2">{dataDetail.metadata_dibuat}</div>
                </td>
              </tr>
              <tr>
                <th className="border font-medium">
                  <div className="m-2 ">
                    <span className="rounded bg-yellow-400 px-3 py-1 text-sm">
                      Diubah:
                    </span>
                  </div>
                </th>
                <td className="border">
                  <div className="mx-2">{dataDetail.metadata_diedit}</div>
                </td>
              </tr>
            </table>
          </div>
        )}
      </div>

      {/* daftar data */}
      <div className="pb-2 text-base font-bold">Daftar Data</div>
      <div className="flex flex-col gap-2 text-base">
        {daftarData.map((dafData) => (
          <Link href={`/datasets/${slug}/${dafData.tahun}`}>
            <div key={data.id} className="flex flex-row justify-between">
              <div>
                {dafData.judul} - Tahun {dafData.tahun}
              </div>
              <div className="flex flex-row gap-2">
                <div className="flex flex-row gap-1 !text-sm">
                  <FiCalendar className="mt-1" /> {dafData.waktu}
                </div>
                <div className="flex flex-row gap-1 !text-sm">
                  <FiEye className="mt-1" /> 10
                </div>
              </div>
            </div>
            <div className="mx-2 border-b-2 pt-2"></div>
          </Link>
        ))}
      </div>
      <div className="pb-2 pt-5 text-base font-bold">Rekomendasi Dataset</div>
      <div className="flex flex-col gap-2 text-base">
        <div>
          Jumlah Penduduk Berdasarkan Usia Per Kecamatan di Kabupaten Garut
        </div>
        <div>Jumlah PNS di Kabupaten Garut</div>
        <div>Ketersediaan Pangan di Kabupaten Garut</div>
      </div>
    </Main>
  );
};

export default Slug;
