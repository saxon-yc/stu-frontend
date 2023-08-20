import { isEmpty } from 'lodash';

export const session = {
  get: (key: string, def = {}) => {
    const data: string = sessionStorage.getItem(key) || '';

    return isEmpty(data) ? def : JSON.parse(data);
  },
  set: (key: string, value: unknown) => {
    sessionStorage.setItem(key, JSON.stringify(value));
  },
  remove: (key: string) => {
    sessionStorage.removeItem(key);
  },
  clear: () => {
    sessionStorage.clear();
  },
};

export const local = {
  get: (key: string, def = {}) => {
    const data: string = localStorage.getItem(key) || '';
    return isEmpty(data) ? def : JSON.parse(data);
  },
  set: (key: string, value: unknown) => {
    localStorage.setItem(key, JSON.stringify(value));
  },
  remove: (key: string) => {
    localStorage.removeItem(key);
  },
  clear: () => {
    localStorage.clear();
  },
};

export const cookie = {
  get: (key: string) => {
    const cookies = document.cookie.split('; ');
    for (const item of cookies) {
      const [k, v] = item.split('=');
      if (k === key) {
        return v;
      }
    }
  },
  set: (key: string, val: any, time: number) => {
    let date = new Date();
    date.setDate(date.getDate() + time);
    document.cookie = key + '=' + val + ';expires=' + date;
  },
  remove: (key: string) => {
    cookie.set(key, '', -10);
  },
};
