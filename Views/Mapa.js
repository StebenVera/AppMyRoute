import React, {Component} from 'react'
import {StyleSheet,View,Text,TextInput,StatusBar,Button,ScrollView} from 'react-native'

export default class ViewRegistros extends Component{
    render(){
        onClickRegister=()=>{
            alert('Registrando')
        }
        return(
                <View style={styles.container}>
                    <StatusBar backgroundColor="#D32F2F" barStyle="light-content" />
                    
                </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center",
        backgroundColor:"#fff"
    },
    contentContainer:{
        backgroundColor:"#fff",
        flexGrow:1,
        paddingBottom:10
    }
})
