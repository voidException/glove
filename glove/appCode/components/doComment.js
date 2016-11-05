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

export default class DoComment extends Component{
	constructor(props){
		super(props);
	}

	cancel(){
		this.props.navigator.pop();
	}

	render(){
		return(
			<View style={styles.container}>
			    <View  style={styles.header}>
					<Text onPress={this.cancel.bind(this)} style={{color:'#ffffff',fontSize:16}}>取消</Text>
					<Text style={{color:'#000',fontSize:18,marginTop:-3}}>评价</Text>
					<Text style={{color:'#ffffff',fontSize:16}}>发送</Text>
				</View>

				<View style={styles.commonStyle}>					
					<TextInput
						style={styles.affirmStyle}
						placeholder="说说您的评价..."
						multiline={true}
						maxLength={200}
					    placeholderTextColor='#DBDBDB'/>
				</View>
			</View>
		);
	}
}
let  styles=StyleSheet.create({
	container:{
		flex:1,
		backgroundColor:'#F9FFFC',
	},
	header:{
		flexDirection:'row',
        height: 40+statusBarHeight,
        paddingTop: statusBarHeight,
        width:width,    
        alignItems:'center',
        justifyContent:'space-between',
        backgroundColor:'#43AC43',
        paddingLeft:10,
        paddingRight:10
	},
	commonStyle:{
		marginTop:0,
	},
	affirmStyle:{
		height:height-40-statusBarHeight,
		paddingLeft:3,		
		marginRight:0,
		marginLeft:0,
		color:'red',
		padding:10		
	},
	img:{
		height:20,
		width:20,
		marginRight:2
	},
	post:{
		flexDirection:'row',
		justifyContent:'flex-start',
		alignItems:'center',
		marginTop:4,
		marginLeft:0,
		marginRight:0,
		height:20
	}
});










