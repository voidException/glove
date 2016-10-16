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
/*这个是加V认证的*/
import React,{ Component } from 'react';
import Affirm from './affirm';
let ratio = PixelRatio.get();
let lineHeight = Platform.OS === 'ios' ? 14 : 16;
let statusBarHeight = Platform.OS === 'ios' ? 16 : 0;
let width=Dimensions.get('window').width;
let height=Dimensions.get('window').height;

export default class AddHelpMan extends Component{
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
					  <View style={styles.commonInputWrapper}>
	                    <Text style={styles.authoText}>目标金额:</Text>
	                    <TextInput 
	                        style={styles.authCode}
	                        ref={textinput=>this.textinput=textinput}
	                        placeholderTextColor={'#CCCCCC'}
	                        underlineColorAndroid={'rgba(0,0,0,0)'}
	                        keyboardType={'default'}
	                        placeholder={'如10000元'}/>
	                </View>
	                  <View style={styles.commonInputWrapper}>
	                    <Text style={styles.authoText}>资金用途:</Text>
	                    <TextInput 
	                        style={styles.authCode}
	                        ref={textinput=>this.textinput=textinput}
	                        placeholderTextColor={'#CCCCCC'}
	                        underlineColorAndroid={'rgba(0,0,0,0)'}
	                        keyboardType={'default'}
	                        placeholder={'手术费，医疗费，上学'}/>
	                </View>
	                  <View style={styles.commonInputWrapper}>
	                    <Text style={styles.authoText}>截止时间 2016-11-30</Text>
	                  
	                </View>
	                  <View style={styles.commonInputWrapper}>
	                    <Text style={styles.authoText}>救助类型:</Text>
	                    <TextInput 
	                        style={styles.authCode}
	                        ref={textinput=>this.textinput=textinput}
	                        placeholderTextColor={'#CCCCCC'}
	                        underlineColorAndroid={'rgba(0,0,0,0)'}
	                        keyboardType={'default'}
	                        placeholder={'1或者2或者3'}/>
	                </View>
	                  <View style={styles.commonInputWrapper}>
	                    <Text style={styles.authoText}>承诺语句:</Text>
	                    <TextInput 
	                        style={styles.authCode}
	                        ref={textinput=>this.textinput=textinput}
	                        placeholderTextColor={'#CCCCCC'}
	                        underlineColorAndroid={'rgba(0,0,0,0)'}
	                        keyboardType={'default'}
	                        placeholder={'20年后归还善款'}/>
	                </View>
					<View style={styles.commonInputWrapper}>
	                    <Text style={styles.authoText}>姓名:</Text>
	                    <TextInput 
	                        style={styles.authCode}
	                        ref={textinput=>this.textinput=textinput}
	                        placeholderTextColor={'#CCCCCC'}
	                        underlineColorAndroid={'rgba(0,0,0,0)'}
	                        keyboardType={'default'}
	                        placeholder={'与身份证保持一致'}/>
	                </View>
	              

	                <View style={styles.commonInputWrapper}>
	                    <Text style={styles.authoText}>手机号:</Text>
	                    <TextInput 
	                        style={styles.authCode}
	                        ref={textinput=>this.textinput=textinput}
	                        placeholderTextColor={'#CCCCCC'}
	                        underlineColorAndroid={'rgba(0,0,0,0)'}
	                        keyboardType={'default'}
	                        placeholder={'请输入受助人的手机号'}/>
	                </View>
	                <View style={styles.commonInputWrapper}>
	                    <Text style={styles.authoText}>身份证号</Text>
	                    <TextInput 
	                        style={styles.authCode}
	                        ref={textinput=>this.textinput=textinput}
	                        placeholderTextColor={'#CCCCCC'}
	                        underlineColorAndroid={'rgba(0,0,0,0)'}
	                        keyboardType={'default'}
	                        placeholder={'请输入受助人的身份证号'}/>
	                </View>
	                <View style={styles.commonInputWrapper}>
	                    <Text style={styles.authoText}>被救助人ID</Text>
	                    <TextInput 
	                        style={styles.authCode}
	                        ref={textinput=>this.textinput=textinput}
	                        placeholderTextColor={'#CCCCCC'}
	                        underlineColorAndroid={'rgba(0,0,0,0)'}
	                        keyboardType={'default'}
	                        placeholder={'到对方主页可查看ID'}/>
	                </View>
	                <View style={styles.commonInputWrapper}>
	                    <Text style={styles.authoText}>筹款标题</Text>
	                    <TextInput 
	                        style={styles.authCode}
	                        ref={textinput=>this.textinput=textinput}
	                        placeholderTextColor={'#CCCCCC'}
	                        underlineColorAndroid={'rgba(0,0,0,0)'}
	                        keyboardType={'default'}
	                        placeholder={'不得超过50字'}/>
	                </View>    
	                <Text style={{marginTop:2,marginLeft:17,fontSize:16}}>具体情况</Text>
				    <View style={styles.commonStyle}>
						<TextInput 
							style={styles.affirmStyle}
							placeholder={'被救助人情况描述，200字以内'}
							placeholderTextColor={'#CCCCCC'}
							multiline={true}
							maxLength={200}/>
					</View>      
					<Text style={{fontSize:16,marginTop:4,paddingLeft:5}}>上传身份证有关信息</Text>
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














































