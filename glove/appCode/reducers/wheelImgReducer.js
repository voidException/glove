import * as types  from '../actions/actionTypes';

var initialState={
	wheelImg:[],
	lastUpdated:null  //第一次选的时候，这个不能为null，可以是1970年这个值
}
//每次请求都需要更新请求参数
export function wheelImg(state={
		wheelImg:[],
		lastUpdate:null
    },action){
		switch (action.type){
			case  types.Get_WheelImgs:
				return	Object.assign({},state,{
					wheelImg:action.posts,
					lastUpdate:action.receivedAt
				});
			default:
				return state;
		}

}