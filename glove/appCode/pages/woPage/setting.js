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
import ResetPassword from './resetPassword';
import CompleteProfile from './completeProfile';
let ratio = PixelRatio.get();
let lineHeight = Platform.OS === 'ios' ? 14 : 16;
let statusBarHeight = Platform.OS === 'ios' ? 16 : 0;
let width=Dimensions.get('window').width;
let height=Dimensions.get('window').height;
export  default  class Setting extends Component{
	constructor(props){
		super(props);
	}

    goCompleteProfile(){
        this.props.navigator.push({
            component: CompleteProfile,
             params:{
                userProfile: this.props.userProfile
            }
        });
    }
     goResetPassword(){
        this.props.navigator.push({
            component: ResetPassword,
             params:{
                userProfile: this.props.userProfile
            }
        });
    }
    goBack(){
        this.props.navigator.pop();
    }
	render(){
		return(
			<View style={styles.container}> 
				<View style={styles.head}>          
                    <TouchableOpacity onPress={this.goBack.bind(this)} style={styles.returnButton}>
                        <Image source={require('./image/return2.png')} style={styles.backImg} resizeMode={'contain'} />
                    </TouchableOpacity>                            
                </View>
                <View style={styles.commonStyle}>
                	<Text onPress={this.goCompleteProfile.bind(this)}>完善资料</Text>
                	<Image source={require('./image/hui_discount_item_rule_arrow.png')} resizeMode={'cover'} style={styles.wrapperImage}/>
                </View>
                <View style={styles.commonStyle}>
                	<Text onPress={this.goResetPassword.bind(this)}>修改密码</Text> 
                	<Image source={require('./image/hui_discount_item_rule_arrow.png')} resizeMode={'cover'} style={styles.wrapperImage}/>
                              	
                </View>
                <View style={styles.commonStyle}>
                	<Text>设置密保</Text>
                	<Image source={require('./image/hui_discount_item_rule_arrow.png')} resizeMode={'cover'} style={styles.wrapperImage}/>
                </View>
            </View>
        );
	}
}


let styles=StyleSheet.create({
	container:{
		flex:1,
        backgroundColor:'#F9FFFC',
	},
	head: {
        flexDirection:'row',
        height: 50,
        width:width,    
        borderBottomWidth:1/ratio,
        borderBottomColor:'#F9F9F9',
        alignItems:'center',
        justifyContent:'space-between',
        backgroundColor:'#43AC43',
        paddingLeft:5,
        paddingRight:5
    },
    returnButton:{
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'center'
    },
    backImg:{
        height:24,
        width:24
    },
    commonStyle:{
    	flexDirection:'row',
    	justifyContent:'space-between',
    	alignItems:'center',
    	height:40,
    	backgroundColor:'#ffffff',
    	borderBottomWidth:1/ratio,
    	borderBottomColor:'#F4F4F4',
    	paddingLeft:10
    },
      wrapperImage:{
        width:15,
        height:15,
        marginRight:10
    },
 });