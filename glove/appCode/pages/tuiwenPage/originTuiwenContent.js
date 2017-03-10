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
	Dimensions,
	Alert
} from 'react-native';
import React,{Component} from 'react';
import WoPage from '../woPage/woPage';
import UserPage from '../../components/userPage';
import AutoLink from 'react-native-autolink';
import Hyperlink from 'react-native-hyperlink';
import Prove from '../components/prove';
import CashNeed from '../components/cashNeed';
import {UrlDeleteTwitter,UrlCashRecord,UrlCashConfirmRecord} from '../../utils/url';
import DoZhuanFa  from '../components/doZhuanFa';
import Comment from '../components/comment';
import PostAffirm from '../components/postAffirm';
import DoComment from '../../components/doComment';
import ReportTuiwen from '../components/reportTuiwen';
import  Report  from  '../components/report';
import fmDate from '../../utils/fmDate';
import fetchTool  from '../../utils/fetchTool';
import fetchToolget  from  '../../utils/fetchToolget'; //发送get请求的fetch接口包装
import ProgressUpdate  from '../components/progressUpdate';
let ratio = PixelRatio.get();
let lineHeight = Platform.OS === 'ios' ? 14 : 16;
let statusBarHeight = Platform.OS === 'ios' ? 20 : 0;
let width=Dimensions.get('window').width;
let height=Dimensions.get('window').height;
/*不需要考虑被转发的，因为无，只需要考虑是不是一个救助推文就可以了*/
export default class OriginTuiwenContent extends Component{
	constructor(props){
		super(props);
		this.state={
			selfintroduce: this.props.row.backupten || '同学，你该介绍下自己', //用户的自我介绍
			userphoto:this.props.row.backupeleven ||null, //用户的头像地址
			usernickname: this.props.row.backupnine || "无名氏", //推文的作者
			tweetid:this.props.row.tweetid || 0, //推文的id,应该是zhuanfaTuiwen	
			useridtweet: this.props.row.useridtweet || 0, //发布推文的用户id
			//sourcemsgid: this.props.row.sourcemsgid || 0, // 被转发的微博的id
			msgcontent: this.props.row.msgcontent || "出错了", //微博的内容
			boxtimes: this.props.row.boxtimes || 0, //被收藏的次数
			commenttimes: this.props.row.commenttimes || 0, //微博被评论的次数
			deletetag: this.props.row.deletetag || 1, //是否删除标志 1默认没删除。2 代表删除
			ok: this.props.row.ok || 0, //微博被赞的次数
			publicsee: this.props.row.publicsee || 1, //是否可见
			publishtime: this.props.row.publishtime || null, //微博发布的时间
			helpTweet: this.props.row.tweetbackupfour ||1, // 1普通 2救助
			reportedtimes: this.props.row.reportedtimes || 0, //被举报的次数
			promiseType:this.props.row.tweetbackupfive ||1, //1普通承若，即真实；234
            promise:this.props.row.promise || "本人承诺信息真实，不存在夸大事实！", //默认承诺
            tweetUUID:this.props.row.backupneight || "", //推文的uuid
			tagid: this.props.row.tagid || 1, // 1 代表没有转发的微博。2代表有被转发的微博

			tweetTitle: this.props.row.backuptwelve || "求助", //求助的标题
            cashiD: this.props.row.cashid ||0, //关联的cash的iD，这个一般是0，
            cashuuid: this.props.row.cashuuid || "", //关联的cash的uuid,必须得有
            citycode:this.props.row.citycode || "" ,//城市的编码
            cityname:this.props.row.cityname || "城市为空" , //这个必须有	

			tweetbackupone: this.props.row.tweetbackupone || null, //推文附带的图片地址
			tweetbackuptwo: this.props.row.tweetbackuptwo || null, //推文附带的图片地址
			tweetbackupthree: this.props.row.tweetbackupthree ||null, //推文附带的图片地址
			tweetbackupseven: this.props.row.tweetbackupseven || null,//推文附带的图片地址
			backupneight: this.props.row.backupneight || null,//推文附带的图片地址
			videoaddress: this.props.row.videoaddress ||null, //推文附带的图片地址
			// zhuanfaTuiwen:this.props.row.tuiwen.zhuanfaTuiwen || null,
			visible:false, //控制转圈圈
			cash:{},
			confirmList:[]
		}		
	}
	componentDidMount(){
		if (this.state.helpTweet===2 &&this.state.cashuuid!=="" ) { //等于2表明是一条救助推文。
	       
	        let url=UrlCashConfirmRecord+this.state.cashuuid;
	         //console.log(url);
	        let  response=fetchToolget(url);
	        response.then(resp=>{
	            if (resp.retcode===2000) {
	              	this.getJson(resp.lp.cash);
	              	if (resp.lp.confirmList!=null) {
	              		this.getJson2(resp.lp.confirmList);
	              	};
	            }
	        }).catch(err=>{
	        	console.log(err);
	        	console.log(' 获取prove数据失败');
	        });

	    }//	
        let  finalPublishTime=fmDate(this.props.row.publishtime);
        this.setState({
      	    publishtime:finalPublishTime
        });
	}//componentDidMount
	getJson(json){		
		this.setState({
			cash:json
		});
	}
	getJson2(json){		
		this.setState({
			confirmList:json
		});
	}
	backUp(){
		this.props.navigator.pop();
	}

	goOtherWoPage(){ //点击头像进入UserPage
		//这个必须知道昵称，然后传递给OtherWoPage
		this.props.navigator.push({
			component:UserPage,
			params:{
				userID:this.state.useridtweet,
				userNickName:this.state.usernickname,
				diffTag:99 //99表明传递的是一个昵称
			}//注意从originTuiwenItem.js中也必须采用完全一样的形式
		});
	}
	doComment(){
		if (this.state.deletetag===2 || this.state.publicsee===2){ //已被删除或者不可见
			return
				Alert.alert(
                        '该内容不能被评论',
                        '可能作者已删除',
                        [
                            { text:'好的'}
                        ]
                );
		}
		this.props.navigator.push({
			component:DoComment,
			params:{
				userProfile:this.props.userProfile,
				tweetid:this.state.tweetid 
			}
		});
	}

	goCommentList(){
		if (this.state.deletetag===2 || this.state.publicsee===2){
			return
		}
		this.props.navigator.push({
			component:Comment,
			params:{
				tweetid:this.state.tweetid 
			}
		});
	}
	goZhuanFa(){
		if (this.state.deletetag===2 || this.state.publicsee===2) {//不能被转发
			return Alert.alert(
                        '审核未通过',
                        '暂时不能转发',
                        [
                            { text:'好的'}
                        ]
                    );
		};
        //如果这个只有源推文，那么tweetid就是this.props.row.tuiwen.tweetid，否则就是
        //this.props.row.zhuanfaTuiwen.tweetid
        let tweetid=this.state.tweetid;
       
		this.props.navigator.push({
			component:DoZhuanFa,
			params:{
				userProfile:this.props.userProfile,
				tweetid:tweetid 
			}
		});
	}

	goReport(){
		this.props.navigator.push({
			component:ReportTuiwen,
			params:{
				userProfile:this.props.userProfile,
				tweetid:this.state.tweetid 
			}
		})
	}
	reportMe(){
		//这里实现举报次数增加
	}
	imageError(err){
		//console.log('aa');
	}
	goBeatRenMainPage(url){
		if(url.indexOf('instagram')>=0){
			return
		}
		this.props.navigator.push({
			component:UserPage,
			params:{
				userNickName:url,
				diffTag:99 //99表明传递的是一个昵称
			}//注意userNickName必须与goOtherWoPage中保持一致
		});
	}
	render(){
		return(
			<View style={styles.container}> 			
				<View style={styles.broadcast}>
					<TouchableOpacity onPress={this.backUp.bind(this)} style={styles.returnButton}>
						<Image source={require('./image/return2.png')} style={styles.backImg} resizeMode={'contain'} />
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
								 <Image source={{uri:this.state.userphoto}} resizeMode={'contain'} style={styles.image}/>	
								}
							</TouchableOpacity>
						</View>
						<View style={styles.nameV}>
							<View style={styles.nicknameWrapper}>
								<Text style={styles.nicknameTxt}>{this.state.usernickname}</Text>
							</View>							
							<Text style={{color:'#B1B1B1',marginTop:3}}>{this.state.publishtime}</Text> 							
						</View>
					</View>
				    {/* 需要捐钱的金额等等*/}
				    {
				    	this.state.helpTweet===2 && this.state.tagid===1?
				    	<CashNeed  cash={this.state.cash}/>
				    	:
				    	null
				    }

				    {/*救助的标题*/}
				    <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
					    {
					    	this.state.tweetTitle!==null && this.state.helpTweet===2? 
					    	 <Text style={{fontSize:17,color:'black',fontWeight:'bold'}}>{this.state.tweetTitle}</Text>
					    	 :null
					    }
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

				    {/* 证明有关的信息; affirm.js中我要证实，需要toke，所以传过去userProfile*/}
				    { this.state.tagid===1 && this.state.helpTweet===2 ?
                       <Prove cash={this.state.cash}  confirmList={this.state.confirmList}  userProfile={this.props.userProfile} tweetid={this.props.row.tweetid}  navigator={this.props.navigator}/>
                       :null
                    }
					<View style={styles.progress}>
						<Text style={styles.text}  onPress={this.goCommentList.bind(this)}>留言<Text style={{fontSize:14}}>(736)</Text></Text>
						<Text style={styles.txt} onPress={this.doComment.bind(this)}>去评论</Text>
					</View>
					{/* 这个是进度更新和支持了 */}

					{this.state.helpTweet===2 && this.state.tagid===1?
						<View>
				        	<ProgressUpdate cash={this.state.cash} userProfile={this.props.userProfile} />
				        </View>
				        :null
					}
					
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
		height:51,
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
		justifyContent:'center',
		width:40,
		height:40,	
		borderRadius:20,
		backgroundColor:'#61B972'
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
		color:'#2893C3',
		fontWeight:'bold'
	},
	text:{
		fontSize:16,
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
		justifyContent:'space-between',
		alignItems:'center',
		paddingLeft:5,
		paddingRight:5,
		borderColor:'#43AC43',
		borderWidth:1/ratio,
		borderTopWidth:0,
		height:50
	}
});

