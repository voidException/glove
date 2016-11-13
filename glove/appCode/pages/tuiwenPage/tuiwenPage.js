//改页面适合查看

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
//import {fetchTuiWenPage} from '../../actions/tuiwenPageAction';
import WeiBoItem from './weiboItem';
let { width,height}=Dimensions.get('window');

let DS=new ListView.DataSource({rowHasChanged:(r1,r2)=>r1!==r2 });
let lastItemstartTime=null;
class TuiWenPage extends Component{
	constructor(props){
		super(props);
		
		this.state={
			dataSource:DS.cloneWithRows([]),
			isRefreshing: false,
			page:1,
			pageSize:6,
			visible:false
		}
		//console.log(this.props)
	}
	componentDidMount(){
		//console.log(this.props);
		//这里可以换成真实的r数据了,必须确保这个是同步的
		let requestParams={
			token:"e10adc3949ba59abbe56e057f20f883e1",
			page:0,
			pageSize:2,
			lastUpdate:'2015-01-09',
			lastItemstart:'2015-01-09',   //这个是点击加载更多获取的数据集合中，最后一条数据的发布时间
			flag:1
		};

		const {dispatch}=this.props;
		dispatch(fetchTuiwenPageIfNeeded(requestParams))
		//因为这个时候，数据还没到来，所以为null，但这个时候数据已会传入weiboItem，后者也会渲染，
		//这个会导致奇怪的错误
		 // this.setState({
			// dataSource: DS.cloneWithRows(this.props.weiboList)
		 // });

	}
	//异步获取数据后，更新的是store，connect会感知到，将会执行这个方法，这样weiboItem就有数据了
	componentWillReceiveProps(nextProps) {
		//必须确保cloneWithRows是一个数组！！
		//console.log(nextProps.weiboList.tuiwenList);	

		this.setState({
			dataSource: DS.cloneWithRows(nextProps.weiboList.tuiwenList)
		});
		let weiboLength=nextProps.weiboList.tuiwenList.length-1;
		let rowLastItemStart=nextProps.weiboList.tuiwenList[weiboLength].tuiwen.tweet.publishtime;
		//console.log(rowLastItemStart);
		var date = new Date(rowLastItemStart);
		Y = date.getFullYear() + '-';
		M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
		D = date.getDate() + ' ';
        lastItemstartTime=Y+M+D;
		
	}
	componentWillUpdate(nextProps,nextState){}
	//这个需要把navigator传递过去
	renderRow(row,sectionID){
		//console.log(row);
		return( <WeiBoItem  row={row} {...this.props}/>);
	}
	_onRefresh() {
	
		let receivedAt=this.props.weiboList.lastUpdate ;
		var date = new Date(receivedAt);
		Y = date.getFullYear() + '-';
		M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
		D = date.getDate() + ' ';

        var   hour=date.getHours();     
        var   minute=date.getMinutes();     
        var   second=date.getSeconds(); 

		let lastUpdateTime=Y+M+D+' '+hour+':'+minute; 
		let requestParams={
			token:"e10adc3949ba59abbe56e057f20f883e1",
			page:0,
			pageSize:10,
			lastUpdate:lastUpdateTime,
			lastItemstart:'2015-01-09',   //这个是点击加载更多获取的数据集合中，最后一条数据的发布时间
			flag:1  //1代表刷新，2代表loadMore
		};
       
		const {dispatch}=this.props;
		dispatch(fetchTuiwenPageIfNeeded(requestParams))
	}
    onEndReached(){
    	//这里面实现列表到达底部时自动加载更多
    	//console.log('onEndReached');
    	let requestParams={
			token:"e10adc3949ba59abbe56e057f20f883e1",
			page:0,
			pageSize:10,
			lastUpdate:'2015-01-09',
			lastItemstart:lastItemstartTime||'2015-01-09',  
			//lastItemstart:lastItemstartTime,   //这个是点击加载更多获取的数据集合中，最早开始的项目集合
			flag:2 //flag==1表明是刷新，2是加载更多，这个影响sql取值和reducer的数据合并
		};
		//console.log(lastItemstartTime);
		const {dispatch}=this.props;

		dispatch(fetchTuiwenPageIfNeeded(requestParams));
    }
    goTuiwen(){
    	this.props.navigator.push({
    		component:PublishTuiwen
    	})
    }
	render(){
		//console.log(this.state.dataSource)
		return(
			<View style={styles.container}> 
				<View style={{ flexDirection:'row',backgroundColor:'#43AC43',height:60,paddingTop:24, paddingLeft:15,paddingRight:15,justifyContent:'center',alignItems:'center'}}>
					<Text style={styles.toper}>传播温暖</Text>					
		           
		            <View  style={styles.setting}>
                        <Text onPress={this.goTuiwen.bind(this)} style={{fontSize:18,color:'#ffffff'}}>发布</Text>     
                    </View>		            
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
		             pageSize={2}
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
	const { userProfile,weiboList }= state;	 

	return {
		token:userProfile.items.token,
		userid:userProfile.items.userid,
		weiboList:weiboList
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
	toper:{
		flexDirection:'row',
		justifyContent:'center',
		alignSelf:'center',
		color:'white',
		fontSize:18,
		paddingLeft:3,
		paddingRight:3
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

