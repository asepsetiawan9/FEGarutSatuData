/* eslint-disable tailwindcss/no-custom-classname */
/* eslint-disable new-cap */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react/jsx-key */
import 'jspdf-autotable';
import 'react-toastify/dist/ReactToastify.css';

import jsPDF from 'jspdf';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { CSVLink } from 'react-csv';
import DataTable from 'react-data-table-component';
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
import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

import dataTahun from './dummytahun.json';

const Tahun = () => {
  const router = useRouter();
  // console.log(router.asPath);

  const [activeTab, setActiveTab] = useState('standardata');
  const [activeTabTable, setActiveTabTable] = useState('tabel');
  const [searchTerm, setSearchTerm] = useState('');
  const [data] = useState(dataTahun);
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

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl);
  };

  useEffect(() => {
    // Panggil API atau lakukan operasi lain untuk mendapatkan data yang sesuai dengan slug dan tahun
    // Simpan data tersebut ke dalam state data
  }, [slug, tahun]);

  const rowTabel = data.row.filter((col) => col !== 'id');

  const valueTabel = data.value.map((val) => {
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
    doc.text(data.judul || 'Data Tabel', 14, 20);
    doc.autoTable({
      head: [rowTabel],
      body: filteredData.map((row) => Object.values(row)),
      startY: 30,
    });
    doc.save(`data-tahun-${tahun}.pdf`);
  };

  const handleJSONDownload = () => {
    const jsonData = JSON.stringify(filteredData, null, 2);
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `data-tahun-${tahun}.json`);
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
              <CSVLink data={csv} filename={`data-tahun-${tahun}.csv`}>
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
                {data.opd}
              </div>
              <div className="flex flex-row gap-1">
                {' '}
                <FiGrid className="mt-1" />
                {data.sektoral}
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
                    {data.standar_data.map((data) => (
                      <tr>
                        <td className="border-2 p-2">{data.konsep}</td>
                        <td className="border-2 p-2">{data.definisi}</td>
                        <td className="border-2 p-2">{data.klasifikasi}</td>
                        <td className="border-2 p-2">{data.satuan}</td>
                        <td className="border-2 p-2">{data.ukuran}</td>
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
                      <div className="mx-2">{data.metadata_dibuat}</div>
                    </td>
                  </tr>
                  <tr>
                    <th className="w-44  font-medium">
                      <div className="m-2 ">Tanggal Diubah</div>
                    </th>
                    <td className="">
                      <div className="mx-2">{data.metadata_diedit}</div>
                    </td>
                  </tr>
                  <tr>
                    <th className="w-44  font-medium">
                      <div className="m-2 ">Metadata Kegiatan</div>
                    </th>
                    <td className="">
                      <div className="mx-2">{data.metadata_keg}</div>
                    </td>
                  </tr>
                  <tr>
                    <th className="w-44  font-medium">
                      <div className="m-2 ">Metadata Variabel</div>
                    </th>
                    <td className="">
                      <div className="mx-2">{data.metadata_var}</div>
                    </td>
                  </tr>
                  <tr>
                    <th className="w-44  font-medium">
                      <div className="m-2 ">Metadata Indikator</div>
                    </th>
                    <td className="">
                      <div className="mx-2">{data.metadata_ind}</div>
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
                  <div>{data.judul || 'Data Tabel'}</div>
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
                </div>
              </div>
            )}
          </div>

          <div className="py-4 pb-6">
            {activeTabTable === 'grafik' && (
              <div className="prose lg:prose-xl text-base">
                <h2 className="mb-4  font-bold">Grafik</h2>
              </div>
            )}
          </div>
        </div>
      </BreadcrumbsWrapper>
    </Main>
  );
};

export default Tahun;
