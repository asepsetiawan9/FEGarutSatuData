import type { WithRouterProps } from 'next/dist/client/with-router';
import Link from 'next/link';
import { withRouter } from 'next/router';
import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { BreadcrumbsProvider } from 'react-breadcrumbs-dynamic';
import { FiHome } from 'react-icons/fi';

type BreadcrumbsProps = WithRouterProps;

function Breadcrumbs({ router }: BreadcrumbsProps) {
  const folderName = router.pathname.split('/')[1];
  const breadcrumbItems = [];
  breadcrumbItems.push(
    <div key={folderName} className="breadcrumb-item hover:no-underline">
      {folderName && (
        <Link href={`/${folderName}`}>
          {folderName.charAt(0).toUpperCase() + folderName.slice(1)} <>&nbsp;</>
        </Link>
      )}
    </div>
  );
  const { slug } = router.query;

  if (slug) {
    const formattedSlug = slug.toString().replace(/-/g, ' ');
    breadcrumbItems.push(
      <div key="slug" className="breadcrumb-item hover:no-underline">
        <span>{formattedSlug}</span>
      </div>
    );
  }

  return (
    <nav aria-label="breadcrumb bg-black">
      <div className="breadcrumb flex flex-row">
        <div className="breadcrumb-item pt-1.5">
          <Link href="/">
            <FiHome />
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
