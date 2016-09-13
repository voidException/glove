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
import TuiwenItem from './tuiwenItem';

let {width,height}=Dimensions.get('window');

export default class WeiBoItem extends Component{
	constructor(props){
		super(props);
		//console.log(this.props.row)
		this.state={
			tweetid:this.props.row.tuiwen.tweet.tweetid || 0,
			useridtweet: this.props.row.tuiwen.tweet.useridtweet || 0,
			sourcemsgid: this.props.row.tuiwen.tweet.sourcemsgid || 0,
			msgcontent: this.props.row.tuiwen.tweet.msgcontent || null,
			boxtimes: this.props.row.tuiwen.tweet.boxtimes || null,
			commenttimes: this.props.row.tuiwen.tweet.commenttimes || 0,
			deletetag: this.props.row.tuiwen.tweet.deletetag || 0,
			ok: this.props.row.tuiwen.tweet.ok || 0,
			publicsee: this.props.row.tuiwen.tweet.publicsee || 0,
			publishtime: this.props.row.tuiwen.tweet.publishtime || null,
			reportedtimes: this.props.row.tuiwen.tweet.reportedtimes || 0,
			sourcemsgid:this.props.row.tuiwen.tweet.sourcemsgid || 0,
			tagid: this.props.row.tuiwen.tweet.tagid || 1,
			topic:this.props.row.tuiwen.tweet.topic || 1,
			tweetbackupone: this.props.row.tuiwen.tweet.tweetbackupone || null,
			tweetbackuptwo: this.props.row.tuiwen.tweet.tweetbackuptwo || null,
			tweetbackupthree: this.props.row.tuiwen.tweet.tweetbackupthree ||null,
			tweetbackupfour: this.props.row.tuiwen.tweet.tweetbackupfour || null,
			tweetbackupfive: this.props.row.tuiwen.tweet.tweetbackupfive ||0,
			tweetbackupsix: this.props.row.tuiwen.tweet.tweetbackupsix ||0,
			videoaddress: this.props.row.tuiwen.tweet.videoaddress ||null,
			sourcemsgContent:null, //这个是原创内容，稍后获取
			tagid:2,
		}
		//console.log(this.state.tweetid)
	}//应该提供个获取一条推文的API，当发现有转发的推文存在时，应该单独获取，服务器组装太麻烦了
	 //这个组件还依赖于登录的结果，比如大V是否显示
	// getJson(json){		
	// 	this.setState({
	// 		aTuiWenData:json.data[0]
	// 	});
	// 	//console.log(this.state.aTuiWenData.tweetbackupfive===null);
	// }
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
			
			<View style={{flex:1 }}>
								
				<View style={styles.headerWrapper}>
					<View  style={styles.header}>
						<TouchableOpacity onPress={this.goOtherWoPage.bind(this)}>						
							{	
								 this.state.tweetbackuptwo ===null ?
								  <Image source={require('../../image/default.jpg')} style={styles.image}/>
								: <Image source={{uri:this.state.tweetbackuptwo}} resizeMode={'contain'} style={styles.image}/>	
							}
						</TouchableOpacity>
					</View>
					<View style={styles.nameV}>
						<View style={styles.nicknameWrapper}>
							<Text style={styles.nicknameTxt}>用户的昵称</Text>
							<Image source={require('./image/VV.png')} style={styles.vTag} />
						</View>							
						<Text style={{color:'#B1B1B1',marginTop:3}}>2016-10-12 9:30:10</Text> 							
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
			       				 <Image source={require('../../image/default.jpg')} style={styles.imageListImg} />
			       				 <Image source={require('../../image/default.jpg')} style={styles.imageListImg} />
			       				 <Image source={require('../../image/default.jpg')} style={styles.imageListImg} />
		       				</View>
		       				<View style={styles.imageWrapper}>
			       				 <Image source={require('../../image/default.jpg')} style={styles.imageListImg} />
			       				 <Image source={require('../../image/default.jpg')} style={styles.imageListImg} />
			       				 <Image source={require('../../image/default.jpg')} style={styles.imageListImg} />
		       				</View>
		       			</View>
	       			:null
	       		}
				{
					this.state.tagid===2 ? 
					<TuiwenItem  row={this.props.row.zhuanfaTuiwen}/>
					: null
				}			
				<View style={styles.footer}>
					<Text onPress={this.goWeiBoContent.bind(this)} style={styles.footerText}>传播</Text>					
					<Text onPress={this.goWeiBoContent.bind(this)} style={styles.footerText}>留言</Text>					
					<Text onPress={this.goWeiBoContent.bind(this)}style={styles.footerText}>举报</Text>									
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
		//backgroundColor:'#F7F7F7',			
	},
	nicknameWrapper:{
		flexDirection:'row',
	},
	nicknameTxt:{
		fontSize:16,
		color:'red'
	},
	nameV:{
		flexDirection:'column',
		alignItems:'center',
		justifyContent:'center'
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
		justifyContent:'center'
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















