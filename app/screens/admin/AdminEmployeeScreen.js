import React, { useState, useCallback, useEffect } from 'react';
import {
	View,
	Text,
	StyleSheet,
	FlatList,
	Button,
	Alert,
	ActivityIndicator
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import * as userActions from '../../store/actions/users.actions';

import Colors from '../../constants/Colors';

const AdminEmployeeScreen = props => {
	const dispatch = useDispatch();
	const [isLoading, setIsLoading] = useState(false);
	const [isRefreshing, setIsRefreshing] = useState(false);
	const [error, setError] = useState(false);
	const users = useSelector(state => state.users.userList);
	const usertest = 'awatafaf'

	const loadUsers = useCallback(async () => {
		setError(null);
		setIsRefreshing(true);
		try {
			await dispatch(userActions.fetchUsers());
			console.log('Fetched Users');
		} catch (err) {
			setError(err.message);
		}
	}, [dispatch, setIsLoading, setError]);

	useEffect(() => {
		console.log('Initiate loading Users');
		setIsLoading(true);
		loadUsers().then(() => {
			setIsLoading(false);
		});
	}, [dispatch, loadUsers]);

	const addUserHandler = () => {
		props.navigation.navigate('EditUsers');
	};

	const editUserHandler = id => {
		props.navigation.navigate('EditUsers', { userID: id });
	};

	const deleteHandler = id => {
		Alert.alert(
			'Are you sure?',
			'Do you really want to delete this user?'[
				({ text: 'No', style: 'default' },
				{
					text: 'Yes',
					style: 'destructive',
					onPress: () => {
						dispatch(propertActions.deleteProperty(id));
					}
				})
			]
		);
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
	if (isLoading) {
		return (
			<View style={styles.centered}>
				<ActivityIndicator size='large' color={Colors.secondary} />
			</View>
		);
	}
	if (!isLoading && users.length === 0) {
		console.log(users.length);
		return (
			<View style={styles.centered}>
				<Text style={styles.text}>
					No Users found. Maybe start adding some!
				</Text>
				<View style={styles.buttonContainer}>
					<Button
						title='Add User'
						color={Colors.secondary}
						onPress={addUserHandler}
					/>
					<Button
				title='Try Again'
				onPress={loadUsers}
				color={Colors.primaryDark}
			/>
				</View>
			</View>
		);
	}

	return (
		
		<View style={styles.screen}>
			<Text>This is AdminEmployeeScreen</Text>
			<View style={styles.userContainer}>
				<FlatList
					onRefresh={loadUsers}
					refreshing={isRefreshing}
					data={users}
					keyExtractor={item => item.id}
					renderItem={itemData => <View>{itemData.item.name}</View>}
				/>
			</View>
			<View style={styles.buttonBox}>
				<View style={styles.buttonContainer}>
					<Button
						title='CREATE USER'
						color={Colors.secondary}
						onPress={addUserHandler}
					/>
				</View>
				<View style={styles.buttonContainer}>
					<Button
						title='EDIT USER'
						color={Colors.secondary}
						onPress={editUserHandler}
					/>
				</View>
				<View style={styles.buttonContainer}>
					<Button
						title='DELETE USER'
						color={Colors.darkRed}
						onPress={deleteHandler}
					/>
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
	userContainer: {},
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
