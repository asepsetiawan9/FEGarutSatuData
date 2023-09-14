/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react/jsx-key */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable tailwindcss/no-custom-classname */
import 'react-toastify/dist/ReactToastify.css';

import type { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import type { Key } from 'react';
import React, { useEffect, useState } from 'react';
import { BsAppIndicator, BsCollectionFill, BsIntersect } from 'react-icons/bs';
import {
  FaCalendarCheck,
  FaFacebookSquare,
  FaLink,
  FaTwitterSquare,
  FaWhatsappSquare,
} from 'react-icons/fa';
import { FiSlack, FiTarget } from 'react-icons/fi';
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

import MsInd from './MsInd';
import MsKeg from './MsKeg';
import MsVar from './MsVar';

// import data from './dummydetail.json';

type MsKegDetailType = {
  metadata_indikator: any;
  metadata_variabel: any;
  pj_eslon1: string;
  pj_eslon2: string;
  pjt_e3_name: string;
  pjt_e3_jabatan: string;
  pjt_e3_alamat: string;
  pjt_e3_tlp: string;
  pjt_e3_fax: string;
  pjt_e3_email: string;
  latar_belakang: string;
  tujuan_kegiatan: string;
  berulang: string;
  frekuensi: string;
  tipe_pengumpulan: string;
  tahun: string;
  sektor: any;
  cara_pengumpulan: any;
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
    alamat: string;
    telpon: string;
    fax: string;
    email: string;
    name: string;
  };
  grup: {
    name: string;
  };
};

const MetadataKegiatan = ({ data }: { data: MsKegDetailType }) => {
  // const [rekomendasiData, setRekomendasiData] = useState<MsKegDetailType[]>([]);
  const [shareUrl, setShareUrl] = useState('');
  const [activeTab, setActiveTab] = useState('kegiatan');
  const [dataDetail] = useState(data);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setShareUrl(window.location.href);
    }
  }, []);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const res2 = await http().get('/datasets/rekomendasi');
  //       const { data: rekomendasi } = res2.data;

  //       // Set the fetched data in the state
  //       setRekomendasiData(rekomendasi);
  //     } catch (error) {
  //       // console.error(error);
  //     }
  //   };

  //   fetchData();
  // }, [data.slug]);

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
  const RangeYearsComponent = ({ item }: { item: MsKegDetailType }) => {
    const truncatedText = `${item.range_years} (${item.jumlah_data})`;

    return <span>{truncatedText}</span>;
  };

  // const DescriptionComponent = ({ item }: { item: MsKegDetailType }) => {
  //   const cleanedDescription = item.deskripsi.replace(/_x000D_/g, '');

  //   return (
  //     <div
  //       className="!my-1 text-base"
  //       dangerouslySetInnerHTML={{ __html: cleanedDescription }}
  //     />
  //   );
  // };
  // const formatDate = (dateString: string | number | Date) => {
  //   const options: Intl.DateTimeFormatOptions = {
  //     day: 'numeric',
  //     month: 'long',
  //     year: 'numeric',
  //   };

  //   const date = new Date(dateString);
  //   const formattedDate = new Intl.DateTimeFormat('id-ID', options).format(
  //     date
  //   );
  //   return formattedDate;
  // };

  const handleClickDataset = (slugData: any) => {
    // console.log(slugData);

    router.push(`/data/${slugData}`);
  };
  function getSektorText(sektorKegiatan: any) {
    switch (sektorKegiatan) {
      case 1:
        return 'Pertanian dan Perikanan';
      case 2:
        return 'Demografi dan Kependudukan';
      case 3:
        return 'Pembangunan';
      case 4:
        return 'Proyeksi Ekonomi';
      case 5:
        return 'Pendidikan dan Pelatihan';
      case 6:
        return 'Lingkungan';
      case 7:
        return 'Globalisasi';
      case 8:
        return 'Kesehatan';
      case 9:
        return 'Industri dan Jasa';
      case 10:
        return 'Teknologi Informasi dan Komunikasi';
      case 11:
        return 'Perdagangan Internasional dan Neraca Perdagangan';
      case 12:
        return 'Ketenagakerjaan';
      case 13:
        return 'Neraca Nasional';
      case 14:
        return 'Indikator Ekonomi Bulanan';
      case 15:
        return 'Produktivitas';
      case 16:
        return 'Harga dan Paritas Daya Beli';
      case 17:
        return 'Sektor Publik, Perpajakan, dan Regulasi Pasar';
      case 18:
        return 'Perwilayahan dan Perkotaan';
      case 19:
        return 'Ilmu Pengetahuan dan Hak Paten';
      case 20:
        return 'Perlindungan Sosial dan Kesejahteraan';
      case 21:
        return 'Transportasi';
      case 22:
        return 'Keuangan';
      default:
        return '-';
    }
  }
  function getCaraPengumpulanText(caraPengumpulan: any) {
    switch (caraPengumpulan) {
      case 1:
        return 'Pencacahan Lengkap';
      case 2:
        return 'Survei';
      case 3:
        return 'Kompilasi Produk Administrasi';
      case 4:
        return 'Cara lain sesuai dengan perkembangan TI';
      default:
        return '-';
    }
  }

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
            {/* {dataDetail?.judul} */}
          </h1>
          <div className="flex flex-row justify-between gap-3 text-sm ">
            <div className="flex flex-col gap-3 sm:gap-1">
              <div className="flex flex-row items-center gap-2">
                <div className="mt-1">
                  <FaCalendarCheck />
                </div>
                <div className="grow">
                  <span>Tahun:</span>
                  <span className="pl-2">{dataDetail.tahun || '-'}</span>
                </div>
              </div>
              <div className="flex flex-row items-center gap-2">
                <div className="mt-1">
                  <BsCollectionFill />
                </div>
                <div className="grow">
                  <span>Cara Pengumpulan Data:</span>
                  <span className="pl-2">
                    {getCaraPengumpulanText(dataDetail.cara_pengumpulan)}
                  </span>
                </div>
              </div>
              <div className="flex flex-row items-center gap-2">
                <div className="mt-1">
                  <BsIntersect />
                </div>
                <div className="grow">
                  <span>Sektor Kegiatan:</span>
                  <span className="pl-2">
                    {getSektorText(dataDetail.sektor)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-row justify-between border-b-2">
            <ul className="flex flex-wrap text-center text-sm font-medium text-gray-500 dark:text-gray-400">
              <li className="mr-2 rounded border-x border-t">
                <a
                  role="button"
                  className={`${
                    activeTab === 'kegiatan' ? 'activeTab ' : 'group '
                  }inline-flex rounded-t-lg border-b-2 ${
                    activeTab === 'kegiatan' ? 'border-blue-600 ' : ''
                  }p-4 hover:border-gray-300 hover:text-gray-600 dark:hover:text-gray-300`}
                  onClick={() => handleTabClick('kegiatan')}
                >
                  <FiTarget className="mr-1 mt-1" />
                  <span className="hidden md:inline-block">
                    Detail Kegiatan
                  </span>
                </a>
              </li>

              <li className="mr-2 rounded border-x border-t">
                <a
                  role="button"
                  className={`${
                    activeTab === 'variabel' ? 'activeTab ' : 'group '
                  }inline-flex rounded-t-lg border-b-2 border-transparent p-4 hover:border-gray-300 hover:text-gray-600 dark:hover:text-gray-300`}
                  onClick={() => handleTabClick('variabel')}
                >
                  <FiSlack className="mr-1 mt-1" />
                  <span className="hidden md:inline-block">Variabel</span>
                </a>
              </li>
              <li className="mr-2 rounded border-x border-t">
                <a
                  role="button"
                  className={`${
                    activeTab === 'indikator' ? 'activeTab ' : 'group '
                  }inline-flex rounded-t-lg border-b-2 border-transparent p-4 hover:border-gray-300 hover:text-gray-600 dark:hover:text-gray-300`}
                  onClick={() => handleTabClick('indikator')}
                >
                  <BsAppIndicator className="mr-1 mt-1" />
                  <span className="hidden md:inline-block">Indikator</span>
                </a>
              </li>
            </ul>

            <div className="mt-1 flex flex-row items-center justify-between text-sm md:items-center md:justify-end md:gap-4">
              <span className="pr-3">Bagikan :</span>
              <div className="mt-2 flex gap-2">
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
          {activeTab === 'kegiatan' && <MsKeg dataDetail={dataDetail} />}

          {activeTab === 'variabel' && <MsVar dataDetail={dataDetail} />}

          {activeTab === 'indikator' && <MsInd dataDetail={dataDetail} />}
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
  const res = await http().get(`metadata/${slug}`);

  const { data } = res;

  return {
    props: { data },
  };
};

export default MetadataKegiatan;
