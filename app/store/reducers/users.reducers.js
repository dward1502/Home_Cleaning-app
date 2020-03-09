import { SET_USER } from '../actions/users.actions';
import User from '../../models/users'

const initialState = {
  userList: []
}

export default (state = initialState, action) => {
  switch(action.type) {
    case SET_USER:
      return {
        userList: action.userData
      }
  }
  return state;
}