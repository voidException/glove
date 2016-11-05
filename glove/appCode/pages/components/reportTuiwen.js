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
/*这个是举报项目有关的*/
import React,{ Component } from 'react';
import {UrlreportTuiwen} from '../../utils/url';
import Loading from '../../loading/loading';
import formDate from '../../utils/formDate';
import formTime from  '../../utils/formTime';
import fetchTool from '../../utils/fetchTool';
let ratio = PixelRatio.get();
let lineHeight = Platform.OS === 'ios' ? 14 : 16;
let statusBarHeight = Platform.OS === 'ios' ? 16 : 0;
let width=Dimensions.get('window').width;
let height=Dimensions.get('window').height;

export default class ReportTuiwen extends Component{
	constructor(props){
		super(props);
		this.state={
			visible:false
		}
	}
   cancel(){
   	 this.props.navigator.pop();
   }
   doCommit(){

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
					<Text style={{color:'#ffffff',fontSize:16,marginLeft:6}} onPress={this.cancel.bind(this)}>取消</Text>
					<Text style={{color:'#000',fontSize:18,marginTop:-3}}>举报</Text>
					<Text style={{color:'#fff',fontSize:16,marginRight:6}}>提交</Text>
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














































