import React, {Component, PropTypes} from 'react';

import {Text, View, ListView} from 'react-native';

var dataBlob =[{"catId":1,"catName":"给水管", "children":[{"catId":11,"catName":"给水管66"},{"catId":12,"catName":"给水管667"}]},{"catId":2,"catName":"排水管", "children":[{"catId":21,"catName":"排水管66"},{"catId":22,"catName":"排水管667"}]},{"catId":3,"catName":"水管", "children":[{"catId":31,"catName":"水管66"},{"catId":32,"catName":"水管667"}]}]
//http://www.jianshu.com/p/758124c84053
export default class ProductView extends Component{  

		constructor(props){    

			super(props)    

			this.state = {     

			    listDataSource: this.initialDataSouce(dataBlob)  
		    };  
		}  

		/* DataSource - listView */  

		initialDataSouce = (data) =>{    

			var ds = new ListView.DataSource({ 
			        rowHasChanged: (r1, r2) => r1 !== r2,

					getRowData: this.getListRowData,     

					sectionHeaderHasChanged:(prevSectionData, nextSectionData)=> prevSectionData !== nextSectionData,      

					getSectionHeaderData: this.getListSectionHeaderData});    

			return  ds.cloneWithRowsAndSections(data, this.sectionIds(data), this.rowIds(data))  

		}  

		sectionIds = (dataBlob) =>{

			let sectionIdentities =  []

			for (let sectionIndex in dataBlob) {

			    sectionIdentities.push(sectionIndex)

		    }

		     return sectionIdentities

		}

		rowIds = (dataBlob) => {

			let rowIdentities =  []

			for (let sectionIndex in dataBlob) {

				let section = dataBlob[sectionIndex]

				let sectionArray = []

				for (let rowIndex in section.children) {

					sectionArray.push(rowIndex)

				}

				rowIdentities.push(sectionArray)

			}

			return rowIdentities

		}

		getListRowData = (dataBlob, sectionID, rowID) => {

			let sectionData = dataBlob[sectionID]

			let row = sectionData.children[rowID]

			return row

		}

		getListSectionHeaderData = (dataBlob, sectionID) => {

			let sectionData = dataBlob[sectionID]

			return  sectionData.catName

		}

        /*  listView视图  */

		renderListRow = (rowData: string, sectionID: number, rowID: number, highlightRow: (sectionID: number, rowID: number) => void) =>{   

			return <View style={{height: 35, justifyContent:"center"}}><Text>{rowData.catName}</Text></View>

		}

		renderListSectionHeader = (sectionHeadData, sectionID) => {    

		    return <View style={{height: 50, justifyContent:"center"}} ><Text>{sectionHeadData}</Text></View>

        }

		render() { 
			return (
				<View style={{flex:1}}>
					<ListView 
					   style={{flex:1}}
					    dataSource={this.state.listDataSource}
					    renderRow={this.renderListRow}
				        renderSectionHeader={this.renderListSectionHeader}/>
				</View>
			);
			  
		}

}

