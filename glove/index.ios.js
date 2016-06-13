import{
	AppRegistry,
	StyleSheet,
	Text,
	Image,
	TouchableHighlight,
	TouchableOpacity,
	Navigator,
	View,
	Dimensions
} from 'react-native';
import React,{ Component } from 'react';
import App from './appCode/container/app.js'

let {width,height}=Dimensions.get('window');

class Ap extends Component{
	constructor(props){
		super(props);
	}

	render(){
		//let row=this.props.row;

		return(
			<View style={{flex:1 ,marginTop:60}}>
				
				<View style={styles.header}>
					<View>
						<Image source={require('./appCode/image/default.jpg')} resizeMode={'contain'} style={styles.image}/>	
						<View style={styles.nameV}>
							<Text>小神经很Ok</Text>
							<Text>大V</Text>
						</View>
					</View>
					<Text>求助人</Text>
				</View>

			
				<View>
					<Text>莫泰山携百亿私募回归 私募逐鹿公募尚待制度落地】在竞相争夺公募基金牌照的多家私募基金中又增添了一位实力悍将。随着上海博道投资管理有限公司(以下简称“博道投资”)加入公募基金牌照申请阵营</Text>
				</View>
				<View>
					<Text>原来推文的内容近日，罗湖海关截获 “ 李斯特菌 ”280 瓶。1 内地旅客从罗湖口岸入境被抽查发现，其携带有几百个装有细小褐色颗粒的瓶子，经现场初步判定为李斯特菌。</Text>
				</View>
				<View style={styles.footer}>
					<Text>转发</Text>
					<Text>评论</Text>
					<Text>捐助</Text>
				</View>
			</View>
		);
	}
}

let styles=StyleSheet.create({
	container:{
		width:40,
		height:40,	
	},
	image:{
		width:40,
		height:40,
		
	},
	header:{
		flexDirection:'row',
		width:width,
		height:70,
		justifyContent:'space-between'
		
	},
	nameV:{
		flexDirection:'column',

	},
	footer:{
		flexDirection:'row',
		justifyContent:'space-between'
	}


});
AppRegistry.registerComponent('glove', () => Ap);














