import React, { Component } from 'react';
import { AppRegistry, ListView, Text, View } from 'react-native';

//这个演示了ListView的section 的使用，亲测，能使用。
export default class ListViewBasics extends Component {
  // 初始化模拟数据
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2, sectionHeaderHasChanged: (s1, s2) => s1 !== s2});
    
    //这里的datasource直接传入了一个大的json对象，其实还可以分成三部分传入到三个参数
    this.state = {
      dataSource: ds.cloneWithRowsAndSections(this.convertFoodArrayToMap())
    };
  }

  convertFoodArrayToMap(){
    var food = [
      {name: "Lettuce", category: "Vegetable"},
      {name: "Apple", category: "Fruit"},
      {name: "Orange", category: "Fruit"},
      {name: "Orange", category: "Fruit"},
      {name: "Orange", category: "Fruit"},
      {name: "Orange", category: "Fruit"},
      {name: "Orange", category: "Fruit"},
      {name: "Orange", category: "Fruit"},
      {name: "Orange", category: "Fruit"},
      {name: "Orange", category: "Fruit"},
      {name: "Orange", category: "Fruit"},
      {name: "Orange", category: "Fruit"},
      {name: "Orange", category: "Fruit"},
      {name: "Orange", category: "Fruit"},
      {name: "Orange", category: "Fruit"},
      {name: "Orange", category: "Fruit"},
      {name: "Orange", category: "Fruit"},
      {name: "Orange", category: "Fruit"},
      {name: "Orange", category: "Fruit"},
      {name: "Orange", category: "Fruit"},
      {name: "Orange", category: "Fruit"},
      {name: "Orange", category: "Fruit"},
      {name: "Orange", category: "Fruit"},
      {name: "Orange", category: "Fruit"},
      {name: "Orange", category: "Fruit"},
      {name: "Potato", category: "Vegetable"}
    ];
    var foodCategoryMap = {}; 
    food.forEach(function(foodItem) {
      if (!foodCategoryMap[foodItem.category]) {
        foodCategoryMap[foodItem.category] = [];
      }
      foodCategoryMap[foodItem.category].push(foodItem);
    });
    return foodCategoryMap;
  }

  componentDidMount(){
  
  }

  renderRow(foodItem){
    return (
      <Text>{foodItem.name}</Text>
    )
  }
  renderSectionHeader(sectionData, category){
    return (
       <Text style={{fontWeight: "700"}}>{category}</Text>
    )
  }

  render() {
    return (
      <View style={{marginTop: 22,flex:1}}>
        <ListView
          style={{paddingTop: 22,flex:1}}
          dataSource={this.state.dataSource}
          renderRow={this.renderRow.bind(this)}
          renderSectionHeader={this.renderSectionHeader.bind(this)}
        />
      </View>
    );
  }
}






