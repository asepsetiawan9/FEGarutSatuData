// eslint-disable-next-line import/no-extraneous-dependencies
import 'react-responsive-carousel/lib/styles/carousel.min.css';

import { useEffect, useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Carousel } from 'react-responsive-carousel';

import Artikel from '@/components/home/Artikel';
import Counter from '@/components/home/Counter';
import Demografi from '@/components/home/Demografi';
import Slide from '@/components/home/Slide';

import http from '../../helpers/http';

export default function Home() {
  const [data, setData] = useState(null);
  const [highlight, setHighlight] = useState(null);
  const [sliderData, setSliderData] = useState(null);
  const [bannerData, setBannerData] = useState<{ gambar: string }[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await http().get('/count');
        setData(response.data);
      } catch (error) {
        // console.error(error);
      }
    };

    const fetchHighlight = async () => {
      try {
        const response = await http().get('/highlight');
        setHighlight(response.data.data);
      } catch (error) {
        // console.error(error);
      }
    };

    const fetchSliderData = async () => {
      try {
        const response = await http().get('/slider');
        setSliderData(response.data.data);
      } catch (error) {
        // console.error(error);
      }
    };
    const fetchBannerData = async () => {
      try {
        const response = await http().get('/banners');
        setBannerData(response.data.data);
      } catch (error) {
        // console.error(error);
      }
    };

    fetchData();
    fetchHighlight();
    fetchSliderData();
    fetchBannerData();
  }, []);

  if (data === null || highlight === null || sliderData === null) {
    return null;
  }

  return (
    <>
      <div>
        {bannerData?.length > 0 && (
          <Carousel
            autoPlay
            interval={3000}
            infiniteLoop
            showThumbs={false}
            showArrows={false}
            showStatus={false}
            showIndicators={false}
          >
            {bannerData.map((banner, index) => (
              <div key={index}>
                <img
                  src={banner.gambar}
                  alt={`Banner ${index}`}
                  className="h-auto w-full"
                />
              </div>
            ))}
          </Carousel>
        )}
      </div>
      <div className="flex flex-col justify-between sm:flex-row">
        <Slide sliderData={sliderData} />
      </div>
      <Artikel highlight={highlight} />
      <div className="mt-5 sm:py-4">
        <Counter data={data} />
      </div>
      <div className="flex flex-col py-10 sm:flex-row">
        <Demografi />
      </div>
    </>
  );
}
