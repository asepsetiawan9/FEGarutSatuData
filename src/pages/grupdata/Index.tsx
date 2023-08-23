import React, { useEffect, useState } from 'react';
import { FiPackage } from 'react-icons/fi';

import BreadcrumbsWrapper from '@/components/Breadcrumbs';
import http from '@/helpers/http';
import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

type GrupDataType = {
  id: number;
  slug: string;
  name: string;
  gambar: string;
  created_at: string;
  dataset_count: number;
  desc: string;
};
const Index = () => {
  const [data, setData] = useState<GrupDataType[]>([]);
  const [searchResults, setSearchResults] = useState<GrupDataType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await http().get('/grups');
        const resultData = response.data.data;
        setData(resultData); // Set searchResults ke data awal dari server
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (event: { target: { value: any } }) => {
    const keyword = event.target.value;
    const results = data.filter((item) =>
      item.name.toLowerCase().includes(keyword.toLowerCase())
    );
    setSearchResults(results);
  };

  const jumlahData =
    searchResults.length > 0 ? searchResults.length : data.length;

  return (
    <Main
      meta={
        <Meta
          title="Grup Data"
          description="Satu Data Garut adalah portal terintegrasi untuk pengelolaan, keterbukaan, dan kemudahan akses data bagi warga dan pemerintah Kabupaten Garut."
        />
      }
    >
      <BreadcrumbsWrapper>
        <div className="px-4">
          <h1 className="font-bold">Grup Data</h1>
          <p className="!my-1.5 text-base">
            Grup Data merupakan pengelompokan dataset berdasarkan topik atau
            kategori.
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
                placeholder="Cari Grup Data ..."
                onChange={handleSearch}
              />
            </div>
          </div>
          <div className="flex flex-row justify-between ">
            <span className="pt-2.5 text-sm font-bold">
              {jumlahData || '0'} Grup Data
            </span>
            {/* <div className="flex flex-row gap-3">
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
            </div> */}
          </div>
          <div className="mb-5 mt-2 w-full border-b border-[#acacac]"></div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-4">
            {(searchResults.length > 0 ? searchResults : data).map(
              (item, index) => (
                <a
                  key={item.id}
                  href={`grupdata/${item.slug}`}
                  className="no-underline decoration-black hover:no-underline"
                >
                  <div>
                    <img
                      src={item.gambar}
                      alt={item.name}
                      className="h-[180px] w-full rounded-md object-cover"
                    />
                    <p className="!my-1 text-base font-bold">{item.name}</p>
                    <p className="!my-1 text-base">{item.desc}</p>
                    <div className="flex flex-row gap-2 py-2 text-base">
                      <FiPackage className="mt-1 " />
                      <span>Jumlah data: {item.dataset_count}</span>
                    </div>
                  </div>
                </a>
              )
            )}
          </div>
        </div>
      </BreadcrumbsWrapper>
    </Main>
  );
};

export default Index;
