import React, { useState, useCallback, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Button,
  Alert,
  ActivityIndicator,
  TouchableHighlight,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import * as userActions from '../../store/actions/users.actions';

import Colors from '../../constants/Colors';

const AdminEmployeeScreen = (props) => {
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isUserInfoLoaded, setUserInfo] = useState(false);
  const [userId, setUserId] = useState('');

  const [error, setError] = useState(false);
  const userList = useSelector((state) => state.users.userList);
  const userInfo = useSelector((state) => state.users.userInfo);

  const dispatch = useDispatch();

  const loadUsers = useCallback(async () => {
    setError(null);
    setIsRefreshing(true);
    try {
      await dispatch(userActions.fetchUsers());
      console.log('Fetching users dispatch');
    } catch (err) {
      setError(err.message);
    }
    setIsRefreshing(false);
  }, [dispatch, setIsLoadingUsers, setError]);

  useEffect(() => {
    console.log('Initiate loading Users');
    setIsLoadingUsers(true);
    loadUsers().then(() => {
      setIsLoadingUsers(false);
    });
  }, [dispatch, loadUsers]);

  const loadUserInfo = useCallback(
    async (id) => {
      setError(null);
      try {
        await dispatch(userActions.fetchUserInfo(id));
        console.log('Fetching specific User Info');
      } catch (err) {
        setError(err.message);
      }
    },
    [userId, setError]
  );

  const selectedUserHandler = (id) => {
    console.log(`Item has been press id : ${id}`);
    setUserId(id);
    loadUserInfo(id);
    setUserInfo(true);
  };

  if (error) {
    <View style={styles.centered}>
      <Text style={styles.text}>An error occured!</Text>
      <Button
        title='Try Again'
        onPress={loadUsers}
        color={Colors.primaryDark}
      />
    </View>;
  }
  if (isLoadingUsers) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size='large' color={Colors.secondary} />
      </View>
    );
  }
  if (!isLoadingUsers && userList.length === 0) {
    return (
      <View style={styles.centered}>
        <Text style={styles.text}>
          No properties found. Maybe start adding some!
        </Text>
        <View style={styles.buttonContainer}>
          <Button
            title='Add New User'
            color={Colors.secondary}
            onPress={addUserHandler}
          />
        </View>
      </View>
    );
  }

  const addUserHandler = () => {
    console.log('add new user');
    props.navigation.navigate('EditUsers');
  };
  const editUserHandler = (id) => {
    console.log('edit user');
    props.navigation.navigate('EditUsers', { userID: id });
  };
  const deleteHandler = (id) => {
    console.log('delete user');
    Alert.alert('Are you sure?', 'Do you really want to delete this user?', [
      { text: 'No', style: 'default' },
      {
        text: 'Yes',
        style: 'destructive',
        onPress: () => {
          dispatch(userActions.deleteUser(id));
        },
      },
    ]);
  };

  const userTextDisplay = (
    <View>
      <Text>No user has been selected</Text>
    </View>
  );

  let userInfoDisplay;

  if (Object.keys(userInfo).length === 0 && userInfo.constructor === Object) {
    console.log('userInfo is empty');
  } else {
    return (userInfoDisplay = (
      <View style={styles.screen}>
        <View style={styles.userContainer}>
          <FlatList
            onRefresh={loadUsers}
            refreshing={isRefreshing}
            data={userList}
            keyExtractor={(item) => item.id}
            renderItem={(itemData) => (
              <TouchableHighlight
                underlayColor='black'
                onPress={() => selectedUserHandler(itemData.item.id)}
              >
                <Text style={styles.textUserList}>{itemData.item.name}</Text>
              </TouchableHighlight>
            )}
          />
        </View>
        <View style={styles.buttonBox}>
          <View style={styles.buttonContainer}>
            <Button
              title='CREATE USER'
              color={Colors.lightTan}
              onPress={addUserHandler}
            />
          </View>
          <View style={[styles.buttonContainer, styles.btnEdit]}>
            <Button
              title='EDIT USER'
              color={Colors.lightTan}
              onPress={() => {
                editUserHandler(userId);
              }}
            />
          </View>
          <View style={[styles.buttonContainer,styles.btnRed]}>
            <Button
              title='DELETE USER'
              color={Colors.lightTan}
              onPress={() => {
                deleteHandler(userId);
              }}
            />
          </View>
        </View>
        <View style={styles.userInfoContainer}>
          <View style={styles.userInfoBox}>
            <View style={styles.userInfoBoxL}>
              <Text style={styles.userInfoTextTitle}>User name</Text>
              <Text>{userInfo.data.name}</Text>
            </View>

            <View style={styles.userInfoBoxR}>
              <Text style={styles.userInfoTextTitle}>User email</Text>
              <Text>{userInfo.data.email}</Text>
            </View>
          </View>
          <View style={styles.userInfoBox}>
            <View style={styles.userInfoBoxL}>
              <Text style={styles.userInfoTextTitle}>User hrs for week</Text>
              <Text>20</Text>
            </View>
            <View style={styles.userInfoBoxR}>
              <Text style={styles.userInfoTextTitle}>Total hrs</Text>
              <Text>100</Text>
            </View>
          </View>
        </View>
      </View>
    ));
  }

  return (
    <View style={styles.screen}>
      <View style={styles.userContainer}>
        <FlatList
          onRefresh={loadUsers}
          refreshing={isRefreshing}
          data={userList}
          keyExtractor={(item) => item.id}
          renderItem={(itemData) => (
            <TouchableHighlight
              underlayColor='black'
              onPress={() => selectedUserHandler(itemData.item.id)}
            >
              <Text style={styles.textUserList}>{itemData.item.name}</Text>
            </TouchableHighlight>
          )}
        />
      </View>
      <View style={styles.buttonBox}>
        <View style={styles.buttonContainer}>
          <Button
            title='CREATE USER'
            color={Colors.lightTan}
            onPress={addUserHandler}
          />
        </View>
        <View style={[styles.buttonContainer, styles.btnEdit]}>
          <Button
            title='EDIT USER'
            color={Colors.lightTan}
            onPress={() => {
              editUserHandler(userId);
            }}
          />
        </View>
        <View style={[styles.buttonContainer,styles.btnRed]}>
          <Button
            title='DELETE USER'
            color={Colors.lightTan}
            onPress={() => {
              deleteHandler(userId);
            }}
          />
        </View>
      </View>
      <View>{isUserInfoLoaded ? userInfoDisplay : userTextDisplay}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
  },
  userContainer: {
    width: '60%',
    height: '20%',
    padding: 20,
    marginTop: 80,
    backgroundColor: Colors.ghostWhite,
    shadowColor: 'black',
		shadowOpacity: 0.26,
		shadowOffset: { width: 0, height: 2 },
		shadowRadius: 8,
  },
  buttonBox: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonContainer: {
    backgroundColor: Colors.primary,
    borderRadius: 15,
    padding: 8,
    width: 175,
    marginTop: 20,
    marginBottom: 40,
    marginRight: 15,
    fontFamily: 'montserat-bold',
  },
  userInfoContainer: {
    backgroundColor: Colors.primaryDark,
    borderRadius: 15,
    padding: 10,
    width: '60%',
    height: 300,
  },
  userInfoBox:{
    width:'100%',
    height:100,
    padding:10,
    marginBottom: 15,
    flexDirection:'row',
    backgroundColor:'white'
  },
  userInfoBoxL:{
    flex:1,
  },
  userInfoBoxR:{
    flex:1
  },
  userInfoTextTitle: {
    fontFamily:'montserat-bold',
    fontSize:20,
    marginBottom:20,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textUserList: {
    fontFamily: 'montserat-bold',
    color: Colors.text,
    fontSize: 18,
  },
  text:{
    fontFamily: 'montserat',
    color: Colors.text,
    fontSize: 16,
  },
  btnRed:{
    backgroundColor:Colors.darkRed
  },
  btnEdit:{
    backgroundColor: Colors.secondary
  }
});

export default AdminEmployeeScreen;
