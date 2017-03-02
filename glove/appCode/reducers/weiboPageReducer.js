import * as types  from '../actions/actionTypes';

//进入别人的用户主页查看对方的微博时，用这个
export function twitterList(state={
		tuiwenList:[],
    },action){
	    //console.log(state.tuiwenList);
	   // console.log(action);
	   let  ls=action.posts;
	   if (ls==null) { //必须在这里进行，真是坑
      	 return state;
       }
       // if (rp.flag==1) { //刷新这里不行，因为action.type 是之前的
       //    combinels=ls.concat(state.tuiwenList);
       // }else{
       // 	  combinels=state.tuiwenList.concat(ls);
       // }	
       // let  combinels=ls.concat(state.tuiwenList);       
		switch (action.type){
			case  types.Get_weiboPage:
				return	Object.assign({},state,{
					tuiwenList:action.posts
				});
			default:
				return state;
		}

}