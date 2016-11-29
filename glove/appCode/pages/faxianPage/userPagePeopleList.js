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
	Alert
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
//查看我关注的，我的粉丝，爱心社排行榜等等都是这个
//该页面需要的token等userProfile需要父页面传入
export default class UserPagePeopleList extends Component{
	constructor(props){
		super(props);
		console.log(this.props.userType);
        this.DS=new ListView.DataSource({rowHasChanged:(r1,r2)=>r1!==r2 });
		this.state={
			dataSource:this.DS.cloneWithRows([]),
			isRefreshing: false,
			tag: this.props.userType, //1普通，2社团，3监督，4志愿者，5社会公益机构 10我关注的人 11我的粉丝 20助我的人 21我帮助的人
			userID:this.props.userProfile.userid,
			page:1,
			pageSize:10
		};
		this.lastTime='2015-09-01 12:10:01';
	}

    componentDidMount(){

	    this._onRefresh(); //
	}
 
    renderRow(row,sectionID){
    	//console.log(row.userid)
		return( <PeopleListItem key={row.userid} row={row} {...this.props}/>);
	}

	back(){
		this.props.navigator.pop();
	}

    _onRefresh() {
       
       let url;
       let localTag=this.state.tag;
       if (localTag==2 ||localTag==3||localTag==4 ||localTag==5) { 
       		url=UrlCommomPeopleList;
       }else if (localTag==10) {
       		url=UrlWatchList; //我关注的人
       }else if (localTag==11) {
       	  url=UrlFansList; //我的粉丝
       }
	   let params={
			userID:1||this.props.userProfile.userid,
			tag:this.state.tag,  //在我关注的人，和关注我的人时，没用到这个标志
			loadMoreTag:1, //refresh 是1
			page:0,
			pageSize:6,
			lastTime:'2015-09-01 12:10:01'
		};
		let options={
            url:url,
            body: JSON.stringify(params)
        };
        let  response=fetchTool(options);
        response.then(resp=>{
        	 //console.log(resp);
            if (resp.retcode===2000) { 
                    this.setState({
						dataSource: this.DS.cloneWithRows(resp.data)
					});	
					//console.log(resp.data);
				//这里要更新this.lastTime 以便loadMore使用	
				let length=resp.data.length-1;
				//获取的数据的最后一项的值的时间，注意这里没有格式化时间
				this.lastTime=resp.data[length].registerdate; 
                //console.log(this.lastTime)
            }else{
          	    Alert.alert(
                    '提示...',
                    resp.msg,
                    [
                        { text:'好的',onPress:()=>this.props.navigator.pop()}

                    ]
                );
              }
        }).catch(err=>{

        });
    }
    _loadMore(){

       let url;
       let localTag=this.state.tag;  //this.props.userType
       if (localTag==2 ||localTag==3||localTag==4 ||localTag==5) { //爱心社 公益机构等
       		url=UrlCommomPeopleList;
       }else if (localTag==10) {
       		url=UrlWatchList; //我关注的人
       }else if (localTag==11) {
       	  url=UrlFansList; //我的粉丝
       }else if (localTag==20) {
          url=UrlHelpMeList; //帮助我的人
       }else if (localTag==21){
       		url=UrliHelpList; //我帮助的人
       }

	   let params={
			userID:this.props.userProfile.userid, //查看我帮助的人
			tag:this.state.tag,
			loadMoreTag:2, //refresh 是1
			page:0,
			pageSize:4,
			lastTime:fmDate(this.lastTime), // 对时间进行了格式化
		};
		//console.log(this.lastTime);
		let options={
            url:url,
            body: JSON.stringify(params)
        };
        let  response=fetchTool(options);
       
        response.then(resp=>{
        	 //console.log(resp);
             if (resp.retcode===2000) { 
             	this.setState({
				    dataSource: this.DS.cloneWithRows(resp.data)
				});
				//console.log(resp.data);
				//这里要更新this.lastTime
				let length=resp.data.length-1;
				this.lastTime=resp.data[length].registerdate; 
				//console.log('loadMore')
                //console.log(this.lastTime)
              }
              else{
              	    Alert.alert(
                        '提示...',
                        resp.msg,
                        [
                            { text:'好的',onPress:()=>this.props.navigator.pop()}

                        ]
                    );
              }
        }).catch(err=>{
        	console.log(err);
        	Alert.alert(
                '出现异常',
                '稍后再试',
                [
                    { text:'好的',onPress:()=>this.props.navigator.pop()}

                ]
            );
        });
    }
	render(){
		return(
			<View style={styles.contain}>
			   	<View  style={styles.header}>
					<Text onPress={this.back.bind(this)} style={{color:'#ffffff',fontSize:16}}>返回</Text>
					<Text onPress={this._loadMore.bind(this)} style={{color:'#ffffff',fontSize:16}}>下一页</Text>
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
		flex:1,
		backgroundColor:'#ffffff'
	},
	header:{
		flexDirection:'row',
        height: 40+statusBarHeight,
        paddingTop: statusBarHeight,
        width:width,    
        borderBottomWidth:1/ratio,
        borderBottomColor:'#F9F9F9',
        alignItems:'center',
        justifyContent:'space-between',
        backgroundColor:'#43AC43',
        paddingLeft:10,
        paddingRight:10
	}
});