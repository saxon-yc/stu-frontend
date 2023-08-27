import React, { useState, Suspense } from 'react';
import { useHistory } from 'react-router';
import { DoubleLeftOutlined, DoubleRightOutlined } from '@ant-design/icons';
import { Layout, Button, Spin, Tooltip } from 'antd';

import { Header as MyHeader, RouteMenus, RouteAuth } from 'components/index';
import Logo from 'static/image/logo.png';
import './index.scss';

const { Header, Sider, Content } = Layout;

export default function Container(props: any): JSX.Element {
  const [collapsed, setCollapsed] = useState(false);
  const history = useHistory();
  return (
    <Layout className={'stu-container'} style={{ height: '100%' }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{
          paddingTop: 20,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'space-between',
          borderRadius: '6px',
          background: '#fff',
        }}
      >
        <Tooltip title='工作台'>
          <a
            href='/dashboard'
            style={{ height: 56, objectFit: 'contain', cursor: 'pointer', textAlign: 'center' }}
          >
            <img style={{ height: 56, width: 56 }} src={Logo} alt='logo' />
          </a>
        </Tooltip>
        <div style={{ flex: 1, marginTop: '20px' }}>
          <RouteMenus />
        </div>
        <Button
          type='text'
          icon={collapsed ? <DoubleRightOutlined /> : <DoubleLeftOutlined />}
          onClick={() => setCollapsed(!collapsed)}
          style={{
            paddingLeft: 20,
            width: '100%',
            height: 64,
            fontSize: '14px',
            textAlign: 'left',
          }}
        >
          {!collapsed && '收起'}
        </Button>
      </Sider>

      <Layout style={{ marginLeft: '20px' }}>
        <Header
          style={{
            padding: 0,
            background: '#fff',
            height: '56px',
            borderRadius: '6px',
            boxShadow:
              '0 1px 2px 0 rgba(0, 0, 0, 0.03), 0 1px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px 0 rgba(0, 0, 0, 0.02)',
          }}
        >
          <MyHeader {...props} />
        </Header>
        <Content
          style={{
            padding: '20px 0',
            minHeight: 280,
          }}
        >
          <Suspense fallback={<Spin />}>
            <RouteAuth {...props} />
          </Suspense>
        </Content>
      </Layout>
    </Layout>
  );
}
