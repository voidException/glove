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

export default class FaxianPage extends Component{
	constructor(props){
		super(props);
		
	}

	render(){
		return(
			<View style={styles.container}> 
			
				<Text> 发现页面</Text>
			</View>
		);
	}
}

let styles=StyleSheet.create({
	container:{
		flex:1,
		marginTop:100
	}
});

