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
/*这个是爱心社进行认证用到*/
import React,{ Component } from 'react';
import Affirm from './affirm';
import {UrlJoinLoveClue} from '../../utils/url';
import Loading from '../../loading/loading';
import formDate from '../../utils/formDate';
import formTime from  '../../utils/formTime';
import UploadFile from '../../utils/uploadFile';
let ratio = PixelRatio.get();
let lineHeight = Platform.OS === 'ios' ? 14 : 16;
let statusBarHeight = Platform.OS === 'ios' ? 16 : 0;
let width=Dimensions.get('window').width;
let height=Dimensions.get('window').height;
let ImagePicker = require('react-native-image-picker');
let formData = new FormData();
let nowDate = new Date(); //这个仅仅用于初始值
let imgUrl=require('./image/uploadimg.jpg');
export default class JoinLoveClub extends Component{
	constructor(props){
		super(props);
		this.state={
			token:this.props.userProfile.items.backupfour,
			//token:"",
			selfIntroduce:null||" ",
			imgOneUrl:imgUrl,
			imgTwoUrl:imgUrl,
			imgThreeUrl:imgUrl,
			imgFourUrl:imgUrl,
			stopClick:false,
		}
	}

   cancel(){
   	   this.props.navigator.pop();
   }
   doCommit(){
   	    if (this.state.stopClick) {
   	    	return
   	    };
   	    this.setState({
   	    	stopClick:true
   	    });
		//提交数据的时候，应该吧数据放入到formData里面
		// if(this.state.token.length<32 ||this.state.notSay===2){
		// 	return 
		// }
		formData.append("tag",2); //爱心社认证标识为CertificateType 为2
		formData.append("token",this.state.token); 
	    // formData.append("notSay",this.state.notSay);
	    formData.append("selfIntroduce",this.state.selfIntroduce); //真实姓名
	    
        //console.log(formData);
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
			console.log(resp);
			if (resp.retcode===2000) {
				 Alert.alert(
            		'提交成功',
            		resp.msg,
		            [
		                {
		                    text: '好的',
		                    onPress:()=>{this.props.navigator.pop()}
		                }
		            ]
       			 );
				
			}else{
				 Alert.alert(
            		'出问题了',
            		resp.msg,
		            [
		                {
		                    text: '好的',
		                    onPress:()=>{this.props.navigator.pop()}
		                }
		            ]
       			 );
			}
		}).catch(err=>{			
			console.log(err);
			// this.setState({
			// 	visible:false
			// });
		});
	}
   componentDidMount(){
       
	}

   getSelfIntroduce(event){
   	    this.setState({
			selfIntroduce:event.nativeEvent.text
		});
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
			      console.log('User cancelled image picker');
			}else if (response.error) {
			      console.log('ImagePicker Error:',response.error);
			}else if (response.customButton) {
			      console.log('User tapped custom button:',response.customButton);
			}else{
				    let uri = response.path;
					if(uri.indexOf('file://') < 0){
						uri = 'file://' + uri;
					}else{
						uri = uri.replace('file://', '')
					}
					//这个source 是控制图片显示在手机上的
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
				

	                <View style={styles.commonInputWrapper}>
	                    <Text style={styles.authoText}>提示：先完成个人实名认证。</Text>
	                </View>

	                <Text style={{marginTop:2,marginLeft:5,fontSize:16}}>简要介绍下自己</Text>
				    <View style={styles.commonStyle}>
						<TextInput 
							style={styles.affirmStyle}
							placeholder={'简要介绍些社团现状'}
							placeholderTextColor={'#CCCCCC'}
							multiline={true}
							maxLength={200}
							onChange={this.getSelfIntroduce.bind(this)}/>
					</View>
					<Text style={{fontSize:16,marginTop:4,paddingLeft:5}}>上传学生证身份证等能能证明您信息的图片</Text>
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
					</View>					
				   <Loading visible={this.state.visible} />
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
        height: 50,
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
        paddingLeft:5,
        height:44
    },
     authoText:{
        fontSize:14,
        color:'#333333'
    },  
     authCode:{
        width:width-60,
        height:44,
        //fontSize:14,     
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














































