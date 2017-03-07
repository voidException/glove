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

import UserPage from '../../components/userPage';
import geShiDate from '../../utils/geShiDate';

let ratio = PixelRatio.get();
let lineHeight = Platform.OS === 'ios' ? 14 : 16;
let statusBarHeight = Platform.OS === 'ios' ? 16 : 0;
let width=Dimensions.get('window').width;
let height=Dimensions.get('window').height;
export default class PeopleListtItem extends Component{
	constructor(props){
		super(props);
		this.state={
			url: this.props.row.userphoto || null,
			introduce:this.props.row.selfintroduce|| '同学介绍下你自己呗。',
			usernickname:this.props.row.usernickname ||'无名氏',
			time:geShiDate(this.props.row.registerdate) || '2016-9-19'
		}
	}
    goUserPage(){ //把用户所有的数据都传输过去
    	this.props.navigator.push({
    		component:UserPage,
    		params:{
    			userProfile:this.props.row,
    			diffTag:88 //99表明传递的是userProfile,唯一一处，所有的展示有关人的列表都用这个
    		}
    	});
    }
	render(){
		let Url=require('./image/25.jpg');
		return(
			<View style={styles.container}>
			   <View>
			    <View style={styles.toper}>
			        <TouchableOpacity onPress={this.goUserPage.bind(this)}>
			            {
			            	this.state.url==null ?
				        	 <Image source={Url} resizeMode={'contain'} style={styles.img} />
				        	:
				        	 <Image source={{uri:this.state.url}} resizeMode={'contain'} style={styles.img} />
			            }
			        	
			        </TouchableOpacity>
			        <View style={styles.topRight}>
			    	    <Text style={{color:'black',fontSize:16}}>{this.state.usernickname}</Text>
			    	    <Text style={{color:'#B1B1B1',fontSize:14,marginTop:5}}>{this.state.time}</Text>
			    	</View>
			    </View>
	    	    <View style={styles.introduce}>
	    	        <Text numberOfLines={4} style={{color:'#272822'}}>{this.state.introduce}</Text>
	    	    </View>
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
	watch:{
		position:'absolute',
		right:0,
		top:5
	},
	introduce:{
		flexDirection:'column',
		marginRight:8,
		marginLeft:8,
		marginTop:3
	}
});









