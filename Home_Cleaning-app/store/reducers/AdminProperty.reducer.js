import { SET_PROPERTIES} from '../actions/AdminProperty.actions';

const initialState = {
  propertyList:[]
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_PROPERTIES:
      return {
        propertyList: action.properties
      }
  }
  return state;
}