//转发列表第一版被废弃
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
import { fetchTuiwenPageIfNeeded } from '../../actions/tuiwenPageAction';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
//import {fetchTuiWenPage} from '../../actions/tuiwenPageAction';
import ZhuanfaItem from './zhuanfaItem';
let { width,height}=Dimensions.get('window');

let DS=new ListView.DataSource({rowHasChanged:(r1,r2)=>r1!==r2 });

class ZhuanfaPage extends Component{
	constructor(props){
		super(props);
		
		this.state={
			dataSource:DS.cloneWithRows([]),
			isRefreshing: false,
			page:1,
			pageSize:6
		}
		//console.log(this.props)
	}
	componentDidMount(){
		//console.log(this.props);
		//这里可以换成真实的r数据了,必须确保这个是同步的
		let requestParams={
			userID:1,
			page:1,
			pageSize:6
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
		//console.log(nextProps);	
		this.setState({
			dataSource: DS.cloneWithRows(nextProps.weiboList.tuiwenList)
		});
		
	}
	componentWillUpdate(nextProps,nextState){
		//console.log(nextProps);
		//console.log(nextState);
	}
	//这个需要把navigator传递过去
	renderRow(row,sectionID){
		return( <ZhuanfaItem  row={row} {...this.props}/>);
	}
	_onRefresh() {
		// setTimeout(()=>{
		// 	console.log('测试下拉刷新');
		// 	this.setState({
		// 		isRefreshing: false,
		// 	});
		// },10000);
		let requestParams={
			userID:1,
			page:1,
			pageSize:18
		};

		const {dispatch}=this.props;
		dispatch(fetchTuiwenPageIfNeeded(requestParams))
	}

	render(){
		//console.log(this.state.dataSource)
		return(
			<View style={styles.container}> 
					
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
			             scrollRenderAheadDistance={300}
			             enableEmptySections={true}/>		
			</View>
		);
	}
}

function mapStateToProps(state,ownProps){
	//debugger
	//这里的state就是store里面的各种键值对,store是个外壳
	//在这个函数中，应该从store中取出所有需要的state，向下传递
	const { userProfile,weiboList }= state;	 
	//console.log(weiboList);
	return {
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
const ZhuanfaPageWrapper=connect(mapStateToProps)(ZhuanfaPage);
export default ZhuanfaPageWrapper


let styles=StyleSheet.create({
	container:{
		flex:1,
		backgroundColor:'#ffffff'
	},
	toper:{
		flexDirection:'row',
		justifyContent:'center',
		alignSelf:'center',
		color:'white',
		fontSize:18
	},
	list: {
	    justifyContent: 'flex-start',
	    flexDirection: 'column',
	    flexWrap: 'wrap'
  	}
});

