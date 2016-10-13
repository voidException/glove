//该页面是5大页面的容器，

import{
	AppRegistry,
	StyleSheet,
	Text,
	Image,
	ScrollView,
	TouchableHighlight,
	TouchableOpacity,
	NavigatorIOS,
	Navigator,
	RefreshControl,
	View,
	StatusBar,
	Platform,
    PixelRatio,
    Dimensions,
	ListView,
	WebView,
	
} from 'react-native';
import React,{ Component } from 'react';
import Swiper from 'react-native-swiper2';
import WheelContent  from './wheelContent';
import ItemCell from './itemCell';
import { fetchItemPageIfNeeded } from '../../actions/itemPageAction';
import {fetchWheelImgIfNeeded} from '../../actions/wheelImgAction';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
let ratio = PixelRatio.get();
let lineHeight = Platform.OS === 'ios' ? 14 : 16;
let statusBarHeight = Platform.OS === 'ios' ? 20 : 0;
let width=Dimensions.get('window').width;
let height=Dimensions.get('window').height;
let DS=new ListView.DataSource({rowHasChanged:(r1,r2)=>r1!==r2 });

let lastItemstartTime=null;
 class ItemPage extends Component{
	constructor(props){
		super(props);
		this.state={
			wheelImageOne:null,
			wheelImageTwo:null,
			wheelImageThree:null,
			wheelImageOneURL:'http://www.jianshu.com/p/55b586de943d',
			wheelImageTwoURL:'http://www.jianshu.com/p/55b586de943d',
			wheelImageThreeURL:'http://www.jianshu.com/p/55b586de943d',
			isRefreshing: false, //
			dataSource:DS.cloneWithRows([]),
		}
		
		
	}
	componentDidMount(){
		//console.log(this.props);
		//这里可以换成真实的r数据了,必须确保这个是同步的
		let requestParams={
			proof :'111',
			userID:1,
			page:0,
			pageSize:2,
			lastUpdate:'2015-01-09',
			lastItemstart:'2015-01-09',   //这个是点击加载更多获取的数据集合中，最早开始的项目集合
			flag:1
		};

		let wheelImgRequestParam={
			tag:1,
			page:0,
			pageSize:15
		};
		const {dispatch}=this.props;
		setTimeout(()=>{
			dispatch(fetchItemPageIfNeeded(requestParams));

			dispatch(fetchWheelImgIfNeeded(wheelImgRequestParam));
		},10);
		// dispatch(fetchItemPageIfNeeded(requestParams));

		// dispatch(fetchWheelImgIfNeeded(wheelImgRequestParam));
	}
	componentWillReceiveProps(nextProps) {
		//必须确保cloneWithRows是一个数组！！
		//这里获取nextProps.itemList.itemLis[length].item.itemstart的值，赋给全局变量
		
        //console.log(nextProps.itemList.itemList);

    	this.setState({
			dataSource: DS.cloneWithRows(nextProps.itemList.itemList)
		});
               
		if (nextProps.wheelImg.wheelImg.length!==0) {
			this.setState({
				wheelImageOne:nextProps.wheelImg.wheelImg[0].photopath,
				wheelImageTwo:nextProps.wheelImg.wheelImg[1].photopath,
				wheelImageThree:nextProps.wheelImg.wheelImg[2].photopath,
				wheelImageOneURL:nextProps.wheelImg.wheelImg[0].backupone,
				wheelImageTwoURL:nextProps.wheelImg.wheelImg[1].backupone,
				wheelImageThreeURL:nextProps.wheelImg.wheelImg[2].backupone
			});
		}

		let itemLength=nextProps.itemList.itemList.length-1;
		let rowLastItemStart=nextProps.itemList.itemList[itemLength].item.itemstart
		var date = new Date(rowLastItemStart);
		Y = date.getFullYear() + '-';
		M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
		D = date.getDate() + ' ';
        lastItemstartTime=Y+M+D;
	}

	loadMore(){
		 //使用全局变量加载更多数据，
		 //加载完数据后调用这个方法，定位到合适的地方
		 let requestParams={
			proof :'111',
			userID:1,
			page:0,
			pageSize:15,
			lastUpdate:'2015-01-09',
			lastItemstart:lastItemstartTime||'2015-01-09',  
			//lastItemstart:lastItemstartTime,   //这个是点击加载更多获取的数据集合中，最早开始的项目集合
			flag:2 //flag==1表明是刷新，2是加载更多，这个影响sql取值和reducer的数据合并
		};
		//console.log(lastItemstartTime);
		const {dispatch}=this.props;

		dispatch(fetchItemPageIfNeeded(requestParams));
		 //this.refs.scroll.scrollTo({x:0, y:600, animated:true});
	}

	_onRefresh() {
		// console.log('onRefresh');
		// //每次都更新,这里用receivedAt:Date.now()这个时间作为请求参数
		let receivedAt=this.props.itemList.lastUpdate;
		var date = new Date(receivedAt);
		Y = date.getFullYear() + '-';
		M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
		D = date.getDate() + ' ';

        var   hour=date.getHours();     
        var   minute=date.getMinutes();     
        var   second=date.getSeconds(); 

		let lastUpdateTime=Y+M+D+' '+hour+':'+minute; 
        console.log(lastUpdateTime);

		let requestParams={
			proof :'111',
			userID:1,
			page:1,
			pageSize:4,
			//lastUpdate:this.props.itemList.lastUpdate || 3778487747,
			lastUpdate:lastUpdateTime,
			lastItemstart:'2016-07-09',  //这个是点击加载更多获取的数据集合中，最早开始的项目集合
			flag:1 //flag==1表明是刷新，2是加载更多，这个影响sql取值和reducer的数据合并
		};

		const {dispatch}=this.props;
		dispatch(fetchItemPageIfNeeded(requestParams));

	}
	_onScroll(e){
		console.log('onScroll')
		// console.log(e.nativeEvent);
        /**
         //这个方法不能用
		let scrollH = e.nativeEvent.contentSize.height;
        let y = e.nativeEvent.contentOffset.y;
        let height = e.nativeEvent.layoutMeasurement.height;
        console.log(height)
        console.log('handle scroll', scrollH, y, height);
        if (scrollH - height < y){
        	console.log('上啦刷新')
        }
        **/

	}
	renderRow(row,sectionID){
		return( <ItemCell  row={row}  />);
	}
	wheelImageTouch(url){
		
		this.props.navigator.push({
            component: WheelContent
        });
	}
	render(){
		let urlone='aaa'
		return(
			<View style={styles.container}>
				<View style={styles.topper}>			    
					    <Text style={{fontSize:18,color:'#fff'}}>项目</Text>
				</View>
			<ScrollView
				ref='scroll'
				refreshControl={
			        <RefreshControl
			            refreshing={this.state.isRefreshing}
			            onRefresh={this._onRefresh.bind(this)}
			            tintColor="#ff0000"
			            title="Loading..."
			            titleColor="#00ff00"
			            colors={['#ff0000', '#00ff00', '#0000ff']}
			            progressBackgroundColor="#ffff00"/>
			     }
			    onEndReached={this._onScroll.bind(this)}> 

				<View style={styles.wrapper}>
					<StatusBar backgroundColor='#3B3738' barStyle="default"/>
				

				    <Swiper style={styles.swiper} autoplay={true} showsButtons={false} height={0.3*height}>
				        <View style={styles.slide1}>
						    <TouchableOpacity  onPress={this.wheelImageTouch.bind(this,urlone)}>	
				           		<Image source={{uri:this.state.wheelImageOne}} resizeMode={'cover'} style={{width:width,height:0.3*height}}/>
				            </TouchableOpacity>
				        </View>
				        <View style={styles.slide2}>
				            <TouchableOpacity  onPress={this.wheelImageTouch.bind(this,urlone)}>	
				           		<Image source={{uri:this.state.wheelImageTwo}} resizeMode={'cover'} style={{width:width,height:0.3*height}}/>
				            </TouchableOpacity>
				        </View>
				        <View style={styles.slide3}>
				        	<TouchableOpacity  onPress={this.wheelImageTouch.bind(this,urlone)}>	
				           		<Image source={{uri:this.state.wheelImageThree}} resizeMode={'cover'} style={{width:width,height:0.3*height}}/>
				            </TouchableOpacity>
				        </View>
				    </Swiper>
		        </View>
		        <ListView 
				    	 contentContainerStyle={styles.list}
			             dataSource={this.state.dataSource}
			             renderRow={this.renderRow.bind(this)}
			             initialListSize={21}       
			             pageSize={2} 
			             scrollRenderAheadDistance={300}
			             enableEmptySections={true}/>	
			   
		    </ScrollView> 
		    <View style={styles.loadMore}>
			        <Text onPress={this.loadMore.bind(this)} style={styles.loadMoreTxt}>>></Text>
			 </View>
	        </View>
		);
	}
}



function mapStateToProps(state,ownProps){
	//debugger
	//这里的state就是store里面的各种键值对,store是个外壳
	//在这个函数中，应该从store中取出所有需要的state，向下传递
	const { userProfile,itemList,wheelImg}= state;	 
	//console.log(itemList);
	return {
		userid:userProfile.items.userid,
		itemList:itemList,
		wheelImg:wheelImg,
	}
}
const ItemPageWrapper=connect(mapStateToProps)(ItemPage);
export default ItemPageWrapper

let styles=StyleSheet.create({
	container:{
		flex:1,
		backgroundColor:'#F9FFFC'
	},
	 wrapper: {
	 	//flex:1 	
	 },
	 topper:{
	 	height:60,
	 	justifyContent:'center',
	 	alignItems:'center',
	 	backgroundColor:'#43AC43',
	 	paddingTop:24
	 },
	 swiper:{
	 	height:150
	 },
	  slide1: {	    
	    justifyContent: 'center',
	    alignItems: 'center',
	    backgroundColor: '#9DD6EB',
	    height:150
	  },
	  slide2: {    
	    justifyContent: 'center',
	    alignItems: 'center',
	    backgroundColor: '#97CAE5',
	    height:150
	  },
	  slide3: {  
	    justifyContent: 'center',
	    alignItems: 'center',
	    backgroundColor: '#92BBD9',
	    height:150
	  },
	  texts: {
	    color: '#fff',
	    fontSize: 10,
	    fontWeight: 'bold',
	  },
	  list: {
	    justifyContent: 'flex-start',
	    flexDirection: 'column',
	    flexWrap: 'wrap',
	    flex:1
  	},
  	loadMore:{
  		height:40,
  		width:40,
  		borderRadius:20,
  		position:'absolute',
  		right:0,
  		bottom:70,
  		backgroundColor:'#7D7D7D',
  		justifyContent:'center',
  		alignItems:'center',
  		flexDirection:'row',
  		
  	},
  	loadMoreTxt:{
  		fontSize:16,
  		color:'#fff'
  	}

});


