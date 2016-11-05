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
					<Text style={{color:'white',fontSize:16}} onPress={this.cancel.bind(this)}>取消</Text>
					<Text style={{color:'#000',fontSize:18,marginTop:-3}}>证实</Text>
					<Text style={{color:'#fff',fontSize:16,marginRight:6}}>提交</Text>
				</View>
				<View style={styles.commonInputWrapper}>
                    <Text style={styles.authoText}>关系:</Text>
                    <TextInput 
                        style={styles.authCode}	                        
                        placeholderTextColor={'#CCCCCC'}
                        underlineColorAndroid={'rgba(0,0,0,0)'}
                        keyboardType={'default'}
                        placeholder={'您与受助者的关系'}/>
	            </View>
	            <View style={styles.commonInputWrapper}>
                    <Text style={styles.authoText}>手机号:</Text>
                    <TextInput 
                        style={styles.authCode}	                        
                        placeholderTextColor={'#CCCCCC'}
                        underlineColorAndroid={'rgba(0,0,0,0)'}
                        keyboardType={'default'}
                        placeholder={'您的手机号'}/>
	            </View>
	            <View style={styles.commonStyle}>
                    <Text style={{fontSize:14,marginLeft:20}}>证实内容:</Text>
					<TextInput 
						style={styles.affirmStyle}
						placeholder={'描述下您知道的情况吧'}
						placeholderTextColor={'#CCCCCC'}
						multiline={true}
						maxLength={400}/>
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
	commonStyle:{
		borderBottomWidth:1/ratio,
		borderBottomColor:'#CCCCCC',
		backgroundColor:'#FFFFFF',
		marginTop:10
	},
	affirmStyle:{
		height:120,
		width:width,
		paddingLeft:10,
		fontSize:14, 		
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
	 commonInputWrapper:{
        flexDirection:'row',
        alignItems:'center',
        backgroundColor:'#FFFFFF',
        marginTop:1,
        paddingLeft:20,
        height:44
    },
      authoText:{
        fontSize:14,
        color:'#333333'
    },
     authCode:{
        width:width-60,
        height:44,
        fontSize:14,     
        paddingLeft:10,
        color:'#666666',
        paddingTop:1
    },
});














































