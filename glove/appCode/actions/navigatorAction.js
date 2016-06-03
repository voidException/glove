import * as types from './actionTypes';
import URLProductlist from '../utils/url';

//复杂的运算都是放在action中进行处理比如数据请求
export function selectReddit(reddit) {
  return {
    type: SELECT_REDDIT,
    reddit
  }
}

export function requestPosts(reddit){
	return{
		type:types.REQUEST_POSTS,
		reddit
	}
}

export function receivePosts(reddit,json){
	//可以在这里处理接收到的json
	// 这里的reddit全部是用来当做state的键。
	return{
		type:types.RECEIVE_POSTS,
		reddit,
		posts:json.data,
		receivedAt:Date.now()  //这是个非纯操作，只能在action处理
	}
}
//改写这里的then的回调函数
//通过fetch获取到的数据，传递给action，reducer处理这个action的时候，最终把数据更新到store。
//根据分期侠的json结构，这里进行相应的改造
//
export function fetchPosts(reddit){
	return dispatch=>{
		dispatch(requestPosts(reddit)) //这里的dispatch会给state赋值初值
		return fetch(`https://www.reddit.com/r/${reddit}.json`)
			   .then(response=>response.json())
			   .then(json=>dispatch(receivePosts(reddit,json))) //更新初值
	}
}


export function fetchPostsIfNeeded(reddit){
	return(dispatch,getState)=>{
		return dispatch(fetchPosts(reddit))
	}
}