import React from 'react';
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Dropdown, Space, Divider, Button } from 'antd';
import type { MenuProps } from 'antd';

import { useUserInfo } from 'hooks/user-info';
import { NotAvatar } from 'constants/index';

const items: MenuProps['items'] = [
  {
    key: '1',
    label: (
      <a target='_blank' rel='noopener noreferrer' href='https://www.antgroup.com'>
        1st menu item
      </a>
    ),
  },
  {
    key: '2',
    label: (
      <a target='_blank' rel='noopener noreferrer' href='https://www.aliyun.com'>
        2nd menu item (disabled)
      </a>
    ),
    disabled: true,
  },
  {
    key: '3',
    label: (
      <a target='_blank' rel='noopener noreferrer' href='https://www.luohanacademy.com'>
        3rd menu item (disabled)
      </a>
    ),
    disabled: true,
  },
];

export default function UserMenu(): JSX.Element {
  const { userinfo, onLogout } = useUserInfo();
  const menuStyle: React.CSSProperties = {
    boxShadow: 'none',
  };

  return (
    <Dropdown
      menu={{ items }}
      dropdownRender={(menu) => (
        <div>
          {React.cloneElement(menu as React.ReactElement, { style: menuStyle })}
          <Divider style={{ margin: 0 }} />
          <Space style={{ padding: 8 }}>
            <Button type='primary' onClick={onLogout}>
              退出
            </Button>
          </Space>
        </div>
      )}
    >
      <div style={{ marginLeft: '24px' }}>
        <Avatar src={NotAvatar} size={45} icon={<UserOutlined />} />
        <span style={{ marginLeft: '5px' }}>{userinfo.username}</span>
      </div>
    </Dropdown>
  );
}
