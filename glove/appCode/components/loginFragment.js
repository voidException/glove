//该组件用于实现登陆的
//在login页面，最下面是还没注册 和忘记密码
import  React,{ Component} from 'react';
import {Text,View,StyleSheet,TextInput,TouchableOpacity} from 'react-native';

export default class LoginFragment extends Component{
	constructor(props){
		super(props);

	}

	render(){
		return(
			<View >
				<View style={styles.email}>
					<Text>邮箱</Text>
					<TextInput />
				</View>
				<View style={styles.password}>
					<Text>密码</Text>
					<TextInput />
				</View>
				<TouchableOpacity >
					<Text style={styles.login}>登陆</Text>
				</TouchableOpacity>
			</View>
		);
	}
}


let styles=StyleSheet.create({
	container:{
		flexDirection:'column'
	},

	email:{
		flexDirection:'row',

	},

	password:{
		flexDirection:'row',
	},
	login:{
		backgroundColor:'#018cca'
	}

});


















