import React, { useState } from 'react';
import { message } from 'antd';

import { local, cookie } from 'utils/storage';
import { login } from 'apis/index';
import { useHistory } from 'react-router';

export const useUserInfo = () => {
  const history = useHistory();
  const users = local.get('USER_INFO');

  const [isLogined, setLogined] = useState(Boolean(cookie.get('TOKEN')) || false);
  const [userinfo, setUserinfo] = useState(users);
  const onLogin = async (password: string, account: string) => {
    const res: Iobject = await login({ password, account });
    if (res.code === 0) {
      message.success('登录成功');
      cookie.set('TOKEN', res.data.token, 7);
      local.set('USER_INFO', res.data);
      setLogined(true);
      history.replace('/');
    } else {
      message.error(res.msg);
    }
  };
  const onLogout = () => {
    setLogined(false);
    cookie.remove('TOKEN');
    local.remove('USER_INFO');
    history.replace('/login');
  };
  const onUpdateUserInfo = () => {};

  return {
    userinfo,
    isLogined,
    onUpdateUserInfo,
    onLogout,
    onLogin,
  };
};
