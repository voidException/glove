import * as types from './actionTypes';
import { URLTweetPage} from '../utils/url';
function  receiveTuiwenPage(requestParams,json){
	let selectType=types.Get_tweetPage;
	return{
		type:selectType,
		param:requestParams,
		posts:json.data,
		receivedAt:Date.now()
	}
}


function fetchTuiWenPage(requestParams){
	
	return dispatch=>{
		return fetch(URLTweetPage,{
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

export function fetchTweetPageIfNeeded(requestParams){
	return (dispatch,getState)=>{
		return dispatch(fetchTuiWenPage(requestParams))
	}
}
