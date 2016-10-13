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
import SuperviseListItem from './SuperviseListItem';
import CharityListItem  from './CharityListItem';
import { UrlSuperMenList } from '../utils/url';
let ratio = PixelRatio.get();
let lineHeight = Platform.OS === 'ios' ? 14 : 16;
let statusBarHeight = Platform.OS === 'ios' ? 20 : 0;
let width=Dimensions.get('window').width;
let height=Dimensions.get('window').height;
let DS=new ListView.DataSource({rowHasChanged:(r1,r2)=>r1!==r2 });
export default class PeopleListPage extends Component{
	constructor(props){
		super(props);
        //console.log(this.props)
		this.state={
			dataSource:DS.cloneWithRows([]),
			isRefreshing: false,
			page:1,
			pageSize:6
		}
	}

    componentDidMount(){
    	//根据props传过来的tag 确定是什么列表，传入不同的url
    	if (this.props.userType==3) { //监督处
            let  param={
            	url:UrlSuperMenList, //当是我关注的人和我我帮助的人时这里需要改变url
            	tag:1  //此处应换成param.tag，数据库不足
            };
            this.fetchWrapper(param);
        }else if (this.props.userType==2) { //社团青协
        	let  param={
            	url:UrlSuperMenList,
            	tag:1  
            };
            this.fetchWrapper(param);
        }else  if (this.props.userType==5) { //社会公益机构
        	let  param={
            	url:UrlSuperMenList,  
            	tag:1  
            };
            this.fetchWrapper(param);
        }else if (this.props.userType==7) { //公益排行榜
        	let  param={
            	url:UrlSuperMenList,  
            	tag:1  
            };
            this.fetchWrapper(param);
        }else{
        	let  param={
            	url:UrlSuperMenList,  
            	tag:1  
            };
            this.fetchWrapper(param);
        }
	   
	}

    fetchWrapper(param){
    	fetch(param.url,{
			method:'POST',
			headers:{
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				'proof':'eee',
			    'tag':param.tag,
			    'page':0,
			    'pageSize':3
			})
       })
	   .then(response=>response.json())
	   .then(json=>this.getJson(json))
	   .catch(function(e){
	   		console.log('people列表获取出错');
	   })
    }

    getJson(json){
    	//console.log(json);
     	this.setState({
		 	dataSource: DS.cloneWithRows(json.lp)
		 });
    }


    renderRow(row,sectionID){
		//console.log(sectionID);
		//根据props传过来的tag 确定是什么列表，然后调用不同的Item
		if (this.props.userType==3) {
			return( <SuperviseListItem  row={row} {...this.props} sectionID={sectionID}/>);
		}else if (this.props.userType==7) {
			return( <CharityListItem row={row} {...this.props}/>);
		}else if (this.props.userType==5) {
			return( <SuperviseListItem  row={row} {...this.props}/>);
		}else if (this.props.userType==2 ||this.props.userType==4) {
			return( <SuperviseListItem  row={row} {...this.props}/>);
		}else{
			return( <SuperviseListItem  row={row} {...this.props}/>);
		}
		
	}

	back(){
		this.props.navigator.pop();
	}

    _onRefresh() {
    	
    }
	render(){
		return(
			<View style={styles.contain}>
			   	<View  style={styles.header}>
					<Text onPress={this.back.bind(this)} style={{color:'#ffffff',fontSize:18}}>返回</Text>
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
		             onEndReachedThreshold={20}
		             scrollRenderAheadDistance={300}
		             enableEmptySections={true}/>	
			</View>
		);
	}

}

let  styles=StyleSheet.create({
	contain:{
		flex:1
	},
	header:{
		flexDirection:'row',
        height: 40+statusBarHeight,
        paddingTop: statusBarHeight,
        width:width,    
        borderBottomWidth:1/ratio,
        borderBottomColor:'#F9F9F9',
        alignItems:'center',
        justifyContent:'flex-start',
        backgroundColor:'#43AC43',
        paddingLeft:10,
        paddingRight:10
	}
});