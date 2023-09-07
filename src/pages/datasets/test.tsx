import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { FiCalendar, FiClock, FiEye, FiGrid, FiUser } from 'react-icons/fi';

import BreadcrumbsWrapper from '@/components/Breadcrumbs';
import http from '@/helpers/http';
import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

const Index = () => {
  const [selectedData, setSelectedData] = useState<YourDataType[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [allOpd, setAllOpd] = useState<OpdType[]>([]);
  const [allGrup, setAllGrup] = useState<GrupType[]>([]);
  const [selectedOpd, setSelectedOpd] = useState<string>('');
  const [selectedGrup, setSelectedGrup] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedFilter, setSelectedFilter] = useState('Filter');
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
      } catch (error) {
        // console.error(error);
      }
    };

    fetchData();
  }, []);

  if (!selectedData) {
    return <p>Data not available.</p>; // Show message if data is null
  }

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const paginatedDataset = selectedData?.slice(startIndex, endIndex);

  const handleGrupChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedGrup(event.target.value);
  };
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const filteredDataset = paginatedDataset.filter((item) =>
    item.judul.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredByGrup = filteredDataset.filter(
    (item) => selectedGrup === '' || item.grup.name === selectedGrup
  );

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
                // onChange={handleSearchOpd}
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

          <div className="border-b-2 pt-2"></div>
          <div className="flex flex-col gap-5 pt-4">
            {filteredByGrup && filteredByGrup.length === 0 ? (
              <p className="col-span-4 text-center">Data Tidak Ditemukan</p>
            ) : (
              filteredByGrup &&
              filteredByGrup.map((item) => (
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
        </div>
      </BreadcrumbsWrapper>
    </Main>
  );
};

export default Index;
