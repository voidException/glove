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
export default class DonateListItem extends Component{
	constructor(props){
		super(props);
	}

	 renderRow(rowData,sectionID){
		return( 
			<View>
			 	<Text>张三回复李四</Text>	
			</View>
		);
	}
    
	render(){
		return(
			<View style={styles.container}> 
                <View>
                    <Text>张三</Text>
                	<Text>支持了50元</Text>
                </View>

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
