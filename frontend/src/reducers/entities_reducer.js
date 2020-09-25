import { combineReducers } from "redux";

import CarsReducer from "./cars_reducer";
import UserReducer from "./users_reducer";
import ImagesReducer from "./images_reducer";

const EntitiesReducer = combineReducers({
  cars: CarsReducer,
  users: UserReducer,
  images: ImagesReducer,
});

export default EntitiesReducer;
