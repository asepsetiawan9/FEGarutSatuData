/* eslint-disable tailwindcss/migration-from-tailwind-2 */
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { FiUser } from 'react-icons/fi';
import { ColorRing } from 'react-loader-spinner';

import BreadcrumbsWrapper from '@/components/Breadcrumbs';
import http from '@/helpers/http';
import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

type VisualisasiDataType = {
  grup: any;
  opd: any;
  sektoral: any;
  id: number;
  slug: string;
  name: string;
  gambar: string;
  created_at: string;
  visualisasi_count: number;
  desc: string;
};
type OpdType = string;

const Index = () => {
  const [data, setData] = useState<VisualisasiDataType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOpd, setSelectedOpd] = useState('');
  const [allOpd, setAllOpd] = useState<OpdType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortMethod, setSortMethod] = useState('Terpopuler');
  const [visualisasi, setVisualisasi] = useState<VisualisasiDataType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await http().get('/visualisasis');
        const resultData = response.data.visualisasis;
        const resultOpd = response.data.all_opd;

        setData(resultData);
        setAllOpd(resultOpd);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex items-center justify-center">
          <ColorRing
            visible={true}
            height={80}
            width={80}
            ariaLabel="blocks-loading"
            colors={['#b8c480', '#B2A3B5', '#F4442E', '#51E5FF', '#429EA6']}
          />
        </div>
      </div>
    );
  }

  const handlePageChange = (pageNumber: React.SetStateAction<number>) => {
    setCurrentPage(pageNumber);
  };

  const handleItemsPerPageChange = (event: { target: { value: string } }) => {
    setItemsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(1);
  };

  const handleSearchOpd = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOpd(event.target.value);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  // Filter and sort data based on search query
  const filterBySearch = (visualisasi) => {
    return visualisasi.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };
  const handleSortMethodChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSortMethod(event.target.value);
  };

  // Filter and sort data based on selected OPD
  const filterByOpd = (visualisasi) => {
    if (!visualisasi) {
      return [];
    }
    return visualisasi.filter(
      (item) =>
        selectedOpd === '' || (item.opd && item.opd.name === selectedOpd)
    );
  };

  const sortVisualisasiByDate = (visualisasi, sortOption: string) => {
    return visualisasi.slice().sort((a, b) => {
      const dateA = new Date(a.created_at).getTime();
      const dateB = new Date(b.created_at).getTime();

      if (sortOption === 'Terbaru') {
        return dateB - dateA;
      }
      if (sortOption === 'Terlama') {
        return dateA - dateB;
      }

      return 0;
    });
  };

  const applySorting = (visualisasi) => {
    if (!visualisasi) {
      return [];
    }

    let sortedVisualisasi = [...visualisasi];

    if (sortMethod === 'Terbaru') {
      sortedVisualisasi = sortVisualisasiByDate(sortedVisualisasi, 'Terbaru');
    } else if (sortMethod === 'Terlama') {
      sortedVisualisasi = sortVisualisasiByDate(sortedVisualisasi, 'Terlama');
    }

    return sortedVisualisasi;
  };

  // Apply sorting and filtering
  const filteredVisualisasi = applySorting(filterBySearch(filterByOpd(data)));

  const totalPageCount = Math.ceil(
    (filteredVisualisasi?.length || 0) / itemsPerPage
  );

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedVisualisasi = filteredVisualisasi.slice(startIndex, endIndex);

  const jumlahData = filteredVisualisasi ? filteredVisualisasi.length : 0;

  return (
    <Main
      meta={
        <Meta
          title="Visualisasi"
          description="Kumpulan Dashboard data dari berbagai SKPD."
        />
      }
    >
      <BreadcrumbsWrapper>
        <div className="px-4">
          <h1 className="font-bold">Visualisasi</h1>
          <p className="!my-1.5 text-base">
            Kumpulan Dashboard data dari berbagai SKPD.
          </p>
          <div className="my-4 grid grid-cols-8 place-content-center gap-3">
            <div className="relative col-span-5 w-full">
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
                placeholder="Cari Visualisasi...."
              />
            </div>
            <div className="relative col-span-3 w-full">
              <select
                id="search"
                className="block w-full rounded-lg border border-[#acacac] bg-gray-50 p-1.5 pl-3 text-sm text-gray-900 focus:outline-[#fa65b1]"
                value={selectedOpd}
                onChange={handleSearchOpd}
              >
                <option value="">Pilih Opd</option>

                {allOpd.map((grup, index) => (
                  <option key={index} value={grup}>
                    {grup}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex flex-row justify-between">
            <div className="text-xs font-bold">
              {jumlahData} Jumlah Visualisasi
            </div>

            <div className="flex flex-row gap-3 text-xs font-bold">
              <span className="pt-2.5">Urutkan :</span>
              <div>
                <select
                  id="sort_select"
                  className="peer block w-full appearance-none border-0 border-b-2 border-[#acacac] bg-transparent px-3 py-2  text-gray-500 focus:border-[#acacac] focus:outline-none focus:ring-0 dark:border-gray-700 dark:text-gray-400"
                  value={sortMethod}
                  onChange={handleSortMethodChange}
                >
                  <option value="Terlama">Terlama</option>
                  <option value="Terbaru">Terbaru</option>
                </select>
              </div>
            </div>
          </div>
          <div className="my-2 border-b-2"></div>
          <div className="grid grid-cols-2 gap-5">
            {paginatedVisualisasi.length === 0 ? (
              <p className="col-span-4 text-center">Data Tidak Ditemukan</p>
            ) : (
              paginatedVisualisasi.map((item) => (
                <Link
                  href={`/visualisasi/${item.slug}`}
                  key={item.id}
                  className="flex flex-col gap-3 rounded-md border border-gray-200 p-3 sm:flex-row"
                >
                  <img
                    alt={item.name}
                    src={item.gambar}
                    className="mb-2 w-full rounded-md object-cover sm:mb-0 sm:h-60 sm:w-60"
                  />
                  <div className="flex flex-col">
                    <div>
                      <p className="text-base font-bold">{item.name}</p>
                      <p
                        className="mb-2 text-sm text-gray-600"
                        dangerouslySetInnerHTML={{ __html: item.desc }}
                      />
                    </div>
                    <div className="flex flex-row gap-1 py-2 align-bottom text-sm">
                      <FiUser className="mt-1" />
                      <span>{item.opd ? item.opd.name : ' - '}</span>
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>

        <div className="flex justify-between">
          <div className="mt-10 flex flex-row gap-3 text-sm font-bold">
            <div>
              <select
                id="items_per_page_select"
                className="w-full rounded border-2 border-[#acacac] bg-transparent  text-gray-500 focus:border-[#acacac] focus:outline-none focus:ring-0 dark:border-gray-700 dark:text-gray-400"
                value={itemsPerPage}
                onChange={handleItemsPerPageChange}
              >
                <option value="8">8</option>
                <option value="16">16</option>
                <option value="32">32</option>
                <option value="64">64</option>
                <option value="120">120</option>
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
      </BreadcrumbsWrapper>
    </Main>
  );
};

export default Index;
