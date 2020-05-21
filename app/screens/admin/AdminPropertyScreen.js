import React, { useState, useEffect, useCallback } from 'react';
import {
	View,
	Text,
	StyleSheet,
	FlatList,
	Button,
	ActivityIndicator
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import Colors from '../../constants/Colors';
import * as propertyActions from '../../store/actions/property.actions';
import PropertyItem from '../../components/AdminPropertyItem';

const AdminPropertyScreen = props => {
	const [isLoading, setIsLoading] = useState(false);
	const [isRefreshing, setIsRefreshing] = useState(false);
	const [error, setError] = useState(false);
	const [layoutWidth, setLayoutWidth] = useState();
	const properties = useSelector(state => state.properties.propertyList);

	const dispatch = useDispatch();

	const loadProperties = useCallback(async () => {
		setError(null);
		setIsRefreshing(true);
		try {
			await dispatch(propertyActions.fetchProperties());
			console.log('Fetched properties');
		} catch (err) {
			setError(err.message);
		}
		setIsRefreshing(false);
	}, [dispatch, setIsLoading, setError]);

	useEffect(() => {
		console.log('Initiate laoding properties');
		setIsLoading(true);
		loadProperties().then(() => {
			setIsLoading(false);
		});
	}, [dispatch, loadProperties]);

	const selectPropertyHandler = id => {
		// console.log(`Selected property with ID: ${id}`);
		props.navigation.navigate('PropertyDetail', {
			propertyID: id
		});
	};
	const addPropertyHandler = () => {
		console.log('add property button')
		props.navigation.navigate('EditProperty');
	};

	if (error) {
		<View style={styles.centered}>
			<Text style={styles.text}>An error occured!</Text>
			<Button
				title='Try Again'
				onPress={loadProperties}
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
	if (!isLoading && properties.length === 0) {
		return (
			<View style={styles.centered}>
				<Text style={styles.text}>
					No properties found. Maybe start adding some!
				</Text>
				<View style={styles.buttonContainer}>
					<Button
						title='Add New Property'
						color={Colors.secondary}
						onPress={()=>addPropertyHandler()}
					/>
				</View>
			</View>
		);
	}

	const onLayout = event => {
		const { width } = event.nativeEvent.layout;
		const itemWidth = 200;
		const numColumns = Math.floor(width / itemWidth);
		setLayoutWidth(numColumns);
	};

	

	return (
		<View style={styles.screen}>
			<View style={styles.propertiesContainer} onLayout={onLayout}>
				<FlatList
					onRefresh={loadProperties}
					refreshing={isRefreshing}
					horizontal={false}
					numColumns={layoutWidth}
					key={layoutWidth}
					data={properties}
					keyExtractor={item => item.id}
					renderItem={itemData => (
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
				<Button
					title='Add New Property'
					color={Colors.secondary}
					onPress={addPropertyHandler}
				/>
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
	text: {
		fontFamily: 'montserat',
		color: Colors.text,
		fontSize: 20
	},
	buttonContainer: {
		backgroundColor: Colors.primary,
		borderRadius: 15,
		padding: 8,
		width: 300,
		marginTop: 20,
		fontFamily: 'montserat-bold'
	},
	propertiesContainer: {
		width: '95%',
		height: '85%',
		margin: 20,
		padding:25,
		alignItems: 'center',
		backgroundColor: Colors.ghostWhite,
		shadowColor: 'black',
		shadowOpacity: 0.26,
		shadowOffset: { width: 0, height: 2 },
		shadowRadius: 8,
		elevation: 5,
		borderRadius: 10
	}
});

export default AdminPropertyScreen;
