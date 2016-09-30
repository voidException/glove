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
			<View style={styles.contain}>
			   	<Text style={{color:'black'}}>这个是留言列表</Text>
			</View>
		);
	}

}

let  styles=StyleSheet.create({
	contain:{
		paddingTop:40
	}
});