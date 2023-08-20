import apiFetch from 'utils/request';

export const login = async (params: Iobject) => {
  return apiFetch.post(`/api/v1/login`, params);
};

export const regist = async (params: Iobject) => {
  return apiFetch.post(`/api/v1/regist`, params);
};

export const update_userinfo = async (params: Iobject) => {
  return apiFetch.post(`/api/v1/update/userinfo`, params);
};

export const get_posts = async (params: Iobject) => {
  return apiFetch.post(`/api/v1/posts`, params);
};

export const add_post = async (params: Iobject) => {
  return apiFetch.post(`/api/v1/post/add`, params);
};

export const update_post = async (params: Iobject) => {
  return apiFetch.post(`/api/v1/posts/update/${params.id}`, params);
};

export const delete_post = async (params: Iobject) => {
  return apiFetch.post(`/api/v1/posts/delete/${params.id}`, params);
};

export const get_post_detail = async (params: Iobject) => {
  return apiFetch.post(`/api/v1/post/${params.id}`, params);
};

export const get_categories = async () => {
  return apiFetch.get(`/api/v1/categories`);
};
