import React from 'react';
import { useHistory } from 'react-router';
import { Button, Menu, Input } from 'antd';
import { NavRoutes } from 'constants/index';

import { useUserInfo } from 'hooks/user-info';

import UserMenu from './user-menu';
import './index.scss';

const { Search } = Input;

export default function Header(): JSX.Element {
  const history = useHistory();
  const { isLogined } = useUserInfo();

  const onSearch = () => {};

  const onChangeRoute = (path: string) => {
    history.push(path);
  };

  return (
    <>
      <section>
        <Menu
          className='s-menu'
          mode='horizontal'
          defaultSelectedKeys={['home']}
          items={NavRoutes.map((route) => ({
            key: route.key,
            label: <span onClick={() => onChangeRoute(route.path)}>{route.name}</span>,
          }))}
        />
      </section>
      <section className='right'>
        <Search placeholder='搜索一下' onSearch={onSearch} style={{ width: 200 }} />
        {isLogined ? (
          <UserMenu />
        ) : (
          <>
            <Button className='btn' type='text' onClick={() => onChangeRoute('/login')}>
              登录
            </Button>
            <Button className='btn' type='text' onClick={() => onChangeRoute('/regist')}>
              注册
            </Button>
          </>
        )}
      </section>
    </>
  );
}
