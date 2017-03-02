import { createStore,applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import rootReducer from '../reducers/index';

//仔细看看createLogger()的使用
export default function configureStore(initialState) {
  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(thunkMiddleware, createLogger())
  )
 // const store = createStore(
 //    rootReducer,
 //    initialState,
 //    applyMiddleware(thunkMiddleware)
 //  )
	return store;
}