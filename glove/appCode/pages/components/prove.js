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
import React,{ Component } from 'react';
let ratio = PixelRatio.get();
let lineHeight = Platform.OS === 'ios' ? 14 : 16;
let statusBarHeight = Platform.OS === 'ios' ? 20 : 0;
let width=Dimensions.get('window').width;
let height=Dimensions.get('window').height;

export default class Prove extends Component{
	constructor(props){
		super(props);
		this.state={
			cash:{
				circleusername:null,
				superusername:null,
				realcash:null,
				dutyusername:null,
				behelpusername:null,
				promisetype:null,
				promisemiaoshu:null
			}
		}
	}
    
    componentWillReceiveProps(nextProps) {
		this.setState({
			cash:{
				circleusername: nextProps.cash.circleusername,
				superusername:nextProps.cash.superusername,
				realcash:nextProps.cash.realcash,
				dutyusername:nextProps.cash.dutyusername,
				behelpusername:nextProps.cash.behelpusername,
				promisetype:nextProps.cash.promisetype,
				promisemiaoshu:nextProps.cash.promisemiaoshu

			}
		});
        console.log(nextProps.cash);
	}
	render(){
        return(	
        	<View>
		       	<View style={styles.zhengmingWrapper}>
					<View style={styles.zhengmingProfile}>
						<Text style={styles.txt}>证明信息</Text>
					</View>
					<View style={styles.authentication}>
						<Text>认证机构</Text>
						<Text style={styles.auth}>{this.state.cash.circleusername}</Text>
					</View>
					<View style={styles.jiandu}>
						<Text>监督小组</Text>
						<Text style={styles.auth}>{this.state.cash.superusername}</Text>
					</View>
					<View style={styles.authentication}>
						<Text>具体负责人</Text>
						<Text style={styles.auth}>@{this.state.cash.dutyusername}</Text>
					</View>

					<View style={styles.behelpWrapper}>
					    <View style={styles.profile}>
							<Text>受助人：</Text>
							<Text style={{color:'#2893C3',fontSize:15}}>@{this.state.cash.behelpusername}</Text>
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
							<Text>承诺类型({this.state.cash.promisetype})</Text>
							<Text style={{color:'red',marginTop:3}}>{this.state.cash.promisemiaoshu}</Text>
						</View>
					</View>
				</View>
		</View>
	    );
	}
}

let styles=StyleSheet.create({
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
	gouziImg:{
		height:12,
		width:12,		
	},
	behelpTxt:{
		fontSize:12,
		color:'green'
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
	image:{
		width:40,
		height:40,	
		borderRadius:20	
	},
	zhengshiTxt:{
		marginTop:7,
		paddingTop:6,
	},
	progress:{
		flexDirection:'row',
		justifyContent:'center'
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
	chengnuo:{
		alignItems:'center'
	},
	txt:{
		fontSize:16,
		color:'black',
		fontWeight:'bold'
	},

});
























