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
let itemphoto= 'http://7xihgc.com1.z0.glb.clouddn.com/15.jpg'
export default class ItemCell extends Component{
	constructor(props){
		super(props);
		//console.log(this.props.row);
		this.state={
			itemid: this.props.row.item.itemid || 0,
			itemname:this.props.row.item.itemname ||null,
			circleidstart: this.props.row.item.circleidstart ||0,
			circleidsupervise:this.props.row.item.circleidsupervise || 0,
			//itemstart: this.props.row.item.itemstart || 0,
			itemend: this.props.row.item.itemend || null,
			itemtargetmoney: this.props.row.item.itemtargetmoney||0,
			itemrealmoney: this.props.row.item.itemrealmoney||0,
			itemdescription: this.props.row.item.itemdescription ||null,
			circleidstartNickName:this.props.row.circleidstartNickName || null, //创建项目的用户昵称
			circleidstartPhoto:this.props.row.circleidstartPhoto || itemphoto, //创建项目的用户头像地址
			circleidsuperviseNickName: this.props.row.circleidsuperviseNickName||null,//项目监督团队的昵称
			useridprincipalNickName: this.props.row.circleidstartNickName || null, //项目具体执行人的昵称
			imgurlone: this.props.row.item.imgurlone ||null,
			imgurltwo: this.props.row.item.imgurltwo ||null,
			imgurlthree: this.props.row.item.imgurlthree ||null,
			imgurlfour: this.props.row.item.imgurlfour ||null,
			imgurlfive: this.props.row.item.imgurlfive ||null,
			imgurlsix:this.props.row.item.imgurlsix ||null,
			backupthree:this.props.row.item.backupthree || null,
			backupfour:this.props.row.item.backupfour || null,
			backupsix:this.props.row.item.backupsix || null,
			progress:0
		}
		 // console.log(this.props.row);
		  //console.log(this.props.row);
		// console.log(this.props.row.circleidsupervise);
	}
    goItemContent(){
    	//console.log('ss')
    }
	
	componentDidMount(){
		//计算百分比和时间转换
		//console.log(this.props.row.itemstart);
		// let timeNeedHandle=this.props.row.item.itemend;
		let timeNeedHandle=this.props.row.item.itemstart;
		var date = new Date(timeNeedHandle);
		Y = date.getFullYear() + '-';
		M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
		D = date.getDate() + ' ';
		//console.log(Y+M+D)
		let itemEndTime=Y+M+D;
		this.setState({
			itemend:itemEndTime
		});
		//进度的百分比
		
		let target=this.props.row.item.itemtargetmoney;
		let real=this.props.row.item.itemrealmoney;
		let ratio=100*(real/target);
		let strRatio=ratio.toString();
		let substrRatio=strRatio.substring(0,5)+'%';
        this.setState({
        	progress:substrRatio
        });
	}

	componentWillReceiveProps(nextProps) {
			// this.setState({
			// 	itemid:nextProps.tweetid
			// });
	}
	test(){
		//console.log('aa');
	}

	render(){
		return(
			<View style={styles.container}>
				<View style={styles.topper}>
					<View style={styles.topperleft}>
						<Image  source={{uri:this.state.circleidstartPhoto}} resizeMode={'cover'} style={styles.topperleftimg} />
						<Text style={styles.topperleftTxtLeft}>{this.state.circleidstartNickName}</Text>
					</View>
					
					<View style={styles.topperRight}>
					   	<Text style={styles.topperMiddle}>{this.state.itemend}结束</Text>
						<Image source={require('./image/topperImgUrl.png')} style={styles.topperimg} />
					</View>
				</View>
			<View>
				<View style={styles.titleWrapper}>
					<Text style={styles.title}>{this.state.itemname}</Text>
				</View>
				<View style={styles.viceTitleWrapper}>
					<Text style={styles.viceTitle}>{this.state.backupthree}</Text>
				</View>
			</View>
				<ScrollView style={styles.images} horizontal={true}>
					<Image  source={{uri:this.state.imgurlone}} style={styles.image}/>
					<Image  source={{uri:this.state.imgurltwo}} style={styles.image}/>
					<Image  source={{uri:this.state.imgurlthree}} style={styles.image}/>
					<Image  source={{uri:this.state.imgurlfour}} style={styles.image}/>
					<Image  source={{uri:this.state.imgurlfive}} style={styles.image}/>
					<Image  source={{uri:this.state.imgurlsix}} style={styles.image}/>

				</ScrollView>
			    {/* 这里是项目的标签*/}
			    <View style={styles.labelWrapper}>
				    <View style={styles.labelLeft}>
				    	<View style={styles.labelTxt}>
				    		<Text style={styles.category}>类别</Text>
				    	</View>
				    	<View>
				    		<Text style={styles.txt}>{this.state.backupfour}</Text>
				    	</View>				    	
				    </View>

			    	<View>
			    		<Text style={styles.viceTitle}>已获<Text style={styles.redTxt}>{this.state.backupsix}</Text>次支持</Text>
			    	</View>
			    </View>

			    <View style={styles.checkWrapper}>
			    	<Image source={require('./image/authorize_ico.png')} style={{width:10,height:10}} resizeMode={'contain'}/>
					<Text style={styles.checkTxt}>{this.state.circleidsuperviseNickName}<Text onPress={this.goItemContent.bind(this)} style={{color:'#7D7D7D'}}>(负责监督)</Text></Text>
				</View><View style={styles.checkWrapper}>
			    	<Image source={require('./image/authorize_ico.png')} style={{width:10,height:10}} resizeMode={'contain'}/>
					<Text style={styles.checkTxt}> @{this.state.useridprincipalNickName}<Text style={{color:'#7D7D7D'}}>(负责具体执行)</Text></Text>
				</View>

			    <View style={styles.bottomWrapper}>
			    	<View style={styles.bottomItem}>
			       		 <Image  source={require('./image/total.png')} style={styles.bottomico} />
			       		 <Text style={styles.txt}>目标<Text style={styles.yellowTxt}>{this.state.itemtargetmoney}</Text>元</Text>
			        </View>
			        <View style={styles.bottomItem}>
			       		 <Image  source={require('./image/money.png')} style={styles.bottomico} />
			       		 <Text style={styles.txt}>已筹款<Text style={styles.yellowTxt}>{this.state.itemrealmoney}</Text>元</Text>
			        </View>
			        <View style={styles.bottomItem}>
			       		 <Image  source={require('./image/speed.png')} style={styles.bottomico} />
			       		 <Text style={styles.txt}>进度<Text style={styles.purpleTxt}>{this.state.progress}</Text></Text>
			        </View>
			    </View>

			</View>		
		);
	}
}

let styles=StyleSheet.create({
	container:{
		marginLeft:3,
		marginRight:3,
		marginTop:5,
		borderTopColor:'#000'
	},
	topper:{
		flexDirection:'row',
		justifyContent:'space-between',
	},
	topperRight:{
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
	},
	topperleftTxtLeft:{
		marginLeft:8,
		fontSize:17,
		color:'#000'
	},
	topperMiddle:{
		fontSize:14,
		color:'#7D7D7D'
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
		borderColor:'#7D7D7D',
		alignItems:'center',
		justifyContent:'center'
	},
	category:{
		color:'#7D7D7D'
	},
	checkWrapper:{
		marginTop:5,
		flexDirection:'row',
		alignItems:'center'
	},
	checkTxt:{
		color:'#43AC43'
	},
	bottomWrapper:{
		height:40,
		backgroundColor:'#F9F9F9',
		//borderBottomWidth:1,
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
		color:'#000',
		fontSize:16
	},
	yellowTxt:{
		color:'#000',
		fontSize:16
	},
	purpleTxt:{
		color:'#000',
		fontSize:15
	}
});









