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
import UploadFile from '../../utils/uploadFile';
import {UrlJoinLoveClue} from '../../utils/url';
import Loading from '../../loading/loading';
let ImagePicker = require('react-native-image-picker');
let ratio = PixelRatio.get();
let lineHeight = Platform.OS === 'ios' ? 14 : 16;
let statusBarHeight = Platform.OS === 'ios' ? 16 : 0;
let width=Dimensions.get('window').width;
let height=Dimensions.get('window').height;
let imgUrl=require('./image/uploadimg.jpg');
let formData = new FormData();
export default class WelfareAuth extends Component{
	constructor(props){
		super(props);
		this.state={
			token:"e10adc3949ba59abbe56e057f20f883e1",
			realName:null||" ", //机构名称，会覆盖真实姓名
			phoneNo:null||" ", //机构联系电话，会覆盖手机号
			address:null||" ", //机构的地址
			backupTwo:null||" ", //机构的性质
            backupThree:null||" ",//公益机构从事领域
            backupFive: null||" ", //公益机构人数规模
            backupSix:null||" ", //上一年募捐金额
            selfIntroduce:'用户还没有介绍自己',
			imgOneUrl:imgUrl,
			imgTwoUrl:imgUrl,
			imgThreeUrl:imgUrl,
			imgFourUrl:imgUrl,
			imgFiveUrl:imgUrl,
			imgSixUrl:imgUrl,
			imgSevenUrl:imgUrl
		}
	}
    componentDidMount(){
    	//console.log(this.realName);
    }
    cancel(){
   	 this.props.navigator.pop();
    }
    doCommit(){
		formData.append("tag",5); //机构认证是5
		formData.append("token",this.state.token); 
	    formData.append("realName",this.state.realName); //机构的名称
	    formData.append("phoneNo",this.state.phoneNo); //机构联系电话
	    formData.append("backupTwo",this.state.backupTwo); //机构的性质
	    formData.append("backupThree",this.state.backupThree); //机构从事的领域
	    formData.append("backupFive",this.state.backupFive); //机构的人数规模
	    formData.append("backupSix",this.state.backupSix); //上一年的募捐金额
	    formData.append("selfIntroduce",this.state.selfIntroduce); //简介
		let option={
			url:UrlJoinLoveClue,
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
            		'提示',
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
	//公益机构名称
	getRealName(event){
   		this.setState({
			realName:event.nativeEvent.text
		});
    }
    //机构电话
    getPhoneNo(event){
   		this.setState({
			phoneNo:event.nativeEvent.text
		});
    }
    //地址
    getAddress(event){
   		this.setState({
			address:event.nativeEvent.text
		});
    }
    //机构从事的领域
    getField(event){
   		this.setState({
			backupThree:event.nativeEvent.text
		});
    }
    //机构人数规模
    getScala(event){
   		this.setState({
			backupFive:event.nativeEvent.text
		});
    }
    //机构的性质
    getCharacter(event){
   		this.setState({
			backupTwo:event.nativeEvent.text
		});
    }
    //上一年募捐金额
    getMoney(event){
   		this.setState({
			backupSix:event.nativeEvent.text
		});
    }
    //简要介绍
    getSelfIntroduce(event){
   		this.setState({
			selfIntroduce:event.nativeEvent.text
		});
    }
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
					<Text  onPress={this.doCommit.bind(this)} style={{color:'#fff',fontSize:18,marginRight:6}}>提交</Text>
				</View>
				<ScrollView>
					<Text style={{fontSize:16,marginTop:4,paddingLeft:5}}>提示:机构认证前，先完成个人认证。</Text>
					<View style={styles.commonInputWrapper}>
	                    <Text style={styles.authoText}>机构名称</Text>
	                    <TextInput 
	                        style={styles.authCode}
	                        ref={textinput=>this.realName=textinput}
	                        placeholderTextColor={'#CCCCCC'}
	                        underlineColorAndroid={'rgba(0,0,0,0)'}
	                        keyboardType={'default'}
	                        placeholder={'请输入完整的机构名称'}
	                        onChange={this.getRealName.bind(this)}/>
	                </View>
	                <View style={styles.commonInputWrapper}>
	                    <Text style={styles.authoText}>机构电话</Text>
	                    <TextInput 
	                        ref={textinput=>this.phoneNo=textinput}
	                        style={styles.authCode}
	                        placeholderTextColor={'#CCCCCC'}
	                        underlineColorAndroid={'rgba(0,0,0,0)'}
	                        keyboardType={'default'}
	                        placeholder={'请输入可拨通机构电话'}
	                        onChange={this.getPhoneNo.bind(this)}/>
	                </View>
	                <View style={styles.commonInputWrapper}>
	                    <Text style={styles.authoText}>机构常驻地址</Text>
	                    <TextInput 
	                        ref={textinput=>this.address=textinput}
	                        style={styles.authCode}
	                        placeholderTextColor={'#CCCCCC'}
	                        underlineColorAndroid={'rgba(0,0,0,0)'}
	                        keyboardType={'default'}
	                        placeholder={'输入机构常驻地址'}
	                        onChange={this.getAddress.bind(this)}/>
	                </View>	               
	                <Text style={{fontSize:16,marginTop:4,paddingLeft:5}}>机构现状</Text>                    	           
	                <View style={styles.commonInputWrapper}>
	                    <Text style={styles.authoText}>主要领域</Text> 
	                     <TextInput 
	                        style={styles.authCode}
	                        ref={textinput=>this.backupThree=textinput}
	                        placeholderTextColor={'#CCCCCC'}
	                        underlineColorAndroid={'rgba(0,0,0,0)'}
	                        keyboardType={'default'}
	                        placeholder={'机构所从事的领域'}
	                        onChange={this.getField.bind(this)}/>               
	                </View>
	                <View style={styles.commonInputWrapper}>
	                    <Text style={styles.authoText}>机构规模</Text> 
	                     <TextInput 
	                        style={styles.authCode}
	                        ref={textinput=>this.backupFive=textinput}
	                        placeholderTextColor={'#CCCCCC'}
	                        underlineColorAndroid={'rgba(0,0,0,0)'}
	                        keyboardType={'default'}
	                        placeholder={'机构的总人数'}
	                        onChange={this.getScala.bind(this)}/>                 
	                </View>
	                <View style={styles.commonInputWrapper}>
	                    <Text style={styles.authoText}>机构性质</Text> 
	                    <TextInput 
	                        style={styles.authCode}
	                        ref={textinput=>this.backupTwo=textinput}
	                        placeholderTextColor={'#CCCCCC'}
	                        underlineColorAndroid={'rgba(0,0,0,0)'}
	                        keyboardType={'default'}
	                        placeholder={'公募、专项基金等'}
	                        onChange={this.getCharacter.bind(this)}/>                
	                </View>
	                <View style={styles.commonInputWrapper}>
	                    <Text style={styles.authoText}>上一年募捐规模</Text>  
	                    <TextInput 
	                        style={styles.authCode}
	                        ref={textinput=>this.backupSix=textinput}
	                        placeholderTextColor={'#CCCCCC'}
	                        underlineColorAndroid={'rgba(0,0,0,0)'}
	                        keyboardType={'default'}
	                        placeholder={'上一年机构募捐的规模'}
	                        onChange={this.getMoney.bind(this)}/>               
	                </View>
	                <Text style={{marginTop:2,marginLeft:20,fontSize:16}}>其它信息</Text>
				    <View style={styles.commonStyle}>
						<TextInput 
						    ref={textinput=>this.selfIntroduce=textinput}
							style={styles.affirmStyle}
							placeholder={'简要介绍下机构其它信息'}
							placeholderTextColor={'#CCCCCC'}
							multiline={true}
							maxLength={200}
							onChange={this.getSelfIntroduce.bind(this)}/>
					</View>
					<Text style={{fontSize:16,marginTop:4,paddingLeft:5}}>上传机构有关的执照等证明材料</Text>
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














































