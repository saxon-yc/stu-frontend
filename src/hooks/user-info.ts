import React, { useState } from 'react';
import { message } from 'antd';

import { local, cookie } from 'utils/storage';
import { login } from 'apis/index';

export const useUserInfo = () => {
  const users = local.get('USER_INFO');

  const [isLogined, setLogined] = useState(Boolean(cookie.get('TOKEN')) || false);
  const [userinfo, setUserinfo] = useState(users);
  const onLogin = async (password: string, username: string) => {
    const res: Iobject = await login({ password, username });

    if (res.code === 0) {
      cookie.set('TOKEN', res.data.token, 7);
      local.set('USER_INFO', res.data);
      setLogined(true);
      window.open('/', '_self');
    } else {
      message.error(res.msg);
    }
  };
  const onLogout = () => {
    setLogined(false);
    cookie.remove('TOKEN');
    local.remove('USER_INFO');
    window.open('/', '_self');
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
