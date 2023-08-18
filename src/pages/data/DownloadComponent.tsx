import JsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import dynamic from 'next/dynamic';
import { BsFiletypeJson } from 'react-icons/bs';
import { FaFileCsv, FaFilePdf } from 'react-icons/fa';
import { VscJson } from 'react-icons/vsc';

interface YourDataType {
  nama: string;
  id: number;
  name: string;
  slug: string;
  // Add more properties as needed
}

interface DownloadComponentProps {
  dataDetail: YourDataType;
  filteredData: YourDataType[];
  rowTabel: string[];
}

const DownloadComponent: React.FC<DownloadComponentProps> = ({
  dataDetail,
  filteredData,
  rowTabel,
}) => {
  const UrlBackEnd = 'http://127.0.0.1:8000/api';

  const DynamicCSVLink = dynamic(
    () => import('react-csv').then((module) => module.CSVLink),
    {
      ssr: false,
    }
  );

  const DownloadCSV = ({ data, filename }) => {
    const headers = Object.keys(data[0]);
    const csvContent = `${headers.join(',')}\n${data
      .map((row) => headers.map((header) => row[header]).join(','))
      .join('\n')}`;

    return (
      <DynamicCSVLink data={csvContent} filename={filename}>
        <FaFileCsv className="text-2xl text-green-400" />
      </DynamicCSVLink>
    );
  };
  const handlePDFDownload = () => {
    const doc = new JsPDF({
      orientation: 'landscape',
    });
    doc.text(dataDetail.name || 'Data Tabel', 14, 20);
    autoTable(doc, {
      head: [rowTabel],
      body: filteredData.map((row) => Object.values(row)),
      startY: 30,
    });
    doc.save(`${dataDetail.name}.pdf`);
  };
  const handleJSONDownload = () => {
    const jsonData = JSON.stringify(filteredData, null, 2);
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${dataDetail.nama}.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleOpenJSONData = () => {
    if (dataDetail.slug) {
      const apiUrl = `${UrlBackEnd}/data-value/${dataDetail.slug}`;
      window.open(apiUrl, '_blank');
    } else {
      // console.error('Invalid slug.');
    }
  };

  return (
    <>
      <div className="flex flex-row gap-3">
        <div className="mt-1.5">Unduh Data:</div>
        <div className="flex flex-row gap-3">
          {/* CSV Download */}

          <div className="flex h-8 w-8 cursor-pointer items-center justify-center rounded border hover:bg-gray-200">
            {typeof window !== 'undefined' && (
              <DownloadCSV
                data={filteredData}
                filename={`${dataDetail.nama}.csv`}
              />
            )}
          </div>
          {/* PDF Download */}
          <div
            onClick={handlePDFDownload}
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded border hover:bg-gray-200"
          >
            <FaFilePdf className="text-2xl text-red-500" />
          </div>

          {/* JSON Download */}
          <div
            onClick={handleJSONDownload}
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded border hover:bg-gray-200"
          >
            <BsFiletypeJson className="text-2xl text-primary" />
          </div>

          {/* Other Download */}
          <div
            onClick={handleOpenJSONData}
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded border hover:bg-gray-200"
          >
            <VscJson className="text-2xl text-[#FFC300]" />
          </div>
        </div>
      </div>
    </>
  );
};

export default DownloadComponent;
