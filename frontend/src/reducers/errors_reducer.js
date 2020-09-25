import { combineReducers } from "redux";

import SessionErrorsReducer from "./session_errors_reducer";
import CarErrorsReducer from "./car_errors_reducer";

export default combineReducers({
  session: SessionErrorsReducer,
  car: CarErrorsReducer,
});
