import React,{Component} from 'react';
import {View ,StyleSheet,Text} from 'react-native';

export default class ErrorTips  extends Component{
	constructor(props){
		super(props);
	}

	render(){
		return(
			<View>
				<Text>您输入的邮箱或密码有误</Text>
			</View>
		);
	}
}