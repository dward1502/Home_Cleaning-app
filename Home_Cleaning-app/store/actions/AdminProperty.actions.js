import Property from '../../models/properties';

export const SET_PROPERTIES = 'SET_PROPERTIES';
export const EDIT_PROPERTY = 'EDIT_PROPERTY';
export const REMOVE_PROPERTY = 'REMOVE_PROPERTY';
export const CREATE_PROPERTY = 'CREATE_PROPERTY';

export const fetchProducts = () => {
	return async (dispatch, getState) => {
		try {
			console.log('Fetch list of properties');
			const response = await fetch('https://sdhos-cleaning-app.firebaseio.com/properties.json');
			if (!response.ok) {
				throw new Error('Something went wrong!');
			}
			const resData = await response.json();
			const loadedProperties = [];

			for (const key in resData) {
				console.log(`${key}`);
				loadedProperties.push(
					new Property(
						key,
						// resData[key].id,
						resData[key].address,
						resData[key].owner,
						resData[key].email,
						resData[key].lockbox,
						resData[key].doorcode,
						resData[key].type,
						resData[key].description,
						resData[key].duties
					)
				);
			}
			console.log(`Loaded properties array${JSON.stringify(loadedProperties)}`);
			dispatch({
				type: SET_PROPERTIES,
				properties: loadedProperties
			});
		} catch (err) {
			throw err;
		}
	};
};

export const createProperty = (address, owner, email, lockbox, doorcode, type, description, duties) => {
	return async (dispatch, getState) => {
		const response = await fetch('https://sdhos-cleaning-app.firebaseio.com/properties.json', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				address,
				owner,
				email,
				lockbox,
				doorcode,
				type,
				description
			})
		});

		const resData = await response.json();
		console.log(`This is create property data : ${resData}`);
		dispatch({
			type: CREATE_PROPERTY,
			propertyData: {
				address,
				owner,
				email,
				lockbox,
				doorcode,
				type,
				description
			}
		});
	};
};

export const editProperty = (propertyId, address, owner, email, lockbox, doorcode, type, description, duties) => {
	return async (dispatch, getState) => {
		const response = await fetch(`https://sdhos-cleaning-app.firebaseio.com/properties/${propertyId}.json`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				address,
				owner,
				email,
				lockbox,
				doorcode,
				type,
				description,
				duties
			})
		});
		if (!response.ok) {
			throw new Error('Something went wrong updating property!');
		}
		dispatch({
			type: EDIT_PROPERTY,
			propID: propertyId,
			propertyData: {
				address,
				owner,
				email,
				lockbox,
				doorcode,
				type,
				description,
				duties
			}
		});
	};
};

export const deleteProperty = (propertyId) => {
	return async (dispatch, getState) => {
		const response = await fetch(`https://sdhos-cleaning-app.firebaseio.com/properties/${propertyId}.json`, {
			method: 'DELETE'
		});
		if (!response.ok) {
			throw new Error('Something went wrong!');
		}
		dispatch({ type: REMOVE_PROPERTY, propID: propertyId });
	};
};
