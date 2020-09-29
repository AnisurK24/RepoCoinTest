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

// export const removeOneCar = (res) => ({
//   type: REMOVE_ONE_CAR,
//   res,
// });

export const receiveCarErrors = (err) => ({
  type: RECEIVE_CAR_ERRORS,
  err,
});


export const fetchCars = () => (dispatch) => {
  CarApiUtil.getCars()
    .then((cars) => {
      dispatch(receiveAllCars(cars));
    })
    .catch((err) => dispatch(receiveCarErrors(err)));
};

export const fetchOneCar = (id) => (dispatch) => {
  CarApiUtil.getCar(id)
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

export const deleteCar = (car) => (dispatch) => {
  return CarApiUtil.deleteCar(car)
    .then((car) => dispatch(receiveOneCar(car)))
    .catch((err) => dispatch(receiveCarErrors(err)));
};

export const undeleteCar = (car) => (dispatch) => {
  return CarApiUtil.undeleteCar(car)
    .then((car) => dispatch(receiveOneCar(car)))
    .catch((err) => dispatch(receiveCarErrors(err)));
};

export const buyCar = (car) => (dispatch) => {
  return CarApiUtil.buyCar(car)
    .then((car) => dispatch(receiveOneCar(car)))
    .catch((err) => dispatch(receiveCarErrors(err)));
};

export const addForSale = (car) => (dispatch) => {
  return CarApiUtil.addForSale(car)
    .then((car) => dispatch(receiveOneCar(car)))
    .catch((err) => dispatch(receiveCarErrors(err)));
};

export const removeForSale = (car) => (dispatch) => {
  return CarApiUtil.removeForSale(car)
    .then((car) => dispatch(receiveOneCar(car)))
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
