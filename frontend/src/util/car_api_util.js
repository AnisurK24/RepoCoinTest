import axios from "axios";

export const getCars = (isAdmin) => {
  return axios.get("/api/cars", isAdmin);
};

export const getCar = (id, isAdmin) => {
  return axios.get(`/api/cars/${id}`, isAdmin);
};

export const createCar = (car) => {
  return axios.post("/api/cars", car);
};

export const updateCar = (car) => {
  return axios.patch(`/api/cars/${car.id}`, car);
};

export const deleteCar = (id) => {
  return axios.delete(`/api/cars/${id}`);
};

// SEARCH AXIOS REQS

export const getCarsByMake = (make) => {
  return axios.get(`/api/search/makes/${make}`);
};

export const getCarsByModel = (model) => {
  return axios.get(`/api/search/models/${model}`);
};

export const getCarsByYear = (year) => {
  return axios.get(`/api/search/years/${year}`);
};

export const getCarsByLocation = (location) => {
  return axios.get(`/api/search/locations/${location}`);
};

export const getCarsByColor = (color) => {
  return axios.get(`/api/search/colors/${color}`);
};


// Capitalize form and search
export const capitalize = (word) => {
  let words = word.split(" ");
  let newWords = words.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1)
  );
  return newWords.join(" ")
}