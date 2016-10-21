'use strict';

import {View, StyleSheet, Image, Platform, Dimensions} from 'react-native';

import React,{Component} from 'react';
import loadingImg from './img/loading.gif';

export default class Loading extends Component {
    
    constructor(props) {
        super(props);
    }

    render() {
        if(!this.props.visible) {
            return <View />;
        }
        return (
            <View style={styles.overlay}>
                <View style={styles.wrapper}>
                    <View style={styles.main}>
                        <Image resizeMode={'contain'} source={loadingImg} style={{width: 32, height: 32}} />
                    </View>
                </View>
            </View>
        );
    }
}

let {width, height} = Dimensions.get('window');

let styles = StyleSheet.create({
    overlay: {
        position: 'absolute',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0)',
        width: width,
        height: height,
        left: 0,
        top: 0,
    },
    wrapper: {
        flex: 1,
        opacity: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    main: {
        paddingTop: 18,
        paddingRight: 18,
        paddingBottom: 18,
        paddingLeft: 18,
        borderRadius: 8,
        overflow: 'hidden',
        backgroundColor: '#000',
        opacity: 0.65,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

if(Platform.OS === 'android'){
    styles = {
        ...styles,
        overlay: {
            position: 'absolute',
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0)',
            width: width,
            height: height,
            left: 0,
            top: 0,
        }
    }
}