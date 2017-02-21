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
import { fetchTuiwenPageIfNeeded } from '../../actions/tuiwenPageAction';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Loading from '../../loading/loading';
import PublishTuiwen from '../components/publishTuiwen';
import fetchTool from '../../utils/fetchTool';
import {URLTuiwenPage,URLmainPageWeiBo} from '../../utils/url';
import fmDate from '../../utils/fmDate';
//import {fetchTuiWenPage} from '../../actions/tuiwenPageAction';
import WeiBoItem from './weiboItem';
//import TweetItem from './tweetItem';
let { width,height}=Dimensions.get('window');
let lastItemstartTime='2015-09-04 00:00:00';
let lastUpdateTime='2015-09-04 00:00:00';
let finalData=[];
class TuiWenPage extends Component{
	constructor(props){
		super(props);
		this.DS = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		this.state={
			dataSource: this.DS.cloneWithRows([]),
			isRefreshing: false,
			token:this.props.userProfile.items.backupfour,
			//pageSize:6,
			visible:false
		};
		//console.log(this.props)
	}
	componentDidMount(){
		//console.log(this.props.symbol);
		//这里可以换成真实的r数据了,必须确保这个是同步的
		let requestParams={
			token:this.state.token,
			page:0,
			pageSize:10,
			lastUpdate:lastUpdateTime,
			lastItemstart:lastItemstartTime,   //这个是点击加载更多获取的数据集合中，最后一条数据的发布时间
			flag:1,
			symbol:1
		};

		const {dispatch}=this.props;
		dispatch(fetchTuiwenPageIfNeeded(requestParams))
		//因为这个时候，数据还没到来，所以为null，但这个时候数据已会传入weiboItem，后者也会渲染，

	}
	//异步获取数据后，更新的是store，connect会感知到，将会执行这个方法，这样weiboItem就有数据了
	componentWillReceiveProps(nextProps) {
		//必须确保cloneWithRows是一个数组！！
		// console.log('*********')
  //       console.log(this.props.weiboList.tuiwenList.length);
        //console.log(nextProps.weiboList.tuiwenList);	
  //       console.log('*********')
        let oldNewdata=[];
        if (nextProps.weiboList.flag==1) {
             //oldNewdata=nextProps.weiboList.tuiwenList.concat(this.props.weiboList.tuiwenList);
             oldNewdata=nextProps.weiboList.tuiwenList.concat(finalData);
             finalData=oldNewdata;
             let receivedAt=nextProps.weiboList.tuiwenList[0].tuiwen.tweet.publishtime;
             lastUpdateTime=fmDate(receivedAt);
        }else if (nextProps.weiboList.flag==2) {
        	//oldNewdata=this.props.weiboList.tuiwenList.concat(nextProps.weiboList.tuiwenList); 
        	oldNewdata=finalData.concat(nextProps.weiboList.tuiwenList);
        	let weiboLength=nextProps.weiboList.tuiwenList.length-1;  
        	finalData=oldNewdata;  	 					
			let rowLastItemStart=nextProps.weiboList.tuiwenList[weiboLength].tuiwen.tweet.publishtime;
			lastItemstartTime=fmDate(rowLastItemStart);
        };
        //console.log(oldNewdata);
       
		this.setState({
			dataSource: this.DS.cloneWithRows(oldNewdata)
		});		
	}
	componentWillUpdate(nextProps,nextState){

	}
	componentWillUnmount(){
		lastItemstartTime='2015-09-04 00:00:00';
		lastUpdateTime='2015-09-04 00:00:00';
	}
	//这个需要把navigator传递过去
	renderRow(row,sectionID){
		return( <WeiBoItem  key={row.tuiwen.tweet.tweetid} row={row} {...this.props}/>);
	}

	_onRefresh() {
		
		let requestParams={
			token:this.state.token,
			page:0,
			pageSize:10,
			lastUpdate:lastUpdateTime,
			lastItemstart:lastItemstartTime , //这个是点击加载更多获取的数据集合中，最后一条数据的发布时间
			flag:1, //1代表刷新，2代表loadMore
			symbol:1  //1代表是主页，2代表是自己查看自己发布的推文，3是查看别人的推文
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
			lastItemstart:lastItemstartTime,  
			flag:2, //flag==1表明是刷新，2是加载更多，这个影响sql取值和reducer的数据合并
            symbol:1
		};
		//console.log(lastItemstartTime);
		const {dispatch}=this.props;

		dispatch(fetchTuiwenPageIfNeeded(requestParams));
    }
    goTuiwen(){
    	this.props.navigator.push({
    		component:PublishTuiwen,
    		params:{
    			userProfile:this.props.userProfile,
    			symbol:1  //这个symbol 仅仅用于是否显示删除按钮
    		}
    	})
    }
	render(){
		return(
			<View style={styles.container}> 
				<View style={styles.header}>
				    <View style={{width:32}}></View>
					<Text style={{color:'#FFFFFF',fontSize:16}}>传播温暖</Text>							           		            
                    <Text onPress={this.goTuiwen.bind(this)} style={{fontSize:18,color:'#ffffff'}}>发布</Text>                       		            
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
	//debugger
	//这里的state就是store里面的各种键值对,store是个外壳
	//在这个函数中，应该从store中取出所有需要的state，向下传递
	const { userProfile,tuiwenList }= state;	 
	return {
		userProfile:userProfile,
		weiboList:tuiwenList
	}
}
//以下展示两种包裹action的方法，使它们等价于disptch(action)
//  const mapDispatchToProps=(dispatch,ownProps)=>{
	
//  return {
// 		getLists:()=>{
// 			dispatch(fetchTuiwenPageIfNeeded(requestParams))
// 		}
// 		someActions:bindActionCreators(fetchTuiwenPageIfNeeded(requestParams),dispatch)
//  	}
//  }

//也可以在这里面直接定义参数函数，注意没有return
//const MyNavigator=connect(mapStateToProps,mapDispatchToProps)(INavigator);
//const MyNavigator=connect(mapStateToProps)(INavigator);
//const TuiWenPageWrapper=connect(mapStateToProps)(TuiWenPage);
const TuiWenPageWrapper=connect(mapStateToProps)(TuiWenPage);
export default TuiWenPageWrapper


let styles=StyleSheet.create({
	container:{
		flex:1,
		backgroundColor:'#F9FFFC'
	},
	header:{
		height:60,
		flexDirection:'row',
		justifyContent:'space-between',
		paddingTop:20,
		alignItems:'center',
		backgroundColor:'#61B972',
		paddingLeft:5,
		paddingRight:5
	},
	list: {
	    justifyContent: 'flex-start',
	    flexDirection: 'column',
	    flexWrap: 'wrap'
  	},
  	setting:{
        position:'absolute',
        right:15,
        top:30
    }
});

