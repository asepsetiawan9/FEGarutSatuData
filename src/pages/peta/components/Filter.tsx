import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';

interface SumberData {
  id: number;
  sumber: string;
  sumberData: {
    id: number;
    element: string;
    dataTahun: {
      id: number;
      tahun: string;
      data: {
        id: number;
        url: string;
      }[];
    }[];
  }[];
}

interface FilterProps {
  dataFilter: SumberData[];
  onSubmit: (dataMap: any) => void;
}

const Filter = ({ dataFilter, onSubmit }: FilterProps) => {
  const [selectedSumber, setSelectedSumber] = useState('');
  const [selectedElement, setSelectedElement] = useState('');
  const [selectedTahun, setSelectedTahun] = useState('');
  const [sumberData, setSumberData] = useState(dataFilter);
  const [tahunOptions, setTahunOptions] = useState([]);
  const [dataMap, setDataMap] = useState([]);
  const [enable, setEnable] = useState(false);

  const handleSubmit = () => {
    onSubmit(dataMap);
  };

  const handleSumberChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setEnable(false);
    const sumber = event.target.value;
    setSelectedSumber(sumber);
    const sumberObj = dataFilter.filter((data) => data.sumber === sumber)[0];
    setSumberData(sumberObj.sumberData);
    setSelectedElement('');
    setSelectedTahun('');
  };

  const handleElementChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const element = event.target.value;
    setSelectedElement(element);
    const elementObj = sumberData.filter((data) => data.element === element)[0];
    setSelectedTahun('');
    const tahunOptions = generateTahunOptions(elementObj.dataTahun);
    setTahunOptions(tahunOptions);
  };

  const generateTahunOptions = (dataTahun) => {
    const tahunOptions = dataTahun.map((data) => (
      <option key={data.id} value={data.tahun}>
        {data.tahun}
      </option>
    ));
    return tahunOptions;
  };

  const handleTahunChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const tahun = event.target.value;
    setSelectedTahun(tahun);

    const elementObj = sumberData.find(
      (data) => data.element === selectedElement
    );

    const tahunObj = elementObj?.dataTahun.find((data) => data.tahun === tahun);

    if (tahunObj) {
      setDataMap(tahunObj);
      setEnable(true);
    } else {
      setDataMap([]);
    }
  };

  return (
    <div className="flex w-full flex-row gap-3 ">
      <div className="w-full">
        <label
          htmlFor="sources"
          className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-400"
        >
          Sumber
        </label>
        <select
          id="sources"
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary focus:ring-primary dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary dark:focus:ring-primary"
          value={selectedSumber}
          onChange={handleSumberChange}
        >
          <option value="">Pilih Sumber</option>
          {dataFilter.map((sumber) => (
            <option key={sumber.id} value={sumber.sumber}>
              {sumber.sumber}
            </option>
          ))}
        </select>
      </div>
      <div className="w-full">
        <label
          htmlFor="elements"
          className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-400"
        >
          Elemen
        </label>
        <select
          id="elements"
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary focus:ring-primary dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary dark:focus:ring-primary"
          value={selectedElement}
          onChange={handleElementChange}
          disabled={!selectedSumber}
        >
          <option value="">Pilih Elemen</option>
          {sumberData.map((data) => (
            <option key={data.id} value={data.element}>
              {data.element}
            </option>
          ))}
        </select>
      </div>
      <div className="w-full">
        <label
          htmlFor="years"
          className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-400"
        >
          Tahun
        </label>
        <select
          id="years"
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary focus:ring-primary dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary dark:focus:ring-primary"
          value={selectedTahun}
          onChange={handleTahunChange}
          disabled={!selectedElement}
        >
          <option value="">Pilih Tahun</option>
          {sumberData.map((data) => {
            if (data.element === selectedElement) {
              return data.dataTahun.map((tahun) => (
                <option key={tahun.id} value={tahun.tahun}>
                  {tahun.tahun}
                </option>
              ));
            }
            return null;
          })}
        </select>
      </div>
      <div>
        <button
          onClick={handleSubmit}
          type="submit"
          disabled={enable === false}
          className="mt-8 flex w-full items-center justify-center rounded-md border bg-[#E8AEE2] px-4 py-1.5 text-sm text-white hover:border-primary hover:bg-white hover:text-primary"
        >
          <FiSearch className="mr-1 " />
          <span>Cari</span>
        </button>
      </div>
    </div>
  );
};

export default Filter;
