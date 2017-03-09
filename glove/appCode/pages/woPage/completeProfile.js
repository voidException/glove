/*完善资料*/
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
	Slider,
	Alert
} from 'react-native';

import React,{ Component } from 'react';
import UploadFile from '../../utils/uploadFile';
import {UrlcompleteProfile} from '../../utils/url';
import Loading from '../../loading/loading';
let ratio = PixelRatio.get();
let lineHeight = Platform.OS === 'ios' ? 14 : 16;
let statusBarHeight = Platform.OS === 'ios' ? 16 : 0;
let width=Dimensions.get('window').width;
let height=Dimensions.get('window').height;

export default class CompleteProfile extends Component{
	constructor(props){
		super(props);
		this.state={
		    visible:false,
			notSay:1, 
			token:this.props.userProfile.items.backupfour,
			content:'', 
            sex:1, 
            label:''
		};
	}

   cancel(){
   	    this.props.navigator.pop();
   }
   doCommit(){
   	    let formData = new FormData();
   	    formData.append("token",this.state.token); 
		formData.append("content", this.state.content);
		formData.append("notSay",this.state.notSay); 
		formData.append("label",this.state.label);
		formData.append("sex",this.state.sex);
		 
		let option={
			url:UrlcompleteProfile,
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
    getSex(event){
    	this.setState({
			sex:event.nativeEvent.text
		});
    }
    getLabel(event){
    	this.setState({
			label:event.nativeEvent.text
		});
    }

   componentDidMount(){ }
	render(){	
		return(
			<View style={styles.container}>
		
			    <View  style={styles.header}>
					<Text style={{color:'#ffffff',fontSize:18,marginLeft:6}} onPress={this.cancel.bind(this)}>取消</Text>
					<Text onPress={this.doCommit.bind(this)} style={{color:'#fff',fontSize:18,marginRight:6}}>提交</Text>
				</View>		
					<View style={styles.headerDesp}>
					  	<Text style={{fontSize:16}}>基本信息</Text>
					</View>
					<View style={styles.commonInputWrapper}>
	                    <Text style={styles.authoText}>性别:</Text>
	                    <TextInput 
	                        style={styles.authCode}	                         
	                        placeholderTextColor={'#CCCCCC'}
	                        underlineColorAndroid={'rgba(0,0,0,0)'}
	                        keyboardType={'default'}
	                        placeholder={'1 男， 2 女'}
	                        onChange={this.getSex.bind(this)}/>
	                </View>
	                <View style={styles.commonInputWrapper}>
	                    <Text style={styles.authoText}>用户标签:</Text>
	                    <TextInput 
	                        style={styles.authCode}	                        
	                        placeholderTextColor={'#CCCCCC'}
	                        underlineColorAndroid={'rgba(0,0,0,0)'}
	                        keyboardType={'default'}
	                        placeholder={'如电影、学习'}
	                        onChange={this.getLabel.bind(this)}/>
	                </View>
	                <View style={{alignItems:'flex-start',justifyContent:'center',height:20}}>
	                	<Text style={{marginTop:2,marginLeft:17,fontSize:16}}>自我简介</Text>
	                </View>
	                <View style={styles.commonStyle}>
						<TextInput 
							style={styles.affirmStyle}
							placeholder={'简单介绍下自己吧,200字以内'}
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
		justifyContent:'flex-start',
		alignItems:'center',
		height:20,
		paddingLeft:15
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














































