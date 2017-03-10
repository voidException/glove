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
			token:this.props.userProfile.items.backupfour,
			cityName:'中国',
			shouZhurenName:null, //受助人真实姓名
			shouZhureniDentityNo:null, //受助人身份证号
			acceptMoneyName:null,    //收款人真实姓名
			acceptMoneyPhone:null,   //收款人联系电话

			
			idZhengming:false,       //身份证明
			jwZhengming:false,       //居委会证明
			yyZhengming:false,       //医院证明
		 	pinkunZhengming: false,  //贫困证明
		 	relationZhengming:false,  //收款人关系证明

		 	chengnuoType:1,         //承诺类型
		 	chengnuoContent:"",   //承诺的内容

		 	targetMoney:0,            //目标捐款

		 	startDate:null, //开始日期
            endDate:formDate(nowDate,7),   //结束时间
            sliderValue:7, //持续的天数 

            moneyTitle:"",    // 筹款标题
		 	description:"", //具体情况描述800字上限      
           
			imgOneUrl:imgUrl,
			imgTwoUrl:imgUrl,
			imgThreeUrl:imgUrl,
			imgFourUrl:imgUrl,
			imgFiveUrl:imgUrl,
			imgSixUrl:imgUrl,
			imgSevenUrl:imgUrl,

			visible:false,
			notSay:1, //1默认可以发表
			pickerValue:'java', 
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

	    formData.append("cityName",this.state.cityName); 
	    formData.append("shouZhurenName",this.state.shouZhurenName); 
	    formData.append("shouZhureniDentityNo",this.state.shouZhureniDentityNo); 
	    formData.append("acceptMoneyName",this.state.acceptMoneyName); 
	    formData.append("acceptMoneyPhone",this.state.acceptMoneyPhone); 

	    formData.append("idZhangming",this.state.idZhangming); //是否有身份证明
	    formData.append("jwZhengming",this.state.jwZhengming); //是否有居委证明
	    formData.append("yyZhengming",this.state.yyZhengming); //是否有医院证明
	    formData.append("yyZhengming",this.state.yyZhengming); //是否贫困证明
	    formData.append("relationZhengming",this.state.relationZhengming); //是否有其它权威证明

	    formData.append("chengnuoType",this.state.chengnuoType); //承诺的类型
	    formData.append("chengnuoContent",this.state.chengnuoContent); //承诺的话

	    formData.append("targetMoney",this.state.targetMoney); //目标金额

	    formData.append("startDate",startDate); //开始日期
	    formData.append("endDate",this.state.endDate); //截止时间
	    formData.append("duration",this.state.sliderValue); //持续时长

	    formData.append("moneyTitle",this.state.moneyTitle);  //筹款的标题
	    formData.append("description",this.state.description);

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
    getCityName(event){  //城市
		this.setState({
			cityName:event.nativeEvent.text
		});
	}
    getShouZhurenName (event){ //受助人真实姓名
    	this.setState({
			shouZhurenName:event.nativeEvent.text
		});
    }
    getShouZhureniDentityNo(event){  //受助人身份证号
    	this.setState({
			shouZhureniDentityNo:event.nativeEvent.text
		});
    }

    getAcceptMoneyName(event){  //收款人姓名
    	this.setState({
			acceptMoneyName:event.nativeEvent.text
		});
    }

    getAcceptMoneyPhone(event){ //收款人垫还
    	this.setState({
			acceptMoneyPhone:event.nativeEvent.text
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
      
	}
	/* 选择上传图片处理函数*/
	selectPicture(tag){
    	//options是对ImagePicker的定制
    	let options = {
			title: '',
			storageOptions: {
				skipBackup: true,
				path: 'images'
			}
		};
    	ImagePicker.showImagePicker(options, (response) => {

			if (response.didCancel) {
			      //console.log('User cancelled image picker');
			}else if (response.error) {
			      //console.log('ImagePicker Error:',response.error);
			}else if (response.customButton) {
			      console.log('User tapped custom button:',response.customButton);
			}else {
				    let uri = response.path;
					if(uri.indexOf('file://') < 0){
						uri = 'file://' + uri;
					}else{
						uri = uri.replace('file://', '')
					}
					let source = {uri: uri, isStatic: true};
	          		let type = 'image/jpg';
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
					<Text style={{color:'#ffffff',fontSize:20,marginLeft:6}} onPress={this.cancel.bind(this)}>取消</Text>
					<Text onPress={this.doCommit.bind(this)} style={{color:'#fff',fontSize:20,marginRight:6}}>提交</Text>
				</View>
			
				<ScrollView>
					<View style={styles.headerDesp}>
					  	<Text>证明信息</Text>
					</View>
					<View style={styles.commonInputWrapper}>
	                    <Text style={styles.authoText}>受助人所在城市:</Text>
	                    <TextInput 
	                        style={styles.authCode}	                         
	                        placeholderTextColor={'#CCCCCC'}
	                        underlineColorAndroid={'rgba(0,0,0,0)'}
	                        keyboardType={'default'}
	                        placeholder={'重要，如“临沂市”'}
	                        onChange={this.getCityName.bind(this)}/>
	                </View>
	                <View style={styles.commonInputWrapper}>
	                    <Text style={styles.authoText}>受助人姓名:</Text>
	                    <TextInput 
	                        style={styles.authCode}	                        
	                        placeholderTextColor={'#CCCCCC'}
	                        underlineColorAndroid={'rgba(0,0,0,0)'}
	                        keyboardType={'default'}
	                        placeholder={'填写受助人真实姓名'}
	                        onChange={this.getShouZhurenName.bind(this)}/>
	                </View>
	             
	                <View style={styles.commonInputWrapper}>
	                    <Text style={styles.authoText}>受助人身份证号:</Text>
	                    <TextInput 
	                        style={styles.authCode}                       
	                        placeholderTextColor={'#CCCCCC'}
	                        underlineColorAndroid={'rgba(0,0,0,0)'}
	                        keyboardType={'default'}
	                        placeholder={'身份证号'}
	                        onChange={this.getShouZhureniDentityNo.bind(this)}/>
	                </View>
	                  <View style={styles.commonInputWrapper}>
	                    <Text style={styles.authoText}>收款人姓名:</Text>
	                    <TextInput 
	                        style={styles.authCode}	                       
	                        placeholderTextColor={'#CCCCCC'}
	                        underlineColorAndroid={'rgba(0,0,0,0)'}
	                        keyboardType={'default'}
	                        placeholder={'收款人姓名'}
	                        onChange={this.getAcceptMoneyName.bind(this)}/>
	                </View>
					<View style={styles.commonInputWrapper}>
	                    <Text style={styles.authoText}>收款人联系电话:</Text>
	                    <TextInput 
	                        style={styles.authCode}	                        
	                        placeholderTextColor={'#CCCCCC'}
	                        underlineColorAndroid={'rgba(0,0,0,0)'}
	                        keyboardType={'default'}
	                        placeholder={'可随时联系到'}
	                        onChange={this.getAcceptMoneyPhone.bind(this)}/>
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
	               		<Text>是否有贫困证明？</Text>
	                	<Switch 
	                	    disabled={false}
	                	    style={styles.switchStyle}
	                		onValueChange={(value) => this.setState({pinkunZhengming: value})}
	                		value={this.state.pinkunZhengming}/>
	                </View>
	                <View style={styles.onclose}>
	               		<Text>是否有收款人关系证明？</Text>
	                	<Switch 
	                	    disabled={false}
	                	    style={styles.switchStyle}
	                		onValueChange={(value) => this.setState({relationZhengming: value})}
	                		value={this.state.relationZhengming}/>
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
	                        placeholder={'简要概述情况，12字以内'}
	                        onChange={this.getMoneyTitle.bind(this)}/>
	                </View>    
	                <Text style={{marginTop:2,marginLeft:17,fontSize:16}}>具体情况</Text>
				    <View style={styles.commonStyle}>
						<TextInput 
							style={styles.affirmStyle}
							placeholder={'被救助人情况描述，800字以内'}
							placeholderTextColor={'#CCCCCC'}
							multiline={true}
							maxLength={800}
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
					<View style={{height:100}}></View>
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
		width:40,
		marginLeft:2
	},
	header:{
		flexDirection:'row',
        height: 50,
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
		textAlign:'left',
        textAlignVertical:'top'		
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
        textAlign:'left',
        textAlignVertical:'center'
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
        textAlign:'left',
        textAlignVertical:'top'
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














































