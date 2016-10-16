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
/*这个是慈善机构认证*/
import React,{ Component } from 'react';
import Affirm from './affirm';
let ratio = PixelRatio.get();
let lineHeight = Platform.OS === 'ios' ? 14 : 16;
let statusBarHeight = Platform.OS === 'ios' ? 16 : 0;
let width=Dimensions.get('window').width;
let height=Dimensions.get('window').height;

export default class WelfareAuth extends Component{
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
					<Text style={{fontSize:16,marginTop:4,paddingLeft:5}}>提示:机构认证前，先完成个人认证。</Text>
					<View style={styles.commonInputWrapper}>
	                    <Text style={styles.authoText}>机构名称</Text>
	                    <TextInput 
	                        style={styles.authCode}
	                        ref={textinput=>this.textinput=textinput}
	                        placeholderTextColor={'#CCCCCC'}
	                        underlineColorAndroid={'rgba(0,0,0,0)'}
	                        keyboardType={'default'}
	                        placeholder={'请输入完整的机构名称'}/>
	                </View>

	                <View style={styles.commonInputWrapper}>
	                    <Text style={styles.authoText}>机构电话</Text>
	                    <TextInput 
	                        style={styles.authCode}
	                        ref={textinput=>this.textinput=textinput}
	                        placeholderTextColor={'#CCCCCC'}
	                        underlineColorAndroid={'rgba(0,0,0,0)'}
	                        keyboardType={'default'}
	                        placeholder={'请输入可拨通机构电话'}/>
	                </View>
	                <View style={styles.commonInputWrapper}>
	                    <Text style={styles.authoText}>机构常驻地址</Text>
	                    <TextInput 
	                        style={styles.authCode}
	                        ref={textinput=>this.textinput=textinput}
	                        placeholderTextColor={'#CCCCCC'}
	                        underlineColorAndroid={'rgba(0,0,0,0)'}
	                        keyboardType={'default'}
	                        placeholder={'输入机构常驻地址'}/>
	                </View>
	               
	                <Text style={{fontSize:16,marginTop:4,paddingLeft:5}}>机构现状</Text>                    
	           
	                 <View style={styles.commonInputWrapper}>
	                    <Text style={styles.authoText}>主要领域</Text>                    
	                </View>
	                 <View style={styles.commonInputWrapper}>
	                    <Text style={styles.authoText}>机构规模</Text>                    
	                </View>
	                 <View style={styles.commonInputWrapper}>
	                    <Text style={styles.authoText}>机构性质</Text>                    
	                </View>
	                <View style={styles.commonInputWrapper}>
	                    <Text style={styles.authoText}>上一年募捐规模</Text>                    
	                </View>


	                <Text style={{marginTop:2,marginLeft:20,fontSize:16}}>其它信息</Text>
				    <View style={styles.commonStyle}>
						<TextInput 
							style={styles.affirmStyle}
							placeholder={'简要介绍下机构其它信息'}
							placeholderTextColor={'#CCCCCC'}
							multiline={true}
							maxLength={200}/>
					</View>
					<Text style={{fontSize:16,marginTop:4,paddingLeft:5}}>上传机构有关的执照等证明材料</Text>
					<View style={styles.uploadimgView}>				
						{this.state.imgs}
						<Image source={require('./image/uploadimg.jpg')} style={styles.uploadImg}  resizeMode={'contain'}/>
					</View>
					<View style={{height:300}}></View>
				</ScrollView>
			</View>
		);
	}

}

let  styles=StyleSheet.create({
	container:{
		flex:1,
		backgroundColor:'#F4F4F4',
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
        justifyContent:'space-between',
        backgroundColor:'#43AC43'
	},
	commonStyle:{
		borderBottomWidth:1/ratio,
		borderBottomColor:'#CCCCCC',
		backgroundColor:'#FFFFFF',
		marginTop:2
	},
	affirmStyle:{
		height:120,
		width:width,
		paddingLeft:10,
		fontSize:14, 
		
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














































