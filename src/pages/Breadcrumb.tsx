import { createContext, useState } from 'react';

export const BreadcrumbContext = createContext();

export const BreadcrumbProvider = ({ children }) => {
  const [breadcrumbs, setBreadcrumbs] = useState([]);

  const addBreadcrumb = (breadcrumb) => {
    setBreadcrumbs((prevBreadcrumbs) => [...prevBreadcrumbs, breadcrumb]);
  };

  const removeBreadcrumb = () => {
    setBreadcrumbs((prevBreadcrumbs) => prevBreadcrumbs.slice(0, -1));
  };

  return (
    <BreadcrumbContext.Provider
      value={{ breadcrumbs, addBreadcrumb, removeBreadcrumb }}
    >
      {children}
    </BreadcrumbContext.Provider>
  );
};
