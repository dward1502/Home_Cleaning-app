import React, { useState, useCallback, useEffect, useReducer } from 'react';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  ActivityIndicator,
  Alert,
  Platform,
  ScrollView,
  Text,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import Input from '../../components/UI/Input';
import HeaderButton from '../../components/UI/HeaderButton';
import Colors from '../../constants/Colors';
import * as propertyActions from '../../store/actions/property.actions';

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

const EditCreateScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const propID = props.navigation.getParam('propertyID');
  const dispatch = useDispatch();
  const editedProperty = useSelector((state) =>
    state.properties.propertyList.find((property) => property.id === propID)
  );

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      address: editedProperty ? editedProperty.address : '',
      owner: editedProperty ? editedProperty.owner : '',
      email: editedProperty ? editedProperty.email : '',
      lockbox: editedProperty ? editedProperty.lockbox : '',
      doorcode: editedProperty ? editedProperty.doorcode : '',
      type: editedProperty ? editedProperty.type : '',
			description: editedProperty ? editedProperty.description : '',
			cleaner1: editedProperty ? editedProperty.cleaner1 : '',
			cleaner2: editedProperty ? editedProperty.cleaner2 : '',
			cleaner3: editedProperty ? editedProperty.cleaner3 : '',
			cleaner4: editedProperty ? editedProperty.cleaner4 : ''
    },

    inputValidities: {
      address: editedProperty ? true : false,
      owner: editedProperty ? true : false,
      email: editedProperty ? true : false,
      lockbox: editedProperty ? true : false,
      doorcode: editedProperty ? true : false,
      type: editedProperty ? true : false,
			description: editedProperty ? true : false,
			cleaner1: editedProperty ? true : false,
			cleaner2: editedProperty ? true : false,
			cleaner3: editedProperty ? true : false,
			cleaner4: editedProperty ? true : false
    },
    formIsValid: editedProperty ? true : false,
  });

  const submitHandler = useCallback(async () => {
    // console.log(`formIsValid : ${formState.formIsValid}`);
    // console.log(`inputValues : ${JSON.stringify(formState.inputValues)}`);

    // if (!formState.formIsValid) {
    // 	Alert.alert('Wrong Input!', 'Please check the errors in the form.', [ { text: 'Okay' } ]);
    // 	return;
    // }
    setError(null);
    setIsLoading(true);
    try {
      if (editedProperty) {
        console.log(
          `This is editedProperty in try/catch ${JSON.stringify(
            editedProperty
          )}`
        );
        await dispatch(
          propertyActions.editProperty(
            propID,
            formState.inputValues.address,
            formState.inputValues.owner,
            formState.inputValues.email,
            formState.inputValues.lockbox,
            formState.inputValues.doorcode,
            formState.inputValues.type,
            formState.inputValues.description
          )
        );
      } else {
        console.log('Dispatching createProperty object');
        await dispatch(
          propertyActions.createProperty(
            formState.inputValues.address,
            formState.inputValues.owner,
            formState.inputValues.email,
            formState.inputValues.lockbox,
            formState.inputValues.doorcode,
            formState.inputValues.type,
						formState.inputValues.description,
						formState.inputValues.cleaner1,
						formState.inputValues.cleaner2,
						formState.inputValues.cleaner3,
						formState.inputValues.cleaner4
            //figure out how to grab the duties
          )
        );
      }
      props.navigation.goBack();
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  }, [dispatch, propID, formState]);

  useEffect(() => {
    if (error) {
      Alert.alert('An error occured', error, [{ text: 'Okay' }]);
      console.log(error);
    }
  }, [error]);

  useEffect(() => {
    props.navigation.setParams({ submit: submitHandler });
  }, [submitHandler]);

  const inputChangeHandler = useCallback(
    (inputIndentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIndentifier,
      });
    },
    [dispatchFormState]
  );

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
            id='address'
            label='Address'
            errorText='Please enter an address'
            keyboardType='default'
            returnKeyType='next'
            onInputChange={inputChangeHandler}
            initialValue={editedProperty ? editedProperty.address : ''}
            initiallyValid={!!editedProperty}
            required
          />
          <Input
            id='owner'
            label='Owner'
            errorText='Please enter an owner'
            keyboardType='default'
            returnKeyType='next'
            autoCapitalize='sentences'
            onInputChange={inputChangeHandler}
            initialValue={editedProperty ? editedProperty.owner : ''}
            initiallyValid={!!editedProperty}
            required
          />
          <Input
            id='email'
            label='Email'
            errorText='Please enter a valid E-mail address'
            keyboardType='email-address'
            returnKeyType='next'
            onInputChange={inputChangeHandler}
            initialValue={editedProperty ? editedProperty.email : ''}
            initiallyValid={!!editedProperty}
            required
          />
          <Input
            id='type'
            label='Type'
            errorText='Please enter a type of cleaning'
            keyboardType='default'
            returnKeyType='next'
            autoCapitalize='sentences'
            onInputChange={inputChangeHandler}
            initialValue={editedProperty ? editedProperty.type : ''}
            initiallyValid={!!editedProperty}
            required
          />
          <Input
            id='description'
            label='Description'
            keyboardType='default'
            returnKeyType='next'
            errorText='Need to add a description'
            autoCapitalize='sentences'
            multiline
            numberOfLines={3}
            minLength={5}
            onInputChange={inputChangeHandler}
            initialValue={editedProperty ? editedProperty.description : ''}
            initiallyValid={!!editedProperty}
          />
          <Input
            id='lockbox'
            label='Lockbox #'
            keyboardType='decimal-pad'
            returnKeyType='next'
            onInputChange={inputChangeHandler}
            initialValue={editedProperty ? editedProperty.lockbox : ''}
            initiallyValid={!!editedProperty}
          />
          <Input
            id='doorcode'
            label='Doorcode #'
            keyboardType='decimal-pad'
            returnKeyType='next'
            onInputChange={inputChangeHandler}
            initialValue={editedProperty ? editedProperty.doorcode : ''}
            initiallyValid={!!editedProperty}
          />
          <View>
            <Text>Cleaning Duties</Text>
            <Input
              id='cleaner1'
              label='Cleaner 1'
              keyboardType='default'
              returnKeyType='next'
              onInputChange={inputChangeHandler}
              initialValue={editedProperty ? editedProperty.cleaner1 : ''}
              initiallyValid={!!editedProperty}
            />
						<Input
              id='cleaner2'
              label='Cleaner 2'
              keyboardType='default'
              returnKeyType='next'
              onInputChange={inputChangeHandler}
              initialValue={editedProperty ? editedProperty.cleaner2 : ''}
              initiallyValid={!!editedProperty}
            />
						<Input
              id='cleaner3'
              label='Cleaner 3'
              keyboardType='default'
              returnKeyType='next'
              onInputChange={inputChangeHandler}
              initialValue={editedProperty ? editedProperty.cleaner3 : ''}
              initiallyValid={!!editedProperty}
            />
						<Input
              id='cleaner4'
              label='Cleaner 4'
              keyboardType='default'
              returnKeyType='next'
              onInputChange={inputChangeHandler}
              initialValue={editedProperty ? editedProperty.cleaner4 : ''}
              initiallyValid={!!editedProperty}
            />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

EditCreateScreen.navigationOptions = (navData) => {
  const submitFn = navData.navigation.getParam('submit');
  return {
    headerTitle: navData.navigation.getParam('propertyID')
      ? 'Edit Property'
      : 'Add Property',
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

export default EditCreateScreen;
