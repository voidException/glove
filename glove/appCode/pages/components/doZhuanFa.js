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
import {UrldoZhuanfa} from '../../utils/url';
import Loading from '../../loading/loading';
import formDate from '../../utils/formDate';
import formTime from  '../../utils/formTime';
import fetchTool from '../../utils/fetchTool';
import UploadFile from '../../utils/uploadFile';
let ratio = PixelRatio.get();
let lineHeight = Platform.OS === 'ios' ? 14 : 16;
let statusBarHeight = Platform.OS === 'ios' ? 16 : 0;
let width=Dimensions.get('window').width;
let height=Dimensions.get('window').height;

export default class DoZhuanFa extends Component{
	constructor(props){
		super(props);
		this.state={
			visible:false,
			token:this.props.userProfile.items.backupfour,
			notSay:this.props.userProfile.items.notsay,
			content:'', //转发时输入的内容
			userUUIDTweet:this.props.userProfile.items.backupten || "", //用户的uuid
			userNickname:this.props.userProfile.items.usernickname || "",
			userphoto:this.props.userProfile.items.userphoto || "",
			cityName:this.props.userProfile.items.backuptwo || "",
			selfintroduce:this.props.userProfile.items.selfintroduce||"",				
            sourceMsgID:this.props.tweetid, //被转发的推文的id
		}
	}

	cancel(){
		this.props.navigator.pop();
	}
	doCommit(){
   	    let formData = new FormData();
   	    formData.append("token",this.state.token); 
		formData.append("content", this.state.content);
		formData.append("notSay",this.state.notSay); 
		formData.append("sourceMsgID",this.state.sourceMsgID); 

	    formData.append("userUUIDTweet",this.state.userUUIDTweet);
	    formData.append("userNickname",this.state.userNickname);
	    formData.append("userphoto",this.state.userphoto);
	    formData.append("cityName",this.state.cityName);
	    formData.append("selfintroduce",this.state.selfintroduce);

		let option={
			url:UrldoZhuanfa,
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
	        		resp.msg,
		            [
		                {
		                    text: '好的',
		                    onPress:() =>this.props.navigator.pop()
		                }
		            ]
	   			 );
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
					<Text  style={{color:'#ffffff',fontSize:17}} onPress={this.cancel.bind(this)}> 取消 </Text>
					<Text style={{color:'#000',fontSize:17}}>转发</Text>
					<Text onPress={this.doCommit.bind(this)}  style={{color:'#ffffff',fontSize:17}}>发送</Text>
				</View>
				<View style={styles.commonStyle}>					
					<TextInput
						style={styles.affirmStyle}
						placeholder="要不要顺便说点什么..."
						multiline={true}
						maxLength={500}
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
		flexDirection: 'row',
		justifyContent:'flex-start',
		alignItems:'flex-start',
		padding:10,
		textAlign:'left',
		textAlignVertical :'top'
	},
	img:{
		height:20,
		width:20,
		marginRight:2
	},
	post:{
		flexDirection:'row',
		justifyContent:'flex-start',
		alignItems:'center',
		marginTop:4,
		marginLeft:0,
		marginRight:0,
		height:20
	}
});










