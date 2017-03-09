//此页面为进入对方的主页面
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
    Platform,
    Alert
} from 'react-native';
import React,{Component} from 'react';
import WeiBoPageWrapper from '../pages/tuiwenPage/weiboPage';
import {UrldoWatch,UrlcancelWatch,UrlByAtgetUserProfile,UrlqueryWatchif} from '../utils/url';
import WatchListPage from '../pages/faxianPage/watchListPage';
import HelpListPage from '../pages/faxianPage/helpListPage';
import fetchTool from '../utils/fetchTool';
import UploadFile from '../utils/uploadFile';
import { connect } from 'react-redux';
let ratio = PixelRatio.get();
let lineHeight = Platform.OS === 'ios' ? 14 : 16;
let statusBarHeight = Platform.OS === 'ios' ? 20 : 0;
let width=Dimensions.get('window').width;
let height=Dimensions.get('window').height;
class UserPageP extends Component{
    constructor(props){
        super(props);
        if (this.props.diffTag===88) { //88表明传过来的就是userProfile
            //将如下值传递给weiboListPage等
            this.userProfile=this.props.userProfile; 
            //console.log(this.userProfile)
            this.state={
                userid:this.props.userProfile.userid||null, //在这里面不能用token
                notSay:1, //1默认可以发表
                mainOrmore:2, 
                usertype:this.props.userProfile.usertype ||1,
                usertag:this.props.userProfile.usertag ||1,
                userphoto:this.props.userProfile.userphoto,
                usernickname:this.props.userProfile.usernickname ||'无名氏',                
                userhelpsman:this.props.userProfile.userhelpsman ||0,
                userdonate:this.props.userProfile.userdonate ||0,
                acceptmoney:this.props.userProfile.acceptmoney ||0, //用户接受到的捐钱总数
                amountaccept:this.props.userProfile.amountaccept ||0, //帮助用户人的数量
                useremail:this.props.userProfile.useremail||null,
                university:this.props.userProfile.university ||null,
                sex:this.props.userProfile.sex ||0,
                selfintroduce:this.props.userProfile.selfintroduce ||'暂无简介',
                registerdate:this.props.userProfile.registerdate ||null,
                photoupload:this.props.userProfile.photoupload||1,
                msgpubcount:this.props.userProfile.msgpubcount ||0,
                followcount:this.props.userProfile.followcount ||0,
                fanscount:this.props.userProfile.fanscount ||0,
                country:this.props.userProfile.country ||'中国',
                company:this.props.userProfile.company ||null,
                address:this.props.userProfile.address ||null,
                behelptime:this.props.userProfile.behelptime ||null,
                backupone:this.props.userProfile.backupone ||null,
                backupeight:this.props.userProfile.backupeight||'用户还没认证',
                watchornot:0,//是否关注,0 未关注，1单方面已关注，2双向关注
                paytag: 1    //1主动关注，2系统迫使用户关注
            }
        }else{
            this.state={
                userid:null, //这里面必须用userid，因为token是会被隐藏的
                notSay:1, //1默认可以发表
                mainOrmore:2, 
                usertype:1,
                usertag:1,
                userphoto:null,
                usernickname:'无名氏',
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
                watchornot:0 ,//是否关注,0 未关注，1单方面已关注，2双向关注
                paytag: 1    //1主动关注，2系统迫使用户关注
            };
       }//if
    }//constructor
    componentWillMount(){
        //如果用户基本资料是直接传输过来的，就在这里查询是否关注
        if (this.props.diffTag!==88) {
            return 0;
        }
        //查询参数
        let querywatchIfParam={
            taUserid:this.state.userid, //用户的id
            myUserid:this.props.myProfile.items.userid  //这个是登录用户的id，得从Redux中获取
        } 
        let options={
            url:UrlqueryWatchif,
            body: JSON.stringify(querywatchIfParam)
        }
        //查询是否已经关注

        setTimeout(()=>{ 
            let response=fetchTool(options); //
            response.then(resp=>{
                //console.log(resp)         
                if (resp.retcode===2000) {
                   //改变状态
                   this.setState({
                        watchornot:resp.doublefans,
                        paytag:resp.paytag
                    });
                }
            }).catch(err=>{
                //不做提示，      
            });
        },1000) 
    }
    componentDidMount(){
        //如果数据只传递过来nickname,那么需要网络获取user信息
        //延时查询
        if (this.props.diffTag===88) { 
            return 0;
        }          

        setTimeout(()=>{ 
            const foo=async()=>{
            let formData = new FormData();
            formData.append("nickname",this.props.userNickName); 
            let option={
                url:UrlByAtgetUserProfile,
                body:formData
            };

            await UploadFile(option)
                .then(resp=>{
                    if (resp.retcode===2000) {
                        this.userProfile=resp.data; //为了统一
                        this.setState({
                            userid:resp.data.userid,
                            mainOrmore:2, 
                            usertype:resp.data.usertype,
                            usertag:resp.data.usertag,
                            userphoto:resp.data.userphoto,
                            usernickname:resp.data.usernickname,
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
                            behelptime:resp.data.behelptime,
                            backupone:resp.data.backupone,
                        }); 
                        return 0              
                    }else{
                        return Alert.alert(
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
                    console.log('userPage页面请求userProfile失败');   
                    console.log(err);
                    return 0  
                }); 
                 //接下来查询是不是关注他了，这要依赖上面的await返回的值          
                let querywatchIfParam={
                    taUserid:this.state.userid, //用户的id,上面请求设置
                    myUserid:this.props.myProfile.items.userid   //这个是登录用户的id，得从Redux中获取
                } 
                let options={
                    url:UrlqueryWatchif,
                    body: JSON.stringify(querywatchIfParam)
                }
                //查询是否已经关注
            await fetchTool(options)
                .then(resp=>{        
                    if (resp.retcode===2000) {
                       //改变状态
                       this.setState({
                            watchornot:resp.doublefans,
                            paytag:resp.paytag
                        });
                       return 0  
                    }
                }).catch(err=>{
                    //不做提示，
                    return 0             
                }); //fetchTool
            }//foo 

            foo().then(resp=>{
               
            })
            .catch(err=>{

            });   
        },1000);  
    } //componentDidMount

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

    //我关注的人，关注我的人
    goWatchList(userType){        
        this.props.navigator.push({
            component: WatchListPage,
            params:{
                userType:userType,
                userid:this.userProfile.userid
            }
        });
    }
    //我帮助的人，帮助我的人
    goHelpListPage(userType){  
      
        this.props.navigator.push({
            component: HelpListPage,
            params:{
                userType:userType,
                userid:this.userProfile.userid
            }
        });
    }
    doWatch(){
        
        let watchuserProfile={
            token:this.props.myProfile.items.backupfour,
            userIDBeFocus:this.state.userid,
            paytag:1
        };
        let options={
            url:UrldoWatch,
            body: JSON.stringify(watchuserProfile)
        };
        let  response=fetchTool(options);
        response.then(resp=>{
            //停止转圈圈
            this.setState({
                visible:false
            });
            if (resp.retcode===2000) {
                //设置状态              
                this.setState({
                    watchornot:1
                });
                    
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
        //根据 this.state.paytag 决定能否取消关注
        if (this.state.paytag==2) {
            return
        };

        let cancelWatchuserProfile={
            token:this.props.myProfile.items.backupfour,
            beCancel:this.state.userid
        };
        //发起网络请求
        let options={
            url:UrlcancelWatch,
            body: JSON.stringify(cancelWatchuserProfile)
        };

        let  response=fetchTool(options);
        response.then(resp=>{
              //停止转圈圈
              this.setState({
                visible:false
              });
             
             if (resp.retcode===2000) {
                this.setState({
                    watchornot:0
                });
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
    goWeiBoList(){  //这里应该把完整的userProfile传递过去      
        this.props.navigator.push({
            component:WeiBoPageWrapper,
            params:{
                userProfile:this.userProfile,
                symbol:1
            }
        });
    }
    render(){
        return(
            <View style={styles.container}> 
                <View style={styles.topper}>
                    <View style={styles.headWrapper}>  

                        <TouchableOpacity onPress={this._back.bind(this)}>
                            <Image  source={require('../image/return2.png')} style={styles.headimg} />
                        </TouchableOpacity> 

                        <View style={styles.nickName}>
                            <Text style={{fontWeight:'bold'}}>{this.state.usernickname}</Text>
                        </View>

                        <View style={{width:22}}></View>
                    </View>

                    <View style={styles.userPhotoWrapper}>
                       <View style={{height:70,width:70, borderRadius:35, backgroundColor:'#61B972'}}>
                            <Image  source={{uri:this.state.userphoto}} style={styles.userPhoto} />
                       </View>                     
                    </View>
                
                    <View style={styles.helpInfo}>
                        <View style={styles.helpInfoLeft}>
                            <View style={styles.ihelp}>
                                <Text onPress={this.goHelpListPage.bind(this,21)}>他帮助</Text>
                            </View>
                            <View style={styles.helpInfoMoney}>
                                <Text onPress={this.goHelpListPage.bind(this,21)} style={{fontSize:14,fontWeight:'bold'}}>{this.state.userhelpsman ||0}人</Text>
                                <Text onPress={this.goHelpListPage.bind(this,21)} style={{fontSize:14,fontWeight:'bold'}}>{this.state.userdonate ||0}元</Text>
                            </View>
                        </View>
                        <View style={styles.helpInfoRight}>
                            <Text  onPress={this.goHelpListPage.bind(this,20)} style={{marginBottom:5}}>帮助他</Text>
                            <View  style={styles.helpInfoMoney}>
                                <Text onPress={this.goHelpListPage.bind(this,20)} style={{fontSize:14,fontWeight:'bold'}}>{this.state.amountaccept||0}人</Text>
                                <Text onPress={this.goHelpListPage.bind(this,20)} style={{fontSize:14,fontWeight:'bold'}}>{this.state.acceptmoney ||0}元</Text>
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
                            <Text  onPress={this.goWatchList.bind(this,11)} style={{color:'#B1B1B1'}}>粉丝:</Text>
                            <Text  onPress={this.goWatchList.bind(this,11)} style={{marginLeft:20}}>{this.state.fanscount}</Text>
                        </View>
                        <View style={styles.commonStyle}>
                            <Text  onPress={this.goWatchList.bind(this,10)} style={{color:'#B1B1B1'}}>收听:</Text>
                            <Text  onPress={this.goWatchList.bind(this,10)} style={{marginLeft:20}}>{this.state.followcount}</Text>
                        </View>
                        <View style={styles.commonStyle}>
                            <Text onPress={this.goWeiBoList.bind(this)}  style={{color:'#B1B1B1'}}>推文:</Text>
                            <Text  onPress={this.goWeiBoList.bind(this)} style={{marginLeft:20}}>{this.state.msgpubcount}</Text>
                        </View>
                        <View style={styles.commonStyle}>
                            <Text style={{color:'#B1B1B1'}}>所在城市:</Text>
                            <Text style={{marginLeft:20}}>{this.state.address}</Text>
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
                    {this.state.watchornot===0 ?
                        <TouchableOpacity  onPress={this.doWatch.bind(this)}  style={styles.bottomInner}>
                            <Image source={require('../image/notPayed.png')} style={styles.payImg} />
                            <Text>+收听Ta</Text>
                        </TouchableOpacity>
                         :
                        <TouchableOpacity onPress={this.cancelWatch.bind(this)} style={styles.bottomInner}>
                            <Image source={require('../image/hasPayed.png')} style={styles.payImg} />
                            <Text>取消收听</Text>
                        </TouchableOpacity>
                    }                  
                </View>
            </View>
        );
    }
}

function mapStateToProps(state,ownProps){
    const { userProfile}= state;     
    return {
        myProfile:userProfile
    }
}
const UserPage=connect(mapStateToProps)(UserPageP);
export  default UserPage; 

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
        height: 40+statusBarHeight,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        paddingLeft:5
    },
    headimg:{
        height:22,
        width:22,
    },
    userPhotoWrapper:{
        flexDirection:'row',
        alignItems:'center',
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
        backgroundColor:'#EBFAEE',
        height:40,
        width:width
    },
    bottomInner:{
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'center'
    },
    payImg:{
        height:20,
        width:20
    }
});












