//该页面是5大页面的容器，

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
	ListView
} from 'react-native';
import React,{Component} from 'react';

export default class WeiBoContent extends Component{
	constructor(props){
		super(props);
		
	}

	render(){
		return(
			<View style={styles.container}> 
			
				<Text> 具体的一条微博</Text>
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

