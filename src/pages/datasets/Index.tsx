import React, { useState } from 'react';
import { FiCalendar, FiClock, FiEye, FiGrid, FiUser } from 'react-icons/fi';

import BreadcrumbsWrapper from '@/components/Breadcrumbs';
import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

import data from './dummy.json';

const Index = () => {
  const [searchResults, setSearchResults] = useState(data);
  const [currentPage, setCurrentPage] = useState(1);
  const [show, setShow] = useState(5);

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
  const totalPages = Math.ceil(searchResults.length / ITEMS_PER_PAGE);
  const startItem = (currentPage - 1) * ITEMS_PER_PAGE;
  const endItem = currentPage * ITEMS_PER_PAGE;
  const itemsToShow = searchResults.slice(startItem, endItem);
  return (
    <Main
      meta={
        <Meta
          title="Datasets"
          description="Dataset merupakan kumpulan dari data-data yang digabungkan dalam satu judul yang sama."
        />
      }
    >
      <BreadcrumbsWrapper>
        <div className="px-4">
          <h1 className="font-bold">Datasets</h1>
          <p className="!my-1.5 text-base">
            Dataset merupakan kumpulan dari data-data yang digabungkan dalam
            satu judul yang sama.
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
                placeholder="Cari Dataset...."
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
              {`${searchResults.length}  Datasets Ditemukan`}
            </div>

            <div className="flex flex-row gap-3 text-xs font-bold">
              <span className="pt-2.5">Urutkan :</span>
              <div>
                <select
                  id="underline_select"
                  className="mt-2 w-full rounded border-2 border-[#acacac] bg-transparent  text-gray-500 focus:border-[#acacac] focus:outline-none focus:ring-0 dark:border-gray-700 dark:text-gray-400"
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
          <div className="flex flex-col gap-5 pt-4">
            {itemsToShow.length === 0 ? (
              <p className="col-span-4 text-center">Data Tidak Ditemukan</p>
            ) : (
              itemsToShow.map((item) => (
                // eslint-disable-next-line react/jsx-key
                <a
                  key={item.id}
                  href={`datasets/${item.slug}`}
                  className="no-underline decoration-black hover:no-underline"
                >
                  <div className="grid grid-cols-5 gap-4">
                    <div key={item.id}>
                      <img
                        src={
                          'image' in item && item.image
                            ? item.image
                            : 'https://garutkab.go.id/assets/img/no-image.jpeg'
                        }
                        alt={item.judul}
                        className="h-[120px] w-full rounded-md object-cover"
                      />
                    </div>

                    <div className="col-span-3 flex flex-col justify-between">
                      <div>
                        <p className="!my-1 text-base font-bold">
                          {item.judul}
                        </p>
                        <p className="!my-1 text-base">{item.description}</p>
                      </div>
                      <div className="my-2 flex flex-row gap-5">
                        <div className="flex flex-row gap-2 text-sm">
                          <FiUser className="mt-1" />
                          <span>{item.opd || ''}</span>
                        </div>
                        <div className="flex flex-row gap-2 text-sm">
                          <FiGrid className="mt-1" />
                          <span>Infrastruktur</span>
                        </div>
                        <div className="flex flex-row gap-2 text-sm">
                          <FiCalendar className="mt-1" />
                          <span>2019-2021 (3)</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-row justify-between">
                      <div className="flex flex-row gap-2 text-sm">
                        <FiClock className="mt-1" />
                        <span>5 Hari yang lalu</span>
                      </div>
                      <div className="flex flex-row gap-2 text-center text-sm">
                        <FiEye className="mt-1" />
                        <span>120</span>
                      </div>
                    </div>
                  </div>
                </a>
              ))
            )}
          </div>
          <div className="flex justify-between">
            <div className="mt-10 flex flex-row gap-3 text-sm font-bold">
              <div>
                <select
                  id="underline_select"
                  className="w-full rounded border-2 border-[#acacac] bg-transparent  text-gray-500 focus:border-[#acacac] focus:outline-none focus:ring-0 dark:border-gray-700 dark:text-gray-400"
                  value={show}
                  onChange={(event) =>
                    setShow(parseInt(event.target.value, 10))
                  }
                >
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="15">15</option>
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
          </div>
        </div>
      </BreadcrumbsWrapper>
    </Main>
  );
};

export default Index;
