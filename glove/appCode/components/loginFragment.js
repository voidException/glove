//该组件用于实现登陆的
//在login页面，最下面是还没注册 和忘记密码
import  React,{ Component} from 'react';
import {ScrollView,Text,View,StyleSheet,TextInput,TouchableOpacity,TouchableWithoutFeedback,Dimensions} from 'react-native';
let { width,height}=Dimensions.get('window');
var dismissKeyboard = require('dismissKeyboard');
var KeyboardSpacer = require('react-native-keyboard-spacer');


export default class LoginFragment extends Component{
	constructor(props){
		super(props);
		this.state={
			userEmail:null,
			userPassword:null
		}

	}
	
	dismiss(){ //这种方法也可以隐藏键盘，在
		dismissKeyboard();
		//接下来这里发送请求dispatch
	}
	handleEmailChange(event){
	  	this.setState({
	  		userEmail:event.nativeEvent.text
	  	});	
	  	//console.log(event.nativeEvent.text);
    }
    handlePassChange(event){
    	this.setState({
    		userPassword:event.nativeEvent.text
    	});
    }
    verify(){
    	//校验邮箱和密码是否合法 
    	console.log('verify');
    }
    focusNextField(nextField){
    	//点击return时，密码框自动获得焦点
    	this.refs[nextField].focus();
    }
	render(){
		return(
			    <ScrollView>
				<View style={styles.email}>
					<Text>邮箱</Text>
					<TextInput 
						style={styles.emailinput}
						placeholder='请输入您的邮箱'
						placeholderTextColor='red'
						keyboardType='email-address'
						maxLength={30}	
						ref='refemail'	
						textAlign='center'	
						autoCapitalize='none'	
						clearButtonMode='always'
						clearTextOnFocus={false}	
						keyboardAppearance='dark'
						autoCorrect={false}	
						onChange={this.handleEmailChange.bind(this)}						
						onSubmitEditing={() => this.focusNextField('refpass')}
						onFocus={() => { this.refs.refemail.focus() }}
					/>
				</View>
				<View style={styles.password}>
					<Text>密码</Text>
					<TextInput
						 style={styles.passwordinput}
						 ref='refpass'
						 placeholder='只能是字母数字和一些特殊符号'
						 maxLength={30}
						 textAlign='center'
						 autoCapitalize='none'
						 clearButtonMode='always'
						 autoCorrect={false}
						 onChange={this.handlePassChange.bind(this)}
						 onSubmitEditing={this.verify.bind(this)}
						 onFocus={() => { this.refs.refpass.focus() }}
						 />
				</View>
				<KeyboardSpacer/>
				<TouchableOpacity 
					style={styles.loginwrap}
					onPress={this.dismiss.bind(this)}>					
					<Text style={styles.login}>登陆</Text>
				
				</TouchableOpacity>
				
			</ScrollView>
		);
	}
}


let styles=StyleSheet.create({
	container:{
		flex:1,
		flexDirection:'column'
	},
	containerScroll: {
	    flex: 1,
	    backgroundColor: '#F5FCFF',
	  },
	content: {
	    justifyContent: 'center',
	    alignItems: 'center'
	  },
	email:{
		flexDirection:'row',
		marginBottom:4,
		alignItems:'center',
		justifyContent:'space-around',


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
		marginTop:40,
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


















