import * as types  from '../actions/actionTypes';

// var initialState={
// 	itemList:[],
// 	lastUpdated:null
// }
//每次请求都需要更新请求参数，
/*
 如果是刷新，就选择项目开始时间，晚于上次最后刷新的的，sql中按照时间降序排序；
 如果是加载更多，取得上次加载更多列表中，时间最早的，sql中选择时间早于该时间的，然后sql中按照时间降序排序
*/
export function itemList(state={
		itemList:[],
		lastUpdate:null
    },action){
	   let  ls=action.posts;
	   let  rp=action.param;
       //根据请求的参数决定如何合并 
	   let combinels=state.itemList.concat(ls);//合并两个数据，如果是刷新就是ls.concat(state.itemList)
      if (ls==null) { //必须在这里进行，真是坑
      	 return state;
      };
		switch (action.type){
			case  types.Get_itemPage:

				return	Object.assign({},state,{
				     lastUpdate:action.receivedAt,
				     itemList:combinels  //换成hebingls
				});

			default:
				return state;
		}

}