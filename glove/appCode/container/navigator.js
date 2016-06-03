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

class Fenqimans extends Component{
	constructor(props){
		super(props);
	}
	render(){
		return(

			<View> 
				<Text> 这个是Fenqiman页面</Text>
			</View>
		);
	}
}
//以上Fenqimans类无用
//Inavigator类是登录得首页
class INavigator extends Component{
	constructor(props){
		super(props);
	}

	componentDidMount(){
		//
		const {dispatch,selectedReddit}=this.props;
		//console.log(dispatch)
		//console.log(selectedReddit)
		console.log(this.props)
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












