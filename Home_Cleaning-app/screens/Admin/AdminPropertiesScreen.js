import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, Button, ActivityIndicator, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import PropertyItem from '../../components/AdminPropertyItem';
import Colors from '../../constants/Colors';
import * as propertyActions from '../../store/actions/AdminProperty.actions';

const AdminPropertiesScreen = (props) => {
	const properties = useSelector((state) => state.properties.propertyList);
	// console.log(JSON.stringify(properties));
	const [ isLoading, setIsLoading ] = useState(false);
	const [ error, setError ] = useState(false);
	const [ layoutWidth, setLayoutWidth ] = useState();

	const dispatch = useDispatch();

	const loadProperties = useCallback(
		async () => {
			setError(null);
			try {
				await dispatch(propertyActions.fetchProducts());
				console.log('grabbed property');
			} catch (err) {
				setError(err.message);
			}
		},
		[ dispatch, setIsLoading, setError ]
	);

	useEffect(
		() => {
			console.log('Initiate loading properties');
			setIsLoading(true);
			loadProperties().then(() => {
				setIsLoading(false);
			});
		},
		[ dispatch, loadProperties ]
	);

	const selectPropertyHandler = (id, address) => {
		props.navigation.navigate('PropertyDetail', {
			propertyId: id,
			propertyAddress: address
		});
	};

	if (error) {
		<View style={styles.centered}>
			<Text>An error occured!</Text>
			<Button title='Try again' onPress={loadProperties} color={Colors.secondary} />
		</View>;
	}
	if (isLoading) {
		return (
			<View style={styles.centered}>
				<ActivityIndicator size='large' color={Colors.primary} />
			</View>
		);
	}
	if (!isLoading && properties.length === 0) {
		return (
			<View style={styles.centered}>
				<Text>No properties found. Maybe start adding some!</Text>
				<View style={styles.buttonContainer}>
				<Button title='Add New Property' color={Colors.secondary} onPress={addPropertyHandler} />
			</View>
			</View>
		);
	}

	onLayout = (event) => {
		const { width } = event.nativeEvent.layout;
		const itemWidth = 200;
		const numColumns = Math.floor(width / itemWidth);
		setLayoutWidth(numColumns);
	};

	const addPropertyHandler = () => {
		console.log('Add new property screen');
		props.navigation.navigate('EditProperty')
	}

	return (
		<View style={styles.screen}>
			<View style={styles.propertiesContainer} onLayout={onLayout}>
				<FlatList
					horizontal={false}
					numColumns={layoutWidth}
					key={layoutWidth}
					data={properties}
					keyExtractor={(item) => item.id}
					renderItem={(itemData) => (
						<PropertyItem
							address={itemData.item.address}
							owner={itemData.item.owner}
							onSelect={() => {
								selectPropertyHandler(itemData.item.id, itemData.item.address);
							}}
						/>
					)}
				/>
			</View>
			<View style={styles.buttonContainer}>
				<Button title='Add New Property' color={Colors.secondary} onPress={addPropertyHandler} />
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		alignItems: 'center'
	},
	centered: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	propertiesContainer: {
		width: '95%',
		height: '85%',
		margin: 20,
		alignItems: 'center',
		backgroundColor: Colors.grey,
		shadowColor: 'black',
		shadowOpacity: 0.26,
		shadowOffset: { width: 0, height: 2 },
		shadowRadius: 8,
		elevation: 5,
		borderRadius: 10
	},
	buttonContainer: {
		backgroundColor: Colors.primary,
		borderRadius: 15,
		padding: 8,
		width: 300,
		marginTop: 20
	}
});

export default AdminPropertiesScreen;
