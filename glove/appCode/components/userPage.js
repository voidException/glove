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
import WeiBoPageWrapper from '../pages/tuiwenPage/weiboPage';
import {UrldoWatch,UrlcancelWatch,UrlByAtgetUserProfile} from '../utils/url';
import fetchTool from '../utils/fetchTool';
import UploadFile from '../utils/uploadFile';
let ratio = PixelRatio.get();
let lineHeight = Platform.OS === 'ios' ? 14 : 16;
let statusBarHeight = Platform.OS === 'ios' ? 20 : 0;
let width=Dimensions.get('window').width;
let height=Dimensions.get('window').height;
export default class UserPage extends Component{
    constructor(props){
        super(props);
        //console.log(this.props.data);
        if (!!this.props.data) {
            this.state={
                token:"e10adc3949ba59abbe56e057f20f883e1",
                notSay:1, //1默认可以发表
                mainOrmore:2, 
                usertype:this.props.data.usertype ||1,
                usertag:this.props.data.usertag ||1,
                userphoto:this.props.data.userphoto,
                usernickname:this.props.data.usernickname ||'无名氏',
                userid:this.props.data.userid||0,
                userhelpsman:this.props.data.userhelpsman ||0,
                userdonate:this.props.data.userdonate ||0,
                acceptmoney:this.props.data.acceptmoney ||0, //用户接受到的捐钱总数
                amountaccept:this.props.data.amountaccept ||0, //帮助用户人的数量
                useremail:this.props.data.useremail||null,
                university:this.props.data.university ||null,
                sex:this.props.data.sex ||0,
                selfintroduce:this.props.data.selfintroduce ||'暂无简介',
                registerdate:this.props.data.registerdate ||null,
                photoupload:this.props.data.photoupload,
                msgpubcount:this.props.data.msgpubcount ||0,
                followcount:this.props.data.followcount ||0,
                fanscount:this.props.data.fanscount ||0,
                country:this.props.data.country ||'无',
                company:this.props.data.company ||'中国',
                address:this.props.data.address ||null,
                certificatetype:this.props.data.certificatetype ||0,
                behelptime:this.props.data.behelptime ||null,
                backupone:this.props.data.backupone ||null,
                backupthree:this.props.data.backupthree ||null,
                watchornot:2,//是否关注,1 未关注，2已关注
                userIDFollow:1,
                userIDBeFocus:2
            }
        }else{
            this.state={
                token:"e10adc3949ba59abbe56e057f20f883e1",
                notSay:1, //1默认可以发表
                mainOrmore:2, 
                usertype:1,
                usertag:1,
                userphoto:null,
                usernickname:'无名氏',
                userid:0,
                userhelpsman:0,
                userdonate:0,
                acceptmoney:0, //用户接受到的捐钱总数
                amountaccept:0, //帮助用户人的数量
                useremail:null,
                university:null,
                sex:0,
                selfintroduce:'暂无简介',
                registerdate:null,
                photoupload:1,
                msgpubcount:0,
                followcount:0,
                fanscount:0,
                country:'无',
                company:'中国',
                address:null,
                certificatetype:0,
                behelptime:null,
                backupone:null,
                backupthree:null,
                watchornot:2 ,//是否关注,1 未关注，2已关注
                userIDFollow:1,
                userIDBeFocus:2
            };
       }//if
    }//constructor
    componentDidMount(){
        //console.log(this.props);
        let formData = new FormData();
        formData.append("nickname",this.props.nickname); 
        let option={
            url:UrlByAtgetUserProfile,
            body:formData
        };
        let response=UploadFile(option);
        response.then(resp=>{
            if (resp.retcode===2000) {
                console.log(resp);
                this.setState({
                    mainOrmore:2, 
                    usertype:resp.data.usertype,
                    usertag:resp.data.usertag,
                    userphoto:resp.data.userPhoto,
                    usernickname:resp.data.usernickname,
                    userid:resp.data.userid,
                    userhelpsman:resp.data.userhelpsman,
                    userdonate:resp.data.userdonate,
                    acceptmoney:resp.data.acceptmoney, //用户接受到的捐钱总数
                    amountaccept:resp.data.amountaccept, //帮助用户人的数量
                    useremail:resp.data.useremail,
                    university:resp.data.university,
                    sex:resp.data.sex,
                    selfintroduce:resp.data.selfintroduce,
                    registerdate:resp.data.registerdate,
                    photoupload:resp.data.photoupload,
                    msgpubcount:resp.data.msgpubcount ||0,
                    followcount:resp.data.followcount,
                    fanscount:resp.data.fanscount||0,
                    country:resp.data.country,
                    company:resp.data.company,
                    address:resp.data.address,
                    certificatetype:resp.data.certificatetype,
                    behelptime:resp.data.behelptime,
                    backupone:resp.data.backupone,
                    backupthree:resp.data.backupthree,
                    watchornot:resp.data.watchornot,//是否关注,1 未关注，2已关注
                    userIDFollow:resp.data.userIDFollow,
                    userIDBeFocus:resp.data.userIDBeFocus
                });
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
            
        }); 
    }
    _back() {
        this.props.navigator.pop();
    }
    _more(){
        this.setState({
            mainOrmore:1
        })
    }
    _main(){
         this.setState({
            mainOrmore:2
        })
    }
    doWatch(){
        let watchData={
            token:this.state.token,
            userIDFollow:this.state.userIDFollow,
            userIDBeFocus:this.state.userIDBeFocus
        };
        //console.log(userAccount);
        //发起网络请求
        let options={
            url:UrldoWatch,
            body: JSON.stringify(watchData)
        };
        //显示转圈圈
        // this.setState({
        //     visible:true
        // });
        let  response=fetchTool(options);
        response.then(resp=>{
              //停止转圈圈
              this.setState({
                visible:false
              });
              //console.log(resp)
             if (resp.retcode===2000) {
                  
              }else{
                    Alert.alert(
                        '出错了',
                        resp.msg,
                        [
                            { text:'好的',onPress:() =>console.log('关注出错了')}

                        ]
                    );
              }
        }).catch(err=>{
            //停止转圈圈
            this.setState({
                visible:false
            });

        });
    }
    cancelWatch(){
        let cancelWatchData={
            token:this.state.token,
            beCancel:2
        };
        //console.log(userAccount);
        //发起网络请求
        let options={
            url:UrlcancelWatch,
            body: JSON.stringify(cancelWatchData)
        };
        //显示转圈圈
        // this.setState({
        //     visible:true
        // });
        let  response=fetchTool(options);
        response.then(resp=>{
              //停止转圈圈
              this.setState({
                visible:false
              });
              console.log(resp)
             if (resp.retcode===2000) {
                  
              }else{
                    Alert.alert(
                        '出错了',
                        resp.msg,
                        [
                            { text:'好的',onPress:() =>console.log('关注出错了')}

                        ]
                    );
              }
        }).catch(err=>{
            //停止转圈圈
            this.setState({
                visible:false
            });

        });
    }
    goWeiBoList(){
        
        this.props.navigator.push({
            component:WeiBoPageWrapper,
            params:{
                token:this.props.token ||"e10adc3949ba59abbe56e057f20f883e1" ,
            }
        });
    }
    render(){
        return(
            <View style={styles.container}> 
                <View style={styles.topper}>
                    <View style={styles.headWrapper}>
                       <View style={styles.head}> 
                           <Image  source={require('../image/bar_btn_back_ico.png')} style={styles.headimg} />
                           <Text onPress={this._back.bind(this)} style={{color:'black'}}>返回</Text>
                       </View>
                       <View style={styles.nickName}>
                            <Text>{this.state.usernickname}</Text>
                       </View>
                       <View style={{width:42}}>
                       </View>
                    </View>

                    <View style={styles.userPhotoWrapper}>
                         <Image  source={{uri:this.state.userphoto}} style={styles.userPhoto} />
                    </View>
                     <View style={styles.renzheng}>
                        <Text style={{color:'green'}}>
                            认证:{this.state.backupthree}。
                        </Text>
                    </View>
                    <View style={styles.helpInfo}>
                        <View style={styles.helpInfoLeft}>
                            <View style={styles.ihelp}>
                                <Text>他帮助</Text>
                            </View>
                            <View style={styles.helpInfoMoney}>
                                <Text style={{fontSize:14,fontWeight:'bold',color:'red'}}>{this.state.userhelpsman}人</Text>
                                <Text style={{fontSize:14,fontWeight:'bold',color:'red'}}>{this.state.userdonate}元</Text>
                            </View>
                        </View>
                        <View style={styles.helpInfoRight}>
                            <Text  style={{marginBottom:5}}>帮助他</Text>
                            <View  style={styles.helpInfoMoney}>
                                <Text style={{fontSize:14,fontWeight:'bold',color:'red'}}>{this.state.amountaccept}人</Text>
                                <Text style={{fontSize:14,fontWeight:'bold',color:'red'}}>{this.state.acceptmoney}元</Text>
                            </View>
                        </View>
                    </View>
                   
                </View>
                <View style={styles.middle}>
                        <View style={styles.mainPage}>
                            <Text onPress={this._main.bind(this)} style={{fontSize:16}}>主页</Text>
                        </View>
                        <View style={styles.more}>
                            <Text onPress={this._more.bind(this)} style={{fontSize:16}}>更多</Text>
                        </View>
                </View>
                {this.state.mainOrmore===2 ?
                <ScrollView>
                    <View style={styles.commonStyle}>
                        <Text style={{color:'#B1B1B1'}}>粉丝:</Text>
                        <Text style={{marginLeft:20}}>{this.state.fanscount}</Text>
                    </View>
                    <View style={styles.commonStyle}>
                        <Text style={{color:'#B1B1B1'}}>收听:</Text>
                        <Text style={{marginLeft:20}}>{this.state.followcount}</Text>
                    </View>
                    <View style={styles.commonStyle}>
                        <Text onPress={this.goWeiBoList.bind(this)}  style={{color:'#B1B1B1'}}>推文:</Text>
                        <Text style={{marginLeft:20}}>{this.state.msgpubcount}</Text>
                    </View>
                    <View style={styles.commonStyle}>
                        <Text style={{color:'#B1B1B1'}}>参与的项目:</Text>
                        <Text style={{marginLeft:20}}>23</Text>
                    </View>
                     <View style={styles.commonStyle}>
                        <Text style={{color:'#B1B1B1'}}>是否处于救助状态:</Text>
                        <Text style={{marginLeft:20}}>否</Text>
                    </View>
                    <View style={styles.commonStyle}>
                        <Text style={{color:'#B1B1B1'}}>简介:</Text>
                        <Text style={{marginLeft:20}}>{this.state.selfintroduce}</Text>
                    </View>
                    <View style={styles.commonStyle}>
                        <Text style={{color:'#B1B1B1'}}>邮箱:</Text>
                        <Text style={{marginLeft:20}}>{this.state.useremail}</Text>
                    </View>
                </ScrollView>
                   :
                <ScrollView>
                 <View style={styles.commonStyle}>
                        <Text style={{color:'#B1B1B1'}}>公司:</Text>
                        <Text style={{marginLeft:20}}>{this.state.company}</Text>
                    </View>
                     <View style={styles.commonStyle}>
                        <Text style={{color:'#B1B1B1'}}>地区:</Text>
                        <Text style={{marginLeft:20}}>{this.state.address}</Text>
                    </View>
                     <View style={styles.commonStyle}>
                        <Text style={{color:'#B1B1B1'}}>大学:</Text>
                        <Text style={{marginLeft:20}}>{this.state.university}</Text>
                    </View>
                     <View style={styles.commonStyle}>
                        <Text style={{color:'#B1B1B1'}}>性别:</Text>
                        <Text style={{marginLeft:20}}>男</Text>
                    </View>
                     <View style={styles.commonStyle}>
                        <Text style={{color:'#B1B1B1'}}>用户标签:</Text>
                        <Text style={{marginLeft:20}}>{this.state.usertag}</Text>
                    </View>
                </ScrollView>
                }
                <View style={styles.bottom}>
                    {this.state.watchornot===1 ?
                         <Text onPress={this.doWatch.bind(this)}>+关注</Text>
                         :
                         <Text onPress={this.cancelWatch.bind(this)}>√已关注</Text>
                    }
                   
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












