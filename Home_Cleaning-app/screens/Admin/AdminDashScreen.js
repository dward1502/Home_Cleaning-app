import React from 'react';
import {View, Text, StyleSheet} from 'react-native'

const AdminDashScreenScreen = props =>{
  return (
    <View style={styles.screen}>
      <Text>This is the adminDash page</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex:1
  }
})

export default AdminDashScreenScreen;