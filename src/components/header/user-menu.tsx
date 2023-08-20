import React from 'react';
import { Link } from 'react-router-dom';
import { Avatar, Button, Dropdown, Menu, Space } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import { useUserInfo } from 'hooks/user-info';
import { NotAvatar } from 'constants/index';

export default function UserMenu(): JSX.Element {
  const { userinfo, onLogout } = useUserInfo();

  return (
    <Dropdown
      overlay={
        <Menu
          items={[
            {
              key: 'profile',
              label: <Link to={'/profile'}>个人设置</Link>,
            },
            {
              key: 'logout',
              label: <span onClick={onLogout}>退出</span>,
            },
          ]}
        />
      }
      placement='bottom'
    >
      <div style={{ marginLeft: '24px' }}>
        <Avatar src={NotAvatar} size={45} icon={<UserOutlined />} />
        <span style={{ marginLeft: '5px' }}>{userinfo.username}</span>
      </div>
    </Dropdown>
  );
}
