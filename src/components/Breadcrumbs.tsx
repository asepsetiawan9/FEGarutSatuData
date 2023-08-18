import type { WithRouterProps } from 'next/dist/client/with-router';
import Link from 'next/link';
import { withRouter } from 'next/router';
import React from 'react';
import { BreadcrumbsProvider } from 'react-breadcrumbs-dynamic';
import { FiHome } from 'react-icons/fi';

type BreadcrumbsProps = WithRouterProps;

function Breadcrumbs({ router }: BreadcrumbsProps) {
  const folderName = router.pathname.split('/')[1];
  const breadcrumbItems = [];
  breadcrumbItems.push(
    <div
      key={folderName}
      className="breadcrumb-item text-base hover:no-underline"
    >
      {folderName && (
        <a
          href="#"
          onClick={() => {
            if (folderName === 'data') {
              window.history.back(); // Kembali ke halaman sebelumnya
            } else {
              // Navigasi ke halaman yang sesuai jika bukan "data"
              window.location.href = `/${folderName}`;
            }
          }}
        >
          {folderName
            .replace(/_/g, ' ')
            .split(' ')
            .map(
              (word) =>
                word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
            )
            .join(' ')}{' '}
          <>&nbsp;</>
        </a>
      )}
    </div>
  );

  const { slug } = router.query;

  if (typeof slug === 'string') {
    const slugParts = slug.split('_');
    const yearPart = slugParts.find((part) => part.match(/^\d{4}$/)); // Cari tahun dalam slug

    if (yearPart) {
      const formattedYear = yearPart;
      const formattedSlug = slug
        .replace(`_${yearPart}`, '') // Hapus tahun dari slug
        .replace(/_/g, ' ');

      breadcrumbItems.push(
        <div
          key="slug"
          className="breadcrumb-item text-base hover:no-underline"
        >
          <Link href={`/${folderName}/${slug}`}>
            {formattedSlug} ({formattedYear}) <>&nbsp;</>
          </Link>
        </div>
      );
    }
  }

  return (
    <nav aria-label="breadcrumb bg-black">
      <div className="breadcrumb flex flex-row">
        <div className="breadcrumb-item pt-1">
          <Link href="/">
            <FiHome className="text-base" />
          </Link>
        </div>
        {breadcrumbItems}
      </div>
    </nav>
  );
}

const BreadcrumbsWithRouter = withRouter(Breadcrumbs);

export default function BreadcrumbsWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <BreadcrumbsProvider>
      <div>
        <BreadcrumbsWithRouter />
        {children}
      </div>
    </BreadcrumbsProvider>
  );
}
