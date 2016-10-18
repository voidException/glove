/*这个是常见问题，webview实现*/

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
export  default  class FAQ extends Component{
	constructor(props){
		super(props);
	}
	render(){
		return(
			<View style={styles.container}> 
				<View style={styles.head}>   
					<Text style={{fontSize:18,color:'#ffffff'}}>返回</Text>        
                    <Text style={{fontSize:18,color:'#ffffff'}}>设置</Text>                                  
                </View>
                <View style={styles.commonStyle}>
                	<Text>如何申请</Text>
                	<Image source={require('./image/hui_discount_item_rule_arrow.png')} resizeMode={'cover'} style={styles.wrapperImage}/>
                </View>
                <View style={styles.commonStyle}>
                	<Text>可否修改金额</Text> 
                	<Image source={require('./image/hui_discount_item_rule_arrow.png')} resizeMode={'cover'} style={styles.wrapperImage}/>
                              	
                </View>
                <View style={styles.commonStyle}>
                	<Text>申请条件是什么</Text>
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
        height: 40+statusBarHeight,
        paddingTop: statusBarHeight,
        width:width,    
        borderBottomWidth:1/ratio,
        borderBottomColor:'#F9F9F9',
        alignItems:'center',
        justifyContent:'space-between',
        backgroundColor:'#43AC43',
        paddingLeft:10,
        paddingRight:10
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