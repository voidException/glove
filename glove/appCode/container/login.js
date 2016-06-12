
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
	View,
	ListView,
	Dimensions
} from 'react-native';
import React,{ Component } from 'react';
import UserPhoto from '../components/userPhoto';
import RegisterPage from '../pages/registerPage';
import LoginFragment from '../components/loginFragment';
let {width,height}=Dimensions.get('window');

export default class Login extends Component{
	constructor(props){
		super(props);
	}

	componentWillMount(){
		//console.log(this.props);
	}
	
	//私有方法
    goRegisterPage(){
	    this.props.navigator.push({
		    component:RegisterPage
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
				<View style={styles.bottom}>
					<TouchableOpacity onPress={this.goRegisterPage.bind(this)} underlayColor='#E1F6FF'>
		         		 <Text>还没注册？</Text>          
		        	</TouchableOpacity>
		        	<TouchableOpacity>
						<Text>忘记密码</Text>
					</TouchableOpacity>
				</View>
			</View>

		);
	}
}

let styles=StyleSheet.create({
	container:{
		flex:1,
		flexDirection:'column',
		marginTop:40
	},
	userPhoto:{
		justifyContent:'flex-start',
		alignItems:'center',
		marginTop:20
	},
	loginwrap:{
		marginTop:60,
	},
	bottom:{
		flex:1,
		flexDirection:'row',
		alignItems:'flex-end',
		justifyContent:'space-around',
		marginBottom:20
	}
});

