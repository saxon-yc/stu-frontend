import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button } from 'antd';

import { RouteMenus } from 'constants/index';

import { Header as MyHeader, RouteAuth } from 'components/index';
import './index.scss';
import { useHistory } from 'react-router';

const { Header, Sider, Content } = Layout;

export default function Container(props: any): JSX.Element {
  const [collapsed, setCollapsed] = useState(false);
  const router = useHistory();

  return (
    <Layout style={{ height: '100%' }}>
      <Sider trigger={null} collapsible collapsed={collapsed} style={{ background: '#fff' }}>
        <div className='demo-logo-vertical' />
        <Menu
          theme='light'
          mode='inline'
          defaultSelectedKeys={['dashboard']}
          items={RouteMenus}
          onClick={({ keyPath }) => {
            router.push(`/${keyPath.join('/')}`);
          }}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, display: 'flex', background: '#fff' }}>
          <Button
            type='text'
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
          <MyHeader />
        </Header>
        <Content
          style={{
            padding: 20,
            minHeight: 280,
          }}
        >
          <RouteAuth {...props} />
        </Content>
      </Layout>
    </Layout>
  );
}
