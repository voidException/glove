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
import AddHelpMan  from '../components/addHelpMan';
import HelpAixinShe from './helpAixinShe';
import DonateMe from './donateMe';
import { UrlGatherInfo } from  '../../utils/url';
import fetchTool from '../../utils/fetchTool';
import JoinLoveClub from '../components/joinLoveClub';
import { connect } from 'react-redux';
let ratio = PixelRatio.get();
let lineHeight = Platform.OS === 'ios' ? 14 : 16;
let statusBarHeight = Platform.OS === 'ios' ? 20 : 0;
let width=Dimensions.get('window').width;
let height=Dimensions.get('window').height;
let loveImg = require('../../image/25.jpg');//慈善排行榜
class HelpPageP extends Component{
	constructor(props){
		super(props);
		this.state={
			club:100, //社团总数
			clubgrow:9,
			member:893, //成员总数
			membergrow:200, //注册用户总数
			city:50, //覆盖的城市
			citygrow:5, //每日增长的城市
		}	
	}

	componentDidMount(){
		let userAccount={
			gatherinfoid:1, //这个是固定的
		};
		//发起网络请求
		let options={
            url:UrlGatherInfo,
            body: JSON.stringify(userAccount)
        };
       //debugger
        let  response=fetchTool(options);
        response.then(resp=>{
            if (resp.retcode===2000) {
               	this.setState({
              	  	clubnum:resp.data.club||100, //社团总数
					clubgrow:resp.data.clubgrow||9,
					member:resp.data.member||893, //成员总数
					membergrow: resp.data.member||200, //注册用户总数
					city:resp.data.city||50, //覆盖的城市
					citygrow: resp.data.citygrow||5, //每日增长的城市
              	});
            }
        }).catch(err=>{
        	console.log(err);
        });
	}

	wheelImageTouch(url){	
		this.props.navigator.push({
            component: WheelContent
        });
	}
    goAddHelpMan(){
    	this.props.navigator.push({
            component: AddHelpMan,
            params:{
            	userProfile:this.props.userProfile
            }
        });
    }
    goHelpAixinShe(){
    	this.props.navigator.push({
            component: HelpAixinShe
        });
    }
    goJoinLoveClub(){
    	this.props.navigator.push({
            component: JoinLoveClub,
            params:{
            	userProfile:this.props.userProfile
            }
        });
    }

    goDonateMe(){
    	this.props.navigator.push({
            component: DonateMe,
        });
    }
	render(){
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
		           		<Text style={{color:'#4EB160',marginLeft:-20}}>千山万水</Text>
		           		<Text style={{color:'#4EB160',marginLeft:-25}}>连接每一座城市的</Text>
		           		<Text style={{color:'#4EB160',marginLeft:-30}}>每一个爱心社</Text>
		           		<Text style={{color:'#4EB160',marginLeft:-40}}>只为温暖世界的每一处角落。</Text>
		           	</View>			  
		        </View>
		        <View style={styles.clubInfo}>
		        	<View style={styles.yong}>
		        		<Image source={require('./image/plants_003.png')} resizeMode={'cover'} style={{width:25,height:25}}/>
		        		<Text style={{fontSize:17,fontWeight:'bold',color:'#1EB277'}}>爱心社、</Text>
		        		<Text style={{fontSize:17,fontWeight:'bold',color:'#1EB277'}}>青年志愿者协会</Text>
		        		<View style={styles.join}><Text onPress={this.goJoinLoveClub.bind(this)}  style={{fontSize:12,color:'#fff'}}>现在加入</Text></View>
		        	</View>
		        	<View style={styles.clubDetailInfo}>
		        		<View>
		        			<Text style={styles.upTxt}>已有社团</Text>
		        			<Text style={styles.midTxt}>{this.state.club}<Text style={{fontSize:14}}>个</Text></Text>
		        			<Text style={styles.bottomTxt}>今日↑<Text>{this.state.clubgrow}</Text>个</Text>
		        		</View>
		        		<View style={styles.midWrapper}>
		        			<Text style={styles.upTxt}>成员</Text>
		        			<Text style={styles.midTxt}>{this.state.member}<Text style={{fontSize:14}}>人</Text></Text>
		        			<Text style={styles.bottomTxt}>今日↑<Text>{this.state.membergrow}</Text>人</Text>
		        		</View>
		        		<View>
		        			<Text style={styles.upTxt}>覆盖城市</Text>
		        			<Text style={styles.midTxt}>{this.state.city}<Text style={{fontSize:14}}>座</Text></Text>
		        			<Text style={styles.bottomTxt}>今日↑<Text>{this.state.citygrow}</Text>座</Text>
		        		</View>
		        	</View>
		        </View>
			    <View style={styles.itemWrapperTop}>
			        <View style={styles.leftWrapper}>
				    	<Image source={require('./image/find_more_friend_bottle.png')} resizeMode={'cover'} style={styles.leftWrapperImage}/>
				    	<Text  onPress={this.goAddHelpMan.bind(this)}  style={{fontWeight:'bold'}}>发布项目</Text>	
			    	</View>
			    	<Image source={require('./image/find_more_friend_bottle.png')} resizeMode={'contain'} style={styles.rightImage}/>

			    </View>
			
			    <View style={styles.itemWrapperTop}>
			     	<View style={styles.leftWrapper}>
				    	<Image source={require('./image/find_more_friend_photograph_icon.png')} resizeMode={'cover'} style={styles.leftWrapperImage}/>
				    	<Text  onPress={this.goDonateMe.bind(this)}  style={{fontWeight:'bold'}}>资助我们</Text>
			    	</View>
			    	<Image source={require('./image/find_more_friend_photograph_icon.png')} resizeMode={'contain'} style={styles.rightImage}/>		    	
			    </View>

			    <View style={styles.itemWrapper}>
			     	<View style={styles.leftWrapper}>
				    	<Image source={require('./image/find_more_friend_scan.png')} resizeMode={'cover'} style={styles.leftWrapperImage}/>
				    	<Text onPress={this.goHelpAixinShe.bind(this)}  style={{fontWeight:'bold'}}>赞助爱心社</Text>	
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
function mapStateToProps(state,ownProps){
	const { userProfile}= state;	 
	return {
		userProfile:userProfile
	}
}
const HelpPage=connect(mapStateToProps)(HelpPageP);
export default  HelpPage;
let styles=StyleSheet.create({
	 wrapper: {
	 	flex:1 ,
	 	backgroundColor:'#F9FFFC'	
	 },
	topper:{
	 	paddingTop:statusBarHeight,
	 	height:51,
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
		height:24,
		width:76,
		borderRadius:30,
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


