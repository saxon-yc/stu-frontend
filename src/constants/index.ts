export const ApiWhiteList = ['/api/v1/login', '/api/v1/regist'];
export const NotAvatar =
  'https://cdn.nlark.com/yuque/0/2022/jpeg/anonymous/…ge%2Fresize%2Cm_fill%2Cw_48%2Ch_48%2Fformat%2Cpng';

export const ROUTE_MENUS = [
  {
    key: 'class',
    path: '/class',
    label: '班级管理',
    // icon: <VideoCameraOutlined />,
  },
  {
    key: 'student',
    path: '/student',
    label: '学生管理',
    // icon: <VideoCameraOutlined />,
  },
  {
    key: 'tag',
    path: '/tag',
    label: '标签管理',
    // icon: <VideoCameraOutlined />,
  },
  {
    key: 'notice',
    path: '/notice',
    label: '家长通知',
    // icon: <VideoCameraOutlined />,
  },
];

export const QUERY_PARAMS = {
  search_word: '',
  limit: 10,
  offset: 0,
  start_time: '',
  end_time: '',
};
