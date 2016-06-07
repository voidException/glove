import * as types from './actionTypes';
import URLLogin from '../utils/url';

//userAccount 包含邮箱和密码，外部传入
export function  receiveUserProfile(userAccount,json){
	return{
		type:types.GET_userProfile,
		userAccount,
		posts:json.data,
		receivedAt:Date.now()
	}
}

export  function fetchUserProfile(userAccount){
	return dispatch=>{
		return fetch(URLLogin)
			   .then(response=>response.json())
			   .then(json=>dispatch(receiveUserProfile(reddit,json)))
	}
}

export function fetchUserProfileIfNeeded(userAccount){
	return (dispatch,getState)=>{
		return dispatch(fetchUserProfile(userAccount))
	}
}

//从最下面的函数，一直往上调用上面的函数，这里看到只有一个type，
//也就是说对应的reducer只有一个，但这里写了三个函数。

