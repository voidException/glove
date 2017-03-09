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
	Platform,
    Alert
} from 'react-native';
import React,{Component} from 'react';
import WatchListPage  from  '../faxianPage/watchListPage';
import HelpListPage  from  '../faxianPage/helpListPage';
import FAQ from './FAQ';
import FeedBack from './feedBack';
import Setting from './setting';
import PersonVerify from'../components/personVerify'
import {UrluploadPhoto} from '../../utils/url';
import Loading from '../../loading/loading';
import TweetPageWrapper from '../tuiwenPage/tweetPage';
import formDate from '../../utils/formDate';
import formTime from  '../../utils/formTime';
import UploadFile from '../../utils/uploadFile';
import { connect } from 'react-redux';

let ratio = PixelRatio.get();
let lineHeight = Platform.OS === 'ios' ? 14 : 16;
let statusBarHeight = Platform.OS === 'ios' ? 20 : 0;
let width=Dimensions.get('window').width;
let height=Dimensions.get('window').height;
let ImagePicker = require('react-native-image-picker');
let formData = new FormData();
let nowDate = new Date();
let imgUrl=require('./123.png');

 class WoPageP extends Component{
	constructor(props){
		super(props);
        //console.log(this.props);
		this.state={
            token:this.props.userProfile.items.backupfour,
            notSay:1,
            imgOneUrl:imgUrl,
            photoUpload:this.props.userProfile.items.photoupload ||1 //标志图片是否上传
        }
	}
	_back() {
        this.props.navigator.pop();
    }
    //我关注的，还有关注我的人
    goWatchList(userType){      
        this.props.navigator.push({
            component: WatchListPage,
            params:{
                userType:userType,
                userid:this.props.userProfile.items.userid
            }
        });
    }
    //帮助我的、我帮助的人
    goHelpListPage(userType){   

        this.props.navigator.push({
            component: HelpListPage,
            params:{
                userType:userType,
                userid: this.props.userProfile.items.userid
            }
        });
    }

    goSetting(){
        this.props.navigator.push({
            component: Setting,
            params:{
                userProfile: this.props.userProfile
            }
        });
    }

    goFAQ(){
        this.props.navigator.push({
            component: FAQ
        });
    }

    goFeedBack(){
        this.props.navigator.push({
            component: FeedBack
        });
    }
    goPersonVerify(){
         this.props.navigator.push({
            component: PersonVerify,
            params:{
                userProfile: this.props.userProfile
            }
        });
    }
    /* 选择上传图片处理函数*/
    selectPicture(tag){
        //options是对ImagePicker的定制
        let options = {
            title: '',
            storageOptions: {
                skipBackup: true,
                path: 'images'
            }
        };
        ImagePicker.showImagePicker(options, (response) => {

            if (response.didCancel) {
                  console.log('User cancelled image picker');
            }else if (response.error) {
                  console.log('ImagePicker Error:',response.error);
            }else if (response.customButton) {
                  console.log('User tapped custom button:',response.customButton);
            }else{
               let uri = response.path;       
                if(uri.indexOf('file://') < 0){
                    uri = 'file://' + uri;
                }else{
                    uri = uri.replace('file://', '')
                }           
                formData.append("photo", {uri: uri, type: 'image/jpeg',name:'photo'});
                formData.append("token",this.state.token); 
                formData.append("notSay",this.state.notSay);  
                this.doCommit();  
            }               
        }); 
    }
    doCommit(){       
        let option={
            url:UrluploadPhoto,
            body:formData
        };
        this.setState({
            visible:true
        });
        let response=UploadFile(option);
        response.then(resp=>{
            //formData=new FormData(); 
            this.setState({
                visible:false
            });
            //上传头像后，下次登录生效
            if (resp.retcode===2000) {
                 Alert.alert(
                    '上传成功',
                    '下次登录生效',
                    [
                        {
                            text: '好的'
                        }
                    ]
                 );
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
            console.log(err);
            this.setState({
                visible:false
            });
        });                               

    }
    //我发布的推文
    goTweetList(){       
        this.props.navigator.push({
            component:TweetPageWrapper,
            params:{
                userProfile:this.props.userProfile,
                symbol:2
            }
        });
    }
	render(){
		return(
			<View style={styles.container}> 
				<View style={styles.header}>
                    <View style={{width:32}}></View>
                    <Text style={{fontSize:18,color:'#ffffff'}}>我</Text>                  
                    <Text onPress={this.goSetting.bind(this)} style={{fontSize:18,color:'#ffffff'}}>设置</Text>                                                    
                </View>

                <View style={styles.topWrapper}>
                	<View  style={styles.topleft}>
                        <TouchableOpacity onPress={this.selectPicture.bind(this,2)}>	
                            <Image source={{uri:this.props.userProfile.items.userphoto}} style={styles.topleftImg} />
                        </TouchableOpacity>
                    </View>     
                	<View style={styles.topperMiddle}>
                	    <Text style={styles.nickName}>{this.props.userProfile.items.usernickname ||'无名氏'}</Text>
                		<Text>{this.props.userProfile.items.backupeight||'暂无简介'}</Text>
                	</View>               	                   
                </View> 

                <View style={styles.helpInfo}>
                    <View style={styles.helpInfoLeft}>
                        <View style={styles.ihelp}>
                            <Text onPress={this.goHelpListPage.bind(this,21)}>我帮助</Text>
                        </View>
                        <View style={styles.helpInfoMoney}>
                            <Text onPress={this.goHelpListPage.bind(this,21)} style={{fontSize:14,fontWeight:'bold'}}>{this.props.userProfile.items.userhelpsman||0}人</Text>
                            <Text onPress={this.goHelpListPage.bind(this,21)} style={{fontSize:14,fontWeight:'bold'}}>{this.props.userProfile.items.userdonate ||0}元</Text>
                        </View>
                    </View>
                    <View style={styles.helpInfoRight}>
                        <Text onPress={this.goHelpListPage.bind(this,20)} style={{marginBottom:5}}>帮助我</Text>
                        <View  style={styles.helpInfoMoney}>
                            <Text onPress={this.goHelpListPage.bind(this,20)} style={{fontSize:14,fontWeight:'bold'}}>{this.props.userProfile.items.amountaccept||0}人</Text>
                            <Text  onPress={this.goHelpListPage.bind(this,20)} style={{fontSize:14,fontWeight:'bold'}}>{this.props.userProfile.items.acceptmoney||0}元</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.loveWrapper}>                  
                    <View style={styles.loveLeft}></View>
                    <View style={styles.loveMiddle}>
                         <Image source={require('./image/hearts.png')} resizeMode={'cover'} style={styles.wrapperImage}/>
                    </View>
                    <View style={styles.loveRight}></View>                
                </View>
                <View style={styles.tuiwenWrapper}>                 
                    <View style={styles.txtWrapper}>
                        <Text onPress={this.goTweetList.bind(this)} style={styles.tuiwenWrapperTxt}>{this.props.userProfile.items.msgpubcount||0}</Text>
                        <Text onPress={this.goTweetList.bind(this)}  style={styles.txt}>推文</Text>                           
                    </View>
                    <View style={styles.txtWrapper}>
                        <Text onPress={this.goWatchList.bind(this,10)}style={styles.tuiwenWrapperTxt}>{this.props.userProfile.items.followcount||0}</Text>
                        <Text  onPress={this.goWatchList.bind(this,10)} style={styles.txt}>关注</Text>
                    </View>
                    <View style={styles.txtWrapper}>
                        <Text onPress={this.goWatchList.bind(this,11)}style={styles.tuiwenWrapperTxt}>{this.props.userProfile.items.fanscount||0}</Text>
                        <Text onPress={this.goWatchList.bind(this,11)} style={styles.txt}>粉丝</Text>
                    </View>                 
                </View>
                <View style={styles.itemWrapperDonate}>                  
                    <Image source={require('./image/zhifubao_btn.png')} resizeMode={'cover'} style={styles.wrapperImage}/>
                    { this.props.userProfile.items.usertype===0 ?
                        <Text onPress={this.goPersonVerify.bind(this)} style={styles.texts}>去认证</Text>
                        :
                        <Text style={styles.texts}>已认证</Text>
                    }                  
                    <View style={{width:40}}></View>
                </View>
               
                <View style={styles.fundWrapper}>                  
                    <Image source={require('./image/nav_beauty.png')} resizeMode={'cover'} style={styles.wrapperImage}/>
                    <Text onPress={this.goFeedBack.bind(this)}  style={styles.texts}>意见反馈</Text>
                    <View style={{width:40}}></View>
                </View>
                <View style={styles.itemWrapperDonate}>                  
                    <Image source={require('./image/nav_zhoubianyou.png')} resizeMode={'cover'} style={styles.wrapperImage}/>
                    <Text  onPress={this.goFAQ.bind(this)} style={styles.texts}>常见问题</Text>
                    <View style={{width:40}}></View>
                </View>
                {/*
                    <View style={styles.fundWrapper}>                  
                        <Image source={require('./image/nav_beauty.png')} resizeMode={'cover'} style={styles.wrapperImage}/>
                        <Text onPress={this.goFeedBack.bind(this)} style={styles.texts}>意见反馈</Text>
                        <View style={{width:40}}></View>
                    </View>
                */}
			</View>
		);
	}
}
function mapStateToProps(state,ownProps){
    const { userProfile}= state;     
    return {
        userProfile:userProfile
    }
}
 const WoPage=connect(mapStateToProps)(WoPageP);
 export default WoPage;

let styles=StyleSheet.create({
	container:{
		flex:1,
        backgroundColor:'#F9FFFC',
	},
	header:{
        height:50,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        backgroundColor:'#61B972',
        paddingLeft:5,
        paddingRight:5
    },
    topWrapper:{
    	flexDirection:'row',
    	justifyContent:'flex-start',
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
    	height:80,
        width:80,
        borderRadius:40,
        backgroundColor:'#61B972'
    },
    topleftImg:{
        height:78,
        width:78,
        borderRadius:39
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
        color:'green'
    },
    setImage:{
        height:22,
        width:22,
        alignSelf:'center',
        marginRight:20
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
        height:50,
        marginTop:0,
        borderBottomWidth:1/ratio,
        borderBottomColor:'#F9F9F9',
        backgroundColor:'#ffffff',
        justifyContent:'space-around',
        alignItems:'center',
        marginLeft:20,
        marginRight:20
    },
     itenInfoWrapper:{
        flexDirection:'row',
        height:50,
        marginTop:0,
        borderBottomWidth:1/ratio,
        borderBottomColor:'red',
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
   
    loveWrapper:{
    	height:40,
    	flexDirection:'row',
    	justifyContent:'center',
        alignItems:'center',
               
    },
    loveLeft:{
        height:20,
        width:0.3*width,
        borderTopWidth:1/ratio,
        borderTopColor:'red'
    },
    loveRight:{
        height:20,
        width:0.3*width,
        borderTopWidth:1/ratio,
        borderTopColor:'red'
    },
    loveMiddle:{
        marginTop:-15,
        alignItems:'center',
        justifyContent:'center'
    },
    loveImg:{
        width:30,
        height:20
    },
    helpWrapper:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        marginTop:8
    },
    helpInfo:{
        flexDirection:'row',
        justifyContent:'center',
        marginTop:12,
        marginBottom:12
    },
    ihelp:{
        flexDirection:'row',
        justifyContent:'flex-end',
        marginBottom:5
    },
    helpInfoLeft:{
        flexDirection:'column',
        justifyContent:'flex-end',
        marginRight:8
    },
    helpInfoRight:{
        flexDirection:'column',
        justifyContent:'flex-start',
        marginLeft:8
    },
    helpInfoMoney:{
        flexDirection:'row'
    },
    myItem:{
        height:45,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        borderBottomWidth:1/ratio,
        backgroundColor:'#ffffff'
    },
     fundWrapper:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        backgroundColor:'#ffffff',
        marginTop:20,
        height:45
    },
    itemWrapper:{
        borderTopWidth:1/ratio,
        borderTopColor:'#9D9D9D',
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
    },
    setting:{
        position:'absolute',
        right:15,
        top:30
    }
});












