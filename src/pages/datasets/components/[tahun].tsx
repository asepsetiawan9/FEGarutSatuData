/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable tailwindcss/no-custom-classname */
import React from 'react';

import BreadcrumbsWrapper from '@/components/Breadcrumbs';
import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

const Tahun = () => {
  return (
    <Main
      meta={<Meta title={`Dataset `} description={`Data terkait Dataset `} />}
    >
      <BreadcrumbsWrapper>
        <div className="px-4">
          <h1 className="mb-2 font-bold">tahun</h1>
        </div>
      </BreadcrumbsWrapper>
    </Main>
  );
};

export default Tahun;
