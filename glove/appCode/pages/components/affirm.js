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
let ratio = PixelRatio.get();
let lineHeight = Platform.OS === 'ios' ? 14 : 16;
let statusBarHeight = Platform.OS === 'ios' ? 20 : 0;
let width=Dimensions.get('window').width;
let height=Dimensions.get('window').height;
import  PostAffirm  from './postAffirm';
import AffirmList from './affirmList';
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
		fetch('http://127.0.0.1:8080/glove/confirm/getconfirmls',{
			method:'POST',
			headers:{
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
			    'id':5,
			    'tag': 2,
			    'page':0,
			    'pageSize':3
			})
       })
	   .then(response=>response.json())
	   .then(json=>this.getJson(json))
	   .catch(function(e){
	   		//console.log(e);
	   		console.log('证实人信息请求出错');
	   })
	   
	}

	getJson(json){
	     //console.log(json);		
		 this.setState({
		 	affirm:json,
		 	count:json.count,
		 	affirmInfo:json.lp[0].content
		 });
	}
	postAffirm(){
		this.props.navigator.push({
			component:PostAffirm
		});
	}

    goAffirmList(){
		this.props.navigator.push({
			component:AffirmList,
			params:{
				data:this.state.affirm
			}
		});
	}
	render(){
		//let img=<Image source={require('../../image/default.jpg')} style={styles.image}/>;
		var items = [];
        for (var i = 0; i < this.state.count; i++) {
            if (this.state.count===0) {
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
				     {/*img*/}
				     {items}
					 <Image source={imgsrc} style={styles.image}/>
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











