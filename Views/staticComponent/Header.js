import React, { Component } from 'react';
import { Platform, Image, StyleSheet, View, Text, TouchableOpacity} from 'react-native'
import { Header } from "react-navigation";

const CmpHeader = props =>  {
    onclick = () => {
        props.navigation.navigate('Mapa');
    }
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    var fecha = date + '-' + month + '-' + year
    return (
        <View>
            <View style={styles.header}>
                <View style={styles.zonaLogo}>
                    <View style={{ width: '18%' }}>
                        <TouchableOpacity onPress={this.onclick} style={styles.touchable}>
                            <Image source={require('../../Imagenes_APP/logo_carro.png')} style={styles.imgHeader} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ width: '40%' }}>
                        <Header {...props} />
                    </View>
                    <View>
                        <Text style={styles.txtFecha}>{fecha}</Text>
                    </View>
                </View>
    
            </View>
            
        </View>
    )
    }


const styles = StyleSheet.create({
    header:
    {
        width: '100%', height: 60, backgroundColor: '#FF5252', flexDirection: 'row', alignItems: 'center',
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
        { color: 'white', fontSize: Platform.OS === 'ios' ? 15  : 15.3 },
    txtFecha:
        {fontWeight: "300",color:"#fff"}
})
export default CmpHeader 