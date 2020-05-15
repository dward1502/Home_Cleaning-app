import Property from '../../models/properties';

export const SET_PROPERTIES = 'SET_PROPERTIES';
export const CREATE_PROPERTY = 'CREATE_PROPERTY';
export const EDIT_PROPERTY = 'EDIT_PROPERTY';
export const REMOVE_PROPERTY = 'REMOVE_PROPERTY'

export const fetchProperties = () => {
	return async (dispatch, getState) => {
		try {
			console.log('Fetch list of properties');

			const response = await fetch('http://10.69.1.89:3030/properties');
			if (!response.ok) {
				throw new Error('Something went wrong fetching properties');
			}
			const resData = await response.json();
			const loadedProperties = [];

			for (const key in resData) {
				loadedProperties.push(
					new Property(
						// key,
						resData[key]._id,
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
			// console.log(`Loaded properties array${JSON.stringify(loadedProperties)}`);

			dispatch({ type: SET_PROPERTIES, properties: loadedProperties });
		} catch (error) {
			throw error;
		}
	};
};


export const createProperty = (address, owner, email, lockbox, doorcode, type, description, cleaner1, cleaner2,cleaner3,cleaner4) => {

	const duties = [{id:"Cleaner 1",task:cleaner1},{id:'Cleaner 2',task:cleaner2},{id:'Cleaner 3',task:cleaner3},{id:'Cleaner 4',task:cleaner4}]
	console.log(JSON.stringify(duties));

	function makeTemplate(string){ 
		var array = string.split(',')
		const iterator = array.values()
		let obj ={}
		for (const key of iterator){
			obj = {
				...obj,
				[key]: false
			}

		}	
		console.log(obj);	
		return obj;
	}

	const createTemplateArr = (cleaner1,cleaner2,cleaner3,cleaner4) => {
		let templateArray = [];
		let cleaner1Arr = makeTemplate(cleaner1);
		let cleaner2Arr = makeTemplate(cleaner2);
		let cleaner3Arr = makeTemplate(cleaner3);
		let cleaner4Arr = makeTemplate(cleaner4);

		templateArray.push(cleaner1Arr)
		templateArray.push(cleaner2Arr)
		templateArray.push(cleaner3Arr)
		templateArray.push(cleaner4Arr)

		console.log(JSON.stringify(templateArray));
		return templateArray;

	}

	const template = createTemplateArr(cleaner1,cleaner2,cleaner3,cleaner4)

	return async (dispatch) => {
		const response = await fetch('http://10.69.1.89:3030/properties', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				address: address,
				owner:owner,
				email:email,
				lockbox:lockbox,
				doorcode:doorcode,
				type:type,
				description:description,
				duties:duties,
				template:template
			})
		});
		const resData = await response.json();
		console.log(`This is the create property data : ${JSON.stringify(resData)}`);
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

export const editProperty = (propertyID, address, owner, email, lockbox, doorcode, type, description) => {
	return async (dispatch) => {
		const response = await fetch(`http://10.69.1.89:3030/properties/${propertyID}`, {
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
				description
			})
		});
		if (!response.ok) {
			throw new Error('Something went wrong updating property!');
		}
		dispatch({
			type: EDIT_PROPERTY,
			propID: propertyID,
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

export const deleteProperty = (propertyID) => {
	return async (dispatch) => {
		const response = await fetch(`http://10.69.1.89:3030/properties/${propertyID}`, {
			method:"DELETE"
		})
		if(!response.ok) {
			throw new Error('Something went wrong!')
		}
		dispatch({type: REMOVE_PROPERTY, propID: propertyID})
	}
}
