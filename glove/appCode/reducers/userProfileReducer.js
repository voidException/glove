
//import { GET_userProfile } from '../actions/actionTypes';
import * as types  from '../actions/actionTypes';
import {DeviceEventEmitter} from 'react-native';
export  function  userProfile(state={
		logined:false,
		items:[]
	},action){
		let tag=false;
		if (action.posts!==null || action.posts!==[]) {
			tag=true;
		}
		//执行到这里说明接收到了数据
		//DeviceEventEmitter.emit('loginSuccess', { });
		
		switch(action.type){
			case types.Login_userProfile:
				return Object.assign({},state,{
					logined:tag,
					items:action.posts,
					lastUpdated:action.receivedAt
				})
			default:
				return state;
		}
}

//没有学习Reddit里面的做法，这里的reducer直接根据action中的值，设置到store里面去，
//store的子级将增加userProfile健







