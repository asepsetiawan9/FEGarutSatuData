/* eslint-disable tailwindcss/no-custom-classname */
/* eslint-disable no-nested-ternary */
import { FaTimes } from 'react-icons/fa';

const ModalMsVar = ({ isModalVarOpen, closeModalVar, dataDetail }) => {
  return (
    <>
      {isModalVarOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 text-base">
          <div className="relative block h-full max-h-[50%] w-[50%] overflow-y-auto rounded bg-white p-4">
            {/* Icon Close */}
            <div className="flex justify-end">
              <button onClick={closeModalVar} className="text-gray-500">
                <FaTimes />
              </button>
            </div>
            {/* Modal content goes here */}
            <h2 className="mb-4 text-xl font-bold">Metadata Variabel</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="font-semibold">Nama Variable :</div>
                <div className="font-normal">
                  {dataDetail.ms_var?.nama_variabel}
                </div>
              </div>
              <div>
                <div className="font-semibold">Alias :</div>
                <div className="font-normal">{dataDetail.ms_var?.alias}</div>
              </div>
              <div>
                <div className="font-semibold">Definisi Variabel :</div>
                <div className="font-normal">{dataDetail.ms_var?.konsep}</div>
              </div>
              <div>
                <div className="font-semibold">Konsep :</div>
                <div className="font-normal">
                  {dataDetail.ms_var?.tipe_data}
                </div>
              </div>
              <div>
                <div className="font-semibold">Referensi Pemilihan :</div>
                <div className="font-normal">{dataDetail.ms_var?.definisi}</div>
              </div>
              <div>
                <div className="font-semibold">Referensi Waktu :</div>
                <div className="font-normal">
                  {dataDetail.ms_var?.referensi_pemilihan}
                </div>
              </div>
              <div>
                <div className="font-semibold">Tipe Data :</div>
                <div className="font-normal">
                  {dataDetail.ms_var?.referensi_waktu}
                </div>
              </div>
              <div>
                <div className="font-semibold">Klasifikasi Isian :</div>
                <div className="font-normal">
                  {dataDetail.ms_var?.kualifikasi_isian}
                </div>
              </div>
              <div>
                <div className="font-semibold">Aturan Validasi :</div>
                <div className="font-normal">
                  {dataDetail.ms_var?.aturan_validasi}
                </div>
              </div>
              <div>
                <div className="font-semibold">Kalimat Pertanyaan :</div>
                <div className="font-normal">
                  {dataDetail.ms_var?.kalimat_pertanyaan}
                </div>
              </div>
              <div>
                <div className="font-semibold">Dapat Diakses Umum?</div>
                <div className="font-normal">
                  {dataDetail.ms_var?.akses_umum === 1 ? 'Ya' : 'Tidak'}
                </div>
              </div>
            </div>

            <div className="mt-4 flex justify-end">
              <button
                className="inline-block rounded-xl border-2 border-[#fa65b1] bg-[#fa65b1] px-4 py-2 text-white transition duration-200 ease-in-out hover:bg-white hover:text-[#fa65b1]"
                onClick={closeModalVar}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalMsVar;
