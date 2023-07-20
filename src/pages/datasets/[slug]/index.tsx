/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react/jsx-key */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable tailwindcss/no-custom-classname */
import 'react-toastify/dist/ReactToastify.css';

import type { GetServerSideProps, GetServerSidePropsContext } from 'next';
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
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from 'react-share';
import { toast, ToastContainer } from 'react-toastify';

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
  const [shareUrl, setShareUrl] = useState('');
  const [activeTab, setActiveTab] = useState('deskripsi');
  const [dataDetail] = useState(data);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setShareUrl(window.location.href);
    }
  }, []);
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

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    toast.success('Link telah berhasil dicopy!', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });
  };

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

  const handleClickDataset = (slugData: any) => {
    // console.log(slugData);

    router.push(`/data/${slugData}`);
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
          <h1 className="mb-2 text-xl font-bold sm:text-2xl">
            {dataDetail?.judul}
          </h1>
          <div className="flex flex-row justify-between gap-3 text-sm ">
            <div className="flex flex-col gap-1 sm:flex-row sm:gap-3">
              <div className="flex flex-row items-center gap-1">
                <FiUser className="mt-1" />
                <span>{dataDetail.opd.name || ''}</span>
              </div>
              <div className="flex flex-row items-center gap-1">
                <FiGrid className="mt-1" />
                <span>{dataDetail.grup.name || ''}</span>
              </div>
              <div className="flex flex-row items-center gap-1">
                <FiCalendar className="mt-1" />
                <RangeYearsComponent item={dataDetail} />
              </div>
            </div>
            <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-3">
              <div className="flex flex-row items-center gap-1">
                <FiClock className="mt-1" />
                <span>{dataDetail.date_upload || ''}</span>
              </div>
              <div className="flex flex-row items-center gap-1">
                <FiEye className="mt-1" />
                <span>{dataDetail.count_view || ''}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-row justify-between border-b">
            <ul className="-mb-px mt-1 flex flex-wrap text-center text-sm font-medium text-gray-500 dark:text-gray-400">
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

            <div className="mt-1 flex flex-col gap-2 text-sm md:flex-row md:items-center md:gap-4">
              <span>Bagikan :</span>
              <div className="mt-2 flex gap-2 md:mt-0">
                <FacebookShareButton url={shareUrl}>
                  <FaFacebookSquare className="!text-lg text-[#A5A5A5]" />
                </FacebookShareButton>
                <TwitterShareButton url={shareUrl}>
                  <FaTwitterSquare className="!text-lg text-[#A5A5A5]" />
                </TwitterShareButton>
                <WhatsappShareButton url={shareUrl}>
                  <FaWhatsappSquare className="!text-lg text-[#A5A5A5]" />
                </WhatsappShareButton>
                <FaLink
                  className="mt-0.5 !text-lg text-[#A5A5A5]"
                  onClick={handleCopyLink}
                />
              </div>
              <ToastContainer />
            </div>
          </div>
        </div>

        <div className="mx-4 py-4 pb-6">
          {activeTab === 'deskripsi' && (
            <div className="prose sm:prose-lg text-base">
              <h2 className="mb-4 text-xl font-bold sm:text-2xl">Deskripsi</h2>
              <div className="sm:text-lg">
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
                    <div className="m-2">
                      <span className="rounded bg-green-400 px-3 py-1 text-sm">
                        Dibuat:
                      </span>
                    </div>
                  </th>
                  <td className="border">
                    <div className="mx-2">
                      {formatDate(dataDetail.created_at)}
                    </div>
                  </td>
                </tr>
                <tr>
                  <th className="border font-medium">
                    <div className="m-2">
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
        <div className="mx-4 pb-2 text-base font-bold">Daftar Data</div>
        <div className="mx-4 flex flex-col gap-2  text-base ">
          {dataDetail.data.map(
            (dafData: {
              slug: string;
              tahun: any;
              nama: string;
              tanggal_input: string;
              count_view: string;
            }) => (
              // <a
              //   key={data.id}
              //   href={`/datasets/${slug}/[slugData]`} // Ganti [slugData] sesuai dengan pola parameter yang Anda inginkan
              //   as={`/datasets/${slug}/${dafData.slug}`}
              //   className="block rounded-md border p-4
              //   shadow-sm"
              // >
              <a
                key={data.id}
                className="cursor-pointer p-4 no-underline decoration-black hover:no-underline"
                onClick={() => handleClickDataset(dafData.slug)}
              >
                <div className="flex flex-col md:flex-row md:justify-between">
                  <div className="font-semibold">{dafData.nama}</div>
                  <div className="flex flex-row justify-between gap-2 pt-2 md:pt-0">
                    <div className="flex flex-row gap-1 text-sm font-light">
                      <FiCalendar className="mt-1" /> {dafData.tanggal_input}
                    </div>
                    <div className="flex flex-row gap-1 text-sm font-light">
                      <FiEye className="mt-1" /> {dafData.count_view}
                    </div>
                  </div>
                </div>
              </a>
            )
          )}
        </div>

        <div className="mx-4 pb-2 text-base font-bold">Rekomendasi Dataset</div>
        <div className="mx-4 flex flex-col gap-2 text-base font-semibold ">
          {rekomendasiData &&
            rekomendasiData.map(
              (item: {
                slug: any;
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
                <div
                  key={item.id}
                  className="rounded-md px-4 py-2 
                shadow-sm"
                >
                  <a href={`/datasets/${data.slug}`}>{item.judul}</a>
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
  // console.log(slug);

  // Fetch data from your backend API using the 'slug'
  const res = await http().get(`datasets/${slug}`);
  const { data } = res.data;

  return {
    props: { data },
  };
};

export default Slug;
