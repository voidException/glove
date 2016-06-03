
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
import ProductDetail from '../pages/productDetail';

export default class Fenqiman extends Component{
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
			
				<TouchableOpacity onPress={this._toIphoneList.bind(this)}
	                          	  underlayColor='#E1F6FF'>
	         		 <Text>秒杀专区</Text>          
	        	</TouchableOpacity>
				<Text> 这个是Fenqiman页面</Text>
			</View>
		);
	}
}

let styles=StyleSheet.create({
	container:{
		flex:1,
		marginTop:100
	}
});

