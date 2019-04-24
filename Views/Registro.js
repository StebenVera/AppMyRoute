import React, {Component} from 'react'
import {StyleSheet,View,Text,TextInput,StatusBar,Button,ScrollView} from 'react-native'

export default class ViewRegistros extends Component{
    render(){
        onClickRegister=()=>{
            alert('Registrando')
        }
        return(
            <ScrollView contentContainerStyle={styles.contentContainer} >
                <View style={styles.container}>
                    <StatusBar backgroundColor="#D32F2F" barStyle="light-content" />
                    <View style={styles.cajaTitulo}>
                        <Text style={styles.txtTitulo}>REGISTRO</Text>
                    </View>
                    <Text style={styles.txtLabel}>Nombre</Text>
                    <View style={{flexDirection:"row",padding:5}}>
                        <TextInput style={styles.txtInp}></TextInput>
                    </View>
                    <Text style={styles.txtLabel}>Correo</Text>
                    <View style={{flexDirection:"row",padding:5}}>
                        <TextInput style={styles.txtInp}></TextInput>
                    </View>
                    <Text style={styles.txtLabel}>Contraseña</Text>
                    <View style={{flexDirection:"row",padding:5}}>
                        <TextInput style={styles.txtInp}></TextInput>
                    </View>
                    <View style={styles.btn}>
                        <Button
                        onPress={onClickRegister}
                        title="Sign In"
                        color="#FE0000"
                        accessibilityLabel="Learn more about this purple button"
                        />
                    </View>
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center",
        backgroundColor:"#fff"
    },
    txtInp:{
        
        borderRadius:8,
        borderWidth:1,
        marginBottom:11,
        borderLeftWidth: 5, 
        borderLeftColor: "#FE0000",
        borderRightWidth:5,
        borderRightColor:"#FE0000",
        flex:1,
        color:"#757575"
    },
    txtLabel:{
        padding:5,
        color:"#000"
    },
    cajaTitulo:{
        alignItems:"center"
    },
    txtTitulo:{
        fontSize:30,
        color:"#000",
        fontWeight:"bold"
    },
    btn:{
        width:200,
        alignSelf:"center",
    },
    contentContainer:{
        backgroundColor:"#fff",
        flexGrow:1,
        paddingBottom:10
    }
})
