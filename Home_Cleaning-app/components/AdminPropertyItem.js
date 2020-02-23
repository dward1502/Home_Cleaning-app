import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TouchableNativeFeedback, Platform } from 'react-native';

import Card from './UI/Card';
import Colors from '../constants/Colors';

const AdminPropertyItem = (props) => {
	let TouchableCmp = TouchableOpacity;

	if (Platform.OS === 'android' && Platform.Version >= 21) {
		TouchableCmp = TouchableNativeFeedback;
  }

	return (
		<Card style={styles.property}>
			<View style={styles.touchable}>
				<TouchableCmp onPress={props.onSelect} useForeground>
					<View style={styles.details}>
						<Text style={styles.address}>{props.address}</Text>
						<Text style={styles.text}>{props.owner}</Text>
					</View>
				</TouchableCmp>
			</View>
    </Card>
	);
};

const styles = StyleSheet.create({
	property: {
    height: 200,
    width: 200,
    margin: 10,
    justifyContent:'center',
    alignItems:'center'
  },
  touchable: {
    borderRadius: 10,
    overflow:'hidden'
  },
  details:{
    justifyContent:'center',
    alignItems:'center',
    padding: 10
  },
  address:{
    fontSize: 16,
    color: '#000'
  },
  text:{
    fontSize: 18
  }
});

export default AdminPropertyItem;
