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
export default class Affirm extends Component{
	constructor(props){
		super(props);
	}

    componentDidMount(){
		fetch('http://127.0.0.1:8080/glove/confirm/getconfirmls',{
			method:'POST',
			headers:{
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
			    'id':1,
			    'tag': 2,
			    'page':1,
			    'pageSize':2
			})
       })
	   .then(response=>response.json())
	   .then(json=>this.getJson(json))
	   .catch(function(e){
	   		console.log(e);
	   		console.log('证实人信息请求出错');
	   })
	   
	}

	getJson(json){
	    console.log(json);		
		// this.setState({
		// 	cash:json
		// });
	}
	postAffirm(){
		this.props.navigator.push({
			component:PostAffirm
		});
	}

	render(){
		//let img=<Image source={require('../../image/default.jpg')} style={styles.image}/>;
		var items = [];
        for (var i = 0; i < 3; i++) {
            items.push(<Image key={i} source={require('../../image/default.jpg')} style={styles.image}/>);
        }

        let imgsrc=require('../../image/default.jpg');
		return(
			<View style={styles.zhengmingOuter}>
				<View style={styles.zhengshi}>
					<Text style={{fontSize:16,fontWeight:'bold'}}>已有<Text style={{fontSize:16,color:'red'}}>100</Text>人证实</Text>
					<Text style={{color:'red',fontWeight:'bold',fontSize:16}}  onPress={this.postAffirm.bind(this)}>我要证实</Text>
				</View>
				<View  style={styles.zhengshiImg}>
				     {/*img*/}
				     {items}
					 <Image source={imgsrc} style={styles.image}/>
					 <Image source={require('./image/moreArrow2.png')} style={styles.zhengmingImgArrow}  resizeMode={'contain'}/>
					 
				</View>
				<View style={styles.zhengshiTxt}>
					<Text style={{color:'#B1B1B1'}}>张三是重庆市的优秀学子，可惜了，这个是真是的张三是重庆市的优秀学子。</Text>
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











