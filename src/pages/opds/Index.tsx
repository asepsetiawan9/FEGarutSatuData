import React, { useState } from 'react';
import { FiPackage } from 'react-icons/fi';

import BreadcrumbsWrapper from '@/components/Breadcrumbs';
import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

import data from './dummy.json';

// eslint-disable-next-line import/no-named-as-default
// import Tabel from './Tabel';

const Index = () => {
  // const countData = data.length;
  const [searchResults, setSearchResults] = useState(data);
  const countData = searchResults.length;

  const handleSearch = (event: { target: { value: any } }) => {
    const keyword = event.target.value;
    const results = data.filter((item) =>
      item.judul.toLowerCase().includes(keyword.toLowerCase())
    );
    setSearchResults(results);
  };

  return (
    <Main
      meta={
        <Meta
          title="SKPD / OPD"
          description="OPD merupakan kumpulan produsen data yang menghasilkan data-data pada Garut Satu Data."
        />
      }
    >
      <BreadcrumbsWrapper>
        <div className="px-4">
          <h1 className="font-bold">OPD</h1>
          <p className="!my-1.5 text-base">
            OPD merupakan kumpulan produsen data yang menghasilkan data-data
            pada Garut Satu Data.
          </p>
          <div className="my-4 flex gap-4">
            <div className="relative w-full">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 ">
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
                type="text"
                id="search"
                className="block w-full rounded-lg border border-[#acacac] bg-gray-50 p-1.5 pl-10 text-sm text-gray-900 focus:outline-[#fa65b1]"
                placeholder="Cari OPD ..."
                onChange={handleSearch}
              />
            </div>
          </div>
          <div className="flex flex-row justify-between ">
            <span className="pt-2.5 text-sm font-bold">
              {countData || '0'} Jumlah OPD
            </span>
            <div className="flex flex-row gap-3">
              <span className="pt-2.5 text-sm">Urutkan :</span>
              <div>
                <select
                  id="underline_select"
                  className="peer block w-full appearance-none border-0 border-b-2 border-[#acacac] bg-transparent px-3 py-2 text-sm text-gray-500 focus:border-[#acacac] focus:outline-none focus:ring-0 dark:border-gray-700 dark:text-gray-400"
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
          <div className="mb-5 mt-2 w-full border-b border-[#acacac]"></div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-4">
            {searchResults.length === 0 ? (
              <p className="col-span-4 text-center">Data Tidak Ditemukan</p>
            ) : (
              searchResults.map((item) => (
                <a
                  key={item.id}
                  href={`opds/${item.slug}`}
                  className="no-underline decoration-black hover:no-underline"
                >
                  <div className="text-center">
                    <img
                      src={item.image}
                      alt={item.judul}
                      className="h-[180px] w-full rounded-md object-cover"
                    />
                    <p className="!my-1 text-base font-bold">{item.judul}</p>
                    <div className="flex flex-row justify-center gap-2 py-2 align-bottom text-base">
                      <FiPackage className="mt-1 " />
                      <span>
                        Jumlah data: {item.jmldataset ? item.jmldataset : '0'}
                      </span>
                    </div>
                  </div>
                </a>
              ))
            )}
          </div>
        </div>
      </BreadcrumbsWrapper>
    </Main>
  );
};

export default Index;
