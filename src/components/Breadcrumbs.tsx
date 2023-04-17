import type { WithRouterProps } from 'next/dist/client/with-router';
import Link from 'next/link';
import { withRouter } from 'next/router';
import { BreadcrumbsProvider } from 'react-breadcrumbs-dynamic';
import { FiHome } from 'react-icons/fi';

type BreadcrumbsProps = WithRouterProps;

function Breadcrumbs({ router }: BreadcrumbsProps) {
  const pathParts = router.pathname
    .split('/')
    .filter((part) => part !== '' && part !== 'Index');
  const breadcrumbItems = pathParts.map((part, index) => {
    const isLastPart = index === pathParts.length - 1;
    const href = `/${pathParts.slice(0, index + 1).join('/')}`;
    const capitalizedPart = part.charAt(0).toUpperCase() + part.slice(1);
    return (
      <div
        key={part}
        className={`breadcrumb-item ${isLastPart ? 'active' : ' '}`}
      >
        <Link href={href}>{capitalizedPart}</Link>
        {index !== pathParts.length - 1 && (
          <>
            {' '}
            <>&nbsp;</>
          </>
        )}
      </div>
    );
  });

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
