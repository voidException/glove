//改页面适合查看主页中的推文
import{
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
	ListView,
	Dimensions
} from 'react-native';
import React,{Component} from 'react';
import WeiBoContent  from './weiboContent';
import { fetchTweetPageIfNeeded } from '../../actions/tweetPageAction';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Loading from '../../loading/loading';
import PublishTuiwen from '../components/publishTuiwen';
import fetchTool from '../../utils/fetchTool';
import fmDate from '../../utils/fmDate';
import WeiBoItem from './weiboItem';
let { width,height}=Dimensions.get('window');
let lastUpdateTime='2075-09-09 00:00:00';
let nextPageAllow=false;
class TweetPage extends Component{
	constructor(props){
		super(props);
		this.DS = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		this.state={
			dataSource: this.DS.cloneWithRows([]),
			isRefreshing: false,
			userID:this.props.userProfile.items.userid,
			visible:false
		};
		//console.log(this.props)
	}
	componentDidMount(){
		//这里可以换成真实的r数据了,必须确保这个是同步的
		let requestParams={
			userID:this.state.userID,
			page:0,
			pageSize:4,
			lastUpdate:lastUpdateTime
		};
		const {dispatch}=this.props;
		setTimeout(()=>{ 
   			dispatch(fetchTweetPageIfNeeded(requestParams))
    	},500) 
		// dispatch(fetchTuiwenPageIfNeeded(requestParams))
		//因为这个时候，数据还没到来，所以为null，但这个时候数据已会传入weiboItem，后者也会渲染，

	}
	//异步获取数据后，更新的是store，connect会感知到，将会执行这个方法，这样weiboItem就有数据了
	componentWillReceiveProps(nextProps) {
       
     	let weiboLength=nextProps.weiboList.tuiwenList.length-1;  
        if (weiboLength!==3) { //说明无数据了
        	nextPageAllow=true;
        };

		let publishTime=nextProps.weiboList.tuiwenList[weiboLength].tuiwen.publishtime;
		lastUpdateTime=fmDate(publishTime);
		this.setState({
			dataSource: this.DS.cloneWithRows(nextProps.weiboList.tuiwenList)
		});		
	}
	//这个需要把navigator传递过去
	renderRow(row,sectionID){		
		return( <WeiBoItem  key={row.tuiwen.tweetid}  symbol={1} row={row} {...this.props}/>);
	}

	_onRefresh() {		
		let requestParams={
			userID:this.state.userID,
			page:0,
			pageSize:4,
     		lastUpdate:'2075-09-09 00:00:00',	
		};       
		const {dispatch}=this.props;
		dispatch(fetchTweetPageIfNeeded(requestParams))
	}
	_nextPage() {	
		// if (nextPageAllow) {
		// 	return
		// };	
		let requestParams={
			userID:this.state.userID,
			page:0,
			pageSize:4,
     		lastUpdate:lastUpdateTime,	
		};       
		const {dispatch}=this.props;
		dispatch(fetchTweetPageIfNeeded(requestParams))
	}
   
    goTuiwen(){
    	this.props.navigator.push({
    		component:PublishTuiwen,
    		params:{
    			userProfile:this.props.userProfile,
    		}
    	})
    }
    backUp(){
		this.props.navigator.pop();
	}
    componentWillUnmount(){		
		lastUpdateTime='2075-09-09 00:00:00';
	}
	render(){
		return(
			<View style={styles.container}> 
				<View style={styles.header}>
				    <TouchableOpacity onPress={this.backUp.bind(this)} style={styles.returnButton}>
						<Image source={require('./image/return2.png')} style={styles.backImg} resizeMode={'contain'} />
					</TouchableOpacity>   
					<Text onPress={this._nextPage.bind(this)} style={{color:'#FFFFFF',fontSize:17}}>下一页</Text>	                   		            
				</View>
			    <ListView 
			    	refreshControl={
				        <RefreshControl
				            refreshing={this.state.isRefreshing}
				            onRefresh={this._onRefresh.bind(this)}
				            tintColor="#ff0000"
				            title="Loading..."
				            titleColor="#00ff00"
				            colors={['#ff0000', '#00ff00', '#0000ff']}
				            progressBackgroundColor="#ffff00"/>}
			    	 contentContainerStyle={styles.list}
		             dataSource={this.state.dataSource}
		             renderRow={this.renderRow.bind(this)}
		             initialListSize={21}       
		             pageSize={10}
		       
		             onEndReachedThreshold={20}
		             scrollRenderAheadDistance={300}
		             enableEmptySections={true}/>		
		       <Loading visible={this.state.visible} />
			</View>
		);
	}
}

function mapStateToProps(state,ownProps){
	//这里的state就是store里面的各种键值对,store是个外壳
	//在这个函数中，应该从store中取出所有需要的state，向下传递
	const { userProfile,tweetList }= state;	 
	return {
		userProfile:userProfile,
		weiboList:tweetList
	}
}
const TweetPageWrapper=connect(mapStateToProps)(TweetPage);
export default TweetPageWrapper

let styles=StyleSheet.create({
	container:{
		flex:1,
		backgroundColor:'#F9FFFC'
	},
	returnButton:{
		flexDirection:'row',
		justifyContent:'flex-start',
		alignItems:'center'
	},
	header:{
		height:50, //以此为准，导航栏高度是51，背景色是'#61B972',
		flexDirection:'row',
		justifyContent:'space-between',
		alignItems:'center',
		backgroundColor:'#61B972',
		paddingLeft:6,
		paddingRight:6
	},
	list: {
	    justifyContent: 'flex-start',
	    flexDirection: 'column',
	    flexWrap: 'wrap'
  	},
  	backImg:{
		height:24,
		width:24
	},
  	setting:{
        position:'absolute',
        right:15,
        top:30
    }
});

