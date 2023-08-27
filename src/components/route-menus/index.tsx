import { useHistory } from 'react-router';
import { Menu } from 'antd';
import {
  ContactsOutlined,
  ShakeOutlined,
  ThunderboltOutlined,
  UsergroupAddOutlined,
} from '@ant-design/icons';

/* 左侧路由菜单 */
export const ROUTE_MENUS = [
  {
    key: 'class',
    path: '/class',
    label: '班级管理',
    icon: <ContactsOutlined />,
  },
  {
    key: 'student',
    path: '/student',
    label: '学生管理',
    icon: <UsergroupAddOutlined />,
  },
  {
    key: 'tag',
    path: '/tag',
    label: '标签管理',
    icon: <ThunderboltOutlined />,
  },
  {
    key: 'notice',
    path: '/notice',
    label: '家长通知',
    icon: <ShakeOutlined />,
  },
];

export default function RouteMenus(): JSX.Element {
  const router = useHistory();
  return (
    <Menu
      theme='light'
      mode='inline'
      defaultSelectedKeys={['']}
      items={ROUTE_MENUS}
      onClick={({ keyPath }) => {
        router.push(`/${keyPath.join('/')}`);
      }}
    />
  );
}
