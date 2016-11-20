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
//import ZhuanfaPageWrapper from './zhuanfaPage';
import WoPage from '../woPage/woPage';
import AutoLink from 'react-native-autolink';
import Hyperlink from 'react-native-hyperlink';
import Prove from '../components/prove';
import CashNeed from '../components/cashNeed';
import DoZhuanFa  from '../components/doZhuanFa';
import Comment from '../components/comment';
import PostAffirm from '../components/postAffirm';
import DoComment from '../../components/doComment';
import  Report  from  '../components/report';
let ratio = PixelRatio.get();
let lineHeight = Platform.OS === 'ios' ? 14 : 16;
let statusBarHeight = Platform.OS === 'ios' ? 20 : 0;
let width=Dimensions.get('window').width;
let height=Dimensions.get('window').height;
export default class OriginTuiwenContent extends Component{
	constructor(props){
		super(props);
		console.log(this.props);
		this.state={
			photoupload:this.props.row.photoupload || 1, //1 代表未上传头像
			selfintroduce: this.props.row.selfintroduce ||'什么也没有介绍自己',
			userphoto:this.props.row.userphoto ||'../../image/default.jpg',
			usernickname:this.props.row.usernickname || '无名氏',
			tweetid:this.props.row.tweet.tweetid || 0, //推文的id
			useridtweet: this.props.row.tweet.useridtweet || 0, //发布推文的用户id
			sourcemsgid: this.props.row.tweet.sourcemsgid || 0, // 被转发的微博的id
			msgcontent: this.props.row.tweet.msgcontent || null, //微博的内容
			boxtimes: this.props.row.tweet.boxtimes || null, //被收藏的次数
			commenttimes: this.props.row.tweet.commenttimes || 0, //微博被评论的次数
			deletetag: this.props.row.tweet.deletetag || 0, //是否删除标志 1默认没删除。2 代表删除
			ok: this.props.row.tweet.ok || 0, //微博被赞的次数
			publicsee: this.props.row.tweet.publicsee || 0, //是否可见
			publishtime: this.props.row.tweet.publishtime || null, //微博发布的时间
			reportedtimes: this.props.row.tweet.reportedtimes || 0, //被举报的次数
			tagid: this.props.row.tweet.tagid || 1, // 1 代表没有转发的微博。2代表有被转发的微博
			//topic:this.props.row.tweet.topic || 1, //话题的主键
			tweetbackupone: this.props.row.tweet.tweetbackupone || null, //推文附带的图片地址
			tweetbackuptwo: this.props.row.tweet.tweetbackuptwo || null, //推文附带的图片地址
			tweetbackupthree: this.props.row.tweet.tweetbackupthree ||null, //推文附带的图片地址
			tweetbackupfour: this.props.row.tweet.tweetbackupfour || null,//推文附带的图片地址
			videoaddress: this.props.row.tweet.videoaddress ||null, //推文附带的图片地址
			// zhuanfaTuiwen:this.props.row.tuiwen.zhuanfaTuiwen || null,
			cash:null
		}		
	}
	componentDidMount(){
		fetch('http://127.0.0.1:8080/glove/cash/getcashrecord',{
			method:'POST',
			headers:{
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
			    "proof" :"111",
			    "cashid": this.props.row.tweet.tweetbackupfive
			})
       })
	   .then(response=>response.json())
	   .then(json=>this.getJson(json))
	   .catch(function(e){
	   		console.log(e)
	   })

	}
	getJson(json){
	    //console.log(json);		
		this.setState({
			cash:json
		});
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
	doComment(){
		this.props.navigator.push({
			component:DoComment,
		});
	}
	goCommentList(){
		this.props.navigator.push({
			component:Comment
		});
	}
	goZhuanFa(){
		this.props.navigator.push({
			component:DoZhuanFa,
		});
	}

	goReport(){
		this.props.navigator.push({
			component:Report,
		})
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
						<Text style={styles.broad}  onPress={this.goZhuanFa.bind(this)}>转发</Text>
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
				    {this.state.tweetbackupfour===2 && this.state.tagid===1?
				    	 <CashNeed  cash={this.state.cash}/>
				    	 :null
				    }
				    {/* 救助文案*/}
					<Text style={styles.upContent}>
						<AutoLink
				          text={this.state.msgcontent}
				          hashtag="instagram"
				          twitter={true}
				          phone={true}
				          onPress={this.goBeatRenMainPage.bind(this)} />
					</Text>
				    {/* 文案附带的图片this.state.tagid!==2 ?*/}
		            {   this.state.tagid!==2 ?	       				       			
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

				    {/* 证明有关的信息*/}
				    { this.state.tagid===1 && this.state.tweetbackupfour===2 ?
                       <Prove cash={this.state.cash}  navigator={this.props.navigator}/>
                       :null
                    }
					<View style={styles.progress}>
						<Text style={styles.txt}  onPress={this.goCommentList.bind(this)}>留言<Text style={{fontSize:14}}>(736)</Text></Text>
						<Text style={styles.txt} onPress={this.doComment.bind(this)}>去评论</Text>
					</View>
					{/*<Comment /> */}
					
				</ScrollView>
				<View style={{height:95}}></View>
                {/* 这个是底部*/}
				<View style={styles.commentBottomWrapper}>				
					<View style={styles.shareText}>
						<Text>传播到:</Text>
						<View style={styles.donateMoney}>
							<Text style={{fontSize:20,color:'#fff'}}>我要捐钱</Text>
						</View>
						<Text  onPress={this.goReport.bind(this)}>举报他</Text>
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
		justifyContent:'space-around'
	}
});

