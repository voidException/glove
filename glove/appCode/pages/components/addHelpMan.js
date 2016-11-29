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
	Slider,
	Alert
} from 'react-native';
/*这个是添加帮助一个人页面*/
import React,{ Component } from 'react';
import Affirm from './affirm';
import UploadFile from '../../utils/uploadFile';
import {UrlAddNeedMan} from '../../utils/url';
import Loading from '../../loading/loading';
import formDate from '../../utils/formDate';
import formTime from  '../../utils/formTime';
let ratio = PixelRatio.get();
let lineHeight = Platform.OS === 'ios' ? 14 : 16;
let statusBarHeight = Platform.OS === 'ios' ? 16 : 0;
let width=Dimensions.get('window').width;
let height=Dimensions.get('window').height;
let ImagePicker = require('react-native-image-picker');
let formData = new FormData();
let nowDate = new Date(); //这个仅仅用于初始值
let imgUrl=require('./image/uploadimg.jpg');
export default class AddHelpMan extends Component{
	constructor(props){
		super(props);
		this.state={
			token:"e10adc3949ba59abbe56e057f20f883e1",
			notSay:1, //1默认可以发表
			AXSnickName:null||'putaozhuose',
			JDnickName:null||" ",
			JTFZnickName:null||'你好啊',
			SZRnickName:null||" ",
			FQRnickName:null||" ",
			visible:false,
			idZhangming:false,
			jwZhengming:false,
			yyZhengming:false,
		 	qtZhengming: false,
		 	chengnuoType:1,
		 	chengnuoContent:null||" ",
		 	targetMoney:0,
		 	moneyTitle:null||" ",
		 	description:null||" ", //具体描述
            pickerValue:'java', 
            endDate:formDate(nowDate,7),
            sliderValue:7,
			imgOneUrl:imgUrl,
			imgTwoUrl:imgUrl,
			imgThreeUrl:imgUrl,
			imgFourUrl:imgUrl,
			imgFiveUrl:imgUrl,
			imgSixUrl:imgUrl,
			imgSevenUrl:imgUrl
		}
	}

   cancel(){
   	   this.props.navigator.pop();
   }
   verify(){

   }
   doCommit(){
   	    let startDate=formTime();
		//提交数据的时候，应该吧数据放入到formData里面
		// if(this.state.token.length<32 ||this.state.notSay===2){
		// 	return 
		// }
		formData.append("token",this.state.token); 
		formData.append("content", this.state.content);
	    formData.append("notSay",this.state.notSay);
	    formData.append("AXSnickName",this.state.AXSnickName); //爱心社昵称
	    formData.append("JDnickName",this.state.JDnickName); //监督处昵称
	    formData.append("JTFZnickName",this.state.JTFZnickName); //爱心社中具体负责人的昵称、
	    formData.append("SZRnickName",this.state.SZRnickName); //受助人昵称
	    formData.append("FQRnickName",this.state.FQRnickName); //发起人昵称
	    formData.append("idZhangming",this.state.idZhangming); //是否有身份证明
	    formData.append("jwZhengming",this.state.jwZhengming); //是否有居委证明
	    formData.append("yyZhengming",this.state.yyZhengming); //是否有医院证明
	    formData.append("qtZhengming",this.state.qtZhengming); //是否有其它权威证明
	    formData.append("chengnuoType",this.state.chengnuoType); //承诺的类型
	    formData.append("chengnuoContent",this.state.chengnuoContent); //承诺的话
	    formData.append("targetMoney",this.state.targetMoney); //目标金额
	    formData.append("startDate",startDate); //开始日期
	    formData.append("endDate",this.state.endDate); //截止时间
	    formData.append("duration",this.state.sliderValue); //持续时长
	    formData.append("moneyTitle",this.state.moneyTitle);
	    formData.append("content",this.state.description);
        //console.log(formData);
		let option={
			url:UrlAddNeedMan,
			body:formData
		};
		this.setState({
			visible:true
		});
		let response=UploadFile(option);
		response.then(resp=>{
			formData=new FormData(); 
			this.setState({
				visible:false
			});
			//console.log(resp);
			if (resp.retcode===2000) {
				this.props.navigator.pop();
			}else{
				 Alert.alert(
            		'出问题了',
            		resp.msg,
		            [
		                {
		                    text: '好的'
		                }
		            ]
       			 );
			}
		}).catch(err=>{			
			console.log(err);
			this.setState({
				visible:false
			});
			Alert.alert(
            		'出问题了',
            		'稍后再试',
		            [
		                {
		                    text: '好的'
		                }
		            ]
       	    );
		});
	}
    getAXSbnickName(event){
		//console.log(tag);
		this.setState({
			AXSnickName:event.nativeEvent.text
		});
	}
    getJDnickName(event){
    	this.setState({
			JDnickName:event.nativeEvent.text
		});
    }
    getJTFZnickName(event){
    	this.setState({
			JTFZnickName:event.nativeEvent.text
		});
    }
    getSZRnickName(event){
    	this.setState({
			SZRnickName:event.nativeEvent.text
		});
    }
    getFQRnickName(event){
    	this.setState({
			FQRnickName:event.nativeEvent.text
		});
    }
    getCNtype(event){
    	this.setState({
			chengnuoType:event.nativeEvent.text
		});
    }
    getChengnuoContent(event){
    	this.setState({
			chengnuoContent:event.nativeEvent.text
		});
    }
    getTargetMoney(event){
    	this.setState({
			targetMoney:event.nativeEvent.text
		});
    }
    getMoneyTitle(event){
    	this.setState({
			moneyTitle:event.nativeEvent.text
		});
    }
    getDescription(event){
    	this.setState({
			description:event.nativeEvent.text
		});
    }
   switchFun(e){
   	 //console.log(e);
   	 this.setState({
   	 	switchTrue:true,
   	 });
   }
   sliderEnd(days){
   	 	let now = new Date();
   	 	
   	 	this.setState({
   	 		endDate:formDate(now, days),
   	 		sliderValue:days
   	 	});
   	}
   componentDidMount(){
       let startDate=formTime();
   	   //console.log(startDate);
	 
	}
	/* 选择上传图片处理函数*/
	selectPicture(tag){
    	//options是对ImagePicker的定制
    	let options = {
			title: 'Select Avatar',
			customButtons: {
				'Choose Photo from Facebook': 'fb',
			},
			storageOptions: {
				skipBackup: true,
				path: 'images'
			}
		};
    	ImagePicker.showImagePicker(options, (response) => {
			  
			  //console.log(response);
			if (response.didCancel) {
			      console.log('User cancelled image picker');
			}else if (response.error) {
			      console.log('ImagePicker Error:',response.error);
			}else if (response.customButton) {
			      console.log('User tapped custom button:',response.customButton);
			}else {
				    let uri = response.uri;
					if(uri.indexOf('file://') < 0){
						uri = 'file://' + uri;
					}else{
						uri = uri.replace('file://', '')
					}
					//这个source 是控制图片显示在手机上的
					let source = {uri: uri, isStatic: true};
					//console.log(source);
	          		let type = 'image/jpg';
	          		// formData.append("fileone", {uri: uri, type: 'image/jpeg',name:'fileone'});
	          		// formData.append("filetwo", {uri: uri, type: 'image/jpeg',name:'filetwo'});
	          		// formData.append("filethree", {uri: uri, type: 'image/jpeg',name:'filethree'});
	          		//formData.append("hello", {uri: uri, type: 'image/jpeg'});
	          		if (tag===1) {
	          			 this.setState({
				            imgOneUrl: source
				        });
	          			formData.append("fileone", {uri: uri, type: 'image/jpeg',name:'fileone'});
	          		}else if (tag===2) {
	          			this.setState({
				            imgTwoUrl: source
				        });
				        formData.append("filetwo", {uri: uri, type: 'image/jpeg',name:'filetwo'});
	          		}else if (tag===3) {
	          			this.setState({
				            imgThreeUrl: source
				        });
				        formData.append("filethree", {uri: uri, type: 'image/jpeg',name:'filethree'});
	          		}else if (tag===4) {
	          			this.setState({
				            imgFourUrl: source
				        });
				        formData.append("filefoure", {uri: uri, type: 'image/jpeg',name:'filetfoure'});
	          		}else if (tag===5) {
	          			this.setState({
				            imgFiveUrl: source
				        });
				        formData.append("filefive", {uri: uri, type: 'image/jpeg',name:'filefive'});
	          		}else if (tag===6) {
	          			this.setState({
				            imgSixUrl: source
				        });
				        formData.append("filesix", {uri: uri, type: 'image/jpeg',name:'filesix'});
	          		}else if (tag===7) {
	          			this.setState({
				            imgSevenUrl: source
				        });
				        formData.append("fileseven", {uri: uri, type: 'image/jpeg',name:'fileseven'});
	          		}
			}
		});	
    }
	render(){
	
		return(
			<View style={styles.container}>
		
			    <View  style={styles.header}>
					<Text style={{color:'#ffffff',fontSize:16,marginLeft:6}} onPress={this.cancel.bind(this)}>取消</Text>
					<Text onPress={this.doCommit.bind(this)} style={{color:'#fff',fontSize:16,marginRight:6}}>提交</Text>
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
	                        placeholder={'填写所在地某一大学爱心社'}
	                        onChange={this.getAXSbnickName.bind(this)}/>
	                </View>
	                <View style={styles.commonInputWrapper}>
	                    <Text style={styles.authoText}>监督小组:</Text>
	                    <TextInput 
	                        style={styles.authCode}	                        
	                        placeholderTextColor={'#CCCCCC'}
	                        underlineColorAndroid={'rgba(0,0,0,0)'}
	                        keyboardType={'default'}
	                        placeholder={'填写与大学爱心社对应的监督处'}
	                        onChange={this.getJDnickName.bind(this)}/>
	                </View>
	             
	                <View style={styles.commonInputWrapper}>
	                    <Text style={styles.authoText}>具体负责人:</Text>
	                    <TextInput 
	                        style={styles.authCode}                       
	                        placeholderTextColor={'#CCCCCC'}
	                        underlineColorAndroid={'rgba(0,0,0,0)'}
	                        keyboardType={'default'}
	                        placeholder={'普通用户发起的不必填写'}
	                        onChange={this.getJTFZnickName.bind(this)}/>
	                </View>
	                  <View style={styles.commonInputWrapper}>
	                    <Text style={styles.authoText}>受助人:</Text>
	                    <TextInput 
	                        style={styles.authCode}	                       
	                        placeholderTextColor={'#CCCCCC'}
	                        underlineColorAndroid={'rgba(0,0,0,0)'}
	                        keyboardType={'default'}
	                        placeholder={'受助人昵称，不能有空格'}
	                        onChange={this.getSZRnickName.bind(this)}/>
	                </View>
					<View style={styles.commonInputWrapper}>
	                    <Text style={styles.authoText}>发起人:</Text>
	                    <TextInput 
	                        style={styles.authCode}	                        
	                        placeholderTextColor={'#CCCCCC'}
	                        underlineColorAndroid={'rgba(0,0,0,0)'}
	                        keyboardType={'default'}
	                        placeholder={'发起人昵称'}
	                        onChange={this.getFQRnickName.bind(this)}/>
	                </View>
	              
	               <View style={styles.onclose}>
	               		<Text>是否有身份证明？</Text>
	                	<Switch 
	                	    disabled={false}
	                	    style={styles.switchStyle}
	                		onValueChange={(value) => this.setState({idZhangming: value})}
	                		value={this.state.idZhangming}/>
	                </View>
	                <View style={styles.onclose}>
	               		<Text>是否有居委会证明？</Text>
	                	<Switch 
	                	    disabled={false}
	                	    style={styles.switchStyle}
	                		onValueChange={(value) => this.setState({jwZhengming: value})}
	                		value={this.state.jwZhengming}/>
	                </View>
	                <View style={styles.onclose}>
	               		<Text>是否有医院证明？</Text>
	                	<Switch 
	                	    disabled={false}
	                	    style={styles.switchStyle}
	                		onValueChange={(value) => this.setState({yyZhengming: value})}
	                		value={this.state.yyZhengming}/>
	                </View>
	                <View style={styles.onclose}>
	               		<Text>是否有其它权威证明？</Text>
	                	<Switch 
	                	    disabled={false}
	                	    style={styles.switchStyle}
	                		onValueChange={(value) => this.setState({qtZhengming: value})}
	                		value={this.state.qtZhengming}/>
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
	                        placeholder={'1或者2或者3'}
	                        onChange={this.getCNtype.bind(this)}/>
	                </View>
	                <View style={styles.chengruoWrapper}>
	                    <Text style={styles.authoText}>承诺的话:</Text>
	                    <TextInput 
	                        style={styles.chengruo}                        
	                        placeholderTextColor={'#CCCCCC'}
	                        underlineColorAndroid={'rgba(0,0,0,0)'}
	                        keyboardType={'default'}
	                        multiline={true}
							maxLength={200}
	                        placeholder={'写上要承诺的话'}
	                        onChange={this.getChengnuoContent.bind(this)}/>
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
	                        placeholder={'如10000元,必须是整数'}
	                        onChange={this.getTargetMoney.bind(this)}/>
	                </View>

	              
	                <View style={{paddingTop:3,paddingBottom:3}}>
		                <View style={styles.totalTime}>
		                	<Text>截止日期:</Text>
		                	<Text style={{marginLeft:15,color:'#43AC43'}}>{this.state.endDate}</Text>
		                	<Text style={{color:'red'}}>共{this.state.sliderValue}天</Text>
		                </View>	                	
	                	<View style={styles.sliderWrapper}>
	                		<Text>7天</Text>
						    <Slider
						    	 style={{width:width-80,height:30}}
						    	 maximumValue={30}
						    	 minimumValue={7}
						    	 value={7}
						    	 step={1}
						    	 minimumTrackTintColor={'green'}
						    	 onValueChange ={this.sliderEnd.bind(this)}/>
						    <Text>30天</Text>
					     </View>
					</View>
	                <View style={styles.needMoneyTitle}>
	                    <Text style={styles.authoText}>筹款标题</Text>
	                    <TextInput 
	                        style={styles.needMoney}
	                        multiline={true}
							maxLength={100}	                       
	                        placeholderTextColor={'#CCCCCC'}
	                        underlineColorAndroid={'rgba(0,0,0,0)'}
	                        keyboardType={'default'}
	                        placeholder={'简要概述情况，不得超过50字'}
	                        onChange={this.getMoneyTitle.bind(this)}/>
	                </View>    
	                <Text style={{marginTop:2,marginLeft:17,fontSize:16}}>具体情况</Text>
				    <View style={styles.commonStyle}>
						<TextInput 
							style={styles.affirmStyle}
							placeholder={'被救助人情况描述，400字以内'}
							placeholderTextColor={'#CCCCCC'}
							multiline={true}
							maxLength={400}
							onChange={this.getDescription.bind(this)}/>
					</View>      
					<Text style={{fontSize:16,marginTop:4,paddingLeft:5}}>上传身份证有关信息</Text>
					<View style={styles.uploadimgView}>	
						<TouchableOpacity onPress={this.selectPicture.bind(this,1)}>			
							<Image key={1} source={this.state.imgOneUrl} style={styles.uploadImg}  resizeMode={'cover'}/>
						</TouchableOpacity>

						<TouchableOpacity onPress={this.selectPicture.bind(this,2)}>
							<Image key={2} source={this.state.imgTwoUrl} style={styles.uploadImg}  resizeMode={'cover'}/>
						</TouchableOpacity>

						<TouchableOpacity onPress={this.selectPicture.bind(this,3)}>
							<Image key={3} source={this.state.imgThreeUrl} style={styles.uploadImg}  resizeMode={'cover'}/>
						</TouchableOpacity>

						<TouchableOpacity onPress={this.selectPicture.bind(this,4)}>
							<Image key={4} source={this.state.imgFourUrl} style={styles.uploadImg}  resizeMode={'cover'}/>
						</TouchableOpacity>

						<TouchableOpacity onPress={this.selectPicture.bind(this,5)}>
							<Image key={5} source={this.state.imgFiveUrl} style={styles.uploadImg}  resizeMode={'cover'}/>
						</TouchableOpacity>

						<TouchableOpacity onPress={this.selectPicture.bind(this,6)}>
							<Image key={6} source={this.state.imgSixUrl} style={styles.uploadImg}  resizeMode={'cover'}/>
						</TouchableOpacity>

						<TouchableOpacity onPress={this.selectPicture.bind(this,7)}>
							<Image key={7} source={this.state.imgSevenUrl} style={styles.uploadImg}  resizeMode={'cover'}/>
						</TouchableOpacity>
					</View>
					<View style={{height:200}}></View>
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
		backgroundColor:'#fff',
		marginTop:1/ratio
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
		alignItems:'center',
		paddingTop:3,
		paddingBottom:3
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
    chengruoWrapper:{
        flexDirection:'column',
        alignItems:'flex-start',
        backgroundColor:'#FFFFFF',
        marginTop:1,
        paddingLeft:20,
        paddingRight:20,
        height:150
    },
    chengruo:{
        marginTop:1/ratio,
        width:width-40,
        height:150,
        fontSize:14,     
        color:'#666666',
        paddingTop:1
    },
    needMoneyTitle:{
    	flexDirection:'column',
        alignItems:'flex-start',
        backgroundColor:'#FFFFFF',
        marginTop:1,
        paddingLeft:20,
        paddingRight:20,
        height:60,
        paddingTop:3
    },
    needMoney:{
    	marginTop:1/ratio,
        width:width-40,
        height:40,
        fontSize:14,     
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














































