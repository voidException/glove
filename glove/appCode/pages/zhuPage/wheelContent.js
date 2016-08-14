//agreement协议页面
import {
    StyleSheet,
    View,
    Text,
    Image,
    ScrollView,
    TouchableOpacity,
    Platform,
    WebView
} from 'react-native';
import React,{Component} from 'react';


export default class WheelContent extends Component {
    constructor(props){
        super(props);
        this.state={
            url:'http://www.jianshu.com/notebooks/5163972/latest'
        }
    }

    _back() {
        this.props.navigator.pop();
    }

    render() {

        return (
            <View style={styles.container}>
                <Text>hhh</Text>
                <WebView
                      automaticallyAdjustContentInsets={false}
                      style={styles.webView}
                      source={{uri: this.state.url}}
                      javaScriptEnabled={true}
                      domStorageEnabled={true}
                      decelerationRate="normal"                    
                      startInLoadingState={true}/>
            </View>
        );
    }
}

let styles = StyleSheet.create({
   
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    
});