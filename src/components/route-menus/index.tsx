import { useHistory } from 'react-router';
import { Menu } from 'antd';

import { ROUTE_MENUS } from 'constants/index';

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
