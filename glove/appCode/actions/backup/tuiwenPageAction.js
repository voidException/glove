import * as types from './actionTypes';
import { URLTuiwenPage,URLmainPageWeiBo,URLUserPageWeibo} from '../utils/url';

export function  receiveTuiwenPage(requestParams,json){
	let selectType=null;
    if (requestParams.symbol===1) {
    	selectType=types.Get_tuiwenPage;
    }else if (requestParams.symbol===2) {
         selectType=types.Get_tweetPage;
    }else{
    	selectType=types.Get_weiboPage;
    }
	return{
		type:selectType,
		param:requestParams,
		posts:json.data,
		receivedAt:Date.now()
	}
}


export  function fetchTuiWenPage(requestParams){
	
   //在这里判断传入的请求时间和当前时间的差值，如果相差太大，可认为用户是重新登录，而不是短时间内连续的请求
    let selecturl=null;
    if (requestParams.symbol===1) {
    	selecturl=URLmainPageWeiBo; //我的主页推文
    }else if (requestParams.symbol===2){
    	selecturl=URLTuiwenPage; //查看自己发布的微博
    }else{
    	selecturl=URLUserPageWeibo; //查看对方发布的微博,
    }
	return dispatch=>{
		return fetch(selecturl,{
					method:'POST',
					headers:{
						'Accept': 'application/json',
    					'Content-Type': 'application/json',
    				},
    				body: JSON.stringify(requestParams)
		       })
			   .then(response=>response.json())
			   .then(json=>dispatch(receiveTuiwenPage(requestParams,json)))
			   .catch(function(e){
			   	    console.log(e);
			   		console.log('请求推文列表出错了')
			   })
	}
}

export function fetchTuiwenPageIfNeeded(requestParams){
	return (dispatch,getState)=>{
		return dispatch(fetchTuiWenPage(requestParams))
	}
}
