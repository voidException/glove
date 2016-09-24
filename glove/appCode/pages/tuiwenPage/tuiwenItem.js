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
import OtherWoPage from '../woPage/otherWoPage';
import WoPage from '../woPage/woPage';
import WeiBoContent from './weiboContent';
import AutoLink from 'react-native-autolink';
import Hyperlink from 'react-native-hyperlink';

let {width,height}=Dimensions.get('window');

export default class TuiwenItem extends Component{
	constructor(props){
		super(props);
		//console.log(this.props)
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
			/*转发的内容封装成一个组件，传props*/
		}
	}
	componentWillMount(){
		
	}
	componentWillReceiveProps(nextProps) {
		this.setState({
			tweetid:nextProps.tweetid
		});
	}

	goOtherWoPage(){
		//这个必须知道昵称，然后传递给OtherWoPage，涉及到refs的使用
		this.props.navigator.push({
			component:OtherWoPage
		});
	}
	//函数根绝props中的值，传递给下一个页面
	goOriginWeiBoContent(){
		this.props.navigator.push({
			component:WeiBoContent
		});
	}
	goWeiBoContent(){
		this.props.navigator.push({
			component:WeiBoContent
		});
	}
	reportMe(){
		//这里实现举报次数增加
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
		//确保渲染前的每一个数据域都有值，否则会出现错误
		//let row=this.props.row;
		//console.log(row)
		return(
			
			<View style={styles.container}>

			   {/*推文内容*/}	
				<TouchableOpacity onPress={this.goWeiBoContent.bind(this)}>			
					<View style={styles.upContent}>
					    <Text style={{fontSize:16}}>
							<AutoLink
					          text={this.state.msgcontent}
					          hashtag="instagram"
					          twitter={true}
					          phone={true}
					          linkStyle={{fontSize:16}}
					          onPress={this.goBeatRenMainPage.bind(this)} />
				        </Text>
					</View>
				</TouchableOpacity>
				{/*推文附带的照片*/}	
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
			       			   <Image source={{uri:this.state.videoaddress}}  style={styles.imageListImg} /> 	
			       			   :null
		       			   }		       			
		       			</View>
		       	    </View>
		       	    : null
	       		}
			   			
			</View>
		);
	}
}

let styles=StyleSheet.create({
	container:{
		paddingTop:10,
		paddingLeft:5,
		paddingRight:5,
		backgroundColor:'#F7F7F7',
	},
	headerWrapper:{
		flexDirection:'row',
		width:width,
		height:50,
		justifyContent:'flex-start'		
	},
	image:{
		width:40,
		height:40,	
		borderRadius:20	
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
	nicknameWrapper:{
		flexDirection:'row',

	},
	vTag:{
		width:15,
		height:15
	},
	
	nameV:{
		flexDirection:'column',
		alignItems:'center',
		justifyContent:'center'

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
	upContent:{
		marginLeft:10,
		marginRight:10,
		marginBottom:6
	},
	downContent:{
		marginTop:2,
		paddingTop:8,
		marginLeft:10,
		marginRight:10,
		backgroundColor:'#f6f6f6',
		paddingBottom:8
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
	}


});















