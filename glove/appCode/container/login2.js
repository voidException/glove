
import{
	AppRegistry,
	StyleSheet,
	Text,
	Image,
	ScrollView,
	TouchableHighlight,
	TouchableOpacity,
	NavigatorIOS,
	Navigator,
	RefreshControl,
	View,
	ListView,
	Dimensions,
} from 'react-native';
import React,{ Component, } from 'react';

import UserPhoto from '../components/userPhoto';
import RegisterPage from '../pages/registerPage';
import LoginFragment from '../components/loginFragment';

var Platform = require('react-native').Platform;
var ImagePicker = require('react-native-image-picker');

let {width,height}=Dimensions.get('window');

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

export default class Login extends Component{
	constructor(props){
		super(props);

		this.state={
			avatarSource:{},
			off:2
		};
	}
	componentWillMount(){
		//console.log(this.props);
		// ImagePicker.launchCamera(options, (response)  => {
        // console.log(response);
        //});
     }
	
	//私有方法
    goRegisterPage(){
	    // this.props.navigator.push({
		   //  component:RegisterPage
	    // });
	        
		ImagePicker.showImagePicker(options, (response) => {
				  //console.log(response);
				 let url;
				  if (response.didCancel) {
				      console.log('User cancelled image picker');
				  }
				  else if (response.error) {
				      console.log('ImagePicker Error: ', response.error);
				  }
				  else if (response.customButton) {
				      console.log('User tapped custom button: ', response.customButton);
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
		//把这里的根View 换成ScrollView应该可以在弹出键盘的时候上移
		return(
			
			<View style={styles.container}> 
				<View style={styles.userPhoto}>
				    <UserPhoto />
				</View>

				<View style={styles.loginwrap}>
					{/*<LoginFragment  {...this.props}/> */}

					{ this.state.off==1 ?
					 <Image source={this.state.avatarSource} style={styles.uploadAvatar} />
					 :null
					}
				</View>



				<View style={styles.bottom}>
					<TouchableOpacity onPress={this.goRegisterPage.bind(this)} underlayColor='#E1F6FF'>
		         		 <Text>还没注册？</Text>          
		        	</TouchableOpacity>
		        	<TouchableOpacity>
						<Text>忘记密码</Text>
					</TouchableOpacity>
				</View>
			</View>

		);
	}
}

let styles=StyleSheet.create({
	container:{
		flex:1,
		flexDirection:'column',
		marginTop:40,
		backgroundColor:'#ffffff'
	},
	userPhoto:{
		justifyContent:'flex-start',
		alignItems:'center',
		marginTop:20
	},
	loginwrap:{
		marginTop:60,
	},
	uploadAvatar:{
		width:100,
		height:100
	},
	bottom:{
		flex:1,
		flexDirection:'row',
		alignItems:'flex-end',
		justifyContent:'space-around',
		marginBottom:20
	}
});

