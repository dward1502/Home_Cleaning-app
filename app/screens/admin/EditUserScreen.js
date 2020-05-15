import React, { useState, useCallback, useEffect, useReducer } from 'react';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  ActivityIndicator,
  Alert,
  Platform,
  ScrollView,
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch, useSelector } from 'react-redux';

import Input from '../../components/UI/Input';
import HeaderButton from '../../components/UI/HeaderButton';
import Colors from '../../constants/Colors';
import * as userActions from '../../store/actions/users.actions';

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value,
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid,
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues,
    };
  }
  return state;
};

const EditUserScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const dispatch = useDispatch();
  const userID = props.navigation.getParam('userID');
  const editedUser = useSelector((state) =>
    state.users.userList.find((userData) => userData.id === userID)
  );

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      email: editedUser ? editedUser.email : '',
      password: editedUser ? editedUser.password : '',
      name: editedUser ? editedUser.name : '',
      permission: editedUser ? editedUser.permission : '',
    },
    inputValidities: {
      email: editedUser ? true : false,
      password: editedUser ? true : false,
      name: editedUser ? true : false,
      permission: editedUser ? true : false,
    },
    formIsValid: editedUser ? true : false,
  });

  const submitHandler = useCallback(async () => {
    setError(null);
    setIsLoading(true);
    try {
      if (editedUser) {
        await dispatch(
          userActions.editUser(
						userID, 
						formState.inputValues.email,
						formState.inputValues.name,
						formState.inputValues.permission
						)
        );
      } else {
        await dispatch(
          userActions.createUser(
            formState.inputValues.email,
            formState.inputValues.password,
            formState.inputValues.name,
            formState.inputValues.permission
          )
        );
      }
      props.navigation.goBack();
    } catch (err) {
      setError(err.message);
    }
  }, [dispatch, userID, formState]);

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier,
      });
    },
    [dispatchFormState]
  );

  useEffect(() => {
    if (error) {
      Alert.alert('An error occured', error, [{ text: 'Okay' }]);
      console.log(error);
    }
  }, [error]);

  useEffect(() => {
    props.navigation.setParams({ submit: submitHandler });
  }, [submitHandler]);
  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size='large' color={Colors.primary} />
      </View>
    );
  }
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior='padding'
      keyboardVerticalOffset={100}
    >
      <ScrollView>
        <View style={styles.screen}>
          <Input
            id='email'
            label='Email Address'
            errorText='Please enter a valid Email-Address'
            keyboardType='email-address'
            returnKeyType='next'
            required
            onInputChange={inputChangeHandler}
            initialValue={editedUser ? editedUser.email : ''}
            initiallyValid={!!editedUser}
          />
          <Input
            id='password'
            label='Password'
            errorText='Please enter a password'
            keyboardType='default'
            returnKeyType='next'
            required
            onInputChange={inputChangeHandler}
            initialValue={editedUser ? editedUser.password : ''}
            initiallyValid={!!editedUser}
          />
          <Input
            id='name'
            label='Full Name'
            errorText='Please enter a Name'
            keyboardType='default'
            returnKeyType='next'
            required
            onInputChange={inputChangeHandler}
            initialValue={editedUser ? editedUser.name : ''}
            initiallyValid={!!editedUser}
          />
          <Input
            id='permission'
            label='Permission Type'
            errorText='Please enter a permission type'
            keyboardType='default'
            returnKeyType='next'
            required
            onInputChange={inputChangeHandler}
            initialValue={editedUser ? editedUser.permission : ''}
            initiallyValid={!!editedUser}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

EditUserScreen.navigationOptions = (navData) => {
  const submitFn = navData.navigation.getParam('submit');
  return {
    headerTitle: navData.navigation.getParam('userID')
      ? 'Edit User'
      : 'Create User',
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title='Save'
          iconName={
            Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'
          }
          onPress={submitFn}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    padding: 40,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default EditUserScreen;
