import 'react-toastify/dist/ReactToastify.css';

import type { GetServerSideProps, GetServerSidePropsContext } from 'next';
import type { Url } from 'next/dist/shared/lib/router/router';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { FiUser } from 'react-icons/fi';
import { ColorRing } from 'react-loader-spinner';

import BreadcrumbsWrapper from '@/components/Breadcrumbs';
import http from '@/helpers/http';
import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

type VisualDetailType = {
  url: Url;
  desc: string;
  opd: any;
  name: any;
};

const Visualisasi = ({ data }: { data: VisualDetailType }) => {
  const [dataDetail] = useState(data);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay (you can replace this with actual data loading)
    setTimeout(() => {
      setIsLoading(false); // Set isLoading to false when data is loaded
    }, 2000); // Simulated 2-second loading delay
  }, []);
  return (
    <Main
      meta={
        <Meta
          title={`Visualisasi ${dataDetail?.name}`}
          description={`Data terkait Visualisasi ${dataDetail?.name}`}
        />
      }
    >
      <BreadcrumbsWrapper>
        <div className="px-4 text-base">
          <Link target="_blank" href={dataDetail?.url}>
            <div className="rounded-md border p-3 shadow-md">
              <h1 className="mb-2 text-xl font-bold sm:text-2xl">
                {dataDetail?.name}
              </h1>
              <div
                dangerouslySetInnerHTML={{ __html: dataDetail.desc || '-' }}
              />
              <div className="flex flex-row gap-1 py-2 align-bottom text-sm">
                <FiUser className="mt-1" />
                <span>{dataDetail.opd ? dataDetail.opd.name : ' - '}</span>
              </div>
            </div>
          </Link>
          {isLoading ? ( // Render loading animation if isLoading is true
            <div className="flex items-center justify-center">
              <ColorRing
                visible={true}
                height={80}
                width={80}
                ariaLabel="blocks-loading"
                colors={['#b8c480', '#B2A3B5', '#F4442E', '#51E5FF', '#429EA6']}
              />
            </div>
          ) : (
            <div className="h-screen w-full rounded-md border p-3 pt-5 shadow-md">
              <iframe
                className="h-full w-full "
                title="Embedded Content"
                src={dataDetail.url}
                allowFullScreen
              ></iframe>
            </div>
          )}
        </div>
      </BreadcrumbsWrapper>
    </Main>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  params,
}: GetServerSidePropsContext) => {
  const { slug } = params as { slug: string };

  const res = await http().get(`visualisasis/${slug}`);

  const { data } = res;

  return {
    props: { data },
  };
};

export default Visualisasi;
