import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { Platform } from 'react-native';
import { Colors } from '../constants/Colors';

import AuthScreen from '../screens/AuthScreen';

const defaultNavOptions = {
	headerStyle: {
		backgroundColor: Platform.OS === 'android' ? '#3fc5d1' : ''
	},
	headerTintColor: Platform.OS === 'android' ? 'white' : '#3fc5d1'
};

const AuthNavigator = createStackNavigator(
	{
		Auth: AuthScreen
	},
	{
		defaultNavigationOptions: defaultNavOptions
	}
);

export default createAppContainer(AuthNavigator);
