import md5 from 'crypto-js/md5';

export const saltMD5 = (str) => {
  return md5(str).toString();
};
