/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react/jsx-key */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable tailwindcss/no-custom-classname */
import type { GetServerSideProps, GetServerSidePropsContext } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import type { Key } from 'react';
import React, { useEffect, useState } from 'react';
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
import http from '@/helpers/http';
import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

// import data from './dummydetail.json';

type YourDataType = {
  data: any;
  id: Key | null | undefined;
  updated_at: string | number | Date;
  created_at: string | number | Date;
  date_upload: string;
  count_view: string;
  judul: any;
  slug: string;
  range_years: string;
  jumlah_data: number;
  deskripsi: string;
  opd: {
    name: string;
  };
  grup: {
    name: string;
  };
};

const Slug = ({ data }: { data: YourDataType }) => {
  const [rekomendasiData, setRekomendasiData] = useState<YourDataType[]>([]);

  const [activeTab, setActiveTab] = useState('deskripsi');
  const [dataDetail] = useState(data);
  const router = useRouter();

  const { slug } = router.query;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res2 = await http().get('/datasets/rekomendasi');
        const { data: rekomendasi } = res2.data;

        // Set the fetched data in the state
        setRekomendasiData(rekomendasi);
      } catch (error) {
        // console.error(error);
      }
    };

    fetchData();
  }, [data.slug]);

  const handleTabClick = (tabName: React.SetStateAction<string>) => {
    setActiveTab(tabName);
  };
  const RangeYearsComponent = ({ item }: { item: YourDataType }) => {
    const truncatedText = `${item.range_years} (${item.jumlah_data})`;

    return <span>{truncatedText}</span>;
  };

  const DescriptionComponent = ({ item }: { item: YourDataType }) => {
    const cleanedDescription = item.deskripsi.replace(/_x000D_/g, '');

    return (
      <div
        className="!my-1 text-base"
        dangerouslySetInnerHTML={{ __html: cleanedDescription }}
      />
    );
  };
  const formatDate = (dateString: string | number | Date) => {
    const options: Intl.DateTimeFormatOptions = {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    };

    const date = new Date(dateString);
    const formattedDate = new Intl.DateTimeFormat('id-ID', options).format(
      date
    );
    return formattedDate;
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
                {dataDetail.opd.name || ''}
              </div>
              <div className="flex flex-row gap-1">
                {' '}
                <FiGrid className="mt-1" />
                {dataDetail.grup.name || ''}
              </div>
              <div className="flex flex-row gap-1">
                {' '}
                <FiCalendar className="mt-1" />
                <RangeYearsComponent item={dataDetail} />
              </div>
            </div>
            <div className="flex flex-row gap-3">
              <div className="flex flex-row gap-1">
                {' '}
                <FiClock className="mt-1" />
                {dataDetail.date_upload || ''}
              </div>
              <div className="flex flex-row gap-1">
                {' '}
                <FiEye className="mt-1" />
                {dataDetail.count_view || ''}
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

        <div className="py-4 pb-6">
          {activeTab === 'deskripsi' && (
            <div className="prose lg:prose-xl text-base">
              <h2 className="mb-4  font-bold">Deskripsi</h2>
              <div>
                <DescriptionComponent item={dataDetail} />
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
                    <div className="mx-2">
                      {formatDate(dataDetail.created_at)}
                    </div>
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
                    <div className="mx-2">
                      {formatDate(dataDetail.updated_at)}
                    </div>
                  </td>
                </tr>
              </table>
            </div>
          )}
        </div>

        {/* daftar data */}
        <div className="pb-2 text-base font-bold">Daftar Data</div>
        <div className="flex flex-col gap-2 text-base">
          {dataDetail.data.map(
            (dafData: {
              tahun: any;
              nama:
                | string
                | number
                | boolean
                | React.ReactElement<
                    any,
                    | string
                    | React /* eslint-disable tailwindcss/no-custom-classname */.JSXElementConstructor<any>
                  >
                | React.ReactFragment
                | React.ReactPortal
                | null
                | undefined;
              tanggal_input:
                | string
                | number
                | boolean
                | React.ReactElement<
                    any,
                    | string
                    | React /* eslint-disable tailwindcss/no-custom-classname */.JSXElementConstructor<any>
                  >
                | React.ReactFragment
                | React.ReactPortal
                | null
                | undefined;
              count_view:
                | string
                | number
                | boolean
                | React.ReactElement<
                    any,
                    | string
                    | React /* eslint-disable tailwindcss/no-custom-classname */.JSXElementConstructor<any>
                  >
                | React.ReactFragment
                | React.ReactPortal
                | null
                | undefined;
            }) => (
              <Link key={data.id} href={`/datasets/${slug}/${dafData.tahun}`}>
                <div className="flex flex-row justify-between">
                  <div>{dafData.nama}</div>
                  <div className="flex flex-row gap-2">
                    <div className="flex flex-row gap-1 !text-sm">
                      <FiCalendar className="mt-1" /> {dafData.tanggal_input}
                    </div>
                    <div className="flex flex-row gap-1 !text-sm">
                      <FiEye className="mt-1" /> {dafData.count_view}
                    </div>
                  </div>
                </div>
                <div className="mx-2 border-b-2 pt-2"></div>
              </Link>
            )
          )}
        </div>
        <div className="pb-2 pt-5 text-base font-bold">Rekomendasi Dataset</div>
        <div className="flex flex-col gap-2 text-base">
          {rekomendasiData &&
            rekomendasiData.map(
              (item: {
                id: Key | null | undefined;
                judul:
                  | string
                  | number
                  | boolean
                  | React.ReactElement<
                      any /* eslint-disable react-hooks/rules-of-hooks */,
                      /* eslint-disable tailwindcss/no-custom-classname */
                      string | React.JSXElementConstructor<any>
                    >
                  | React.ReactFragment
                  | React.ReactPortal
                  | null
                  | undefined;
              }) => (
                <div key={item.id}>
                  {/* Display the rekomendasi data here */}
                  {item.judul}
                </div>
              )
            )}
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
  const res = await http().get(`datasets/${slug}`);
  const { data } = res.data;

  return {
    props: { data },
  };
};

export default Slug;
