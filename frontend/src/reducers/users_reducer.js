import { RECEIVE_CURRENT_USER } from '../actions/session_actions';
import { RECEIVE_USER, RECEIVE_ALL_USERS, ADD_FOLLOWED_CAR } from '../actions/user_actions';


const usersReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return Object.assign({}, state, { [action.currentUser.id]: action.currentUser });
    case RECEIVE_USER:
      return Object.assign({}, state, { followedCars: action.user.data.followedCars });
    case RECEIVE_ALL_USERS:
      return Object.assign({}, action.users.data);
    case ADD_FOLLOWED_CAR:
      return Object.assign({}, state) 
    default:
      return state;
  }
};

export default usersReducer;