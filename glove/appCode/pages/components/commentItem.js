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

let ratio = PixelRatio.get();
let lineHeight = Platform.OS === 'ios' ? 14 : 16;
let statusBarHeight = Platform.OS === 'ios' ? 16 : 0;
let width=Dimensions.get('window').width;
let height=Dimensions.get('window').height;
export default class CommentItem extends Component{
	constructor(props){
		super(props);
		console.log(this.props.row);
		this.state={
			url: this.props.row.backuptwo ||null,
			relation:this.props.row.confirmbackuptwo || '../../image/25.jpg',
			content:this.props.row.discussreplytext|| '暂无评论',
			backupone:this.props.row.backupone,
			discussreplytime:this.props.row.discussreplytime || '2016-9-19'
		}
	}

	render(){
		return(
			<View style={styles.container}>
			    <View style={styles.toper}>
			        <Image source={{uri:this.state.url}} resizeMode={'contain'} style={styles.img} />
			        <View style={styles.topRight}>
			    	    <Text style={{color:'red'}}>{this.state.backupone}</Text>
			    	    <Text style={{color:'red'}}>{this.state.discussreplytime}</Text>
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

	img:{
		height:40,
		width:40,
		borderRadius:20,
		marginRight:6
	},
	txt:{
	    //marginLeft:40,
		marginLeft:5,
		marginTop:5
	}
});








