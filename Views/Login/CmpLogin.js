import React, {Component} from 'react'
import {Text,View,StyleSheet,TextInput, Button,StatusBar,Image,ScrollView} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { LoginButton, AccessToken } from 'react-native-fbsdk';

class Login extends Component {
    constructor(props){
        super(props);
    }
    render(){
        const img_user = <Icon name={"user"}  color={"gray"} size={20}/>
        const password = <Icon name={"lock"} color={"gray"} size={20}/>
        onClickSingIn=()=>{
            this.props.navigation.push('Mapa')
        }

    return(
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
            <View style={styles.cajaLogin}>
                <StatusBar backgroundColor="#D32F2F" barStyle="light-content" />
                
                <View style={styles.cajaTitulo}>
                    <View style={styles.itemIcono}>
                        <Image source={require('../../Imagenes_APP/logo_carro.png')} style={styles.logoImg}  />
                    </View>
                    <Text style={styles.txtTitulo}>My Rute</Text>
                </View>
                <View style={styles.cajaUsuario}>
                    <View style={styles.itemCajaUsuario}>
                        <View style={styles.itemIcono}>
                            {img_user}
                        </View>
                        <TextInput style={styles.txtInp} placeholder={"Ingrese su Correo"}></TextInput>
                    </View>
                </View>
                <View style={styles.cajaUsuario}>
                    <View style={styles.itemCajaUsuario}>
                        <View style={styles.itemIcono}>
                        {password}
                        </View>
                        <TextInput style={styles.txtInp} placeholder={"Ingrese su Contraseña"}></TextInput>
                    </View>
                </View>
                <View style={styles.btn}>
                    <Button
                    onPress={onClickSingIn}
                    title="Sign In"
                    color="#FE0000"
                    accessibilityLabel="Learn more about this purple button"
                    />
                </View>
                <View style={styles.btnFacebook}>
                    <LoginButton
                    readPermissions={['public_profile','email']}
                    onLoginFinished={
                    (error, result) => {
                    if (error) {
                    console.log("login has error: " + result.error);
                    } else if (result.isCancelled) {
                    console.log("login is cancelled.");
                    } else {
                            AccessToken.getCurrentAccessToken().then(
                            (data) => {
                            console.log(data.accessToken.toString())
                            })
                        }
                    }
                    }
                    onLogoutFinished={() => console.log("logout.")}
                    />
                </View>
            </View>
        </ScrollView>
    )
}
} 
export default Login

const styles = StyleSheet.create(
    {
        cajaLogin:{
          alignItems:"center",
          justifyContent:"center",
          flex:1,
          padding:10,
          backgroundColor:"#fff"
        },
        txtInp:{
            borderTopColor:"white",
            borderLeftColor:"white",
            borderRightColor:"white",
            borderBottomColor:"gray",
            borderWidth:1,
            marginBottom:11,
            flex:1,
            color:"#757575"
            

        },
        cajaUsuario:{
            flexDirection:"row",
            marginBottom:20
        },
        itemCajaUsuario:{
            flexDirection:"row",
            justifyContent:"center",
            alignItems:"center",
            flex:1
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
        btn:{
            width:195,
        },
        logoImg:{
            width:50,
            height:74
        },
        btnFacebook:{
            marginTop:20
        }
        
  }
)
