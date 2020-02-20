import React from 'react'
import {View, Text, TextInput, StyleSheet} from 'react-native'

const INPUT_CHANGE = 'INPUT_CHANGE'
const INPUT_BLUE = 'INPUT_BLUR'


const inputReducer = (state,action) => {
  switch(action.type) {

  }
}

const Input = props => {
  return (
    <View syle={styles.formControl}>
      <Text style={styles.label}>{props.label}</Text>
      <TextInput {...props} style={styles.input} value={}/>
    </View>
  )
}

const styles = StyleSheet.create({
  formControl:{
    width:'100%'
  },
  label:{
    fontFamily:'montserrat-bold',
    marginVertical:8,
  },
  input:{
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor:'#ccc',
    borderBottomWidth:1
  }
})

export default Input;