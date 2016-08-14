//该页面是5大页面的容器，

import{
	StyleSheet,
	Text,
	Image,
	ScrollView,
	TouchableOpacity,
	NavigatorIOS,
	Navigator,
	RefreshControl,
	View,
	ListView
} from 'react-native';
import React,{Component} from 'react';

export default class WeiBoContent extends Component{
	constructor(props){
		super(props);
		
	}
	backUp(){
		this.props.navigator.pop();
	}
	render(){
		return(
			<View style={styles.container}> 			
				<View style={styles.broadcast}>
					<TouchableOpacity onPress={this.backUp.bind(this)} style={styles.returnButton}>
						<Text >﹤ 返回</Text>
					</TouchableOpacity>
					<Text style={styles.broad}> 传播温暖</Text>
				</View>

				<View style={styles.shareText}><Text>分享到</Text></View>
				<View style={styles.shareWrapper}> 					
					<View style={styles.shareItemWrapper}>
						<Image source={require('../imgs/weixin.png')}  style={styles.shareItem} resizeMode={'contain'}/>
						<Text>朋友圈</Text>
					</View>

					<View style={styles.shareItemWrapper}>
						<Image source={require('../imgs/qzone.jpg')} style={styles.shareItem} resizeMode={'contain'} />
						<Text>Qzone</Text>
					</View>

					<View style={styles.shareItemWrapper}>
						<Image source={require('../imgs/weibo.png')}  style={styles.shareItem} resizeMode={'contain'}/>
						<Text>微博</Text>
					</View>
				</View>

				<View style={styles.commentWrapper}>
					<TouchableOpacity>
						<Text>转发</Text>
					</TouchableOpacity>

					<TouchableOpacity>
						<Text>评论</Text>
					</TouchableOpacity>
				</View>
			</View>
		);
	}
}

let styles=StyleSheet.create({
	container:{
	
		marginTop:20
	},
	shareText:{
		marginTop:20,
	},
	broadcast:{
		flexDirection:'row',
		justifyContent:'center',

	},
	returnButton:{
		position:'absolute',
		left:2
	},
	broad:{
		textAlign:'center'
	},
	shareWrapper:{
		flexDirection:'row',
		flex:1,
		justifyContent:'space-between',
		borderBottomWidth:1,
		borderColor:'red',
		marginLeft:10,
		marginRight:10
	},
	shareItemWrapper:{
		
		alignItems:'center'
	},
	shareItem:{
		width:60,
		height:60
	},
	commentWrapper:{
		flexDirection:'row',
		justifyContent:'space-around'
	}

});

