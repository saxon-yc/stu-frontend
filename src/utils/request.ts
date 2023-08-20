import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { message } from 'antd';

import { ApiWhiteList } from 'constants/index';
import { cookie } from 'utils/storage';

const apiFetch = axios.create({
  baseURL: '/',
  timeout: 15000,
});

apiFetch.interceptors.request.use(
  (config: AxiosRequestConfig | Iobject) => {
    config.headers['Content-Type'] = 'application/json; charset=UTF-8';

    if (!ApiWhiteList.includes(config.url)) {
      config.headers['token'] = cookie.get('TOKEN');
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// 添加响应拦截器
apiFetch.interceptors.response.use(
  (response: AxiosResponse) => {
    switch (response.status) {
      case 200:
        return response.data;

      case 400:
      case 401:
        message.error('接口登录超时');
        window.open('/login', '_self');
        return Promise.reject(response);

      default:
        message.error(response.data.msg);
        return Promise.reject(response);
    }
  },
  (error) => {
    message.error('网络响应超时');
    return Promise.reject(error);
  },
);

export default apiFetch;
