import React, {Component} from 'react'
import {Text,View,StyleSheet,TextInput, Button,StatusBar,Image,ScrollView,Alert} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { LoginButton, AccessToken } from 'react-native-fbsdk';
import {postLogin} from '../../apiClient'
import SplashScreen from 'react-native-splash-screen'
class Login extends Component {
    constructor(props){
        super(props);
        this.state={
            correo:'',
            password:''
        }
    }



  

    componentDidMount(){
      
        SplashScreen.hide();
    }


    render(){
        const img_user = <Icon name={"user"}  color={"gray"} size={20}/>
        const password = <Icon name={"lock"} color={"gray"} size={20}/>
        onClickSingIn=()=>{
            if(this.state.correo == '' || this.state.password == ''){
                Alert.alert(
                    'Atención',
                    'Campos correo y contraseña no pueden estar vacios',
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
            postLogin(this.state.correo,this.state.password)
            .then(data =>{
                
                if(data.estado == 1){
                    Alert.alert(
                        'Atención',
                        data.mensaje,
                        [
                            {
                                text:'Entendido',
                                onPress:()=>this.props.navigation.push('Mapa')

    
                            }
                        ],{
                            cancelable:false
                        }
                    )
                    
                }else{
                    Alert.alert(
                        'Atención',
                        data.mensaje,
                        [
                            {
                                text:'Entendido',
                                onPress:()=>console.log('Ok Pressed')

                            }
                        ],{
                            cancelable:false
                        }
                    )
                }
                console.log(data)
            })
         }
        }
        goClikcRegistro=()=>{
            this.props.navigation.push('Regitro')
        }

    return(
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
            <View style={styles.cajaLogin}>
                <StatusBar backgroundColor="#D32F2F" barStyle="dark-content" />
                
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
                        <TextInput 
                        style={styles.txtInp} 
                        placeholder={"Ingrese su Correo"}
                        onChangeText={(text)=>this.setState({correo:text})}
                        value ={this.state.correo}
                        />
                    </View>
                </View>
                <View style={styles.cajaUsuario}>
                    <View style={styles.itemCajaUsuario}>
                        <View style={styles.itemIcono}>
                        {password}
                        </View>
                        <TextInput style={styles.txtInp} 
                        placeholder={"Ingrese su Contraseña"}
                        onChangeText={(text)=>this.setState({password:text})}
                        value={this.state.password}
                        secureTextEntry={true}
                        />
                    </View>
                </View>
               
                <View style={styles.btn}>
                    <Button
                    onPress={()=>onClickSingIn()}
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
                            //console.log(data.accessToken.toString())
                                this.props.navigation.push('Mapa')
                        })
                        }
                    }
                    }
                    onLogoutFinished={() => console.log("logout.")}
                    />
                </View>
                <View style={styles.cajaCuenta}>
                    <Text onPress={()=>goClikcRegistro()}>No tienes una Cuenta? <Text style={styles.txtCuenta}>Registrate Aqui</Text></Text>
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
        },
        cajaCuenta:{
            padding:25
        },
        txtCuenta:{
            color:"#FF5252"
        }
        
  }
)
