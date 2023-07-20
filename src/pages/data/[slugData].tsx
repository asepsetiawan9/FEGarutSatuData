/* eslint-disable no-nested-ternary */
/* eslint-disable tailwindcss/no-custom-classname */
/* eslint-disable new-cap */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react/jsx-key */
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
import jsPDF from 'jspdf';
import type { GetServerSideProps, GetServerSidePropsContext } from 'next';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React, { Suspense, useEffect, useState } from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';
import { CSVLink } from 'react-csv';
import {
  BsFileEarmarkCodeFill,
  BsFiletypeJson,
  BsFillClipboard2CheckFill,
} from 'react-icons/bs';
import {
  FaChartPie,
  FaClipboardList,
  FaFacebookSquare,
  FaFileCsv,
  FaFilePdf,
  FaLink,
  FaTable,
  FaTwitterSquare,
  FaWhatsappSquare,
} from 'react-icons/fa';
import { FiCalendar, FiClock, FiEye, FiGrid, FiUser } from 'react-icons/fi';
import { VscJson } from 'react-icons/vsc';
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

import dataTahun from './dummytahun.json';

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

const Tahun = ({ data }) => {
  const router = useRouter();
  console.log(data);
  const DataTable = dynamic(() => import('react-data-table-component'), {
    ssr: false,
  });

  const [activeTab, setActiveTab] = useState('standardata');
  const [activeTabTable, setActiveTabTable] = useState('tabel');
  const [searchTerm, setSearchTerm] = useState('');
  const [dataBind] = useState(dataTahun);
  const [shareLink] = useState('');

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareLink);
    toast.success('Link telah berhasil dicopy!', {
      position: 'bottom-right',
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

  const shareUrl = `http://localhost:3000${router.asPath}`;

  useEffect(() => {
    // Panggil API atau lakukan operasi lain untuk mendapatkan dataBind yang sesuai dengan slug dan tahun
    // Simpan dataBind tersebut ke dalam state dataBind
  }, [slug, tahun]);

  const rowTabel = dataBind.row.filter((col) => col !== 'id');

  const valueTabel = dataBind.value.map((val) => {
    const { id, ...rest } = val;
    return rest;
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  function generateColumns(rowTabel: any[]) {
    return rowTabel.map((column) => ({
      name: column,
      selector: column,
      sortable: true,
    }));
  }

  const handlePDFDownload = () => {
    const doc = new jsPDF({
      orientation: 'landscape',
    });
    doc.text(dataBind.judul || 'Data Tabel', 14, 20);
    doc.autoTable({
      head: [rowTabel],
      body: filteredData.map((row) => Object.values(row)),
      startY: 30,
    });
    doc.save(`dataBind-tahun-${tahun}.pdf`);
  };

  const handleJSONDownload = () => {
    const jsonData = JSON.stringify(filteredData, null, 2);
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `dataBind-tahun-${tahun}.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const columns = generateColumns(rowTabel);
  const filteredData = valueTabel.filter((row) =>
    Object.values(row)
      .join(' ')
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const handleDownload = () => {
    const csvData = filteredData.map((row) => Object.values(row));
    const headers = rowTabel;
    const csv = [headers, ...csvData];

    return (
      <>
        <div className="flex flex-row gap-3">
          <div className="mt-1.5">Unduh Data:</div>
          <div className="flex flex-row gap-3">
            <div
              onClick={handlePDFDownload}
              className="flex h-8 w-8 cursor-pointer items-center justify-center rounded border hover:bg-gray-200"
            >
              <CSVLink data={csv} filename={`dataBind-tahun-${tahun}.csv`}>
                <FaFileCsv
                  className="text-2xl 
          text-green-400"
                />
              </CSVLink>
            </div>
            <div
              onClick={handlePDFDownload}
              className="flex h-8 w-8 cursor-pointer items-center justify-center rounded border hover:bg-gray-200"
            >
              <FaFilePdf className="text-2xl text-red-500" />
            </div>
            <div
              onClick={handleJSONDownload}
              className="flex h-8 w-8 cursor-pointer items-center justify-center rounded border hover:bg-gray-200"
            >
              <BsFiletypeJson className="text-2xl text-primary" />
            </div>
            <div className="flex h-8 w-8 cursor-pointer items-center justify-center rounded border hover:bg-gray-200">
              <VscJson className="text-2xl text-[#FFC300]" />
            </div>
          </div>
        </div>
      </>
    );
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
        dataBind: dataChart.map((item) => Object.values(item)[labelFilterB]),
        ...datasetOptions,
      },
      {
        label: labelAtas,
        dataBind: dataChart.map((item) => Object.values(item)[labelFilterB]),
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
          <h1 className="mb-2 font-bold">
            {slug} - {tahun}
          </h1>
          <div className="flex justify-between text-sm">
            <div className="flex flex-row gap-3">
              <div className="flex flex-row gap-1">
                {' '}
                <FiUser className="mt-1" />
                {dataBind.opd}
              </div>
              <div className="flex flex-row gap-1">
                {' '}
                <FiGrid className="mt-1" />
                {dataBind.sektoral}
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
                  <table className="w-full rounded-xl border">
                    <tr className="border-2  text-left">
                      <th className="border-2 p-2">Konsep</th>
                      <th className="border-2 p-2">Definisi</th>
                      <th className="border-2 p-2">Klasifikasi</th>
                      <th className="border-2 p-2">Satuan</th>
                      <th className="border-2 p-2">Ukuran</th>
                    </tr>
                    {dataBind.standar_data.map((dataBind) => (
                      <tr>
                        <td className="border-2 p-2">{dataBind.konsep}</td>
                        <td className="border-2 p-2">{dataBind.definisi}</td>
                        <td className="border-2 p-2">{dataBind.klasifikasi}</td>
                        <td className="border-2 p-2">{dataBind.satuan}</td>
                        <td className="border-2 p-2">{dataBind.ukuran}</td>
                      </tr>
                    ))}
                  </table>
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
                      <div className="mx-2">{dataBind.metadata_dibuat}</div>
                    </td>
                  </tr>
                  <tr>
                    <th className="w-44  font-medium">
                      <div className="m-2 ">Tanggal Diubah</div>
                    </th>
                    <td className="">
                      <div className="mx-2">{dataBind.metadata_diedit}</div>
                    </td>
                  </tr>
                  <tr>
                    <th className="w-44  font-medium">
                      <div className="m-2 ">Metadata Kegiatan</div>
                    </th>
                    <td className="">
                      <div className="mx-2">{dataBind.metadata_keg}</div>
                    </td>
                  </tr>
                  <tr>
                    <th className="w-44  font-medium">
                      <div className="m-2 ">Metadata Variabel</div>
                    </th>
                    <td className="">
                      <div className="mx-2">{dataBind.metadata_var}</div>
                    </td>
                  </tr>
                  <tr>
                    <th className="w-44  font-medium">
                      <div className="m-2 ">Metadata Indikator</div>
                    </th>
                    <td className="">
                      <div className="mx-2">{dataBind.metadata_ind}</div>
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
                {handleDownload()}
              </div>
            </div>
            {activeTabTable === 'tabel' && (
              <div className="prose lg:prose-xl text-base">
                {/* tabel */}

                <div className="my-2 flex flex-row justify-between">
                  <div>{dataBind.judul || 'Data Tabel'}</div>
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
                        dataBind={filteredData}
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
                      dataBind={showChart}
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
      </BreadcrumbsWrapper>
    </Main>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  params,
}: GetServerSidePropsContext) => {
  const { slugData } = params as { slugData: string };

  // Fetch dataBind from your backend API using the 'slug'
  const res = await http().get(`data/${slugData}`);
  // console.log(res);

  const { data } = res.data;
  // console.log(data);

  return {
    props: { data },
  };
};

export default Tahun;
