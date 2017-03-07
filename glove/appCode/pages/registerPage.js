//该组件用于实现登陆的
//在login页面，最下面是还没注册 和忘记密码
import  React,{ Component} from 'react';
import { NativeAppEventEmitter, PixelRatio,ScrollView,Text,Image,Picker,View,StyleSheet,TextInput,TouchableOpacity,TouchableWithoutFeedback,Dimensions,DeviceEventEmitter} from 'react-native';
//import ErrorTips from './errorTips';
import {fetchUserProfileIfNeeded} from '../actions/userProfileAction';
import MyMainPage from '../pages/mainPage';
import { connect } from 'react-redux';
import fetchTool from '../utils/fetchTool';
import { URLRegister } from '../utils/url';
import Loading from '../loading/loading';
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
			nickName:null,
			cityName:null,
			onoff:null,
			visible:false
		}

	}
	componentDidMount(){
		
	}

	pickerFun(e){
   	    //console.log(e);
   	    this.setState({
   	    	pickerValue:e
   	    });
   }
	startRegister(){ 
		dismissKeyboard(); //先隐藏键盘
		//dispatch从父组件一层层传递下来，
		//为了开发方便先注释掉	
		 if(!this.verify()){
		 	return ;
		 }//校验
		let userAccount={
			userEmail:this.state.userEmail,
			userPassword:this.state.userPassword,
			userNickName:this.state.nickName,
			cityName:this.state.cityName
		};
		//console.log(userAccount);
		//发起网络请求
		let options={
            url:URLRegister,
            body: JSON.stringify(userAccount)
        };
        //显示转圈圈
        this.setState({
        	visible:true
        });
        let  response=fetchTool(options);
        response.then(resp=>{
        	  //停止转圈圈
        	  this.setState({
        	  	visible:false
        	  });
             if (resp.retcode===2000) {
              	 
              	  Alert.alert(
                        '恭喜你',
                        '注册成功',
                        [
                            { text:'好的',onPress:() => this.goBack()}

                        ]
                    );
              }else{
              	    Alert.alert(
                        '出错了',
                        resp.msg,
                        [
                            { text:'好的',onPress:() =>console.log('注册出错了')}

                        ]
                    );
              }
        }).catch(err=>{
        	//停止转圈圈
        	this.setState({
        		visible:false
        	});

        });


	}
	verify(){
    	//输入完密码，点击return时，校验邮箱和密码是否合法
    	//设置3个布尔变量，校验通过为true，否则false 
    	let email=this.state.userEmail;
    	let password=this.state.userPassword;
    	let nickName=this.state.nickName;
    	let regx=/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/; 
        let regP=/^[0-9|a-z|A-Z]\w{5,17}$/; //6-18w位数字和字母组成的密码      
        //let testEm='@567890qwertyui';
        //console.log(regP.test(testEm));
        let Vemail=false;
        let Vpass=false;
        let VnickName=false;

    	if(email!==null && email.length<31 && email.length>9 && regx.test(email)){
    		Vemail=true;
    	}
    	if (password!==null && password.length>5 && password.length<19 && regP.test(password)) {
    		Vpass=true;
    	};
    	if (nickName.length>2 && nickName.length<31) {
    		VnickName=true;
    	};
    	if (Vpass && Vemail && VnickName) {
    		return true;
    	}else{
    		return false;
    	}
    	
    }

	handleEmailChange(event){
	  	this.setState({
	  		userEmail:event.nativeEvent.text
	  	});	
	  	//console.log(event.nativeEvent.text);
    }
    handleNickNameChange(event){
    	this.setState({
    		nickName:event.nativeEvent.text
    	});
    }
    handlePassChange(event){
    	this.setState({
    		userPassword:event.nativeEvent.text
    	});
    }
    handleCityChange(event){
    	this.setState({
    		cityName:event.nativeEvent.text
    	});
    }

    // focusNextField(nextField){
    // 	//点击return时，密码框自动获得焦点
    // 	this.refs[nextField].focus();
    // }
    // //如果弹出提示错误，那么用户点击邮箱或者密码输入框的时候，提示错误应该消失
    // focusToclean(){
    // 	//this.refs.refemail.focus();
    // 	this.setState({
    // 		onoff:null
    // 	});
    // }
    // focusTocleanPass(){
    // 	this.refs.refpass.focus();
    // 	this.setState({
    // 		onoff:null
    // 	});
    // }

    goBack(){
    	this.props.navigator.pop()
    }
	render(){
		return(
			<View style={{flex:1,backgroundColor:'#FFFFFF'}}>
			    <View style={styles.header}>
			    	<TouchableOpacity onPress={this.goBack.bind(this)} style={styles.returnButton}>
						<Image source={require('./imgs/return2.png')} style={styles.backImg} resizeMode={'contain'} />
					</TouchableOpacity>
					<Text style={{color:'#FFFFFF',fontSize:16}}>捐助即保险</Text>
					<View style={{width:24}}></View>
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
							onChange={this.handleEmailChange.bind(this)}/>
					</View>
				</View>
				<View style={styles.email}>
				    <View style={styles.labelWrap}>
						<Text style={styles.emailText}>昵称</Text>
					</View>
					<View style={styles.inputWrap}>
						<TextInput 
							style={styles.passwordinput}
							placeholder='3至30字符'
							keyboardType='email-address'
							maxLength={30}	
							ref='refnickName'		
							autoCapitalize='none'	
							clearButtonMode='always'
							clearTextOnFocus={false}	
							keyboardAppearance='dark'
							autoCorrect={false}	
							onChange={this.handleNickNameChange.bind(this)}/>
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
							 placeholder='6到18数字和字符'
							 maxLength={30}							
							 autoCapitalize='none'
							 clearButtonMode='always'
							 autoCorrect={false}
							 onChange={this.handlePassChange.bind(this)}/>
					</View>
				</View>
					    
				<View style={styles.password}>
					<View style={styles.labelWrap}>
                        <Text style={styles.label}>所在城市</Text>
                    </View>
                    <View style={styles.inputWrap}>
						<TextInput
							 style={styles.passwordinput}
							 placeholder='不需带省份名，如临沂市'
							 maxLength={7}							
							 autoCapitalize='none'
							 clearButtonMode='always'
							 autoCorrect={false}
							 onChange={this.handlePassChange.bind(this)}/>
					</View>
				</View>	    
				{/*<View style={styles.err}>{errTip}</View>*/}
				{/* 
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
				*/}
				<View  style={styles.loginwrap}>					
					<Text onPress={this.startRegister.bind(this)} style={styles.login}> 注 册</Text>				
				</View>	
				<View style={{padding:5}}>					
					<Text> 提示：</Text>	
					<Text> 正确的填写城市名很重要，否则您发起的募捐将无爱心社核实。</Text>			
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



















