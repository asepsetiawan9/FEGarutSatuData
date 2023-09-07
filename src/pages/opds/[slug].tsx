import parse from 'html-react-parser';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { FaEnvelope, FaGlobe, FaMap, FaPhoneAlt } from 'react-icons/fa';
import { FiCalendar, FiClock, FiEye, FiGrid, FiUser } from 'react-icons/fi';
// eslint-disable-next-line import/no-extraneous-dependencies
import { ColorRing } from 'react-loader-spinner';

import BreadcrumbsWrapper from '@/components/Breadcrumbs';
import http from '@/helpers/http';
import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

type DatasetType = {
  slug: any;
  id: number;
  judul: string;
  deskripsi: string;
  image: string;
  grup_name: string;
  range_years: string;
  jumlah_data: string;
  date_upload: string;
  count_view: number;
};

type OpdDetailType = {
  webiste: string;
  gambar: string;
  name: string;
  desc: string;
  phone: string;
  website: string;
  email: string;
  alamat: string;
  dataset: DatasetType[];
};
type GrupType = string;

const Opds = () => {
  const router = useRouter();
  const { slug } = router.query;

  const [selectedData, setSelectedData] = useState<OpdDetailType | null>(null);
  const [allGrup, setAllGrup] = useState<GrupType[]>([]);
  const [selectedGrup, setSelectedGrup] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await http().get(`/opds/${slug}`);
        const resultData = response.data.data as OpdDetailType;
        const resultGrup = response.data.data.all_grups as GrupType[]; // Adjust the type here
        setSelectedData(resultData);
        setAllGrup(resultGrup);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    };
    if (slug) {
      fetchData();
    }
  }, [slug]);

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
    ); // Show loading indicator
  }

  if (!selectedData) {
    return <p>Data not available.</p>; // Show message if data is null
  }

  const handlePageChange = (pageNumber: React.SetStateAction<number>) => {
    setCurrentPage(pageNumber);
  };

  const handleItemsPerPageChange = (event: { target: { value: string } }) => {
    setItemsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(1);
  };
  const handleGrupChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedGrup(event.target.value);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const filteredDataset = selectedData?.dataset?.filter((item) => {
    const includesSearchQuery = item.judul
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const isGrupMatch = selectedGrup === '' || item.grup_name === selectedGrup;
    return includesSearchQuery && isGrupMatch;
  });

  const totalPageCount = Math.ceil(
    (filteredDataset?.length || 0) / itemsPerPage
  );

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedDataset = filteredDataset?.slice(startIndex, endIndex);

  const jumlahData = filteredDataset ? filteredDataset.length : 0;

  const handleClickDataset = (slugData: any) => {
    router.push(`/datasets/${slugData}`);
  };

  return (
    <Main
      meta={
        <Meta
          title={`OPD ${selectedData?.name}`}
          description={`Data terkait opd ${selectedData?.name}`}
        />
      }
    >
      <BreadcrumbsWrapper>
        <div className="px-4">
          <div className="grid grid-cols-4 gap-3">
            <img
              src={selectedData?.gambar}
              className="h-[150px] w-full rounded-md object-cover"
              alt={selectedData?.name}
            />
            <div className="col-span-3">
              <h1 className="font-bold">{selectedData?.name}</h1>
              <p className="!my-1.5 text-base">{selectedData?.desc}</p>
              <div className="text-sm">
                <div className="flex flex-row">
                  <FaPhoneAlt className="mr-2 mt-1" />
                  <span>No Telpon : {selectedData?.phone || '-'}</span>
                </div>

                <div className="flex flex-row">
                  <FaGlobe className="mr-2 mt-1" />
                  <span>Website : {selectedData?.webiste || '-'}</span>
                </div>
                <div className="flex flex-row">
                  <FaEnvelope className="mr-2 mt-1" />
                  <span>Email : {selectedData?.email || '-'}</span>
                </div>
                <div className="flex flex-row">
                  <FaMap className="mr-2 mt-1" />
                  <span>Alamat : {selectedData?.alamat || '-'}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="my-4 grid grid-cols-7 place-content-center gap-3">
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
                type="text"
                id="search"
                className="block w-full rounded-lg border border-[#acacac] bg-gray-50 p-1.5 pl-10 text-sm text-gray-900 focus:outline-[#fa65b1]"
                placeholder="Cari dataset disini...."
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>
            <div className="relative col-span-2 w-full">
              <select
                id="search"
                className="block w-full rounded-lg border border-[#acacac] bg-gray-50 p-1.5 pl-3 text-sm text-gray-900 focus:outline-[#fa65b1]"
                value={selectedGrup}
                onChange={handleGrupChange}
              >
                <option value="">Pilih Sektoral</option>

                {allGrup.map((grup, index) => (
                  <option key={index} value={grup}>
                    {grup}
                  </option>
                ))}
              </select>
            </div>
            {/* <div>
              <button
                type="submit"
                className="flex w-full items-center justify-center rounded-md border bg-[#E8AEE2] px-4 py-1.5 text-sm text-white hover:border-primary hover:bg-white hover:text-primary"
              >
                <FiSearch className="mr-1 " />
                <span>Cari</span>
              </button>
            </div> */}
          </div>
          <div className="flex flex-row justify-between">
            <div className="text-xs font-bold">
              {jumlahData || 0} Jumlah Dataset Ditemukan
            </div>

            {/* <div className="flex flex-row gap-3 text-xs font-bold">
              <span className="pt-2.5">Urutkan :</span>
              <div>
                <select
                  id="underline_select"
                  className="peer block w-full appearance-none border-0 border-b-2 border-[#acacac] bg-transparent px-3 py-2  text-gray-500 focus:border-[#acacac] focus:outline-none focus:ring-0 dark:border-gray-700 dark:text-gray-400"
                >
                  <option defaultValue={''}>Filter</option>
                  <option value="" selected>
                    Terbaru
                  </option>
                  <option value="">Terpopuler</option>
                </select>
              </div>
            </div> */}
          </div>
          <div className="flex flex-col gap-5 pt-4">
            {paginatedDataset.map((item) => {
              // Membersihkan karakter "_x000D_" dari deskripsi
              const cleanedDeskripsi = item.deskripsi
                .replace(/_x000D_/g, '')
                .replace(/â€‹/g, '')
                .replace(/\u200B/g, '');

              const truncatedDeskripsi =
                cleanedDeskripsi.length > 90
                  ? `${cleanedDeskripsi.substring(0, 90)}...`
                  : cleanedDeskripsi;

              return (
                <>
                  <a
                    key={item.id}
                    className="cursor-pointer p-4 no-underline decoration-black hover:no-underline"
                    onClick={() => handleClickDataset(item.slug)}
                  >
                    <div className="grid grid-cols-5 gap-4" key={item.id}>
                      <div>
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
                          <div className="!my-1 text-base">
                            {parse(truncatedDeskripsi)}
                          </div>
                        </div>
                        <div className="my-2 flex flex-row gap-5">
                          <div className="flex flex-row gap-2 text-sm">
                            <FiUser className="mt-1" />
                            <span>{selectedData.name || ' '}</span>
                          </div>
                          <div className="flex flex-row gap-2 text-sm">
                            <FiGrid className="mt-1" />
                            <span>{item.grup_name}</span>
                          </div>
                          <div className="flex flex-row gap-2 text-sm">
                            <FiCalendar className="mt-1" />
                            <span>
                              {item.range_years} ({item.jumlah_data})
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
                </>
              );
            })}
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

export default Opds;
