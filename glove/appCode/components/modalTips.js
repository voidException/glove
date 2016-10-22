import  React,{ Component} from 'react';
import { 
     Modal,NativeAppEventEmitter, PixelRatio,ScrollView,Text,Picker,View,StyleSheet,TextInput,
     TouchableOpacity,TouchableHighlight,Switch,
     TouchableWithoutFeedback,Dimensions,DeviceEventEmitter
} from 'react-native';

let { width,height}=Dimensions.get('window');
export  default class ModalTips extends Component{
    constructor(props){
      	super(props);
      	this.state={
        	active: false,
        	animationType: 'none',
      		modalVisible: true,
      		transparent: true,
        }
    }
    _setModalVisible(visible) {
        this.setState({modalVisible:visible});
    }

    render(){

    	let errTip=this.state.onoff ? <ErrorTips />: null;		
		  let modalBackgroundStyle = {
            backgroundColor: this.state.transparent ? 'rgba(0, 0, 0, 0.5)' : '#f5fcff',
        };
      let innerContainerTransparentStyle = this.state.transparent ? {backgroundColor: '#fff', padding: 10}: null;
    	let activeButtonStyle = {
      		backgroundColor: '#ddd'
    	};
    	return(
    		<View>
  				<Modal			       
  			    	animationType={this.state.animationType}
            			transparent={this.state.transparent}
           			visible={this.state.modalVisible}
            			onRequestClose={this._setModalVisible.bind(this,false)}>
            			<View style={[styles.modalContainer, modalBackgroundStyle]}>
  	          			<View style={[styles.innerContainer, innerContainerTransparentStyle]}>
  	          				<Text>hello world</Text>
  		          			<View style={styles.close}>
  		          				<Text style={styles.txt} onPress={this._setModalVisible.bind(this,false)}>关闭</Text>
  	          			    </View>
            			    </View>
            			    
  	          		</View>
  			    </Modal>
			</View>	 
    	);
    }

}
let styles=StyleSheet.create({
	modalContainer:{
		flex:1,
		flexDirection:'column',
		alignItems:'center',
		justifyContent:'center'
	},
	innerContainer: {
		 flexDirection:'column',
		 justifyContent:'center',
         borderRadius: 10,
         alignItems: 'center',
         // marginTop:100,
         height:100,
         width:200,

    },
    close:{
    	marginTop:10,
    	flexDirection:'row',
    	alignItems:'center',
    	justifyContent:'center',
    },
    txt:{
       color:'red'
    }
});










