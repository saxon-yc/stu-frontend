import React from 'react';
import { useHistory } from 'react-router';
import { renderRoutes, RouteConfig } from 'react-router-config';
import { isEmpty, get } from 'lodash';

import { useUserInfo } from 'hooks/use-userinfo';

const getTargetRoute = (routes: RouteConfig[] | Iobject[], pathname: string): Iobject => {
  const target = get(
    routes.filter((route: Iobject) => {
      if (route.path === pathname) {
        return true;
      }
      return route.path.includes('/:')
        ? pathname.includes(route.path.slice(0, route.path.indexOf('/:')))
        : false;
    }),
    '[0]',
    {},
  );
  if (!isEmpty(target)) {
    return target;
  }

  const childRoute = routes.filter(
    (r: RouteConfig | Iobject) => pathname.includes(r.path) && !isEmpty(r.routes),
  );

  if (!isEmpty(childRoute)) {
    return getTargetRoute(childRoute[0].routes, pathname);
  }

  return {};
};

interface Props {
  route: Iobject;
  location: Iobject;
}

export default function RouteAuth({ route, location = {} }: Props): JSX.Element {
  const { routes } = route;
  const { pathname } = location;

  const history = useHistory();
  const targetRoute = getTargetRoute(routes, pathname);
  if (isEmpty(targetRoute)) {
    history.replace('/404');
  }

  const { isLogined } = useUserInfo();
  const { title = '', auth = false } = get(targetRoute, 'meta', {});
  document.title = title;

  if (auth && !isLogined) {
    history.replace('/login');
  }

  if (isLogined && ['/login', '/regist'].includes(pathname)) {
    history.replace('/');
  }

  return renderRoutes(routes);
}
