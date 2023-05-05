import React, { useState } from 'react';
import { FiPackage, FiUser } from 'react-icons/fi';

import BreadcrumbsWrapper from '@/components/Breadcrumbs';
import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

// eslint-disable-next-line import/no-named-as-default
// import Tabel from './Tabel';
import data from './dummy.json';

const Index = () => {
  const [searchResults, setSearchResults] = useState(data);
  const [zoomed, setZoomed] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [show, setShow] = useState(8);

  const ITEMS_PER_PAGE = show;

  const handlePageChange = (page: React.SetStateAction<number>) => {
    setCurrentPage(page);
  };

  const handleSearch = (event: { target: { value: any } }) => {
    const keyword = event.target.value;
    let results = [];

    if (keyword !== '') {
      results = data.filter(
        (item) =>
          typeof item.judul === 'string' &&
          item.judul.toLowerCase().includes(keyword.toLowerCase())
      );
    } else if (searchResults.length === 0 && keyword === '') {
      results = data;
    } else {
      results = searchResults;
    }

    setCurrentPage(1);
    setSearchResults(results);
  };

  const handleSearchOpd = (event: { target: { value: any } }) => {
    const keyword = event.target.value;
    let results = [];

    if (keyword !== '') {
      results = searchResults.filter(
        (item) =>
          typeof item.opd === 'string' &&
          item.opd.toLowerCase().includes(keyword.toLowerCase())
      );
    } else if (searchResults.length === 0 && keyword === '') {
      results = data;
    } else {
      results = searchResults;
    }

    setCurrentPage(1);
    setSearchResults(results);
  };

  const handleSearchSektoral = (event: { target: { value: any } }) => {
    const keyword = event.target.value;
    let results = [];

    if (keyword !== '') {
      results = searchResults.filter(
        (item) =>
          typeof item.sektoral === 'string' &&
          item.sektoral.toLowerCase().includes(keyword.toLowerCase())
      );
    } else if (searchResults.length === 0 && keyword === '') {
      results = data;
    } else {
      results = searchResults;
    }

    setCurrentPage(1);
    setSearchResults(results);
  };

  const handleLihatClick = (item: React.SetStateAction<null>) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const handleDownloadClick = (item: {
    id?: number;
    image: any;
    opd?: string;
    sektoral?: string;
    description?: string;
    slug?: string;
    judul: any;
    tlp?: string;
    alamat?: string;
    website?: string;
    email?: string;
  }) => {
    const link = document.createElement('a');
    link.download = item.judul;
    link.href = item.image;
    link.target = '_blank';
    link.click();
  };

  const totalPages = Math.ceil(searchResults.length / ITEMS_PER_PAGE);
  const startItem = (currentPage - 1) * ITEMS_PER_PAGE;
  const endItem = currentPage * ITEMS_PER_PAGE;
  const itemsToShow = searchResults.slice(startItem, endItem);

  return (
    <Main
      meta={
        <Meta
          title="Infografik"
          description="OPD merupakan kumpulan produsen data yang menghasilkan data-data pada Garut Satu Data."
        />
      }
    >
      <BreadcrumbsWrapper>
        <div className="px-4">
          <h1 className="font-bold">Infografik</h1>
          <p className="!my-1.5 text-base">
            Infografik adalah informasi yang disajikan dalam bentuk grafik agar
            lebih mudah dipahami.
          </p>
          <div className="my-4 grid grid-cols-8 place-content-center gap-3">
            <div className="relative col-span-4 w-full">
              <span className="absolute inset-y-0 left-0 flex pl-3 pt-2.5 ">
                <svg
                  className="h-4 w-4 text-gray-500"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M9 17a8 8 0 100-16 8 8 0 000 16z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M23 23l-6.65-6.65"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <input
                onChange={handleSearch}
                type="text"
                id="search"
                className="block w-full rounded-lg border border-[#acacac] bg-gray-50 p-1.5 pl-10 text-sm text-gray-900 focus:outline-[#fa65b1]"
                placeholder="Cari Infografik...."
              />
            </div>
            <div className="relative col-span-2 w-full">
              <input
                type="text"
                id="search"
                className="block w-full rounded-lg border border-[#acacac] bg-gray-50 p-1.5 pl-3 text-sm text-gray-900 focus:outline-[#fa65b1]"
                placeholder="Pilih OPD"
                onChange={handleSearchOpd}
              />
            </div>
            <div className="relative col-span-2 w-full">
              <input
                type="text"
                id="search"
                className="block w-full rounded-lg border border-[#acacac] bg-gray-50 p-1.5 pl-3 text-sm text-gray-900 focus:outline-[#fa65b1]"
                placeholder="Pilih Sektoral"
                onChange={handleSearchSektoral}
              />
            </div>
          </div>
          <div className="flex flex-row justify-between">
            <div className="text-xs font-bold">
              {searchResults.length} Jumlah Infografik
            </div>

            <div className="flex flex-row gap-3 text-xs font-bold">
              <span className="pt-2.5">Urutkan :</span>
              <div>
                <select
                  id="underline_select"
                  className="peer block w-full appearance-none border-0 border-b-2 border-[#acacac] bg-transparent px-3 py-2  text-gray-500 focus:border-[#acacac] focus:outline-none focus:ring-0 dark:border-gray-700 dark:text-gray-400"
                >
                  <option selected>Filter</option>
                  <option value="US" selected>
                    Terbaru
                  </option>
                  <option value="US">Terpopuler</option>
                </select>
              </div>
            </div>
          </div>
          <div className="border-b-2 pt-2"></div>
          <div className="grid grid-cols-4 gap-5">
            {itemsToShow.length === 0 ? (
              <p className="col-span-4 text-center">Data Tidak Ditemukan</p>
            ) : (
              itemsToShow.map((item) => (
                <div key={item.id}>
                  <img
                    alt={item.judul}
                    src={item.image}
                    className=" w-full rounded-md object-cover"
                  />
                  <p className="!my-1 text-center text-base font-bold">
                    {item.judul}
                  </p>
                  <p className="!my-1 text-sm ">{item.description}</p>
                  <div className="flex flex-row gap-1 py-2 align-bottom text-sm">
                    <FiUser className="mt-1 " />
                    <span>{}</span>
                    {item.opd ? <span>{item.opd}</span> : <span> - </span>}
                  </div>
                  <div className="flex flex-row gap-1 py-2 align-bottom text-sm">
                    <FiPackage className="mt-1 " />
                    <span>{}</span>
                    {item.sektoral ? (
                      <span>{item.sektoral}</span>
                    ) : (
                      <span> - </span>
                    )}
                  </div>
                  <div className="flex justify-between text-sm">
                    <button
                      className="flex w-24 items-center justify-center rounded-md bg-[#E8AEE2] px-2 py-1 font-bold text-black"
                      onClick={() => handleLihatClick(item)}
                    >
                      <span>Lihat</span>
                    </button>
                    <button
                      className="flex w-24  items-center justify-center rounded-md bg-[#AEE8B4] px-2 py-1 font-bold text-black"
                      onClick={() => handleDownloadClick(item)}
                    >
                      <span>Download</span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
        <div className="flex justify-between">
          <div className="mt-10 flex flex-row gap-3 text-sm font-bold">
            <div>
              <select
                id="underline_select"
                className="w-full rounded border-2 border-[#acacac] bg-transparent  text-gray-500 focus:border-[#acacac] focus:outline-none focus:ring-0 dark:border-gray-700 dark:text-gray-400"
                value={show}
                onChange={(event) => setShow(parseInt(event.target.value, 10))}
              >
                <option value="8">8</option>
                <option value="16">16</option>
                <option value="32">32</option>
              </select>
            </div>
            {data.length > 0 && (
              <span>
                Menampilkan data 1-{Math.min(show, data.length)} dari{' '}
                {data.length}
              </span>
            )}
          </div>
          <div>
            {totalPages > 1 && (
              <div className="mt-5">
                {Array.from(Array(totalPages)).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => handlePageChange(i + 1)}
                    className={`mx-1 rounded-md px-4 py-2 ${
                      currentPage === i + 1
                        ? 'bg-blue-600 text-white'
                        : 'bg-white text-gray-700'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            )}
          </div>
          {selectedItem && showModal && (
            <div className="fixed inset-0 z-50 bg-black bg-opacity-50">
              <div className="absolute left-1/2 top-1/2 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-md bg-white p-2 text-sm">
                <img
                  alt={selectedItem.judul}
                  src={selectedItem.image}
                  className={`modal-image${zoomed ? ' zoomed' : ''} rounded`}
                  onClick={() => setZoomed(!zoomed)}
                />
                <div className="py-1 text-center font-bold">
                  {selectedItem.judul}
                </div>
                <div className="my-1">{selectedItem.description}</div>
                <div className="pt-2">
                  <div className="flex flex-row gap-1 align-bottom text-sm">
                    <FiUser className="mt-1 " />
                    <span>{}</span>
                    {selectedItem.opd ? (
                      <span>{selectedItem.opd}</span>
                    ) : (
                      <span> - </span>
                    )}
                  </div>
                </div>
                <div className="flex flex-row gap-1 align-bottom text-sm">
                  <FiPackage className="mt-1 " />
                  <span>{}</span>
                  {selectedItem.sektoral ? (
                    <span>{selectedItem.sektoral}</span>
                  ) : (
                    <span> - </span>
                  )}
                </div>
                <div className="flex justify-end">
                  <button
                    className="rounded-md bg-[#AEE8B4] px-2 py-1 font-bold text-black"
                    onClick={() => setShowModal(false)}
                  >
                    Tutup
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </BreadcrumbsWrapper>
    </Main>
  );
};

export default Index;
