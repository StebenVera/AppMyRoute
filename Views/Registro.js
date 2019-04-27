import React, {Component} from 'react'
import {StyleSheet,View,Text,TextInput,StatusBar,Button,ScrollView,Alert} from 'react-native'
import {createUser} from '../apiClient'


export default class ViewRegistros extends Component{
    state={
        nombre:'',
        correo:'',
        password:''
    }
    render(){
        onClickRegister=()=>{
            if(this.state.nombre == "" || this.state.correo == "" || this.state.password == ""){
                Alert.alert(
                    'Atención',
                    'Campos nombre, correo y contraseña no pueden estar vacios',
                    [
                        {
                            text:'Entendido',
                            onPress:()=> console.log('Ok Pressed')
                        }
                    ],{
                        cancelable:false
                    }
                )
            }
            else{
                createUser(this.state.nombre,this.state.correo,this.state.password)
                .then(response=>{
                    if(response.estado === 1)
                    {
                        Alert.alert(
                            'Atención',
                            response.mensaje,
                            [
                                {
                                    text:'Entendido',
                                    onPress:()=>this.props.navigation.push('Login')

                                }
                            ],{
                                cancelable:false
                            }
                        )
                    }
                    else{
                        Alert.alert(
                            'Atención',
                            response.mensaje,
                            [
                                {
                                    text:'Entendido',
                                    onPress:()=> console.log('Ok Pressed')
                                }
                            ],{
                                cancelable:false
                            }
                        )
                    }
                   
                })
            } 
        }
     

        return(
            <ScrollView contentContainerStyle={styles.contentContainer} >
                <View style={styles.container}>
                    <StatusBar backgroundColor="#D32F2F" barStyle="light-content" />
                    <Text style={styles.txtLabel}>Nombre</Text>
                    <View style={{flexDirection:"row",padding:5}}>
                        <TextInput 
                        style={styles.txtInp}
                        onChangeText={(text)=>this.setState({nombre:text})}
                        value={this.state.nombre}
                        />
                    </View>
                    <Text style={styles.txtLabel}>Correo</Text>
                    <View style={{flexDirection:"row",padding:5}}>
                        <TextInput 
                        style={styles.txtInp}
                        onChangeText={(text)=>this.setState({correo:text})}
                        value={this.state.correo}
                        />
                    </View>
                    <Text style={styles.txtLabel}>Contraseña</Text>
                    <View style={{flexDirection:"row",padding:5}}>
                        <TextInput 
                        style={styles.txtInp}
                        onChangeText={(text)=>this.setState({password:text})}
                        value={this.state.password}
                        />
                    </View>
                    <View style={styles.btn}>
                        <Button
                        onPress={()=>onClickRegister()}
                        title="Registrar"
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
