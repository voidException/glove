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
import CommentItem from './commentItem';

let ratio = PixelRatio.get();
let lineHeight = Platform.OS === 'ios' ? 14 : 16;
let statusBarHeight = Platform.OS === 'ios' ? 20 : 0;
let width=Dimensions.get('window').width;
let height=Dimensions.get('window').height;

let DS=new ListView.DataSource({rowHasChanged:(r1,r2)=>r1!==r2 });
export default class Comment extends Component{
	constructor(props){
		super(props);
		this.state={
			dataSource:DS.cloneWithRows([]),
			isRefreshing: false,
			page:1,
			pageSize:6
		}
	}

    componentDidMount(){
		fetch('http://127.0.0.1:8080/glove/tweetcomment/listcomments',{
			method:'POST',
			headers:{
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
			    'tweetid':5,
			    'page':0,
			    'pageSize':3
			})
       })
	   .then(response=>response.json())
	   .then(json=>this.getJson(json))
	   .catch(function(e){
	   		console.log(e);
	   		console.log('推文评论列表请求出错');
	   })
	   
	}
    getJson(json){
    	console.log(json);
     	this.setState({
		 	dataSource: DS.cloneWithRows(json.data)
		 });
    }


    renderRow(row,sectionID){
		//console.log(row)
		return( <CommentItem  row={row} {...this.props}/>);
	}

	back(){
		this.props.navigator.pop();
	}

    _onRefresh() {
    	
    }
	render(){
		return(
			<View style={styles.contain}>
			   	<Text style={{color:'black'}}>这个是留言列表</Text>
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
		             
		             onEndReachedThreshold={20}
		             scrollRenderAheadDistance={300}
		             enableEmptySections={true}/>	
			</View>
		);
	}

}

let  styles=StyleSheet.create({
	contain:{
		paddingTop:40
	}
});