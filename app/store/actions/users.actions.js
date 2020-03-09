import User from '../../models/users';

export const SET_USER = 'SET_USER';

export const fetchUsers = () => {
	return async (dispatch, getState) => {
		try {
			console.log('Fetch list of users');

			const response = await fetch('http://10.69.1.89:3030/user');
			if(!response.ok) {
				throw new Error('Something went wrong fetching users')
			}
			const resData = await response.json()
			const loadedUsers = [];

			for(const key in resData) {
				loadedUsers.push(
					new User(
						resData[key]._id,
						resData[key].email,
						resData[key].password,
						resData[key].name,
						resData[key].permission,
					)
				)
			}

			console.log(`This is loadedUsers after resDATA : ${JSON.stringify(loadedUsers)}`);


			dispatch({type:SET_USER, userData: loadedUsers})

		} catch(err) {
			throw err
		}
	}
}