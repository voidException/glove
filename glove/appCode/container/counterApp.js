'use strict';

import React,{Component} from 'react';
import { bindActionCreators } from 'redux';
import Counter from '../components/counter';
//导入整个模块，并命名为counterActions ,
import * as counterActions from '../actions/counterActions';
import { connect} from 'react-redux';

//CounterApp充当在外层的容器，首页的数据将从这个类中联网获取
class CounterApp extends Component{
	constructor(props){
		super(props);
	}

  //这里的{...actions} 来自于connect() 函数
	render(){
		const {state,actions}=this.props;
		return(
			<Counter 
				counter={state.count}
				{...actions}/>
		);
	}

}

//counterActions 模块中包含的所有actions(increment decrement) 都等价于dispatch(action) 
export default connect(state=>({
		state:state.counter
	}),
	(dispatch)=>({
		actions:bindActionCreators(counterActions,dispatch)
	})
)(CounterApp);





















