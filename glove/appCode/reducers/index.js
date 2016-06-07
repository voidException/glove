import  { combineReducers} from 'redux';

import { selectedReddit, postsByReddit } from './navigatorReducer';
import { userProfile }  from './userProfileReducer';
//reducers对应于store里面的state，所有的需要的state，都应该在这里注册

const rootReducer=combineReducers({
	postsByReddit,
	selectedReddit,
	userProfile
});
export default rootReducer


