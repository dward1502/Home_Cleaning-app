import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Button, Alert, ActivityIndicator, TouchableHighlight } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import * as userActions from '../../store/actions/users.actions';

import Colors from '../../constants/Colors';

const AdminEmployeeScreen = (props) => {
	const [ isLoadingUsers, setIsLoadingUsers ] = useState(false);
	const [ isRefreshing, setIsRefreshing ] = useState(false);
	const [isUserInfoLoading, setUserInfo] = useState(false);
	const [userId, setUserId] = useState('');

	const [ error, setError ] = useState(false);
	const userList = useSelector((state) => state.users.userList);
	const userInfo = useSelector((state) => state.users.userInfo);

	const dispatch = useDispatch();

	const loadUsers = useCallback(
		async () => {
			setError(null);
			setIsRefreshing(true);
			try {
				await dispatch(userActions.fetchUsers());
				console.log('Fetching users dispatch');
			} catch (err) {
				setError(err.message);
			}
			setIsRefreshing(false)
		},
		[ dispatch, setIsLoadingUsers, setError ]
	);

	useEffect(
		() => {
			console.log('Initiate loading Users');
			setIsLoadingUsers(true);
			loadUsers().then(() => {
				setIsLoadingUsers(false);
			});
		},
		[ dispatch, loadUsers ]
	);

	const selectedUserHandler = (id) => {
		console.log(`Item has been press id : ${id}`);
		setUserId(id)

	}

	if (error) {
		<View style={styles.centered}>
			<Text style={styles.text}>An error occured!</Text>
			<Button title='Try Again' onPress={loadUsers} color={Colors.primaryDark} />
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
				<Text style={styles.text}>No properties found. Maybe start adding some!</Text>
				<View style={styles.buttonContainer}>
					<Button title='Add New User' color={Colors.secondary} onPress={addUserHandler} />
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
		props.navigation.navigate('EditUsers', {userID:id})
	};
	const deleteHandler = (id) => {
		console.log('delete user');	
		Alert.alert('Are you sure?', 'Do you really want to delete this user?', [
			{text:'No', style:'default'},
			{
				text:'Yes',
				style:'destructive',
				onPress:()=> {
					dispatch(userActions.deleteUser(id));
				}
			}
		])
	};

	return (
		<View style={styles.screen}>
			<View style={styles.userContainer}>
				<FlatList
					onRefresh={loadUsers}
					refreshing={isRefreshing}
					data={userList}
					keyExtractor={(item) => item.id}
					renderItem={(itemData) => (
						<TouchableHighlight underlayColor='black' onPress={selectedUserHandler(itemData.item.id)}>
							<Text style={styles.text}>{itemData.item.email}</Text>
						</TouchableHighlight>
					)}
				/>
			</View>
			<View style={styles.buttonBox}>
				<View style={styles.buttonContainer}>
					<Button title='CREATE USER' color={Colors.secondary} onPress={addUserHandler} />
				</View>
				<View style={styles.buttonContainer}>
					<Button title='EDIT USER' color={Colors.secondary} onPress={()=>{editUserHandler('5eabac13ee25bf1c9c0dc067')}} />
				</View>
				<View style={styles.buttonContainer}>
					<Button title='DELETE USER' color={Colors.darkRed} onPress={()=>{deleteHandler('5e62e776ead3800e40c1c894')}}  />
				</View>
			</View>
			<View style={styles.userInfoBox}>
				<View><Text>User email</Text></View>
				<View><Text>User hours</Text></View>
				<View></View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		alignItems: 'center'
	},
	userContainer: {
		width: '60%',
		height: '20%',
		padding: 20,
		backgroundColor: Colors.lightGrey
	},
	buttonBox: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 20
	},
	buttonContainer: {
		backgroundColor: Colors.primary,
		borderRadius: 15,
		padding: 8,
		width: 200,
		marginTop: 20,
		fontFamily: 'montserat-bold'
	},
	centered: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	text: {
		fontFamily: 'montserat',
		color: Colors.text,
		fontSize: 16
	}
});

export default AdminEmployeeScreen;
