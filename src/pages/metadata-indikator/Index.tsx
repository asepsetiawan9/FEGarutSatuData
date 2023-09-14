import Link from 'next/link';
import React, { useEffect, useState } from 'react';

import BreadcrumbsWrapper from '@/components/Breadcrumbs';
import http from '@/helpers/http';
import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

type MetadataType = {
  total_dataset: any;
  created_at: string | number | Date;
  nama_indikator: string;
  definisi: string;
  id: number;
  slug: string;
};

const Index = () => {
  const [data, setData] = useState<MetadataType[]>([]);
  const [originalData, setOriginalData] = useState<MetadataType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<string>('terbaru');

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(5);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await http().get('/msind');
        const resultData = response.data;
        setData(resultData);
        setOriginalData(resultData);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const keyword = event.target.value.toLowerCase();
    if (keyword === '') {
      setData([...originalData]); // Menampilkan semua data ketika pencarian kosong
    } else {
      const filteredData = originalData.filter((item) =>
        item.nama_indikator.toLowerCase().includes(keyword)
      );

      const sortedResults = [...filteredData];
      if (filter === 'terpopuler') {
        sortedResults.sort((a, b) => b.total_dataset - a.total_dataset);
      } else if (filter === 'terbaru') {
        sortedResults.sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
      }

      setData([...sortedResults]);
    }
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedFilter = event.target.value;

    if (selectedFilter === 'terbaru') {
      // Urutkan data berdasarkan yang terbaru
      const sortedData = [...data].sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
      setData(sortedData);
    } else if (selectedFilter === 'terlama') {
      // Urutkan data berdasarkan yang terlama
      const sortedData = [...data].sort(
        (a, b) =>
          new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      );
      setData(sortedData);
    }

    setFilter(selectedFilter);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleItemsPerPageChange = (event: { target: { value: string } }) => {
    setItemsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(1);
  };

  // Memotong data sesuai dengan halaman yang aktif
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const paginatedDataset = data.slice(startIndex, endIndex);

  // Menghitung jumlah total halaman
  const totalPageCount = Math.ceil(data.length / itemsPerPage);
  const jumlahData = data ? data.length : 0;

  return (
    <Main
      meta={
        <Meta
          title="Metadata"
          description="Metadata adalah informasi terstruktur yang mendeskripsikan, menjelaskan, menemukan, atau setidaknya menjadikan suatu informasi mudah untuk ditemukan kembali, digunakan, atau dikelola."
        />
      }
    >
      <BreadcrumbsWrapper>
        <div className="px-4">
          <h1 className="font-bold">Metadata Indikator</h1>

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
                placeholder="Cari Metadata Indikator ..."
                onChange={handleSearch}
              />
            </div>
          </div>
          <div className="flex flex-row justify-between ">
            <span className="pt-2.5 text-sm font-bold">
              {jumlahData || '0'} Jumlah Metadata indikator
            </span>
            <div className="flex flex-row gap-3">
              <span className="pt-2.5 text-sm">Urutkan :</span>
              <div>
                <select
                  id="underline_select"
                  className="peer block w-full appearance-none border-0 border-b-2 border-[#acacac] bg-transparent px-3 py-2 text-sm text-gray-500 focus:border-[#acacac] focus:outline-none focus:ring-0 dark:border-gray-700 dark:text-gray-400"
                  value={filter}
                  onChange={handleFilterChange}
                >
                  <option value="terbaru">Terbaru</option>
                  <option value="terlama">Terlama</option>
                </select>
              </div>
            </div>
          </div>
          <div className="mb-5 mt-2 w-full border-b border-[#acacac]"></div>
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <div className="space-y-4">
              {paginatedDataset.length === 0 ? (
                <p className="text-center">Data Tidak Ditemukan</p>
              ) : (
                paginatedDataset.map((item) => (
                  <Link
                    key={item.id}
                    href={`/metadata-indikator/${item.slug}`}
                    className="no-underline decoration-black hover:no-underline"
                  >
                    <div className="mt-4 rounded-lg border border-gray-200 p-4">
                      <div className="text-lg font-bold">
                        {item.nama_indikator || '-'}
                      </div>
                      <div className="text-base">{item.definisi || '-'}</div>
                    </div>
                  </Link>
                ))
              )}
            </div>
          )}
          <div className="flex justify-between">
            <div className="mt-10 flex flex-row gap-3 text-sm font-bold">
              <div>
                <select
                  id="underline_select"
                  className="w-full rounded border-2 border-[#acacac] bg-transparent  text-gray-500 focus:border-[#acacac] focus:outline-none focus:ring-0 dark:border-gray-700 dark:text-gray-400"
                  value={itemsPerPage}
                  onChange={handleItemsPerPageChange}
                >
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="15">15</option>
                </select>
              </div>
              <span>Menampilkan data dari</span>
            </div>
            <div className="mt-4 flex justify-center">
              <ul className="flex gap-2">
                {currentPage > 1 && (
                  <li>
                    <button
                      className="rounded bg-green-500 px-3 py-1 text-white"
                      onClick={() => handlePageChange(currentPage - 1)}
                    >
                      Prev
                    </button>
                  </li>
                )}
                {Array.from({ length: totalPageCount }, (_, index) => {
                  const pageNumber = index + 1;
                  const isFirstPageInRange =
                    pageNumber >= currentPage && pageNumber <= currentPage + 3;
                  if (isFirstPageInRange) {
                    return (
                      <li key={index}>
                        <button
                          className={`rounded px-3 py-1 ${
                            currentPage === pageNumber
                              ? 'bg-green-500 text-white'
                              : 'bg-gray-200 text-gray-700'
                          }`}
                          onClick={() => handlePageChange(pageNumber)}
                        >
                          {pageNumber}
                        </button>
                      </li>
                    );
                  }
                  return null;
                })}
                {currentPage + 3 < totalPageCount && (
                  <li>
                    <button
                      className="rounded bg-green-500 px-3 py-1 text-white"
                      onClick={() => handlePageChange(currentPage + 4)}
                    >
                      Next
                    </button>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </BreadcrumbsWrapper>
    </Main>
  );
};

export default Index;
