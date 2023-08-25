import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb } from 'antd';
import { ROUTE_TITLE_MAP } from 'constants/index';

export default function MyBreadcrumb(props: any): JSX.Element {
  const { location = {} } = props;

  const breadcrumbNameMap = ROUTE_TITLE_MAP;

  const pathSnippets = location.pathname.split('/').filter((i: string) => i);
  const getBreadcrumItems = () =>
    pathSnippets.map((_: string, index: number) => {
      const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
      return {
        key: url,
        title: <Link to={url}>{breadcrumbNameMap[url]}</Link>,
      };
    });

  useEffect(() => {
    breadcrumbNameMap[location.pathname] = document.title;
    setBreadcrumbItems(getBreadcrumItems());
  }, [location.pathname]);
  const [breadcrumbItems, setBreadcrumbItems] = useState(getBreadcrumItems());

  return <Breadcrumb style={{ marginBottom: '20px' }} items={breadcrumbItems} />;
}
