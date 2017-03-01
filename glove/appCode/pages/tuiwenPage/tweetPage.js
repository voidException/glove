//查看我自己的推文
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
import { fetchTuiwenPageIfNeeded } from '../../actions/tuiwenPageAction';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Loading from '../../loading/loading';
import PublishTuiwen from '../components/publishTuiwen';
import fetchTool from '../../utils/fetchTool';
import {URLTuiwenPage,URLmainPageWeiBo} from '../../utils/url';
import fmDate from '../../utils/fmDate';
import WeiBoItem from './weiboItem';
let { width,height}=Dimensions.get('window');
let lastItemstartTime='2015-09-04 00:00:00';
let lastUpdateTime='2015-09-04 00:00:00';
let finalData2=[];
class TweetPage extends Component{ //查看自己发布的tweet
	constructor(props){
		super(props);
		this.DS = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		this.state={
			dataSource: this.DS.cloneWithRows([]),
			isRefreshing: false,
			token:this.props.userProfile.items.backupfour,
			visible:false
		};
	}
	componentDidMount(){	
		let requestParams={
			token:this.state.token,
			page:0,
			pageSize:2,
			lastUpdate:lastUpdateTime,
			lastItemstart:lastItemstartTime, //这个是点击加载更多获取的数据集合中，最后一条数据的发布时间
			flag:1,
			symbol:2
		};
		const {dispatch}=this.props;
		dispatch(fetchTuiwenPageIfNeeded(requestParams))
		//因为这个时候，数据还没到来，所以为null，但这个时候数据已会传入weiboItem，后者也会渲染，
	}
	componentWillUnmount(){
		lastItemstartTime='2015-09-04 00:00:00';
		lastUpdateTime='2015-09-04 00:00:00';
	}
	//异步获取数据后，更新的是store，connect会感知到，将会执行这个方法，这样weiboItem就有数据了
	componentWillReceiveProps(nextProps) {
        let oldNewdata=[];
        if (nextProps.weiboList.flag==1) {
             oldNewdata=nextProps.weiboList.tuiwenList.concat(finalData2);
             finalData2=oldNewdata;
             let receivedAt=nextProps.weiboList.tuiwenList[0].tuiwen.tweet.publishtime;
             lastUpdateTime=fmDate(receivedAt);
        }else if (nextProps.weiboList.flag==2) {
        	oldNewdata=finalData2.concat(nextProps.weiboList.tuiwenList);
        	finalData2=oldNewdata;
        	let weiboLength=nextProps.weiboList.tuiwenList.length-1;    	 					
			let rowLastItemStart=nextProps.weiboList.tuiwenList[weiboLength].tuiwen.tweet.publishtime;
			lastItemstartTime=fmDate(rowLastItemStart);
        };

		this.setState({
			dataSource: this.DS.cloneWithRows(oldNewdata)
		});		
	}
	componentWillUpdate(nextProps,nextState){

	}
	//这个需要把navigator传递过去
	renderRow(row,sectionID){
		return( <WeiBoItem  key={row.tuiwen.tweet.tweetid} symbol={1} row={row} {...this.props}/>);
	}

	_onRefresh() {
		let requestParams={
			token:this.state.token,
			page:0,
			pageSize:4,
			lastUpdate:lastUpdateTime, //这个是点击加载更多获取的数据集合中，最后一条数据的发布时间
			
		};

		const {dispatch}=this.props;
		dispatch(fetchTuiwenPageIfNeeded(requestParams))
	}
    onEndReached(){
    	//这里面实现列表到达底部时自动加载更多
        //symbol 在前端影响路由，后端影响是查看自己发布的还是别人发布的    
    	let requestParams={
			token:this.state.token,
			page:0,
			pageSize:10,
			lastUpdate:lastUpdateTime,
		};
		const {dispatch}=this.props;
		dispatch(fetchTuiwenPageIfNeeded(requestParams));
    }
    goTuiwen(){
    	this.props.navigator.push({
    		component:PublishTuiwen
    	})
    }
    goBack(){
    	this.props.navigator.pop();
    }
	render(){
		return(
			<View style={styles.container}> 
				<View style={styles.header}>
					<Text onPress={this.goBack.bind(this)} style={{fontSize:16,color:'#ffffff'}}>返回</Text>
									
		            <Text style={{fontSize:16,color:'#ffffff'}}>发布</Text>                 
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
		             pageSize={4}
		             onEndReached={this.onEndReached.bind(this)} 
		             onEndReachedThreshold={20}
		             scrollRenderAheadDistance={300}
		             enableEmptySections={true}/>		
		       <Loading visible={this.state.visible} />
			</View>
		);
	}
}

function mapStateToProps(state,ownProps){
	const { tweetList }= state;	 
	return {
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
	header:{
		flexDirection:'row',
		backgroundColor:'#43AC43',
		height:51,
		paddingLeft:15,
		paddingRight:15,
		justifyContent:'space-between',
		alignItems:'center'
	},

	list: {
	    justifyContent: 'flex-start',
	    flexDirection: 'column',
	    flexWrap: 'wrap'
  	},
});

