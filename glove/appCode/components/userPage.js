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
// let backBtnImg = require('../imgs/bar_btn_back_ico.png');
// let rightBtn=require('../imgs/right_btn.png');
let ratio = PixelRatio.get();
let lineHeight = Platform.OS === 'ios' ? 14 : 16;
let statusBarHeight = Platform.OS === 'ios' ? 20 : 0;
let width=Dimensions.get('window').width;
let height=Dimensions.get('window').height;
export default class UserPage extends Component{
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
                <View style={styles.topper}>
                    <View style={styles.headWrapper}>
                       <View style={styles.head}> 
                           <Image  source={require('../image/bar_btn_back_ico.png')} style={styles.headimg} />
                           <Text style={{color:'black'}}>返回</Text>
                       </View>
                       <View style={styles.nickName}>
                            <Text>樱桃小丸子</Text>
                       </View>
                       <View style={{width:42}}>
                       </View>
                    </View>

                    <View style={styles.userPhotoWrapper}>
                         <Image  source={require('../image/25.jpg')} style={styles.userPhoto} />
                    </View>
                     <View style={styles.renzheng}>
                        <Text style={{color:'green'}}>
                            认证:爱心社社长艾海涛.
                        </Text>
                    </View>
                    <View style={styles.helpInfo}>
                        <View style={styles.helpInfoLeft}>
                            <View style={styles.ihelp}>
                                <Text>他帮助</Text>
                            </View>
                            <View style={styles.helpInfoMoney}>
                                <Text style={{fontSize:14,fontWeight:'bold',color:'red'}}>500人</Text>
                                <Text style={{fontSize:14,fontWeight:'bold',color:'red'}}>400元</Text>
                            </View>
                        </View>
                        <View style={styles.helpInfoRight}>
                            <Text  style={{marginBottom:5}}>帮助他</Text>
                            <View  style={styles.helpInfoMoney}>
                                <Text style={{fontSize:14,fontWeight:'bold',color:'red'}}>500人</Text>
                                <Text style={{fontSize:14,fontWeight:'bold',color:'red'}}>400元</Text>
                            </View>
                        </View>
                    </View>
                   
                </View>
                <View style={styles.middle}>
                        <View style={styles.mainPage}>
                            <Text>主页</Text>
                        </View>
                        <View style={styles.more}>
                            <Text>更多</Text>
                        </View>
                </View>
                <View style={styles.commonStyle}>
                    <Text style={{color:'#B1B1B1'}}>粉丝:</Text>
                    <Text style={{marginLeft:20}}>100</Text>
                </View>
                <View style={styles.commonStyle}>
                    <Text style={{color:'#B1B1B1'}}>收听:</Text>
                    <Text style={{marginLeft:20}}>109</Text>
                </View>
                <View style={styles.commonStyle}>
                    <Text style={{color:'#B1B1B1'}}>推文:</Text>
                    <Text style={{marginLeft:20}}>1090</Text>
                </View>
                <View style={styles.commonStyle}>
                    <Text style={{color:'#B1B1B1'}}>参与的项目:</Text>
                    <Text style={{marginLeft:20}}>23</Text>
                </View>
                 <View style={styles.commonStyle}>
                    <Text style={{color:'#B1B1B1'}}>公司:</Text>
                    <Text style={{marginLeft:20}}>蜜蜂汇金科技有限公司</Text>
                </View>
                <View style={styles.commonStyle}>
                    <Text style={{color:'#B1B1B1'}}>学校:</Text>
                    <Text style={{marginLeft:20}}>北京大学</Text>
                </View>
                <View style={styles.commonStyle}>
                    <Text style={{color:'#B1B1B1'}}>邮箱:</Text>
                    <Text style={{marginLeft:20}}>noexception@126.com</Text>
                </View>
                <View style={styles.bottom}>
                    <Text>+关注</Text>
                </View>

            </View>
        );
    }
}

let styles=StyleSheet.create({
    container:{
        flex:1,
       backgroundColor:'#F5F5F5',
    },
    topper:{
        backgroundColor:'#EBFAEE',
        paddingBottom:10
    },
    headWrapper:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        //backgroundColor:'#69B94C'
    },
    head: {
        flexDirection:'row',
        height: 40+statusBarHeight,
        paddingTop: statusBarHeight,
        //width:width,    
        // borderBottomWidth:1/ratio,
        // borderBottomColor:'#F9F9F9',
        alignItems:'center',
        justifyContent:'flex-start',
        //backgroundColor:'#69B94C'
    },
    headimg:{
        height:14,
        width:14,
    },
    userPhotoWrapper:{
        flexDirection:'row',
        justifyContent:'center',

    },
    userPhoto:{
        width:70,
        height:70,
        borderRadius:35
    },
    nickName:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
         height: 40+statusBarHeight,
        paddingTop: statusBarHeight,
    },
     helpInfo:{
        flexDirection:'row',
        justifyContent:'center',
        marginTop:8,
        marginBottom:5
    },
    ihelp:{
        flexDirection:'row',
        justifyContent:'flex-end',
        marginBottom:5
    },
    helpInfoLeft:{
        flexDirection:'column',
        justifyContent:'flex-end',
        paddingRight:8,
        borderRightWidth:1/ratio,
        borderRightColor:'red'
    },
    helpInfoRight:{
        flexDirection:'column',
        justifyContent:'flex-start',
        marginLeft:8
    },
    helpInfoMoney:{
        flexDirection:'row'
    },
    renzheng:{
        flexDirection:'row',
        justifyContent:'center',
        marginLeft:5,
        marginRight:5
    },
    middle:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-around',
        height:40,
        backgroundColor:'#F5F5F5',
        paddingLeft:30,
        paddingRight:30
    },
    mainPage:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        marginRight:8,
        borderBottomWidth:1,
        borderBottomColor:'red',
        height:40
    },
    more:{
        marginLeft:8,
         justifyContent:'center',
        alignItems:'center',
         borderBottomWidth:1,
        borderBottomColor:'red',
        height:40
    },
    commonStyle:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'flex-start',
        height:40,
        backgroundColor:'#FFFFFF',
        paddingLeft:10,
        borderTopColor:'#ECECEC',
        borderTopWidth:1/ratio,
        marginTop:1/ratio
    },
    bottom:{
        flexDirection:'row',
        position:'absolute',
        left:0,
        bottom:0,
        paddingLeft:20,
        alignItems:'center',
        justifyContent:'flex-start',
        
        //borderTopWidth:1/ratio,
        backgroundColor:'#EBFAEE',
        height:40,
        width:width

    }

});












