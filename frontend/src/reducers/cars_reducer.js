import {
  RECEIVE_ALL_CARS,
  RECEIVE_ONE_CAR,
//   REMOVE_ONE_CAR,
} from "../actions/car_actions";

const CarsReducer = (state = {}, action) => {
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_ALL_CARS:
      return Object.assign({}, action.cars.data);
    case RECEIVE_ONE_CAR:
      return Object.assign({}, state, {
        [action.car.data.id]: action.car.data,
      });
    // case REMOVE_ONE_CAR:
    //   let newState = Object.assign({}, state);
    //   delete newState[action.res.data.id];
    //   return newState;
    default:
      return state;
  }
};

export default CarsReducer;
