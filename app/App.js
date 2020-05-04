import React, { useState } from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { YellowBox } from 'react-native';

import Navigation from './navigation/CleaningNavigator';
import propertyReducer from './store/reducers/property.reducer';
import userReducer from './store/reducers/users.reducers'

const rootReducer = combineReducers({
	properties: propertyReducer,
	users: userReducer
});

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(ReduxThunk)));

const fetchFonts = () => {
	return Font.loadAsync({
		'montserat': require('./assets/Fonts/Montserrat-Regular.ttf'),
		'montserat-bold': require('./assets/Fonts/Montserrat-Bold.ttf')
	});
};


YellowBox.ignoreWarnings(['Remote debugger']);


export default function App() {
	const [ fontLoaded, setFontLoaded ] = useState(false);

	if (!fontLoaded) {
		return (
			<AppLoading
				startAsync={fetchFonts}
				onFinish={() => {
					setFontLoaded(true);
				}}
			/>
		);
	}
	return (
		<Provider store={store}>
			<Navigation />
		</Provider>
	);
}
