//由于从tweetPage  weiboPage tuiwenpage进入的页面共用weiboContent，所以这里获取用户的userProfile
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
//import ZhuanfaPageWrapper from './zhuanfaPage';
import UserPage from '../../components/userPage';
import WoPage from '../woPage/woPage';
import AutoLink from 'react-native-autolink';
import Hyperlink from 'react-native-hyperlink';
import OriginTuiwenItem from './originTuiwenItem';
import Prove from '../components/prove';
import CashNeed from '../components/cashNeed';
import DoZhuanFa  from '../components/doZhuanFa';
import Comment from '../components/comment';
import PostAffirm from '../components/postAffirm';
import DoComment from '../../components/doComment';
import  Report  from  '../components/report';
import ReportTuiwen from '../components/reportTuiwen';
import {UrlDeleteTwitter,UrlCashRecord} from '../../utils/url';
import fetchTool  from '../../utils/fetchTool';
import Loading from '../../loading/loading';
import fmDate from '../../utils/fmDate';
import { connect } from 'react-redux';
let ratio = PixelRatio.get();
let lineHeight = Platform.OS === 'ios' ? 14 : 16;
let statusBarHeight = Platform.OS === 'ios' ? 20 : 0;
let width=Dimensions.get('window').width;
let height=Dimensions.get('window').height;
export default class WeiBoContentP extends Component{
	constructor(props){
		super(props);
		this.state={
			visible:false, //控制转圈圈
			photoupload: this.props.row.tuiwen.photoupload || 1, //1 代表未上传头像
			selfintroduce: this.props.row.tuiwen.selfintroduce ||'什么也没有介绍自己',
			userphoto: this.props.row.tuiwen.userphoto ||'../../image/default.jpg',
			usernickname: this.props.row.tuiwen.usernickname ||'无名氏',
			tweetid: this.props.row.tuiwen.tweet.tweetid||null, //推文的id
			useridtweet: this.props.row.tuiwen.tweet.useridtweet || 0, //发布推文的用户id
			sourcemsgid: this.props.row.tuiwen.tweet.sourcemsgid|| 0, // 被转发的微博的id
			msgcontent: this.props.row.tuiwen.tweet.msgcontent|| null,
			boxtimes:  this.props.row.tuiwen.tweet.boxtimes ||null, //被收藏的次数
			commenttimes: this.props.row.tuiwen.tweet.commenttimes || 0, //微博被评论的次数
			deletetag: this.props.row.tuiwen.tweet.deletetag|| 1, //是否删除标志 1默认没删除。2 代表删除
			ok:  0, //微博被赞的次数
			publicsee:  0, //是否可见
			publishtime:  this.props.row.tuiwen.tweet.publishtime|| null, //微博发布的时间
			reportedtimes: this.props.row.tuiwen.tweet.reportedtimes || 0, //被举报的次数
			tagid: this.props.row.tuiwen.tweet.tagid|| 1, // 1 代表没有转发的微博。2代表有被转发的微博
			topic:this.props.row.tuiwen.tweet.topic|| 1, //话题的主键
			tweetbackupone:this.props.row.tuiwen.tweet.tweetbackupone||  null, //推文附带的图片地址
			tweetbackuptwo: this.props.row.tuiwen.tweet.tweetbackuptwo ||null, //推文附带的图片地址
			tweetbackupthree: this.props.row.tuiwen.tweet.tweetbackupthree||null, //推文附带的图片地址
			tweetbackupfour: this.props.row.tuiwen.tweet.tweetbackupfour|| null,//1 代表普通推文，2 是救助推文
			videoaddress:this.props.row.tuiwen.tweet.videoaddress|| null, //推文附带的图片地址
			// zhuanfaTuiwen:this.props.row.tuiwen.zhuanfaTuiwen || null,
			cash:{}
		};		
	}
	componentDidMount(){
		//console.log(this.props);
		if (this.state.tweetbackupfour===2 &&this.props.row.tuiwen.tweet.tweetbackupfive!==null ) { //等于2表明是一条救助推文。
			let params={
	       		proof:"111",
	       		cashid:this.props.row.tuiwen.tweet.tweetbackupfive
	        };
		   	let options={
		        url:UrlCashRecord,
		        body: JSON.stringify(params)
		    }; 
		
	        let response=fetchTool(options);
	        response.then(resp=>{
	        	 //console.log(UrlCashRecord);
	        	 //console.log(resp);
	             if (resp.retcode===2000) {
	              	  this.getJson(resp.data);
	              }
	        }).catch(err=>{
	        	console.log('获取cashNeed 失败');
	        });
	    }//if	
      let  finalPublishTime=fmDate(this.props.row.tuiwen.tweet.publishtime);
      this.setState({
      	    publishtime:finalPublishTime
      });

	}//componentDidMount
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
			component:UserPage,

		});
	}
	doComment(){
		if (this.state.deletetag===2 || this.state.publicsee===2){ //已被删除或者不可见
			return Alert.alert(
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
				tweetid:this.props.row.tuiwen.tweet.tweetid 
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
				tweetid:this.props.row.tuiwen.tweet.tweetid 
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
		this.props.navigator.push({
			component:DoZhuanFa,
			params:{
				userProfile:this.props.userProfile,
				tweetid:this.props.row.tuiwen.tweet.tweetid 
			}
		});
	}

	goReport(){
		//如果是救助推文就到Report 否则去ReportTuiwen
		this.props.navigator.push({
			component:ReportTuiwen,
			params:{
				userProfile:this.props.userProfile,
				tweetid:this.props.row.tuiwen.tweet.tweetid 
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
		//console.log(url);//成功了，哈哈
		// //在这里把url(用户昵称)传递给主页
		this.props.navigator.push({
			component:UserPage,
			params:{
				nickname:url
			}
		});
	}
	deleteMe(){
		if (this.state.deletetag===2) {
			return ;//已被删除
		};
       let params={
       		 token:this.props.userProfile.items.backupfour,
       		 tweetid:this.props.row.tuiwen.tweet.tweetid
       		
       };
   	    let options={
            url:UrlDeleteTwitter,
            body: JSON.stringify(params)
        };
       let response=fetchTool(options);
       response.then(resp=>{
        	  //停止转圈圈
        	  this.setState({
        	  	visible:false
        	  });
             if (resp.retcode===2000) {
              	  this.setState({
              	  	msgcontent:'信息已被您删除'
              	  });
              	  this.backUp(); //返回主页
              }else{
              	    Alert.alert(
                        '出错了',
                        resp.msg,
                        [
                            { text:'好的',onPress:() =>console.log('删除失败')}

                        ]
                    );
              }
        }).catch(err=>{
        	//停止转圈圈
        	this.setState({
        		visible:false
        	});

        });
	}
	render(){
		return(
			<View style={styles.container}> 			
				<View style={styles.broadcast}>
					<TouchableOpacity onPress={this.backUp.bind(this)} style={styles.returnButton}>
						<Image source={require('./image/ic_web_back.png')} style={styles.backImg} resizeMode={'contain'} />
						<Text style={{fontSize:16,color:'#fff'}}>返回</Text>
					</TouchableOpacity>
					{
						this.props.symbol==2?
						<Text  onPress={this.deleteMe.bind(this)} style={{fontSize:16,color:'white'}}>删除</Text>
						:null
					}					
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

					{
						this.state.tagid===2 ? 
						<TuiwenItem  row={this.props.row.zhuanfaTuiwen} navigator={this.props.navigator}/>
						: null
					}
				    {/* 证明有关的信息; affirm.js中我要证实，需要toke，所以传过去userProfile*/}
				    { this.state.tagid===1 && this.state.tweetbackupfour===2 ?
                       <Prove cash={this.state.cash} userProfile={this.props.userProfile} tweetid={this.props.row.tuiwen.tweet.tweetid}  navigator={this.props.navigator}/>
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
				<Loading  visible={this.state.visible}/>
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
 const WeiBoContent=connect(mapStateToProps)(WeiBoContentP);
 export default WeiBoContent;

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
		fontSize:16,
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

