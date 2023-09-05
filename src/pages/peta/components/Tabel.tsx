/* eslint-disable import/no-extraneous-dependencies */
import { useState } from 'react';
import DataTable from 'react-data-table-component';

interface TableData {
  kecamatan: string;
  element: string;
  tahun: string;
  nilai: number;
  satuan: string;
  sumber: string;
  keterangan: string;
}

interface Props {
  data: any;
}

const Tabel = ({ data }: Props) => {
  const [searchTerm, setSearchTerm] = useState('');

  const tableData: TableData[] = data[0]?.peta_values.map(
    (feature: {
      keterangan: string;
      nilai: number;
      kec_name: string;
      judul: string;
    }) => ({
      kecamatan: feature.kec_name,
      keterangan: feature.keterangan,
      sumber: data[0].opd.name,
      element: data[0].judul,
      tahun: data[0].tahun,
      nilai: feature.nilai,
    })
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredData = tableData.filter((row) => {
    return Object.values(row)
      .join(' ')
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
  });

  const columns = [
    { name: 'Kecamatan', selector: (row: TableData) => row.kecamatan },
    { name: 'Element', selector: (row: TableData) => row.element },
    { name: 'Tahun', selector: (row: TableData) => row.tahun },
    { name: 'Nilai', selector: (row: TableData) => row.nilai },
    { name: 'Sumber', selector: (row: TableData) => row.sumber },
    { name: 'Keterangan', selector: (row: TableData) => row.keterangan },
  ];

  return (
    <div className="mt-4">
      <div className="flex flex-col justify-center">
        <div className="flex flex-row justify-between">
          <div>{data.judul || 'Data Tabel'}</div>
          <div className="flex gap-2 text-sm">
            <span className="pt-1">Search :</span>
            <input
              className="rounded-md border px-2 py-1.5 hover:border-primary focus:outline-primary"
              type="text"
              value={searchTerm}
              onChange={handleChange}
            />
          </div>
        </div>
        <DataTable
          pagination
          responsive
          columns={columns}
          data={filteredData}
          highlightOnHover
          customStyles={{
            table: {
              style: {
                backgroundColor: '#F7FAFC',
              },
            },
            rows: {
              style: {
                hover: 'rgba(0,0,0,.08)',
                minHeight: '72px',
              },
            },
            headRow: {
              style: {
                backgroundColor: '#EDF2F7',
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default Tabel;
