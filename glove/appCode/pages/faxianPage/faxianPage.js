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
	WebView,
	Alert
} from 'react-native';
import React,{ Component } from 'react';
import Swiper from 'react-native-swiper2';
import WheelContent  from './findWheelContent';
import PeopleListPage  from  './PeopleListPage';
import GongYiPagePeopleList from './gongyiPeopleList';
import AboutUs from './aboutUs';
import JoinSupervise from '../components/joinSupervise';
import WelfareAuth from '../components/welfareAuth';
import { connect } from 'react-redux';
let ratio = PixelRatio.get();
let lineHeight = Platform.OS === 'ios' ? 14 : 16;
let statusBarHeight = Platform.OS === 'ios' ? 20 : 0;
let width=Dimensions.get('window').width;
let height=Dimensions.get('window').height;
let loveImg = require('../../image/25.jpg');//慈善排行榜

 class FaxianPageP extends Component{
	constructor(props){
		super(props);
		this.state={
			
		}
		
	}
	componentDidMount(){
		
	}
	
	goMenList(userType){
	    //console.log(userType);		
		this.props.navigator.push({
            component: PeopleListPage,
            params:{
            	userType:userType,
            	userProfile:this.props.userProfile
            }
        });
	}
	gogongyiList(){
		
		this.props.navigator.push({
            component: GongYiPagePeopleList,
            params:{
            	userProfile:this.props.userProfile
            }
        });
	}
	goAboutUs(){
		this.props.navigator.push({
            component: AboutUs
        });
	}
	goJoinSupervise(){
		this.props.navigator.push({
            component: JoinSupervise,
            params:{
            	userProfile:this.props.userProfile
            }
        });
	}
   goWelfareAuth(){
   	    return Alert.alert(
	        		'暂未开通',
	        		'敬请期待',
		            [
		                {
		                    text: '好的'
		                }
		            ]
	   			 );
		this.props.navigator.push({
            component: WelfareAuth
        });
	}

	render(){
		
		return(
			<View style={styles.wrapper}>
				<StatusBar backgroundColor='#3B3738' barStyle="default"/>
				<View style={styles.topper}>			    
				    <Text style={{fontSize:18,color:'#fff'}}>发现</Text>
				</View>
				<View style={styles.ad}>
					<View style={styles.superUs}>
						<Text style={{color:'green'}}>谁来监督我们?</Text>
					</View>
					<View style={styles.addown}>
						<Image source={require('./image/telescope.png')} resizeMode={'cover'} style={{width:80,height:80}}/>
						<View style={styles.sunTxt}>
							<Text style={{fontSize:14,fontWeight:'bold',color:'#43AC43'}}>oO_<Text style={{fontSize:18,fontWeight:'bold',color:'#43AC43'}}>监督处</Text>_Oo</Text>
							<Text style={{fontSize:18,fontWeight:'bold',color:'#43AC43',fontFamily:'Georgia-Bold'}}>让公益在阳光下运行。</Text>
						</View>
					</View>
				</View>
				<View style={styles.welcomeJoin}>
					<Image source={require('./image/superMan.png')} resizeMode={'cover'} style={{width:25,height:25}}/>
					<Text style={{color:'#31A75B',marginLeft:-38}}>政府官员、企业家、明星等</Text>
					<View style={styles.welcomeJoinUs}>
						<Text onPress={this.goJoinSupervise.bind(this)}  style={{fontSize:12,color:'white'}}>欢迎加入</Text>
						{/*<Image source={require('./image/rightArrow.png')} resizeMode={'cover'} style={{width:13,height:13}}/>*/}				
					</View>
				</View>

			    <View style={styles.Supervision}>
			    	<View>
			    		<Image source={require('./image/bell.png')} resizeMode={'contain'} style={styles.eyeTop}/>
			    	</View>
			    	<View style={styles.superText}>
			    		<Text  onPress={this.goMenList.bind(this,3)} style={{fontSize:17,color:'black'}}>监督处</Text>
			    	</View>
			    	<View style={styles.eyes}>
			    		<Image source={require('./image/eyeRight.png')} resizeMode={'contain'} style={styles.eyeLeft}/>
			    		<Image source={require('./image/eyeRight.png')}resizeMode={'contain'}  style={styles.eyeRight}/>
			    	</View>
			    </View>

			    <View style={styles.gloveWrapper}>
				    {/*<Image source={require('./image/find_more_friend_scan.png')} resizeMode={'cover'} style={styles.gloveImage}/>*/}
				     	<View style={styles.gloveMiddle}>
					    	<Text onPress={this.goMenList.bind(this,2)} style={styles.loveCubtxt}>大学爱心社</Text>	
					    	<Text onPress={this.goMenList.bind(this,4)} style={styles.volunteer}>青年志愿者协会</Text>		    	
				    	</View>
				    {/*<Image source={require('./image/find_more_friend_scan.png')} resizeMode={'cover'} style={styles.gloveImage}/>*/}	    	
			    </View>

			    
			    <View style={styles.itemWrapperSociety}>
			    	{/*<Image source={require('./image/find_more_friend_bottle.png')} resizeMode={'cover'} style={styles.societyImg}/>*/}
			        <View style={styles.shehui}>				        
					    <Text  onPress={this.goMenList.bind(this,5)} style={{fontSize:16,fontWeight:'bold'}}>社会公益机构</Text>					    
					    <View style={styles.shehuidown}>
					    	<Text style={{marginRight:70, color:'#9D9D9D'}}>已入住300家</Text>
					    	<Text onPress={this.goWelfareAuth.bind(this)} style={{marginLeft:80, color:'#9D9D9D'}}>申请加入</Text>
					    </View>
					</View>	    	
			    </View>

			    <View style={styles.itemWrapperTop}>
			    	<Image source={require('./image/find_more_friend_bottle.png')} resizeMode={'cover'} style={styles.leftWrapperImage}/>
			        <TouchableOpacity  onPress={this.gogongyiList.bind(this)}>
				        <View style={styles.rightWrapper}>
					    	<Text  style={styles.volunteer}>慈善排行榜</Text>	
					    	<Image source={require('./image/hui_discount_item_rule_arrow.png')} resizeMode={'contain'} style={styles.rightImage}/>
				    	</View>	
			    	</TouchableOpacity>	    	
			    </View>
			    <View style={styles.itemWrapperTop}>
			    	<Image source={require('./image/find_more_friend_bottle.png')} resizeMode={'cover'} style={styles.leftWrapperImage}/>
			       
			        <View style={styles.aboutUsWrapper}>
				    	<Text onPress={this.goAboutUs.bind(this)} style={styles.volunteer}>关于我们</Text>	
				    	<Image source={require('./image/hui_discount_item_rule_arrow.png')} resizeMode={'contain'} style={styles.rightImage}/>
			    	</View>	
			    	  	
			    </View>
			    <View  style={styles.sunShine}>
			    	<Image source={require('./image/sunShine.png')} resizeMode={'cover'} style={{width:40,height:40}}/>
			    </View>
			    <View style={styles.sound}>
			    	 <Image source={require('./image/sound.png')} resizeMode={'cover'} style={{width:25,height:25}}/>
			    </View>
	      </View>
		);
	}
}
function mapStateToProps(state,ownProps){

	//这里的state就是store里面的各种键值对,store是个外壳
	//在这个函数中，应该从store中取出所有需要的state，向下传递
	const { userProfile}= state;	 
	return {
		userProfile:userProfile
	}
}
 const FaxianPage=connect(mapStateToProps)(FaxianPageP);
 export default FaxianPage;
let styles=StyleSheet.create({
	 wrapper: {
	 	flex:1 ,
	 	backgroundColor:'#F9FFFC',
	
	 },
	topper:{
	 	paddingTop:statusBarHeight,
	 	height:51,
	 	justifyContent:'center',
	 	alignItems:'center',
	 	backgroundColor:'#43AC43'
	 	
	 },
	 ad:{
	 	paddingTop:15,
	 	flexDirection:'column',
	 	backgroundColor:'#EFFBEF'
	 },
	 superUs:{
	 	flexDirection:'row',
	 	alignItems:'center',
	 	justifyContent:'center',
	 	height:30
	 },
	 addown:{
	 	//marginTop:10,
	 	flexDirection:'row',
	 	justifyContent:'space-around',
	 	
	 },
	 sunTxt:{
	 	alignItems:'center',
	 	justifyContent:'center'
	 },
	 welcomeJoin:{
	 	flexDirection:'row',
	 	justifyContent:'space-around',
	 	alignItems:'center',
	 	height:35,
	 	backgroundColor:'#EFFBEF'
	 },
	 welcomeJoinUs:{
	 	height:24,
	 	width:76,
	 	borderRadius:30,
	 	backgroundColor:'#31A75B',
	 	flexDirection:'row',
	 	alignItems:'center',
	 	justifyContent:'center'
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
		flexDirection:'row',
		justifyContent:'flex-start',
		alignItems:'center',
		//marginTop:15,
		backgroundColor:'#ffffff'
	},
	itemWrapperSociety:{
		flexDirection:'row',
		justifyContent:'center',
		alignItems:'center',
		//marginTop:20,
		// borderBottomWidth:1/ratio,		
		// borderBottomColor:'#9D9D9D',
		backgroundColor:'#ffffff',
		marginBottom:10
	},
    societyImg:{
    	height:60,
    	width:60,
    	position:'absolute',
    	top:0,
    	left:0
    },
	shehui:{
		width:width,
		alignItems:'center',
		justifyContent:'center',
		height:60
	},
	shehuidown:{
		flexDirection:'row',
		justifyContent:'space-between',
		marginTop:10,
	},
	rightWrapper:{
		// borderTopWidth:1/ratio,		
		// borderTopColor:'#9D9D9D',
		borderBottomWidth:1/ratio,		
		borderBottomColor:'#9D9D9D',
		flexDirection:'row',
		justifyContent:'space-between',
		alignItems:'center',
		height:40,
		width:width-40
	},
	aboutUsWrapper:{
		// borderTopWidth:1/ratio,		
		// // borderTopColor:'#9D9D9D',
		// borderBottomWidth:1/ratio,		
		// borderBottomColor:'#9D9D9D',
		flexDirection:'row',
		justifyContent:'space-between',
		alignItems:'center',
		height:40,
		width:width-40
	},
	rightWrapperSociety:{
		borderTopWidth:1/ratio,		
		borderTopColor:'#9D9D9D',
		// borderBottomWidth:1/ratio,		
		// borderBottomColor:'#9D9D9D',
		flexDirection:'row',
		justifyContent:'space-between',
		alignItems:'center',
		height:40,
		width:width-40
	},
	textSociety:{
		// borderBottomWidth:1/ratio,		
		// borderBottomColor:'red',
		height:40,
		alignItems:'center',
		justifyContent:'center',
		width:200
	},
	
	leftWrapperImage:{
		width:40,
		height:40,		
	},
	rightWrapperImage:{
		width:40,
		height:40,		
	},
	rightImage:{
		height:15,
		width:15,
		marginRight:10
	},
	gloveImage:{
		height:20,
		width:20
	},
	Supervision:{
		flexDirection:'column',
		alignItems:'center',
		justifyContent:'center',
        borderTopWidth:1/ratio,		
		borderTopColor:'#9D9D9D',
	},
	superText:{
		flexDirection:'row',
		justifyContent:'center',
		alignItems:'center',
		height:35
	},
	eyes:{
		flexDirection:'row',
		justifyContent:'space-between',
		alignItems:'flex-end'
	},
	eyeTop:{
		width:15,
		height:15,
		
	},
	eyeRight:{
		width:20,
		height:20,
		marginLeft:40,
		marginBottom:-6
	},
	eyeLeft:{
		width:20,
		height:20,
		marginRight:40,
		marginBottom:-6
	},
	gloveWrapper:{
		flexDirection:'row',
		justifyContent:'space-around',
		alignItems:'center',
		//borderBottomWidth:1/ratio,
		//borderBottomColor:'red',
		marginBottom:15
	},
	gloveMiddle:{
		flexDirection:'row',
		justifyContent:'center',
		alignItems:'center',
		borderTopWidth:1/ratio,		
		borderTopColor:'#CCCCCC',
		height:40
	},
	loveCubtxt:{
		marginRight:25,
		fontWeight:'bold'
	},
	loveCubtxt:{
		marginRight:25,
		fontWeight:'bold'
	},
	volunteer:{
		marginLeft:25,
		fontWeight:'bold'
	},
	texts: {	   
	    fontSize: 16,
	    alignSelf:'center'
	},
	sunShine:{
		position:'absolute',
		top:60,
		right:10
	},
	sound:{
		position:'absolute',
		left:40,
		top:78
	}
});












