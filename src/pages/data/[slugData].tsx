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
import { Bar, Line, Pie } from 'react-chartjs-2';
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

import DownloadComponent from './DownloadComponent';
import dataTahun from './dummytahun.json';
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
interface YourDataType {
  // Define the properties of the data object here
  // For example:
  id: number;
  name: string;
  // Add more properties as needed
}

interface TahunProps {
  data: YourDataType[];
}

const Tahun: React.FC<TahunProps> = ({ data }) => {
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
  // console.log(data);
  const DataTable = dynamic(() => import('react-data-table-component'), {
    ssr: false,
  });

  const [activeTab, setActiveTab] = useState('standardata');
  const [activeTabTable, setActiveTabTable] = useState('tabel');
  const [searchTerm, setSearchTerm] = useState('');
  // const [dataDetail] = useState(dataTahun);
  const [dataDetail] = useState(data);
  // const [shareLink] = useState('');
  const [shareUrl, setShareUrl] = useState('');
  // console.log(dataDetail.new_dataset.grup);
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

  const { slug, tahun } = router.query;
  const handleTabClick = (tabName: React.SetStateAction<string>) => {
    setActiveTab(tabName);
  };
  const handleTabClickTab = (tabName: React.SetStateAction<string>) => {
    setActiveTabTable(tabName);
  };

  useEffect(() => {}, [slug, tahun]);

  const rowTable = dataDetail.source_media[0].row;
  const dataRowExcel = JSON.parse(rowTable);

  const rowTabel = dataRowExcel.filter((col) => col !== 'id');

  const valTable = dataDetail.source_media[0].value;
  const dataValueExcel = JSON.parse(valTable);

  const valueTabel = dataValueExcel.map((val) => {
    const { id, ...rest } = val;
    return rest;
  });

  function generateColumns(rowTabel: any[]) {
    return rowTabel.map((column) => ({
      name: column,
      selector: column,
      sortable: true,
    }));
  }
  const columns = generateColumns(rowTabel);
  const filteredData = valueTabel.filter((row) =>
    Object.values(row)
      .join(' ')
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );
  // console.log(filteredData);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const [labelFilter, setLabelFilter] = useState('');
  const [labelFilterB, setLabelFilterB] = useState('index');
  const [labelAtas, setLabelAtas] = useState('');
  const [chartType, setChartType] = useState('Line');
  const [axisBList, setAxisBList] = useState([]);

  const handleAddSeries = () => {
    const newAxisBList = [...axisBList, axisBList.length]; // Add a new index to the list
    setAxisBList(newAxisBList);
  };

  const ChartComponent =
    chartType === 'Bar' ? Bar : chartType === 'Line' ? Line : Pie;

  const handleChangeChartType = (event) => {
    setChartType(event.target.value);
  };

  const handleChangeAxisA = (event: { target: { value: any } }) => {
    const selectedIndex = event.target.value;
    setLabelFilter(selectedIndex);
  };
  const handleChangeAxisB = (event: { target: { value: any } }) => {
    const selectedIndex = event.target.value;
    setLabelFilterB(selectedIndex);
    setLabelAtas(dataTahun.row[selectedIndex]);
  };

  const labels = dataTahun.value.map(
    (item) => item[Object.keys(item)[labelFilter]]
  );
  const dataChart = dataTahun.value;

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const datasetOptions = {
    backgroundColor:
      chartType === 'Pie'
        ? dataChart.map(() => getRandomColor())
        : getRandomColor(),
    borderColor:
      chartType === 'Pie'
        ? dataChart.map(() => getRandomColor())
        : getRandomColor(),
    borderWidth: 1,
  };

  const showChart = {
    labels: labels.slice(1), // Group Column bawah kepinggir (Axis 1)
    datasets: [
      {
        label: labelAtas,
        dataDetail: dataChart.map((item) => Object.values(item)[labelFilterB]),
        ...datasetOptions,
      },
      {
        label: labelAtas,
        dataDetail: dataChart.map((item) => Object.values(item)[labelFilterB]),
        ...datasetOptions,
      },
    ],
  };

  const optionsChart = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            size: 14,
            weight: 'bold',
          },
        },
      },
      title: {
        display: true,
        text: dataTahun.judul,
        font: {
          size: 18,
          weight: 'bold',
        },
      },
    },
    scales: {
      x: {
        ticks: {
          font: {
            size: 12,
          },
        },
      },
      y: {
        ticks: {
          font: {
            size: 12,
          },
          beginAtZero: true,
        },
      },
    },
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
                      <tr className="border-2 text-left">
                        <th className="border-2 p-2">Konsep</th>
                        <th className="border-2 p-2">Definisi</th>
                        <th className="border-2 p-2">Klasifikasi</th>
                        <th className="border-2 p-2">Satuan</th>
                        <th className="border-2 p-2">Ukuran</th>
                      </tr>
                      {dataDetail.standar_data.map((stndrData) => (
                        <tr key={stndrData.id}>
                          {' '}
                          {/* Tambahkan key dengan nilai yang unik, misalnya dataDetail.id */}
                          <td className="border-2 p-2">{stndrData.konsep}</td>
                          <td className="border-2 p-2">{stndrData.definisi}</td>
                          <td className="border-2 p-2">
                            {stndrData.klasifikasi}
                          </td>
                          <td className="border-2 p-2">{stndrData.satuan}</td>
                          <td className="border-2 p-2">{stndrData.ukuran}</td>
                        </tr>
                      ))}
                    </table>
                  ) : (
                    <table className="w-full rounded-xl border">
                      <tr>
                        <td className="col-span-5 border-2 p-2 text-center">
                          Standar Data Tidak Ada
                        </td>
                      </tr>
                    </table>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'metadata' && (
              <div className="prose lg:prose-xl text-base">
                <table className="w-full text-left text-base">
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
                        {dataDetail.ms_keg.judul}
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
                        {dataDetail.ms_var.nama_variabel}
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
                        {dataDetail.ms_ind.nama_indikator}
                      </div>
                    </td>
                  </tr>
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

          <div className="py-4 pb-6">
            {activeTabTable === 'grafik' && (
              <div className="prose lg:prose-xl text-base">
                <h2 className="mb-4  font-bold">Grafik</h2>
                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-2 ">
                    <ChartComponent
                      options={optionsChart}
                      dataDetail={showChart}
                    />
                  </div>
                  <div className="rounded border px-5">
                    <p>Sesuaikan Tampilan Grafik</p>
                    <label
                      htmlFor="typechart"
                      className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Gaya Grafik
                    </label>
                    <select
                      id="typechart"
                      onChange={handleChangeChartType}
                      className="mb-2 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    >
                      <option selected>--- PILIH ---</option>
                      <option value="Bar">Bar Chart</option>
                      <option value="Line">Line Chart</option>
                      <option value="Pie">Pie Chart</option>
                    </select>
                    <label
                      htmlFor="axisa"
                      className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Axis A
                    </label>
                    <select
                      id="axisa"
                      onChange={handleChangeAxisA}
                      className="mb-2 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    >
                      <option selected>--- PILIH ---</option>
                      {dataTahun.row.map((item, index) => (
                        <option key={index} value={index}>
                          {item
                            .replace(/_/g, ' ')
                            .replace(/\b\w/g, (match) => match.toUpperCase())}
                        </option>
                      ))}
                    </select>

                    <label
                      htmlFor="axisb"
                      className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Axis B
                    </label>
                    <select
                      id="axisa"
                      onChange={handleChangeAxisB}
                      className="mb-2 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    >
                      <option selected>--- PILIH ---</option>
                      {dataTahun.row.map((item, index) => (
                        <option key={index} value={index}>
                          {item
                            .replace(/_/g, ' ')
                            .replace(/\b\w/g, (match) => match.toUpperCase())}
                        </option>
                      ))}
                    </select>
                    <label
                      htmlFor="axisb"
                      className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Axis B
                    </label>
                    {axisBList.map((axisBIndex) => (
                      <select
                        key={axisBIndex}
                        id={`axisb-${axisBIndex}`}
                        onChange={handleChangeAxisB}
                        className="mb-2 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                      >
                        <option selected>--- PILIH ---</option>
                        {dataTahun.row.map((item, index) => (
                          <option key={index} value={index}>
                            {item
                              .replace(/_/g, ' ')
                              .replace(/\b\w/g, (match) => match.toUpperCase())}
                          </option>
                        ))}
                      </select>
                    ))}
                    <div className="flex justify-end">
                      <button onClick={handleAddSeries}>Tambah Series</button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
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
  const { slugData } = params as { slugData: string };

  // Fetch dataDetail from your backend API using the 'slug'
  const res = await http().get(`data/${slugData}`);
  // console.log(res);

  const { data } = res.data.data;
  // console.log(data);

  return {
    props: { data },
  };
};

export default Tahun;
