import React from 'react'
import {StyleSheet, KeyboardAvoidingView, ScrollView, View, Button} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient'

import Input from '../components/Input'
import Card from '../components/Card'
import Colors from '../constants/colors'

const AuthScreen = props => {
  return(
    <LinearGradient colors={[Colors.primary, Colors.secondary]} style={styles.gradient}>
      <Card style={styles.authContainer}>
        <ScrollView>
          <Input id='email' label='E-mail'/>
          <Input id='password' label='Password'/>
          <View style={styles.buttonContainer}>
            <Button title='Login' color={Colors.secondary}/>
          </View>
        </ScrollView>
      </Card>
    </LinearGradient>
  )
}

AuthScreen.navigationOptions = {
  headerTitle: 'Login'
}

const styles = StyleSheet.create({
  gradient:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  },
  authContainer:{
    width:'80%',
    maxHeight:400,
    maxWidth:400,
    padding:20
  },
  buttonContainer:{
    marginTop:20
  }
})

export default AuthScreen;
