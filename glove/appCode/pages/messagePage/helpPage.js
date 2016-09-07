//该页面是5大页面的容器，

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
	StatusBar,
	Platform,
    PixelRatio,
    Dimensions,
	ListView,
	WebView
} from 'react-native';
import React,{ Component } from 'react';
import Swiper from 'react-native-swiper2';
import WheelContent  from './findWheelContent';
let ratio = PixelRatio.get();
let lineHeight = Platform.OS === 'ios' ? 14 : 16;
let statusBarHeight = Platform.OS === 'ios' ? 20 : 0;
let width=Dimensions.get('window').width;
let height=Dimensions.get('window').height;
let loveImg = require('../../image/25.jpg');//慈善排行榜
export default class HelpPage extends Component{
	constructor(props){
		super(props);
		this.state={
			wheelImageOne:'http://7xihgc.com1.z0.glb.clouddn.com/lunbo1.jpg',
			wheelImageTwo:'http://7xihgc.com1.z0.glb.clouddn.com/lunbo2.jpg',
			wheelImageThree:'http://7xihgc.com1.z0.glb.clouddn.com/lunbo3.jpg',
			wheelImageOneURL:'http://www.jianshu.com/p/55b586de943d',
			wheelImageTwoURL:'http://www.jianshu.com/p/55b586de943d',
			wheelImageThreeURL:'http://www.jianshu.com/p/55b586de943d'
		}	
	}

	wheelImageTouch(url){
		
		this.props.navigator.push({
            component: WheelContent
        });
	}

	render(){
			let urlone='aaa'
			return(
				<View style={styles.wrapper}>
					<StatusBar backgroundColor='#3B3738' barStyle="default"/>
					<View style={styles.topper}>			    
					    <Text style={{fontSize:18,color:'#fff'}}>资助</Text>
					</View>
					<View style={styles.shanWater}>		    
			           	<Image source={require('./image/earth.png')} resizeMode={'cover'} style={styles.helpImg}/>
			           	<View style={styles.shanTxt}>
			           		<Text style={{color:'#4EB160'}}>越过，</Text>
			           		<Text style={{color:'#4EB160',marginLeft:-15}}>千山万水</Text>
			           		<Text style={{color:'#4EB160',marginLeft:-20}}>连接每一座城市的</Text>
			           		<Text style={{color:'#4EB160',marginLeft:-25}}>每一个爱心社</Text>
			           		<Text style={{color:'#4EB160',marginLeft:-30}}>只为温暖世界的每个角落。</Text>
			           	</View>			  
			        </View>
			        <View style={styles.clubInfo}>
			        	<View style={styles.yong}>
			        		<Image source={require('./image/plants_003.png')} resizeMode={'cover'} style={{width:25,height:25}}/>
			        		<Text style={{fontSize:17,fontWeight:'bold',color:'#1EB277'}}>爱心社、</Text>
			        		<Text style={{fontSize:17,fontWeight:'bold',color:'#1EB277'}}>青年志愿者协会</Text>
			        		<View style={styles.join}><Text style={{fontSize:12,color:'#fff'}}>现在加入></Text></View>
			        	</View>
			        	<View style={styles.clubDetailInfo}>
			        		<View>
			        			<Text style={styles.upTxt}>已有社团</Text>
			        			<Text style={styles.midTxt}>10000<Text style={{fontSize:14}}>个</Text></Text>
			        			<Text style={styles.bottomTxt}>今日↑10个</Text>
			        		</View>
			        		<View style={styles.midWrapper}>
			        			<Text style={styles.upTxt}>成员</Text>
			        			<Text style={styles.midTxt}>10000<Text style={{fontSize:14}}>人</Text></Text>
			        			<Text style={styles.bottomTxt}>今日↑10人</Text>
			        		</View>
			        		<View>
			        			<Text style={styles.upTxt}>覆盖城市</Text>
			        			<Text style={styles.midTxt}>1000<Text style={{fontSize:14}}>座</Text></Text>
			        			<Text style={styles.bottomTxt}>今日↑10座</Text>
			        		</View>
			        	</View>
			        </View>
				    <View style={styles.itemWrapperTop}>
				        <View style={styles.leftWrapper}>
					    	<Image source={require('./image/find_more_friend_bottle.png')} resizeMode={'cover'} style={styles.leftWrapperImage}/>
					    	<Text style={{fontWeight:'bold'}}>发布项目</Text>	
				    	</View>
				    	<Image source={require('./image/find_more_friend_bottle.png')} resizeMode={'contain'} style={styles.rightImage}/>

				    </View>
				     <View style={styles.itemWrapper}>
				     	<View style={styles.leftWrapper}>
					    	<Image source={require('./image/find_more_friend_near_icon.png')} resizeMode={'cover'} style={styles.leftWrapperImage}/>
					    	<Text style={{fontWeight:'bold'}}>资助一个人</Text>	
				    	</View>
				    	<Image source={require('./image/find_more_friend_near_icon.png')} resizeMode={'contain'} style={styles.rightImage}/>	    	
				    </View>
				     <View style={styles.itemWrapperTop}>
				     	<View style={styles.leftWrapper}>
					    	<Image source={require('./image/find_more_friend_photograph_icon.png')} resizeMode={'cover'} style={styles.leftWrapperImage}/>
					    	<Text style={{fontWeight:'bold'}}>资助我们</Text>
				    	</View>
				    	<Image source={require('./image/find_more_friend_photograph_icon.png')} resizeMode={'contain'} style={styles.rightImage}/>		    	
				    </View>
				     <View style={styles.itemWrapper}>
				     	<View style={styles.leftWrapper}>
					    	<Image source={require('./image/find_more_friend_scan.png')} resizeMode={'cover'} style={styles.leftWrapperImage}/>
					    	<Text style={{fontWeight:'bold'}}>赞助爱心社</Text>	
				    	</View>
				    	<Image source={require('./image/find_more_friend_scan.png')} resizeMode={'contain'} style={styles.rightImage}/>	    	
				    </View>
				   	<View style={styles.upRightImgWrapper}>
				   		<Image source={require('./image/water.png')} resizeMode={'contain'} style={styles.upRightImg}/>	
				   	</View>

		        </View>
	   );
	}
}

let styles=StyleSheet.create({
	 wrapper: {
	 	flex:1 ,
	 	backgroundColor:'#F9FFFC'	
	 },
	topper:{
	 	paddingTop:statusBarHeight,
	 	height:60,
	 	justifyContent:'center',
	 	alignItems:'center',
	 	backgroundColor:'#43AC43'
	 	
	 },
	 helpImg:{
	 	width:128,
	 	height:128,
	 	marginLeft:5
	 },
	shanWater:{
		borderBottomWidth:1/ratio,
		borderBottomColor:'#9D9D9D',
		flexDirection:'row',
		backgroundColor:'#E5F8E5',
	},
	shanTxt:{
		alignItems:'flex-start',
		justifyContent:'center',
		marginLeft:80
	},
	yong:{
		flexDirection:'row',
		backgroundColor:'#EBFAEE',
		alignItems:'center',
		justifyContent:'flex-start'
	},
	join:{
		position:'absolute',
		top:1,
		right:10,
		height:20,
		width:70,
		borderRadius:35,
		backgroundColor:'#00A85A',
		alignItems:'center',
		justifyContent:'center'
	},
	midWrapper:{
		borderRightColor:'#D2D3D4',
		borderRightWidth:1/ratio,
		borderLeftColor:'#D2D3D4',
		borderLeftWidth:1/ratio,
		width:0.3*width,
		alignItems:'center',
		justifyContent:'center'
	},
	upTxt:{
		fontWeight:'bold',
		fontSize:16,
		color:'#AEB6B0',
		marginTop:5
	},
	midTxt:{
		fontSize:18,
		color:'#4EB160',
		marginTop:5
	},
	bottomTxt:{
		fontSize:13,
		color:'#D2D3D4',
		marginTop:5
	},
	clubInfo:{

	},
	clubDetailInfo:{
		backgroundColor:'#EFFBEF',
		flexDirection:'row',
		justifyContent:'space-around'
	},
	swiper:{
	 	height:0.3*height,
	 	marginTop:1,
	 },
	slide1: {	    
	    justifyContent: 'center',
	    alignItems: 'center',
	    backgroundColor: '#BCBCBC',
	    
	  },
	slide2: {    
	    justifyContent: 'center',
	    alignItems: 'center',
	    backgroundColor: '#97CAE5',
	  
	  },
	 slide3: {  
	    justifyContent: 'center',
	    alignItems: 'center',
	    backgroundColor: '#92BBD9',
	   
	},
	itemWrapperTop:{
		//borderTopWidth:1/ratio,		
		//borderTopColor:'#9D9D9D',
		flexDirection:'row',
		justifyContent:'space-between',
		alignItems:'center',
		marginTop:20,
		backgroundColor:'#ffffff'
	},
	itemWrapper:{
		borderTopWidth:1/ratio,
		borderTopColor:'#9D9D9D',
		flexDirection:'row',
		justifyContent:'space-between',
		alignItems:'center',

		backgroundColor:'#ffffff'
	},
	leftWrapper:{
		flexDirection:'row',
		justifyContent:'flex-start',
		alignItems:'center',
	},
	leftWrapperImage:{
		width:40,
		height:40,
		marginRight:40
	},
	rightImage:{
		height:30,
		width:30,
		marginRight:10
	},
	texts: {
	   
	    fontSize: 16,
	  
	    alignSelf:'center'
	},
	upRightImgWrapper:{
		position:'absolute',
		right:10,
		top:60
	},
	upRightImg:{
		width:60,
		height:60
	}
});


