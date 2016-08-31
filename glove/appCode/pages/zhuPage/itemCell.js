import{
	StyleSheet,
	Text,
	Image,
	TouchableHighlight,
	TouchableOpacity,
	Navigator,
	View,
	Dimensions,
	PixelRatio,
	ScrollView,
} from 'react-native';
import React,{ Component } from 'react';
let {width,height}=Dimensions.get('window');
export default class ItemCell extends Component{
	constructor(props){
		super(props);
		this.state={
			itemid: 	0,
			itemname: 	'这是一个测试项目',
			circleidstart: 0,
			circleidsupervise: 	0,
			itemstart: null,
			itemend: null,
			itemtargetmoney: 0,
			itemrealmoney: 0,
			itemdescription: null,
			itemphoto: 'http://7xihgc.com1.z0.glb.clouddn.com/15.jpg' || null, //这个是发起组织（爱心社或者公益组织）的头像
			itemOwnerNickName:'爱心社',
			itemEndTimeTips:'10',
			imgurlone: null,
			imgurltwo: null,
			imgurlthree: null,
			imgurlfour: null,
			imgurlfive: null,
			imgurlsix:null,	

		}
		console.log(this.props)
	}

	componentWillReceiveProps(nextProps) {
			// this.setState({
			// 	itemid:nextProps.tweetid
			// });
	}

	render(){
		return(
			<View style={styles.container}>
				<View style={styles.topper}>
					<View style={styles.topperleft}>
						<Image  source={{uri:this.state.itemphoto}} resizeMode={'cover'} style={styles.topperleftimg} />
						<Text style={styles.topperleftTxtLeft}>{this.state.itemOwnerNickName}</Text>
					</View>
					<Text style={styles.topperMiddle}><Text style={styles.redTxt}>{this.state.itemEndTimeTips}</Text>天后结束</Text>
					<View style={styles.topperimgWrapper}>
						<Image source={require('./image/topperImgUrl.png')} style={styles.topperimg} />
					</View>
				</View>
				
				<View style={styles.titleWrapper}>
					<Text style={styles.title}>你陪我变大，我陪你变老————给爸爸妈妈的关怀【东阿阿胶】，欢迎订购</Text>
				</View>
				<View style={styles.viceTitleWrapper}>
					<Text style={styles.viceTitle}>这里是副标题，第一期众筹圆满结束，超额完成，好评如潮，感谢爱心社给我提供的平台</Text>
				</View>
				<ScrollView style={styles.images} horizontal={true}>
					<Image  source={{uri:this.state.itemphoto}} style={styles.image}/>
					<Image  source={{uri:this.state.itemphoto}} style={styles.image}/>
					<Image  source={{uri:this.state.itemphoto}} style={styles.image}/>
					<Image  source={{uri:this.state.itemphoto}} style={styles.image}/>
					<Image  source={{uri:this.state.itemphoto}} style={styles.image}/>
					<Image  source={{uri:this.state.itemphoto}} style={styles.image}/>
					<Image  source={{uri:this.state.itemphoto}} style={styles.image}/>

				</ScrollView>
			    {/* 这里是项目的标签*/}
			    <View style={styles.labelWrapper}>
				    <View style={styles.labelLeft}>
				    	<View style={styles.labelTxt}>
				    		<Text style={styles.category}>类别</Text>
				    	</View>
				    	<View>
				    		<Text style={styles.txt}>#助学</Text>
				    	</View>
				    	<View>
				    		<Text style={styles.txt}>#山区</Text>
				    	</View>
				    	<View>
				    		<Text style={styles.txt}>#贫困儿童</Text>
				    	</View>
				    </View>

			    	<View>
			    		<Text style={styles.viceTitle}>已获<Text style={styles.redTxt}>500</Text>次支持</Text>
			    	</View>
			    </View>

			    <View style={styles.checkWrapper}>
			    	<Image source={require('./image/authorize_ico.png')} style={{width:10,height:10}} resizeMode={'contain'}/>
					<Text style={styles.checkTxt}>北京大学爱心社<Text style={{color:'blue'}}>(审核通过)</Text></Text>
				</View>
			    <View style={styles.bottomWrapper}>
			    	<View style={styles.bottomItem}>
			       		 <Image  source={require('./image/total.png')} style={styles.bottomico} />
			       		 <Text style={styles.txt}>目标<Text style={styles.yellowTxt}>15000</Text>元</Text>
			        </View>
			        <View style={styles.bottomItem}>
			       		 <Image  source={require('./image/money.png')} style={styles.bottomico} />
			       		 <Text style={styles.txt}>已筹款<Text style={styles.yellowTxt}>15000</Text>元</Text>
			        </View>
			        <View style={styles.bottomItem}>
			       		 <Image  source={require('./image/speed.png')} style={styles.bottomico} />
			       		 <Text style={styles.txt}>进度<Text style={styles.purpleTxt}>90%</Text></Text>
			        </View>
			    </View>

			</View>		
		);
	}
}

let styles=StyleSheet.create({
	container:{
		marginTop:64,
		marginLeft:3,
		marginRight:3
	},
	topper:{
		flexDirection:'row',
		justifyContent:'space-between',
	},
	topperimgWrapper:{
		width:0.3*width,
		flexDirection:'row',
		justifyContent:'flex-end'
	},
	topperimg:{
		width:15,
		height:15,	
	},
	topperleft:{
		flexDirection:'row',
		alignItems:'center',
		justifyContent:'flex-start',
		width:0.3*width
	},
	topperleftTxtLeft:{
		marginLeft:8,
		fontSize:17,
		color:'#000'
	},
	topperMiddle:{
		marginLeft:10,
		fontSize:14,
		color:'#0092C3',
		width:0.3*width
	},
	topperleftimg:{
		height:24,
		width:24,
		borderRadius:12
	},
	titleWrapper:{
		marginTop:15
	},
	title:{
		fontSize:18,
		color:'#000'
	},
	viceTitleWrapper:{
		marginTop:15
	},
	viceTitle:{
		color:'#7D7D7D'
	},
	images:{
		flexDirection:'row',
		marginTop:10
	},
	image:{
		height:0.3*width,
		width:0.3*width,
		marginLeft:10
	},
	labelWrapper:{
		flexDirection:'row',
		marginTop:10,
		alignItems:'center',
		justifyContent:'space-between'
	},
	labelLeft:{
		flexDirection:'row',
		alignItems:'center'
	},
	labelTxt:{
		height:22,
		width:40,
		borderRadius:5,
		flexDirection:'row',
		borderWidth:1,
		borderColor:'green',
		alignItems:'center',
		justifyContent:'center'
	},
	category:{
		color:'green'
	},
	checkWrapper:{
		marginTop:5,
		flexDirection:'row',
		alignItems:'center'
	},
	checkTxt:{
		color:'red'
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
		color:'#7D7D7D'
	},
	redTxt:{
		color:'red',
		fontSize:15
	},
	yellowTxt:{
		color:'#050BFA',
		fontSize:15
	},
	purpleTxt:{
		color:'purple',
		fontSize:15
	}
});









