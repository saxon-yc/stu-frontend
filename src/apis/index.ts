import apiFetch from 'utils/request';

export const login = async (params: Iobject) => {
  return apiFetch.post(`/login`, params);
};

export const queryDupuser = async (params: Iobject) => {
  return apiFetch.get(`/dupuser`, { params });
};

export const update_userinfo = async (params: Iobject) => {
  return apiFetch.post(`/update/userinfo`, params);
};

export const getStudents = async (params = {}) => {
  return apiFetch.get(`/student`, { params });
};
export const getStudentDetail = async (params: Iobject) => {
  return apiFetch.get(`/student/${params.id}`, { params });
};
export const addStudent = async (params = {}) => {
  return apiFetch.post(`/student`, { params });
};
export const updateStudent = async (params = {}) => {
  return apiFetch.put(`/student`, params);
};
export const deleteStudent = async (params = {}) => {
  return apiFetch.delete(`/student`, params);
};

export const getTags = async (params = {}) => {
  return apiFetch.get(`/tag`, { params });
};
export const addTag = async (params = {}) => {
  return apiFetch.post(`/tag`, params);
};
export const updateTag = async (params = {}) => {
  return apiFetch.patch(`/tag`, params);
};
export const deleteTag = async (params: Iobject) => {
  return apiFetch.delete(`/tag/${params.id}`);
};

export const getNotices = async (params = {}) => {
  return apiFetch.get(`/notices`, { params });
};
export const addNotice = async (params = {}) => {
  return apiFetch.post(`/notice`, params);
};
export const deleteNotice = async (params = {}) => {
  return apiFetch.delete(`/tag`, params);
};
