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
import React,{ Component } from 'react';
import UploadFile from '../../utils/uploadFile';
import { UrlUploadFile } from '../../utils/url';
import Loading from '../../loading/loading';
let ratio = PixelRatio.get();
let lineHeight = Platform.OS === 'ios' ? 14 : 16;
let statusBarHeight = Platform.OS === 'ios' ? 16 : 0;
let width=Dimensions.get('window').width;
let height=Dimensions.get('window').height;
let ImagePicker = require('react-native-image-picker');
let formData = new FormData();	//推文内容以及三张图片要共用这个formData，所以要全局

let nullImg=require('../../image/tupianzhanwei.jpeg')
export default class PublishTuiwen extends Component{
	constructor(props){
		super(props);

		this.state={
			token:this.props.userProfile.items.backupfour,
			notSay:this.props.userProfile.items.notsay, //1默认可以发表

			userUUIDTweet:this.props.userProfile.items.backupten || "", //用户的uuid
			userNickname:this.props.userProfile.items.usernickname || "",
			userphoto:this.props.userProfile.items.userphoto || "",
			cityName:this.props.userProfile.items.backuptwo || "",
			selfintroduce:this.props.userProfile.items.selfintroduce||"",	

			content:null,
			avatarSource:nullImg,
			imgOneUrl:nullImg,
			imgTwoUrl:nullImg,
			imgThreeUrl:nullImg,
			visible:false
		};
	}

	cancel(){
		this.props.navigator.pop();
	}
	getTuiwenContent(event){
		//在formData里面加上推文的内容
		this.setState({
			content:event.nativeEvent.text
		});
	}
	doFeedTuiwen(){
		//提交数据的时候，应该吧数据放入到formData里面
		if(this.state.token.length<32 || this.state.content===null ||this.state.notSay===2){
			return 
		}
		formData.append("token",this.state.token); 
		formData.append("content", this.state.content);
	    formData.append("notSay",this.state.notSay);
	    formData.append("userUUIDTweet",this.state.userUUIDTweet);
	    formData.append("userNickname",this.state.userNickname);
	    formData.append("userphoto",this.state.userphoto);
	    formData.append("cityName",this.state.cityName);
	    formData.append("selfintroduce",this.state.selfintroduce);
		let option={
			url:UrlUploadFile,
			body:formData
		};
		this.setState({
			visible:true
		});
		let response=UploadFile(option);
		response.then(resp=>{
			this.setState({
				visible:false
			});
			if (resp.retcode===2000) {
				formData=new FormData(); //要清空formData的数据，防止重复提交
				this.setState({  
					avatarSource:nullImg,
					imgOneUrl:nullImg,
					imgTwoUrl:nullImg,
					imgThreeUrl:nullImg,
				});//图片要清空
				this.props.navigator.pop();
			}else{
				 formData=new FormData();
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
			// formData=new FormData();
			this.setState({
				visible:false
			});
			Alert.alert(
            		'出问题了',
            		'推文没发出去',
		            [
		                {
		                    text: '好的'
		                }
		            ]
       	    );
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
				            avatarSource: source
				        });
	          			formData.append("fileone", {uri: uri, type: 'image/jpeg',name:'fileone'});
	          		}else if (tag===2) {
	          			this.setState({
				            imgTwoUrl: source
				        });
				        formData.append("filetwo", {uri: uri, type: 'image/jpeg',name:'filetwo'});
	          		}else{
	          			this.setState({
				            imgThreeUrl: source
				        });
				        formData.append("filethree", {uri: uri, type: 'image/jpeg',name:'filethree'});
	          		}
			}
		});	
    }
	render(){
		return(
			<View style={styles.container}>
			    <View  style={styles.header}>
					<Text  style={{color:'#ffffff',fontSize:18}} onPress={this.cancel.bind(this)}> 取消 </Text>
					<Text style={{fontSize:18,color:'#ffffff'}}>发推文</Text>			
					<Text onPress={this.doFeedTuiwen.bind(this)}  style={{color:'#ffffff',fontSize:18}}>发送</Text>					
				</View>

				<View style={styles.commonStyle}>					
					<TextInput
						style={styles.affirmStyle}
						placeholder="发表推文..."
						ref='refcontent'	
						multiline={true}
						maxLength={140}
					    placeholderTextColor='#DBDBDB'
					    onChange={this.getTuiwenContent.bind(this)}/>
				</View>
				<View style={styles.publishMid}>
					<View style={styles.publishMidIn}>
						<Image source={require('./image/tips.png')} resizeMode={'contain'} style={styles.img} />
						<Text style={{fontSize:14,color:'#000'}}>最多3张图</Text>
					</View>
					<View style={styles.publishMidR}>
						<Image source={require('./image/bi.png')} resizeMode={'contain'} style={styles.img} />
						<Text style={{fontSize:14,color:'#507DAF'}}>140字</Text>
					</View>
				</View>
                <View style={styles.threePic}>
                	<TouchableOpacity onPress={this.selectPicture.bind(this,1)}>
				    	<Image source={require('./image/tu1.png')} resizeMode={'contain'} style={styles.image} />               		
                	</TouchableOpacity>
                	<TouchableOpacity  onPress={this.selectPicture.bind(this,2)}>
				    	<Image source={require('./image/tu2.png')} resizeMode={'contain'} style={styles.image} />               		
                	</TouchableOpacity>
                	<TouchableOpacity  onPress={this.selectPicture.bind(this,3)} activeOpacity={1}>
				    	<Image source={require('./image/tu3.png')} resizeMode={'contain'} style={styles.image} />               		
                	</TouchableOpacity>
                </View>
				<View style={styles.post}>				
				    <Image source={this.state.avatarSource} resizeMode={'contain'} style={{width:80,height:80}} />	
				    <Image source={this.state.imgTwoUrl }resizeMode={'contain'} style={{width:80,height:80,marginLeft:3}} />			
				    <Image source={this.state.imgThreeUrl} resizeMode={'contain'} style={{width:80,height:80,marginLeft:3}} />
				</View>
				{/*<Image source={this.state.avatarSource} style={styles.uploadAvatar} />*/}
				<Loading visible={this.state.visible} />
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
		height:50,
		flexDirection:'row',
		justifyContent:'space-between',
		alignItems:'center',
		backgroundColor:'#61B972',
		paddingLeft:5,
		paddingRight:5
	},
	fasong:{
		backgroundColor:'#FD8324',
		width:40,
		height:22,
		borderRadius:2,
		justifyContent:'center',
		flexDirection:'row',
		alignItems:'center'
	},
	commonStyle:{
		marginTop:0,
	},
	uploadAvatar:{
		width:100,
		height:100
	},
	publishMid:{
		//flex:1,
		flexDirection:'row',
		justifyContent:'space-between'
	},
	publishMidIn:{
		flexDirection:'row',
		justifyContent:'center',
		alignItems:'center',
		width:96,
		height:18,
		borderRadius:9,
		borderColor:'#CCCCCC',
		borderWidth:1/ratio,
		backgroundColor:'#F8F8F8'
	},
	publishMidR:{
		flexDirection:'row',
		justifyContent:'center',
		alignItems:'center',
		width:70,
		height:18,
		borderRadius:9,
		borderColor:'#CCCCCC',
		borderWidth:1/ratio,
	},
	threePic:{
		flexDirection:'row',
		alignItems:'center',
		justifyContent:'flex-start',
		borderWidth:1/ratio,
		borderColor:'#CCCCCC',
		height:40,
		marginTop:5
	},
	affirmStyle:{
		height:150,
		paddingLeft:3,		
		borderColor:'gray',
		marginRight:0,
		marginLeft:0,
		color:'red',
		textAlign:'left',
        textAlignVertical:'top'	
	},
	img:{
		height:15,
		width:15,
		marginRight:2
	},
	image:{
		height:30,
		width:30,
		marginLeft:24
	},
	post:{
		flexDirection:'row',
		justifyContent:'space-around',
		alignItems:'center',
		marginTop:10,
		marginLeft:0,
		marginRight:0,
		paddingLeft:5
	}
});










