import {
	AppRegistry,
	StyleSheet,
	Text,
	Image,
	ScrollView,
	TouchableHighlight,
	TouchableOpacity,
	NavigatorIOS,
	Navigator,
	RefreshControl,
	View,
	ListView
} from 'react-native';
import React,{Component} from 'react';
import Login from './login';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import {fetchPostsIfNeeded} from '../actions/navigatorAction'


//Inavigator类是登录得首页
class INavigator extends Component{
	constructor(props){
		super(props);
	}

	componentDidMount(){
		// selectedReddit来自于mapStateToProps dispatch 来自于store
		const {dispatch,selectedReddit}=this.props;
		//console.log(dispatch)
		//console.log(selectedReddit)
		//console.log(this.props)
		dispatch(fetchPostsIfNeeded(selectedReddit))
	}



	render(){
		let defaultName='My First Scene';
		let defaultComponent=Login;

		return(
			
				<Navigator
					initialRoute={{name:defaultName,component:defaultComponent,index:0}}
					renderScene={(route,navigator)=>{
						let Component=route.component; //这个就是defaultComponent
						return <Component {...route.params} navigator={navigator} />
					}} />	
		);
	}
}



function mapStateToProps(state,ownProps){
	//console.log(ownProps);
	//console.log(state);
	//这里的state就是store里面的各种键值对，这里的selectedReddit 是fronted或者reactjs,  store是个外壳
	const {selectedReddit,postsByReddit}= state;
	const {
		isFetching,
		lastUpdated,
		items:posts
	}=postsByReddit[selectedReddit] ||{
		isFetching:true,
		items:[]
	}

	return {
		selectedReddit,
		posts,
		isFetching,
		lastUpdated,
		postsByReddit
	}
}
//以下展示两种包裹action的方法，使它们等价于disptch(action)
const mapDispatchToProps=(dispatch,ownProps)=>{
	return {
		increment:(id)=>dispatch(actions.increment(id)),
		someActions:bindActionCreators(counterActions,dispatch)
	}
}

//也可以在这里面直接定义参数函数，注意没有return
//const MyNavigator=connect(mapStateToProps,mapDispatchToProps)(INavigator);

const MyNavigator=connect(mapStateToProps)(INavigator);
export default MyNavigator












