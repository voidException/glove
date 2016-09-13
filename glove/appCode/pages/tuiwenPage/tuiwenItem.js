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
		console.log(this.props)
		this.state={
			tweetid: 0, //推文的id
			useridtweet:  0, //发布人的id
			userNickName:'无名氏',
			userPhoto:'../../image/default.jpg', //用户的头像地址
			publishtime: '1970-1-1 12:20:10', //发表时间
			msgcontent: '@xiaoshenjing 张一山喝多了，@玩男男亲吻 】近日张一山与盛冠森等好友们相聚，几人喝了不少酒，深夜一起来到河边上厕所，甚至还玩男男亲吻，有人认为没素质，有网友表示喝醉了表示理解。',
			commenttimes:  0, //评论次数
			deletetag: 0, //是否删除标记
			reportedtimes:0, //被举报次数
			tweetbackupone: null,   //附带的图片地址
			tweetbackuptwo: null,   //附带的图片地址
			tweetbackupthree: null, //附带的图片地址
			tweetbackupfour: null,  //附带的图片地址
			videoaddress: null,     //附带的图片地址 
			tagid:2,
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
		justifyContent:'center'
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















