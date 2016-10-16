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
import Affirm from './affirm';
let ratio = PixelRatio.get();
let lineHeight = Platform.OS === 'ios' ? 14 : 16;
let statusBarHeight = Platform.OS === 'ios' ? 16 : 0;
let width=Dimensions.get('window').width;
let height=Dimensions.get('window').height;

export default class PostAffirm extends Component{
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
					<Text style={{color:'white',fontSize:18}} onPress={this.cancel.bind(this)}>取消</Text>
				</View>

				<View style={styles.commonStyle}>
					<Text>您与受助者关系</Text>
					<TextInput
						style={styles.inputStyle}
						
					 />
				</View>

				<View style={styles.commonStyle}>
					<Text>手机号</Text>
					<TextInput
						style={styles.mobileInputStyle}
						keyboardType={'numeric'}
						maxLength={11}
					 />
				</View>
				<View style={styles.commonStyle}>
					<Text>证实的内容</Text>
					<TextInput 
						style={styles.affirmStyle}
						multiline={true}
						maxLength={200}
					/>
				</View>
				
				<View style={styles.submmit}>
					<Text style={{color:'#fff'}}>提交</Text>
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
        paddingLeft:4,
        width:width,    
        borderBottomWidth:1/ratio,
        borderBottomColor:'#F9F9F9',
        alignItems:'center',
        justifyContent:'flex-start',
        backgroundColor:'#43AC43'
	},
	commonStyle:{
		marginTop:20,
		flexDirection:'column',
		justifyContent:'center',
		alignItems:'center',

	},
	affirmStyle:{
		height:80,
		paddingLeft:3,		
		borderWidth:1,
		borderColor:'#DBDBDB',
		borderColor:'gray',
		marginRight:20,
		marginLeft:20,
		borderColor:'#4EB160',
		
	},
	inputStyle:{
		height:30,	
		paddingLeft:3,		
		marginRight:1,
		borderWidth:1,
		borderColor:'gray',
		marginRight:20,
		marginLeft:20,
		borderColor:'#4EB160',
	},
	mobileInputStyle:{
		height:30,	
		paddingLeft:3,		
		marginRight:1,
		borderWidth:1,
		borderColor:'gray',
		marginRight:20,
		marginLeft:20,
		borderColor:'#4EB160',
	},
	submmit:{
		flexDirection:'row',
		alignItems:'center',
		justifyContent:'center',
		height:40,
		backgroundColor:'green',
		marginRight:20,
		marginLeft:20,
		marginTop:10,
		borderRadius:20
	}

});













































