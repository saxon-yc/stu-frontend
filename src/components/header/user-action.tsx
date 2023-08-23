import React from 'react';
import { LogoutOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Dropdown, Space, Divider, Button } from 'antd';
import type { MenuProps } from 'antd';

import { useUserInfo } from 'hooks/user-info';
import { NotAvatar } from 'constants/index';

import './index.scss';

const items: MenuProps['items'] = [
  {
    key: '1',
    label: (
      <a rel='noopener noreferrer' href='/profile'>
        <SettingOutlined />
        账户设置
      </a>
    ),
  },
  {
    key: '2',
    label: <a rel='noopener noreferrer'>2nd menu item (disabled)</a>,
    disabled: true,
  },
];

export default function UserAction(): JSX.Element {
  const { userinfo, onLogout } = useUserInfo();

  return (
    <Dropdown
      menu={{ items }}
      dropdownRender={(m) => (
        <div className='dropdown-content'>
          {m}
          <Divider style={{ margin: 0 }} />
          <Space style={{ padding: 8 }}>
            <Button type='text' onClick={onLogout}>
              <LogoutOutlined />
              退出
            </Button>
          </Space>
        </div>
      )}
    >
      <div>
        <Avatar src={NotAvatar} size={30} icon={<UserOutlined />} />
        <span style={{ marginLeft: '5px' }}>{userinfo.username}</span>
      </div>
    </Dropdown>
  );
}
