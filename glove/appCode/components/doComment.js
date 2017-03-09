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
import fetchTool from '../utils/fetchTool';
import {UrladdCommont} from '../utils/url';
import Loading from '../loading/loading';
import formDate from '../utils/formDate';
import formTime from  '../utils/formTime';
import UploadFile from '../utils/uploadFile';
let ratio = PixelRatio.get();
let lineHeight = Platform.OS === 'ios' ? 14 : 16;
let statusBarHeight = Platform.OS === 'ios' ? 16 : 0;
let width=Dimensions.get('window').width;
let height=Dimensions.get('window').height;

export default class DoComment extends Component{
	constructor(props){
		super(props);
		this.state={
			visible:false,
			token:this.props.userProfile.items.backupfour,
			notSay:this.props.userProfile.items.notsay, //1默认可以发表
			content:" ", //评论内容
            tuiwenid:this.props.tweetid,  //被评论的推文id  
            userphoto:this.props.userProfile.items.userphoto,
            usernickname:this.props.userProfile.items.usernickname        			
		}

		console.log(this.props.userProfile.items);
	}
	cancel(){
		this.props.navigator.pop();
	}
	verify(){

	}

	doCommit(){
   	    let formData = new FormData();
   	    formData.append("token",this.state.token); 
		formData.append("content", this.state.content);
		formData.append("notSay",this.state.notSay); 
		formData.append("tuiwenid",this.state.tuiwenid); 
		formData.append("userphoto",this.state.userphoto); 
		formData.append("usernickname",this.state.usernickname); 
		let option={
			url:UrladdCommont,
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
				this.props.navigator.pop();
			}else{
				 Alert.alert(
	        		'出问题了',
	        		'评论推文出错',
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
		});		
   }
	getContent(event){
    	this.setState({
			content:event.nativeEvent.text
		});
    }

	render(){
		return(
			<View style={styles.container}>
			    <View  style={styles.header}>
					<Text onPress={this.cancel.bind(this)} style={{color:'#ffffff',fontSize:18}}>取消</Text>
					<Text style={{color:'#000',fontSize:18,}}>评价</Text>
					<Text onPress={this.doCommit.bind(this)}  style={{color:'#ffffff',fontSize:18}}>发送</Text>
				</View>
				<View style={styles.commonStyle}>					
					<TextInput
						style={styles.affirmStyle}
						placeholder="说说您的评价..."
						multiline={true}
						maxLength={200}
					    placeholderTextColor='#DBDBDB'
					    onChange={this.getContent.bind(this)}/>
				</View>
				<Loading  visible={this.state.visible}/>
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
        height: 50,
        width:width,    
        alignItems:'center',
        justifyContent:'space-between',
        backgroundColor:'#43AC43',
        paddingLeft:5,
        paddingRight:5
	},
	commonStyle:{
		marginTop:0,
	},
	affirmStyle:{
		height:height-50,
		paddingLeft:3,		
		marginRight:0,
		marginLeft:0,
        textAlign:'left',
        textAlignVertical:'top'	
	},

});










