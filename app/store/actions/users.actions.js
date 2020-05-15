import User from '../../models/users';

export const SET_USER = 'SET_USER';
export const SET_USERINFO = 'SET_USERINFO';
export const CREATE_USER = 'CREATE_USER';
export const EDIT_USER = 'EDIT_USER';
export const DELETE_USER = 'DELETE_USER';

export const fetchUsers = () => {
  return async (dispatch, getState) => {
    try {
      console.log('Fetch list of users');

      const response = await fetch('http://10.69.1.89:3030/user');
      if (!response.ok) {
        throw new Error('Something went wrong fetching users');
      }
      const resData = await response.json();
      const loadedUsers = [];

      for (const key in resData) {
        loadedUsers.push(
          new User(
            resData[key]._id,
            resData[key].email,
            resData[key].password,
            resData[key].name,
            resData[key].permission
          )
        );
      }

      console.log(
        `This is loadedUsers after resDATA : ${JSON.stringify(loadedUsers)}`
      );

      dispatch({ type: SET_USER, userData: loadedUsers });
    } catch (err) {
      throw err;
    }
  };
};
export const fetchUserInfo = (id) => {
  return async (dispatch, getState) => {
    try {
      console.log('Fetch userInfo');
      const response = await fetch(`http://10.69.1.89:3030/user/${id}`);
      if (!response.ok) {
        throw new Error('Something went wrong fetching user info');
      }
      const resData = await response.json();
      console.log(`This is userInfo : ${JSON.stringify(resData)}`);

      dispatch({ type: SET_USERINFO, userData: resData });
    } catch (err) {
      throw err;
    }
  };
};

export const createUser = (email, password, name, permission) => {
  return async (dispatch) => {
    const response = await fetch('http://10.69.1.89:3030/user/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        name: name,
        password:password,
        permission: permission,
      }),
    });
    const resData = await response.json();
    console.log(
      `This is the create new User data : ${JSON.stringify(resData)}`
    );
    dispatch({
      type: CREATE_USER,
      userData: {
        email,
        name,
        password,
        permission,
      },
    });
  };
};

export const deleteUser = (userID) => {
  return async (dispatch) => {
    const response = await fetch(`http://10.69.1.89:3030/user/${userID}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Something went wrong!');
    }
    dispatch({ type: DELETE_USER, userId: userID });
  };
};

export const editUser = (userID, email, name, permission) => {
  return async (dispatch) => {
  await fetch(`http://10.69.1.89:3030/user/edit/${userID}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,        
        name,
        permission,
      }),
    });
    // if (!response.ok) {
    //   throw new Error('Something went wrong updating User Info!');
    // }
    dispatch({
      type: EDIT_USER,
      userId: userID,
      userData: { email, name, permission },
    });
  };
};
