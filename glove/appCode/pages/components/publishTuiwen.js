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

let ratio = PixelRatio.get();
let lineHeight = Platform.OS === 'ios' ? 14 : 16;
let statusBarHeight = Platform.OS === 'ios' ? 16 : 0;
let width=Dimensions.get('window').width;
let height=Dimensions.get('window').height;
var ImagePicker = require('react-native-image-picker');
var options = {
	title: 'Select Avatar',
	customButtons: {
		'Choose Photo from Facebook': 'fb',
	},
	storageOptions: {
		skipBackup: true,
		path: 'images'
	}
};
export default class PublishTuiwen extends Component{
	constructor(props){
		super(props);
		this.state={
			avatarSource:{},
			off:2
		};
	}

	cancel(){
		this.props.navigator.pop();
	}
    selectPicture(){
    	ImagePicker.showImagePicker(options, (response) => {
			  //let url;
			  if (response.didCancel) {
			      console.log('User cancelled image picker');
			  }
			  else if (response.error) {
			      console.log('ImagePicker Error:',response.error);
			  }
			  else if (response.customButton) {
			      console.log('User tapped custom button:',response.customButton);
			  }
			  else {
			  	  // debugger
				    // You can display the image using either data... 
				   // const source = {uri: 'data:image/jpeg;base64,' + response.data, isStatic: true};
				  //debugger
				    // or a reference to the platform specific asset location 
				    // if (Platform.OS === 'ios') {

				    //   const source = {uri: response.uri.replace('file://', ''), isStatic: true};
				    //   url=source.uri;
				    // } 
				    // else {

				    //   const source = {uri: response.uri, isStatic: true};

				    // }	
				    //console.log('avatarSource');
				    let uri = response.uri;
					if(uri.indexOf('file://') < 0){
						uri = 'file://' + uri;
					}else{
						uri = uri.replace('file://', '')
					}
					const source = {uri: uri, isStatic: true};
	          		let type = 'image/jpg';
	          		let formData = new FormData();
	          		
	          		formData.append("fileone", {uri: uri, type: 'image/jpeg',name:'fileone'});
	          		formData.append("filetwo", {uri: uri, type: 'image/jpeg',name:'filetwo'});
	          		formData.append("hello", {uri: uri, type: 'image/jpeg'});
	          		formData.append("abc", 'dddd');
	          		formData.append("key",'key');
				    this.setState({
				      off:1,
				      avatarSource: source
				    });
      				
      				//let httpurl='http://172.16.11.80:8080/glove/demo/upload/firstUpload';
      				//let httpurl='http://172.16.11.80:8080/glove/demo/upload/multiUploadTest';
      				let httpurl='http://172.16.11.80:8080/glove/demo/upload/multiUpload';
      				fetch(httpurl,{
							method:'POST',
							headers:{
		    					//'Content-Type': 'application/x-www-form-urlencoded'
		    					'Content-Type': 'multipart/form-data'
		    				},
		    				body: formData
				    })
					.then(response=>response.json())
					.then(json=>{console.log(json)})
					.catch(function(e){
					   		console.log('请求推文列表出错了')
				    })
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
						<Text style={{color:'#ffffff',fontSize:16}}>发送</Text>
					</View>
				</View>

				<View style={styles.commonStyle}>					
					<TextInput
						style={styles.affirmStyle}
						placeholder="发表推文..."
						multiline={true}
						maxLength={200}
					    placeholderTextColor='#DBDBDB'/>
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
                	<TouchableOpacity onPress={this.selectPicture.bind(this)}>
				    	<Image source={require('./image/tu1.png')} resizeMode={'contain'} style={styles.image} />               		
                	</TouchableOpacity>
                	<TouchableOpacity  onPress={this.selectPicture.bind(this)}>
				    	<Image source={require('./image/tu2.png')} resizeMode={'contain'} style={styles.image} />               		
                	</TouchableOpacity>
                	<TouchableOpacity  onPress={this.selectPicture.bind(this)} activeOpacity={1}>
				    	<Image source={require('./image/tu3.png')} resizeMode={'contain'} style={styles.image} />               		
                	</TouchableOpacity>
                </View>
				<View style={styles.post}>
				    <Image source={require('./image/photo.png')} resizeMode={'contain'} style={{width:80,height:80}} />
				    <Image source={require('./image/photo.png')} resizeMode={'contain'} style={{width:80,height:80,marginLeft:3}} />
				    <Image source={require('./image/photo.png')} resizeMode={'contain'} style={{width:80,height:80,marginLeft:3}} />
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










