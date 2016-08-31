import * as types  from '../actions/actionTypes';

var initialState={
	itemList:[],
	lastUpdated:null
}
//每次请求都需要更新请求参数
export function itemList(state={
		itemList:[],
		lastUpdate:null
    },action){
		switch (action.type){
			case  types.Get_itemPage:
				return	Object.assign({},state,{
					itemList:action.posts,
					lastUpdate:action.receivedAt
				});
			default:
				return state;
		}

}