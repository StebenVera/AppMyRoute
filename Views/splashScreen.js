import React, {Component} from 'react'
import {StyleSheet,Text,View,Image} from 'react-native'

export default class Splash extends Component{
    constructor(props){
        super(props);
    }
    componentDidMount(){
    }
    
    render()
    {
        
        return(
           <View style={styles.container}>
                <View style={styles.cajaTitulo}>
                    <View style={styles.itemIcono}>
                        <Image source={require('../Imagenes_APP/logo_carro.png')} style={styles.logoImg}  />
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
        fontSize:60,
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