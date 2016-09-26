import{
	StyleSheet,
	Text,
	Image,
	ScrollView,
	TouchableOpacity,
	NavigatorIOS,
	Navigator,
	RefreshControl,
	View,
	ListView,
	PixelRatio,
	Platform,
	Dimensions
} from 'react-native';
import React,{ Component } from 'react';
let ratio = PixelRatio.get();
let lineHeight = Platform.OS === 'ios' ? 14 : 16;
let statusBarHeight = Platform.OS === 'ios' ? 20 : 0;
let width=Dimensions.get('window').width;
let height=Dimensions.get('window').height;
export default class Comment extends Component{
	constructor(props){
		super(props);
	}
	render(){

		return(
			<View>
			   	<Text style={{color:'black'}}>如果是一个劳动人民当中国真的是一个劳动人民当中国真的是一个劳动人民当中国真的是一个劳动人民当中国真的是一个劳动人民当中国真的是一个劳动人民当中国真的是一个劳动人民当中国真的是一个劳动人民当中国真的是一个劳动人民当中国真的是一个劳动人民当中国真的是一个劳动人民当中国真的是一个劳动人民当中国真的是一个劳动人民当家作主的国家，各级员工都有着自己的工会，我现在要做的就是买一张火车票，去鼓动阿里安全部门的人全体大罢工。我不跟你们讲他妈逼的道理。我去采取行动。</Text>
			</View>
		);
	}

}