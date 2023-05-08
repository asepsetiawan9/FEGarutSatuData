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
