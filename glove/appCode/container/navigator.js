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
import { connect } from 'react-redux';
import MyMainPage from '../pages/mainPage';
import DoComment from  '../components/doComment';
import WeiBoItem from '../pages/tuiwenPage/weiboItem';
import { fetchTuiwenPageIfNeeded } from '../actions/tuiwenPageAction';
import ItemPage from '../pages/zhuPage/itemPage';
import ItemCell from '../pages/zhuPage/itemCell';
import WeiBoContent from '../pages/tuiwenPage/weiboContent';
import TuiwenItem from '../pages/tuiwenPage/tuiwenItem';
import WoPage from '../pages/woPage/woPage';
import FaxianPage from '../pages/faxianPage/faxianPage';
import HelpPage  from '../pages/messagePage/helpPage';
import Prove  from '../pages/components/prove';
import Affirm  from '../pages/components/affirm';
import PostAffirm from '../pages/components/postAffirm';
import AffirmListItem from '../pages/components/affirmListItem';
import SuperviseListItem from '../components/SuperviseListItem';
import UserPage from '../components/userPage';
import ListViewBasics from './listviewSection';
import CarList from './carList';
import ProductView  from './listViewDemo';
//Inavigator 是最外层的容器，所有的state 和dispatch都要从这里往子组件分发
class INavigator extends Component{
	constructor(props){
		super(props);
	}

	componentDidMount(){
		// 这里应该做什么事呢
		//const {dispatch,selectedReddit}=this.props;
		//console.log(dispatch)		
		//console.log(this.props)
		//通过打印log可以看出dispatch 不是state传过来的，
		// let requestParams={
		// 	userID:1,
		// 	page:1,
		// 	pageSize:6
		// };
		// const {dispatch}=this.props;
		//dispatch(fetchTuiwenPageIfNeeded(requestParams))
	}
	render(){
		let defaultName='TheLoginPage';
		//let defaultComponent=Login;
		//let defaultComponent=TuiwenItem ;
		//let defaultComponent=WoPage;
		//let defaultComponent=UserPage;
        //let defaultComponent=AffirmListItem;
        //let defaultComponent=SuperviseListItem;
        //let  defaultComponent=ListViewBasics;
        //let defaultComponent=CarList;
        let  defaultComponent=ProductView;
		return(
			
			<Navigator
				initialRoute={{name:defaultName,component:defaultComponent,index:0}}
				renderScene={(route,navigator)=>{
					let Component=route.component; //这个就是defaultComponent
					//route.params 未定义这个得好好研究
					//console.log(this.props)
					return <Component {...route.params} navigator={navigator}  />
				}
			}/>	
		);
	}
}

function mapStateToProps(state,ownProps){
	//console.log(ownProps);
	//console.log(state);
	//这里的state就是store里面的各种键值对，这里的selectedReddit 是fronted或者reactjs,  store是个外壳
	//在这个函数中，应该从store中取出所有需要的state，向下传递
	const { userProfile }= state;	
	return {
		userProfile,
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
//const MyNavigator=connect(mapStateToProps)(INavigator);
const MyNavigator=connect(mapStateToProps)(INavigator);
export default MyNavigator












