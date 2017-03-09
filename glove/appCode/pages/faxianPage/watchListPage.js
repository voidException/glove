// 这个适用于查看我关注的人，查看我的粉丝；查看别人关注的人，别人的粉丝

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
import {UrlWatchList,UrlFansList,} from '../../utils/url';
let ratio = PixelRatio.get();
let lineHeight = Platform.OS === 'ios' ? 14 : 16;
let statusBarHeight = Platform.OS === 'ios' ? 20 : 0;
let width=Dimensions.get('window').width;
let height=Dimensions.get('window').height;
//查看我关注的，我的粉丝，爱心社排行榜等等都是这个
//该页面需要的token等userProfile需要父页面传入
export default class WatchListPage extends Component{
	constructor(props){
		super(props);
        this.DS=new ListView.DataSource({rowHasChanged:(r1,r2)=>r1!==r2 });
		this.state={
			dataSource:this.DS.cloneWithRows([]),
			isRefreshing: false,
			tag: this.props.userType, //1普通，2社团，3监督，4志愿者，5社会公益机构 10我关注的人 11我的粉丝 20助我的人 21我帮助的人
			userid:this.props.userid,
			page:1,
			pageSize:10
		};
		this.lastTime='2075-09-01 00:00:00';
	}

    componentDidMount(){
       
	    setTimeout(()=>{ 
   			this._onRefresh(); 
    	},500) 
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
       if (localTag==10) {
       		url=UrlWatchList; //我关注的人
       }else if (localTag==11) {
       	  url=UrlFansList; //我的粉丝
       }
	   let params={
			userID:this.state.userid,
			page:0,
			pageSize:6,
			lastTime:'2075-09-01 00:00:00'
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
       if (localTag==10) {
       		url=UrlWatchList; //我关注的人
       }else if (localTag==11) {
       	    url=UrlFansList; //我的粉丝
       }

	   let params={
			userID:this.state.userid, //查看我帮助的人
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
				//这里要更新this.lastTime
				let length=resp.data.length-1;
				this.lastTime=resp.data[length].registerdate; 
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
					<TouchableOpacity onPress={this.back.bind(this)} style={styles.returnButton}>
                        <Image source={require('./image/return2.png')} style={styles.backImg} resizeMode={'contain'} />
                    </TouchableOpacity>
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