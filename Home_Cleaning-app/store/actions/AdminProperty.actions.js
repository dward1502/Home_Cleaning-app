import Property from '../../models/properties';

export const SET_PROPERTIES = 'SET_PROPERTIES';

export const fetchProducts = () => {
	return async (dispatch, getState) => {
		try {
      console.log('Fetch list of properties');
			const response = await fetch('https://sdhos-cleaning-app.firebaseio.com/properties.json');
			if (!response.ok) {
				throw new Error('Something went wrong!');
			}
			const resData = await response.json();
			// console.log(`This is response data ${JSON.stringify(resData)}`);
			const loadedProperties = [];

			for (const key in resData) {
				loadedProperties.push(
					new Property(resData[key].id, resData[key].address, resData[key].owner)
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
