import React from 'react';
import {View, Text, StyleSheet} from 'react-native'

const AdminChecklist = props => {
return (
  <View style={styles.screen}>
    <Text style={styles.text}>This is the checklist page</Text>
  </View>
)
}
const styles = StyleSheet.create({
  screen:{
    flex:1,
  },
  text:{
    fontSize:22,
    fontFamily:'montserrat-regular'
  }
})


export default AdminChecklist