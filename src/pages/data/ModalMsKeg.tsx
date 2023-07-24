/* eslint-disable tailwindcss/no-custom-classname */
/* eslint-disable no-nested-ternary */
import { FaTimes } from 'react-icons/fa';

const ModalMsKeg = ({ isModalOpen, closeModal, dataDetail }) => {
  return (
    <>
      {isModalOpen && (
        // eslint-disable-next-line tailwindcss/migration-from-tailwind-2
        <div className="fixed inset-0  flex items-center justify-center bg-black bg-opacity-50 text-base">
          <div className="relative block h-full max-h-[60vh] overflow-y-auto rounded bg-white p-4">
            {/* Icon Close */}
            <div className="flex justify-end">
              <button onClick={closeModal} className="text-gray-500">
                <FaTimes />
              </button>
            </div>
            {/* Modal content goes here */}
            <h2 className="mb-4 text-xl font-bold">Metadata Kegiatan</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-1 font-semibold">
                Judul :{' '}
                <span className="font-normal"> {dataDetail.ms_keg.judul}</span>
              </div>
              <div className="col-span-1 font-semibold">
                Tahun :{' '}
                <span className="font-normal"> {dataDetail.ms_keg.tahun}</span>
              </div>
              <div className="col-span-1 font-semibold">
                Cara Pengumpulan Data :{' '}
                <span className="font-normal">
                  {dataDetail?.ms_keg.cara_pengumpulan === 1
                    ? 'Pencacahan Lengkap'
                    : dataDetail?.ms_keg.cara_pengumpulan === 2
                    ? 'Survei'
                    : dataDetail?.ms_keg.cara_pengumpulan === 3
                    ? 'Kompilasi Produk Administrasi'
                    : dataDetail?.ms_keg.cara_pengumpulan === 4
                    ? 'Cara lain sesuai dengan perkembangan TI'
                    : ''}
                </span>
              </div>
              <div className="col-span-1 font-semibold">
                Sektor :{' '}
                <span className="font-normal">
                  {dataDetail?.ms_keg.sektor === 1
                    ? 'Pertanian dan Perikanan'
                    : dataDetail?.ms_keg.sektor === 2
                    ? 'Demografi dan Kependudukan'
                    : dataDetail?.ms_keg.sektor === 3
                    ? 'Pembangunan'
                    : dataDetail?.ms_keg.sektor === 4
                    ? 'Proyeksi Ekonomi'
                    : dataDetail?.ms_keg.sektor === 5
                    ? 'Pendidikan dan Pelatihan'
                    : dataDetail?.ms_keg.sektor === 6
                    ? 'Lingkungan'
                    : dataDetail?.ms_keg.sektor === 7
                    ? 'Globalisasi'
                    : dataDetail?.ms_keg.sektor === 8
                    ? 'Kesehatan'
                    : dataDetail?.ms_keg.sektor === 9
                    ? 'Industri dan Jasa'
                    : dataDetail?.ms_keg.sektor === 10
                    ? 'Teknologi Informasi dan Komunikasi'
                    : dataDetail?.ms_keg.sektor === 11
                    ? 'Perdagangan Internasional dan Neraca Perdagangan'
                    : dataDetail?.ms_keg.sektor === 12
                    ? 'Ketenagakerjaan'
                    : dataDetail?.ms_keg.sektor === 13
                    ? 'Neraca Nasional'
                    : dataDetail?.ms_keg.sektor === 14
                    ? 'Indikator Ekonomi Bulanan'
                    : dataDetail?.ms_keg.sektor === 15
                    ? 'Produktivitas'
                    : dataDetail?.ms_keg.sektor === 16
                    ? 'Harga dan Paritas Daya Beli'
                    : dataDetail?.ms_keg.sektor === 17
                    ? 'Sektor Publik, Perpajakan, dan Regulasi Pasar'
                    : dataDetail?.ms_keg.sektor === 18
                    ? 'Perwilayahan dan Perkotaan'
                    : dataDetail?.ms_keg.sektor === 19
                    ? 'Ilmu Pengetahuan dan Hak Paten'
                    : dataDetail?.ms_keg.sektor === 20
                    ? 'Perlindungan Sosial dan Kesejahteraan'
                    : dataDetail?.ms_keg.sektor === 21
                    ? 'Transportasi'
                    : dataDetail?.ms_keg.sektor === 22
                    ? 'Keuangan'
                    : ''}
                </span>
              </div>
              <hr />
              <hr />
            </div>
            <h2 className="mb-4 pt-3 text-xl font-bold">Penyelenggara</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="font-semibold">Instansi Penyelenggara :</div>
                <div className="font-normal">
                  {dataDetail?.new_dataset?.opd?.name}
                </div>
              </div>
              <div>
                <div className="font-semibold">
                  Alamat Lengkap Instansi Penyelenggara :
                </div>
                <div className="font-normal">
                  {dataDetail?.new_dataset?.opd?.alamat}
                </div>
              </div>
              <div>
                <div className="font-semibold">Telpon :</div>
                <div className="font-normal">
                  {dataDetail?.new_dataset?.opd?.telpon}
                </div>
              </div>
              <div>
                <div className="font-semibold">Faksimile :</div>
                <div className="font-normal">
                  {dataDetail?.new_dataset?.opd?.fax}
                </div>
              </div>
              <div>
                <div className="font-semibold">Email :</div>
                <div className="font-normal">
                  {dataDetail?.new_dataset?.opd?.email}
                </div>
              </div>
            </div>
            <hr />
            <h2 className="mb-4 pt-3 text-xl font-bold">Penanggung Jawab</h2>
            <div className="font-semibold">Unit Eselon Penanggung Jawab:</div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="font-semibold">Eslon 1:</div>
                <div className="font-normal">
                  {dataDetail?.ms_keg?.pj_eslon1}
                </div>
              </div>
              <div>
                <div className="font-semibold">Eslon 2:</div>
                <div className="font-normal">
                  {dataDetail?.ms_keg?.pj_eslon2}
                </div>
              </div>
              <div className="font-semibold">
                Penanggung Jawab Teknis (setingkat Eselon 3):
              </div>
              <div></div>
              <div>
                <div className="font-semibold">Nama:</div>
                <div className="font-normal">
                  {dataDetail?.ms_keg?.pjt_e3_name}
                </div>
              </div>
              <div>
                <div className="font-semibold">Jabatan:</div>
                <div className="font-normal">
                  {dataDetail?.ms_keg?.pjt_e3_jabatan}
                </div>
              </div>
              <div>
                <div className="font-semibold">Telpon:</div>
                <div className="font-normal">
                  {dataDetail?.ms_keg?.pjt_e3_telpon}
                </div>
              </div>
              <div>
                <div className="font-semibold">Alamat:</div>
                <div className="font-normal">
                  {dataDetail?.ms_keg?.pjt_e3_alamat}
                </div>
              </div>
              <div>
                <div className="font-semibold">Faksimile:</div>
                <div className="font-normal">
                  {dataDetail?.ms_keg?.pjt_e3_fax}
                </div>
              </div>
              <div>
                <div className="font-semibold">Email:</div>
                <div className="font-normal">
                  {dataDetail?.ms_keg?.pjt_e3_email}
                </div>
              </div>
            </div>
            <hr />
            <h2 className="mb-4 pt-3 text-xl font-bold">Rencana Persiapan</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="font-semibold">Latar Belakang Kegiatan:</div>
                <div className="font-normal">
                  {dataDetail?.ms_keg?.latar_belakang}
                </div>
              </div>
              <div>
                <div className="font-semibold">Tujuan Kegiatan:</div>
                <div className="font-normal">
                  {dataDetail?.ms_keg?.tujuan_kegiatan}
                </div>
              </div>
              <div>
                <div className="font-semibold">Rencana Jadwal Kegiatan:</div>
              </div>
              <div className="col-span-2">
                <table className="table-bordered table w-full border">
                  <thead style={{ backgroundColor: '#E6E6E6' }}>
                    <tr>
                      <th scope="col" className="border p-3"></th>
                      <th scope="col" className="font-weight-bold border p-3">
                        Tanggal Mulai
                      </th>
                      <th scope="col" className="font-weight-bold border p-3">
                        Tanggal Selesai
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Perencanaan */}
                    <tr>
                      <td className="font-weight-bold p-2">A. Perencanaan</td>
                    </tr>
                    <tr>
                      <td className="p-2">Perencanaan Kegiatan</td>
                      <td className="p-2">
                        {dataDetail?.ms_keg?.tgl1_perencanaan || '-'}
                      </td>
                      <td className="p-2">
                        {dataDetail?.ms_keg?.tgl2_perencanaan || '-'}
                      </td>
                    </tr>
                    <tr>
                      <td className="p-2">Desain</td>
                      <td className="p-2">
                        {dataDetail?.ms_keg?.tgl1_desain || '-'}
                      </td>
                      <td className="p-2">
                        {dataDetail?.ms_keg?.tgl2_desain || '-'}
                      </td>
                    </tr>
                    {/* Pengumpulan */}
                    <tr>
                      <td className="font-weight-bold p-2">B. Pengumpulan</td>
                    </tr>
                    <tr>
                      <td className="p-2">Pengumpulan Data</td>
                      <td className="p-2">
                        {dataDetail?.ms_keg?.tgl1_pengumpulan || '-'}
                      </td>
                      <td className="p-2">
                        {dataDetail?.ms_keg?.tgl2_pengumpulan || '-'}
                      </td>
                    </tr>
                    {/* Pemeriksaan */}
                    <tr>
                      <td className="font-weight-bold p-2">C. Pemeriksaan</td>
                    </tr>
                    <tr>
                      <td className="p-2">Pengolahan Data</td>
                      <td className="p-2">
                        {dataDetail?.ms_keg?.tgl1_pengolahan || '-'}
                      </td>
                      <td className="p-2">
                        {dataDetail?.ms_keg?.tgl2_pengolahan || '-'}
                      </td>
                    </tr>
                    {/* Penyebarluasan */}
                    <tr>
                      <td className="font-weight-bold p-2">
                        D. Penyebarluasan
                      </td>
                    </tr>
                    <tr>
                      <td className="p-2">Analisis</td>
                      <td className="p-2">
                        {dataDetail?.ms_keg?.tgl1_analisis || '-'}
                      </td>
                      <td className="p-2">
                        {dataDetail?.ms_keg?.tgl2_analisis || '-'}
                      </td>
                    </tr>
                    <tr>
                      <td className="p-2">Diseminasi Hasil</td>
                      <td className="p-2">
                        {dataDetail?.ms_keg?.tgl1_diseminasi || '-'}
                      </td>
                      <td className="p-2">
                        {dataDetail?.ms_keg?.tgl2_diseminasi || '-'}
                      </td>
                    </tr>
                    <tr>
                      <td className="p-2">Evaluasi</td>
                      <td className="p-2">
                        {dataDetail?.ms_keg?.tgl1_evaluasi || '-'}
                      </td>
                      <td className="p-2">
                        {dataDetail?.ms_keg?.tgl2_evaluasi || '-'}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <hr />
            <h2 className="mb-4 pt-3 text-xl font-bold">Desain Kegiatan</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="font-semibold">Kegiatan Ini Dilakukan:</div>
                <div className="font-normal">
                  {dataDetail?.ms_keg?.berulang}
                </div>
              </div>
              <div>
                <div className="font-semibold">Tipe Pengumpulan Data :</div>
                <div className="font-normal">
                  {dataDetail?.ms_keg?.tipe_pengumpulan}
                </div>
              </div>
              <div>
                <div className="font-semibold">Metode Pengumpulan Data :</div>
                <div className="font-normal">
                  {dataDetail.ms_keg?.mp_wawancara === 0 && (
                    <div>- Wawancara</div>
                  )}
                  {dataDetail.ms_keg?.mp_kuisioner === 0 && (
                    <div>- Mengisi Kuesioner Sendiri</div>
                  )}
                  {dataDetail.ms_keg?.mp_pengamatan === 0 && (
                    <div>- Pengamatan</div>
                  )}
                  {dataDetail.ms_keg?.mp_skunder === 0 && (
                    <div>- Pengumpulan Data Sekunder</div>
                  )}
                  {dataDetail.ms_keg?.mp_lainnya === 0 && <div>- Lainnya</div>}
                </div>
              </div>
              <div>
                <div className="font-semibold">Sarana Pengumpulan Data :</div>
                <div className="font-normal">
                  {dataDetail.ms_keg?.sp_papi === 0 && (
                    <div> - Paper-assisted Personal Interviewing (PAPI) </div>
                  )}
                  {dataDetail.ms_keg?.sp_capi === 0 && (
                    <div>
                      {' '}
                      - Computer-assisted Personal Interviewing (CAPI){' '}
                    </div>
                  )}
                  {dataDetail.ms_keg?.sp_cati === 0 && (
                    <div>
                      {' '}
                      - Computer-assisted Telephones Interviewing (CATI){' '}
                    </div>
                  )}
                  {dataDetail.ms_keg?.sp_cawi === 0 && (
                    <div> - Computer Aided Web Interviewing (CAWI) </div>
                  )}
                  {dataDetail.ms_keg?.sp_mail === 0 && <div> - Mail </div>}
                  {dataDetail.ms_keg?.sp_lainnya === 0 && (
                    <div> - Lainnya </div>
                  )}
                </div>
              </div>
              <div>
                <div className="font-semibold">Unit Pengumpulan Data :</div>
                <div className="font-normal">
                  {dataDetail.ms_keg?.up_individu === 0 && (
                    <div> - Individu </div>
                  )}
                  {dataDetail.ms_keg?.up_rt === 0 && (
                    <div> - Rumah Tangga </div>
                  )}
                  {dataDetail.ms_keg?.up_usaha === 0 && (
                    <div> - Usaha/Perusahaan </div>
                  )}
                  {dataDetail.ms_keg?.up_lainnya === 0 && (
                    <div> - Lainnya </div>
                  )}
                </div>
              </div>
            </div>
            <hr />
            <h2 className="mb-4 pt-3 text-xl font-bold">Desain Sampel</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="font-semibold">Jenis Rancangan Sampel :</div>
                <div className="font-normal">
                  {dataDetail.ms_keg?.jenis_rancangan_sampel === 0
                    ? 'Single Stage/Phase'
                    : 'Multi Stage/Phase'}
                </div>
              </div>
              <div>
                <div className="font-semibold">
                  Metode Pemilihan Sampel Tahap Terakhir :
                </div>
                <div className="font-normal">
                  {dataDetail.ms_keg?.jenis_rancangan_sampel === 0
                    ? 'Sampel Nonprobabilitas'
                    : 'Sampel Probabilitas'}
                </div>
              </div>
              {dataDetail.ms_keg.metode_pemilihan_sampel === 1 ? (
                <div>
                  <div className="font-weight-bold">Metode Probabilitas :</div>
                  {dataDetail.ms_keg.pro_simple === 0 && (
                    <p>- Simple Random Sampling</p>
                  )}
                  {dataDetail.ms_keg.pro_systematic === 0 && (
                    <p>- Systematic Random Sampling</p>
                  )}
                  {dataDetail.ms_keg.pro_stratified === 0 && (
                    <p>- Stratified Random Sampling</p>
                  )}
                  {dataDetail.ms_keg.pro_cluster === 0 && (
                    <p>- Cluster Sampling</p>
                  )}
                  {dataDetail.ms_keg.pro_probabilitas === 0 && (
                    <p>- Probability Proportional to Size Sampling</p>
                  )}
                </div>
              ) : (
                <div>
                  <div className="font-weight-bold">
                    Metode NonProbabilitas :
                  </div>
                  {dataDetail.ms_keg.non_quota === 0 && <p>- Quota Sampling</p>}
                  {dataDetail.ms_keg.non_accidental === 0 && (
                    <p>- Accidental Sampling</p>
                  )}
                  {dataDetail.ms_keg.non_purposive === 0 && (
                    <p>- Purposive Sampling</p>
                  )}
                  {dataDetail.ms_keg.non_snowball === 0 && (
                    <p>- Snowball Sampling</p>
                  )}
                  {dataDetail.ms_keg.non_saturation === 0 && (
                    <p>- Saturation Sampling</p>
                  )}
                </div>
              )}
              <div>
                <div className="font-semibold">Kerangka Sampel :</div>
                <div className="font-normal">
                  {dataDetail.kerangka_sampel === 0
                    ? 'List Frame'
                    : 'Area Frame'}
                </div>
              </div>
              <div>
                <div className="font-semibold">Fraksi Sampel Keseluruhan :</div>
                <div className="font-normal">
                  {dataDetail?.ms_keg?.fraksi_sampel_keseluruhan}
                </div>
              </div>
              <div>
                <div className="font-semibold">
                  Nilai Perkiraan Sampling Error Variabel Utama :
                </div>
                <div className="font-normal">
                  {dataDetail?.ms_keg?.nilai_perkiraan_errorsampling}
                </div>
              </div>
              <div>
                <div className="font-semibold">Unit Sampel :</div>
                <div className="font-normal">
                  {dataDetail?.ms_keg?.unit_sampel}
                </div>
              </div>
              <div>
                <div className="font-semibold">Unit Observasi :</div>
                <div className="font-normal">
                  {dataDetail?.ms_keg?.unit_observasi}
                </div>
              </div>
            </div>
            <hr />
            <h2 className="mb-4 pt-3 text-xl font-bold">Pengumpulan Data</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="font-semibold">
                  Apakah Melakukan Uji Coba (Pilot Survey) ?
                </div>
                <div className="font-normal">
                  {dataDetail.ms_keg?.uji_coba === 0 ? 'Tidak' : 'Ya'}
                </div>
              </div>
              <div>
                <div className="font-semibold">
                  Metode Pemeriksaan Kualitas Pengumpulan Data
                </div>
                <div className="font-normal">
                  {dataDetail.ms_keg?.metode_pemeriksaan === 0 ? 'Tidak' : 'Ya'}
                </div>
              </div>
              <div>
                <div className="font-semibold">
                  Apakah Melakukan Penyesuaian Nonrespon ?
                </div>
                <div className="font-normal">
                  {dataDetail.ms_keg?.penyesuaian_nonrespon === 0
                    ? 'Tidak'
                    : 'Ya'}
                </div>
              </div>
              <div>
                <div className="font-semibold">Petugas Pengumpulan Data :</div>
                <div className="font-normal">
                  {dataDetail.ms_keg?.petugas_pengumpul_data}
                </div>
              </div>
              <div>
                <div className="font-semibold">
                  Persyaratan Pendidikan Terendah Petugas Pengumpulan Data :
                </div>
                <div className="font-normal">
                  {dataDetail.ms_keg?.pendidikan_petugas}
                </div>
              </div>
              <div>
                <div className="font-semibold">Jumlah Petugas :</div>
                <div className="font-normal">
                  <div> Supervisor/penyelia/pengawas : </div>
                  <div>
                    {' '}
                    {dataDetail.ms_keg?.jumlah_supervisor
                      ? dataDetail.ms_keg?.jumlah_supervisor
                      : '0'}{' '}
                    orang{' '}
                  </div>
                </div>
                <div className="font-normal">
                  <div> Supervisor/penyelia/pengawas : </div>
                  <div>
                    {' '}
                    {dataDetail.ms_keg?.jumlah_enumerator
                      ? dataDetail.ms_keg?.jumlah_enumerator
                      : '0'}{' '}
                    orang{' '}
                  </div>
                </div>
              </div>
              <div>
                <div className="font-semibold">
                  Apakah Melakukan Pelatihan Petugas ?
                </div>
                <div className="font-normal">
                  {dataDetail.ms_keg?.melakukan_pelatihan === 0
                    ? 'Tidak'
                    : 'Ya'}
                </div>
              </div>
            </div>
            <hr />
            <h2 className="mb-4 pt-3 text-xl font-bold">
              Pengolahan dan Analisis
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="font-semibold">
                  Supervisor/penyelia/pengawas :
                </div>
                <div className="font-normal">
                  <div> Penyuntingan (Editing) : </div>
                  <div>
                    {' '}
                    {dataDetail.ms_keg?.editing
                      ? dataDetail.ms_keg?.editing
                      : '-'}
                  </div>
                </div>
                <div className="font-normal">
                  <div> Penyandian (Coding) : </div>
                  <div>
                    {' '}
                    {dataDetail.ms_keg?.penyandian
                      ? dataDetail.ms_keg?.penyandian
                      : '-'}
                  </div>
                </div>
                <div className="font-normal">
                  <div> Data Entry : </div>
                  <div>
                    {' '}
                    {dataDetail.ms_keg?.data_entri
                      ? dataDetail.ms_keg?.data_entri
                      : '-'}
                  </div>
                </div>
                <div className="font-normal">
                  <div> Penyahihan (Validasi) : </div>
                  <div>
                    {' '}
                    {dataDetail.ms_keg?.validasi
                      ? dataDetail.ms_keg?.validasi
                      : '-'}
                  </div>
                </div>
              </div>
              <div>
                <div className="font-semibold">Metode Analisis :</div>
                <div className="font-normal">
                  {' '}
                  {dataDetail.ms_keg?.metode_analisisi
                    ? dataDetail.ms_keg?.metode_analisisi
                    : '-'}
                </div>
              </div>
            </div>
            <div>
              <div className="font-weight-bold">Unit Analisis :</div>
              {dataDetail.ms_keg?.ua_individu === 0 && <p>- Individu</p>}
              {dataDetail.ms_keg?.ua_rt === 0 && <p>- Rumah Tangga</p>}
              {dataDetail.ms_keg?.ua_usaha === 0 && <p>- Usaha/Perusahaan</p>}
              {dataDetail.ms_keg?.ua_lainnya === 0 && <p>- Lainnya</p>}

              <div className="font-weight-bold">
                Tingkat Penyajian Hasil Analisis :
              </div>
              {dataDetail.ms_keg?.ha_nasional === 0 && <p>- Nasional</p>}
              {dataDetail.ms_keg?.ha_prov === 0 && <p>- Provinsi</p>}
              {dataDetail.ms_keg?.ha_kab === 0 && <p>- Kabupaten/Kota</p>}
              {dataDetail.ms_keg?.ha_kec === 0 && <p>- Kecamatan</p>}
              {dataDetail.ms_keg?.ha_lainnya === 0 && <p>- Lainnya</p>}
            </div>
            <hr />

            <h2 className="mb-4 pt-3 text-xl font-bold">Diseminasi Hasil</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="font-semibold">Tahapan Pengolahan Data :</div>
                <div className="font-normal">
                  <div> Tercetak (Hardcopy) : </div>
                  <div>
                    {' '}
                    {dataDetail.ms_keg?.tercetak_pengolahan
                      ? dataDetail.ms_keg?.tercetak_pengolahan
                      : '-'}
                  </div>
                </div>
                <div className="font-normal">
                  <div> Digital (Softcopy) : </div>
                  <div>
                    {' '}
                    {dataDetail.ms_keg?.digital_pengolahan
                      ? dataDetail.ms_keg?.digital_pengolahan
                      : '-'}
                  </div>
                </div>
                <div className="font-normal">
                  <div> Data Mikro : </div>
                  <div>
                    {' '}
                    {dataDetail.ms_keg?.data_mikro_pengolahan
                      ? dataDetail.ms_keg?.data_mikro_pengolahan
                      : '-'}
                  </div>
                </div>
              </div>
              <div>
                <div className="font-semibold">Rencana Jadwal Kegiatan:</div>
              </div>
              <div className="col-span-2">
                <table className="table-bordered table w-full border">
                  <thead style={{ backgroundColor: '#E6E6E6' }}>
                    <tr>
                      <th scope="col" className="border p-3"></th>
                      <th scope="col" className="font-weight-bold border p-3">
                        Tanggal Rilis
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Perencanaan */}
                    <tr>
                      <td className="font-weight-bold p-2">D.Penyebarluasan</td>
                    </tr>
                    <tr>
                      <td className="p-2">Tercetak</td>
                      <td className="p-2">
                        {dataDetail?.ms_keg?.tercetak_rilis_keg || '-'}
                      </td>
                    </tr>
                    <tr>
                      <td className="p-2">Digital</td>
                      <td className="p-2">
                        {dataDetail?.ms_keg?.digital_rilis_keg || '-'}
                      </td>
                    </tr>
                    <tr>
                      <td className="p-2">Data Mikro</td>
                      <td className="p-2">
                        {dataDetail?.ms_keg?.data_mikro_rilis_keg || '-'}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                className="mt-3 inline-block rounded-xl border-2 border-[#fa65b1] bg-white px-6  py-2 text-[#fa65b1] transition duration-200 ease-in-out hover:border-white hover:bg-[#fa65b1] hover:text-white"
                onClick={closeModal}
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

export default ModalMsKeg;
