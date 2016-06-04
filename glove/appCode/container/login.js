
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
import ProductDetail from '../pages/productDetail';
import LoginFragment from '../components/loginFragment';

let {width,height}=Dimensions.get('window');

export default class Login extends Component{
	constructor(props){
		super(props);
	}
	//私有方法
    _toIphoneList(url){
    this.props.navigator.push({
      component:ProductDetail,
      passProps:{
        productID:100201,
        
      }
    });

  }
	render(){
		return(
			<View style={styles.container}> 
				<View style={styles.userPhoto}>
				    <UserPhoto />
				</View>
				<View style={styles.loginwrap}>
					<LoginFragment />
				</View>
				<View style={styles.bottom}>
					<TouchableOpacity onPress={this._toIphoneList.bind(this)} underlayColor='#E1F6FF'>
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
		flexDirection:'column',
		marginTop:40
	},
	userPhoto:{
		justifyContent:'flex-start',
		alignItems:'center'
	},
	loginwrap:{
		marginTop:60,
	},
	bottom:{
		flex:1,
		flexDirection:'row',
		alignItems:'flex-end',
		justifyContent:'space-around',
		marginTop:100
	}



});

