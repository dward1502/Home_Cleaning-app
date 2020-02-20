import React, {useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {AppLoading} from 'expo'
import * as Font from 'expo-font'

import CleaningNavigator from './navigation/CleaningNavigator';

const fetchFonts = ()=> {
  return Font.loadAsync({
    'montserrat-regular': require('./assets/Fonts/Montserrat-Regular.ttf'),
    'montserrat-bold': require('./assets/Fonts/Montserrat-Bold.ttf')
  })
}

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false)

  if(!fontLoaded) {
    return (
      <AppLoading startAsync={fetchFonts} onFinish={()=>{setFontLoaded(true)}}/>
    )
  }
  
  return (
    <CleaningNavigator/>
  );
}

