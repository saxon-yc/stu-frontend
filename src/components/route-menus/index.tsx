import { useHistory } from 'react-router';
import { Menu } from 'antd';
import {
  ContactsOutlined,
  ShakeOutlined,
  ThunderboltOutlined,
  UsergroupAddOutlined,
} from '@ant-design/icons';
import { useUserInfo } from 'hooks/use-userinfo';
import { isEmpty } from 'lodash';

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
  const { userinfo = { menus: [] } } = useUserInfo();
  const filterdMenus = !isEmpty(userinfo)
    ? ROUTE_MENUS.filter((item: Iobject) => userinfo?.menus.includes(item.key))
    : ROUTE_MENUS;

  const router = useHistory();
  return (
    <Menu
      theme='light'
      mode='inline'
      defaultSelectedKeys={['']}
      items={filterdMenus}
      onClick={({ keyPath }) => {
        router.push(`/${keyPath.join('/')}`);
      }}
    />
  );
}
