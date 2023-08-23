import React, { useState, Suspense } from 'react';
import { DoubleLeftOutlined, DoubleRightOutlined } from '@ant-design/icons';
import { Layout, Menu, Button, Spin } from 'antd';

import { RouteMenus } from 'constants/index';

import { Header as MyHeader, RouteAuth } from 'components/index';
import './index.scss';
import { useHistory } from 'react-router';

const { Header, Sider, Content } = Layout;

export default function Container(props: any): JSX.Element {
  const [collapsed, setCollapsed] = useState(false);
  const router = useHistory();

  return (
    <Layout className={'stu-container'} style={{ height: '100%' }}>
      <Layout style={{ flex: 'none' }}>
        <Header style={{ padding: 0, display: 'flex', background: '#fff' }}>
          <MyHeader />
        </Header>
      </Layout>
      <Layout>
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'space-between',
            background: '#fff',
          }}
        >
          <div className='demo-logo-vertical' />
          <div style={{ flex: 1 }}>
            <Menu
              theme='light'
              mode='inline'
              defaultSelectedKeys={['']}
              items={RouteMenus}
              onClick={({ keyPath }) => {
                router.push(`/${keyPath.join('/')}`);
              }}
            />
          </div>
          <Button
            type='text'
            icon={collapsed ? <DoubleRightOutlined /> : <DoubleLeftOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '14px',
              width: '100%',
              height: 64,
            }}
          >
            {!collapsed && '收起菜单'}
          </Button>
        </Sider>
        <Layout>
          <Content
            style={{
              padding: 20,
              minHeight: 280,
            }}
          >
            <Suspense fallback={<Spin />}>
              <RouteAuth {...props} />
            </Suspense>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}
