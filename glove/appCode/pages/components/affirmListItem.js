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
		//console.log(props);
	}

	render(){
		return(
			<View style={styles.container}>
			    <View style={styles.toper}>
			        <Image source={require('../../image/talk.png')} resizeMode={'contain'} style={styles.img} />
			    	<Text>hello</Text>
			    </View>
                <View style={styles.toper}>
			        <Text>关系:</Text>
			    	<Text>同事</Text>
			    </View>
                <View style={styles.toper}>
			    	<Text>OPPO手机求机器学习/数据挖掘/分析/推荐系统/广告工程师，本科以上，3年以上工作经验，工作内容是基于亿级用户海量数据</Text>
			    </View>
				
			</View>
		);
	}
}

let  styles=StyleSheet.create({
	container:{
		flex:1,
		paddingTop:60,
		backgroundColor:'#F9FFFC'
	},
	toper:{
		flexDirection:'row',
		justifyContent:'flex-start',
		alignItems:'center',
	},
	img:{
		height:20,
		width:20,
		marginRight:2
	},
});









