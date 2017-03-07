
//该组件用于实现登陆的
//在login页面，最下面是还没注册 和忘记密码
import  React,{ Component} from 'react';
import { NativeAppEventEmitter,Alert, PixelRatio,ScrollView,Text,Picker,Image,View,StyleSheet,TextInput,TouchableOpacity,TouchableWithoutFeedback,Dimensions,DeviceEventEmitter} from 'react-native';
//import ErrorTips from './errorTips';
import {fetchUserProfileIfNeeded} from '../actions/userProfileAction';
import MyMainPage from '../pages/mainPage';
import { connect } from 'react-redux';
import fetchTool from '../utils/fetchTool';
import Loading from '../loading/loading';
import { URLFindPasswd } from '../utils/url';
let { width,height}=Dimensions.get('window');
var dismissKeyboard = require('dismissKeyboard');
//var KeyboardSpacer = require('react-native-keyboard-spacer');
let ratio = PixelRatio.get();

export default class RegisterPage extends Component{
	constructor(props){
		super(props);
		this.state={
			userEmail:null,
			visible:false
		}
	}
	componentDidMount(){
		
	}
	goBack(){
    	this.props.navigator.pop()
    }

	startFindPassword(){ 
		dismissKeyboard(); //先隐藏键盘
		//dispatch从父组件一层层传递下来，
		//为了开发方便先注释掉
		if(!this.verify()){
		 	return Alert.alert(
                '邮箱有误',
                '请检查格式',
                [
                    { text:'好的',onPress:() =>console.log('检查邮箱')}

                ]
            );
		}
		let userAccount={
			userEmail:this.state.userEmail,
		}
		let options={
			url:URLFindPasswd,
			body:JSON.stringify(userAccount)
		};
		//发送请求
		this.setState({
        	visible:true
        });

        let  response=fetchTool(options);
        response.then(resp=>{
        	  //停止转圈圈
        	  this.setState({
        	  	visible:false
        	  });
              //console.log(resp);
              //如果注册成功就返回，失败就显示提示
              if (resp.retcode===2000) {
              	  this.goBack();
              }else{
              	    Alert.alert(
                        '出错了',
                        resp.msg,
                        [
                            { text:'好的',onPress:() =>console.log('找回密码出问题')}

                        ]
                    );
              }
             
        }).catch(err=>{
        	this.setState({
        		visible:false
        	});

        });
	}
	handleEmailChange(event){
	  	this.setState({
	  		userEmail:event.nativeEvent.text
	  	});	
    }
    verify(){
    	let email=this.state.userEmail;
    	let regx=/^[A-Za-zd]+([-_.][A-Za-zd]+)*@([A-Za-zd]+[-.])+[A-Za-zd]{2,5}$/; 
    	if(email===null  ||email.length<10 ||email.length>30 || regx.test(email)){   		
    		return false;
    	}
    	return true;
    }

	render(){

		return(
			<View style={{backgroundColor:'#FFFFFF',flex:1}}>			
				 <View style={styles.header}>
			    	<TouchableOpacity onPress={this.goBack.bind(this)} style={styles.returnButton}>
						<Image source={require('./imgs/return2.png')} style={styles.backImg} resizeMode={'contain'} />
					</TouchableOpacity>
					<Text style={{color:'#FFFFFF',fontSize:16}}>捐助即保险</Text>
					<View style={{width:24}}></View>
				</View>

				<View style={styles.glove}>
					<Text style={{color:'green',fontSize:16}}>密码会发送到您的邮箱📮</Text>
				</View>

				<View style={styles.email}>
				    <View style={styles.labelWrap}>
						<Text style={styles.emailText}>邮箱</Text>
					</View>
					<View style={styles.inputWrap}>
						<TextInput 
							style={styles.passwordinput}
							placeholder='请输入您的邮箱'							
							keyboardType='email-address'
							maxLength={30}	
							ref='refemail'									
							autoCapitalize='none'	
							clearButtonMode='always'
							clearTextOnFocus={false}	
							keyboardAppearance='dark'
							autoCorrect={false}	
							onChange={this.handleEmailChange.bind(this)}/>
					</View>
				</View>					    
				{/*<View style={styles.err}>{errTip}</View>*/}
				<View  style={styles.loginwrap}>					
					<Text onPress={this.startFindPassword.bind(this)} style={styles.login}>确认</Text>				
				</View>	
				<Loading  visible={this.state.visible}/>		        
		    </View>
		);
	}
}

let styles=StyleSheet.create({
	container:{
		flex:1,
		flexDirection:'column'
	},
	header:{
		height:50,
		flexDirection:'row',
		justifyContent:'space-between',
		alignItems:'center',
		backgroundColor:'#61B972',
		paddingLeft:5,
		paddingRight:5
	},
	returnButton:{
		flexDirection:'row',
		justifyContent:'flex-start',
		alignItems:'center'
	},
	backImg:{
		height:24,
		width:24
	},
	glove:{
		flexDirection:'row',
		alignItems:'center',
		justifyContent:'center',
		marginTop:20
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
        alignItems:'center',
        backgroundColor:'#FFFFFF',      
        height:44
	},
	 emailText:{
        fontSize: 16,
        marginLeft: 10,
        borderWidth: 1,
        borderColor: 'transparent',
        color:'#666666'
    },
	emailinput:{
		width:width-60,
        height:44,
        fontSize:14,     
        paddingLeft:10,
        color:'#666666'

	},
	password:{
		flexDirection: 'row',
        borderTopWidth: 1/ratio,
        borderBottomWidth: 1/ratio,
        borderColor: '#ccc',
        backgroundColor:'#FFFFFF'
	},
	 labelWrap: {
        height: 45,
        justifyContent: 'center',
    },
     label: {
        fontSize: 16,
        marginLeft: 10,
        borderWidth: 1,
        borderColor: 'transparent',
        color:'#666666'
    },
      inputWrap: {
        height: 45,
        justifyContent: 'center'
    },
	passwordinput:{
		 height: 45,
        width: 320,
        fontSize: 16,
        paddingLeft: 10,
        color:'#333333'
	},
	err:{
		flexDirection:'row',
		alignItems:'center',
		justifyContent:'center',
		marginTop:10
	},
	loginwrap:{
		flexDirection:'row',
		marginTop:20,
		alignItems:'center',
		justifyContent:'center',
		width:width,
		height:36,
		backgroundColor:'#8FDF5A'
	},
	login:{				
		fontSize:16,
		width:width,
		textAlign:'center',
		color:'#FFFFFF'
	},
	pickerOk:{
		flexDirection:'row',
		justifyContent:'space-between',
		paddingRight:10,
		paddingLeft:10,
		paddingTop:10
	},
	pickerWrapper:{
		flexDirection:'row',
		alignItems:'center',
		justifyContent:'center'
	},

});




















