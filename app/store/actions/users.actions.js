import Users from '../../models/users';

export const SET_USERS = 'SET_USERS';
export const CREATE_USER = 'CREATE_USER';
export const EDIT_USER = 'EDIT_USER';
export const DELETE_USER = 'DELETE_USER';

export const fetchUsers = () => {
	return async dispatch => {
		try {
			console.log('Fetching list of users');

			const response = await fetch('http://e471e425.ngrok.io/user');
			if (!response.ok) {
				throw new Error('Something went wrong fetching users');
			}
			const resData = await response.json();
			console.log(resData.data);
			const loadedUsers = [];
			for (const key in resData.data) {
				loadedUsers.push(
					new Users(
						key,
						resData.data[key]._id,
						resData.data[key].email,
						resData.data[key].password,
						resData.data[key].name,
						resData.data[key].permission,
						resData.data[key].hours,
						// resData.data[key].completedChecklist
					)
				);
			}
			console.log(`Loaded Users ${JSON.stringify(loadedUsers)}`);

			dispatch({ type: SET_USERS, users: loadedUsers });
		} catch (err) {
			throw err;
		}
	};
};

export const createUser = (email, password, name, permission) => {
	return async dispatch => {
		console.log('Creating a user');
		const response = await fetch('http://e471e425.ngrok.io/user/signup', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				email: email,
				password: password,
				name: name,
				permission: permission
			})
		});
		const resData = await response.json();
		dispatch({
			type: CREATE_USER,
			userData: {
				email,
				password,
				name,
				permission
			}
		});
	};
};
