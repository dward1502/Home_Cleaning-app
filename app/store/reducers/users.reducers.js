import {SET_USERS,CREATE_USER,EDIT_USER,DELETE_USER} from '../../models/users';
import Users from '../../models/users';

const initialState = {
  userList:[]
}

export default (state = initialState, action) => {
  switch(action.type) {
    case SET_USERS:
      return {
        usersList: action.usersInfo
      }
    case CREATE_USER:
      const newUser = new Users(
        action.userData.email,
        action.userData.password,
        action.userData.name,
        action.userData.permission
      )
      return {
        ...state,
        userList: state.users.concat(newUser)
      }
    // case EDIT_USER:
    //   return {

    //   }
    // case DELETE_USER:
    //   return {
        
    //   }
  }
  return state;
}