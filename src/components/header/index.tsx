import React from 'react';
import { useHistory } from 'react-router';
import { Input } from 'antd';

import { useUserInfo } from 'hooks/use-userinfo';

import UserAction from './user-action';
import './index.scss';
import { MyBreadcrumb } from '..';

const { Search } = Input;

export default function Header(props: any): JSX.Element {
  const history = useHistory();
  const { isLogined } = useUserInfo();

  const onSearch = () => {};

  const onChangeRoute = (path: string) => {
    history.push(path);
  };

  return (
    <div
      style={{
        padding: '0 20px',
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        height: '100%',
      }}
    >
      <MyBreadcrumb {...props} />
      <span style={{ marginLeft: 'auto' }}>
        <UserAction />
      </span>
    </div>
  );
}
