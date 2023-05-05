import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';

import { AppConfig } from '@/utils/AppConfig';

import Header from '../components/header/Header';

type IMainProps = {
  meta: ReactNode;
  children: ReactNode;
};

const Main = (props: IMainProps) => {
  const [, setShowMenu] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setShowMenu(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="w-full text-gray-700 antialiased">
      {props.meta}
      <div className="mx-auto">
        <Header />
        <main className="content ms:px-0 w-full pt-[150px] text-xl md:px-24">
          {props.children}
        </main>
        <div className="ms:grid-cols-2 mt-10 grid w-full grid-cols-3 gap-4 bg-[#E9E9E9] p-5 py-10 text-xl sm:mx-3 md:grid-cols-3 md:place-items-center md:px-24">
          <div className="flex flex-col gap-2 self-start text-sm sm:text-center md:text-left">
            <div className="font-bold">Kontak Kami</div>
            <div>Dinas Komunikasi dan Informatika Kabupaten Garut</div>
            <div>
              Jl. Pembangunan No. 181, Kel. Sukagalih Kec. Tarogong Kidul, Garut
              44151
            </div>
            <div>Email : diskominfo@garutkab.go.id</div>
          </div>
          <div className="flex flex-col gap-2 self-start text-sm">
            <div className="font-bold">Garut Satu Data</div>
            <div>Tentang</div>
            <div>Ketentuan Penggunaan</div>
            <div>Kebijakan Privasi</div>
          </div>
          <div className="flex flex-col gap-2 self-start text-sm">
            <div className="font-bold">Link Terkait</div>
            <div>Open Goverment Indonesia</div>
            <div>Satu Data Indonesia</div>
            <div>Provinsi Jawa Barat</div>
            <div>Satu Data Jawa Barat</div>
            <div>Pemerintah Kabupaten Garut</div>
          </div>
        </div>

        <footer className="border-t border-gray-300  py-8 text-center text-sm">
          Copyright © {new Date().getFullYear()} {AppConfig.title}- Dinas
          Komunikasi dan Informatika. All Rights Reserved.
        </footer>
      </div>
    </div>
  );
};

export { Main };
