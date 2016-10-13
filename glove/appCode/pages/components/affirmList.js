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
	TextInput
} from 'react-native';
import React,{ Component } from 'react';
import AffirmListItem from './affirmListItem';
let ratio = PixelRatio.get();
let lineHeight = Platform.OS === 'ios' ? 14 : 16;
let statusBarHeight = Platform.OS === 'ios' ? 16 : 0;
let width=Dimensions.get('window').width;
let height=Dimensions.get('window').height;
let DS=new ListView.DataSource({rowHasChanged:(r1,r2)=>r1!==r2 });
export default class AffirmList extends Component{
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
 // <Image source={require('../image/talk.png')} resizeMode={'contain'} style={styles.img} />
	componentDidMount(){
		//console.log(this.props.row.lp);
		this.setState({
			dataSource: DS.cloneWithRows(this.props.data.lp)
		});
	}
	renderRow(row,sectionID){
		//console.log(row)
		return( <AffirmListItem  row={row} />);
	}
	back(){
		this.props.navigator.pop();
	}
    _onRefresh() {
    	
    }
	render(){
		return(
			<View style={styles.container}>
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
	container:{
		flex:1,
		backgroundColor:'#F9FFFC',
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










