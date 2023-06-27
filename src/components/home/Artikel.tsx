/* eslint-disable no-nested-ternary */
import { useState } from 'react';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';

interface HighlightItem {
  data_terkait: {
    gambar: string;
    name?: string;
    judul?: string;
    created_at: string;
  };
  kategori: string;
}

interface ArtikelProps {
  highlight: HighlightItem[];
}

export default function Artikel({ highlight }: ArtikelProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const dataLength = highlight.length;

  const handlePrev = () => {
    setActiveIndex(
      activeIndex === 0
        ? dataLength - 3
        : activeIndex === 0
        ? dataLength - 2
        : activeIndex - 1
    );
  };

  const handleNext = () => {
    setActiveIndex(
      activeIndex === dataLength - 1
        ? 0
        : activeIndex === dataLength - 2
        ? dataLength - 1
        : activeIndex === dataLength - 3
        ? 0
        : activeIndex + 1
    );
  };

  return (
    <div className="flex flex-col justify-between gap-4 px-4">
      <div className="flex flex-row justify-between">
        <div className="font-bold">Highlight</div>
        <div className="flex gap-2">
          <button
            className="rounded-full bg-gray-500 p-1.5 text-white"
            onClick={handlePrev}
          >
            <FiArrowLeft />
          </button>
          <button
            className="rounded-full bg-gray-500 p-1.5 text-white"
            onClick={handleNext}
          >
            <FiArrowRight />
          </button>
        </div>
      </div>
      <div className="carousel-container overflow-x-auto whitespace-nowrap">
        <div className="carousel-wrapper flex gap-x-3">
          {highlight.slice(activeIndex, activeIndex + 3).map((item, index) => (
            <div key={index} className="flex w-full flex-col gap-1">
              <div className="flex w-full flex-col gap-1">
                <img
                  src={item.data_terkait.gambar}
                  alt={item.data_terkait.name || item.data_terkait.judul}
                  className="h-[180px] max-w-full rounded-md border object-cover"
                />

                <div className="text-base font-bold">
                  {item.data_terkait.name || item.data_terkait.judul}
                </div>
                <div className="flex place-items-center gap-4">
                  <span
                    className={`rounded-md px-3 py-1 text-xs font-bold ${
                      item.kategori === 'blog'
                        ? 'bg-blue-400'
                        : item.kategori === 'infografis'
                        ? 'bg-yellow-400'
                        : 'bg-green-400'
                    }`}
                  >
                    {item.kategori}
                  </span>

                  <span className="text-xs text-[#ACACAC]">
                    {new Date(item.data_terkait.created_at).toLocaleDateString(
                      'id-ID',
                      {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      }
                    )}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Additional code for small devices */}
      <style jsx>{`
        @media (max-width: 640px) {
          .carousel-container {
            overflow-x: scroll;
            -webkit-overflow-scrolling: touch;
            scroll-snap-type: x mandatory;
          }
          .carousel-wrapper {
            scroll-snap-align: center;
            flex-wrap: nowrap;
          }
          .carousel-wrapper > div {
            scroll-snap-stop: always;
            margin-right: 16px;
            flex: 0 0 calc(100% - 16px);
            width: 320px;
          }
        }
      `}</style>
    </div>
  );
}
