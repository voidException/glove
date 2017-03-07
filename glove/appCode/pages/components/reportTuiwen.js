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
	TextInput,Alert
} from 'react-native';
/*这个是举报项目有关的*/
import React,{ Component } from 'react';
import {UrlConfirmReport} from '../../utils/url';
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

export default class ReportTuiwen extends Component{
	constructor(props){
		super(props);
		this.state={
			visible:false,
			token:this.props.userProfile.items.backupfour,
			notSay:this.props.userProfile.items.notsay, //1默认可以发表
			content:" ",
            relation:" ",
            tag:1, //tag 为1 代表举报
            mobile:" ",
            tuiwenid:this.props.tweetid,
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
		formData.append("relation", this.state.relation);
		formData.append("tag",this.state.tag); 
		formData.append("mobile", this.state.mobile);
		formData.append("tuiwenid",this.state.tuiwenid); 
		let option={
			url:UrlConfirmReport,
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
					<Text style={{color:'#ffffff',fontSize:18}} onPress={this.cancel.bind(this)}>取消</Text>
					<Text style={{color:'#000',fontSize:18}}>举报</Text>
					<Text onPress={this.doCommit.bind(this)} style={{color:'#fff',fontSize:18}}>提交</Text>
				</View>
			
				<View>
					<TextInput 
						style={styles.affirmStyle}
						placeholder={'您举报的具体原因'}
						placeholderTextColor={'#CCCCCC'}
						multiline={true}
						maxLength={200}
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
        paddingLeft:5,
        paddingRight:5,
        width:width,    
        alignItems:'center',
        justifyContent:'space-between',
        backgroundColor:'#43AC43'
	},
	affirmStyle:{
		height:120,
		width:width,
		paddingLeft:5,
		textAlign:'left',
        textAlignVertical:'top'
	},

});














































