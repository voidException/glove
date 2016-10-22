//该组件用于实现登陆的
//在login页面，最下面是还没注册 和忘记密码
import  React,{ Component} from 'react';
import { Modal,NativeAppEventEmitter, PixelRatio,ScrollView,
	Text,Picker,View,StyleSheet,TextInput,TouchableOpacity,
	TouchableWithoutFeedback,Dimensions,DeviceEventEmitter,
	AsyncStorage
}from 'react-native';

import ErrorTips from './errorTips';
import {fetchUserProfileIfNeeded} from '../actions/userProfileAction';
import MyMainPage from '../pages/mainPage';
import { connect } from 'react-redux';
import ModalTips from './modalTips';

let { width,height}=Dimensions.get('window');
var dismissKeyboard = require('dismissKeyboard');
//var KeyboardSpacer = require('react-native-keyboard-spacer');
let ratio = PixelRatio.get();
//对于包含多个输入域的


export default class DengLuFragment extends Component{
	constructor(props){
		super(props);
		this.state={
			userEmail:null,
			userPassword:null,
			onoff:null,
			animationType: 'none',
      		modalVisible: false,
      		transparent: true,
      		content: 'hello world',
		}

	}
	pickerFun(e){    
   	    this.setState({
   	    	pickerValue:e
   	    });
    }
	//一旦该组件的某个props属性改变了，就会执行这个方法，真是太好了
	componentWillReceiveProps(nextProps) {		
		if(nextProps.userProfile.logined!==this.props.userProfile.logined){
			this.goMainPage();
		}
	}
	goMainPage(){
		 let Route={component:MyMainPage,index:1}
		 this.props.navigator.replace(Route);
	    // this.props.navigator.push({
		   //  component:MyMainPage,
		   //  // params:{
		   //  //     navigator:this.props.navigator,
		   //  // }
	    // });
    }
    componentDidMount(){
		//this.startLogin();
		this.autoLogin()
	}
	autoLogin(){
		AsyncStorage.multiGet(['userid','userpassword','useremail'] ,(err, result) => {   
            if (result!==null) {
                //console.log(result);
                //获取result中的数据，设置state ,调用startLogin，发起请求              
            }else{
            	 console.log('没有数据');
            	return;
            }

        }); //AsyncStorage
                
	}
	startLogin(){ 
		dismissKeyboard(); //先隐藏键盘		
		/*
		 if(!this.verify()){
		 	return ;
		 }//校验邮箱和密码是否合法
		 */
		this.setState({
			modalVisible:false
		});
 
		let userAccount={
			userEmail:this.state.userEmail,
			userPassword:this.state.userPassword
		};

		const  {dispatch} =this.props;
		dispatch(fetchUserProfileIfNeeded(userAccount));	
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
	verify(){
    	//输入完密码，点击return时，校验邮箱和密码是否合法 
    	//console.log('verify');
    	let email=this.state.userEmail;
    	let password=this.state.userPassword;
    	let regx=/^[A-Za-zd]+([-_.][A-Za-zd]+)*@([A-Za-zd]+[-.])+[A-Za-zd]{2,5}$/; 

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
	handleEmailChange(event){
	  	this.setState({
	  		userEmail:event.nativeEvent.text
	  	});	
	  	console.log(event.nativeEvent.text);
    }
    handlePassChange(event){
    	this.setState({
    		userPassword:event.nativeEvent.text
    	});
    	console.log(event.nativeEvent.text);
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
  
    _setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }
	render(){
		let errTip=this.state.onoff ? <ErrorTips />: null;

			
		  let modalBackgroundStyle = {
            backgroundColor: this.state.transparent ? 'rgba(0, 0, 0, 0.5)' : '#f5fcff',
        };
        let innerContainerTransparentStyle = this.state.transparent ? {backgroundColor: '#fff', padding: 10}: null;
    	let activeButtonStyle = {
      		backgroundColor: '#ddd'
    	};
		//console.log(errTip);
		return(
			<View>
				<View style={styles.email}>
				    <View style={styles.labelWrap}>
						<Text style={styles.emailText}>邮箱</Text>
					</View>
					<View style={styles.inputWrap}>
						<TextInput 
							style={styles.passwordinput}
							placeholder='输入您注册的邮箱'						
							keyboardType='email-address'
							maxLength={30}	
							ref='refemail'									
							autoCapitalize='none'	
							clearButtonMode='always'
							clearTextOnFocus={false}	
							keyboardAppearance='dark'
							autoCorrect={false}	
							onChange={this.handleEmailChange.bind(this)}						
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
							 placeholder=''
							 maxLength={18}
							 placeholder={'6到18密码'}
							 autoCapitalize='none'
							 clearButtonMode='always'
							 autoCorrect={false}
							 onChange={this.handlePassChange.bind(this)}
							 onSubmitEditing={this.verify.bind(this)}
							 onFocus={this.focusTocleanPass.bind(this)}/>
					</View>
				</View>					    
				<View style={styles.err}>{errTip}</View>

			    <View>
	  				<Modal			       
	  			    	animationType={this.state.animationType}
	            		transparent={this.state.transparent}
	           			visible={this.state.modalVisible}
	            		onRequestClose={this._setModalVisible.bind(this,false)}>

	            		<View style={[styles.modalContainer, modalBackgroundStyle]}>
	  	          			<View style={[styles.innerContainer, innerContainerTransparentStyle]}>
	  	          				<Text>{this.state.content}</Text>
	  		          			<View style={styles.close}>
	  		          				<Text style={styles.txt} onPress={this._setModalVisible.bind(this,false)}>关闭</Text>
	  	          			    </View>
	            			</View>            			    
	  	          		</View>
	  			    </Modal>
				</View>	 

				<View  style={styles.loginwrap}>					
					<Text onPress={this.startLogin.bind(this)} style={styles.login}>登  录</Text>

				</View>	
	           
		    </View>
		);
	}
}
function mapStateToProps(state,ownProps){
	//console.log(ownProps);
	//console.log(state);
	//这里的state就是store里面的各种键值对，这里的selectedReddit 是fronted或者reactjs,  store是个外壳
	//在这个函数中，应该从store中取出所有需要的state，向下传递
	const { userProfile }= state;	
	return {
		userProfile,
	}
}
const LoginFragment=connect(mapStateToProps)(DengLuFragment);
export default LoginFragment ;


let styles=StyleSheet.create({
	container:{
		flex:1,
		flexDirection:'column'
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

	modalContainer:{
		flex:1,
		flexDirection:'column',
		alignItems:'center',
		justifyContent:'center'
	},
	innerContainer: {
		 flexDirection:'column',
		 justifyContent:'center',
         borderRadius: 10,
         alignItems: 'center',
         backgroundColor:'#FFFFFF',
         height:100,
         width:200,
    },
    close:{
    	marginTop:10,
    	flexDirection:'row',
    	alignItems:'center',
    	justifyContent:'center',
    },
    txt:{
       color:'red'
    }

});


















