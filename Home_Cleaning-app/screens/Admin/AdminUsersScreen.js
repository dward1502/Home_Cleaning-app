import React from 'react';
import {View, Text, StyleSheet, Button, } from 'react-native'

import Colors from '../../constants/Colors';

const AdminUsersScreen = props =>{






  return (
    <View style={styles.screen}>
      
      <Button title='Add User' color={Colors.primary}/>
      <Button title='Edit User' color={Colors.secondary}/>
      <Button title='Remove User' color={Colors.red}/>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex:1
  }
})

export default AdminUsersScreen;