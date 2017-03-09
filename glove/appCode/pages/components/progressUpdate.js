import{
	StyleSheet,
	Text,
	Image,
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
import fmDate from '../../utils/fmDate';
let ratio = PixelRatio.get();
let lineHeight = Platform.OS === 'ios' ? 14 : 16;
let statusBarHeight = Platform.OS === 'ios' ? 20 : 0;
let width=Dimensions.get('window').width;
let height=Dimensions.get('window').height;

export default  class ProgressUpdate extends Component{
	constructor(props){
		super(props);
		
		this.state={
			data:{
				totalUpdate:this.props.cash.backupfive ||0,
				totalBackup: this.props.cash.sumbackup||0,
				cashuuid:this.props.cash.cashuuid,
			}
		}
		// console.log(this.props);
	}
   componentDidMount(){

   }
    componentWillReceiveProps(nextProps) {   	
    	this.setState({
			data:{
				totalUpdate:nextProps.cash.backupfive ||0,
				totalBackup:nextProps.cash.sumbackup,
				cashuuid:nextProps.cash.cashuuid,
				token:""  //用户发表更新需要
			}
		});
	}
		
	render(){
		return(
			<View>
		    	<View style={styles.updateStyle}>
			    	<Text style={styles.text}>进度更新({this.state.data.totalUpdate})</Text>
			    	<Text style={styles.txt}>我要更新</Text>
			    </View>
				<View style={styles.backupStyle}>
					<Text style={styles.text}>支持了({this.state.data.totalBackup||0})</Text>
				</View>			    	
			</View>
		);
	}
}

let styles=StyleSheet.create({
	updateStyle:{
		flexDirection:'row',
		alignItems:'center',
		justifyContent:'space-between',
		marginLeft:2,
		marginRight:2,
		paddingLeft:3,
		paddingRight:3,

		borderWidth:1/ratio,
		height:50,
		borderColor:'#43AC43',
	},
	backupStyle:{
		flexDirection:'row',
		alignItems:'center',
		justifyContent:'flex-start',
		marginLeft:2,
		marginRight:2,
		paddingLeft:3,
		paddingRight:3,
		
		borderWidth:1/ratio,
		height:50,
		borderColor:'#43AC43'
	},
	txt:{
		fontSize:16,
		color:'#2893C3',
		fontWeight:'bold'
	},
	text:{
		fontSize:16,
		fontWeight:'bold'
	},
});










