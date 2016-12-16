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
	Alert
} from 'react-native';
/*这个是加入监督处认证需要的*/
import React,{ Component } from 'react';
import Affirm from './affirm';
import UploadFile from '../../utils/uploadFile';
import {UrlJoinLoveClue} from '../../utils/url';
import formDate from '../../utils/formDate';
import formTime from  '../../utils/formTime';
import WeChat from 'react-native-wechat-android';
import Loading from '../../loading/loading';
let ratio = PixelRatio.get();
let lineHeight = Platform.OS === 'ios' ? 14 : 16;
let statusBarHeight = Platform.OS === 'ios' ? 16 : 0;
let width=Dimensions.get('window').width;
let height=Dimensions.get('window').height;
let ImagePicker = require('react-native-image-picker');
let formData = new FormData();
let nowDate = new Date(); //这个仅仅用于初始值
let imgUrl=require('./image/uploadimg.jpg');
export default class JoinSuperVise extends Component{
	constructor(props){
		super(props);
		//console.log(WeChat);'e10adc3949ba59abbe56e057f20f883e1'||
		this.state={
			token: this.props.userProfile.backupfour,
			realName:null||"",
			phoneNo:null||"",
			idno:null||"",
			post:null||"", //职务
			showLoading:false,
			selfIntroduce:null||"",//简单介绍自己
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
    doCommit(){
    	this.setState({
			visible:true
		});
   	    let startDate=formTime();
		formData.append("tag",3); //个人认证是1
		formData.append("token",this.state.token); 
	    formData.append("realName",this.state.realName); //真实姓名
	    formData.append("phoneNo",this.state.phoneNo); //认证人的手机号
	    formData.append("idno",this.state.idno); //认证人的身份证号
	    formData.append("post",this.state.post); //社团中的职务，存入个人标签中backupseve
		let option={
			url:UrlJoinLoveClue,
			body:formData
		};
	
		let response=UploadFile(option);
		response.then(resp=>{
			formData=new FormData(); 
			this.setState({
				visible:false
			});
			if (resp.retcode===2000) {
				 Alert.alert(
            		'提交成功',
            		resp.msg,
		            [
		                {
		                    text: '好的',
		                    onPress:()=>{this.props.navigator.pop();}
		                }
		            ]
       			 );
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
			//console.log(err);
			this.setState({
				visible:false
			});
		});
	}
    componentDidMount(){

	}
   getRealName(event){
   		this.setState({
			realName:event.nativeEvent.text
		});
   }
   getPhoneNo(event){
   		this.setState({
			phoneNo:event.nativeEvent.text
		});
   }
   getIdentiNo(event){
   	     this.setState({
			idno:event.nativeEvent.text
		});
   }

   getPost(event){
   	    this.setState({
			post:event.nativeEvent.text
		});
   }
   getStatus(event){
   	    this.setState({
			selfIntroduce:event.nativeEvent.text
		});
   }
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
			  
			  //console.log(response);
			if (response.didCancel) {
			      console.log('User cancelled image picker');
			}else if (response.error) {
			      console.log('ImagePicker Error:',response.error);
			}else if (response.customButton) {
			      console.log('User tapped custom button:',response.customButton);
			}else {
                    //console.log(response);       
				    let uri = response.path;
					if(uri.indexOf('file://') < 0){ //android ,uri:"content://media/external/images/media/8055"
						uri = 'file://' + uri;
					}else{
						uri = uri.replace('file://', '') 
					}
					let source = {uri: uri, isStatic: true};
					
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
					<Text style={{color:'#ffffff',fontSize:18,marginLeft:6}} onPress={this.cancel.bind(this)}>取消</Text>
					<Text onPress={this.doCommit.bind(this)} style={{color:'#fff',fontSize:18,marginRight:6}}>提交</Text>
				</View>
				<ScrollView>
					<View style={styles.commonInputWrapper}>
	                    <Text style={styles.authoText}>姓名</Text>
	                    <TextInput 
	                        style={styles.authCode}
	                        ref={textinput=>this.textinput=textinput}
	                        placeholderTextColor={'#CCCCCC'}
	                        underlineColorAndroid={'rgba(0,0,0,0)'}
	                        keyboardType={'default'}
	                        placeholder={'请输入你的真实姓名'}
	                        maxLength={10}
	                        onChange={this.getRealName.bind(this)}/>
	                </View>

	                <View style={styles.commonInputWrapper}>
	                    <Text style={styles.authoText}>手机号</Text>
	                    <TextInput 
	                        style={styles.authCode}
	                        ref={textinput=>this.textinput=textinput}
	                        placeholderTextColor={'#CCCCCC'}
	                        underlineColorAndroid={'rgba(0,0,0,0)'}
	                        keyboardType={'default'}
	                        placeholder={'请输入你的手机号'}
	                        maxLength={11}
	                        onChange={this.getPhoneNo.bind(this)}/>
	                </View>
	                <View style={styles.commonInputWrapper}>
	                    <Text style={styles.authoText}>身份证号</Text>
	                    <TextInput 
	                        style={styles.authCode}
	                        ref={textinput=>this.textinput=textinput}
	                        placeholderTextColor={'#CCCCCC'}
	                        underlineColorAndroid={'rgba(0,0,0,0)'}
	                        keyboardType={'default'}
	                        placeholder={'请输入你的身份证号'}
	                        maxLength={18}
	                        onChange={this.getIdentiNo.bind(this)}/>
	                </View>
	                <View style={styles.commonInputWrapper}>
	                    <Text style={styles.authoText}>职业</Text>
	                    <TextInput 
	                        style={styles.authCode}
	                        ref={textinput=>this.textinput=textinput}
	                        placeholderTextColor={'#CCCCCC'}
	                        underlineColorAndroid={'rgba(0,0,0,0)'}
	                        keyboardType={'default'}
	                        placeholder={'如CEO'}
	                        maxLength={10}
	                        onChange={this.getPost.bind(this)}/>
	                </View>

	                <Text style={{marginTop:2,marginLeft:20,fontSize:16}}>其它</Text>
				    <View style={styles.commonStyle}>
						<TextInput 
							style={styles.affirmStyle}
							placeholder={'简要介绍下您自己'}
							placeholderTextColor={'#CCCCCC'}
							multiline={true}
							maxLength={120}
							onChange={this.getStatus.bind(this)}/>
					</View>
					<Text style={{fontSize:16,marginTop:4,paddingLeft:5}}>上传能表明您身份信息的有关照片</Text>
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
					<View style={{height:300}}></View>
					
				</ScrollView>
				<Loading visible={this.state.showLoading} />
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














































