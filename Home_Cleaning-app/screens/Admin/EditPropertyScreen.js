import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const EditPropertyScreen = () => {
	return (
		<View style={styles.screen}>
			<Text>This is the edit property page</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		justifyContent: 'center'
	}
});

export default EditPropertyScreen;
