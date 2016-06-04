//该组件用于实现登陆的
//在login页面，最下面是还没注册 和忘记密码
import  React,{ Component} from 'react';
import {Text,View,StyleSheet,TextInput,TouchableOpacity,TouchableWithoutFeedback,Dimensions} from 'react-native';
let { width,height}=Dimensions.get('window');
var dismissKeyboard = require('dismissKeyboard');

export default class LoginFragment extends Component{
	constructor(props){
		super(props);

	}
	containerTouched(event) {
	  this.refs.textInput.blur();
	  return false;
	}

	dismiss(){ //哈哈，能用了
		dismissKeyboard();
	}

	render(){
		return(
			<View >
				<View style={styles.email}  onStartShouldSetResponder={this.containerTouched.bind(this)}>
					<Text>邮箱</Text>
					<TextInput 
						style={styles.emailinput}
						placeholder='请输入您的邮箱'
						placeholderTextColor='red'
						keyboardType='email-address'
						maxLength={30}	
						ref='textInput'					
					/>
				</View>
				<View style={styles.password}>
					<Text>密码</Text>
					<TextInput
						 style={styles.passwordinput}
						 />
				</View>
				<TouchableOpacity 
					 style={styles.loginwrap}
					 onPress={this.dismiss.bind(this)}>
					
					<Text style={styles.login}>登陆</Text>
					
				</TouchableOpacity>
			</View>
		);
	}
}


let styles=StyleSheet.create({
	container:{
		flex:1,
		flexDirection:'column'
	},

	email:{
		flexDirection:'row',
		marginBottom:4,
		alignItems:'center',
		justifyContent:'space-around'

	},
	emailinput:{
		height:30,
		width: width-50,
		marginRight:10,
		borderWidth:1,
		borderColor:'gray'
	},
	password:{
		flexDirection:'row',
		alignItems:'center',
		justifyContent:'space-around'
	},
	passwordinput:{
		height:30,
		width: width-50,
		marginRight:10,
		borderWidth:1,
		borderColor:'gray'
	},
	loginwrap:{
		marginTop:60,
		alignItems:'flex-end',
		width:width
	},
	login:{
		backgroundColor:'#018cca',
		
		height:30,
		width:width-50,
		textAlign:'center',
		lineHeight:20,
		marginRight:13

	}

});


















