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
	TextInput
} from 'react-native';
import React,{ Component } from 'react';
/*这个是用于慈善排行榜的*/
let ratio = PixelRatio.get();
let lineHeight = Platform.OS === 'ios' ? 14 : 16;
let statusBarHeight = Platform.OS === 'ios' ? 16 : 0;
let width=Dimensions.get('window').width;
let height=Dimensions.get('window').height;
export default class CharityListItem extends Component{
	constructor(props){
		super(props);
		//console.log(this.props.row);
		this.state={
			url: this.props.row.userphoto || null,
			introduce:this.props.row.selfintroduce|| '用户还没有写简介。',
			usernickname:this.props.row.usernickname ||'无名氏',
			time:this.props.row.registerdate || '2016-9-19'
		}
        this.imagesrc={
			uri:this.state.url
		}

	}
    onImgError(event){
         this.imagesrc=require('../image/25.jpg');
    }
	render(){
		
		return(
			<View style={styles.container}>
			    <View style={styles.toper}>
			        <Image source={this.imagesrc} onError={this.onImgError.bind(this)} resizeMode={'contain'} style={styles.img} />
			        <View style={styles.topRight}>
			    	    <Text style={{color:'black',fontSize:16}}>{this.state.usernickname}</Text>
			    	    <Text style={{color:'#B1B1B1',fontSize:14,marginTop:5}}>{this.state.time}</Text>
			    	    <Text style={{color:'red',fontWeight:'bold'}}>5000元</Text>
			    	</View>
			    	<View>
			    	   <Text style={{color:'#61B972',marginRight:10}}>100元</Text>
			    	</View>
			    </View>
	    	    <View style={styles.introduce}>
	    	        <Text numberOfLines={4} style={{color:'#272822'}}>{this.state.introduce}</Text>
	    	    </View>
			</View>
		);
	}
}

let  styles=StyleSheet.create({
	container:{
		flex:1,
		backgroundColor:'#EBFAEE',
		paddingTop:5,
		paddingBottom:7
	},
	toper:{
		flexDirection:'row',
		justifyContent:'flex-start',
		alignItems:'center',
		marginLeft:5
	},
	topRight:{
		flexDirection:'column',
		justifyContent:'center',
		alignItems:'flex-start',
		marginLeft:5,
		marginTop:5
	},

	img:{
		height:60,
		width:60,
		borderRadius:30,
		marginRight:2
	},
	watchimg:{
		height:30,
		width:30
	},
	txt:{
	    //marginLeft:40,
		marginLeft:5,
		marginTop:5
	},
	introduce:{
		flexDirection:'column',
		marginRight:8,
		marginLeft:8,
		marginTop:3
	}
});









