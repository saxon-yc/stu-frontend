import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { message } from 'antd';

import { ApiWhiteList } from 'constants/index';
import { cookie } from 'utils/storage';

const apiFetch = axios.create({
  baseURL: '/api',
  timeout: 15000,
});
apiFetch.interceptors.request.use(
  (config: AxiosRequestConfig | Iobject) => {
    config.headers['Accept'] = 'application/json';
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';

    if (!ApiWhiteList.includes(config.url)) {
      config.headers['Authorization'] = cookie.get('TOKEN');
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

      default:
        message.error(response.data.msg);
        return Promise.reject(response);
    }
  },
  (error) => {
    switch (error.response.status) {
      case 400:
      case 401:
        message.error(error.response.data.msg || '接口登录超时');
        window.open('/login', '_self');
        return Promise.reject(error.response);

      default:
        message.error('网络响应超时');
        return Promise.reject(error);
    }
  },
);

export default apiFetch;
