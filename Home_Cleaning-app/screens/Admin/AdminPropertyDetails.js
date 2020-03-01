import React from 'react';
import { View, Text, StyleSheet, FlatList, Button, Alert } from 'react-native';

import { useSelector, useDispatch } from 'react-redux';
import * as propertyActions from '../../../store/actions/AdminProperty.actions';

import Colors from '../../constants/Colors';

const AdminPropertyDetails = (props) => {
	const dispatch = useDispatch();
	const propertyId = props.navigation.getParam('propertyId');

	const selectedProperty = useSelector((state) =>
		state.properties.propertyList.find((property) => property.id === propertyId)
	);
	// console.log(`Selected property details ${JSON.stringify(selectedProperty)}`);

	const editPropertyHandler = (id) => {
		props.navigation.navigate('EditProperty', { propertyId: id });
	};

	const deleteHandler = (id) => {
		Alert.alert('Are you sure?', 'Do you really want to delete this property?', [
			{ text: 'No', style: 'default' },
			{
				text: 'Yes',
				style: 'destructive',
				onPress: () => {
					dispatch(propertyActions.deleteProperty(id));
				}
			}
		]);
	};

	return (
		<View style={styles.screen}>
			<View style={styles.container}>
				<View style={styles.propInfoContainer}>
					<View style={styles.information}>
						<Text style={styles.text}>{selectedProperty.address}</Text>
						<Text style={styles.text}>Owner : {selectedProperty.owner}</Text>
						<Text style={styles.text}>Email : {selectedProperty.email}</Text>
						<Text style={styles.text}>Type : {selectedProperty.type}</Text>
						<Text style={styles.text}>Lockbox : {selectedProperty.lockbox}</Text>
						<Text style={styles.text}>Doorcode : {selectedProperty.doorcode}</Text>
						{Object.keys(selectedProperty.duties).map((keyName, i) => (
							<Text key={i}>Cleaner : {selectedProperty.duties[keyName]}</Text>
						))}
					</View>
					<View style={styles.description}>
						<Text style={styles.text}>Property Details</Text>
						<Text>Description : {selectedProperty.description}</Text>
					</View>
				</View>
				<View style={styles.checklistContainer} />
				{/* <Text>Property Detail page</Text> */}
			</View>

			<View style={styles.buttonContainer}>
				<View style={styles.button}>
					<Button
						title='EDIT'
						color={Colors.secondary}
						onPress={() => {
							editPropertyHandler(propertyId);
						}}
					/>
				</View>
				<View style={styles.button}>
					<Button title='REMOVE' color={Colors.secondary} onPress={deleteHandler.bind(this, propertyId)} />
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
	container: {
		width: '95%',
		height: '80%',
		margin: 20,
		padding: 20,
		flexDirection: 'row',
		backgroundColor: Colors.grey,
		shadowColor: 'black',
		shadowOpacity: 0.26,
		shadowOffset: { width: 0, height: 2 },
		shadowRadius: 8,
		elevation: 5,
		borderRadius: 10
	},
	buttonContainer: {
		flexDirection: 'row'
	},
	button: {
		backgroundColor: Colors.primary,
		borderRadius: 15,
		padding: 8,
		width: 300,
		margin: 10
	},
	propInfoContainer: {
		backgroundColor: '#fff',
		width: '60%',
		height: '95%',
		borderRadius: 15,
		padding: 20,
		flexDirection: 'column',
		shadowColor: 'black',
		shadowOpacity: 0.26,
		shadowOffset: { width: 0, height: 2 },
		shadowRadius: 8,
		elevation: 5,
		borderRadius: 10
	},
	information: {
		padding: 10,
		height: '60%',
		backgroundColor: '#ccc'
	},
	description: {
		marginTop: 25,
		padding: 10,
		height: '35%',
		backgroundColor: '#ccc'
	},
	checklistContainer: {
		backgroundColor: '#fff',
		width: '35%',
		height: '95%',
		marginLeft: 20,
		borderRadius: 15,
		shadowColor: 'black',
		shadowOpacity: 0.26,
		shadowOffset: { width: 0, height: 2 },
		shadowRadius: 8,
		elevation: 5,
		borderRadius: 10
	},
	text: {
		fontSize: 20
	}
});

export default AdminPropertyDetails;
