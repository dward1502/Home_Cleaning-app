import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';

import AdminDashScreen from '../screens/admin/AdminDashScreen';
import AdminPropertyScreen from '../screens/admin/AdminPropertyScreen';
import AdminChecklistScreen from '../screens/admin/AdminChecklistScreen';
import AdminEmployeeScreen from '../screens/admin/AdminEmployeeScreen';
import EditPropertyScreen from '../screens/admin/Edit&CreateScreen'
import PropertyDetailScreen from '../screens/admin/AdminPropertyDetails';
import AdminEditUserScreen from '../screens/admin/EditUserScreen';
import ChecklistDetailsScreen from '../screens/admin/AdminChecklistDetails';
import ChecklistTestScreen from '../screens/admin/ChecklistTest';

const defaultNavOptions = {
	headerStyle: {
		backgroundColor: Colors.primary
	},
	headerTintColor: Platform.OS === 'android' ? 'white' : Colors.secondary
};
const tabOptions = {
	inactiveBackgroundColor: Colors.primary,
	inactiveTintColor: Colors.secondary,
	activeBackgroundColor: Colors.primaryDark,
	activeTintColor: Colors.secondary
};

const AdminDashNavigator = createStackNavigator(
	{
		Dashboard: AdminDashScreen
	},
	{
		navigationOptions: {
			tabBarIcon: (tabInfo) => (
				<Ionicons
					size={23}
					color={tabInfo.tintColor}
					name={Platform.OS === 'android' ? 'md-compass' : 'ios-speedometer'}
				/>
			)
		},
		defaultNavigationOptions: defaultNavOptions
	}
);

const AdminPropertiesNavigator = createStackNavigator(
	{
		Properties: AdminPropertyScreen,
		PropertyDetail: PropertyDetailScreen,
		EditProperty: EditPropertyScreen
	},
	{
		navigationOptions: {
			tabBarIcon: (tabInfo) => (
				<Ionicons
					size={23}
					color={tabInfo.tintColor}
					name={Platform.OS === 'android' ? 'md-home' : 'ios-home'}
				/>
			)
		},
		defaultNavigationOptions: defaultNavOptions
	}
);

const AdminChecklistNavigator = createStackNavigator(
	{
		Checklist: AdminChecklistScreen,
		ChecklistDetails: ChecklistDetailsScreen,
		ChecklistTest: ChecklistTestScreen
	},
	{
		navigationOptions: {
			tabBarIcon: (tabInfo) => (
				<Ionicons
					size={23}
					color={tabInfo.tintColor}
					name={Platform.OS === 'android' ? 'md-list-box' : 'ios-list-box'}
				/>
			)
		},
		defaultNavigationOptions: defaultNavOptions
	}
);

const AdminEmployeeNavigator = createStackNavigator(
	{
		Users: AdminEmployeeScreen,
		EditUsers: AdminEditUserScreen
	},
	{
		navigationOptions: {
			tabBarIcon: (tabInfo) => (
				<Ionicons
					size={23}
					color={tabInfo.tintColor}
					name={Platform.OS === 'android' ? 'md-person' : 'ios-person'}
				/>
			)
		},
		defaultNavigationOptions: defaultNavOptions
	}
);

const AdminNavigator = createBottomTabNavigator(
	{
		Dash: AdminDashNavigator,
		Properties: AdminPropertiesNavigator,
		Checklist: AdminChecklistNavigator,
		Employees: AdminEmployeeNavigator
	},
	{
		tabBarOptions: tabOptions
	}
);

export default createAppContainer(AdminNavigator)
