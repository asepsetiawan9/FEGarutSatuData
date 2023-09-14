import { useRouter } from 'next/router';
import type { Key, ReactNode } from 'react';
import { useEffect, useState } from 'react';
import { FiCalendar, FiClock, FiEye, FiGrid, FiUser } from 'react-icons/fi';
import { ColorRing } from 'react-loader-spinner';

import BreadcrumbsWrapper from '@/components/Breadcrumbs';
import http from '@/helpers/http';
import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

type DataSetType = {
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
type GrupType = string;
type OpdType = string;
const Index = () => {
  const [selectedData, setSelectedData] = useState<DataSetType[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [allOpd, setAllOpd] = useState<OpdType[]>([]);
  const [allGrup, setAllGrup] = useState<GrupType[]>([]);
  const [selectedOpd, setSelectedOpd] = useState<string>('');
  const [selectedGrup, setSelectedGrup] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortMethod, setSortMethod] = useState('Terbaru');
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await http().get('/datasets');
        const resultOpd = response.data.opd;
        const resultGrup = response.data.grup;
        setSelectedData(response.data.datasets);
        setAllOpd(resultOpd.all_opd);
        setAllGrup(resultGrup.all_grup);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        // console.error(error);
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
  const handleOpdChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOpd(event.target.value);
  };

  const handleGrupChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedGrup(event.target.value);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };
  const sortDatasetByPopularity = (dataset: DataSetType[]) => {
    return dataset.slice().sort((a, b) => {
      const viewCountA = parseInt(a.count_view as string, 10) || 0;
      const viewCountB = parseInt(b.count_view as string, 10) || 0;
      return viewCountB - viewCountA;
    });
  };

  // sort data by date
  const sortDatasetByDate = (dataset: DataSetType[]) => {
    return dataset.slice().sort((a, b) => {
      const dateA = new Date(a.date_upload as string).getTime();
      const dateB = new Date(b.date_upload as string).getTime();
      return dateB - dateA;
    });
  };

  const handleSortMethodChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSortMethod(event.target.value);
  };
  const filteredDataset = selectedData?.filter((item) => {
    const includesSearchQuery = item.judul
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const isGrupMatch = selectedGrup === '' || item.grup.name === selectedGrup;
    const isOpdMatch = selectedOpd === '' || item.opd.name === selectedOpd;

    return includesSearchQuery && isGrupMatch && isOpdMatch;
  });

  // Sort the filtered dataset based on the selected sortMethod
  let sortedDataset = [...filteredDataset];
  if (sortMethod === 'Terpopuler') {
    sortedDataset = sortDatasetByPopularity(sortedDataset);
  } else if (sortMethod === 'Terbaru') {
    sortedDataset = sortDatasetByDate(sortedDataset);
  }

  const totalPageCount = Math.ceil((sortedDataset?.length || 0) / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const paginatedDataset = sortedDataset?.slice(startIndex, endIndex);

  const jumlahData = sortedDataset ? sortedDataset.length : 0;
  const DescriptionComponent = ({ item }: { item: DataSetType }) => {
    const cleanedDescription = item.deskripsi.replace(/_x000D_/g, '');
    const truncatedDescription = cleanedDescription.substring(0, 150);

    return (
      <div
        className="!my-1 text-base"
        dangerouslySetInnerHTML={{ __html: `${truncatedDescription}...` }}
      />
    );
  };

  const RangeYearsComponent = ({ item }: { item: DataSetType }) => {
    const truncatedText = `${item.range_years} (${item.jumlah_data})`;

    return <span>{truncatedText}</span>;
  };

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
                value={searchQuery}
                onChange={handleSearchChange}
                type="text"
                id="search"
                className="block w-full rounded-lg border border-[#acacac] bg-gray-50 p-1.5 pl-10 text-sm text-gray-900 focus:outline-[#fa65b1]"
                placeholder="Cari Dataset...."
              />
            </div>
            <div className="relative col-span-2 w-full">
              <select
                id="search"
                className="block w-full rounded-lg border border-[#acacac] bg-gray-50 p-1.5 pl-3 text-sm text-gray-900 focus:outline-[#fa65b1]"
                value={selectedOpd}
                onChange={handleOpdChange}
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
          </div>
          <div className="flex flex-row justify-between">
            <div className="text-xs font-bold">
              {jumlahData || 0} Jumlah Dataset Ditemukan
            </div>

            <div className="flex flex-row gap-3 text-xs font-bold">
              <span className="pt-2.5">Urutkan :</span>
              <div>
                <select
                  id="underline_select"
                  className="peer block w-full appearance-none border-0 border-b-2 border-[#acacac] bg-transparent px-3 py-2 text-gray-500 focus:border-[#acacac] focus:outline-none focus:ring-0 dark:border-gray-700 dark:text-gray-400"
                  value={sortMethod}
                  onChange={handleSortMethodChange} // Menggunakan handleSortMethodChange sebagai handler onChange
                >
                  <option value="Terbaru">Terbaru</option>
                  <option value="Terpopuler">Terpopuler</option>
                </select>
              </div>
            </div>
          </div>
          <div className="border-b-2 pt-2"></div>
          <div className="flex flex-col gap-5 pt-4">
            {paginatedDataset && paginatedDataset.length === 0 ? (
              <p className="col-span-4 text-center">Data Tidak Ditemukan</p>
            ) : (
              paginatedDataset &&
              paginatedDataset.map((item) => (
                // eslint-disable-next-line react/jsx-key

                <a
                  key={item.id}
                  className="cursor-pointer no-underline decoration-black hover:no-underline"
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
