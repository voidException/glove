
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
import React,{Component} from 'react';

export default class ProductDetail extends Component{
	constructor(props){
		super(props);
		console.log(this.props.productID)
	}

	render(){
		return(
			<View style={styles.container}> 
			
				<Text> 这个是商品详情页</Text>
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

