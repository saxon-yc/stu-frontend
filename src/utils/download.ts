import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { message } from 'antd';

import { ApiWhiteList } from 'constants/index';
import { cookie } from 'utils/storage';

const download = axios.create({
  baseURL: '/api',
  responseType: 'blob', //关键
  timeout: 15000,
});
download.interceptors.request.use(
  (config: AxiosRequestConfig | Iobject) => {
    config.headers = {
      'Content-Type': 'application/octet-stream',
    };

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
download.interceptors.response.use(
  (response: AxiosResponse) => {
    // 这里做错误判断(这里假设有token直接返回文件流 没有token返回的res包含code)
    if (response.hasOwnProperty('code') && response.data.code !== 0) {
      message.error(response.data.msg || '导出错误');
      return;
    }

    return response;
  },
  (error) => {
    message.error('网络响应超时');
    return Promise.reject(error);
  },
);

export default download;
