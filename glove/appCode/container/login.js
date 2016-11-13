
import{
	AppRegistry,
	StyleSheet,
	Text,
	Image,
	ScrollView,
	TouchableHighlight,
	TouchableOpacity,
	NavigatorIOS,
	Navigator,
	RefreshControl,
	NativeAppEventEmitter,
	AsyncStorage,
	View,
	ListView,
	Dimensions,
} from 'react-native';
import React,{ Component, } from 'react';
import Loading from '../loading/loading';
import UserPhoto from '../components/userPhoto';
import RegisterPage from '../pages/registerPage';
import FindPasswordPage  from '../pages/findPasswordPage';
import LoginFragment from '../components/loginFragment';

var Platform = require('react-native').Platform;
var ImagePicker = require('react-native-image-picker');

let {width,height}=Dimensions.get('window');

var options = {
		  title: 'Select Avatar',
		  customButtons: {
		    'Choose Photo from Facebook': 'fb',
		  },
		  storageOptions: {
		    skipBackup: true,
		    path: 'images'
	}
};

export default class Login extends Component{
	constructor(props){
		super(props);

		this.state={
			avatarSource:{},
			off:2,
			showLoading:false
		};
	}
	componentWillMount(){

        NativeAppEventEmitter.addListener('loadingStart', () => {
           
            this.setState({showLoading: true});
        });

		NativeAppEventEmitter.addListener('loginSuccess', (emitData) => {
		 	this.setState({
		 		showLoading:false
		 	});
            //根据emitData的值判断是否应该存储,应该检查本次登录是否成功
            //console.log(emitData);
            if (emitData.type==1) {
            	const storageFun =async ()=>{
                    let removeCodeIDResult=await AsyncStorage.multiRemove(['userid','userpassword','useremail','token'],(error)=>{
                        //console.log(error);
                    });
                    //值必须是字符串                  
                    let saveDateResult=await AsyncStorage.multiSet([['userid',emitData.userid],['userpassword',emitData.userpassword],['useremail',emitData.useremail],['token',emitData.token]],(errors)=>{

                    });
                
                    return saveDateResult;
                }
                storageFun().then((result)=>{
                    //console.log(result);
                }).catch(err=>{
                	console.log(err);
                    console.log('存储登录信息出错')
                })
            };

		});		
     }
	
    goZhuCe(){
    	this.props.navigator.push({
            component: RegisterPage
        });
    }

    goFindPasswordPage(){
    	this.props.navigator.push({
            component: FindPasswordPage
        });
    }

	render(){
		//把这里的根View 换成ScrollView应该可以在弹出键盘的时候上移
		return(
			
			<View style={styles.container}> 
				<View style={styles.userPhoto}>
				    <UserPhoto />
				</View>

				<View style={styles.loginwrap}>
					<LoginFragment  {...this.props}/>

				</View>
				<Loading visible={this.state.showLoading} />
				<View style={styles.bottom}>
		         	 <Text  onPress={this.goZhuCe.bind(this)}>还没注册？</Text>          
		        	<Text onPress={this.goFindPasswordPage.bind(this)}>忘记密码</Text>					
				</View>
			</View>

		);
	}
}

let styles=StyleSheet.create({
	container:{
		flex:1,
		flexDirection:'column',
		marginTop:40,
		backgroundColor:'#ffffff'
	},
	userPhoto:{
		justifyContent:'flex-start',
		alignItems:'center',
		marginTop:20
	},
	loginwrap:{
		marginTop:60,
	},
	uploadAvatar:{
		width:100,
		height:100
	},
	bottom:{
		flex:1,
		flexDirection:'row',
		alignItems:'flex-end',
		justifyContent:'space-around',
		marginBottom:20
	}
});

