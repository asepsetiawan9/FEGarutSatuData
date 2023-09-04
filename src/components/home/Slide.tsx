/* eslint-disable tailwindcss/migration-from-tailwind-2 */
/* eslint-disable import/extensions */
/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable tailwindcss/no-custom-classname */
/* eslint-disable react/jsx-key */
/* eslint-disable no-nested-ternary */
import Image from 'next/image';
import { useRouter } from 'next/router';
import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';
import { FiGrid, FiPackage, FiUser } from 'react-icons/fi';
import { ColorRing } from 'react-loader-spinner';

import http from '../../helpers/http';
// import { downloadInfographic } from './path/to/downloadInfographic';

interface DatasetItem {
  grup: any;
  opd: any;
  id: number;
  judul: string;
  deskripsi: string;
  slug: string;
}

interface VisualisasiItem {
  slug: any;
  gambar: any;
  id: number;
  name: string;
}

interface InfografisItem {
  desc: ReactNode;
  opd: any;
  grup: any;
  gambar: any;
  slug: any;
  id: number;
  name: string;
}

interface GrupItem {
  slug: any;
  gambar: string | undefined;
  id: number;
  name: string;
}

interface SearchResultItem {
  id: number;
  judul: string;
  dataset?: DatasetItem[];
  visualisasi?: VisualisasiItem[];
  infografis?: InfografisItem[];
  grup?: GrupItem[];
}

interface SliderDataItem {
  id: number;
  judul: string;
  gambar: string;
}

interface SlideProps {
  sliderData: SliderDataItem[];
}

export default function Slide({ sliderData }: SlideProps) {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResultItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [zoomed, setZoomed] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<InfografisItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // const [selectedInfographic, setSelectedInfographic] = useState(null);

  const CarouselData = [
    {
      alt: '1',
      image: `${router.basePath}/assets/images/1.png`,
    },
    {
      alt: '2',
      image: `${router.basePath}/assets/images/2.png`,
    },
    {
      alt: '3',
      image: `${router.basePath}/assets/images/3.png`,
    },
  ];

  const handleNext = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === (sliderData?.length || CarouselData.length) - 1
        ? 0
        : prevIndex + 1
    );
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      handleNext();
    }, 3000);
    return () => clearInterval(intervalId);
  }, [activeIndex]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);

    if (query.trim() === '') {
      setIsModalOpen(false); // Close the modal when search query is empty
    } else {
      setIsModalOpen(true); // Open the modal when performing a search
    }
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  const fetchData = async (query: string) => {
    try {
      setLoading(true);
      const response = await http().get('/pencarian', {
        params: {
          search: query,
        },
      });
      // console.log('API Response:', response);

      if (response.data) {
        if (Array.isArray(response.data)) {
          setSearchResults(response.data);
        } else {
          setSearchResults([response.data]);
        }
      } else {
        setSearchResults([]);
      }

      setLoading(false);
    } catch (error) {
      // console.log('Error:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSearchResults([]);
    } else {
      fetchData(searchQuery);
    }
  }, [searchQuery]);

  // Function to handle the download button click
  const handleDownloadClick = (infografis: InfografisItem) => {
    const link = document.createElement('a');
    link.href = infografis.gambar;
    link.download = infografis.name;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.click();
  };

  const handleLihatClick = (infografis: InfografisItem) => {
    setSelectedItem(infografis);
    setShowModal(true);
  };

  return (
    <>
      <div className="flex flex-col">
        <div className="flex flex-col md:flex-row">
          <div className="w-full p-4 md:w-1/2 md:p-0">
            <div className="text-base font-bold text-[#fa65b1]">
              PORTAL SATU DATA
            </div>
            <div className="text-[38px] font-bold text-[#2a2a2a]">
              Pemerintah Kabupaten Garut
            </div>
            <div className="pb-2 text-sm">
              Oleh Dinas Komunikasi dan Informatika
            </div>
            <div className="relative pt-3">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 pt-2.5">
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
                className="block w-full rounded-lg border border-gray-500 bg-gray-50 p-1.5 pl-10 text-sm text-gray-900 focus:outline-[#fa65b1]"
                placeholder="Cari Data Disini ..."
                value={searchQuery}
                onChange={handleSearch}
              />
            </div>

            <p className="text-sm">
              Satu Data Garut adalah portal terintegrasi untuk pengelolaan,
              keterbukaan, dan kemudahan akses data bagi warga dan pemerintah
              Kabupaten Garut.
            </p>
          </div>
          <div className="relative h-full w-full md:w-1/2">
            <div className="relative h-full w-full overflow-hidden">
              <div
                className="flex h-full w-full transition-all duration-500 ease-in-out"
                style={{ transform: `translateX(-${activeIndex * 100}%)` }}
              >
                {sliderData && sliderData.length > 0
                  ? sliderData.map((item, index) => (
                      <div key={index} className="h-full w-full flex-none pl-3">
                        <Image
                          className="rounded-lg"
                          src={item.gambar}
                          alt={item.judul}
                          width={1000}
                          height={400}
                        />
                      </div>
                    ))
                  : CarouselData.map((item, index) => (
                      <div key={index} className="h-full w-full flex-none">
                        <Image
                          src={item.image}
                          alt={item.alt}
                          width={1000}
                          height={400}
                        />
                      </div>
                    ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid-container pb-5">
          {loading ? (
            <div className="flex min-h-screen items-center justify-center">
              <div className="flex w-full items-center justify-center">
                <div className="absolute inset-x-0 top-0 flex w-full items-center justify-center">
                  <ColorRing
                    visible={true}
                    height={80}
                    width={80}
                    ariaLabel="blocks-loading"
                    colors={[
                      '#b8c480',
                      '#B2A3B5',
                      '#F4442E',
                      '#51E5FF',
                      '#429EA6',
                    ]}
                  />
                </div>
              </div>
            </div>
          ) : (
            // <div className="grid-list px-3">
            //   {searchResults.map((result, index) => (
            //     <div key={index} className="grid-item">
            //       {result.dataset && result.dataset.length > 0 && (
            //         <>
            //           <div className="py-3">
            //             <strong>Dataset:</strong>
            //           </div>
            //           <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
            //             {result.dataset.map((dataset) => (
            //               <a
            //                 key={dataset.id}
            //                 href={`datasets/${dataset.id}`}
            //                 className="no-underline decoration-black hover:no-underline"
            //               >
            //                 <div className="grid grid-cols-4 gap-2 rounded-md shadow-md">
            //                   <div>
            //                     <img
            //                       src="/imgdataset.png"
            //                       alt={dataset.judul}
            //                       className="h-[120px] w-full rounded-md object-cover pl-3"
            //                       style={{ objectFit: 'contain' }}
            //                     />
            //                   </div>
            //                   <div className="col-span-3 flex flex-col justify-between px-3">
            //                     <div>
            //                       <p className="!my-1 text-base font-bold">
            //                         {dataset.judul}
            //                       </p>
            //                     </div>
            //                     <div className="my-2 flex flex-row justify-between gap-5">
            //                       <div className="flex flex-row gap-2 text-sm">
            //                         <FiUser className="mt-1" />
            //                         <span>{dataset.opd?.name || ''}</span>
            //                       </div>
            //                       <div className="flex flex-row gap-2 text-sm">
            //                         <FiGrid className="mt-1" />
            //                         <span>{dataset.grup?.name || ''}</span>
            //                       </div>
            //                     </div>
            //                   </div>
            //                 </div>
            //               </a>
            //             ))}
            //           </div>
            //         </>
            //       )}
            //       {result.grup && result.grup.length > 0 && (
            //         <>
            //           <div className="my-3">
            //             <strong>Grup:</strong>
            //           </div>
            //           <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            //             {result.grup.map((grup) => (
            //               <a
            //                 key={grup.id}
            //                 href={`grup/${grup.slug}`}
            //                 className="no-underline decoration-black hover:no-underline"
            //               >
            //                 <div className="rounded-lg bg-white p-4 shadow-lg ">
            //                   <img
            //                     src={
            //                       grup.gambar
            //                         ? grup.gambar
            //                         : 'https://garutkab.go.id/assets/img/no-image.jpeg'
            //                     }
            //                     alt={grup.name}
            //                     className="mb-4 h-[120px] w-full rounded-md object-contain"
            //                   />
            //                   <div className="text-center">
            //                     <p className="!my-1 text-base font-bold">
            //                       {grup.name}
            //                     </p>
            //                   </div>
            //                 </div>
            //               </a>
            //             ))}
            //           </div>
            //         </>
            //       )}
            //       {result.visualisasi && result.visualisasi.length > 0 && (
            //         <>
            //           <div className="my-3">
            //             <strong>Visualisasi:</strong>
            //           </div>
            //           <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            //             {result.visualisasi.map((visualisasi) => (
            //               <a
            //                 key={visualisasi.id}
            //                 href={`visualisasi/${visualisasi.slug}`}
            //                 className="no-underline decoration-black hover:no-underline"
            //               >
            //                 <div className="rounded-lg bg-white p-4 shadow-lg ">
            //                   <img
            //                     src={
            //                       visualisasi.gambar
            //                         ? visualisasi.gambar
            //                         : 'https://garutkab.go.id/assets/img/no-image.jpeg'
            //                     }
            //                     alt={visualisasi.name}
            //                     className="mb-4 h-[120px] w-full rounded-md object-contain"
            //                   />
            //                   <div className="text-center">
            //                     <p className="!my-1 text-base font-bold">
            //                       {visualisasi.name}
            //                     </p>
            //                   </div>
            //                 </div>
            //               </a>
            //             ))}
            //           </div>
            //         </>
            //       )}

            //       {result.infografis && result.infografis.length > 0 && (
            //         <>
            //           <div className="my-3">
            //             <strong>Infografis:</strong>
            //           </div>
            //           <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
            //             {result.infografis.map((infografis) => (
            //               <div className="grid grid-cols-1 gap-2 rounded-md shadow-md">
            //                 <div key={infografis.id}>
            //                   <img
            //                     alt={infografis.name}
            //                     src={
            //                       infografis.gambar
            //                         ? infografis.gambar
            //                         : 'https://garutkab.go.id/assets/img/no-image.jpeg'
            //                     }
            //                     className=" w-full rounded-md object-cover"
            //                     loading="lazy"
            //                   />
            //                   <p className="!my-1 px-2 py-1 text-center text-base font-bold">
            //                     {infografis.name}
            //                   </p>
            //                   {typeof infografis.desc === 'string' && (
            //                     <div
            //                       className="px-2 text-sm"
            //                       dangerouslySetInnerHTML={{
            //                         __html: infografis.desc,
            //                       }}
            //                     />
            //                   )}
            //                   <div className="flex flex-row gap-1 px-2 py-1 align-bottom text-sm">
            //                     <FiUser className="mt-1 " />
            //                     <span>{}</span>
            //                     {infografis.opd ? (
            //                       <span>{infografis.opd.name}</span>
            //                     ) : (
            //                       <span> - </span>
            //                     )}
            //                   </div>
            //                   <div className="flex flex-row gap-1 px-2 py-1 align-bottom text-sm">
            //                     <FiPackage className="mt-1 " />
            //                     <span>{}</span>
            //                     {infografis.grup ? (
            //                       <span>{infografis.grup.name}</span>
            //                     ) : (
            //                       <span> - </span>
            //                     )}
            //                   </div>
            //                   <div className="flex justify-between px-4 py-2 text-sm">
            //                     <button
            //                       className="flex w-24 items-center justify-center rounded-md bg-[#E8AEE2] px-2 py-1 font-bold text-black"
            //                       onClick={() => handleLihatClick(infografis)}
            //                     >
            //                       <span>Lihat</span>
            //                     </button>
            //                     <button
            //                       className="flex w-24  items-center justify-center rounded-md bg-[#AEE8B4] px-2 py-1 font-bold text-black"
            //                       onClick={() =>
            //                         handleDownloadClick(infografis)
            //                       }
            //                     >
            //                       <span>Download</span>
            //                     </button>
            //                   </div>
            //                 </div>
            //               </div>
            //             ))}
            //             {selectedItem && showModal && (
            //               <div className="fixed inset-0 z-50 bg-black bg-opacity-50">
            //                 <div className="absolute left-1/2 top-1/2 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-md bg-white p-2 text-sm">
            //                   <img
            //                     alt={selectedItem.name}
            //                     src={selectedItem.gambar}
            //                     className={`modal-image${
            //                       zoomed ? ' zoomed' : ''
            //                     } rounded`}
            //                     onClick={() => setZoomed(!zoomed)}
            //                   />
            //                   <div className="py-1 text-center font-bold">
            //                     {selectedItem.name}
            //                   </div>
            //                   <div className="my-1">{selectedItem.desc}</div>
            //                   <div className="pt-2">
            //                     <div className="flex flex-row gap-1 align-bottom text-sm">
            //                       <FiUser className="mt-1 " />
            //                       <span>{}</span>
            //                       {selectedItem.opd ? (
            //                         <span>{selectedItem.opd.name}</span>
            //                       ) : (
            //                         <span> - </span>
            //                       )}
            //                     </div>
            //                   </div>
            //                   <div className="flex flex-row gap-1 align-bottom text-sm">
            //                     <FiPackage className="mt-1 " />
            //                     <span>{}</span>
            //                     {selectedItem.grup ? (
            //                       <span>{selectedItem.name}</span>
            //                     ) : (
            //                       <span> - </span>
            //                     )}
            //                   </div>
            //                   <div className="flex justify-end">
            //                     <button
            //                       className="rounded-md bg-[#AEE8B4] px-2 py-1 font-bold text-black"
            //                       onClick={() => setShowModal(false)}
            //                     >
            //                       Tutup
            //                     </button>
            //                   </div>
            //                 </div>
            //               </div>
            //             )}
            //           </div>
            //         </>
            //       )}
            //     </div>
            //   ))}
            // </div>
            <div>
              {isModalOpen && (
                <div
                  className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 "
                  onClick={closeModal}
                >
                  <div className=" max-h-screen  overflow-y-scroll rounded-md bg-white p-[20px] sm:h-[80%] sm:w-[80%] md:h-[60%] md:w-[60%] lg:h-[80%] lg:w-[80%]">
                    {/* Modal Content */}
                    <div className="grid-list px-3">
                      {searchResults.map((result, index) => (
                        <div key={index} className="grid-item">
                          {result.dataset && result.dataset.length > 0 && (
                            <>
                              <div className="py-3">
                                <strong>Dataset:</strong>
                              </div>
                              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
                                {result.dataset.map((dataset) => (
                                  <a
                                    key={dataset.id}
                                    href={`datasets/${dataset.id}`}
                                    className="no-underline decoration-black hover:no-underline"
                                  >
                                    <div className="grid grid-cols-4 gap-2 rounded-md shadow-md">
                                      <div>
                                        <img
                                          src="/imgdataset.png"
                                          alt={dataset.judul}
                                          className="h-[120px] w-full rounded-md object-cover pl-3"
                                          style={{ objectFit: 'contain' }}
                                        />
                                      </div>
                                      <div className="col-span-3 flex flex-col justify-between px-3">
                                        <div>
                                          <p className="!my-1 text-base font-bold">
                                            {dataset.judul}
                                          </p>
                                        </div>
                                        <div className="my-2 flex flex-row justify-between gap-5">
                                          <div className="flex flex-row gap-2 text-sm">
                                            <FiUser className="mt-1" />
                                            <span>
                                              {dataset.opd?.name || ''}
                                            </span>
                                          </div>
                                          <div className="flex flex-row gap-2 text-sm">
                                            <FiGrid className="mt-1" />
                                            <span>
                                              {dataset.grup?.name || ''}
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </a>
                                ))}
                              </div>
                            </>
                          )}
                          {result.grup && result.grup.length > 0 && (
                            <>
                              <div className="my-3">
                                <strong>Grup:</strong>
                              </div>
                              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                                {result.grup.map((grup) => (
                                  <a
                                    key={grup.id}
                                    href={`grup/${grup.slug}`}
                                    className="no-underline decoration-black hover:no-underline"
                                  >
                                    <div className="rounded-lg bg-white p-4 shadow-lg ">
                                      <img
                                        src={
                                          grup.gambar
                                            ? grup.gambar
                                            : 'https://garutkab.go.id/assets/img/no-image.jpeg'
                                        }
                                        alt={grup.name}
                                        className="mb-4 h-[120px] w-full rounded-md object-contain"
                                      />
                                      <div className="text-center">
                                        <p className="!my-1 text-base font-bold">
                                          {grup.name}
                                        </p>
                                      </div>
                                    </div>
                                  </a>
                                ))}
                              </div>
                            </>
                          )}
                          {result.visualisasi &&
                            result.visualisasi.length > 0 && (
                              <>
                                <div className="my-3">
                                  <strong>Visualisasi:</strong>
                                </div>
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                                  {result.visualisasi.map((visualisasi) => (
                                    <a
                                      key={visualisasi.id}
                                      href={`visualisasi/${visualisasi.slug}`}
                                      className="no-underline decoration-black hover:no-underline"
                                    >
                                      <div className="rounded-lg bg-white p-4 shadow-lg ">
                                        <img
                                          src={
                                            visualisasi.gambar
                                              ? visualisasi.gambar
                                              : 'https://garutkab.go.id/assets/img/no-image.jpeg'
                                          }
                                          alt={visualisasi.name}
                                          className="mb-4 h-[120px] w-full rounded-md object-contain"
                                        />
                                        <div className="text-center">
                                          <p className="!my-1 text-base font-bold">
                                            {visualisasi.name}
                                          </p>
                                        </div>
                                      </div>
                                    </a>
                                  ))}
                                </div>
                              </>
                            )}

                          {result.infografis &&
                            result.infografis.length > 0 && (
                              <>
                                <div className="my-3">
                                  <strong>Infografis:</strong>
                                </div>
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
                                  {result.infografis.map((infografis) => (
                                    <div className="grid grid-cols-1 gap-2 rounded-md shadow-md">
                                      <div key={infografis.id}>
                                        <img
                                          alt={infografis.name}
                                          src={
                                            infografis.gambar
                                              ? infografis.gambar
                                              : 'https://garutkab.go.id/assets/img/no-image.jpeg'
                                          }
                                          className=" w-full rounded-md object-cover"
                                          loading="lazy"
                                        />
                                        <p className="!my-1 px-2 py-1 text-center text-base font-bold">
                                          {infografis.name}
                                        </p>
                                        {typeof infografis.desc ===
                                          'string' && (
                                          <div
                                            className="px-2 text-sm"
                                            dangerouslySetInnerHTML={{
                                              __html: infografis.desc,
                                            }}
                                          />
                                        )}
                                        <div className="flex flex-row gap-1 px-2 py-1 align-bottom text-sm">
                                          <FiUser className="mt-1 " />
                                          <span>{}</span>
                                          {infografis.opd ? (
                                            <span>{infografis.opd.name}</span>
                                          ) : (
                                            <span> - </span>
                                          )}
                                        </div>
                                        <div className="flex flex-row gap-1 px-2 py-1 align-bottom text-sm">
                                          <FiPackage className="mt-1 " />
                                          <span>{}</span>
                                          {infografis.grup ? (
                                            <span>{infografis.grup.name}</span>
                                          ) : (
                                            <span> - </span>
                                          )}
                                        </div>
                                        <div className="flex justify-between px-4 py-2 text-sm">
                                          <button
                                            className="flex w-24 items-center justify-center rounded-md bg-[#E8AEE2] px-2 py-1 font-bold text-black"
                                            onClick={() =>
                                              handleLihatClick(infografis)
                                            }
                                          >
                                            <span>Lihat</span>
                                          </button>
                                          <button
                                            className="flex w-24  items-center justify-center rounded-md bg-[#AEE8B4] px-2 py-1 font-bold text-black"
                                            onClick={() =>
                                              handleDownloadClick(infografis)
                                            }
                                          >
                                            <span>Download</span>
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                  {selectedItem && showModal && (
                                    <div className="fixed inset-0 z-50 bg-black bg-opacity-50">
                                      <div className="absolute left-1/2 top-1/2 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-md bg-white p-2 text-sm">
                                        <img
                                          alt={selectedItem.name}
                                          src={selectedItem.gambar}
                                          className={`modal-image${
                                            zoomed ? ' zoomed' : ''
                                          } rounded`}
                                          onClick={() => setZoomed(!zoomed)}
                                        />
                                        <div className="py-1 text-center font-bold">
                                          {selectedItem.name}
                                        </div>
                                        <div className="my-1">
                                          {selectedItem.desc}
                                        </div>
                                        <div className="pt-2">
                                          <div className="flex flex-row gap-1 align-bottom text-sm">
                                            <FiUser className="mt-1 " />
                                            <span>{}</span>
                                            {selectedItem.opd ? (
                                              <span>
                                                {selectedItem.opd.name}
                                              </span>
                                            ) : (
                                              <span> - </span>
                                            )}
                                          </div>
                                        </div>
                                        <div className="flex flex-row gap-1 align-bottom text-sm">
                                          <FiPackage className="mt-1 " />
                                          <span>{}</span>
                                          {selectedItem.grup ? (
                                            <span>{selectedItem.name}</span>
                                          ) : (
                                            <span> - </span>
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </>
                            )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
