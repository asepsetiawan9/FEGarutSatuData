import { useRouter } from 'next/router';
import React from 'react';
import {
  FiCalendar,
  FiClock,
  FiEye,
  FiGrid,
  FiSearch,
  FiUser,
} from 'react-icons/fi';

import BreadcrumbsWrapper from '@/components/Breadcrumbs';
import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

import data from './dummy.json';

const opds = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router = useRouter();
  const { slug } = router.query;
  const formattedSlug = slug?.replace(/-/g, ' ');

  const selectedData = data.find((item) => item.slug === slug);
  const jumlahData = selectedData ? selectedData.data.length : 0;

  return (
    <Main
      meta={
        <Meta
          title={`OPD ${selectedData?.judul}`}
          description={`Data terkait opd ${selectedData?.judul}`}
        />
      }
    >
      <BreadcrumbsWrapper>
        <div className="px-4">
          <div className="grid grid-cols-4 gap-3">
            <img
              src={selectedData?.image}
              className="h-[150px] w-full rounded-md object-cover"
              alt={selectedData?.title}
            />
            <div className="col-span-3">
              <h1 className="font-bold">{selectedData?.title}</h1>
              <p className="!my-1.5 text-base">{selectedData?.description}</p>
            </div>
          </div>
          <div className="my-4 grid grid-cols-7 place-content-center gap-3">
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
                type="text"
                id="search"
                className="block w-full rounded-lg border border-[#acacac] bg-gray-50 p-1.5 pl-10 text-sm text-gray-900 focus:outline-[#fa65b1]"
                placeholder="Cari dataset disini...."
              />
            </div>
            <div className="relative col-span-2 w-full">
              <input
                type="text"
                id="search"
                className="block w-full rounded-lg border border-[#acacac] bg-gray-50 p-1.5 pl-3 text-sm text-gray-900 focus:outline-[#fa65b1]"
                placeholder="Pilih OPD"
              />
            </div>
            <div>
              <button
                type="submit"
                className="flex w-full items-center justify-center rounded-md border bg-[#E8AEE2] px-4 py-1.5 text-sm text-white hover:border-primary hover:bg-white hover:text-primary"
              >
                <FiSearch className="mr-1 " />
                <span>Cari</span>
              </button>
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
                  className="peer block w-full appearance-none border-0 border-b-2 border-[#acacac] bg-transparent px-3 py-2  text-gray-500 focus:border-[#acacac] focus:outline-none focus:ring-0 dark:border-gray-700 dark:text-gray-400"
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
          <div className="flex flex-col gap-5 pt-4">
            {selectedData?.data.map((item) => (
              <>
                <div className="grid grid-cols-5 gap-4">
                  <div key={item.id}>
                    <img
                      src={
                        'image' in item && item.image
                          ? item.image
                          : 'https://garutkab.go.id/assets/img/no-image.jpeg'
                      }
                      alt={item.title}
                      className="h-[120px] w-full rounded-md object-cover"
                    />
                  </div>

                  <div className="col-span-3 flex flex-col justify-between">
                    <div>
                      <p className="!my-1 text-base font-bold">{item.title}</p>
                      <p className="!my-1 text-base">{item.description}</p>
                    </div>
                    <div className="my-2 flex flex-row gap-5">
                      <div className="flex flex-row gap-2 text-sm">
                        <FiUser className="mt-1" />
                        <span>{formattedSlug || ' '}</span>
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
              </>
            ))}
          </div>
        </div>
      </BreadcrumbsWrapper>
    </Main>
  );
};

export default opds;
