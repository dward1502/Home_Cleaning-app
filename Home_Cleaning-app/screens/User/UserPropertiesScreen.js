import React from 'react';
import {View, Text, StyleSheet} from 'react-native'

const UserPropertiesScreen = props =>{
  return (
    <View style={styles.screen}>
      <Text>This is the userProperties page</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex:1
  }
})

export default UserPropertiesScreen;