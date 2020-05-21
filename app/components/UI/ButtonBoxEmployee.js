import React from 'react'
import {View, Text, Button, StyleSheet} from 'react-native'
import Colors from '../../constants/Colors'

const ButtonBox = (props) => {
  return (
    <View style={styles.buttonBox}>
        <View style={styles.buttonContainer}>
          <Button
            title='CREATE USER'
            color={Colors.secondary}
            onPress={props.addUser}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title='EDIT USER'
            color={Colors.secondary}
            onPress={() => {
              props.editUserHandler(userId);
            }}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title='DELETE USER'
            color={Colors.darkRed}
            onPress={() => {
              props.deleteHandler(userId);
            }}
          />
        </View>
      </View>
  )
}

const styles = StyleSheet.create({
	buttonBox: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonContainer: {
    backgroundColor: Colors.primary,
    borderRadius: 15,
    padding: 8,
    width: 200,
    marginTop: 20,
    fontFamily: 'montserat-bold',
  },
});

export default ButtonBox;