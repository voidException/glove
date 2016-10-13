import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ListView,
    Image,
    TouchableOpacity
} from 'react-native';

//http://www.jianshu.com/p/7a4823ffd9ad
//这个也实现了listview的header功能，但是另一种方式
var Car = require('./Car.json');
import  RNFixedHeaderListView   from './RNFixedHeaderListView';

export default  class CarList extends Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            
                <RNFixedHeaderListView data={Car.data}/>
           
        );
    }
}
