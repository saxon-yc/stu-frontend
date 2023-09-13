import download from 'utils/download';
import apiFetch from 'utils/request';

export const login = async (params: Iobject) => {
  return apiFetch.post(`/v1/login`, params);
};

export const queryDupuser = async (params: Iobject) => {
  return apiFetch.get(`/v1/dupuser`, { params });
};

export const update_userinfo = async (params: Iobject) => {
  return apiFetch.post(`/v2/update/userinfo`, params);
};

export const getStudents = async (params = {}) => {
  return apiFetch.get(`/v2/student`, { params });
};
export const exportStudents = async (params: Iobject) => {
  return download.post(`/v2/student/export`, params);
};
export const addStudent = async (params = {}) => {
  return apiFetch.post(`/v2/student`, params);
};
export const updateStudent = async (params = {}) => {
  return apiFetch.put(`/v2/student`, params);
};
export const deleteStudent = async (params = {}) => {
  return apiFetch.delete(`/v2/student`, params);
};

export const getTags = async (params = {}) => {
  return apiFetch.get(`/v2/tag`, { params });
};
export const addTag = async (params = {}) => {
  return apiFetch.post(`/v2/tag`, params);
};
export const updateTag = async (params = {}) => {
  return apiFetch.patch(`/v2/tag`, params);
};
export const deleteTag = async (params: Iobject) => {
  return apiFetch.delete(`/v2/tag/${params.id}`);
};

export const getNotices = async (params = {}) => {
  return apiFetch.get(`/v2/notices`, { params });
};
export const addNotice = async (params = {}) => {
  return apiFetch.post(`/v2/notice`, params);
};
export const deleteNotice = async (params = {}) => {
  return apiFetch.delete(`/v2/tag`, params);
};
