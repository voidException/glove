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
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
let ratio = PixelRatio.get();
let lineHeight = Platform.OS === 'ios' ? 14 : 16;
let statusBarHeight = Platform.OS === 'ios' ? 20 : 0;
let width=Dimensions.get('window').width;
let height=Dimensions.get('window').height;

let DS=new ListView.DataSource({rowHasChanged:(r1,r2)=>r1!==r2 });
 class ItemPage extends Component{
	constructor(props){
		super(props);
		this.state={
			wheelImageOne:'http://7xihgc.com1.z0.glb.clouddn.com/lunbo1.jpg',
			wheelImageTwo:'http://7xihgc.com1.z0.glb.clouddn.com/lunbo2.jpg',
			wheelImageThree:'http://7xihgc.com1.z0.glb.clouddn.com/lunbo3.jpg',
			wheelImageOneURL:'http://www.jianshu.com/p/55b586de943d',
			wheelImageTwoURL:'http://www.jianshu.com/p/55b586de943d',
			wheelImageThreeURL:'http://www.jianshu.com/p/55b586de943d',
			isRefreshing: false, //
			dataSource:DS.cloneWithRows([]),
		}
		//console.log(this.props)
		
	}
	componentDidMount(){
		//console.log(this.props);
		//这里可以换成真实的r数据了,必须确保这个是同步的
		let requestParams={
			proof :'111',
			userID:1,
			page:1,
			pageSize:3
		};

		const {dispatch}=this.props;
		dispatch(fetchItemPageIfNeeded(requestParams))
	}
	componentWillReceiveProps(nextProps) {
		//必须确保cloneWithRows是一个数组！！	
		this.setState({
			dataSource: DS.cloneWithRows(nextProps.itemList.itemList)
		});
		//console.log(this.props)
		
	}
	loadMore(){
		 //加载完数据后调用这个方法，定位到合适的地方
		 this.refs.scroll.scrollTo({x:0, y:300, animated:true})
	}

	_onRefresh() {
		console.log('onRefresh');
	}
	_onScroll(e){
		// console.log('onScroll')
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
			    onScroll={this._onScroll.bind(this)}
			    scrollEventThrottle={200}> 

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
			   <View style={styles.loadMore}>
			        <Text onPress={this.loadMore.bind(this)} style={styles.loadMoreTxt}>加载更多</Text>
			   </View>
		    </ScrollView> 
	        </View>
		);
	}
}



function mapStateToProps(state,ownProps){
	//debugger
	//这里的state就是store里面的各种键值对,store是个外壳
	//在这个函数中，应该从store中取出所有需要的state，向下传递
	const { userProfile,itemList }= state;	 
	//console.log(itemList);
	return {
		userid:userProfile.items.userid,
		itemList:itemList
	}
}
const ItemPageWrapper=connect(mapStateToProps)(ItemPage);
export default ItemPageWrapper

let styles=StyleSheet.create({
	container:{
		flex:1
	},
	 wrapper: {
	 	//flex:1 	
	 },
	 topper:{
	 	height:64,
	 	justifyContent:'center',
	 	alignItems:'center',
	 	backgroundColor:'#FF555A'
	 	
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
  		justifyContent:'center',
  		alignItems:'center',
  		flexDirection:'row'
  	},
  	loadMoreTxt:{
  		fontSize:16
  	}

});


