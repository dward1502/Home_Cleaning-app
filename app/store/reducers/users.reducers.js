import { SET_USER, CREATE_USER, DELETE_USER, SET_USERINFO, EDIT_USER } from '../actions/users.actions';
import User from '../../models/users';

const initialState = {
  userList: [],
  userInfo:{}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        userList: action.userData,
      };
    case SET_USERINFO:
      return {
        ...state,
        userInfo: action.userData
      }
    case DELETE_USER:
      return {
        ...state,
        userList: state.userList.filter((user) => user._id !== action.userId)
      }
    case CREATE_USER:
      const newUser = new User(
        action.userData.email,
        action.userData.name,
        action.userData.password,
        action.userData.permission
      )
      return {
        ...state,
        userList: state.userList.concat(newUser)
      }
    case EDIT_USER:
      const userIndex = state.userList.findIndex(user => user._id === action.userId)
      const userInformation = new User(
        action.userId,
        action.userData.email,
        action.userData.name,
        action.userData.permission
      )
      const updatedUserInfo = [...state.userList];
      updatedUserInfo[userIndex] = userInformation;
      return {
        ...state,
        userList: updatedUserInfo
      }
  }
  return state;
};
