//这个用来处理用户的登陆页面的头像，
import React,{Component} from 'react';
import { View,StyleSheet,TouchableOpacity,Image} from 'react-native';

export default class UserPhoto extends Component{
	constructor(props){
		super(props);
	}

	render(){
		return(
			<View style={styles.container} >
				<Image source={require('../image/default.jpg')} resizeMode={'cover'} style={styles.image}/>		
			</View>
		);
	}

}


let styles=StyleSheet.create({
	container:{
		
		
	},
	image:{
		width:80,
		height:80,
		borderRadius:40
		
	}


});