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
import CommentItem from './commentItem';
import {UrlcommentList} from '../../utils/url';
import fmDate from '../../utils/fmDate';
import fetchTool from '../../utils/fetchTool';

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
		};
		this.lastCommentTime='2075-09-01 00:00:00';
	}

    componentDidMount(){
    	setTimeout(()=>{ 
   			this._onRefresh();
    	},500)
       
	}//componentDidMount


    renderRow(row,sectionID){
		//console.log(row)
		return( <CommentItem  key={row.discussreplyid}  row={row} {...this.props}/>);
	}

	goBack(){
		this.props.navigator.pop();
	}

    _onRefresh() {
    	let params={
		    tweetid:this.props.tweetid,
		    page:0,
		    pageSize:8,
		    lastCommentTime:this.lastCommentTime, //loadMore 后要更新这个值，没有刷新，首次加载是唯一的刷新，降低难度	
		};
		let options={
            url:UrlcommentList,
            body: JSON.stringify(params)
        };
        let  response=fetchTool(options);
        response.then(resp=>{

             if (resp.retcode===2000) {
                 this.setState({
				 	dataSource: DS.cloneWithRows(resp.data)
				 });
				 //更新this.lastCommentTime的值为本次获取数据的最早发布的时间值
				 let length=resp.data.length;
				 let newTime=resp.data[length-1].discussreplytime;
				 this.lastCommentTime=fmDate(newTime);

              }else{
              	    Alert.alert(
                        '没有数据了',
                        resp.msg,
                        [
                            { text:'好的',onPress:() =>console.log('查看评论列表出错了')}

                        ]
                    );
              }
        }).catch(err=>{
   			console.log(err);
        });
	   
    }
    _loadMore(){
        //注意更新this.lastCommentTime的值
         let params={
		    tweetid:this.props.tweetid,
		    page:0,
		    pageSize:8,
		    lastCommentTime:this.lastCommentTime, //loadMore 后要更新这个值，没有刷新，首次加载是唯一的刷新，降低难度	
		};
		
		let options={
            url:UrlcommentList,
            body: JSON.stringify(params)
        };
        let  response=fetchTool(options);
        response.then(resp=>{
          
             if (resp.retcode===2000) {
             
                 this.setState({
				 	dataSource: DS.cloneWithRows(resp.data)
				 });
				 //更新this.lastCommentTime的值为本次获取数据的最早发布的时间值
				 let length=resp.data.length;
				 let newTime=resp.data[length-1].discussreplytime;
 				 this.lastCommentTime=fmDate(newTime);
              }else{
              	    Alert.alert(
                        '没有数据了',
                        resp.msg,
                        [
                            { text:'好的',onPress:() =>console.log('查看评论列表出错了')}

                        ]
                    );
              }
        }).catch(err=>{
   			console.log(err);
        });
    }
	render(){
		return(
			<View style={styles.contain}>
			   	<View  style={styles.header}>
					<TouchableOpacity onPress={this.goBack.bind(this)} style={styles.returnButton}>
                        <Image source={require('./image/return2.png')} style={styles.backImg} resizeMode={'contain'} />
                    </TouchableOpacity>   
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