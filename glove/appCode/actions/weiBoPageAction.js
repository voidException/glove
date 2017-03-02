import * as types from './actionTypes';
import { URLWeiboPage} from '../utils/url';
function  receiveTuiwenPage(requestParams,json){
	let selectType=types.Get_weiboPage;
	
	return{
		type:selectType,
		param:requestParams,
		posts:json.data,
		receivedAt:Date.now()
	}
}


function fetchTuiWenPage(requestParams){
	
	return dispatch=>{
		return fetch(URLWeiboPage,{
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

export function fetchWeiBoPageIfNeeded(requestParams){
	return (dispatch,getState)=>{
		return dispatch(fetchTuiWenPage(requestParams))
	}
}
