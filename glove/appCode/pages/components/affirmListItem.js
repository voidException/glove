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
export default class AffirmListItem extends Component{
	constructor(props){
		super(props);
		//console.log(this.props.row);
		this.state={
			url: this.props.row.confirmbackuptwo ||'../../image/25.jpg',
			relation:this.props.row.relation || '朋友',
			content:this.props.row.content|| '还没证实哦'
		}
	}

	render(){
		return(
			<View style={styles.container}>
			    <View style={styles.toper}>
			        <Image source={{uri:this.state.url}} resizeMode={'contain'} style={styles.img} />
			    	<Text>樱桃小丸子</Text>
			    </View>
                <View style={styles.relation}>
			        <Text>关系:</Text>
			    	<Text>{this.state.relation}</Text>
			    </View>
                <View style={styles.txt}>
			    	<Text numberOfLines={4}>
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
		marginTop:2,
		paddingBottom:7
	},
	toper:{
		flexDirection:'row',
		justifyContent:'flex-start',
		alignItems:'center',
		marginLeft:5
	},
	relation:{
		flexDirection:'row',
		justifyContent:'flex-start',
		alignItems:'center',
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
	
		marginLeft:5,
		marginTop:5
	}
});









