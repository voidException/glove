
import { GET_userProfile } from '../actions/actionTypes';

export function  userProfile(state={
		isFetching:false,
		items:[]
	},action){
		switch(action.type){
			case:GET_userProfile:
				return Object.assign({},state,{
					isFetching:true,
					items:action.posts,
					lastUpdated:action.receivedAt
				})
			default:state
		}
}

//没有学习Reddit里面的做法，这里的reducer直接根据action中的值，设置到store里面去，
//store的子级将增加userProfile健






