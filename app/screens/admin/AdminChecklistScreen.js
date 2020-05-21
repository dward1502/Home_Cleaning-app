import React, {useState,useEffect,useCallback} from 'react';
import { View, Text, StyleSheet,FlatList,ActivityIndicator } from 'react-native';
import {useDispatch,useSelector} from 'react-redux'
import  Colors  from '../../constants/Colors'
import * as propertyActions from '../../store/actions/property.actions'
import PropertyItem from '../../components/AdminPropertyItem'

const AdminChecklistScreen = (props) => {
	const [isLoading, setIsLoading] = useState(false)
	const [isRefreshing,setIsRefreshing] = useState(false)
	const [error, setError] = useState(false)
	const [layoutWidth, setLayoutWidth] = useState();
	const propertyInfo = useSelector(state => state.properties.propertyList)
	const dispatch = useDispatch()

	const loadProperties = useCallback(async () => {
		setError(null)
		setIsRefreshing(true)
		try {
			await dispatch(propertyActions.fetchProperties())
		} catch (err) {
			setError(err.message)
		}
	},[dispatch,setIsLoading,setError])

	useEffect(()=> {
		setIsLoading(true)
		loadProperties().then(()=> {
			setIsLoading(false)
		})
	},[dispatch,loadProperties])

	if(isLoading) {
		return (
			<View style={styles.centered}>
				<ActivityIndicator size='large' color={Colors.secondary}/>
			</View>
		)
	}
	if (!isLoading && properties.length === 0) {
		return (
			<View style={styles.centered}>
				<Text style={styles.text}>
					No properties found. Go to properties page and add a new property!
				</Text>
			</View>
		);
	}
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
	const onLayout = event => {
		const {width} = event.nativeEvent.layout;
		const itemWidth = 200;
		const numColumns = Math.floor(width/itemWidth)
		setLayoutWidth(numColumns)
	}

	const selectPropertyHandler = id => {
		// console.log(`Selected property with ID: ${id}`);
		props.navigation.navigate('ChecklistDetail', {
			propertyID: id
		});
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
					data={propertyInfo}
					keyExtractor={item => item.id}
					renderItem = {itemData => (
						<PropertyItem
							address={itemData.item.address}
							onSelect={() => {
								selectPropertyHandler(itemData.item.id)
							}}
						/>
					)}
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
		alignItems: 'center',
		backgroundColor: Colors.lightGrey,
		shadowColor: 'black',
		shadowOpacity: 0.26,
		shadowOffset: { width: 0, height: 2 },
		shadowRadius: 8,
		elevation: 5,
		borderRadius: 10
	}
});

export default AdminChecklistScreen;
