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
//let backBtnImg = require('./image/bar_btn_back_ico.png');
import PeopleListPage  from  '../../components/PeopleListPage';
import FAQ from './FAQ';
import FeedBack from './feedBack';
import Setting from './setting';
import PersonVerify from'../components/personVerify'
import {UrluploadPhoto} from '../../utils/url';
import Loading from '../../loading/loading';
import formDate from '../../utils/formDate';
import formTime from  '../../utils/formTime';
import UploadFile from '../../utils/uploadFile';
let ratio = PixelRatio.get();
let lineHeight = Platform.OS === 'ios' ? 14 : 16;
let statusBarHeight = Platform.OS === 'ios' ? 20 : 0;
let width=Dimensions.get('window').width;
let height=Dimensions.get('window').height;

let ImagePicker = require('react-native-image-picker');
let formData = new FormData();
let nowDate = new Date();
let imgUrl=require('./123.png');
console.log(UrluploadPhoto);
export default class WoPage extends Component{
	constructor(props){
		super(props);
		this.state={
            token:"e10adc3949ba59abbe56e057f20f883e1",
            notSay:1,
            imgOneUrl:imgUrl,
        }
	}
	_back() {
        this.props.navigator.pop();
    }
    goSupervise(){      
        this.props.navigator.push({
            component: PeopleListPage
        });
    }
    goSetting(){
        this.props.navigator.push({
            component: Setting
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
            component: PersonVerify
        });
    }
    /* 选择上传图片处理函数*/
    selectPicture(tag){
        //options是对ImagePicker的定制
        let options = {
            title: 'Select Avatar',
            customButtons: {
                'Choose Photo from Facebook': 'fb',
            },
            storageOptions: {
                skipBackup: true,
                path: 'images'
            }
        };
        ImagePicker.showImagePicker(options, (response) => {
              
              //console.log(response);
            if (response.didCancel) {
                  console.log('User cancelled image picker');
            }else if (response.error) {
                  console.log('ImagePicker Error:',response.error);
            }else if (response.customButton) {
                  console.log('User tapped custom button:',response.customButton);
            }else{
                   let uri = response.uri;
                   console.log(uri)
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
            //console.log(resp);
            if (resp.retcode===2000) {
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
	render(){
		return(
			<View style={styles.container}> 
				<View style={styles.head}>
                    <Text style={{fontSize:18,color:'#ffffff'}}>我</Text> 
                    <View  style={styles.setting}>
                        <Text onPress={this.goSetting.bind(this)} style={{fontSize:18,color:'#ffffff'}}>设置</Text>     
                    </View>
                             
                </View>
                <View style={styles.topWrapper}>
                	<View  style={styles.topleft}>
                        <TouchableOpacity onPress={this.selectPicture.bind(this,2)}>
    	                	<Image source={require('../../image/default.jpg')} style={styles.topleftImg} />
                        </TouchableOpacity>
	                	<View style={styles.topperMiddle}>
	                	    <Text style={styles.nickName}>小神经很Ok</Text>
	                		<Text>这个家伙的业余产品，想拯救世界</Text>
	                	</View>
                	</View>
                   {/*
                    <View style={styles.topRight}>
                        <Text>已认证</Text>
                        <Image source={require('./image/setImg.png')} style={styles.setImage} />
                    </View>
                   */}
                    
                </View>

              
                <View style={styles.helpInfo}>
                    <View style={styles.helpInfoLeft}>
                        <View style={styles.ihelp}>
                            <Text onPress={this.goSupervise.bind(this)}>我帮助</Text>
                        </View>
                        <View style={styles.helpInfoMoney}>
                            <Text style={{fontSize:14,fontWeight:'bold',color:'red'}}>500人</Text>
                            <Text style={{fontSize:14,fontWeight:'bold',color:'red'}}>400元</Text>
                        </View>
                    </View>
                    <View style={styles.helpInfoRight}>
                        <Text onPress={this.goSupervise.bind(this)} style={{marginBottom:5}}>帮助我</Text>
                        <View  style={styles.helpInfoMoney}>
                            <Text style={{fontSize:14,fontWeight:'bold',color:'red'}}>500人</Text>
                            <Text style={{fontSize:14,fontWeight:'bold',color:'red'}}>400元</Text>
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
                            <Text style={styles.tuiwenWrapperTxt}>100</Text>
                            <Text style={styles.txt}>推文</Text>                           
                        </View>
                        <View style={styles.txtWrapper}>
                            <Text style={styles.tuiwenWrapperTxt}>9000</Text>
                            <Text  onPress={this.goSupervise.bind(this)} style={styles.txt}>关注</Text>
                        </View>
                        <View style={styles.txtWrapper}>
                            <Text style={styles.tuiwenWrapperTxt}>120</Text>
                            <Text onPress={this.goSupervise.bind(this)} style={styles.txt}>粉丝</Text>
                        </View>                 
                </View>

          

             {/*
                <View style={styles.itenInfoWrapper}>
                    
                        <View style={styles.txtWrapper}>
                            <Text style={styles.tuiwenWrapperTxt}>100</Text>
                            <Text style={styles.txt}>发起的项目</Text>                           
                        </View>
                        <View style={styles.txtWrapper}>
                            <Text style={styles.tuiwenWrapperTxt}>9000</Text>
                            <Text style={styles.txt}>参与的项目</Text>
                        </View>
                        <View style={styles.txtWrapper}>
                            <Text style={styles.tuiwenWrapperTxt}>120</Text>
                            <Text style={styles.txt}>关注的项目</Text>
                        </View>                 
                </View>
             */}
               
            {/*
                <View style={styles.fundWrapper}>                  
                    <Image source={require('./image/personal_navibar_icon_message.png')} resizeMode={'cover'} style={styles.wrapperImage}/>
                    <Text style={styles.texts}>加入的基金</Text>
                    <View style={{width:40}}></View>
                </View>
            */}
                <View style={styles.itemWrapperDonate}>                  
                    <Image source={require('./image/zhifubao_btn.png')} resizeMode={'cover'} style={styles.wrapperImage}/>
                    <Text  onPress={this.goPersonVerify.bind(this)} style={styles.texts}>去认证</Text>
                    <View style={{width:40}}></View>
                </View>
               
                <View style={styles.fundWrapper}>                  
                    <Image source={require('./image/nav_beauty.png')} resizeMode={'cover'} style={styles.wrapperImage}/>
                    <Text  style={styles.texts}>给爱保险:300</Text>
                    <View style={{width:40}}></View>
                </View>
                <View style={styles.itemWrapperDonate}>                  
                    <Image source={require('./image/nav_zhoubianyou.png')} resizeMode={'cover'} style={styles.wrapperImage}/>
                    <Text  onPress={this.goFAQ.bind(this)} style={styles.texts}>常见问题</Text>
                    <View style={{width:40}}></View>
                </View>
                 <View style={styles.fundWrapper}>                  
                    <Image source={require('./image/nav_beauty.png')} resizeMode={'cover'} style={styles.wrapperImage}/>
                    <Text onPress={this.goFeedBack.bind(this)} style={styles.texts}>意见反馈</Text>
                    <View style={{width:40}}></View>
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
        justifyContent:'center',
        backgroundColor:'#43AC43',
        paddingLeft:10,
        paddingRight:10
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
        borderRadius:40
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
        //marginTop:10,
        //marginRight:7,
        borderBottomWidth:1/ratio,
        //borderBottomColor:'#F9F9F9',
        //borderTopColor:'#F9F9F9',
        backgroundColor:'#ffffff'
    },
     fundWrapper:{
        //borderTopWidth:1/ratio,
        //borderTopColor:'#9D9D9D',
        //borderBottomWidth:1/ratio,
        //borderBottomColor:'#9D9D9D',
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
    },
    setting:{
        position:'absolute',
        right:15,
        top:30
    }
});












