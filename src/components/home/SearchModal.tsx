/* eslint-disable react/jsx-key */
import React from 'react';
import { FiGrid, FiPackage, FiUser } from 'react-icons/fi';

const SearchModal = ({ searchResults, onClose }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <div className="grid-container pb-5">
          {loading ? (
            <p>Loading...</p>
          ) : (
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
                                    <span>{dataset.opd.name || ''}</span>
                                  </div>
                                  <div className="flex flex-row gap-2 text-sm">
                                    <FiGrid className="mt-1" />
                                    <span>{dataset.grup.name || ''}</span>
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

                  {result.infografis && result.infografis.length > 0 && (
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
                              {typeof infografis.desc === 'string' && (
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
                                {infografis.opd.name ? (
                                  <span>{infografis.opd.name}</span>
                                ) : (
                                  <span> - </span>
                                )}
                              </div>
                              <div className="flex flex-row gap-1 px-2 py-1 align-bottom text-sm">
                                <FiPackage className="mt-1 " />
                                <span>{}</span>
                                {infografis.grup.name ? (
                                  <span>{infografis.grup.name}</span>
                                ) : (
                                  <span> - </span>
                                )}
                              </div>
                              {/* <div className="flex justify-between px-4 py-2 text-sm">
                                <button
                                  className="flex w-24 items-center justify-center rounded-md bg-[#E8AEE2] px-2 py-1 font-bold text-black"
                                  onClick={() => handlePreviewClick(infografis)}
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
                              </div> */}
                            </div>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
