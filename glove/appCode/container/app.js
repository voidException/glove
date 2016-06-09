import React,{	Component	} from 'react';
import  { View } from 'react-native';

import {  createStore,applyMiddleware,combineReducers  } from 'redux';
import {  Provider  } from 'react-redux';
import thunk from 'redux-thunk';
import * as reducers from '../reducers';
import configureStore from '../store/configureStore';
import MyNavigator from './navigator';
//增强型的createStore
//const creatStoreWithMiddleware =applyMiddleware(thunk)(createStore);
//const reducer =combineReducers(reducers);
//const store=creatStoreWithMiddleware(reducer);

const store =configureStore();

export default class App extends Component{
	render(){
		return(
			<Provider store={store}>
				<MyNavigator />
			</Provider>
		);
	}
}


