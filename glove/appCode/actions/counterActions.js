import * as types  from './actionTypes';

//用法很特别，从外部导入常量，作为这里的返回值
export function increment(){
	return {
		type:types.INCREMENT
	};
}


export  function  decrement(){
	return{
		type:types.DECREMENT
	}
}