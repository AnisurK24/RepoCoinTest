import { RECEIVE_CAR_ERRORS, RECEIVE_ONE_CAR } from "../actions/car_actions";

const CarErrorsReducer = (state = [], action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_CAR_ERRORS:
      return action.err;
    case RECEIVE_ONE_CAR:
      return [];
    default:
      return state;
  }
};

export default CarErrorsReducer;
