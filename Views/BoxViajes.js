import React from 'react'
import {View,Text,StyleSheet} from 'react-native'
import moment from 'moment'


function BoxViajes (props) {
    return(
        <View style={styles.container}>
            <View style={styles.cajaViajes}>
                <View style={{width:"100%",backgroundColor:"rgba(228, 233, 237, 1)",borderBottomEndRadius:10,borderTopStartRadius:10,borderTopEndRadius:10,borderBottomStartRadius:10, shadowColor:"black",
                shadowOpacity:.3,
                shadowOffset:{
                    height:10,
                    width:-50
                },
                elevation:6,
                borderColor:"#FE0000",
                borderWidth:1}}>
                    <Text style={{backgroundColor:"#FE0000",textAlign:"center",color:"#fff",borderTopRightRadius:10,borderTopLeftRadius:10}}>{props.viajes.nombreConductor}</Text>
                    <Text style={{textAlign:"center",color:"#000"}}><Text>{props.viajes.hora} </Text> { moment(props.viajes.fecha).format('YYYY-MM-DD') }</Text>
                    <Text style={{textAlign:"center",color:"#000"}}><Text>{props.viajes.destino}</Text> {props.viajes.distancia}</Text>
                    <Text style={{textAlign:"center",color:"#000"}}>{props.viajes.placa}</Text>
                    <Text style={{textAlign:"center",color:"#000",fontWeight:"bold"}}>${props.viajes.tarifa}</Text>
                </View>
            </View>
        </View>
    )
}
export default BoxViajes

const styles = StyleSheet.create({
    container:{
        padding:10,
        alignItems:"center"
    }
    ,
    txtTitulo:{
        fontSize:20,
        color:"#000",
        textAlign:"center",
        padding:5,
        fontWeight:"bold"
    },
    txtSub:{
        color:"#000",
        fontWeight:"bold",
        fontSize:15,
        textAlign:"center"
    }
    ,
    cajaViajes:{
        flexDirection:"row",
        backgroundColor:"#fff",
        width:"60%",
    }
})