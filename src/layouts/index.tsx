import React from 'react';
import { Layout, BackTop } from 'antd';

import { Header as MyHeader, RouteAuth } from 'components/index';
import './index.scss';

const { Header, Content } = Layout;

export default function Container(props: any): JSX.Element {
  return (
    <Layout className='s-container'>
      <Header className='s-header'>
        <MyHeader />
      </Header>
      <Content className='s-main'>
        <RouteAuth {...props} />
      </Content>
    </Layout>
  );
}
