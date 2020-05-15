import {SET_PROPERTIES, REMOVE_PROPERTY, CREATE_PROPERTY, EDIT_PROPERTY} from '../actions/property.actions'
import Property from '../../models/properties';

const initialState = {
  propertyList:[]
}

export default (state = initialState, action) => {
  switch(action.type) {
    case SET_PROPERTIES: 
    return {
      propertyList:action.properties
    }
    case REMOVE_PROPERTY:
      return {
        ...state,
        propertyList: state.propertyList.filter((property) => property._id !== action.propID)
      }
    case CREATE_PROPERTY:
      const newProperty = new Property(
        action.propertyData.address,
        action.propertyData.owner,
        action.propertyData.email,
        action.propertyData.lockbox,
        action.propertyData.doorcode,
        action.propertyData.type,
        action.propertyData.description,
        action.propertyData.duties,
        action.propertyData.template
      )
      return {
        ...state,
        propertyList: state.propertyList.concat(newProperty)
      }
    case EDIT_PROPERTY:
      const propertyIndex = state.propertyList.findIndex(property => property._id === action.propID);
      const updatedProperty = new Property(
        action.propID,
        // state.propertyList[propertyIndex]._id,
        action.propertyData.address,
        action.propertyData.owner,
        action.propertyData.email,
        action.propertyData.lockbox,
        action.propertyData.doorcode,
        action.propertyData.type,
        action.propertyData.description
      )
      const updatedPropertyList = [...state.propertyList];
      updatedPropertyList[propertyIndex] = updatedProperty;
      return {
        ...state,
        propertyList: updatedPropertyList
      }
  }
  return state;
}