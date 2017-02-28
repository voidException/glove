import * as types from './actionTypes';
import {URLLogin} from '../utils/url';
import { Alert,NativeAppEventEmitter} from 'react-native';
//userAccount 包含邮箱和密码，外部传入
export function  receiveUserProfile(userAccount,json){
	//console.log(userAccount)应该多存一个数据域
	//console.log(json);
	NativeAppEventEmitter.emit('loginSuccess', {
		type:1,
        userpassword:userAccount.userPassword,
        useremail:json.data.useremail,
        token:json.data.backupfour,
        userid:json.data.userid.toString()
    });
	return{
		type:types.Login_userProfile,
		userAccount,
		posts:json.data,
		receivedAt:Date.now()
	}
}


export  function fetchUserProfile(userAccount){
	NativeAppEventEmitter.emit('loadingStart', {
         code: 0
    });

	return dispatch=>{
		return fetch(URLLogin,{
					method:'POST',
					headers:{
						'Accept': 'application/json',
    					'Content-Type': 'application/json',
    				},
    				body: JSON.stringify({
					    userEmail: userAccount.userEmail,
					    userPassword: userAccount.userPassword
					})
		       })
			   .then(response=>response.json())
			   .then(json=>dispatch(receiveUserProfile(userAccount,json)))
			   .catch(function(e){
			   		 //console.log(e);
			   		NativeAppEventEmitter.emit('loginSuccess', {
                        code: 0
                    })
                    Alert.alert(
                     	"出现异常",
                     	String(e),
                     	[{text:'好的',onPress: () => {}}]
                     )
			   });
	}
}

export function fetchUserProfileIfNeeded(userAccount){
	return (dispatch,getState)=>{
		return dispatch(fetchUserProfile(userAccount))
	}
}


//从最下面的函数，一直往上调用上面的函数，这里看到只有一个type，
//也就是说对应的reducer只有一个，但这里写了三个函数。

