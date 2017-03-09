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
import {UrligongyiList} from '../../utils/url';
let ratio = PixelRatio.get();
let lineHeight = Platform.OS === 'ios' ? 14 : 16;
let statusBarHeight = Platform.OS === 'ios' ? 20 : 0;
let width=Dimensions.get('window').width;
let height=Dimensions.get('window').height;
//因为公益排行榜是依据钱排名的
export default class GongYiPeopleList extends Component{
	constructor(props){
		super(props);
		//console.log(this.props);
        this.DS=new ListView.DataSource({rowHasChanged:(r1,r2)=>r1!==r2 });
		this.state={
			dataSource:this.DS.cloneWithRows([]),
			isRefreshing: false,
		};
		this.money=100000000;
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
	   let params={
			page:0,
			pageSize:6,
			money:10000000
		};
		let options={
            url:UrligongyiList,
            body: JSON.stringify(params)
        };
        let  response=fetchTool(options);
        response.then(resp=>{
            if (resp.retcode===2000) { 
                    this.setState({
						dataSource: this.DS.cloneWithRows(resp.data)
					});	
					//console.log(resp.data);
				//这里要更新this.money 以便loadMore使用	
				let length=resp.data.length-1;
				this.money=resp.data[length].userdonate; //获取的数据的最后一项的值钱数
                
            }else{
          	    Alert.alert(
                    '嗯...',
                    resp.msg,
                    [
                        { text:'好的'}

                    ]
                );
              }
        }).catch(err=>{
        	Alert.alert(
                    'ooohs',
                    resp.msg,
                    [
                        { text:'好的'}

                    ]
                );
        });
    }
    _loadMore(){ 
	   let params={			 
			page:0,
			pageSize:6,
			money:this.money,
		};
		//console.log(this.lastTime);
		let options={
            url:UrligongyiList,
            body: JSON.stringify(params)
        };
        let  response=fetchTool(options);
       
        response.then(resp=>{
        	
             if (resp.retcode===2000) { 
             	this.setState({
				    dataSource: this.DS.cloneWithRows(resp.data)
				});
				//console.log(resp.data);
				//这里要更新this.money
				let length=resp.data.length-1;
				this.money=resp.data[length].userdonate; 
              }
              else{
              	    Alert.alert(
                        '嗯...',
                        resp.msg,
                        [
                            { text:'好的'}

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