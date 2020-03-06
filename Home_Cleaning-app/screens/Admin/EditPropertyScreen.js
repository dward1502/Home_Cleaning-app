import React, { useState, useEffect, useCallback, useReducer } from 'react';
import {
	View,
	StyleSheet,
	KeyboardAvoidingView,
	ActivityIndicator,
	Alert,
	Platform,
	ScrollView
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import Input from '../../components/UI/Input';
import Colors from '../../constants/Colors';
import HeaderButton from '../../components/UI/HeaderButton';
import * as propertyActions from '../../store/actions/AdminProperty.actions';

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPADTE';

const formReducer = (state, action) => {
	if (action.type === FORM_INPUT_UPDATE) {
		const updatedValues = {
			...state.inputValues,
			[action.input]: action.value
		};
		const updatedValidities = {
			...state.inputValidities,
			[action.input]: action.isValid
		};
		let updatedFormIsValid = true;
		for (const key in updatedValidities) {
			updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
		}
		return {
			formIsValid: updatedFormIsValid,
			inputValidities: updatedValidities,
			inputValues: updatedValues
		};
	}
	return state;
};

const EditPropertyScreen = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState();
	const propID = props.navigation.getParam('propertyId');
	const editedProperty = useSelector(state =>
		state.properties.propertyList.find(property => property.id === propID)
	);
	const dispatch = useDispatch();

	const [formState, dispatchFormState] = useReducer(formReducer, {
		inputValues: {
			address: editedProperty ? editedProperty.address : '',
			owner: editedProperty ? editedProperty.owner : '',
			email: editedProperty ? editedProperty.email : '',
			lockbox: editedProperty ? editedProperty.lockbox : '',
			doorcode: editedProperty ? editedProperty.doorcode : '',
			type: editedProperty ? editedProperty.type : '',
			description: editedProperty ? editedProperty.description : ''
		},
		inputValidities: {
			address: editedProperty ? true : false,
			owner: editedProperty ? true : false,
			email: editedProperty ? true : false,
			lockbox: editedProperty ? true : false,
			doorcode: editedProperty ? true : false,
			type: editedProperty ? true : false,
			description: editedProperty ? true : false
		},
		formIsValid: editedProperty ? true : false
	});

	useEffect(() => {
		if (error) {
			Alert.alert('An error occured', error, [{ text: 'Okay' }]);
		}
	}, [error]);

	const submitHandler = useCallback(async () => {
		if (!formState.formIsValid) {
			Alert.alert('Wrong Input!', 'Please check the errors in the form.', [
				{ text: 'Okay' }
			]);
			return;
		}
		setError(null);
		setIsLoading(true);
		try {
			if (editedProperty) {
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
				await dispatch(
					propertyActions.createProperty(
						formState.inputValues.address,
						formState.inputValues.owner,
						formState.inputValues.email,
						formState.inputValues.lockbox,
						formState.inputValues.doorcode,
						formState.inputValues.type,
						formState.inputValues.description
					)
				);
			}
			props.navigation.goBack();
		} catch (error) {
			setError(error.message);
		}
		setIsLoading(false);
	}, [dispatch, propID, formState]);

	useEffect(() => {
		props.navigation.setParams({ submit: submitHandler });
	}, [submitHandler]);

	const inputChangeHandler = useCallback(
		(inputIdentifier, inputValue, inputValidity) => {
			dispatchFormState({
				type: FORM_INPUT_UPDATE,
				value: inputValue,
				isValid: inputValidity,
				input: inputIdentifier
			});
		},
		[dispatchFormState]
	);

	if (isLoading) {
		return (
			<View>
				<ActivityIndicator size='large' color={Colors.primaryDark} />
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
				<View style={styles.form}>
					<Input
						id='address'
						label='Address'
						keyboardType='default'
						returnKeyType='next'
						onInputChange={inputChangeHandler}
						initialValue={editedProperty.address ? true : false}
						initiallyValid={!! editedProperty}
						required
					/>
					<Input
						id='owner'
						label='Owner'
						keyboardType='default'
						autoCapitalize='sentences'
						returnKeyType='next'
						onInputChange={inputChangeHandler}
						initialValue={editedProperty.owner ? true : false}
						initiallyValid={!! editedProperty}
						required
					/>
					<Input
						id='email'
						label='Email'
						keyboardType='email-address'
						returnKeyType='next'
						onInputChange={inputChangeHandler}
						initialValue={editedProperty.email ? true : false}
						initiallyValid={!! editedProperty}
						required
					/>
					<Input
						id='type'
						label='Type'
						keyboardType=''
						autoCapitalize='sentences'
						returnKeyType='next'
						onInputChange={inputChangeHandler}
						initialValue={editedProperty.type ? true : false}
						initiallyValid={!! editedProperty}
						required
					/>
					<Input
						id='description'
						label='Description'
						keyboardType='default'
						autoCapitalize='sentences'
						returnKeyType='next'
						multiline
						numberOfLines={3}
						minLength={5}
						onInputChange={inputChangeHandler}
						initialValue={editedProperty.description ? true : false}
						initiallyValid={!! editedProperty}
					/>
					<Input
						id='lockbox'
						label='Lockbox #'
						keyboardType='decimal-pad'
						returnKeyType='next'
						onInputChange={inputChangeHandler}
						initialValue={editedProperty.lockbox ? true : false}
						initiallyValid={!! editedProperty}
					/>
					<Input
						id='doorcode'
						label='Doorcode #'
						keyboardType='decimal-pad'
						returnKeyType='next'
						onInputChange={inputChangeHandler}
						initialValue={editedProperty.doorcode ? true : false}
						initiallyValid={!! editedProperty}
					/>
				</View>
			</ScrollView>
		</KeyboardAvoidingView>
	);
};

EditPropertyScreen.navigationOptions = navData => {
	const submitFn = navData.navigation.getParam('submit');
	return {
		headerTitle: navData.navigation.getParam('propertyId')
			? 'Edit Product'
			: 'Add Product',
		headerRight: (
			<HeaderButtons HeaderButtonComponent={HeaderButton}>
				<Item
					title='Save'
					iconName={
						Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'
					}
					onPress={submitFn}
				/>
			</HeaderButtons>
		)
	};
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
    justifyContent: 'center',
    padding:40
  },
  centered: {
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  }
});

export default EditPropertyScreen;
