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
	ListView
} from 'react-native';
import React,{Component} from 'react';
import Swiper from 'react-native-swiper2';

export default class ZhuPage extends Component{
	constructor(props){
		super(props);
		
	}

	render(){
		return(
	      <Swiper style={styles.wrapper} 
	      	autoplay={true}	>
	        <View style={styles.slide1}>
	          <Text style={styles.text}>Hello Swiper</Text>
	        </View>
	        <View style={styles.slide2}>
	          <Text style={styles.text}>Beautiful</Text>
	        </View>
	        <View style={styles.slide3}>
	          <Text style={styles.text}>And simple</Text>
	        </View>
	      </Swiper>
		);
	}
}

let styles=StyleSheet.create({
	 container:{
		flex:1,
		marginTop:100,
		height:200
	 },
	 wrapper: {
	 	height:300,
	 	
	 },
	  slide1: {
	    
	    justifyContent: 'center',
	    alignItems: 'center',
	    backgroundColor: '#9DD6EB',
	  },
	  slide2: {
	    
	    justifyContent: 'center',
	    alignItems: 'center',
	    backgroundColor: '#97CAE5',
	  },
	  slide3: {
	   
	    justifyContent: 'center',
	    alignItems: 'center',
	    backgroundColor: '#92BBD9',
	  },
	  text: {
	    color: '#fff',
	    fontSize: 30,
	    fontWeight: 'bold',
	  }
});

