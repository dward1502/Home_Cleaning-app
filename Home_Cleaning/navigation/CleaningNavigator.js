import React from 'react';
import {createAppContainer,createSwitchNavigator, createStackNavigator} from 'react-navigation'
import { Platform} from 'react-native'

import AuthScreen from '../screens/AuthScreen';
import { Colors } from '../constants/colors';

const defaultNavOptions = {
  headerStyle:{
    backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
  },
  headerTitleStyle: {
    fontFamily:'montserrat-regular'
  }
}


const AuthNavigator = createStackNavigator({
  Auth: AuthScreen
}, {
  defaultNavigationOptions: defaultNavOptions
})

const MainNavigator = createSwitchNavigator({
  Auth: AuthNavigator
})

export default createAppContainer(MainNavigator);