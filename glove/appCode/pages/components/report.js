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
/*这个是举报项目有关的*/
import React,{ Component } from 'react';
import Affirm from './affirm';
let ratio = PixelRatio.get();
let lineHeight = Platform.OS === 'ios' ? 14 : 16;
let statusBarHeight = Platform.OS === 'ios' ? 16 : 0;
let width=Dimensions.get('window').width;
let height=Dimensions.get('window').height;

export default class Report extends Component{
	constructor(props){
		super(props);
		this.state={
			imgs:[]
		}
	}

   cancel(){
   	 this.props.navigator.pop();
   }
	render(){
		for (var i =5; i >= 0; i--) {
			//let  src=require('./image/uploadimg.jpg');
			let src=<Image key={i} source={require('./image/uploadimg.jpg')} style={styles.uploadImg}  resizeMode={'contain'}/>
            this.state.imgs.push(src)
		};
		return(
			<View style={styles.container}>
		
			    <View  style={styles.header}>
					<Text style={{color:'#ffffff',fontSize:18,marginLeft:6}} onPress={this.cancel.bind(this)}>取消</Text>
					<Text style={{color:'#fff',fontSize:18,marginRight:6}}>提交</Text>
				</View>
			<ScrollView>
				<View style={styles.inputNameView}>
					<TextInput 
						style={styles.inputName}
						placeholder={'您的真实姓名'}/>
				</View>
				<View style={styles.inputNameView}>
					<TextInput 
						style={styles.inputName}
						placeholder={'您的身份证号'}/>
				</View>
				<View style={styles.commonStyle}>
					<TextInput 
						style={styles.affirmStyle}
						placeholder={'您举报的具体原因'}
						placeholderTextColor={'#CCCCCC'}
						multiline={true}
						maxLength={200}/>
				</View>

				<Text style={{fontSize:16,marginTop:4,paddingLeft:5}}>上传举报相关的图片</Text>
				<View style={styles.uploadimgView}>				
					{this.state.imgs}
					<Image source={require('./image/uploadimg.jpg')} style={styles.uploadImg}  resizeMode={'contain'}/>
				</View>
			</ScrollView>
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
        height:50,
        paddingLeft:4,
        width:width,    
        borderBottomWidth:1/ratio,
        borderBottomColor:'#F9F9F9',
        alignItems:'center',
        justifyContent:'space-between',
        backgroundColor:'#43AC43'
	},
	commonStyle:{
		borderBottomWidth:1/ratio,
		borderBottomColor:'#CCCCCC'

	},
	affirmStyle:{
		height:120,
		width:width,
		paddingLeft:10
		
	},

	inputNameView:{
		borderBottomWidth:1/ratio,
		borderBottomColor:'#CCCCCC'
	},
	inputName:{
		height:40,
		width:width,
		paddingLeft:10
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
		backgroundColor:'#43AC43',
		marginRight:20,
		marginLeft:20,
		marginTop:10,
		borderRadius:20
	},
	uploadimgView:{
		flexWrap :'wrap',
		marginTop:10,
		flexDirection:'row',
		paddingLeft:5
	},
	uploadImg:{
		width:80,
		height:80
	}

});














































