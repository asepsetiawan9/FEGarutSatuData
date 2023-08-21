import type { _DeepPartialObject } from 'chart.js/dist/types/utils';
import React, { useState } from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';

type SourceMediaItem = {
  row: string;
  value: string;
  // Add other properties as needed
};
type ComponentGrafikProps = {
  data: SourceMediaItem[]; // Array of objects
};
const ComponentGrafik: React.FC<ComponentGrafikProps> = ({ data }) => {
  const [labelFilter, setLabelFilter] = useState('');
  const [labelFilterB, setLabelFilterB] = useState('index');
  const [labelFilterC, setLabelFilterC] = useState('');
  const [labelFilterD, setLabelFilterD] = useState('');
  const [chartType, setChartType] = useState('Line');
  const [showAxisC, setShowAxisC] = useState(false);
  const [showAxisD, setShowAxisD] = useState(false);

  const dataRow = data.source_media[0].row;
  const dataRowChart = JSON.parse(dataRow);

  const dataForChart = data.source_media[0].value;
  const dataChart = JSON.parse(dataForChart);

  let ChartComponent;

  if (chartType === 'Bar') {
    ChartComponent = Bar;
  } else if (chartType === 'Line') {
    ChartComponent = Line;
  } else {
    ChartComponent = Pie;
  }
  const handleChangeChartType = (event: { target: { value: any } }) => {
    const newChartType = event.target.value;
    setChartType(newChartType);
  };

  const handleChangeAxisA = (event: { target: { value: any } }) => {
    const selectedIndex = event.target.value;
    setLabelFilter(selectedIndex);
  };
  const cleanAndConvertToNumber = (value: string) => {
    if (!value) {
      return undefined;
    }

    if (typeof value !== 'string') {
      return value;
    }

    const cleanedValue = value.replace(/%/g, '').replace(',', '.');
    const numericValue = parseFloat(cleanedValue);
    return Number.isNaN(numericValue) ? undefined : numericValue;
  };
  const handleChangeAxisB = (event: { target: { value: any } }) => {
    const selectedIndex = event.target.value;
    const numericValue = cleanAndConvertToNumber(selectedIndex);
    setLabelFilterB(numericValue !== undefined ? numericValue.toString() : '');
  };

  const handleChangeAxisC = (event: { target: { value: any } }) => {
    const selectedIndex = event.target.value;
    const numericValue = cleanAndConvertToNumber(selectedIndex);
    setLabelFilterC(numericValue !== undefined ? numericValue.toString() : '');
  };

  const handleChangeAxisD = (event: { target: { value: any } }) => {
    const selectedIndex = event.target.value;
    const numericValue = cleanAndConvertToNumber(selectedIndex);
    setLabelFilterD(numericValue !== undefined ? numericValue.toString() : '');
  };

  const handleToggleAxisC = () => {
    setShowAxisC(!showAxisC);
    setLabelFilterC('');
  };

  const handleToggleAxisD = () => {
    setShowAxisD(!showAxisD);
    setLabelFilterD('');
  };
  const labels = dataChart.map((item: { [x: string]: any }) => {
    const key = Object.keys(item)[labelFilter as keyof typeof item];
    return item[key as keyof typeof item];
  });

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i += 1) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const datasetOptions = {
    backgroundColor:
      chartType === 'Pie'
        ? dataChart.map(() => getRandomColor())
        : getRandomColor(),
    borderColor:
      chartType === 'Pie'
        ? dataChart.map(() => getRandomColor())
        : getRandomColor(),
    borderWidth: 1,
  };

  const allDatasets = [labelFilterB, labelFilterC, labelFilterD].map(
    (axisIndex) => {
      const label = dataRowChart[axisIndex];
      return {
        label,
        data: dataChart.map(
          (item: { [s: string]: unknown } | ArrayLike<unknown>) => {
            const values = Object.values(item);
            const value = values[axisIndex];
            return cleanAndConvertToNumber(value);
          }
        ),
        ...datasetOptions,
      };
    }
  );

  const showChart = {
    labels,
    datasets: allDatasets,
  };

  const optionsChart: _DeepPartialObject = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            size: 14,
            weight: 'bold',
          },
        },
      },
      title: {
        display: true,
        text: data.new_dataset.judul,
        font: {
          size: 18,
          weight: 'bold',
        },
      },
    },
    scales: {
      x: {
        ticks: {
          font: {
            size: 12,
          },
        },
      },
      y: {
        ticks: {
          font: {
            size: 12,
          },
          beginAtZero: true,
        },
      },
    },
  };

  return (
    <>
      <h2 className="mb-4 font-bold">Grafik</h2>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="col-span-1 lg:col-span-2">
          <ChartComponent options={optionsChart} data={showChart} />
        </div>
        <div className="rounded border px-5">
          <p>Sesuaikan Tampilan Grafik</p>
          <label
            htmlFor="typechart"
            className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
          >
            Gaya Grafik
          </label>
          <select
            id="typechart"
            onChange={handleChangeChartType}
            className="mb-2 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          >
            <option defaultValue="">--- PILIH ---</option>
            <option value="Bar">Bar Chart</option>
            <option value="Line">Line Chart</option>
            <option value="Pie">Pie Chart</option>
          </select>
          <label
            htmlFor="axisa"
            className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
          >
            Axis A
          </label>
          <select
            id="axisa"
            onChange={handleChangeAxisA}
            className="mb-2 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          >
            <option defaultValue="">--- PILIH ---</option>
            {dataRowChart.map(
              (
                item: string,
                index: string | number | readonly string[] | undefined
              ) => (
                <option key={`${item}_${index}`} value={index}>
                  {item
                    .replace(/_/g, ' ')
                    .replace(/\b\w/g, (match) => match.toUpperCase())}
                </option>
              )
            )}
          </select>
          <label
            htmlFor="axisb"
            className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
          >
            Axis B
          </label>
          <select
            id="axisa"
            onChange={handleChangeAxisB}
            className="mb-2 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          >
            <option defaultValue="">--- PILIH ---</option>
            {dataRowChart.map(
              (
                item: string,
                index: string | number | readonly string[] | undefined
              ) => (
                <option key={`${item}_${index}`} value={index}>
                  {item
                    .replace(/_/g, ' ')
                    .replace(/\b\w/g, (match: string) => match.toUpperCase())}
                </option>
              )
            )}
          </select>
          <button
            onClick={handleToggleAxisC}
            className="mb-2 text-sm font-medium text-blue-500"
          >
            {showAxisC ? 'Axis C' : 'Tampilkan Axis C'}
          </button>{' '}
          <br />
          {showAxisC && (
            <div className="mb-2 flex items-center">
              <select
                id="axisc"
                onChange={handleChangeAxisC}
                className="mb-2 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              >
                <option defaultValue="">--- PILIH ---</option>
                {dataRowChart.map(
                  (
                    item: string,
                    index: string | number | readonly string[] | undefined
                  ) => (
                    <option key={`${item}_${index}`} value={index}>
                      {item
                        .replace(/_/g, ' ')
                        .replace(/\b\w/g, (match) => match.toUpperCase())}
                    </option>
                  )
                )}
              </select>
              <button
                onClick={handleToggleAxisC}
                className="text-sm text-red-500"
              >
                &#10006;
              </button>
            </div>
          )}
          <button
            onClick={handleToggleAxisD}
            className="mb-2 text-sm font-medium text-blue-500"
          >
            {showAxisD ? 'Axis D' : 'Tampilkan Axis D'}
          </button>
          {showAxisD && (
            <div className="mb-2 flex items-center">
              <select
                id="axisd"
                onChange={handleChangeAxisD}
                className="mb-2 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              >
                <option defaultValue="">--- PILIH ---</option>
                {dataRowChart.map(
                  (
                    item: string,
                    index: string | number | readonly string[] | undefined
                  ) => (
                    <option key={`${item}_${index}`} value={index}>
                      {item
                        .replace(/_/g, ' ')
                        .replace(/\b\w/g, (match) => match.toUpperCase())}
                    </option>
                  )
                )}
              </select>
              <button
                onClick={handleToggleAxisD}
                className="text-sm text-red-500"
              >
                &#10006;
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ComponentGrafik;
