import React, {Component} from 'react'
import {StyleSheet,Text,View,Image} from 'react-native'
import {Actions} from 'react-native-router-flux'

export default class Splash extends Component{
    componentDidMount(){
       this._Splash()
    }
    _Splash(){
        let myVar = setInterval(myTimer, 3000);
        function myTimer() {
            Actions.login()
            clearInterval(myVar)
        }
    }
    render()
    {
        
        return(
           <View style={styles.container}>
                <View style={styles.cajaTitulo}>
                    <View style={styles.itemIcono}>
                        <Image source={require('../Imagenes_APP/x.jpeg')} style={styles.logoImg}  />
                    </View>
                <Text style={styles.txtTitulo}>My Rute</Text>
                    </View>
           </View> 
        )
    }
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#F5FCFF",
        justifyContent:"center",
        alignItems:"center"
    },
    cajaTitulo:{
        flexDirection:"row",
        marginBottom:20
    },
    txtTitulo:{
        fontSize:50,
        color:"black",
        fontFamily:"LeckerliOne-Regular"
    },
    itemIcono:{
       marginRight: 10,  
    },
    logoImg:{
        width:50,
        height:74
    }
})