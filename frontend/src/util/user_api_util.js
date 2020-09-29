import axios from "axios";

export const getUsers = () => {
  return axios.get("/api/users");
};

export const getUser = (id) => {
  return axios.get(`/api/users/${id}`);
};

export const editUser = (user) => {
  return axios.patch(`/api/users/${user.id}`);
};

// export const createUser = (formData) => {
//   return axios.post(`/api/users`);
// };

export const addFollowed = (id) => {
  return axios.post(`/api/users/${id}/addFollowedCar`);
};

// export const removeFollowed = (id) => {
//   return axios.patch(`/api/users/${id}/removeFollowedCar`);
// };
