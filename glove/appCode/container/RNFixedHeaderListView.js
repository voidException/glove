import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    ListView,
    Image,
    TouchableOpacity,
    PixelRatio
} from 'react-native';
 export default class FixedHeaderListView extends Component {

    constructor(props) {
        super(props);
        var getSectionData = (dataBlob, sectionID) => {
            return dataBlob[sectionID];
        };

        var getRowData = (dataBlob, sectionID, rowID) => {
            return dataBlob[sectionID + ':' + rowID];
        };

        this.state = {
            dataSource: new ListView.DataSource({
                getSectionData: getSectionData, // 获取组中数据
                getRowData: getRowData, // 获取行中的数据
                rowHasChanged: (r1, r2) => r1 !== r2,
                sectionHeaderHasChanged: (s1, s2) => s1 !== s2
            })
        };
    }


    componentDidMount() {

        this.loadDataFromJason();

    }

    loadDataFromJason() {
        var jsonData = this.props.data;
        var dataBlob = {},
            sectionIDs = [],
            rowIDs = [],
            cars = [];
        for (var i in jsonData) {
            //step 1、把组数据放入sectionIDs数组中
            sectionIDs.push(i);
            //step 2、把组中内容放dataBlob对象中
            dataBlob[i] = jsonData[i].title;
            //step 3、取出该组中所有的车
            cars = jsonData[i].cars;
            //step 4记录每一行中的数据
            rowIDs[i] = [];
            //step 5、获取行中每一组数据
            for (var j in cars) {
                //把行号放入rowIDs中
                rowIDs[i].push(j);
                //把每一行中的内容放dataBlob对象中
                dataBlob[i + ':' + j] = cars[j];
            }
        }
        console.log(JSON.stringify(dataBlob));
        console.log(JSON.stringify(sectionIDs));
        console.log(JSON.stringify(rowIDs));
        // 更新状态
        this.setState({
            dataSource: this.state.dataSource.cloneWithRowsAndSections(dataBlob, sectionIDs, rowIDs)
        });
    }

    render() {
        return (
            <View style={styles.outerViewStyle}>
                {/*头部*/}
                <View style={styles.headerViewStyle}>
                    <Text style={{color: 'white', fontSize: 25}}>汽车品牌</Text>
                </View>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow.bind(this)}
                    renderSectionHeader={this.renderSectionHeader.bind(this)}
                />
            </View>
        );
    }

    // 每一行的数据
    renderRow(rowData) {
        return (
            <TouchableOpacity activeOpacity={0.5}>
                <View style={styles.rowStyle}>
                    <Image source={{uri: rowData.icon}} style={styles.rowImageStyle}/>
                    <Text style={{marginLeft: 5}}>{rowData.name}</Text>
                </View>
            </TouchableOpacity>
        );
    }

    // 每一组中的数据
    renderSectionHeader(sectionData, sectionID) {
        return (
            <View style={styles.sectionHeaderViewStyle}>
                <Text style={{marginLeft: 5, color: 'white'}}>{sectionData}</Text>
            </View>
        );
    }

}

// 设置样式
const styles = StyleSheet.create({
    outerViewStyle: {
        //占满窗口
        flex: 1
    },

    headerViewStyle: {
        height: 64,
        backgroundColor: 'blue',
        justifyContent: 'center',
        alignItems: 'center'
    },

    rowStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderBottomColor: 'grey',
        borderBottomWidth: 1 / PixelRatio.get()
    },

    rowImageStyle: {
        width: 70,
        height: 70,
    },

    sectionHeaderViewStyle: {
        backgroundColor: 'red',
        height: 30,
        justifyContent: 'center'
    }
});

