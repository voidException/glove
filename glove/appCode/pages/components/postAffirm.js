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
import fetchTool from '../../utils/fetchTool';
import {UrlConfirmReport} from '../../utils/url';
import Loading from '../../loading/loading';
import formDate from '../../utils/formDate';
import formTime from  '../../utils/formTime';
let ratio = PixelRatio.get();
let lineHeight = Platform.OS === 'ios' ? 14 : 16;
let statusBarHeight = Platform.OS === 'ios' ? 16 : 0;
let width=Dimensions.get('window').width;
let height=Dimensions.get('window').height;

export default class PostAffirm extends Component{
	constructor(props){
		super(props);
		this.state={
			visible:false,
			token:this.props.token,
			notSay:this.props.notsay, //1默认可以发表
			content:" ",
            relation:" ",
            tag:1,
            mobile:" ",
            tuiwenid:this.props.tweetid,
		}
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
				 Alert.alert(
	        		'发布成功',
	        		'感谢参与',
		            [
		                {
		                    text: '好的',
		                    onPress: () =>this.props.navigator.pop()
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
    getRelation(event){
    	this.setState({
			relation:event.nativeEvent.text
		});
    }
     getPhone(event){
    	this.setState({
			mobile:event.nativeEvent.text
		});
    }
     getAffirmDesp(event){
    	this.setState({
			content:event.nativeEvent.text
		});
    }
	render(){
		return(
			<View style={styles.container}>
			    <View  style={styles.header}>
					<Text style={{color:'white',fontSize:18}} onPress={this.cancel.bind(this)}>取消</Text>
					<Text style={{color:'#000',fontSize:18}}>证实</Text>
					<Text onPress={this.doCommit.bind(this)} style={{color:'#fff',fontSize:18,marginRight:6}}>提交</Text>
				</View>
				<View style={styles.commonInputWrapper}>
                    <Text style={styles.authoText}>关系:</Text>
                    <TextInput 
                        style={styles.authCode}	                        
                        placeholderTextColor={'#CCCCCC'}
                        underlineColorAndroid={'rgba(0,0,0,0)'}
                        keyboardType={'default'}
                        placeholder={'您与受助者的关系'}
                        onChange={this.getRelation.bind(this)}/>
	            </View>
	            <View style={styles.commonInputWrapper}>
                    <Text style={styles.authoText}>手机号:</Text>
                    <TextInput 
                        style={styles.authCode}	                        
                        placeholderTextColor={'#CCCCCC'}
                        underlineColorAndroid={'rgba(0,0,0,0)'}
                        keyboardType={'default'}
                        placeholder={'您的手机号'}
                        onChange={this.getPhone.bind(this)}/>
	            </View>
	            <View style={styles.commonStyle}>
                    <Text style={{fontSize:14,marginLeft:20}}>证实内容:</Text>
					<TextInput 
						style={styles.affirmStyle}
						placeholder={'描述下您知道的情况吧'}
						placeholderTextColor={'#CCCCCC'}
						multiline={true}
						maxLength={400}
						onChange={this.getAffirmDesp.bind(this)}/>
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
	commonStyle:{
		borderBottomWidth:1/ratio,
		borderBottomColor:'#CCCCCC',
		backgroundColor:'#FFFFFF',
		marginTop:10
	},
	affirmStyle:{
		height:120,
		width:width,
		paddingLeft:10,
		fontSize:14, 
		textAlign:'left',
        textAlignVertical:'top'		
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
});














































