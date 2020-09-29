import * as UserAPIUtil from "../util/user_api_util";

export const RECEIVE_ALL_USERS = "RECEIVE_ALL_USERS";
export const RECEIVE_USER = "RECEIVE_USER";
export const ADD_FOLLOWED_CAR = "ADD_FOLLOWED_CAR";

const receiveUsers = (users) => ({
  type: RECEIVE_ALL_USERS,
  users,
});

const receiveUser = (user) => ({
  type: RECEIVE_USER,
  user,
});

const addFollowedCar = (car) => ({
  type: ADD_FOLLOWED_CAR,
  car,
});

// const removeFollowedCar = (car) => ({
//   type: REMOVE_FOLLOWED_CAR,
//   car,
// });

export const fetchUsers = () => (dispatch) => {
  return UserAPIUtil.getUsers()
    .then((users) => dispatch(receiveUsers(users)))
    .catch((err) => console.log(err));
};

export const fetchUser = (id) => (dispatch) => {
  return UserAPIUtil.getUser(id)
    .then((user) => dispatch(receiveUser(user)))
    .catch((err) => console.log(err));
};

export const createFollowed = (id) => (dispatch) => {
  return UserAPIUtil.addFollowed(id)
    .then((user) => dispatch(addFollowedCar(id)))
    .catch((err) => console.log(err));
};

// export const deleteFollowed = (id) => (dispatch) => {
//   return UserAPIUtil.removeFollowed(id)
//     .then((user) => dispatch(removeFollowedCar(id)))
//     .catch((err) => console.log(err));
// };
