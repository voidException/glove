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
	ListView,
	PixelRatio,
	Platform,
	Dimensions
} from 'react-native';
import React,{Component} from 'react';
import ZhuanfaPageWrapper from './zhuanfaPage';
let ratio = PixelRatio.get();
let lineHeight = Platform.OS === 'ios' ? 14 : 16;
let statusBarHeight = Platform.OS === 'ios' ? 20 : 0;
let width=Dimensions.get('window').width;
let height=Dimensions.get('window').height;
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
						<Image source={require('./image/ic_web_back.png')} style={styles.backImg} resizeMode={'contain'} />
						<Text style={{fontSize:18,color:'red'}}>返回</Text>
					</TouchableOpacity>
					<Text style={styles.broad}> 传播温暖</Text>
					<View style={{width:30}}>
						<Text>留言</Text>
					</View>
				</View>

				
                {/* 这里是项目或者推文的详情*/}
				<View style={styles.commentBottomWrapper}>
				
					<View style={styles.shareText}>
						<Text style={styles.shareTxt}>传播到:</Text>
					</View>	
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

				</View>
			</View>
		);
	}
}

let styles=StyleSheet.create({
	container:{
		flex:1,
		backgroundColor:'#F9F9F9',
	},
	backImg:{
		height:18,
		width:18
	},
	shareText:{
		marginTop:10,
		marginLeft:5
	},
	shareTxt:{
		fontSize:18,
		color:'red'
	},
	broadcast:{
		height:64,
		backgroundColor:'#69B94C',
		flexDirection:'row',
		alignItems:'center',
		justifyContent:'space-between',

	},
	returnButton:{
		flexDirection:'row',
		justifyContent:'flex-start'
	},
	broad:{
		textAlign:'center',
		fontSize:18,
		color:'#FFFFFF'
	},
	shareWrapper:{
		flexDirection:'row',
		justifyContent:'space-between',
		borderTopWidth:1/ratio,
		borderBottomWidth:1/ratio,
		borderTopColor:'red',
		paddingLeft:10,
		paddingRight:10
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
		justifyContent:'space-around',
		alignItems:'center',
		height:30,
		backgroundColor:'#FFFFFF'
	},
	comment:{
		flexDirection:'row',
		alignItems:'center',
		borderBottomWidth:1,
		borderColor:'red',

	},
	commentBottomWrapper:{
		position:'absolute',
		width:width,
		bottom:0,
		//flexDirection:'row',
		justifyContent:'space-around',
		//alignItems:'center',
		height:110,
		backgroundColor:'#FFFFFF'
	},
	bottomer:{
		flexDirection:'row',
	},
	bottomerImg:{
		width:15,
		height:15
	}
});

