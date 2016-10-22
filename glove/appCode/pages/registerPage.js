//该组件用于实现登陆的
//在login页面，最下面是还没注册 和忘记密码
import  React,{ Component} from 'react';
import { NativeAppEventEmitter, PixelRatio,ScrollView,Text,Picker,View,StyleSheet,TextInput,TouchableOpacity,TouchableWithoutFeedback,Dimensions,DeviceEventEmitter} from 'react-native';
//import ErrorTips from './errorTips';
import {fetchUserProfileIfNeeded} from '../actions/userProfileAction';
import MyMainPage from '../pages/mainPage';
import { connect } from 'react-redux';
let { width,height}=Dimensions.get('window');
var dismissKeyboard = require('dismissKeyboard');
//var KeyboardSpacer = require('react-native-keyboard-spacer');
let ratio = PixelRatio.get();

export default class RegisterPage extends Component{
	constructor(props){
		super(props);
		this.state={
			userEmail:null,
			userPassword:null,
			onoff:null 
		}

	}
	componentDidMount(){
		//console.log();
		this.startLogin();

	}
	pickerFun(e){
   	    console.log(e);
   	    this.setState({
   	    	pickerValue:e
   	    });
   }
	//一旦该组件的某个props属性改变了，就会执行这个方法，真是太好了
	componentWillReceiveProps(nextProps) {
		
		//console.log(nextProps.userProfile.logined); //true
		//console.log(this.props.userProfile.logined); //false
		if(nextProps.userProfile.logined!==this.props.userProfile.logined){
			this.goMainPage();
		}


	}
	goMainPage(){
		
	    this.props.navigator.push({
		    component:MyMainPage,
		    // params:{
		    //     navigator:this.props.navigator,
		    // }
	    });
    }
    

	startLogin(){ 
		dismissKeyboard(); //先隐藏键盘
		//dispatch从父组件一层层传递下来，
		//为了开发方便先注释掉
		/*
		 if(!this.verify()){
		 	return ;
		 }//校验
		 */
		let userAccount={
			userEmail:this.state.userEmail,
			userPassword:this.state.userPassword
		};
		const  {dispatch} =this.props;
		//dispatch(fetchUserProfileIfNeeded( userAccount));	
		//DeviceEventEmitter.emit('loginSuccess', { });
		//this.goMainPage();
		// this.goMainPage();
		//使用以下两种方法都可以
		/*
		DeviceEventEmitter.emit('loginSuccess', { });
		
		setTimeout(() => {
			    if(this.props.userProfile.logined){
				     this.goMainPage();
			     }
			}, 3000);
		 */
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
    	//输入完密码，点击return时，校验邮箱和密码是否合法 
    	//console.log('verify');
    	let email=this.state.userEmail;
    	let password=this.state.userPassword;
    	let regx=/^[A-Za-zd]+([-_.][A-Za-zd]+)*@([A-Za-zd]+[-.])+[A-Za-zd]{2,5}$/; 
    	//let regexps=^[a-zA-Z]\w{5,17}$; //以字母开头，长度在6~18之间，只能包含字母、数字和下划线
    	if(email===null ||password===null ||email.length<10  || password<6 || regx.test(email)){
    		//控制'您输入的邮箱或密码有误'
    		this.setState({
    			onoff:1
    		});
    		return false;
    		//console.log(this.state.onoff);
    	}
    	return true;
    }
    focusNextField(nextField){
    	//点击return时，密码框自动获得焦点
    	this.refs[nextField].focus();
    }
    //如果弹出提示错误，那么用户点击邮箱或者密码输入框的时候，提示错误应该消失
    focusToclean(){
    	this.refs.refemail.focus();
    	this.setState({
    		onoff:null
    	});
    }
    focusTocleanPass(){
    	this.refs.refpass.focus();
    	this.setState({
    		onoff:null
    	});
    }
    goBack(){
    	this.props.navigator.pop()
    }
	render(){
		//let errTip=this.state.onoff ? <ErrorTips />: null;
		//console.log(errTip);
		return(
			<View>
			    <View style={styles.header}>
			    	<View style={styles.returnMe}><Text onPress={this.goBack.bind(this)} style={{color:'#FFFFFF',fontSize:16}}>返回</Text></View>
					<Text style={{color:'#FFFFFF',fontSize:16}}>捐助即保险</Text>
				</View>
				<View style={styles.glove}>
					<Text style={{color:'green',fontSize:16}}>给点爱，一起温暖世界</Text>
				</View>

				<View style={styles.email}>
				    <View style={styles.labelWrap}>
						<Text style={styles.emailText}>邮箱</Text>
					</View>
					<View style={styles.inputWrap}>
						<TextInput 
							style={styles.passwordinput}
							placeholder='邮箱长度不得大于30字符'
							
							keyboardType='email-address'
							maxLength={30}	
							ref='refemail'	
								
							autoCapitalize='none'	
							clearButtonMode='always'
							clearTextOnFocus={false}	
							keyboardAppearance='dark'
							autoCorrect={false}	
							onChange={this.handleEmailChange.bind(this)}						
							onSubmitEditing={() => this.focusNextField('refpass')}
							onFocus={this.focusToclean.bind(this)}/>
						</View>
				</View>
				<View style={styles.email}>
				    <View style={styles.labelWrap}>
						<Text style={styles.emailText}>昵称</Text>
					</View>
					<View style={styles.inputWrap}>
						<TextInput 
							style={styles.passwordinput}
							placeholder='6到16位数字字母和常用符号，区分大小写'
							
							keyboardType='email-address'
							maxLength={30}	
							ref='refemail'	
								
							autoCapitalize='none'	
							clearButtonMode='always'
							clearTextOnFocus={false}	
							keyboardAppearance='dark'
							autoCorrect={false}	
							onChange={this.handleEmailChange.bind(this)}						
							onSubmitEditing={() => this.focusNextField('refpass')}
							onFocus={this.focusToclean.bind(this)}/>
						</View>
				</View>
				<View style={styles.password}>
					<View style={styles.labelWrap}>
                        <Text style={styles.label}>密码</Text>
                    </View>
                    <View style={styles.inputWrap}>
						<TextInput
							 style={styles.passwordinput}
							 ref='refpass'
							 placeholder='6到16数字字母特殊字符组合'
							 maxLength={30}
							
							 autoCapitalize='none'
							 clearButtonMode='always'
							 autoCorrect={false}
							 onChange={this.handlePassChange.bind(this)}
							 onSubmitEditing={this.verify.bind(this)}
							 onFocus={this.focusTocleanPass.bind(this)}/>
					</View>
				</View>
					    
				{/*<View style={styles.err}>{errTip}</View>*/}
                <View>
					<View style={styles.pickerOk}>
						<Text>一定要正确选择所在地</Text>
					</View>
					<View style={styles.pickerWrapper}>
						<Picker
							  style={{width:100}}
							  selectedValue={this.state.pickerValue}
							  onValueChange={this.pickerFun.bind(this)}>
							  <Picker.Item label="Java" value="java" />
							  <Picker.Item label="JavaScript" value="js" />
						</Picker>
						<Picker
							  style={{width:100}}
							  selectedValue={this.state.pickerValue}
							  onValueChange={this.pickerFun.bind(this)}>
							  <Picker.Item label="Java" value="java" />
							  <Picker.Item label="JavaScript" value="js" />
						</Picker>
					</View>
			    </View>
				<View  style={styles.loginwrap}>					
					<Text onPress={this.startLogin.bind(this)} style={styles.login}> 注 册</Text>				
				</View>

			
		        
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
		height:60,
		flexDirection:'row',
		justifyContent:'center',
		paddingTop:20,
		alignItems:'center',
		backgroundColor:'#61B972'
	},
	returnMe:{
		position:'absolute',
		left:5,
		top:34,
		
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
	},
	pickerOk:{
		flexDirection:'row',
		justifyContent:'flex-start',
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



















