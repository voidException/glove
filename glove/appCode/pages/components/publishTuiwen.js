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
import UploadFile from '../../utils/uploadFile';
import { UrlUploadFile } from '../../utils/url';
let ratio = PixelRatio.get();
let lineHeight = Platform.OS === 'ios' ? 14 : 16;
let statusBarHeight = Platform.OS === 'ios' ? 16 : 0;
let width=Dimensions.get('window').width;
let height=Dimensions.get('window').height;
let ImagePicker = require('react-native-image-picker');
let formData = new FormData();	//推文内容以及三张图片要共用这个formData，所以要全局

export default class PublishTuiwen extends Component{
	constructor(props){
		super(props);
		this.state={
			token:'sdkhajdsdssdksjnssdb',
			notSay:1, //1默认可以发表
			content:null,
			avatarSource:{},
			imgOneUrl:{},
			imgTwoUrl:{},
			imgThreeUrl:{},
			onoffone:false,
			onofftwo:false,
			onoffthree:false
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
		formData.append("token",this.state.token); 
		formData.append("content", this.state.content);
	    formData.append("notSay",this.state.notSay);
        //console.log(formData);
		let option={
			url:UrlUploadFile,
			body:formData
		};
		let response=UploadFile(option);
		response.then(resp=>{
			console.log(resp);
		}).catch(err=>{			
			console.log(err);
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
	          		formData.append("fileone", {uri: uri, type: 'image/jpeg',name:'fileone'});
	          		formData.append("filetwo", {uri: uri, type: 'image/jpeg',name:'filetwo'});
	          		//formData.append("hello", {uri: uri, type: 'image/jpeg'});
	          		if (tag===1) {
	          			 this.setState({
				            onoffone:true,
				            avatarSource: source
				        });
	          		}else if (tag===2) {
	          			this.setState({
				            onofftwo:true,
				            imgTwoUrl: source
				        });
	          		}else{
	          			this.setState({
				            onoffthree:true,
				            imgThreeUrl: source
				        });
	          		}
			}
		});	
    }
	render(){
		return(
			<View style={styles.container}>
			    <View  style={styles.header}>
					<Text  style={{color:'#ffffff',fontSize:16}} onPress={this.cancel.bind(this)}> 取消 </Text>
					<Text style={{fontSize:18,marginTop:-3,color:'#ffffff'}}>发推文</Text>
					<View style={styles.fasong}>
						<Text onPress={this.doFeedTuiwen.bind(this)}  style={{color:'#ffffff',fontSize:16}}>发送</Text>
					</View>
				</View>

				<View style={styles.commonStyle}>					
					<TextInput
						style={styles.affirmStyle}
						placeholder="发表推文..."
						ref='refcontent'	
						multiline={true}
						maxLength={200}
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
				{   this.state.onoffone===true ?
				    <Image source={this.state.avatarSource} resizeMode={'contain'} style={{width:80,height:80}} />
					: null
				}
				{  this.state.onofftwo===true ?
					<Image source={this.state.imgTwoUrl} resizeMode={'contain'} style={{width:80,height:80,marginLeft:3}} />
					:null
				}
				{  this.state.onoffthree===true ?
				    <Image source={this.state.imgThreeUrl} resizeMode={'contain'} style={{width:80,height:80,marginLeft:3}} />
				    :null
				}
				</View>
				{/*<Image source={this.state.avatarSource} style={styles.uploadAvatar} />*/}
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
		flexDirection:'row',
        height: 40+statusBarHeight,
        paddingTop: statusBarHeight,
        width:width,    
        borderBottomWidth:1/ratio,
        borderBottomColor:'#F9F9F9',
        alignItems:'center',
        justifyContent:'space-between',
        backgroundColor:'#43AC43',
        paddingLeft:10,
        paddingRight:10
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
		//borderWidth:1,
		//borderColor:'#DBDBDB',
		borderColor:'gray',
		marginRight:0,
		marginLeft:0,
		//borderColor:'#4EB160',
		color:'red',
		padding:10		
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










