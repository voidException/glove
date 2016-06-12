
import React,{Component} from 'react';
import {View,Text,StyleSheet,Image,TouchableOpacity,TouchableHighlight,Dimensions} from 'react-native';

let {width,height}=Dimensions.get('window');

class WeiBoItem extends Component{
	constructor(props){
		super(props);
		//console.log(this.props);		
	}	
    //父组件要传递row 数据
  	render(){
  		let row=this.props.row;
  		var offon=true;
  		console.log(row);
  		let fenqiMax=this.props.row.installment.items.length-1;
  		if(fenqiMax==-1){
  			offon=false;
  			
  		}

	  	return(	  		
		  		<TouchableHighlight>
		  		 
		  			<View style={styles.row}>	  				
		  			    <Image style={styles.imagewrap} source={{uri:row.goods_image}} resizeMode={'stretch'} />  				    			    			
		    			<Text style={styles.goods_name}>{row.goods_name}</Text>	 
		    			<View></View>	
		    			
		    			{ offon?
		    				<View>    	
		    					<Text>￥{row.goods_promotion_price}</Text>
		    					<View style={styles.installment}>	
		    						<Text>月供:￥</Text>			
		    						<Text>{row.installment.items[fenqiMax].per_money}</Text>
		    						<Text>*{row.installment.items[fenqiMax].credit_num}</Text>
		    					</View>   					
		    				</View>
		    				
		    				:
		    				<Text>售价:{row.goods_promotion_price}</Text>
		    			}		    					    						    			 			
		  			</View>
		  		 
		  		</TouchableHighlight> 		
  		);
    }
}
let styles=StyleSheet.create({
	row:{
		justifyContent: 'flex-start',
	    flexDirection:'column',
	    width: width/2,
	    height: 200,
	    backgroundColor: '#F6F6F6',
	   
	    borderWidth: 1,
	    borderRadius: 5,
	    borderColor: '#CCC'
	},
	installment:{
		flexDirection:'row',
		justifyContent:'flex-start',
	},
    imagewrap:{  	
    	width:width/2,
    	height:120 	
    },  
    price:{
    	flex: 1,
        marginTop: 5,       
    }
});

module.exports=ProductItem;





