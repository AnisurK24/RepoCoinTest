import * as CarApiUtil from "../util/car_api_util";

export const RECEIVE_ALL_CARS = "RECEIVE_ALL_CARS";
export const RECEIVE_ONE_CAR = "RECEIVE_ONE_CAR";
export const REMOVE_ONE_CAR = "REMOVE_ONE_CAR";
export const RECEIVE_CAR_ERRORS = "RECEIVE_CAR_ERRORS";

export const receiveAllCars = (cars) => {
  return {
    type: RECEIVE_ALL_CARS,
    cars,
  };
};

export const receiveOneCar = (car) => ({
  type: RECEIVE_ONE_CAR,
  car,
});

export const removeOneCar = (res) => ({
  type: REMOVE_ONE_CAR,
  res,
});

export const receiveCarErrors = (err) => ({
  type: RECEIVE_CAR_ERRORS,
  err,
});


export const fetchCars = (isAdmin) => (dispatch) => {
  console.log("is Admin", isAdmin)
  CarApiUtil.getCars(isAdmin)
    .then((cars) => {
      dispatch(receiveAllCars(cars));
    })
    .catch((err) => dispatch(receiveCarErrors(err)));
};

export const fetchOneCar = (id, isAdmin) => (dispatch) => {
  CarApiUtil.getCar(id, isAdmin)
    .then((car) => dispatch(receiveOneCar(car)))
    .catch((err) => dispatch(receiveCarErrors(err)));
};

export const createCar = (car) => (dispatch) => (
  CarApiUtil.createCar(car)
    .then((car) => dispatch(receiveOneCar(car)))
    .catch((err) => dispatch(receiveCarErrors(err)))
);

export const updateCar = (car) => (dispatch) => (
  CarApiUtil.updateCar(car)
    .then((car) => dispatch(receiveOneCar(car)))
    .catch((err) => dispatch(receiveCarErrors(err)))
);

export const deleteCar = (id) => (dispatch) => {
  return CarApiUtil.deleteCar(id)
    .then((res) => dispatch(removeOneCar(res)))
    .catch((err) => dispatch(receiveCarErrors(err)));
};

// SEARCH ACTIONS

export const fetchCarsByMake = (make) => (dispatch) => (
  CarApiUtil.getCarsByMake(make)
    .then((cars) => dispatch(receiveAllCars(cars)))
    .catch((err) => dispatch(receiveCarErrors(err)))
);

export const fetchCarsByModel = (model) => (dispatch) => (
  CarApiUtil.getCarsByModel(model)
    .then((cars) => dispatch(receiveAllCars(cars)))
    .catch((err) => dispatch(receiveCarErrors(err)))
);

export const fetchCarsByYear = (year) => (dispatch) => (
  CarApiUtil.getCarsByYear(year)
    .then((cars) => dispatch(receiveAllCars(cars)))
    .catch((err) => dispatch(receiveCarErrors(err)))
);

export const fetchCarsByLocation = (location) => (dispatch) => (
  CarApiUtil.getCarsByLocation(location)
    .then((cars) => dispatch(receiveAllCars(cars)))
    .catch((err) => dispatch(receiveCarErrors(err)))
);

export const fetchCarsByColor = (color) => (dispatch) => (
  CarApiUtil.getCarsByColor(color)
    .then((cars) => dispatch(receiveAllCars(cars)))
    .catch((err) => dispatch(receiveCarErrors(err)))
);
