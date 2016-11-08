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
			token:"e10adc3949ba59abbe56e057f20f883e1",
			notSay:1, //1默认可以发表
			content:" ",
            relation:" ",
            tag:1,
            mobile:" ",
            tuiwenid:1,
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


 //   doCommit2(){
 //        let confirm={
	// 		token:this.state.token,
	// 		notSay:this.state.notSay,
	// 		content:this.state.content,
	// 		relation:this.state.relation,
	// 		tag:this.state.tag,
	// 		mobile:this.state.mobile,
	// 		tuiwenid:this.state.tuiwenid
	// 	};
		
	// 	let options={
 //            url:UrlConfirmReport,
 //            body: JSON.stringify(confirm)
 //        };
 //        this.setState({
 //        	visible:true
 //        });
 //        let  response=fetchTool(options);
 //        response.then(resp=>{
 //        	  //停止转圈圈
 //        	  this.setState({
 //        	  	visible:false
 //        	  });
 //             if (resp.retcode===2000) {
 //              	  this.goBack();
 //              }else{
 //              	    Alert.alert(
 //                        '出错了',
 //                        resp.msg,
 //                        [
 //                            { text:'好的',onPress:() =>console.log('举报出错了')}

 //                        ]
 //                    );
 //              }
 //        }).catch(err=>{
 //        	//停止转圈圈
 //        	this.setState({
 //        		visible:false
 //        	});

 //        });
	// }

   getContent(event){
    	this.setState({
			content:event.nativeEvent.text
		});
    }
	render(){
		return(
			<View style={styles.container}>
		
			    <View  style={styles.header}>
					<Text style={{color:'#ffffff',fontSize:16,marginLeft:6}} onPress={this.cancel.bind(this)}>取消</Text>
					<Text style={{color:'#000',fontSize:18,marginTop:-3}}>举报</Text>
					<Text onPress={this.doCommit.bind(this)} style={{color:'#fff',fontSize:16,marginRight:6}}>提交</Text>
				</View>
			
				<View style={styles.commonStyle}>
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
        height: 40+statusBarHeight,
        paddingTop: statusBarHeight,
        paddingLeft:4,
        width:width,    
        alignItems:'center',
        justifyContent:'space-between',
        backgroundColor:'#43AC43'
	},
	affirmStyle:{
		height:120,
		width:width,
		paddingLeft:10
		
	},

});














































