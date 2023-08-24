import React, { useState, Suspense } from 'react';
import { useHistory } from 'react-router';
import { DoubleLeftOutlined, DoubleRightOutlined } from '@ant-design/icons';
import { Layout, Button, Spin, Breadcrumb } from 'antd';

import { Header as MyHeader, RouteMenus, RouteAuth } from 'components/index';
import './index.scss';

const { Header, Sider, Content } = Layout;

export default function Container(props: any): JSX.Element {
  const [collapsed, setCollapsed] = useState(false);
  const router = useHistory();

  return (
    <Layout className={'stu-container'} style={{ height: '100%' }}>
      <Layout
        style={{
          flex: 'none',
        }}
      >
        <Header
          style={{
            padding: 0,
            background: '#fff',
            height: '56px',
            boxShadow:
              '0 1px 2px 0 rgba(0, 0, 0, 0.03), 0 1px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px 0 rgba(0, 0, 0, 0.02)',
          }}
        >
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
            <RouteMenus />
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
              <Breadcrumb
                style={{ marginBottom: '24px' }}
                items={[
                  {
                    href: '',
                    title: <span>学生管理</span>,
                  },
                  {
                    href: '',
                    title: (
                      <>
                        <span>学生信息</span>
                      </>
                    ),
                  },
                ]}
              />
              <RouteAuth {...props} />
            </Suspense>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}
