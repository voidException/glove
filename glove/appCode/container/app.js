import React,{	Component	} from 'react';
import  { View } from 'react-native';

import {  createStore,applyMiddleware,combineReducers  } from 'redux';
import {  Provider  } from 'react-redux';
import thunk from 'redux-thunk';
import * as reducers from '../reducers';
import CounterApp from './counterApp';
import configureStore from '../store/configureStore';
import MyNavigator from './navigator';
//增强型的createStore
//const creatStoreWithMiddleware =applyMiddleware(thunk)(createStore);

//const reducer =combineReducers(reducers);
//使用reducer创建store，
//const store=creatStoreWithMiddleware(reducer);

//以后将替换成以下方法
const store =configureStore();
//用Navigator替代<CounterApp />
export default class App extends Component{
	render(){
		return(
			<Provider store={store}>
				<MyNavigator />
			</Provider>
		);
	}
}


