import { Redirect, useRouteMatch } from 'react-router';
import React from 'react';

export const redirect = (to: string) => () => {
  const { url, path } = useRouteMatch();

  return <Redirect to={to.replace(path, url)} />;
};
