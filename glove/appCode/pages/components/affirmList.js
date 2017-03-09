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
	Dimensions,
	TextInput
} from 'react-native';
import React,{ Component } from 'react';
import AffirmListItem from './affirmListItem';
import {UrlAffirmList} from '../../utils/url';
import  fetchTool from '../../utils/fetchTool';
let ratio = PixelRatio.get();
let lineHeight = Platform.OS === 'ios' ? 14 : 16;
let statusBarHeight = Platform.OS === 'ios' ? 16 : 0;
let width=Dimensions.get('window').width;
let height=Dimensions.get('window').height;
let DS=new ListView.DataSource({rowHasChanged:(r1,r2)=>r1!==r2 });
let defaultPageSize=6;
let lastPage=5; //最后刷新的页数
let loadMoreTag=true;
export default class AffirmList extends Component{
	constructor(props){
		super(props);
		//console.log(this.props)
		this.state={
			dataSource:DS.cloneWithRows([]),
			isRefreshing: false,
			page:0,
			pageSize:6
		}
	}
	componentDidMount(){
	
		setTimeout(()=>{ 
   			this._onRefresh();
    	},500)
	}
	renderRow(row,sectionID){
		return( <AffirmListItem  key={row.confirmid} row={row} />);
	}
	back(){
		this.props.navigator.pop();
	}
    _onRefresh() { //刷新就是获取最新的defaulPageSize 数据
    	lastPage=0; //重置为1
    	let params={
			id:this.props.tweetid,
			tag:1, //证实和举报都是同一张表，1证实2举报
			page:0,
			pageSize:defaultPageSize,
		};

		let options={
            url:UrlAffirmList,
            body: JSON.stringify(params)
        };
 
        let  response=fetchTool(options);
        response.then(resp=>{       	 	
             if (resp.retcode===2000) {            	
              	    this.setState({
						dataSource: DS.cloneWithRows(resp.lp)
					});
		          if (resp.lp.length=defaultPageSize) { 
		          	   loadMoreTag=false; 
		          }else{
		          	  loadMoreTag=true
		          }
              }
        }).catch(err=>{
        	loadMoreTag=true
        	console.log(err);
        	console.log('刷新证实人列表请求出错');
        });	   
    }
    onEndReached(){ //下一页
        if (loadMoreTag) {
        	return ;
        };
        
    	let params={
			id:this.props.tweetid,
			tag:1, //证实和举报都是同一张表，1证实2举报
			page:lastPage,
			pageSize:defaultPageSize,
		};
		lastPage=lastPage+6;
		
		let options={
            url:UrlAffirmList,
            body: JSON.stringify(params)
        };
 
        let  response=fetchTool(options);
        response.then(resp=>{            	
            if (resp.retcode===2000) {          	 
         	  	this.setState({
					  dataSource: DS.cloneWithRows(resp.lp)
				});
         	    if (resp.lp.length=defaultPageSize) {
         	    	loadMoreTag=false
         	    }else{
         	    	loadMoreTag=true
         	    }                      	 
            }else{
            	loadMoreTag=true
            }
        }).catch(err=>{
        	loadMoreTag=true
        	console.log(err);
        	console.log('loadMore证实人列表请求出错');
        });	 
    }
	render(){
		return(
			<View style={styles.container}>
			    <View  style={styles.header}>
					<TouchableOpacity onPress={this.back.bind(this)} style={styles.returnButton}>
						<Image source={require('./image/return2.png')} style={styles.backImg} resizeMode={'contain'} />
					</TouchableOpacity>				
					<Text onPress={this.onEndReached.bind(this)} style={{color:'#ffffff',fontSize:18}}>下一页</Text>
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
		             initialListSize={22}       
		             pageSize={20}
		           
		             onEndReachedThreshold={2}
		             scrollRenderAheadDistance={300}
		             enableEmptySections={true}/>						
			</View>
		);
	}
}
let  styles=StyleSheet.create({
	container:{
		flex:1,
		backgroundColor:'#F9FFFC',
	},
	header:{
		flexDirection:'row',
        height: 50,
        width:width,    
        borderBottomWidth:1/ratio,
        borderBottomColor:'#F9F9F9',
        alignItems:'center',
        justifyContent:'space-between',
        backgroundColor:'#43AC43',
        paddingLeft:5,
        paddingRight:5
	},
	returnButton:{
		flexDirection:'row',
		justifyContent:'flex-start',
		alignItems:'center'
	},
	backImg:{
		height:24,
		width:24
	},
});










