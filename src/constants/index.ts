export const ApiWhiteList = ['/api/v1/login', '/api/v1/regist'];
export const NotAvatar =
  'https://cdn.nlark.com/yuque/0/2022/jpeg/anonymous/…ge%2Fresize%2Cm_fill%2Cw_48%2Ch_48%2Fformat%2Cpng';

export const QUERY_PARAMS = {
  search_word: '',
  limit: 10,
  offset: 0,
  start_time: '',
  end_time: '',
};

/* 左侧路由菜单 */
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

/* 路由和标题映射 */
export const ROUTE_TITLE_MAP: Iobject = {
  '/dashboard': '工作台',
  '/class': '班级管理',
  '/student': '学生管理',
  '/student/:id': '学生信息',
  '/tag': '标签管理',
  '/profile': '账户设置',
  '/notice': '家长通知',
  '/workhandover': '工作交接',
  '/404': '页面不存在',
  '/*': '页面不存在',
};
