import React, {useState} from 'react';
import {createStore, combineReducers, applyMiddleware} from 'redux'
import {Provider} from 'react-redux';
import { AppLoading} from 'expo';
import ReduxThunk from 'redux-thunk'
import { composeWithDevTools} from 'redux-devtools-extension'

import authReducer from './store/reducers/auth.reducers';
import propertyReducer from './store/reducers/AdminProperty.reducer';

import Navigation from './navigation/CleaningNavigation';

const rootReducer = combineReducers({
  auth:authReducer,
  properties: propertyReducer
})

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(ReduxThunk)));

export default function App() {
	return (
  <Provider store={store}>
    <Navigation/>
  </Provider>
  )
}
//https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBkgTxJ5gz6-kM-9hLiM96WI4RRWQG4pwc