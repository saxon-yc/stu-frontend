import React from 'react';
import { useHistory } from 'react-router';
import { Button, Input, Tooltip } from 'antd';

import { useUserInfo } from 'hooks/user-info';

import UserAction from './user-action';
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
    <div style={{ padding: '0 20px', display: 'flex', alignItems: 'center', width: '100%' }}>
      <Tooltip title='工作台'>
        <Button type='text' onClick={() => history.push('/dashboard')}>
          Sky
        </Button>
      </Tooltip>
      <span style={{ marginLeft: 'auto' }}>
        <UserAction />
      </span>
    </div>
  );
}
