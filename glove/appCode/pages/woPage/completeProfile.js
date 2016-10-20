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
	Slider
} from 'react-native';

import React,{ Component } from 'react';


let ratio = PixelRatio.get();
let lineHeight = Platform.OS === 'ios' ? 14 : 16;
let statusBarHeight = Platform.OS === 'ios' ? 16 : 0;
let width=Dimensions.get('window').width;
let height=Dimensions.get('window').height;

export default class CompleteProfile extends Component{
	constructor(props){
		super(props);
		this.state={
			imgs:[],
			switchTrue:true,
			switchFalse:false,
		 	trueSwitchIsOn: true,
            falseSwitchIsOn: false,
            pickerValue:'java'
		}
	}

   cancel(){
   	 this.props.navigator.pop();
   }

   switchFun(e){
   	 console.log(e);
   	 this.setState({
   	 	switchTrue:true,
   	 });
   }
   componentDidMount(){
   }
	render(){
	
		return(
			<View style={styles.container}>
		
			    <View  style={styles.header}>
					<Text style={{color:'#ffffff',fontSize:18,marginLeft:6}} onPress={this.cancel.bind(this)}>取消</Text>
					<Text style={{color:'#fff',fontSize:18,marginRight:6}}>提交</Text>
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
	                        placeholder={'1 男， 2 女'}/>
	                </View>
	                <View style={styles.commonInputWrapper}>
	                    <Text style={styles.authoText}>用户标签:</Text>
	                    <TextInput 
	                        style={styles.authCode}
	                        
	                        placeholderTextColor={'#CCCCCC'}
	                        underlineColorAndroid={'rgba(0,0,0,0)'}
	                        keyboardType={'default'}
	                        placeholder={'与大学对应的监督处'}/>
	                </View>
	                <Text style={{marginTop:2,marginLeft:17,fontSize:16}}>自我简介</Text>
	               <View style={styles.commonStyle}>
						<TextInput 
							style={styles.affirmStyle}
							placeholder={'200字以内'}
							placeholderTextColor={'#CCCCCC'}
							multiline={true}
							maxLength={200}/>
					</View>
			
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
        height: 40+statusBarHeight,
        paddingTop: statusBarHeight,
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
        paddingTop:1
    },
    

});














































