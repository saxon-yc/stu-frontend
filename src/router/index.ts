import { RouteConfig } from 'react-router-config';

import Container from 'layouts/index';
import Login from 'src/modules/login';
import Profile from 'src/modules/profile';
import NotFound from 'src/modules/404';

const router: RouteConfig[] = [
  {
    path: '/',
    exact: true,
    component: Login,
    meta: {
      title: '登录',
    },
  },
  {
    path: '/login',
    exact: true,
    component: Login,
    meta: {
      title: '登录',
    },
  },
  {
    component: Container,
    routes: [
      {
        path: '/dashboard',
        exact: true,
        component: Profile,
        meta: {
          title: '工作台',
          auth: false,
        },
      },
      {
        path: '/profile',
        exact: true,
        component: Profile,
        meta: {
          title: '设置个人信息',
          auth: true,
        },
      },
    ],
  },
  {
    path: '/404',
    name: '404',
    component: NotFound,
    exact: true,
    meta: {
      title: '页面不存在',
    },
  },
  {
    path: '*',
    name: '*',
    component: NotFound,
    exact: true,
    meta: {
      title: '页面不存在',
    },
  },
];

export default router;
