import { REQUEST_POSTS,RECEIVE_POSTS ,SELECT_REDDIT} from '../actions/actionTypes';

//在reducer中，只是简单的根据action的类型，把action中的其它值赋值给相应的键，或者更新相应的键
//这里不做过多的处理，对json的处理都放在action当中。详细看官方文档

export function selectedReddit(state = 'reactjs', action) {
  switch (action.type) {
    case SELECT_REDDIT:
      return action.reddit
    default:
      return state
  }
}

function posts(state ={
	isFetching:false,
	didInvalidate:false,
	items:[]
},action){
	switch(action.type){
		case	REQUEST_POSTS:
			return Object.assign({},state,{
				didInvalidate:true
			})
		case	RECEIVE_POSTS:
			return Object.assign({},state,{
				isFetching:false,
				didInvalidate:false,
				items:action.posts,
				lastUpdated:action.receivedAt

			})
		default:
			return state
	}

}

//这里的action.reddit 要么是reactjs，要么是fronted，当做了键值对的键
export function postsByReddit(state={},action){
	switch(action.type){
	
		case RECEIVE_POSTS:
		case REQUEST_POSTS:
			return Object.assign({}, state, {
				//这里用[action.reddit]，是想动态增加状态树的分支，选择fronted就会在postsByReddit增加一个分支
		        [action.reddit]: posts(state[action.reddit], action) //调用了上面的reducer
		      })
	    default:
	      return state
	}
}






