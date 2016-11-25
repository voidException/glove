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
import PeopleListItem from './PeopleListItem';
import fetchTool from '../../utils/fetchTool';
import fmDate from '../../utils/fmDate';
import {UrlCommomPeopleList,UrlWatchList,UrlFansList,UrlHelpMeList,UrliHelpList} from '../../utils/url';
let ratio = PixelRatio.get();
let lineHeight = Platform.OS === 'ios' ? 14 : 16;
let statusBarHeight = Platform.OS === 'ios' ? 20 : 0;
let width=Dimensions.get('window').width;
let height=Dimensions.get('window').height;

let DS=new ListView.DataSource({rowHasChanged:(r1,r2)=>r1!==r2 });
export default class PeopleListPage extends Component{
	constructor(props){
		super(props);
		this.state={
			dataSource:DS.cloneWithRows([]),
			isRefreshing: false,
			tag:this.props.tag, //1普通，2社团，3监督，4志愿者，5社会公益机构 10我关注的人 11我的粉丝 20助我的人 21我帮助的人
			token:null,
			page:1,
			pageSize:6
		}
	}

    componentDidMount(){
    	//根据props传过来的tag 确定是什么列表，然后调用不同的接口
	    this._onRefresh(); //
	}
 
    renderRow(row,sectionID){
		//console.log(row)
		//根据props传过来的tag 确定是什么列表，然后调用不同的Item
		return( <PeopleListItem  row={row} {...this.props}/>);
	}

	back(){
		this.props.navigator.pop();
	}

    _onRefresh() {
       let url;
       let localTag=this.state.tag;
       if (localTag==2 ||localTag==3||localTag==4 ||localTag==5) { //爱心社 公益机构排行榜等
       		url=UrlCommomPeopleList;
       }else if (localTag==10) {
       		url=UrlWatchList; //我关注的人
       }else if (localTag==11) {
       	  url=UrlFansList; //我的粉丝
       }else if (localTag==20) {
          url=UrlHelpMeList; //帮助我的人
       }else {
       		url=UrliHelpList; //我帮助的人
       }
	   let params={
			token:this.state.token,
			tag:this.state.tag,
			loadMoreTag:1, //refresh 是1
			page:1,
			pageSize:5,
			lastTime:'2015-09-01 12:10:01'
		};
		//console.log(userAccount);
		//发起网络请求
		let options={
            url:Url,
            body: JSON.stringify(params)
        };
        let  response=fetchTool(options);
        response.then(resp=>{
             if (resp.retcode===2000) { 

              }
              else{
              	    Alert.alert(
                        '不妙',
                        resp.msg,
                        [
                            { text:'好的',onPress:() =>console.log('爱心社列表等出错')}

                        ]
                    );
              }
        }).catch(err=>{

        });
    }
    _loadMore(){
       let url;
       let localTag=this.state.tag;
       if (localTag==2 ||localTag==3||localTag==4 ||localTag==5) { //爱心社 公益机构排行榜等
       		url=UrlCommomPeopleList;
       }else if (localTag==10) {
       		url=UrlWatchList; //我关注的人
       }else if (localTag==11) {
       	  url=UrlFansList; //我的粉丝
       }else if (localTag==20) {
          url=UrlHelpMeList; //帮助我的人
       }else {
       		url=UrliHelpList; //我帮助的人
       }
	   let params={
			token:this.state.token,
			tag:this.state.tag,
			loadMoreTag:1, //refresh 是1
			page:2,
			pageSize:5,
			lastTime:'2015-09-01 12:10:01'
		};
		//console.log(userAccount);
		//发起网络请求
		let options={
            url:Url,
            body: JSON.stringify(params)
        };
        let  response=fetchTool(options);
        response.then(resp=>{
             if (resp.retcode===2000) { 

              }
              else{
              	    Alert.alert(
                        '不妙',
                        resp.msg,
                        [
                            { text:'好的',onPress:() =>console.log('爱心社列表等出错')}

                        ]
                    );
              }
        }).catch(err=>{

        });
    }
	render(){
		return(
			<View style={styles.contain}>
			   	<View  style={styles.header}>
					<Text onPress={this.back.bind(this)} style={{color:'#ffffff',fontSize:18}}>返回</Text>
					<Text onPress={this._loadMore.bind(this)} style={{color:'#ffffff',fontSize:18}}>下一页</Text>
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