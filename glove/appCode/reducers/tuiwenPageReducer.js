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
	   // console.log(action.posts);
	   // console.log(action);
	   let  ls=action.posts;
	   let  rp=action.param; 
	   let combinels=null;

	   if (ls==null) { //必须在这里进行，真是坑
      	 return state;
       }
       // if (rp.flag==1) { //刷新这里不行，因为action.type 是之前的
       //    combinels=ls.concat(state.tuiwenList);
       // }else{
       // 	  combinels=state.tuiwenList.concat(ls);
       // }
	       
		switch (action.type){
			case  types.Get_tuiwenPage:
			    
			       if (rp.flag==1) { //刷新
			          combinels=ls.concat(state.tuiwenList);
			       }else{
			       	  combinels=state.tuiwenList.concat(ls);
			       }
				return	Object.assign({},state,{
					tuiwenList:action.posts,
					lastUpdate:action.receivedAt
				});
			default:
				return state;
		}

}