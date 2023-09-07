import React, { useEffect, useState } from 'react';
import { FiPackage, FiUser } from 'react-icons/fi';
import { ColorRing } from 'react-loader-spinner';

import BreadcrumbsWrapper from '@/components/Breadcrumbs';
import http from '@/helpers/http';
import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

// eslint-disable-next-line import/no-named-as-default

type VideoDataType = {
  desc: string;
  url: string | undefined;
  title: string;
  grup: any;
  opd: any;
  sektoral: any;
  id: number;
  slug: string;
  path: string;
  created_at: string;
  // desc: string;
};
type GrupType = string;
type OpdType = string;

type DetailDataType = {
  url: string | undefined;
  path: string | undefined;
  desc: string;
  opd: any;
  grup: any;
  title: string;
};
const Index = () => {
  const [data, setData] = useState<VideoDataType[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOpd, setSelectedOpd] = useState('');
  const [selectedGrup, setSelectedGrup] = useState('');
  const [allOpd, setAllOpd] = useState<OpdType[]>([]);
  const [allGrup, setAllGrup] = useState<GrupType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [selectedItem, setSelectedItem] = useState<DetailDataType | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await http().get('/videografis');
        const resultData = response.data.videografis;
        const resultOpd = response.data.opd;
        const resultGrup = response.data.grup;

        setData(resultData);
        setAllOpd(resultOpd.all_opd);
        setAllGrup(resultGrup.all_grup);
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

  const filteredResults = data.filter((item) => {
    // Filter berdasarkan keyword pencarian
    const searchMatch = item.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    // Filter berdasarkan OPD yang dipilih
    const opdMatch =
      selectedOpd === '' || (item.opd && item.opd.name === selectedOpd);

    // Filter berdasarkan Grup/Sektoral yang dipilih
    const grupMatch =
      selectedGrup === '' || (item.grup && item.grup.name === selectedGrup);

    return searchMatch && opdMatch && grupMatch;
  });

  const handleSearchOpd = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOpd(event.target.value);
  };

  const handleSearchGrup = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedGrup(event.target.value);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleLihatClick = (item: DetailDataType) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const handleDownloadClick = (item: {
    url: any;
    id?: number;
    path: string;
    desc?: string;
    title: string;
  }) => {
    const link = document.createElement('a');
    link.download = item.title;
    link.href = item.url;
    link.target = '_blank';
    link.click();
  };

  const totalPageCount = Math.ceil(
    (filteredResults?.length || 0) / itemsPerPage
  );

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedVideografis = filteredResults?.slice(startIndex, endIndex);

  const handlePageChange = (pageNumber: React.SetStateAction<number>) => {
    setCurrentPage(pageNumber);
  };

  const handleItemsPerPageChange = (event: { target: { value: string } }) => {
    setItemsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(1);
  };
  const filteredVideografis = paginatedVideografis?.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
          <h1 className="font-bold">Videografik</h1>
          <p className="!my-1.5 text-base">
            Videografik adalah informasi yang disajikan dalam bentuk video agar
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
            <div className="relative col-span-2 w-full">
              <select
                id="search"
                className="block w-full rounded-lg border border-[#acacac] bg-gray-50 p-1.5 pl-3 text-sm text-gray-900 focus:outline-[#fa65b1]"
                value={selectedGrup}
                onChange={handleSearchGrup}
              >
                <option value="">Pilih Sektoral</option>

                {allGrup.map((grup, index) => (
                  <option key={index} value={grup}>
                    {grup}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="border-b-2 pt-2"></div>
          <div className="grid grid-cols-4 gap-5">
            {filteredVideografis.length === 0 ? (
              <p className="col-span-4 text-center">Data Tidak Ditemukan</p>
            ) : (
              (filteredVideografis.length > 0 ? filteredVideografis : data).map(
                (item) => (
                  <div key={item.id}>
                    <video controls className="w-full rounded-md object-cover">
                      <source src={item.url} type="video/mp4" />
                      Sorry, your browser doesnt support embedded videos.
                    </video>

                    <p className="!my-1 text-center text-base font-bold">
                      {item.title}
                    </p>
                    <p
                      className="!my-1 text-sm"
                      dangerouslySetInnerHTML={{ __html: item.desc }}
                    />
                    <div className="flex flex-row gap-1 py-2 align-bottom text-sm">
                      <FiUser className="mt-1 " />
                      <span>{item.opd ? item.opd.name : ' - '}</span>
                    </div>
                    <div className="flex flex-row gap-1 py-2 align-bottom text-sm">
                      <FiPackage className="mt-1 " />
                      <span>{item.grup ? item.grup.name : ' - '}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <button
                        className="flex w-24 items-center justify-center rounded-md bg-[#E8AEE2] px-2 py-1 font-bold text-black"
                        onClick={() => handleLihatClick(item)}
                      >
                        <span>Lihat</span>
                      </button>

                      {item.url && ( // Conditionally render the button
                        <button
                          className="flex w-24  items-center justify-center rounded-md bg-[#AEE8B4] px-2 py-1 font-bold text-black"
                          onClick={() => handleDownloadClick(item)}
                        >
                          <span>Download</span>
                        </button>
                      )}
                    </div>
                  </div>
                )
              )
            )}
          </div>
        </div>
        <div className="flex justify-between">
          <div className="mt-10 flex flex-row gap-3 text-sm font-bold">
            <div>
              <select
                id="underline_select"
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
          {selectedItem && showModal && (
            // eslint-disable-next-line tailwindcss/migration-from-tailwind-2
            <div className="fixed inset-0 z-50 bg-black bg-opacity-50">
              <div className="absolute left-1/2 top-1/2 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-md bg-white p-2 text-sm">
                <video controls className="w-full rounded-md object-cover">
                  <source src={selectedItem.url} type="video/mp4" />
                  Sorry, your browser doesnt support embedded videos.
                </video>
                <div className="py-1 text-center font-bold">
                  {selectedItem.title}
                </div>
                <div className="my-1">{selectedItem.desc}</div>
                <div className="pt-2">
                  <div className="flex flex-row gap-1 align-bottom text-sm">
                    <FiUser className="mt-1 " />
                    <span>
                      {selectedItem.opd ? selectedItem.opd.name : ' - '}
                    </span>
                  </div>
                </div>
                <div className="flex flex-row gap-1 align-bottom text-sm">
                  <FiPackage className="mt-1 " />
                  <span>
                    {selectedItem.grup ? selectedItem.grup.name : ' - '}
                  </span>
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
