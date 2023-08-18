// Grafik.js
import React, { useState } from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';

const ComponentGrafik: React.FC<ComponentGrafikProps> = ({ data }) => {
  // console.log(data);

  const [labelFilter, setLabelFilter] = useState('');
  const [labelFilterB, setLabelFilterB] = useState('index');
  const [labelAtas, setLabelAtas] = useState('');
  const [chartType, setChartType] = useState('Line');
  const [axisBList, setAxisBList] = useState([]);

  const dataRow = data.source_media[0].row;
  const dataRowChart = JSON.parse(dataRow);

  const dataForChart = data.source_media[0].value;
  const dataChart = JSON.parse(dataForChart);

  const handleAddSeries = () => {
    const newAxisBList = [...axisBList, axisBList.length]; // Add a new index to the list
    setAxisBList(newAxisBList);
  };
  const ChartComponent =
    // eslint-disable-next-line no-nested-ternary
    chartType === 'Bar' ? Bar : chartType === 'Line' ? Line : Pie;

  const handleChangeChartType = (event: { target: { value: any } }) => {
    const newChartType = event.target.value;
    setChartType(newChartType);
  };

  const handleChangeAxisA = (event: { target: { value: any } }) => {
    const selectedIndex = event.target.value;
    setLabelFilter(selectedIndex);
  };

  const handleChangeAxisB = (event: { target: { value: any } }) => {
    const selectedIndex = event.target.value;
    setLabelFilterB(selectedIndex);
    setLabelAtas(dataRowChart[selectedIndex]);
  };

  const labels = dataChart.map((item: { [x: string]: any }) => {
    const key = Object.keys(item)[labelFilter as keyof typeof item];
    return item[key];
  });
  // console.log(LabelFilterB);

  // console.log(dataRowChart);
  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < 6; i++) {
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
  const showChart = {
    labels,
    datasets: [
      {
        label: labelAtas,
        data: dataChart.map((item) => Object.values(item)[labelFilterB]),
        ...datasetOptions,
      },
    ],
  };

  const optionsChart = {
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
                index: readonly string[] | React.Key | null | undefined
              ) => (
                <option key={index} value={index}>
                  {item
                    .replace(/_/g, ' ')
                    .replace(/\b\w/g, (match: string) => match.toUpperCase())}
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
                index: readonly string[] | React.Key | null | undefined
              ) => (
                <option key={index} value={index}>
                  {item
                    .replace(/_/g, ' ')
                    .replace(/\b\w/g, (match: string) => match.toUpperCase())}
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
          {axisBList.map((axisBIndex) => (
            <select
              key={axisBIndex}
              id={`axisb-${axisBIndex}`}
              onChange={handleChangeAxisB}
              className="mb-2 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            >
              <option defaultValue="">--- PILIH ---</option>
              {dataRowChart.map(
                (
                  item: string,
                  index: readonly string[] | React.Key | null | undefined
                ) => (
                  <option key={index} value={index}>
                    {item
                      .replace(/_/g, ' ')
                      .replace(/\b\w/g, (match: string) => match.toUpperCase())}
                  </option>
                )
              )}
            </select>
          ))}
          <div className="flex justify-end">
            <button onClick={handleAddSeries}>Tambah Series</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ComponentGrafik;
