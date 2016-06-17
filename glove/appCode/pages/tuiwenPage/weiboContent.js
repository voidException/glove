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
	render(){
		return(
			<View style={styles.container}> 			
				<View style={styles.broadcast}><Text> 传播温暖</Text></View>
				<View style={styles.shareText}><Text>分享到</Text></View>
				<View style={styles.shareWrapper}> 					
					<View style={styles.shareItemWrapper}>
						<Image source={require('../imgs/weixin.png')}  style={styles.shareItemWrapper} resizeMode={'contain'}/>
						<Text>朋友圈</Text>
					</View>

					<View style={styles.shareItemWrapper}>
						<Image source={require('../imgs/qzone.jpg')} style={styles.shareItemWrapper} resizeMode={'contain'} />
						<Text>Qzone</Text>
					</View>

					<View style={styles.shareItemWrapper}>
						<Image source={require('../imgs/weibo.png')}  style={styles.shareItemWrapper} resizeMode={'contain'}/>
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
		justifyContent:'center'
	},
	shareWrapper:{
		flexDirection:'row',
		flex:1,
		justifyContent:'space-between',
		borderBottomWidth:1,
		borderColor:'red',
		height:60
	},
	shareItemWrapper:{
		width:60,
		height:40,
		alignItems:'center'
	},
	commentWrapper:{
		flexDirection:'row',
		justifyContent:'space-around'
	}

});

