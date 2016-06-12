//该页面是5大页面的容器，

import{
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
import WeiBoContent  from './weiboContent';
import { fetchTuiwenPageIfNeeded } from '../../actions/tuiwenPageAction';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
//import {fetchTuiWenPage} from '../../actions/tuiwenPageAction';
class TuiWenPage extends Component{
	constructor(props){
		super(props);
		
	}
	 componentWillMount(){
		//console.log(this.props);
		let requestParams={
			userID:1,
			page:1,
			pageSize:6
		};
		const {dispatch}=this.props;
		dispatch(fetchTuiwenPageIfNeeded(requestParams))
		//console.log(this.props)
	}

	goWeiBoText(){
	    this.props.navigator.push({
		    component:WeiBoContent
	    });
	}

	getWeiBo(){
		//console.log(this.props)
		
	}

	render(){
		return(
			<View style={styles.container}> 
			    <TouchableOpacity
					onPress={this.getWeiBo.bind(this)}>
				    <Text> 这个是推文页面</Text>
				</TouchableOpacity>
			</View>
		);
	}
}

function mapStateToProps(state,ownProps){
	//console.log(ownProps);
	//console.log(state);
	//这里的state就是store里面的各种键值对，这里的selectedReddit 是fronted或者reactjs,  store是个外壳
	//在这个函数中，应该从store中取出所有需要的state，向下传递
	const { userProfile,weiboList }= state;	
	return {
		userid:userProfile.items.userid,
		weiboList:weiboList
	}
}
//以下展示两种包裹action的方法，使它们等价于disptch(action)
//  const mapDispatchToProps=(dispatch,ownProps)=>{
	
//  	return {
// 		getLists:()=>{
// 			dispatch(fetchTuiwenPageIfNeeded(requestParams))
// 		}
// 		someActions:bindActionCreators(fetchTuiwenPageIfNeeded(requestParams),dispatch)
//  	}
// }

//也可以在这里面直接定义参数函数，注意没有return
//const MyNavigator=connect(mapStateToProps,mapDispatchToProps)(INavigator);
//const MyNavigator=connect(mapStateToProps)(INavigator);
//const TuiWenPageWrapper=connect(mapStateToProps)(TuiWenPage);
const TuiWenPageWrapper=connect(mapStateToProps)(TuiWenPage);
export default TuiWenPageWrapper


let styles=StyleSheet.create({
	container:{
		flex:1,
		marginTop:100
	}
});

