import{
	StyleSheet,
	Text,
	Image,
	TouchableHighlight,
	TouchableOpacity,
	Navigator,
	View,
	Dimensions,
	PixelRatio
} from 'react-native';
import React,{ Component } from 'react';
import UserPage from '../../components/userPage';
import WoPage from '../woPage/woPage';
import WeiBoContent from './weiboContent';
import AutoLink from 'react-native-autolink';
import Hyperlink from 'react-native-hyperlink';
import OriginTuiwenItem from './originTuiwenItem';
let {width,height}=Dimensions.get('window');

export default class WeiBoItem extends Component{
	constructor(props){
		super(props);
		//console.log(this.props);
		this.state={
			photoupload:this.props.row.tuiwen.photoupload || 1, //1 代表未上传头像
			selfintroduce: this.props.row.tuiwen.selfintroduce ||'什么也没有介绍自己',
			userphoto:this.props.row.tuiwen.userphoto ||'../../image/default.jpg',
			usernickname:this.props.row.tuiwen.usernickname || '无名氏',
			tweetid:this.props.row.tuiwen.tweet.tweetid || 0, //推文的id
			useridtweet: this.props.row.tuiwen.tweet.useridtweet || 0, //发布推文的用户id
			sourcemsgid: this.props.row.tuiwen.tweet.sourcemsgid || 0, // 被转发的微博的id
			msgcontent: this.props.row.tuiwen.tweet.msgcontent || null, //微博的内容
			boxtimes: this.props.row.tuiwen.tweet.boxtimes || null, //被收藏的次数
			commenttimes: this.props.row.tuiwen.tweet.commenttimes || 0, //微博被评论的次数
			deletetag: this.props.row.tuiwen.tweet.deletetag || 0, //是否删除标志 1默认没删除。2 代表删除
			ok: this.props.row.tuiwen.tweet.ok || 0, //微博被赞的次数
			publicsee: this.props.row.tuiwen.tweet.publicsee || 0, //是否可见
			publishtime: this.props.row.tuiwen.tweet.publishtime || null, //微博发布的时间
			reportedtimes: this.props.row.tuiwen.tweet.reportedtimes || 0, //被举报的次数
			tagid: this.props.row.tuiwen.tweet.tagid || 1, // 1 代表没有转发的微博。2代表有被转发的微博
			topic:this.props.row.tuiwen.tweet.topic || 1, //话题的主键
			tweetbackupone: this.props.row.tuiwen.tweet.tweetbackupone || null, //推文附带的图片地址
			tweetbackuptwo: this.props.row.tuiwen.tweet.tweetbackuptwo || null, //推文附带的图片地址
			tweetbackupthree: this.props.row.tuiwen.tweet.tweetbackupthree ||null, //推文附带的图片地址
			tweetbackupfour: this.props.row.tuiwen.tweet.tweetbackupfour || null,//推文附带的图片地址
			videoaddress: this.props.row.tuiwen.tweet.videoaddress ||null, //推文附带的图片地址
			// zhuanfaTuiwen:this.props.row.tuiwen.zhuanfaTuiwen || null,
		}
	}
	componentWillMount(){
		//此处是格式化时间用的。
		let timeNeedHandle=this.props.row.tuiwen.tweet.publishtime;
		var date = new Date(timeNeedHandle);
		Y = date.getFullYear() + '-';
		M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
		D = date.getDate() + ' ';
		let itemEndTime=Y+M+D;
		this.setState({
			publishtime:itemEndTime
		});
	}
	componentWillReceiveProps(nextProps) {
		this.setState({
			tweetid:nextProps.tweetid
		});
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
	//函数根绝props中的值，传递给下一个页面
	goWeiBoContent(){
		this.props.navigator.push({
			component:WeiBoContent,
			params:{
				row:this.props.row,  //完整的数据包括原创和转发
				userProfile:this.props.userProfile, //
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
		if(url.indexOf('instagram')>=0){
			return
		}
		// 在这里把url(用户昵称)传递给主页
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
			<View style={{flex:1 }}>								
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
				<TouchableOpacity onPress={this.goWeiBoContent.bind(this)}>			
					<Text style={styles.upContent}>
						<AutoLink
				          text={this.state.msgcontent}
				          hashtag="instagram"
				          twitter={true}
				          phone={true}
				          onPress={this.goBeatRenMainPage.bind(this)} />
					</Text>
				</TouchableOpacity>
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
		       			   { this.state.videoaddress !==null ?
			       			   <Image source={{uri:this.state.videoaddress}} onLoadEnd={this.imageError.bind(this)} style={styles.imageListImg} /> 	
			       			   :null
		       			   }		       			
		       			</View>
		       	    </View>
		       	    : null
	       		}
                {/*直接从父组件取得转发部分的数据*/}
				{
					this.state.tagid===2 ? 
					<OriginTuiwenItem  row={this.props.row.zhuanfaTuiwen} navigator={this.props.navigator}  userProfile={this.props.userProfile}/>
					: null
				}
				{
					this.state.tweetbackupfour===2 ?
					<View style={styles.promise}>
						<Image  source={require('./image/chengnuo.png')} resizeMode={'contain'} style={styles.promiseico} />
						<Text style={styles.txt}>对方承诺：20年内归还恩人的善款</Text>
			    	</View>
			    	:null
				}
				
			    <View style={styles.bottomWrapper}>
			    	<View style={styles.bottomItem}>
			       		 <Image  source={require('./image/total.png')} resizeMode={'contain'} style={styles.bottomico} />
			       		 <Text style={styles.txt}>传播</Text>
			        </View>
			        <View style={styles.bottomItem}>
			       		 <Image  source={require('./image/money.png')} resizeMode={'contain'} style={styles.bottomico} />
			       		 <Text style={styles.txt}>留言{this.state.commenttimes}</Text>
			        </View>
			        <View style={styles.bottomItem}>
			       		 <Image  source={require('./image/speed.png')} resizeMode={'contain'} style={styles.bottomico} />
			       		 <Text style={styles.txt}>举报{this.state.reportedtimes}</Text>
			        </View>
			    </View>
				
			</View>
		);
	}
}

let styles=StyleSheet.create({
	
	image:{
		width:40,
		height:40,	
		borderRadius:20	
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
	bottomWrapper:{
		height:40,
		backgroundColor:'#F9F9F9',
		marginTop:5,
		flexDirection:'row',
		justifyContent:'space-around',
		alignItems:'center'
	},
	bottomItem:{
		flexDirection:'row',
		alignItems:'center',
	},
	bottomico:{
		height:15,
		width:15
	},
	txt:{
		color:'red'
	},
	promise:{
		flexDirection:'row',
		justifyContent:'flex-start',
		alignItems:'center'
	},
	promiseico:{
		height:60,
		width:60
	}
});















