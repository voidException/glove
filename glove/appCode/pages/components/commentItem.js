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
import fmDate from '../../utils/fmDate';
let ratio = PixelRatio.get();
let lineHeight = Platform.OS === 'ios' ? 14 : 16;
let statusBarHeight = Platform.OS === 'ios' ? 16 : 0;
let width=Dimensions.get('window').width;
let height=Dimensions.get('window').height;
export default class CommentItem extends Component{
	constructor(props){
		super(props);
		//console.log(this.props.row);
		this.state={
			url: this.props.row.backuptwo ,
			content:this.props.row.discussreplytext,
			backupone:this.props.row.backupone,
			discussreplytime:this.props.row.discussreplytime
		}
	}

	render(){
		let publishTime=fmDate(this.state.discussreplytime);
		return(
			<View style={styles.container}>
			    <View style={styles.toper}>
			        <View style={styles.imgWrapper}>
			        	<Image source={{uri:this.state.url}} resizeMode={'contain'} style={styles.img} />
			        </View>
			        <View style={styles.topRight}>
			    	    <Text>{this.state.backupone}</Text>
			    	    <Text>{publishTime}</Text>
			    	</View>
			    </View>
                
                <View style={styles.txt}>
			    	<Text numberOfLines={4} style={{marginLeft:45}}>
			    	  {this.state.content}
			    	</Text>
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
		justifyContent:'flex-start',
		alignItems:'flex-start',
		marginLeft:5,
		marginTop:5
	},
	imgWrapper:{
		height:40,
		width:40,
		borderRadius:20,
		backgroundColor:'#F9FFFC'
	},
	img:{
		height:40,
		width:40,
		borderRadius:20
	},
	txt:{
	    //marginLeft:40,
		marginLeft:5,
		marginTop:5
	}
});









