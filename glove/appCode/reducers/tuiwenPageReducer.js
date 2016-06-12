import * as types  from '../actions/actionTypes';

var initialState={
	tuiwenList:[],
	lastUpdated:null
}
//每次请求都需要更新请求参数
export function weiboList(state={
		tuiwenList:[],
		lastUpdate:null
    },action){
		switch (action.type){
			case  types.Get_tuiwenPage:
				return	Object.assign({},state,{
					tuiwenList:action.posts,
					lastUpdate:action.receivedAt
				});
			default:
				return state;
		}

}