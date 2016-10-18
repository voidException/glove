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
	TextInput,
	Picker,
	Switch,
	Slider
} from 'react-native';
/*这个是加V认证的*/
import React,{ Component } from 'react';
import Affirm from './affirm';
var Region = require('rn-china-region-picker');
let ratio = PixelRatio.get();
let lineHeight = Platform.OS === 'ios' ? 14 : 16;
let statusBarHeight = Platform.OS === 'ios' ? 16 : 0;
let width=Dimensions.get('window').width;
let height=Dimensions.get('window').height;

export default class AddHelpMan extends Component{
	constructor(props){
		super(props);
		this.state={
			imgs:[],
			switchTrue:true,
			switchFalse:false,
		 	trueSwitchIsOn: true,
            falseSwitchIsOn: false,
            pickerValue:'java'
		}
	}

   cancel(){
   	 this.props.navigator.pop();
   }

   switchFun(e){
   	 console.log(e);
   	 this.setState({
   	 	switchTrue:true,
   	 });
   }
   componentDidMount(){
   }
	render(){
		for (var i =0; i <2; i++) {
			//let  src=require('./image/uploadimg.jpg');
			let src=<Image  key ={i} source={require('./image/uploadimg.jpg')} style={styles.uploadImg}  resizeMode={'contain'}/>
            this.state.imgs.push(src)
		};
		return(
			<View style={styles.container}>
		
			    <View  style={styles.header}>
					<Text style={{color:'#ffffff',fontSize:18,marginLeft:6}} onPress={this.cancel.bind(this)}>取消</Text>
					<Text style={{color:'#fff',fontSize:18,marginRight:6}}>提交</Text>
				</View>
			
				<ScrollView>
					<View style={styles.headerDesp}>
					  		<Text>证明信息</Text>
					</View>
					<View style={styles.commonInputWrapper}>
	                    <Text style={styles.authoText}>认证机构:</Text>
	                    <TextInput 
	                        style={styles.authCode}
	                         
	                        placeholderTextColor={'#CCCCCC'}
	                        underlineColorAndroid={'rgba(0,0,0,0)'}
	                        keyboardType={'default'}
	                        placeholder={'填写所在地大学爱心社'}/>
	                </View>
	                <View style={styles.commonInputWrapper}>
	                    <Text style={styles.authoText}>监督小组:</Text>
	                    <TextInput 
	                        style={styles.authCode}
	                        
	                        placeholderTextColor={'#CCCCCC'}
	                        underlineColorAndroid={'rgba(0,0,0,0)'}
	                        keyboardType={'default'}
	                        placeholder={'与大学对应的监督处'}/>
	                </View>
	             
	                <View style={styles.commonInputWrapper}>
	                    <Text style={styles.authoText}>具体负责爱心社成员:</Text>
	                    <TextInput 
	                        style={styles.authCode}
	                       
	                        placeholderTextColor={'#CCCCCC'}
	                        underlineColorAndroid={'rgba(0,0,0,0)'}
	                        keyboardType={'default'}
	                        placeholder={'由爱心社决定'}/>
	                </View>
	                  <View style={styles.commonInputWrapper}>
	                    <Text style={styles.authoText}>受助人:</Text>
	                    <TextInput 
	                        style={styles.authCode}
	                       
	                        placeholderTextColor={'#CCCCCC'}
	                        underlineColorAndroid={'rgba(0,0,0,0)'}
	                        keyboardType={'default'}
	                        placeholder={'填写受助人昵称'}/>
	                </View>
					<View style={styles.commonInputWrapper}>
	                    <Text style={styles.authoText}>发起人:</Text>
	                    <TextInput 
	                        style={styles.authCode}
	                        
	                        placeholderTextColor={'#CCCCCC'}
	                        underlineColorAndroid={'rgba(0,0,0,0)'}
	                        keyboardType={'default'}
	                        placeholder={'发起人昵称'}/>
	                </View>
	              
	               <View style={styles.onclose}>
	               		<Text>是否有身份证明？</Text>
	                	<Switch 
	                	    disabled={false}
	                	    style={styles.switchStyle}
	                		onValueChange={(value) => this.setState({falseSwitchIsOn: value})}
	                		value={this.state.falseSwitchIsOn}/>
	                </View>
	                <View style={styles.onclose}>
	               		<Text>是否有居委会证明？</Text>
	                	<Switch 
	                	    disabled={false}
	                	    style={styles.switchStyle}
	                		onValueChange={(value) => this.setState({falseSwitchIsOn: value})}
	                		value={this.state.falseSwitchIsOn}/>
	                </View>
	                <View style={styles.onclose}>
	               		<Text>是否有医院证明？</Text>
	                	<Switch 
	                	    disabled={false}
	                	    style={styles.switchStyle}
	                		onValueChange={(value) => this.setState({falseSwitchIsOn: value})}
	                		value={this.state.falseSwitchIsOn}/>
	                </View>
	                <View style={styles.onclose}>
	               		<Text>是否有其它权威证明？</Text>
	                	<Switch 
	                	    disabled={false}
	                	    style={styles.switchStyle}
	                		onValueChange={(value) => this.setState({falseSwitchIsOn: value})}
	                		value={this.state.falseSwitchIsOn}/>
	                </View>
	                <View style={styles.headerDesp}>
					  		<Text>受助人承诺</Text>
					</View>
	                <View style={styles.commonInputWrapper}>
	                    <Text style={styles.authoText}>承诺类型:</Text>
	                    <TextInput 
	                        style={styles.authCode}
	                        
	                        placeholderTextColor={'#CCCCCC'}
	                        underlineColorAndroid={'rgba(0,0,0,0)'}
	                        keyboardType={'default'}
	                        placeholder={'1或者2或者3'}/>
	                </View>
	                <View style={styles.commonInputWrapper}>
	                    <Text style={styles.authoText}>承诺的话:</Text>
	                    <TextInput 
	                        style={styles.authCode}
	                        
	                        placeholderTextColor={'#CCCCCC'}
	                        underlineColorAndroid={'rgba(0,0,0,0)'}
	                        keyboardType={'default'}
	                        placeholder={'写上要承诺的话'}/>
	                </View>
	                <View style={styles.headerDesp}>
					  		<Text>捐款信息</Text>
					</View>
	                <View style={styles.commonInputWrapper}>
	                    <Text style={styles.authoText}>目标金额</Text>
	                    <TextInput 
	                        style={styles.authCode}
	                        
	                        placeholderTextColor={'#CCCCCC'}
	                        underlineColorAndroid={'rgba(0,0,0,0)'}
	                        keyboardType={'default'}
	                        placeholder={'如10000元'}/>
	                </View>

	              
	                <View>
		                <View style={styles.totalTime}>
		                	<Text>截止日期</Text>
		                	<Text style={{marginLeft:15}}>2016-10-25</Text>
		                	<Text>共3天</Text>
		                </View>
	                	
	                	<View style={styles.sliderWrapper}>
	                		<Text>7天</Text>
						    <Slider
						    	 style={{width:width-80,height:30}}
						    	 maximumValue={30}
						    	 minimumValue={7}
						    	 minimumTrackTintColor={'green'}/>
						    <Text>30天</Text>
					     </View>
					</View>
	                <View style={styles.commonInputWrapper}>
	                    <Text style={styles.authoText}>筹款标题</Text>
	                    <TextInput 
	                        style={styles.authCode}
	                       
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
						<Image key={1} source={require('./image/uploadimg.jpg')} style={styles.uploadImg}  resizeMode={'contain'}/>
						<Image key={2} source={require('./image/uploadimg.jpg')} style={styles.uploadImg}  resizeMode={'contain'}/>
						<Image key={7} source={require('./image/uploadimg.jpg')} style={styles.uploadImg}  resizeMode={'contain'}/>
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
	
	onclose:{
		flexDirection:'row',
		justifyContent:'space-between',
		alignItems:'center',
		paddingLeft:18,
		paddingRight:18,
		backgroundColor:'#fff'
	},
	totalTime:{
		flexDirection:'row',
		justifyContent:'flex-start',
		paddingLeft:18,
		paddingRight:5
	},
	sliderWrapper:{
		flexDirection:'row',
		alignItems:'center',
		justifyContent:'space-between',
		height:30,
		width:width,
		paddingLeft:18,
		paddingRight:10,
		marginTop:5
	},
	switchStyle:{
		height:30,
		width:40
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
	headerDesp:{
		flexDirection:'row',
		justifyContent:'center',
		alignItems:'center'
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














































