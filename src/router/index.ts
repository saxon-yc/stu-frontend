import { RouteConfig } from 'react-router-config';

import { ROUTE_TITLE_MAP } from 'constants/routes';
import { loadComponent } from 'utils/route';
import { redirect } from './redirect';

import Container from 'layouts/index';
import Login from 'src/modules/login';

const router: RouteConfig[] = [
  {
    path: '/',
    exact: true,
    component: redirect('/dashboard'),
    meta: {
      title: ROUTE_TITLE_MAP['/dashboard'],
      auth: true,
    },
  },
  {
    path: '/login',
    exact: true,
    component: Login,
    meta: {
      title: ROUTE_TITLE_MAP['/login'],
    },
  },
  {
    component: Container,
    routes: [
      {
        path: '/dashboard',
        exact: true,
        component: loadComponent('dashboard/index.tsx'),
        meta: {
          title: ROUTE_TITLE_MAP['/dashboard'],
          auth: true,
        },
      },
      {
        path: '/class',
        exact: true,
        component: loadComponent('class/index.tsx'),
        meta: {
          title: ROUTE_TITLE_MAP['/class'],
          auth: true,
        },
      },
      {
        path: '/student',
        exact: true,
        component: loadComponent('student/list/index.tsx'),
        meta: {
          title: ROUTE_TITLE_MAP['/student'],
          auth: true,
        },
      },
      {
        path: '/student/:id',
        exact: false,
        component: loadComponent('student/info/index.tsx'),
        meta: {
          title: ROUTE_TITLE_MAP['/student/:id'],
          auth: true,
        },
      },
      {
        path: '/tag',
        exact: true,
        component: loadComponent('tag/index.tsx'),
        meta: {
          title: ROUTE_TITLE_MAP['/tag'],
          auth: true,
        },
      },
      {
        path: '/profile',
        exact: true,
        component: loadComponent('profile/index.tsx'),
        meta: {
          title: ROUTE_TITLE_MAP['/profile'],
          auth: true,
        },
      },
      {
        path: '/notice',
        exact: true,
        component: loadComponent('notice/index.tsx'),
        meta: {
          title: ROUTE_TITLE_MAP['/notice'],
          auth: true,
        },
      },
      {
        path: '/workhandover',
        exact: true,
        component: loadComponent('workhandover/index.tsx'),
        meta: {
          title: ROUTE_TITLE_MAP['/workhandover'],
          auth: true,
        },
      },
      {
        path: '/404',
        name: '404',
        component: loadComponent('404/index.tsx'),
        exact: true,
        meta: {
          title: ROUTE_TITLE_MAP['/404'],
        },
      },
      {
        path: '/*',
        name: '*',
        component: redirect('/404'),
        exact: true,
        meta: {
          title: ROUTE_TITLE_MAP['/404'],
        },
      },
    ],
  },
  {
    path: '/404',
    name: '404',
    component: loadComponent('404/index.tsx'),
    exact: true,
    meta: {
      title: ROUTE_TITLE_MAP['/404'],
    },
  },
  {
    path: '/*',
    name: '*',
    component: redirect('/404'),
    exact: true,
    meta: {
      title: ROUTE_TITLE_MAP['/*'],
    },
  },
];

export default router;
