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
import WheelContent  from './wheelContent';
let ratio = PixelRatio.get();
let lineHeight = Platform.OS === 'ios' ? 14 : 16;
let statusBarHeight = Platform.OS === 'ios' ? 20 : 0;
let width=Dimensions.get('window').width;
let height=Dimensions.get('window').height;
export default class ZhuPage extends Component{
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
				    <Text style={{fontSize:18,color:'#fff'}}>给爱</Text>
				</View>
				<Swiper style={styles.swiper} autoplay={true} showsButtons={false} height={150}>
			        <View style={styles.slide1}>
					    <TouchableOpacity  onPress={this.wheelImageTouch.bind(this,urlone)}>	
			           		<Image source={{uri:this.state.wheelImageOne}} resizeMode={'cover'} style={{width:width,height:150}}/>
			            </TouchableOpacity>
			        </View>
			        <View style={styles.slide2}>
			            <TouchableOpacity  onPress={this.wheelImageTouch.bind(this,urlone)}>	
			           		<Image source={{uri:this.state.wheelImageTwo}} resizeMode={'cover'} style={{width:width,height:150}}/>
			            </TouchableOpacity>
			        </View>
			        <View style={styles.slide3}>
			        	<TouchableOpacity  onPress={this.wheelImageTouch.bind(this,urlone)}>	
			           		<Image source={{uri:this.state.wheelImageThree}} resizeMode={'cover'} style={{width:width,height:150}}/>
			            </TouchableOpacity>
			        </View>
			    </Swiper>
	      </View>
		);
	}
}

let styles=StyleSheet.create({
	 wrapper: {
	 	flex:1 	
	 },
	 topper:{
	 	marginTop:statusBarHeight,
	 	height:40,
	 	justifyContent:'center',
	 	alignItems:'center',
	 	backgroundColor:'#FF555A'
	 	
	 },
	 swiper:{
	 	marginTop:2,
	 	height:150
	 },
	  slide1: {	    
	    justifyContent: 'center',
	    alignItems: 'center',
	    backgroundColor: '#9DD6EB',
	    height:150
	  },
	  slide2: {    
	    justifyContent: 'center',
	    alignItems: 'center',
	    backgroundColor: '#97CAE5',
	    height:150
	  },
	  slide3: {  
	    justifyContent: 'center',
	    alignItems: 'center',
	    backgroundColor: '#92BBD9',
	    height:150
	  },
	  texts: {
	    color: '#fff',
	    fontSize: 10,
	    fontWeight: 'bold',
	  }
});


