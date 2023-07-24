import { FaTimes } from 'react-icons/fa';

interface ModalMsIndProps {
  isModalIndOpen: boolean;
  closeModalInd: () => void;
  dataDetail: YourDataType; // Replace 'YourDataType' with the actual type of dataDetail
}

const ModalMsInd: React.FC<ModalMsIndProps> = ({
  isModalIndOpen,
  closeModalInd,
  dataDetail,
}) => {
  return (
    <>
      {isModalIndOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 text-base">
          <div className="relative block h-full max-h-[50%] w-[50%] overflow-y-auto rounded bg-white p-4">
            {/* Icon Close */}
            <div className="flex justify-end">
              <button onClick={closeModalInd} className="text-gray-500">
                <FaTimes />
              </button>
            </div>
            {/* Modal content goes here */}
            <h2 className="mb-4 text-xl font-bold">Metadata Indikator</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="font-semibold">Nama Indikator :</div>
                <div className="font-normal">
                  {dataDetail.ms_ind?.nama_indikator}
                </div>
              </div>
              <div>
                <div className="font-semibold">Konsep :</div>
                <div className="font-normal">{dataDetail.ms_ind?.konsep}</div>
              </div>
              <div>
                <div className="font-semibold">Definisi :</div>
                <div className="font-normal">{dataDetail.ms_ind?.definisi}</div>
              </div>
              <div>
                <div className="font-semibold">Interpretasi :</div>
                <div className="font-normal">
                  {dataDetail.ms_ind?.interpretasi}
                </div>
              </div>
              <div>
                <div className="font-semibold">Metode/Rumus Penghitungan :</div>
                <div className="font-normal">
                  {dataDetail.ms_ind?.metode_rumus}
                </div>
              </div>
              <div>
                <div className="font-semibold">Ukuran:</div>
                <div className="font-normal">{dataDetail.ms_ind?.ukuran}</div>
              </div>
              <div>
                <div className="font-semibold">Satuan :</div>
                <div className="font-normal">{dataDetail.ms_ind?.satuan}</div>
              </div>
              <div>
                <div className="font-semibold">Klasifikasi Isian :</div>
                <div className="font-normal">
                  {dataDetail.ms_ind?.kualifikasi_isian}
                </div>
              </div>
              <div>
                <div className="font-semibold">Klasifikasi Penyajian :</div>
                <div className="font-normal">
                  {dataDetail.ms_ind?.klasifikasi_penyajian}
                </div>
              </div>

              <div>
                <div className="font-semibold">Indikator Komposit?</div>
                <div className="font-normal">
                  {dataDetail.ms_ind?.komposit === 1 ? 'Ya' : 'Tidak'}
                </div>
              </div>
            </div>
            <hr />
            <div className="py-2 font-bold">Indikator Pembangun</div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="font-semibold">Publikasi Ketersediaan :</div>
                <div className="font-normal">
                  {dataDetail.ms_ind?.ip_publikasi_ketersediaan}
                </div>
              </div>
              <div>
                <div className="font-semibold">Nama :</div>
                <div className="font-normal">{dataDetail.ms_ind?.ip_nama}</div>
              </div>
            </div>
            <hr />
            <div className="py-2 font-bold">Variabel Pembangun</div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="font-semibold">Kegiatan Penghasil :</div>
                <div className="font-normal">
                  {dataDetail.ms_ind?.vp_kegiatan_penghasil}
                </div>
              </div>
              <div>
                <div className="font-semibold">Kode Keg. (diisi petugas) :</div>
                <div className="font-normal">
                  {dataDetail.ms_ind?.vp_kode_keg}
                </div>
              </div>
              <div>
                <div className="font-semibold">Nama :</div>
                <div className="font-normal">{dataDetail.ms_ind?.vp_nama}</div>
              </div>
              <div>
                <div className="font-semibold">Level Estimasi :</div>
                <div className="font-normal">
                  {dataDetail.ms_ind?.level_estimasi}
                </div>
              </div>
              <div>
                <div className="font-semibold">Dapat Diakses Umum?</div>
                <div className="font-normal">
                  {dataDetail.ms_ind?.akses_umum === 1 ? 'Ya' : 'Tidak'}
                </div>
              </div>
            </div>
            <div className="mt-4 flex justify-end">
              <button
                className="inline-block rounded-xl border-2 border-[#fa65b1] bg-[#fa65b1] px-4 py-2 text-white transition duration-200 ease-in-out hover:bg-white hover:text-[#fa65b1]"
                onClick={closeModalInd}
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

export default ModalMsInd;
