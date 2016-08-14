//该页面是5大页面的容器，

import{
	AppRegistry,
	StyleSheet,
	Text,
	Image,
	ScrollView,
	TouchableHighlight,
	TouchableOpacity,
	Dimensions,
	Navigator,
	RefreshControl,
	View,
	ListView,
	PixelRatio,
	Platform
} from 'react-native';
import React,{Component} from 'react';
let backBtnImg = require('../imgs/bar_btn_back_ico.png');
let rightBtn=require('../imgs/right_btn.png');
let ratio = PixelRatio.get();
let lineHeight = Platform.OS === 'ios' ? 14 : 16;
let statusBarHeight = Platform.OS === 'ios' ? 20 : 0;
let width=Dimensions.get('window').width;
let height=Dimensions.get('window').height;
export default class OtherWoPage extends Component{
	constructor(props){
		super(props);
		//console.log(props);
	}
	_back() {
        this.props.navigator.pop();
    }
	render(){
		return(
			<View style={styles.container}> 
				<View style={styles.head}>
                    <TouchableOpacity
                        style={styles.backBtn}
                        onPress={this._back.bind(this)}>
                        <Image source={backBtnImg} style={{height:18,width:12}}/>
                        <Text style={styles.backBtnText}>返回</Text>
                    </TouchableOpacity>                                   
                </View>
                <View style={styles.topWrapper}>
                	<View  style={styles.topleft}>
	                	<Image source={require('../../image/default.jpg')} style={{height:40,width:40}} />
	                	<View style={styles.topperMiddle}>
	                	    <Text>昵称ABC</Text>
	                		<Text>你是我的眼</Text>
	                	</View>
                	</View>
                	<Image source={rightBtn} style={{height:18,width:18}} />
                </View>
                <View style={{height:80}}>
                	<View style={styles.tuiwen}>
                		<Text>推文</Text>
                		<Text>关注</Text>
                		<Text>粉丝</Text>
                	</View>
                	<View style={styles.tuiwenValue}>
                		<Text>100</Text>
                		<Text>888</Text>
                		<Text>10011</Text>
                	</View>
                </View>
                <View style={styles.help}>
                	<Text>帮助</Text>
                	<Text>500人</Text>
                	<Text>共3000元</Text>
                </View>
                <View style={styles.behelp}>
                	<Text>接受帮助</Text>
                	<Text>500人</Text>
                	<Text>共7000元</Text>
                </View>
                <View style={styles.msg}>
                	<Text>私信问问</Text>
                </View>
                <View style={styles.follow}>
                	<Text>关注他</Text>
                </View>
                <View style={styles.bottomer}>
                	<Text>捐钱</Text>
                	<Text>举报</Text>
                </View>
			</View>
		);
	}
}

let styles=StyleSheet.create({
	container:{
		flex:1,
	},
	head: {
        flexDirection:'row',
        height: 40+statusBarHeight,
        paddingTop: statusBarHeight,
        backgroundColor: '#F9F9F9',
        width:width,
        justifyContent:'flex-start',
        paddingLeft:15,
        paddingRight:15

    },
    topWrapper:{
    	flexDirection:'row',
    	justifyContent:'space-between',
    	height:40
    },
    topleft:{
    	flexDirection:'row',
    	height:40
    },
    topperMiddle:{
    	height:40
    },
    backBtn: {
        flexDirection:'row',
        height: 40,      
    },
    backBtnText:{
        fontSize:15,
        color:'#1f92c5',
        marginLeft:5,
        height:40
    },
    tuiwen:{
    	height:40,
    	flexDirection:'row',
    	justifyContent:'space-around'
    },
    tuiwenValue:{
    	height:40,
    	flexDirection:'row',
    	justifyContent:'space-around'
    },
    help:{
    	height:20,
    	flexDirection:'row',
    	justifyContent:'space-around'
    },
    behelp:{
    	height:20,
    	flexDirection:'row',
    	justifyContent:'space-around'
    },
    msg:{
    	justifyContent:'center',
    	alignItems:'center'
    },
    follow:{
    	justifyContent:'center',
    	alignItems:'center'
    },
    bottomer:{
    	flexDirection:'row',
    	justifyContent:'space-around',
    	
    }

});












