import Link from 'next/link';
import { type Key, useState } from 'react';

const MsInd = ({ dataDetail }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  // Fungsi untuk mengubah jumlah data yang ditampilkan per halaman
  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(parseInt(event.target.value));
    setCurrentPage(1); // Kembali ke halaman pertama ketika mengganti jumlah data per halaman
  };

  // Fungsi untuk mengubah halaman
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const totalPageCount = Math.ceil(
    (dataDetail.metadata_indikator.length || 0) / itemsPerPage
  );

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedDataset = dataDetail.metadata_indikator.slice(
    startIndex,
    endIndex
  );

  return (
    <div>
      <div>
        {paginatedDataset.length > 0 ? (
          <>
            <table className="w-full table-auto text-base">
              <thead>
                <tr className="border-b">
                  <th className="border-t px-4 py-2 text-left">
                    Nama Indikator
                  </th>
                  <th className="border-t px-4 py-2 text-left">Ukuran</th>
                </tr>
              </thead>
              <tbody>
                {paginatedDataset.map(
                  (
                    indikator: {
                      slug: any;
                      ukuran: string;
                      definisi: string;
                      nama_indikator: string;
                    },
                    index: Key | null | undefined
                  ) => (
                    <tr key={index} className="border-b">
                      <td className="px-4 py-2">
                        <Link
                          href={`/metadata-indikator/${indikator.slug}`}
                          className="no-underline decoration-black hover:no-underline"
                        >
                          <div className="font-bold">
                            {indikator.nama_indikator
                              .split(' ')
                              .map(
                                (word) =>
                                  word.charAt(0).toUpperCase() + word.slice(1)
                              )
                              .join(' ')}
                          </div>
                          <div> {indikator.definisi || '-'}</div>
                        </Link>
                      </td>
                      <td className="px-4 py-2">{indikator.ukuran || '-'} </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
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
                      pageNumber >= currentPage &&
                      pageNumber <= currentPage + 3;
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
          </>
        ) : (
          <p>Tidak ada metadata indikator.</p>
        )}
      </div>
    </div>
  );
};

export default MsInd;
