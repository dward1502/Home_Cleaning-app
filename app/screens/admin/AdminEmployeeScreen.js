import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Button, Alert, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import * as userActions from '../../store/actions/users.actions';

import Colors from '../../constants/Colors';

const AdminEmployeeScreen = (props) => {
	const [ isLoadingUsers, setIsLoadingUsers ] = useState(false);
	const [ isRefreshing, setIsRefreshing ] = useState(false);
	const [ error, setError ] = useState(false);
	const userList = useSelector((state) => state.users.userList);

	const dispatch = useDispatch();

	const loadUsers = useCallback(
		async () => {
			setError(null);
			// setIsRefreshing(true);
			try {
				await dispatch(userActions.fetchUsers());
				console.log('Fetching users dispatch');
			} catch (err) {
				setError(err.message);
			}
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
	const deleteHandler = () => {
		console.log('delete user');
	};
	const editUserHandler = () => {
		console.log('edit user');
	};

	return (
		<View style={styles.screen}>
			<Text>This is AdminEmployeeScreen</Text>
			<View style={styles.userContainer}>
				<FlatList
					// onRefresh={loadUsers}
					// refreshing={isRefreshing}
					data={userList}
					keyExtractor={(item) => item.id}
					renderItem={(itemData) => (
						<View>
							<Text style={styles.text}>{itemData.item.email}</Text>
						</View>
					)}
				/>
			</View>
			<View style={styles.buttonBox}>
				<View style={styles.buttonContainer}>
					<Button title='CREATE USER' color={Colors.secondary} onPress={addUserHandler} />
				</View>
				<View style={styles.buttonContainer}>
					<Button title='EDIT USER' color={Colors.secondary} onPress={editUserHandler} />
				</View>
				<View style={styles.buttonContainer}>
					<Button title='DELETE USER' color={Colors.darkRed} onPress={deleteHandler} />
				</View>
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
		fontSize: 20
	}
});

export default AdminEmployeeScreen;
