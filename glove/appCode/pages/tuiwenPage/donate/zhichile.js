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
let { width,height}=Dimensions.get('window');
 export default class ZhiChi extends Component{
	constructor(props){
		super(props);
		this.DS = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		this.state={
			dataSource: this.DS.cloneWithRows([]),
			isRefreshing: false,
			token:"",
			visible:false
		};
	}
    
    componentDidMount(){
    	//请求数据

    }

    renderRow(row,sectionID){
		return( <DonateListItem />);
	}

	render(){
		return(
			<View style={styles.container}> 
				
			    <ListView 
			    	 contentContainerStyle={styles.list}
		             dataSource={this.state.dataSource}
		             renderRow={this.renderRow.bind(this)}
		             initialListSize={21}       
		             pageSize={4}
		             onEndReachedThreshold={20}
		             scrollRenderAheadDistance={300}
		             enableEmptySections={true}/>		
			</View>
		);
	}
}









