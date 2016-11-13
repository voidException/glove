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
        console.log(props);
    }
    _back() {
        this.props.navigator.pop();
    }
    render(){
        return(
            <View style={styles.container}> 
                <View style={styles.head}>
                     <Text style={{fontSize:18,color:'#ffffff'}}>我</Text>                                 
                </View>
                <View style={styles.topWrapper}>
                    <View  style={styles.topleft}>
                        <Image source={require('../../image/default.jpg')} style={styles.topleftImg} />
                        <View style={styles.topperMiddle}>
                            <Text style={styles.nickName}>昵称ABC</Text>
                            <Text>你是我的眼</Text>
                        </View>
                    </View>

                    <View style={styles.topRight}>
                        <Text>普通用户</Text>
                        <Image source={rightBtn} style={styles.setImage} />
                    </View>
                </View>
                <View style={styles.tuiwenWrapper}>
                    
                        <View style={styles.txtWrapper}>
                            <Text style={styles.tuiwenWrapperTxt}>100</Text>
                            <Text style={styles.txt}>推文</Text>                           
                        </View>
                        <View style={styles.txtWrapper}>
                            <Text style={styles.tuiwenWrapperTxt}>9000</Text>
                            <Text style={styles.txt}>关注</Text>
                        </View>
                        <View style={styles.txtWrapper}>
                            <Text style={styles.tuiwenWrapperTxt}>120</Text>
                            <Text style={styles.txt}>粉丝</Text>
                        </View>                 
                </View>

                <View style={styles.help}>
                    <Text>帮助人数</Text>
                    <Text>500（人）</Text>
                    <Text>3000（元）</Text>
                </View>
                <View style={styles.behelp}>
                    <Text>接受帮助</Text>
                    <Text>500（人）</Text>
                    <Text>7000（元）</Text>
                </View>
                <View style={styles.itemWrapper}>                  
                    <Image source={require('./image/personal_navibar_icon_message.png')} resizeMode={'cover'} style={styles.wrapperImage}/>
                    <Text style={styles.texts}>私信问问</Text>
                    <View style={{width:40}}></View>
                </View>
                <View style={styles.itemWrapperDonate}>                  
                    <Image source={require('./image/zhifubao_btn.png')} resizeMode={'cover'} style={styles.wrapperImage}/>
                    <Text style={styles.texts}>捐钱帮助他</Text>
                    <View style={{width:40}}></View>
                </View>
                <View style={styles.itemWrapper}>                  
                    <Image source={require('./image/nav_beauty.png')} resizeMode={'cover'} style={styles.wrapperImage}/>
                    <Text style={styles.texts}>关注</Text>
                    <View style={{width:40}}></View>
                </View>
                <View style={styles.itemWrapperDonate}>                  
                    <Image source={require('./image/nav_zhoubianyou.png')} resizeMode={'cover'} style={styles.wrapperImage}/>
                    <Text style={styles.texts}>举报</Text>
                    <View style={{width:40}}></View>
                </View>
            </View>
        );
    }
}

let styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#F9F9F9',
    },
    head: {
        flexDirection:'row',
        height: 40+statusBarHeight,
        paddingTop: statusBarHeight,
        width:width,    
        borderBottomWidth:1/ratio,
        borderBottomColor:'#F9F9F9',
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#69B94C'
    },
    topWrapper:{
        flexDirection:'row',
        justifyContent:'space-between',
        height:80,
        paddingRight:10,
        paddingLeft:10,
        paddingTop:4,
        borderBottomWidth:1/ratio,
        borderBottomColor:'#F9F9F9',
        backgroundColor:'#ffffff'
    },
    topleft:{
        flexDirection:'row',
        height:80
    },
    topleftImg:{
        height:80,
        width:80,
    },
    topRight:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center'
    },
    topperMiddle:{
        height:80,
        justifyContent:'space-around',
        marginLeft:15
    },
    nickName:{
        fontSize:16,
        fontWeight: 'bold',
        color:'red'
    },
    setImage:{
        height:18,
        width:18,
        alignSelf:'center',
        marginLeft:10
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
    tuiwenWrapper:{
        flexDirection:'row',
        height:60,
        marginTop:5,
        borderBottomWidth:1/ratio,
        borderBottomColor:'#F9F9F9',
        backgroundColor:'#ffffff',
        justifyContent:'space-around',
        alignItems:'center'

    },
    tuiwenWrapperTxt:{
        fontWeight:'bold',
        fontSize:16
    },
    txt:{
        color:'#9D9D9D'
    },
    txtWrapper:{
        alignItems:'center',
        justifyContent:'center'
    },
    tuiwen:{
        height:30,
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'flex-end'
    },
   
    help:{
        height:45,
        marginTop:20,
        borderTopWidth:1/ratio,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        backgroundColor:'#ffffff'
       
    },
    behelp:{
        height:45,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        //marginTop:10,
        //marginRight:7,
        borderBottomWidth:1/ratio,
        //borderBottomColor:'#F9F9F9',
        borderTopWidth:1/ratio,
        //borderTopColor:'#F9F9F9',
        backgroundColor:'#ffffff'
    },
    
    itemWrapper:{
        borderTopWidth:1/ratio,
        borderTopColor:'#9D9D9D',
        //borderBottomWidth:1/ratio,
        //borderBottomColor:'#9D9D9D',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        backgroundColor:'#ffffff',
        marginTop:20,
        height:45
    },
    itemWrapperDonate:{
        borderTopWidth:1/ratio,
        borderTopColor:'#9D9D9D',
        //borderBottomWidth:1/ratio,
        //borderBottomColor:'#9D9D9D',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        backgroundColor:'#ffffff',
        height:45
    },
    wrapperImage:{
        width:30,
        height:30,
        marginLeft:5
    },
    texts: {      
        fontSize: 16,     
        alignSelf:'center',
        fontWeight:'bold'
      }
});












