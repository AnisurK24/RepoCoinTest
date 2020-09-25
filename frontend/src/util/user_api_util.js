import axios from "axios";

export const getUsers = () => {
  return axios.get("/api/users");
};

export const getUser = (id) => {
  return axios.get(`/api/users/${id}`);
};

export const editUser = (user) => {
  return axios.patch(`/api/users/${user.id}`);
  // data: { user }
};

export const createUser = (formData) => {
  return axios.post(`/api/users`);
  // data: formData
};

export const addFollowed = (id) => {
  return axios.post(`/api/users/${id}/followedCars`);
};
