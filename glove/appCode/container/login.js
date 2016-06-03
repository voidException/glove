
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
	ListView
} from 'react-native';
import React,{ Component } from 'react';
import UserPhoto from '../components/userPhoto';
import ProductDetail from '../pages/productDetail';
import LoginFragment from '../components/loginFragment';
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
				<UserPhoto />
				<LoginFragment />

				<TouchableOpacity onPress={this._toIphoneList.bind(this)}
	                          	  underlayColor='#E1F6FF'>
	         		 <Text>还没注册？</Text>          
	        	</TouchableOpacity>
				<Text>忘记密码</Text>
			</View>
		);
	}
}

let styles=StyleSheet.create({
	container:{
		flex:1,
		marginTop:10
	}
});

