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

export default class FaxianPage extends Component{
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
				    <Text style={{fontSize:18,color:'#fff'}}>发现</Text>
				</View>

				<View>
				    <TouchableOpacity  onPress={this.wheelImageTouch.bind(this,urlone)}>	
		           		<Image source={{uri:this.state.wheelImageOne}} resizeMode={'cover'} style={{width:width,height:0.2*height}}/>
		            </TouchableOpacity>
		        </View>
			       
			    <View style={styles.itemWrapperTop}>
			        <View style={styles.leftWrapper}>
				    	<Image source={require('./image/find_more_friend_bottle.png')} resizeMode={'cover'} style={styles.leftWrapperImage}/>
				    	<Text>慈善排行榜</Text>	
			    	</View>
			    	<Image source={require('./image/hui_discount_item_rule_arrow.png')} resizeMode={'contain'} style={styles.rightImage}/>

			    </View>
			     <View style={styles.itemWrapper}>
			     	<View style={styles.leftWrapper}>
				    	<Image source={require('./image/find_more_friend_near_icon.png')} resizeMode={'cover'} style={styles.leftWrapperImage}/>
				    	<Text>他们需要帮助</Text>	
			    	</View>
			    	<Image source={require('./image/hui_discount_item_rule_arrow.png')} resizeMode={'contain'} style={styles.rightImage}/>	    	
			    </View>
			     <View style={styles.itemWrapperTop}>
			     	<View style={styles.leftWrapper}>
				    	<Image source={require('./image/find_more_friend_photograph_icon.png')} resizeMode={'cover'} style={styles.leftWrapperImage}/>
				    	<Text>大学爱心社</Text>
			    	</View>
			    	<Image source={require('./image/hui_discount_item_rule_arrow.png')} resizeMode={'contain'} style={styles.rightImage}/>		    	
			    </View>
			     <View style={styles.itemWrapper}>
			     	<View style={styles.leftWrapper}>
				    	<Image source={require('./image/find_more_friend_scan.png')} resizeMode={'cover'} style={styles.leftWrapperImage}/>
				    	<Text>关于我们</Text>	
			    	</View>
			    	<Image source={require('./image/hui_discount_item_rule_arrow.png')} resizeMode={'contain'} style={styles.rightImage}/>	    	
			    </View>
			    <View style={styles.itemWrapperTop}>
			    	<View style={styles.leftWrapper}>
				    	<Image source={require('./image/find_more_friend_shake.png')} resizeMode={'cover'} style={styles.leftWrapperImage}/>
				    	<Text style={styles.texts}>意见反馈</Text>
			    	</View>
			    	<Image source={require('./image/hui_discount_item_rule_arrow.png')} resizeMode={'contain'} style={styles.rightImage}/>		    	
			    </View>
			    <View style={styles.itemWrapper}>
			     	<View style={styles.leftWrapper}>
				    	<Image source={require('./image/find_more_friend_scan.png')} resizeMode={'cover'} style={styles.leftWrapperImage}/>
				    	<Text>检查更新</Text>	
			    	</View>
			    	<Image source={require('./image/hui_discount_item_rule_arrow.png')} resizeMode={'contain'} style={styles.rightImage}/>	    	
			    </View>
	      </View>
		);
	}
}

let styles=StyleSheet.create({
	 wrapper: {
	 	flex:1 ,
	 	backgroundColor:'#F9F9F9',
	
	 },
	topper:{
	 	paddingTop:statusBarHeight,
	 	height:60,
	 	justifyContent:'center',
	 	alignItems:'center',
	 	backgroundColor:'#FF555A'
	 	
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
		borderTopWidth:1/ratio,
		
		borderTopColor:'#9D9D9D',
		flexDirection:'row',
		justifyContent:'space-between',
		alignItems:'center',
		marginTop:20,
		backgroundColor:'#ffffff'
	},
	itemWrapper:{
		borderTopWidth:1/ratio,
		borderTopColor:'#9D9D9D',
		borderBottomWidth:1/ratio,
		borderBottomColor:'#9D9D9D',
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
		height:15,
		width:15,
		marginRight:10
	},
	texts: {
	   
	    fontSize: 16,
	  
	    alignSelf:'center'
	  }
});
