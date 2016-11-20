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
	Dimensions
} from 'react-native';
import React,{ Component } from 'react';
import  fetchTool from '../../utils/fetchTool';
import  PostAffirm  from './postAffirm';
import AffirmList from './affirmList';
import {UrlAffirmList} from '../../utils/url';
let ratio = PixelRatio.get();
let lineHeight = Platform.OS === 'ios' ? 14 : 16;
let statusBarHeight = Platform.OS === 'ios' ? 20 : 0;
let width=Dimensions.get('window').width;
let height=Dimensions.get('window').height;
export default class Affirm extends Component{
	constructor(props){
		super(props);
		this.state={
			count:0,
			affirmInfo:"还没有人证实哦",
			affirm:null
		}
	}

    componentDidMount(){
		

	   let params={
			id:this.props.tweetid,
			tag:1, //证实和举报都是同一张表，1证实2举报
			page:0,
			pageSize:6,
		};		
		let options={
            url:UrlAffirmList,
            body: JSON.stringify(params)
        };
 
        let  response=fetchTool(options);
        response.then(resp=>{
        	 	
             if (resp.retcode===2000) {
             	
              	    this.setState({
					 	affirm:resp,
					 	count:resp.count,
					 	affirmInfo:resp.lp[0].content
		            });
              }
        }).catch(err=>{
        	console.log(err);
        	console.log('证实人列表请求出错');
        });	   
	}
	postAffirm(){
		this.props.navigator.push({
			component:PostAffirm
		});
	}

    goAffirmList(){
    	if (this.state.count==0) {
    		return
    	};
		this.props.navigator.push({
			component:AffirmList,
			params:{
				data:this.state.affirm,
				tweetid:this.props.tweetid
			}
		});
	}
	render(){
		//let img=<Image source={require('../../image/default.jpg')} style={styles.image}/>;
		var items = [];
		let realLength=0;
		if (this.state.affirm!==null) {
			realLength=this.state.affirm.lp.length;
		};	
		if (realLength>3) {
			realLength=3
		}
        for (var i = 0; i < realLength; i++) {
            if (realLength===0) {
            	items.push(<Image key={i} source={require('../../image/default.jpg')} style={styles.image}/>);
            }else{
               
            	let imgurl=this.state.affirm.lp[i].confirmbackuptwo;           	
            	items.push(<Image key={i} source={{uri:imgurl}} style={styles.image}/>);             
            }          
        }

        let imgsrc=require('../../image/default.jpg');
		return(
			<View style={styles.zhengmingOuter}>
				<View style={styles.zhengshi}>
					<Text style={{fontSize:16,fontWeight:'bold'}}>已有<Text style={{fontSize:16,color:'red'}}>{this.state.count}</Text>人证实</Text>
					<Text style={{color:'red',fontWeight:'bold',fontSize:16}}  onPress={this.postAffirm.bind(this)}>我要证实</Text>
				</View>
				<View  style={styles.zhengshiImg}>
				     {this.state.count===0 ?
				     	  <Image source={imgsrc} style={styles.image}/>
				     	:                          
				          items
				     }
					 <TouchableOpacity onPress={this.goAffirmList.bind(this)}  style={styles.zhengmingImgArrow}>
					 	<Image source={require('./image/moreArrow2.png')} style={styles.zhengmingImgArrow}  resizeMode={'contain'}/>					 
					 </TouchableOpacity>
				</View>
				<View style={styles.zhengshiTxt}>
					<Text style={{color:'#B1B1B1'}}>{this.state.affirmInfo}</Text>
				</View>
			</View>
		);
	}
}

let styles=StyleSheet.create({
		zhengmingOuter:{
		marginTop:14,
		paddingLeft:7,
		paddingRight:7
	},
	zhengshi:{
		flexDirection:'row',
		justifyContent:'space-between',	
		alignItems:'center'			
	},
	zhengshiImg:{
		marginTop:5,
		flexDirection:'row',
		alignItems:'flex-start'
	},
	zhengmingImgMore:{
		position:'absolute',
		right:20,
		top:0,
		width:40,
		height:40,	
	},
	zhengmingImgArrow:{
		position:'absolute',
		right:2,
		top:0,
		width:40,
		height:40,	
	},
	image:{
		width:40,
		height:40,	
		borderRadius:20	
	},
	zhengshiTxt:{
		marginTop:7,
		paddingTop:6,
	}
});











