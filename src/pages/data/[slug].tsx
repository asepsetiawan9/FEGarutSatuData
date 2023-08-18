/* eslint-disable tailwindcss/no-custom-classname */
import 'jspdf-autotable';
import 'react-toastify/dist/ReactToastify.css';

import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';
import type { GetServerSideProps, GetServerSidePropsContext } from 'next';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React, { Suspense, useEffect, useState } from 'react';
import {
  BsFileEarmarkCodeFill,
  BsFillClipboard2CheckFill,
} from 'react-icons/bs';
import {
  FaChartPie,
  FaClipboardList,
  FaFacebookSquare,
  FaLink,
  FaTable,
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

import ComponentGrafik from './ComponentGrafik';
import DownloadComponent from './DownloadComponent';
import ModalMsInd from './ModalMsInd';
import ModalMsKeg from './ModalMsKeg';
import ModalMsVar from './ModalMsVar';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

interface NewDataset {
  judul: string;
  count_view: string;
  // Add other properties as needed
}

interface YourDataType {
  data: {
    id: number;
    name: string;
    priode: string;
    new_dataset: NewDataset; // Add the new_dataset property
  }[];
}

interface TahunProps {
  data: YourDataType[];
}

const Tahun: React.FC<TahunProps> = ({ data }) => {
  // console.log(data);

  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalVarOpen, setIsModalVarOpen] = useState(false);
  const [isModalIndOpen, setIsModalIndOpen] = useState(false);

  // Function to handle the click event and show the modal
  const handleClick = () => {
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const handleClickVar = () => {
    setIsModalVarOpen(true);
  };

  // Function to close the modal
  const closeModalVar = () => {
    setIsModalVarOpen(false);
  };
  const handleClickInd = () => {
    setIsModalIndOpen(true);
  };

  // Function to close the modal
  const closeModalInd = () => {
    setIsModalIndOpen(false);
  };
  const DataTable = dynamic(() => import('react-data-table-component'), {
    ssr: false,
  });

  const [activeTab, setActiveTab] = useState('standardata');
  const [activeTabTable, setActiveTabTable] = useState('tabel');
  const [searchTerm, setSearchTerm] = useState('');
  const [dataDetail] = useState(data);
  const [shareUrl, setShareUrl] = useState('');
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setShareUrl(window.location.href);
    }
  }, []);
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

  const slug = router.query;

  const handleTabClick = (tabName: React.SetStateAction<string>) => {
    setActiveTab(tabName);
  };
  const handleTabClickTab = (tabName: React.SetStateAction<string>) => {
    setActiveTabTable(tabName);
  };

  useEffect(() => {}, [slug]);
  // console.log(slug);
  const rowTable = dataDetail.source_media[0].row;

  const dataRowExcel = JSON.parse(rowTable);

  const rowTabel = dataRowExcel.filter((col: string) => col !== 'id');

  const valTable = dataDetail.source_media[0].value;

  const dataValueExcel = JSON.parse(valTable);
  const valueTabel = dataValueExcel.map((val: Record<string, any>) => {
    const { ...rest } = val;
    return rest;
  });

  function generateColumns(dataRows: any[]) {
    return dataRows.map((column) => ({
      name: column,
      selector: (row: { [x: string]: any }) => row[column], // Use selector function
      sortable: true,
    }));
  }

  const columns = generateColumns(rowTabel);
  const filteredData = valueTabel.filter(
    (row: { [s: string]: unknown } | ArrayLike<unknown>) =>
      Object.values(row)
        .join(' ')
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  );
  // console.log(filteredData);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <Main
      meta={<Meta title={`Dataset `} description={`Data terkait Dataset `} />}
    >
      <BreadcrumbsWrapper>
        <div className="px-4">
          <h1 className="mb-2 font-bold">{dataDetail.nama}</h1>
          <div className="flex justify-between text-sm">
            <div className="flex flex-row gap-3">
              <div className="flex flex-row gap-1">
                {' '}
                <FiUser className="mt-1" />
                {dataDetail.new_dataset.opd.name}
              </div>
              <div className="flex flex-row gap-1">
                {' '}
                <FiGrid className="mt-1" />
                {dataDetail.new_dataset.grup.name}
              </div>
              <div className="flex flex-row gap-1">
                {' '}
                <FiCalendar className="mt-1" />
                {dataDetail.priode}
              </div>
            </div>
            <div className="flex flex-row gap-3">
              <div className="flex flex-row gap-1">
                {' '}
                <FiClock className="mt-1" />
                {dataDetail.tanggal_input}
              </div>
              <div className="flex flex-row gap-1">
                {' '}
                <FiEye className="mt-1" />
                {dataDetail.count_view}
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
                      activeTab === 'standardata' ? 'activeTab ' : 'group '
                    }inline-flex rounded-t-lg border-b-2 ${
                      activeTab === 'standardata' ? 'border-blue-600 ' : ''
                    }p-4 hover:border-gray-300 hover:text-gray-600 dark:hover:text-gray-300`}
                    onClick={() => handleTabClick('standardata')}
                  >
                    <BsFillClipboard2CheckFill className="mr-1 mt-1" />
                    Standar Data
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
                <li className="mr-2 rounded border-x border-t">
                  <a
                    role="button"
                    className={`${
                      activeTab === 'kodereferensi' ? 'activeTab ' : 'group '
                    }inline-flex rounded-t-lg border-b-2 border-transparent p-4 hover:border-gray-300 hover:text-gray-600 dark:hover:text-gray-300`}
                    onClick={() => handleTabClick('kodereferensi')}
                  >
                    <BsFileEarmarkCodeFill className="mr-1 mt-1" />
                    Kode Referensi
                  </a>
                </li>
              </ul>
            </div>
            <div className="mt-8 flex flex-row gap-2 text-sm">
              <span>Bagikan :</span>
              <FacebookShareButton className="mb-12" url={shareUrl}>
                <FaFacebookSquare className=" !text-lg text-[#A5A5A5]" />
              </FacebookShareButton>
              <TwitterShareButton className="mb-12" url={shareUrl}>
                <FaTwitterSquare className=" !text-lg text-[#A5A5A5]" />
              </TwitterShareButton>
              <WhatsappShareButton className="mb-12" url={shareUrl}>
                <FaWhatsappSquare className=" !text-lg text-[#A5A5A5]" />
              </WhatsappShareButton>
              <FaLink
                className="mt-0.5 !text-lg text-[#A5A5A5]"
                onClick={handleCopyLink}
              />
              <ToastContainer />
            </div>
          </div>

          <div className="py-4 pb-6">
            {activeTab === 'standardata' && (
              <div className="prose lg:prose-xl text-base">
                <div>
                  {dataDetail.standar_data.length > 0 ? (
                    <table className="w-full rounded-xl border">
                      <tbody>
                        <tr className="border-2 text-left">
                          <th className="border-2 p-2">Konsep</th>
                          <th className="border-2 p-2">Definisi</th>
                          <th className="border-2 p-2">Klasifikasi</th>
                          <th className="border-2 p-2">Satuan</th>
                          <th className="border-2 p-2">Ukuran</th>
                        </tr>
                        {dataDetail.standar_data.map(
                          (stndrData: {
                            id: React.Key | null | undefined;
                            konsep:
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
                            definisi:
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
                            klasifikasi:
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
                            satuan:
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
                            ukuran:
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
                            <tr key={stndrData.id}>
                              {' '}
                              {/* Tambahkan key dengan nilai yang unik, misalnya dataDetail.id */}
                              <td className="border-2 p-2">
                                {stndrData.konsep}
                              </td>
                              <td className="border-2 p-2">
                                {stndrData.definisi}
                              </td>
                              <td className="border-2 p-2">
                                {stndrData.klasifikasi}
                              </td>
                              <td className="border-2 p-2">
                                {stndrData.satuan}
                              </td>
                              <td className="border-2 p-2">
                                {stndrData.ukuran}
                              </td>
                            </tr>
                          )
                        )}
                      </tbody>
                    </table>
                  ) : (
                    <table className="w-full rounded-xl border">
                      <tbody>
                        <tr>
                          <td className="col-span-5 border-2 p-2 text-center">
                            Standar Data Tidak Ada
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'metadata' && (
              <div className="prose lg:prose-xl text-base">
                <table className="w-full text-left text-base">
                  <tbody>
                    <tr>
                      <th className="w-44  font-medium">
                        <div className="m-2 ">Tanggal Dibuat</div>
                      </th>
                      <td className=" ">
                        <div className="mx-2">{dataDetail.dibuat}</div>
                      </td>
                    </tr>
                    <tr>
                      <th className="w-44  font-medium">
                        <div className="m-2 ">Tanggal Diubah</div>
                      </th>
                      <td className="">
                        <div className="mx-2">{dataDetail.diubah}</div>
                      </td>
                    </tr>
                    <tr>
                      <th className="w-44  font-medium">
                        <div className="m-2 ">Metadata Kegiatan</div>
                      </th>
                      <td className="cursor-pointer px-4">
                        <div
                          className="inline-block rounded-md bg-[#fa65b1] p-2 text-white"
                          onClick={handleClick}
                        >
                          {dataDetail.ms_keg?.judul || '-'}
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th className="w-44  font-medium">
                        <div className="m-2 ">Metadata Variabel</div>
                      </th>
                      <td className="cursor-pointer px-4">
                        <div
                          className="inline-block rounded-md bg-[#fa446b] p-2 text-white"
                          onClick={handleClickVar}
                        >
                          {dataDetail.ms_var?.nama_variabel || '-'}
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th className="w-44  font-medium">
                        <div className="m-2 ">Metadata Indikator</div>
                      </th>
                      <td className="cursor-pointer px-4">
                        <div
                          className="inline-block rounded-md bg-[#e8ff16] p-2 text-black"
                          onClick={handleClickInd}
                        >
                          {dataDetail.ms_ind?.nama_indikator || '-'}
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

            {/* tab grafik dan tabel */}

            <div className="flex flex-row justify-between border-b">
              <div>
                <ul className="-mb-px flex flex-wrap  text-center text-sm font-medium text-gray-500 dark:text-gray-400">
                  <li className="mr-2 rounded border-x border-t">
                    <a
                      role="button"
                      className={`${
                        activeTabTable === 'tabel'
                          ? 'activeTabTable '
                          : 'group '
                      }inline-flex rounded-t-lg border-b-2 ${
                        activeTabTable === 'tabel' ? 'border-blue-600 ' : ''
                      }p-4 hover:border-gray-300 hover:text-gray-600 dark:hover:text-gray-300`}
                      onClick={() => handleTabClickTab('tabel')}
                    >
                      <FaTable className="mr-1 mt-1" />
                      Data Tabel
                    </a>
                  </li>
                  <li className="mr-2 rounded border-x border-t">
                    <a
                      role="button"
                      className={`${
                        activeTabTable === 'grafik'
                          ? 'activeTabTable '
                          : 'group '
                      }inline-flex rounded-t-lg border-b-2 ${
                        activeTabTable === 'grafik' ? 'border-blue-600 ' : ''
                      }p-4 hover:border-gray-300 hover:text-gray-600 dark:hover:text-gray-300`}
                      onClick={() => handleTabClickTab('grafik')}
                    >
                      <FaChartPie className="mr-1 mt-1" />
                      Grafik
                    </a>
                  </li>
                </ul>
              </div>
              <div className="mt-8 flex flex-row gap-2 text-sm">
                <DownloadComponent
                  dataDetail={dataDetail}
                  filteredData={filteredData}
                  rowTabel={rowTabel}
                />
              </div>
            </div>
            {activeTabTable === 'tabel' && (
              <div className="prose lg:prose-xl text-base">
                {/* tabel */}

                <div className="my-2 flex flex-row justify-between">
                  <div>{dataDetail.judul || 'Data Tabel'}</div>
                  <div className="flex gap-2 text-sm">
                    <span className="pt-1">Search :</span>
                    <input
                      className="rounded-md border-2 px-2 py-1.5 hover:border-primary focus:outline-primary"
                      type="text"
                      value={searchTerm}
                      onChange={handleChange}
                    />
                    {filteredData.length > 0}
                  </div>
                </div>
                <div>
                  {filteredData ? (
                    <Suspense fallback={<p>Loading table...</p>}>
                      <DataTable
                        pagination
                        responsive
                        columns={columns}
                        data={filteredData}
                        highlightOnHover
                        customStyles={{
                          table: {
                            style: {
                              backgroundColor: '#F7FAFC',
                            },
                          },
                          rows: {
                            style: {
                              hover: 'rgba(0,0,0,.08)',
                              minHeight: '72px',
                            },
                          },
                          headRow: {
                            style: {
                              backgroundColor: '#EDF2F7',
                            },
                          },
                        }}
                      />
                    </Suspense>
                  ) : (
                    <p>Loading table...</p>
                  )}
                </div>
              </div>
            )}
          </div>
          {activeTabTable === 'grafik' && (
            <div className="mt-4">
              <ComponentGrafik data={dataDetail} />
            </div>
          )}
        </div>
        <ModalMsKeg
          isModalOpen={isModalOpen}
          closeModal={closeModal}
          dataDetail={dataDetail}
        />
        <ModalMsVar
          isModalVarOpen={isModalVarOpen}
          closeModalVar={closeModalVar}
          dataDetail={dataDetail}
        />
        <ModalMsInd
          isModalIndOpen={isModalIndOpen}
          closeModalInd={closeModalInd}
          dataDetail={dataDetail}
        />
      </BreadcrumbsWrapper>
    </Main>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  params,
}: GetServerSidePropsContext) => {
  const { slug } = params as { slug: string };
  // console.log('ini slug data', slugData);

  // Fetch dataDetail from your backend API using the 'slug'
  const res = await http().get(`data/${slug}`);
  // console.log(res);

  const { data } = res.data.data;
  // console.log(data);

  return {
    props: { data },
  };
};

export default Tahun;
