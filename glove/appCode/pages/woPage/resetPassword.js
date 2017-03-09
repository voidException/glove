/* 修改密码*/


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
	Picker,
	Switch,
	Slider,Alert
} from 'react-native';

import React,{ Component } from 'react';
import UploadFile from '../../utils/uploadFile';
import {Urlresetpass} from '../../utils/url';
import Loading from '../../loading/loading';
let ratio = PixelRatio.get();
let lineHeight = Platform.OS === 'ios' ? 14 : 16;
let statusBarHeight = Platform.OS === 'ios' ? 16 : 0;
let width=Dimensions.get('window').width;
let height=Dimensions.get('window').height;

export default class ResetPassword extends Component{
	constructor(props){
		super(props);
		this.state={
			visible:false,
			notSay:1, 
			token:this.props.userProfile.items.backupfour,
			originPass:'', 
            newPass:'', 
            againPass:''
		};
	}
   cancel(){
   	 this.props.navigator.pop();
   }
   doCommit(){
   	    let formData = new FormData();
   	    formData.append("token",this.state.token); 
		formData.append("notSay",this.state.notSay); 
		formData.append("originPass", this.state.originPass);
		formData.append("newPass",this.state.newPass);
		formData.append("againPass",this.state.againPass);		 
		let option={
			url:Urlresetpass,
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
			//console.log(resp);
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
    getOrginPass(event){
    	this.setState({
			originPass:event.nativeEvent.text
		});
    }
    getNewPass(event){
    	this.setState({
			newPass:event.nativeEvent.text
		});
    }
    getAgainPass(event){
    	this.setState({
			againPass:event.nativeEvent.text
		});
    }
	render(){
	
		return(
			<View style={styles.container}>
		
			    <View  style={styles.header}>
					<Text style={{color:'#ffffff',fontSize:18,marginLeft:6}} onPress={this.cancel.bind(this)}>取消</Text>
					<Text onPress={this.doCommit.bind(this)} style={{color:'#fff',fontSize:18,marginRight:6}}>提交</Text>
				</View>
		
					<View style={styles.headerDesp}>
					  		<Text style={{fontSize:16}}>密码为6-16位数字字母</Text>
					</View>
					<View style={styles.commonInputWrapper}>
	                    <Text style={styles.authoText}>原始密码:</Text>
	                    <TextInput 
	                        style={styles.authCode}	                         
	                        placeholderTextColor={'#CCCCCC'}
	                        underlineColorAndroid={'rgba(0,0,0,0)'}
	                        keyboardType={'default'}
	                        placeholder={''}
	                        onChange={this.getOrginPass.bind(this)}/>
	                </View>
	                <View style={styles.commonInputWrapper}>
	                    <Text style={styles.authoText}>新密码:</Text>
	                    <TextInput 
	                        style={styles.authCode}	                        
	                        placeholderTextColor={'#CCCCCC'}
	                        underlineColorAndroid={'rgba(0,0,0,0)'}
	                        keyboardType={'default'}
	                        placeholder={'输入新密码'}
	                        onChange={this.getNewPass.bind(this)}/>
	                </View>
	                <View style={styles.commonInputWrapper}>
	                    <Text style={styles.authoText}>再次输入新密码:</Text>
	                    <TextInput 
	                        style={styles.authCode}	                        
	                        placeholderTextColor={'#CCCCCC'}
	                        underlineColorAndroid={'rgba(0,0,0,0)'}
	                        keyboardType={'default'}
	                        placeholder={'再次输入新密码'}
	                        onChange={this.getAgainPass.bind(this)}/>
	                </View>
			<Loading  visible={this.state.visible}/>
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
	headerDesp:{
		flexDirection:'row',
		justifyContent:'center',
		alignItems:'center',
		paddingLeft:15,
		height:20
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
        textAlign:'left',
        textAlignVertical:'center'
    },
    

});














































