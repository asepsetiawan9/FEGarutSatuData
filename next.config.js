/* eslint-disable import/no-extraneous-dependencies */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  eslint: {
    dirs: ['.'],
  },
  poweredByHeader: false,
  trailingSlash: true,
  basePath: '',
  // The starter code load resources from `public` folder with `router.basePath` in React components.
  // So, the source code is "basePath-ready".
  // You can remove `basePath` if you don't need it.
  reactStrictMode: true,
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['127.0.0.1'],
  },
  async rewrites() {
    return [
      {
        source: '/peta', // mau diganti jadi apa ?
        destination: '/peta/Index', // path lama ?
      },
      {
        source: '/peta/pembanding', // mau diganti jadi apa ?
        destination: '/peta/Pembanding', // path lama ?
      },
      {
        source: '/grupdata', // mau diganti jadi apa ?
        destination: '/grupdata/Index', // path lama ?
      },
      {
        source: '/opds', // mau diganti jadi apa ?
        destination: '/opds/Index', // path lama ?
      },
      {
        source: '/infografik', // mau diganti jadi apa ?
        destination: '/infografik/Index', // path lama ?
      },
      {
        source: '/videografik', // mau diganti jadi apa ?
        destination: '/videografik/Index', // path lama ?
      },
      {
        source: '/datasets', // mau diganti jadi apa ?
        destination: '/datasets/Index', // path lama ?
      },
      {
        source: '/datasets', // mau diganti jadi apa ?
        destination: '/datasets/Index', // path lama ?
      },
      {
        source: '/metadata-kegiatan', // mau diganti jadi apa ?
        destination: '/metadata-kegiatan/Index', // path lama ?
      },
      {
        source: '/metadata-variabel', // mau diganti jadi apa ?
        destination: '/metadata-variabel/Index', // path lama ?
      },
      {
        source: '/metadata-indikator', // mau diganti jadi apa ?
        destination: '/metadata-indikator/Index', // path lama ?
      },
      {
        source: '/visualisasi', // mau diganti jadi apa ?
        destination: '/visualisasi/Index', // path lama ?
      },
      // {
      //   source: '/datasets/:slug',
      //   destination: '/datasets/[slug]',
      // },
      // {
      //   source: '/datasets/:slug/:DataSlug', // Pola dinamis untuk DataSlug
      //   destination: '/datasets/[slug]/[DataSlug]', // Nama file yang sesuai
      // },
    ];
  },
  // async redirects() {
  //   return [
  //     {
  //       source: '/dashboard', // jika ada yang akses ini
  //       destination: '/', // lempar kesini
  //       permanent: true,
  //     },
  //   ];
  // },
  // images: {
  //   domains: ['res.cloudinary.com'],
  // },
};

module.exports = nextConfig;
