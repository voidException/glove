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
import OtherWoPage from '../woPage/otherWoPage';
import WoPage from '../woPage/woPage';
import AutoLink from 'react-native-autolink';
import Hyperlink from 'react-native-hyperlink';
import TuiwenItem from './tuiwenItem';
let ratio = PixelRatio.get();
let lineHeight = Platform.OS === 'ios' ? 14 : 16;
let statusBarHeight = Platform.OS === 'ios' ? 20 : 0;
let width=Dimensions.get('window').width;
let height=Dimensions.get('window').height;
export default class WeiBoContent extends Component{
	constructor(props){
		super(props);

		this.state={
			photoupload: 1, //1 代表未上传头像
			selfintroduce: '什么也没有介绍自己',
			userphoto:'../../image/default.jpg',
			usernickname: '无名氏',
			tweetid: 0, //推文的id
			useridtweet:  0, //发布推文的用户id
			sourcemsgid:  0, // 被转发的微博的id
			msgcontent:  '你是好好的关于阿里月饼事件，俺不评论曲直，只是讲讲正规的公司会怎么做。一句话，开除无商量，Google和腾讯都是这么做的，我看到不止一个人因为更小的事情从这两家公司被开除的。Facebook里有员工带人参观，一小时收了25美元，不仅开除，而且FBI还卷入调查，生怕参观者有什么背景。大公司管人其实很松，但是进', //微博的内容
			boxtimes:  null, //被收藏的次数
			commenttimes:  0, //微博被评论的次数
			deletetag:  0, //是否删除标志 1默认没删除。2 代表删除
			ok:  0, //微博被赞的次数
			publicsee:  0, //是否可见
			publishtime:  null, //微博发布的时间
			reportedtimes: 0, //被举报的次数
			tagid:  1, // 1 代表没有转发的微博。2代表有被转发的微博
			topic: 1, //话题的主键
			tweetbackupone:  null, //推文附带的图片地址
			tweetbackuptwo:  null, //推文附带的图片地址
			tweetbackupthree: null, //推文附带的图片地址
			tweetbackupfour:  null,//推文附带的图片地址
			videoaddress: null, //推文附带的图片地址
			// zhuanfaTuiwen:this.props.row.tuiwen.zhuanfaTuiwen || null,
		}		
	}
	backUp(){
		this.props.navigator.pop();
	}

	goOtherWoPage(){
		//这个必须知道昵称，然后传递给OtherWoPage，涉及到refs的使用
		this.props.navigator.push({
			component:OtherWoPage,

		});
	}
	//函数根绝props中的值，传递给下一个页面
	goOriginWeiBoContent(){
		this.props.navigator.push({
			component:WeiBoContent,
		});
	}
	goWeiBoContent(){
		//在这里判断下
		this.props.navigator.push({
			component:WeiBoContent,
			params:{
				row:this.state
			}
		});
	}
	reportMe(){
		//这里实现举报次数增加
	}
	imageError(err){
		//console.log('aa');
	}
	goBeatRenMainPage(url){
		//console.log(url);//成功了，哈哈
		// //在这里把url(用户昵称)传递给主页
		this.props.navigator.push({
			component:OtherWoPage,
			params:{
				nickname:url
			}
		});
	}
	render(){
		return(
			<View style={styles.container}> 			
				<View style={styles.broadcast}>
					<TouchableOpacity onPress={this.backUp.bind(this)} style={styles.returnButton}>
						<Image source={require('./image/ic_web_back.png')} style={styles.backImg} resizeMode={'contain'} />
						<Text style={{fontSize:18,color:'#fff'}}>返回</Text>
					</TouchableOpacity>
					
					<View style={{marginRight:8}}>
						<Text style={styles.broad}>留言</Text>
					</View>
				</View>

	            <ScrollView>
	                <View style={styles.headerWrapper}>
						<View  style={styles.header}>
							<TouchableOpacity onPress={this.goOtherWoPage.bind(this)}>						
								{	
									 this.state.photoupload ===1 ?
									  <Image source={require('../../image/default.jpg')} style={styles.image}/>
									: <Image source={{uri:this.state.userphoto}} resizeMode={'contain'} style={styles.image}/>	
								}
							</TouchableOpacity>
						</View>
						<View style={styles.nameV}>
							<View style={styles.nicknameWrapper}>
								<Text style={styles.nicknameTxt}>{this.state.usernickname}</Text>
								<Image source={require('./image/VV.png')} style={styles.vTag} />
							</View>							
							<Text style={{color:'#B1B1B1',marginTop:3}}>{this.state.publishtime}</Text> 							
						</View>
					</View>
				    {/* 需要捐钱的金额等等*/}
				    <View style={styles.endTime}>
				    	<Text>结束时间:2017-10-12</Text>
				    </View>
					<View style={styles.bottomWrapper}>
				    	<View style={styles.bottomItem}>
				       		 <Text style={{color:'red'}}>60000元</Text>
				       		 <Text style={{color:'#BEBEBE'}}>目标金额</Text>
				        </View>
				        <View style={styles.bottomItemMid}>
				       		 <Text style={{color:'red'}}>38000元</Text>
				       		 <Text style={{color:'#BEBEBE'}}>已筹金额</Text>
				        </View>
				        <View style={styles.bottomItem}>
				       		  <Text style={{color:'red'}}>8082次</Text>
				       		 <Text style={{color:'#BEBEBE'}}>支持次数</Text>
				        </View>
				    </View>
				    {/* 救助文案*/}
					<Text style={styles.upContent}>
						<AutoLink
				          text={this.state.msgcontent}
				          hashtag="instagram"
				          twitter={true}
				          phone={true}
				          onPress={this.goBeatRenMainPage.bind(this)} />
					</Text>
				    {/* 文案附带的图片*/}
		            { 
		            	this.state.tagid!==2 ?	       				       			
		       		    <View style={styles.imageList}>
			       			<View style={styles.imageWrapper}>
		       				   
		       				   { this.state.tweetbackupone !==null ?
		       				   		<Image source={{uri:this.state.tweetbackupone}} resizeMode={'contain'} style={styles.imageListImg} />
		       				   		:null
		       				   }
			       			   { this.state.tweetbackuptwo !==null ?
			       				<Image source={{uri:this.state.tweetbackuptwo}} resizeMode={'contain'}  style={styles.imageListImg} />
			       				:null
			       			   }
			       			   { this.state.tweetbackupthree !==null ?
			       			    <Image source={{uri:this.state.tweetbackupthree}}resizeMode={'contain'}  style={styles.imageListImg}  />
			       			    :null
			       			   } 
			       			</View>
			       			<View style={styles.imageWrapper}>
			       			   {/*  <Image source={{uri:this.state.tweetbackupfour}} style={styles.imageListImg} /> */}
			       			   { this.state.videoaddress !==null ?
				       			   <Image source={{uri:this.state.videoaddress}} onLoadEnd={this.imageError.bind(this)} style={styles.imageListImg} /> 	
				       			   :null
			       			   }		       			
			       			</View>
			       	    </View>
			       	    : null
		       		}

					{
						this.state.tagid===2 ? 
						<TuiwenItem  row={this.props.row.zhuanfaTuiwen} navigator={this.props.navigator}/>
						: null
					}
					<View style={styles.zhengmingWrapper}>
						<View style={styles.zhengmingProfile}>
							<Text style={styles.txt}>证明信息</Text>
						</View>
						<View style={styles.authentication}>
							<Text>认证机构</Text>
							<Text style={styles.auth}>北京大学爱心社</Text>
						</View>
						<View style={styles.jiandu}>
							<Text>监督小组</Text>
							<Text style={styles.auth}>北京大学监督处</Text>
						</View>
						<View style={styles.authentication}>
							<Text>具体负责人</Text>
							<Text style={styles.auth}>北京大学光华管理学院李梦琪<Text>@李猴子</Text></Text>
						</View>

						<View style={styles.behelpWrapper}>
						    <View style={styles.profile}>
								<Text>受助人：</Text>
								<Text style={{color:'#2893C3',fontSize:15}}>@张三</Text>
							</View>
							
							<View style={styles.profileInner}>
							 	<Image source={require('./image/gouzi.png')} style={styles.gouziImg}/>
								<Text style={styles.behelpTxt}>身份证明已提交</Text>
							</View>
							<View style={styles.profileInner}>
							 	<Image source={require('./image/gouzi.png')} style={styles.gouziImg}/>
								<Text style={styles.behelpTxt}>医院证明已提交</Text>
							</View>
							<View style={styles.profileInner}>
							 	<Image source={require('./image/gouzi.png')} style={styles.gouziImg}/>
								<Text style={styles.behelpTxt}>居委会证明已提交</Text>
							</View>						
						</View>
						<View style={styles.zhengmingOuter}>
							<View style={styles.zhengshi}>
								<Text style={{fontSize:16}}>已有<Text style={{fontSize:16,color:'red'}}>100</Text>人证实</Text>
								<Text style={{color:'green',fontWeight:'bold',fontSize:16}}>我要证实</Text>
							</View>
							<View  style={styles.zhengshiImg}>
								 <Image source={require('../../image/default.jpg')} style={styles.image}/>
								 <Image source={require('../../image/default.jpg')} style={styles.image}/>
								 <Image source={require('../../image/default.jpg')} style={styles.image}/>
								 <Image source={require('../../image/default.jpg')} style={styles.image}/>
								 <Image source={require('../../image/default.jpg')} style={styles.image}/>
								 <Image source={require('./image/moreArrow.png')} style={styles.zhengmingImgArrow}/>
								 <Image source={require('./image/more.png')} style={styles.zhengmingImgMore}/>
							</View>
							<View style={styles.zhengshiTxt}>
								<Text style={{color:'#B1B1B1'}}>张三是重庆市的优秀学子，可惜了，这个是真是的张三是重庆市的优秀学子。</Text>
							</View>
						</View>
					</View>
					<View style={styles.chengnuoWrapper}>
						<View>
							<View style={styles.chengnuo}>
								<Text style={styles.txt}>受助人承诺</Text>
							</View>
							<View>
								<Text>承诺类型(A)</Text>
								<Text style={{color:'red',marginTop:3}}>将于20年内把善款一一归还给帮助我的人</Text>
							</View>
						</View>
					</View>

					<View style={styles.progress}>
						<Text style={styles.txt}>进度更新</Text>
					</View>
					<Text style={{color:'black'}}>如果是一个劳动人民当中国真的是一个劳动人民当中国真的是一个劳动人民当中国真的是一个劳动人民当中国真的是一个劳动人民当中国真的是一个劳动人民当中国真的是一个劳动人民当中国真的是一个劳动人民当中国真的是一个劳动人民当中国真的是一个劳动人民当中国真的是一个劳动人民当中国真的是一个劳动人民当中国真的是一个劳动人民当家作主的国家，各级员工都有着自己的工会，我现在要做的就是买一张火车票，去鼓动阿里安全部门的人全体大罢工。我不跟你们讲他妈逼的道理。我去采取行动。</Text>
				</ScrollView>
				<View style={{height:95}}></View>
                {/* 这个是底部*/}
				<View style={styles.commentBottomWrapper}>				
					<View style={styles.shareText}>
						<Text>传播到:</Text>
						<View style={styles.donateMoney}>
							<Text style={{fontSize:20,color:'#fff'}}>我要捐钱</Text>
						</View>
						<Text>举报他</Text>
					</View>	
					<View style={styles.shareWrapper}>	
						<View style={styles.shareItemWrapper}>
							<Image source={require('../imgs/weixin.png')}  style={styles.shareItem} resizeMode={'contain'}/>						
						</View>

						<View style={styles.shareItemWrapper}>
							<Image source={require('../imgs/qzone.jpg')} style={styles.shareItem} resizeMode={'contain'} />						
						</View>

						<View style={styles.shareItemWrapper}>
							<Image source={require('../imgs/weibo.png')}  style={styles.shareItem} resizeMode={'contain'}/>							
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
		backgroundColor:'#F9FFFC',
	},
	bottomWrapper:{
		height:60,
		//backgroundColor:'#F9F9F9',
		borderBottomWidth:1/ratio,
		borderTopWidth:1/ratio,
		borderBottomColor:'#BEBEBE',
		borderTopColor:'#BEBEBE',
		flexDirection:'row',
		marginTop:5,
		justifyContent:'space-around',
		alignItems:'center'
	},
	bottomItem:{
		flexDirection:'column',
		//alignItems:'center',
	},
	endTime:{
		flexDirection:'row',
		alignItems:'center',
		justifyContent:'center'
	},
	bottomItemMid:{
		flexDirection:'column',
		borderLeftWidth:1/ratio,
		borderLeftColor:'#BEBEBE',
		borderRightWidth:1/ratio,
		borderRightColor:'#BEBEBE',
		width:0.3*width,
		alignItems:'center'
	},
	backImg:{
		height:18,
		width:18
	},
	shareText:{
		flexDirection:'row',
		justifyContent:'space-between',
		alignItems:'flex-end',
		marginTop:10,
		marginLeft:5,
		paddingRight:7,
		paddingBottom:5
	},
	shareTxt:{
		fontSize:18,
		color:'red'
	},
	broadcast:{
		height:64,
		paddingTop:20,
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
		width:50,
		height:50
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
	donateMoney:{
		width:200,
		height:34,
		borderRadius:17,
		alignItems:'center',
		justifyContent:'center',
		backgroundColor:'green'
	},
	commentBottomWrapper:{
		position:'absolute',
		width:width,
		bottom:0,
		//flexDirection:'row',
		justifyContent:'space-around',
		//alignItems:'center',
		height:95,
		backgroundColor:'#FFFFFF'
	},
	bottomer:{
		flexDirection:'row',
	},
	bottomerImg:{
		width:15,
		height:15
	},

	image:{
		width:40,
		height:40,	
		borderRadius:20	
	},
	zhengmingImgMore:{
		position:'absolute',
		right:20,
		top:0,
		width:40,
		height:40,	
	},
	zhengmingImgArrow:{
		position:'absolute',
		right:-7,
		top:0,
		width:40,
		height:40,	
	},
   	header:{
		flexDirection:'row',
		alignItems:'center',
		justifyContent:'center'
	},
	headerWrapper:{
		flexDirection:'row',
		width:width,
		height:50,
		justifyContent:'flex-start',
		paddingTop:10,
		paddingLeft:5,
		paddingRight:5,
		//backgroundColor:'#F7F7F7',			
	},
	nicknameWrapper:{
		flexDirection:'row',
	},
	nicknameTxt:{
		fontSize:16,
		color:'#4EB160'
	},
	nameV:{
		flexDirection:'column',
		alignItems:'flex-start',
		justifyContent:'center',
		marginLeft:5
	},
	vTag:{
		width:15,
		height:15
	},
	upContent:{
		marginTop:8,
		marginLeft:10,
		marginRight:10,
		marginBottom:6,
		fontSize:16
	},
	imageList:{
		flexDirection:'column',
	},
	imageListImg:{
		height:0.3*width,
		width:0.3*width,
		margin:3
	},
	imageWrapper:{
		flexDirection:'row',
		justifyContent:'flex-start'
	},
	footer:{
		flexDirection:'row',
		justifyContent:'space-around',
		marginTop:5,
		borderWidth:1/PixelRatio.get(),
		borderColor:'#a9b0bf',
		height:26,		
	},
	footerText:{
		lineHeight:18
    },
	bottomico:{
		height:15,
		width:15
	},
	txt:{
		fontSize:16,
		color:'black',
		fontWeight:'bold'
	},
	promise:{
		flexDirection:'row',
		justifyContent:'flex-start',
		alignItems:'center'
	},
	promiseico:{
		height:60,
		width:60
	},
	zhengmingWrapper:{
		borderColor:'#43AC43',
		borderWidth:1/ratio,
		margin:3,
		borderRadius:5,
		paddingTop:3,
		paddingBottom:5,
		marginBottom:0
	},
	zhengmingProfile:{
		alignItems:'center'
	},
	authentication:{
		flexDirection:'column',
		paddingLeft:8,
		marginTop:10,
		backgroundColor:'#F9FFFC'
	},
	jiandu:{
		flexDirection:'column',
		paddingLeft:8,
		marginTop:10
	},
	auth:{
		color:'green',
		fontSize:12,
		marginTop:7
	},
	behelpWrapper:{
	    paddingLeft:8,	
	    marginTop:10
	},
	profile:{
		flexDirection:'row',
		justifyContent:'flex-start',
		alignItems:'center',
	},
	profileInner:{
		flexDirection:'row',
		justifyContent:'flex-start',
		alignItems:'center',
		marginTop:6,
	},
	behelpTxt:{
		fontSize:12,
		color:'green'
	},
	chengnuoWrapper:{
		borderColor:'#43AC43',
		borderWidth:1/ratio,
		borderTopWidth:0,
		margin:3,
		marginTop:0,
		borderRadius:5,
		paddingTop:10,
		paddingBottom:5,
		paddingLeft:5,
		paddingRight:5
	},
	gouziImg:{
		height:12,
		width:12,		
	},
	chengnuo:{
		alignItems:'center'
	},
	zhengmingOuter:{
		marginTop:14,
		paddingLeft:7,
		paddingRight:7
	},
	zhengshi:{
		flexDirection:'row',
		justifyContent:'space-between',				
	},
	zhengshiImg:{
		marginTop:5,
		flexDirection:'row',
		alignItems:'flex-start'
	},
	zhengshiTxt:{
		marginTop:7,
		paddingTop:6,
	},
	progress:{
		flexDirection:'row',
		justifyContent:'center'
	}
});

