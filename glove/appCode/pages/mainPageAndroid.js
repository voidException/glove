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
	ListView,
	TabBarIOS,
	Dimensions
} from 'react-native';
import React,{Component} from 'react';
import Loading from '../loading/loading';
import FaxianPage from './faxianPage/faxianPage';
import HelpPage from './messagePage/helpPage';
import TuiWenPageWrapper from './tuiwenPage/tuiwenPage';
import WoPage  from './woPage/woPage';
import ItemPageWrapper from './zhuPage/itemPage';
import TabNavigator from 'react-native-tab-navigator';
import { connect } from 'react-redux';
import { fetchTuiwenPageIfNeeded } from '../actions/tuiwenPageAction';
let { width,height}=Dimensions.get('window');
 class MainPageAndroid extends Component{
	constructor(props){
		super(props);
		this.state={
			selectedTab:'tuiwen',
			
		}	
		//console.log(this.props)
	}
	componentWillMount(){
		//console.log(this.props);
		// let requestParams={
		// 	userID:1,
		// 	page:1,
		// 	pageSize:6
		// };
		// const {dispatch}=this.props;
		//dispatch(fetchTuiwenPageIfNeeded(requestParams))
	}
	render(){
		let tabBarStyle = {
    		position: 'absolute',
    		top: height - 49 - 25 //tabbar height默认是49dp statusBar 25dp
    	};
		let sceneStyle = {};
		return(	
			<View style={styles.container}>
			    <TabNavigator  tabBarStyle={tabBarStyle} sceneStyle={sceneStyle}>
					<TabNavigator.Item
					    selected={this.state.selectedTab==='tuiwen'}
					    title="推文"
					    renderIcon={() => <Image source={require('./imgs/Public_btn_01_nor_.png')} />}
					    renderSelectedIcon={() => <Image source={require('./imgs/Public_btn_01_nor_.png')} />}
					    badgeText="1"
					    onPress={() => this.setState({ selectedTab: 'tuiwen' })}>
					    <TuiWenPageWrapper {...this.props}/>
					</TabNavigator.Item>
					<TabNavigator.Item
					    selected={this.state.selectedTab === 'message'}
					    title="资助"
					    renderIcon={() => <Image source={require('./imgs/Public_btn_03_nor_.png')} />}
					    renderSelectedIcon={() => <Image source={require('./imgs/Public_btn_03_nor_.png')} />}
					    onPress={() => this.setState({ selectedTab: 'message' })}>
					    <HelpPage {...this.props}/>
					</TabNavigator.Item>
					<TabNavigator.Item
					    selected={this.state.selectedTab === 'find'}
					    title="发现"
					    renderIcon={() => <Image source={require('./imgs/Public_btn_03_nor_.png')} />}
					    renderSelectedIcon={() => <Image source={require('./imgs/Public_btn_03_nor_.png')} />}
					    onPress={() => this.setState({ selectedTab: 'find' })}>
					    <FaxianPage {...this.props}/>
					</TabNavigator.Item>
					<TabNavigator.Item
					    selected={this.state.selectedTab === 'wo'}
					    title="我"
					    renderIcon={() => <Image source={require('./imgs/Public_btn_03_nor_.png')} />}
					    renderSelectedIcon={() => <Image source={require('./imgs/Public_btn_03_nor_.png')} />}
					    onPress={() => this.setState({ selectedTab: 'wo' })}>
					    <WoPage {...this.props}/>
					</TabNavigator.Item>

				</TabNavigator>			
			</View>
		);
	}
}

const MyMainPageAndroid=connect()(MainPageAndroid);
export default MyMainPageAndroid;

let styles=StyleSheet.create({
	container:{
		flex:1,
		backgroundColor:'#fff',
	},
});






























