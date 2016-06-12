//该页面是5大页面的容器，

import{
	AppRegistry,
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
import WeiBoItem from './weiboContent';

let { width,height}=Dimensions.get('window');

let DS=new ListView.DataSource({ rowHasChanged:(r1,r2)=>r1!==r2 });

export default class TuiWenPage extends Component{
	constructor(props){
		super(props);
		this.state={
			dataSource:DS.cloneWithRows([]),
		}
		
	}

	renderRow(row,sectionID){
		return( <WeiBoItem  row={row} />);
	}

	componentWillMount(){
		//要每次更新数据，就必须调用这个cloneWithRows方法
		this.setState({
			dataSource: DS.cloneWithRows(this.props.goodData.item)// 怪不得以前老是报错，可能是这里没定义抽取函数
		});
	}
    
	render(){
		return(
			<View style={styles.container}> 
			
				

				    <ListView 
				    	 contentContainerStyle={styles.list}
			             dataSource={this.state.dataSource}
			             renderRow={this.renderRow()}
			             initialListSize={21}       
			             pageSize={2} 
			             scrollRenderAheadDistance={500}/>		
			</View>
		);
	}
}

let styles=StyleSheet.create({
	container:{
		flex:1,
		marginTop:100
	}
});

