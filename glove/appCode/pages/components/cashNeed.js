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
import fmDate from '../../utils/fmDate';
let ratio = PixelRatio.get();
let lineHeight = Platform.OS === 'ios' ? 14 : 16;
let statusBarHeight = Platform.OS === 'ios' ? 20 : 0;
let width=Dimensions.get('window').width;
let height=Dimensions.get('window').height;

export default  class CashNeed extends Component{
	constructor(props){
		super(props);
		this.state={
			cash:{
				closetime:"1970-07-05 00:00:00",
				targetcash:0,
				realcash:0,
				supporttimes:0 //支持的次数
			}
		}
		// console.log(this.props);
	}
   componentDidMount(){

   }
    componentWillReceiveProps(nextProps) {   	
    	let	finalCloseTime=fmDate(nextProps.cash.closetime);
		this.setState({
			cash:{
				closetime: finalCloseTime,
				targetcash:nextProps.cash.targetcash,
				realcash:nextProps.cash.realcash,
				supporttimes:nextProps.cash.sumbackup 
			}
		});
        //console.log(nextProps.cash);
	}
	render(){
		return(
			<View>
		    	<View style={styles.endTime}>
			    	<Text>结束时间:{this.state.cash.closetime}</Text>
			    </View>
				<View style={styles.bottomWrapper}>
			    	<View style={styles.bottomItem}>
			       		 <Text style={{color:'red'}}>{this.state.cash.targetcash}元</Text>
			       		 <Text style={{color:'#BEBEBE'}}>目标金额</Text>
			        </View>
			        <View style={styles.bottomItemMid}>
			       		 <Text style={{color:'red'}}>{this.state.cash.realcash}元</Text>
			       		 <Text style={{color:'#BEBEBE'}}>已筹金额</Text>
			        </View>
			        <View style={styles.bottomItem}>
			       		  <Text style={{color:'red'}}>{this.state.cash.supporttimes}</Text>
			       		 <Text style={{color:'#BEBEBE'}}>支持次数</Text>
			        </View>
			    </View>
			</View>
		);
	}
}

let styles=StyleSheet.create({

    bottomWrapper:{
		height:60,
		//backgroundColor:'#F9F9F9',
		borderBottomWidth:1/ratio,
		borderTopWidth:1/ratio,
		borderBottomColor:'#BEBEBE',
		borderTopColor:'#BEBEBE',
		flexDirection:'row',
		marginTop:5,
		justifyContent:'space-around',
		alignItems:'center'
	},
	bottomItem:{
		flexDirection:'column',
		//alignItems:'center',
	},
	endTime:{
		flexDirection:'row',
		alignItems:'center',
		justifyContent:'center'
	},
	bottomItemMid:{
		flexDirection:'column',
		borderLeftWidth:1/ratio,
		borderLeftColor:'#BEBEBE',
		borderRightWidth:1/ratio,
		borderRightColor:'#BEBEBE',
		width:0.3*width,
		alignItems:'center'
	},
});










