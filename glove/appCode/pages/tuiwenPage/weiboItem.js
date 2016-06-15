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
let {width,height}=Dimensions.get('window');

export default class WeiBoItem extends Component{
	constructor(props){
		super(props);
		//console.log(this.props)
		this.state={
			tweetid:this.props.row.ok || 0,
			useridtweet: this.props.row.useridtweet || 0,
			useridtweet: this.props.row.useridtweet || 0,
			sourcemsgid: this.props.row.sourcemsgid || 0,
			msgcontent: this.props.row.msgcontent || null,
			boxtimes: this.props.row.boxtimes || null,
			commenttimes: this.props.row.commenttimes || 0,
			deletetag: this.props.row.deletetag || 0,
			ok: this.props.row.ok || 0,
			publicsee: this.props.row.publicsee || 0,
			publishtime: this.props.row.publishtime || null,
			reportedtimes: this.props.row.reportedtimes || 0,
			sourcemsgid:this.props.row.sourcemsgid || 0,
			tagid: this.props.row.tagid || 1,
			topic:this.props.row.topic || 1,
			tweetbackupone: this.props.row.tweetbackupone || null,
			tweetbackuptwo: this.props.row.tweetbackuptwo || null,
			tweetbackupthree: this.props.row.tweetbackupthree ||null,
			tweetbackupfour: this.props.row.tweetbackupfour || null,
			tweetbackupfive: this.props.row.tweetbackupfive ||0,
			tweetbackupsix: this.props.row.tweetbackupsix ||0,
			videoaddress: this.props.row.videoaddress ||null,
			sourcemsgContent:null //这个是原创内容，稍后获取
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
		//在这里，会根据tagid判断，决定dispatch取原创微博，
		//然后获取到原创微博存储到store中的一个特定的数组中，但不知道这样是否造成显示卡顿，因为这个weiboItem
		//存储了太多原创内容props，所以还是存储到本地的storage中，然后根据健取出来，this.setState({sourcemsgConet:aaa})

		// fetch('http://127.0.0.1:8080/glove/weibos/getTweetLists',{
		// 			method:'POST',
		// 			headers:{
		// 				'Accept': 'application/json',
  //   					'Content-Type': 'application/json',
  //   				},
  //   				body: JSON.stringify({
		// 			    userID: 1,
		// 			    page: 1,
		// 			    pageSize:1
		// 			})
		//        })
		// 	   .then(response=>response.json())
		// 	   .then(json=>this.getJson(json))
		// 	   .catch(function(e){
		// 	   		console.log('请求推文出错了')
		// 	   })
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
	render(){
		//确保渲染前的每一个数据域都有值，否则会出现错误
		//let row=this.props.row;
		//console.log(row)
		return(
			
			<View style={{flex:1 ,marginTop:60}}>
								
				<View style={styles.headerWrapper}>
					<TouchableOpacity onPress={this.goOtherWoPage.bind(this)}>
						<View  style={styles.header}>
							{	
								 this.state.tweetbackuptwo ===null ?
								  <Image source={require('../../image/default.jpg')} resizeMode={'contain'} style={styles.image}/>
								: <Image source={{uri:this.state.tweetbackuptwo}} resizeMode={'contain'} style={styles.image}/>	
							}
							
							<View style={styles.nameV}>
								<Text>{this.state.tweetbackupone}</Text>
								{ 
									this.state.tweetbackupfive===3 ?
									<Text>大v</Text> 
								   : null
								}								
							</View>
						</View>
					</TouchableOpacity>
					<TouchableOpacity onPress={this.goOtherWoPage.bind(this)}>
						{
						 this.state.tweetbackupsix ?
							<View style={{marginRight:4}}>
								<Text>求助人</Text>
								<Text>@{this.state.tweetbackupthree}</Text>
							</View>
						: null
						}
					</TouchableOpacity>
				</View>
				<TouchableOpacity onPress={this.goWeiBoContent.bind(this)}>			
					<View style={styles.upContent}>
						<Text>{this.state.msgcontent}</Text>
					</View>
				</TouchableOpacity>
				{
					this.state.tagid===2 ? 
						<TouchableOpacity onPress={this.goOriginWeiBoContent.bind(this)}>	
							<View style={styles.downContent}>
								<Text>如果为2,根据sourcemsgid，异步获取原创消息的内容展示在这里</Text>
							</View>
						</TouchableOpacity>
					: null
				}			
				<View style={styles.footer}>
					<TouchableOpacity	 onPress={this.goWeiBoContent.bind(this)}>	
						<Text style={styles.footerText}>转发</Text>
					</TouchableOpacity>
					<TouchableOpacity	 onPress={this.goWeiBoContent.bind(this)}>
						<Text style={styles.footerText}>评论</Text>
					</TouchableOpacity>
					<TouchableOpacity	 onPress={this.reportMe.bind(this)}>
						<Text style={styles.footerText}>举报</Text>
					</TouchableOpacity>					
				</View>
				
			</View>
		);
	}
}

let styles=StyleSheet.create({
	
	image:{
		width:40,
		height:40,		
	},
	header:{
		flexDirection:'row',

	},
	headerWrapper:{
		flexDirection:'row',
		width:width,
		height:50,
		justifyContent:'space-between'
		
	},
	nameV:{
		flexDirection:'column',

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















