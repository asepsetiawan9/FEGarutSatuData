import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import http from '../../helpers/http';

interface DatasetItem {
  id: number;
  judul: string;
}

interface VisualisasiItem {
  id: number;
  judul: string;
}

interface InfografisItem {
  id: number;
  judul: string;
}

interface GrupItem {
  id: number;
  judul: string;
}

interface SearchResultItem {
  id: number;
  judul: string;
  dataset?: DatasetItem[];
  visualisasi?: VisualisasiItem[];
  infografis?: InfografisItem[];
  grup?: GrupItem[];
}

interface SlideProps {
  sliderData: SliderDataItem[];
}

export default function Slide({ sliderData }: SlideProps) {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResultItem[]>([]);

  const CarouselData = [
    {
      alt: '1',
      image: `${router.basePath}/assets/images/1.png`,
    },
    {
      alt: '2',
      image: `${router.basePath}/assets/images/2.png`,
    },
    {
      alt: '3',
      image: `${router.basePath}/assets/images/3.png`,
    },
    {
      alt: '4',
      image: `${router.basePath}/assets/images/4.png`,
    },
  ];

  const handleNext = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === (sliderData?.length || CarouselData.length) - 1
        ? 0
        : prevIndex + 1
    );
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      handleNext();
    }, 3000);
    return () => clearInterval(intervalId);
  }, [activeIndex]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const fetchData = async (query: string) => {
    try {
      const response = await http().get('/pencarian', {
        params: {
          search: query,
        },
      });
      setSearchResults(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData(searchQuery);
  }, [searchQuery]);

  return (
    <>
      <div className="w-full p-4 md:p-0">
        <div className="text-base font-bold text-[#fa65b1]">
          PORTAL SATU DATA
        </div>
        <div className="text-[38px] font-bold text-[#2a2a2a]">
          Pemerintah Kabupaten Garut
        </div>
        <div className="pb-2 text-sm">
          Oleh Dinas Komunikasi dan Informatika
        </div>
        <div className="relative pt-3">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 pt-2.5">
            <svg
              className="h-4 w-4 text-gray-500"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M9 17a8 8 0 100-16 8 8 0 000 16z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M23 23l-6.65-6.65"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <input
            type="text"
            id="search"
            className="block w-full rounded-lg border border-gray-500 bg-gray-50 p-1.5 pl-10 text-sm text-gray-900 focus:outline-[#fa65b1]"
            placeholder="Cari Data Disini ..."
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>

        <p className="text-sm">
          Satu Data Garut adalah portal terintegrasi untuk pengelolaan,
          keterbukaan, dan kemudahan akses data bagi warga dan pemerintah
          Kabupaten Garut.
        </p>
      </div>
      <div className="relative h-full w-full">
        <div className="relative h-full w-full overflow-hidden">
          <div
            className="flex h-full w-full transition-all duration-500 ease-in-out"
            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          >
            {sliderData && sliderData.length > 0
              ? sliderData.map((item, index) => (
                  <div key={index} className="h-full w-full flex-none pl-3">
                    <Image
                      className="rounded-lg"
                      src={item.gambar}
                      alt={item.judul}
                      width={400}
                      height={200}
                      layout="responsive"
                    />
                  </div>
                ))
              : CarouselData.map((item, index) => (
                  <div key={index} className="h-full w-full flex-none">
                    <Image
                      src={item.image}
                      alt={item.alt}
                      width={400}
                      height={100}
                      layout="responsive"
                    />
                  </div>
                ))}
          </div>
        </div>
      </div>

      {searchResults.length > 0 && (
        <div>
          <h2>Search Results:</h2>
          {searchResults.map((item) => (
            <div key={item.id}>
              <h3>{item.judul}</h3>
              {/* Tampilkan dataset jika ada */}
              {item.dataset && item.dataset.length > 0 && (
                <div>
                  <h4>Dataset:</h4>
                  <ul>
                    {item.dataset.map((datasetItem) => (
                      <li key={datasetItem.id}>{datasetItem.judul}</li>
                    ))}
                  </ul>
                </div>
              )}
              {/* Tampilkan visualisasi jika ada */}
              {item.visualisasi && item.visualisasi.length > 0 && (
                <div>
                  <h4>Visualisasi:</h4>
                  <ul>
                    {item.visualisasi.map((visualisasiItem) => (
                      <li key={visualisasiItem.id}>{visualisasiItem.judul}</li>
                    ))}
                  </ul>
                </div>
              )}
              {/* Tampilkan infografis jika ada */}
              {item.infografis && item.infografis.length > 0 && (
                <div>
                  <h4>Infografis:</h4>
                  <ul>
                    {item.infografis.map((infografisItem) => (
                      <li key={infografisItem.id}>{infografisItem.judul}</li>
                    ))}
                  </ul>
                </div>
              )}
              {/* Tampilkan grup jika ada */}
              {item.grup && item.grup.length > 0 && (
                <div>
                  <h4>Grup:</h4>
                  <ul>
                    {item.grup.map((grupItem) => (
                      <li key={grupItem.id}>{grupItem.judul}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </>
  );
}
