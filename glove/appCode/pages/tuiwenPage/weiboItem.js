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
			tweetid:0,
			useridtweet:0,
			aTuiWenData:null,
			tweetid:null,
			useridtweet:null,
			sourcemsgid:null,
			tagid:null,
			msgcontent:null,
			boxtimes:null,
			commenttimes:null,
			deletetag:null,
			msgcontent:null,
			ok:0,
			publicsee:1,
			publishtime:null,
			reportedtimes:0,
			sourcemsgid:1,
			tagid:1,
			topic:1,
			tweetbackupone:null,
			tweetbackuptwo:null,
			tweetbackupthree:null,
			tweetbackupfour:null,
			tweetbackupfive:0,
			tweetbackupsix:0,
			videoaddress:null
		}
	}//应该提供个获取一条推文的API，当发现有转发的推文存在时，应该单独获取，服务器组装太麻烦了
	 //这个组件还依赖于登录的结果，比如大V是否显示
	getJson(json){		
		this.setState({
			aTuiWenData:json.data[0]
		});
		console.log(this.state.aTuiWenData.tweetbackupfive===null);
	}
	componentWillMount(){
		fetch('http://127.0.0.1:8080/glove/weibos/getTweetLists',{
					method:'POST',
					headers:{
						'Accept': 'application/json',
    					'Content-Type': 'application/json',
    				},
    				body: JSON.stringify({
					    userID: 1,
					    page: 1,
					    pageSize:1
					})
		       })
			   .then(response=>response.json())
			   .then(json=>this.getJson(json))
			   .catch(function(e){
			   		console.log('请求推文出错了')
			   })
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
	render(){
		//let row=this.props.row;
		let oneWeiBoData=this.state.aTuiWenData;
		return(
			
			<View style={{flex:1 ,marginTop:60}}>
								
				<View style={styles.headerWrapper}>
					<TouchableOpacity onPress={this.goOtherWoPage.bind(this)}>
						<View  style={styles.header}>
							{	
								 this.state.tweetbackuptwo ===null ?
								  <Image source={require('../../image/default.jpg')} resizeMode={'contain'} style={styles.image}/>
								: <Image source={{uri:this.state.aTuiWenData.tweetbackuptwo}} resizeMode={'contain'} style={styles.image}/>	
							}
							
							<View style={styles.nameV}>
								<Text>{this.state.tweetbackupone}</Text>
								<Text>大V</Text>
							</View>
						</View>
					</TouchableOpacity>
					<TouchableOpacity onPress={this.goOtherWoPage.bind(this)}>
						<View style={{marginRight:4}}>
							<Text>求助人</Text>
							<Text>@张三</Text>
						</View>
					</TouchableOpacity>
				</View>
				<TouchableOpacity onPress={this.goWeiBoContent.bind(this)}>			
					<View style={styles.upContent}>
						<Text>莫泰山携百亿私募回归 私募逐鹿公募尚待制度落地】在竞相争夺公募基金牌照的多家私募基金中又增添了一位实力悍将。随着上海博道投资管理有限公司(以下简称“博道投资”)加入公募基金牌照申请阵营</Text>
					</View>
				</TouchableOpacity>

				<TouchableOpacity onPress={this.goOriginWeiBoContent.bind(this)}>	
					<View style={styles.downContent}>
						<Text>原来推文的内容近日，罗湖海关截获 “ 李斯特菌 ”280 瓶。1 内地旅客从罗湖口岸入境被抽查发现，其携带有几百个装有细小褐色颗粒的瓶子，经现场初步判定为李斯特菌。</Text>
					</View>
				</TouchableOpacity>				
				<View style={styles.footer}>
					<TouchableOpacity	 onPress={this.goWeiBoContent.bind(this)}>	
						<Text style={styles.footerText}>转发</Text>
					</TouchableOpacity>
					<TouchableOpacity	 onPress={this.goWeiBoContent.bind(this)}>
						<Text style={styles.footerText}>评论</Text>
					</TouchableOpacity>
					<TouchableOpacity	 onPress={this.goWeiBoContent.bind(this)}>
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















