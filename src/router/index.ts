import { RouteConfig } from 'react-router-config';

import { redirect } from './redirect';
import { loadComponent } from 'utils/route';

import Container from 'layouts/index';
import Login from 'src/modules/login';

const router: RouteConfig[] = [
  {
    path: '/',
    exact: true,
    component: redirect('/dashboard'),
    meta: {
      title: '工作台',
      auth: true,
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
        component: loadComponent('dashboard/index.tsx'),
        meta: {
          title: '工作台',
          auth: false,
        },
      },
      {
        path: '/class',
        exact: true,
        component: loadComponent('class/index.tsx'),
        meta: {
          title: '班级管理',
          auth: false,
        },
      },
      {
        path: '/student',
        exact: true,
        component: loadComponent('student/list/index.tsx'),
        meta: {
          title: '学生管理',
          auth: false,
        },
      },
      {
        path: '/student/info/:id',
        exact: false,
        component: loadComponent('student/info/index.tsx'),
        meta: {
          title: '学生信息',
          auth: false,
        },
      },
      {
        path: '/tag',
        exact: true,
        component: loadComponent('tag/index.tsx'),
        meta: {
          title: '标签管理',
          auth: false,
        },
      },
      {
        path: '/profile',
        exact: true,
        component: loadComponent('profile/index.tsx'),
        meta: {
          title: '个人信息',
          auth: false,
        },
      },
      {
        path: '/notice',
        exact: true,
        component: loadComponent('notice/index.tsx'),
        meta: {
          title: '家长通知',
          auth: false,
        },
      },
      {
        path: '/404',
        name: '404',
        component: loadComponent('404/index.tsx'),
        exact: true,
        meta: {
          title: '页面不存在',
        },
      },
      {
        path: '/*',
        name: '*',
        component: redirect('/404'),
        exact: true,
        meta: {
          title: '页面不存在',
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
      title: '页面不存在',
    },
  },
  {
    path: '/*',
    name: '*',
    component: redirect('/404'),
    exact: true,
    meta: {
      title: '页面不存在',
    },
  },
];

export default router;
