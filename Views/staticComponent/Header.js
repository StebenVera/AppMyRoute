import React, { Component } from 'react';
import {Button, Platform, Image, StyleSheet, View, Text, TouchableOpacity} from 'react-native'
import { Header } from "react-navigation";
import Icon from 'react-native-vector-icons/FontAwesome5'

class CmpHeader extends Component  {
    constructor(props){
        super(props)
    }

   state={
       isVisible:false
   }
    


    render(){
        let iconoUsuario = <Icon name={"user-circle"} color={"#000"} size={50}/>
        onclick = () => {
           // this.props.navigation.navigate('Mapa');
           this.setState((prevState,prevProps)=>({
               isVisible: !prevState.isVisible
           }))
        }
       
        onclickSalir = () =>{
            alert('Saliendo')
        }
        
        var date = new Date().getDate();
        var month = new Date().getMonth() + 1;
        var year = new Date().getFullYear();
        var fecha = date + '-' + month + '-' + year
        let menu = null
        if(this.state.isVisible === true){
            menu =(
                <View style={{position:"absolute",top:60,backgroundColor:"#fff",width:200}}>
                    <View style={{flexDirection:"row"}}>
                        {iconoUsuario}
                        <Text style={styles.txtSubMenu}>Usuario</Text>
                    </View>
                    <Text style={styles.txtSubMenu}>Ayuda</Text>
                    <Text style={styles.txtSubMenu}>Pago</Text>
                    <Text style={styles.txtSubMenu}>Viajes Gratis</Text>
                    <Text style={styles.txtSubMenu}>Configuración</Text>
                    <Text style={styles.txtSubMenu}>Compartir con Amigos</Text>
                </View>
            )
        }
            return (
                <View>
                    <View style={styles.header}>
                        <View style={styles.zonaLogo}>
                            <View style={{ width: '18%',zIndex:3}}>
                                <TouchableOpacity onPress={()=>onclick()} style={styles.touchable}>
                                    <Image source={require('../../Imagenes_APP/logo_carro.png')} style={styles.imgHeader} />
                                </TouchableOpacity>
                                {menu}
                            </View>
                            <View style={{ width: '50%' }}>
                                <Header {...this.props} />
                            </View>
                            <View>
                                <Text style={styles.txtFecha}>{fecha}</Text>
                            </View>
                        </View>
            
                    </View>
                    
                </View>
            )
        }
    }


const styles = StyleSheet.create({
    header:
    {
        width: '100%', height: 60, backgroundColor: '#fff', flexDirection: 'row', alignItems: 'center',
        marginTop: Platform.OS === 'ios' ? 20 : 0, 
    },
    color:
        { color: 'white', fontSize: 1.8},
    touchable:
        { width: '100%', height: '100%', justifyContent: 'center' },
    imgHeader:
        { width: '100%', height: '100%', maxWidth: 50, maxHeight: 50, marginLeft: 4 },
    zonaLogo:
        { width: '100%', flexDirection: 'row', height: '100%', alignItems: 'center', alignContent: 'center', marginLeft: 5 },
    texto:
        { color: '#000', fontSize: Platform.OS === 'ios' ? 15  : 15.3 },
    txtFecha:
        {fontWeight: "300",color:"#000"},
    txtSubMenu:{
        fontSize:15,
        color:"#000",
        padding:10
    }
})
export default CmpHeader 