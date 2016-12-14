/*这个是帮助我们的页面*/
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
    WebView,
} from 'react-native';
/*这个是加V认证的*/
import React,{ Component } from 'react';
import {UrlHelpApp} from '../../utils/url';
let ratio = PixelRatio.get();
let lineHeight = Platform.OS === 'ios' ? 14 : 16;
let statusBarHeight = Platform.OS === 'ios' ? 16 : 0;
let width=Dimensions.get('window').width;
let height=Dimensions.get('window').height;
export  default  class DonateMe extends Component{
	constructor(props){
		super(props);
	}

     goBack(){
        this.props.navigator.pop();
    }
	render(){
		return(
			<View style={styles.container}> 
				<View style={styles.head}>   
					<Text onPress={this.goBack.bind(this)}  style={{fontSize:20,color:'#ffffff'}}>返回</Text>                                         
                </View>
                 <WebView source={{uri: UrlHelpApp}}/>              
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
 });