import React from 'react';
import { useHistory } from 'react-router';
import { Button, Menu, Input } from 'antd';

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

  return <></>;
}
