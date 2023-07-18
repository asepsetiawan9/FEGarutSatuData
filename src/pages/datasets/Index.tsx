import { useRouter } from 'next/router';
import type { Key, ReactNode, SetStateAction } from 'react';
import { useEffect, useState } from 'react';
import { FiCalendar, FiClock, FiEye, FiGrid, FiUser } from 'react-icons/fi';

import BreadcrumbsWrapper from '@/components/Breadcrumbs';
import http from '@/helpers/http';
import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

type YourDataType = {
  image: string;
  id: Key | null | undefined;
  slug: any;
  date_upload: ReactNode;
  count_view: any;
  created_at: string | number | Date;
  deskripsi: string;
  range_years: string;
  jumlah_data: number;
  judul: string;
  opd: {
    name: string;
  };
  grup: {
    name: string;
  };
};
const Index = () => {
  const [data, setData] = useState<YourDataType[]>([]);
  const [searchResults, setSearchResults] = useState<YourDataType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedFilter, setSelectedFilter] = useState('Filter');
  const [show, setShow] = useState(8);
  const router = useRouter();

  const ITEMS_PER_PAGE = show;
  const totalPages = searchResults
    ? Math.ceil(searchResults.length / ITEMS_PER_PAGE)
    : 0;

  const handlePageChange = (page: SetStateAction<number>) => {
    setCurrentPage(page);
  };

  const renderPaginationButtons = () => {
    const maxVisiblePages = 5;
    const halfMaxVisiblePages = Math.floor(maxVisiblePages / 2);
    const firstPage = Math.max(1, currentPage - halfMaxVisiblePages);
    const lastPage = Math.min(totalPages, firstPage + maxVisiblePages - 1);

    return (
      <div className="mt-5">
        {currentPage > 1 && (
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            className="mx-1 rounded-md border bg-white px-4 py-2 text-gray-700"
          >
            Previous
          </button>
        )}

        {Array.from(Array(lastPage - firstPage + 1)).map((_, i) => (
          <button
            key={i}
            onClick={() => handlePageChange(firstPage + i)}
            className={`mx-1 rounded-md border px-4 py-2 ${
              currentPage === firstPage + i
                ? 'bg-[#16A75C] text-white'
                : 'bg-white text-gray-700'
            }`}
          >
            {firstPage + i}
          </button>
        ))}

        {currentPage < totalPages && (
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            className="mx-1 rounded-md border bg-white px-4 py-2 text-gray-700"
          >
            Next
          </button>
        )}
      </div>
    );
  };

  const startItem = (currentPage - 1) * ITEMS_PER_PAGE;
  const endItem = currentPage * ITEMS_PER_PAGE;
  const itemsToShow = searchResults && searchResults.slice(startItem, endItem);
  useEffect(() => {
    // Jika kita sedang berada di sisi klien, pastikan URL yang cocok dengan router.pathname
    if (window.location.pathname !== router.pathname) {
      // Redirect ke URL yang benar di sisi klien
      window.location.href = router.pathname;
    }
  }, [router.pathname]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await http().get('/datasets');
        setData(response.data);
      } catch (error) {
        // console.error(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    setSearchResults(data);
  }, [data]);

  // console.log('ini search',searchResults);

  const handleSearch = (
    event: { target: { value: any } },
    filterBy: 'judul'
  ) => {
    const keyword = event.target.value.toLowerCase();
    let results = [];
    // console.log(keyword);
    if (keyword !== '') {
      results = data.filter(
        (item) =>
          typeof item[filterBy] === 'string' &&
          item[filterBy].toLowerCase().includes(keyword)
      );
    } else {
      results = data;
    }

    setCurrentPage(1);
    setSearchResults(results);
  };

  const handleSearchOpd = (event: { target: { value: any } }) => {
    const keyword = event.target.value.toLowerCase();
    let results = [];

    if (keyword !== '') {
      results = data.filter(
        (item) =>
          item.opd &&
          typeof item.opd.name === 'string' &&
          item.opd.name.toLowerCase().includes(keyword)
      );
    } else {
      results = data;
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
          item.grup &&
          typeof item.grup.name === 'string' &&
          item.grup.name.toLowerCase().includes(keyword)
      );
    } else if (searchResults.length === 0 && keyword === '') {
      results = data;
    } else {
      results = searchResults;
    }

    setCurrentPage(1);
    setSearchResults(results);
  };
  const DescriptionComponent = ({ item }: { item: YourDataType }) => {
    const cleanedDescription = item.deskripsi.replace(/_x000D_/g, '');
    const truncatedDescription = cleanedDescription.substring(0, 150);

    return (
      <div
        className="!my-1 text-base"
        dangerouslySetInnerHTML={{ __html: `${truncatedDescription}...` }}
      />
    );
  };

  const RangeYearsComponent = ({ item }: { item: YourDataType }) => {
    const truncatedText = `${item.range_years} (${item.jumlah_data})`;

    return <span>{truncatedText}</span>;
  };

  const handleFilterChange = (event: { target: { value: any } }) => {
    setSelectedFilter(event.target.value);
  };

  useEffect(() => {
    if (!data || !data.length) return; // Cek apakah data kosong sebelum melakukan pengurutan

    const sortedData = [...data];

    if (selectedFilter === 'Terbaru') {
      sortedData.sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    } else if (selectedFilter === 'Terpopuler') {
      sortedData.sort((a, b) => b.count_view - a.count_view);
    }

    setSearchResults(sortedData);
  }, [selectedFilter, data]);
  const handleClickDataset = (slug: any) => {
    router.push(`/datasets/${slug}`);
  };

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
                onChange={(e) => handleSearch(e, 'judul')}
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
              {searchResults && `${searchResults.length} Datasets Ditemukan`}
            </div>

            <div className="flex flex-row gap-3 text-xs font-bold">
              <span>Urutkan :</span>
              <div>
                <select
                  id="underline_select"
                  className="w-full rounded border-2 border-[#acacac] bg-transparent text-gray-500 focus:border-[#acacac] focus:outline-none focus:ring-0 dark:border-gray-700 dark:text-gray-400"
                  onChange={handleFilterChange} // Mengatur event handler untuk mengubah filter
                  value={selectedFilter} // Memastikan nilai dropdown sesuai dengan selectedFilter
                >
                  <option value="Filter">Filter</option>
                  <option value="Terbaru">Terbaru</option>
                  <option value="Terpopuler">Terpopuler</option>
                </select>
              </div>
            </div>
          </div>
          <div className="border-b-2 pt-2"></div>
          <div className="flex flex-col gap-5 pt-4">
            {itemsToShow && itemsToShow.length === 0 ? (
              <p className="col-span-4 text-center">Data Tidak Ditemukan</p>
            ) : (
              itemsToShow &&
              itemsToShow.map((item) => (
                // eslint-disable-next-line react/jsx-key

                <a
                  key={item.id}
                  className="no-underline decoration-black hover:no-underline"
                  onClick={() => handleClickDataset(item.slug)}
                >
                  <div className="grid grid-cols-5 md:gap-4">
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
                        <DescriptionComponent item={item} />
                      </div>
                      <div className="my-2 flex flex-row gap-5">
                        <div className="flex flex-row gap-2 text-sm">
                          <FiUser className="mt-1" />
                          <span>{item.opd.name || ''}</span>
                        </div>
                        <div className="flex flex-row gap-2 text-sm">
                          <FiGrid className="mt-1" />
                          <span>{item.grup.name || ''}</span>
                        </div>
                        <div className="flex flex-row gap-2 text-sm">
                          <FiCalendar className="mt-1" />
                          <span>
                            <RangeYearsComponent item={item} />
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-row justify-between">
                      <div className="flex flex-row gap-2 text-sm">
                        <FiClock className="mt-1" />
                        <span>{item.date_upload}</span>
                      </div>
                      <div className="flex flex-row gap-2 text-center text-sm">
                        <FiEye className="mt-1" />
                        <span>{item.count_view}</span>
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
                  <option value="8">8</option>
                  <option value="16">16</option>
                  <option value="32">32</option>
                </select>
              </div>
              {data && data.length > 0 && (
                <span>
                  Menampilkan data 1-{Math.min(show, data.length)} dari{' '}
                  {data.length}
                </span>
              )}
            </div>
            <div>{totalPages > 1 && renderPaginationButtons()}</div>
          </div>
        </div>
      </BreadcrumbsWrapper>
    </Main>
  );
};

export default Index;
