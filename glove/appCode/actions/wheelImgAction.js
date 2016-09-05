import * as types from './actionTypes';
import { URLWheelImg } from '../utils/url';
// 这里需要用户的id，和请求的次数页数等参数，这个参数需要推文界面中获得
/*		requestParams:{
			userID:
			page:
			pageSize:
			time:
		}
	
*/
export function  receiveWheelImg(json){
	
	return{
		type:types.Get_WheelImgs,
		posts:json.lp,
		receivedAt:Date.now()
	}
}


export  function fetchWheelImg(requestParams){
	
   //在这里判断传入的请求时间和当前时间的差值，如果相差太大，可认为用户是重新登录，而不是短时间内连续的请求
	return dispatch=>{
		return fetch(URLWheelImg,{
					method:'POST',
					headers:{
						'Accept': 'application/json',
    					'Content-Type': 'application/json',
    				},
    				body: JSON.stringify({
					    tag: requestParams.tag,
					    page: requestParams.page,
					    pageSize:requestParams.pageSize
					})
		       })
			   .then(response=>response.json())
			   .then(json=>dispatch(receiveWheelImg(json)))
			   .catch(function(e){
			   		console.log('请求轮播图出错了')
			   })
	}
}

export function fetchWheelImgIfNeeded(requestParams){
	return (dispatch,getState)=>{
		return dispatch(fetchWheelImg(requestParams))
	}
}
