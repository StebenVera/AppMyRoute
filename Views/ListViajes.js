import React,{Component} from 'react'
import {View,ListView} from 'react-native'
import BoxViajes from './BoxViajes'
class ListViajes  extends Component{
    constructor(props){
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state={
            dataSource:ds
        }
    }
componentDidMount(){
    console.log(this.props.viajes)
    this.updateDataSource(this.props.viajes)
}

componentWillReceiveProps(newProps){
 if(newProps.viajes != this.props.viajes ){
    this.updateDataSource(newProps.viajes)
 }
}
updateDataSource(data){
    this.setState({dataSource:this.state.dataSource.cloneWithRows(data)})
}
   render(){
       return(
            <ListView
            enableEmptySections
             dataSource={this.state.dataSource}
            renderRow={(viaje) => {
            return  <BoxViajes viajes={viaje} />
                }}
            />
       )
   }
}


export default ListViajes