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

export const getStudents = async (params = {}) => {
  return apiFetch.get(`/api/student`, { params });
};
export const getStudentDetail = async (params: Iobject) => {
  return apiFetch.get(`/api/student/${params.id}`, { params });
};
export const addStudent = async (params = {}) => {
  return apiFetch.post(`/api/student`, { params });
};
export const updateStudent = async (params = {}) => {
  return apiFetch.put(`/api/student`, params);
};
export const deleteStudent = async (params = {}) => {
  return apiFetch.delete(`/api/student`, params);
};

export const getTags = async (params = {}) => {
  return apiFetch.get(`/api/tag`, { params });
};
export const addTag = async (params = {}) => {
  return apiFetch.post(`/api/tag`, params);
};
export const updateTag = async (params = {}) => {
  return apiFetch.put(`/api/tag`, params);
};
export const deleteTag = async (params = {}) => {
  return apiFetch.delete(`/api/tag`, params);
};

export const getNotices = async (params = {}) => {
  return apiFetch.get(`/api/notices`, { params });
};
export const addNotice = async (params = {}) => {
  return apiFetch.post(`/api/notice`, params);
};
export const deleteNotice = async (params = {}) => {
  return apiFetch.delete(`/api/tag`, params);
};
