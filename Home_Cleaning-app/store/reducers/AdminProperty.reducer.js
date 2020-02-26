import { SET_PROPERTIES, REMOVE_PROPERTY, EDIT_PROPERTY, CREATE_PROPERTY } from '../actions/AdminProperty.actions';

const initialState = {
	propertyList: []
};

export default (state = initialState, action) => {
	switch (action.type) {
		case SET_PROPERTIES:
			return {
				propertyList: action.properties
			};
		case REMOVE_PROPERTY:
			return {
				...state,
				propertyList: state.propertyList.filter((property) => property.id !== action.propID)
			};
	}
	return state;
};
