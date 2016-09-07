import * as types from './actionTypes';
import { URLItemPage } from '../utils/url';
// 这里需要用户的id，和请求的次数页数等参数，这个参数需要推文界面中获得
/*		requestParams:{
			userID:
			page:
			pageSize:
			time:
		}
	
*/
export function  receiveItemPage(requestParams,json){
	
	return{
		type:types.Get_itemPage,
		param:requestParams,   
		posts:json.lp,
		//receivedAt: Math.floor(Date.now()/1000)
		receivedAt:Date.now()
	}
}


export  function fetchItemPage(requestParams){
	
   //在这里判断传入的请求时间和当前时间的差值，如果相差太大，可认为用户是重新登录，而不是短时间内连续的请求
	return dispatch=>{
		return fetch(URLItemPage,{
					method:'POST',
					headers:{
						'Accept': 'application/json',
    					'Content-Type': 'application/json',
    				},
    				body: JSON.stringify({
    					proof:requestParams.proof,
					    userID: requestParams.userID,
					    page: requestParams.page,
					    pageSize:requestParams.pageSize,
					    lastUpdate:requestParams.lastUpdate,
					    lastItemstart:requestParams.lastItemstart,
					    flag:requestParams.flag
					})
		       })
			   .then(response=>response.json())
			   .then(json=>dispatch(receiveItemPage(requestParams,json)))
			   .catch(function(e){
			   	debugger;
			   		console.log('请求项目列表出错了ma');
			   		console.trace(e);
			   })
	}
}

export function fetchItemPageIfNeeded(requestParams){
	return (dispatch,getState)=>{
		return dispatch(fetchItemPage(requestParams))
	}
}
