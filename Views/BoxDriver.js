import React,{Component} from 'react'
import {View,Text,StyleSheet,ScrollView,Image,TextInput,Button,Alert} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/AntDesign';
import DatePicker from 'react-native-datepicker'
import DateTimePicker from "react-native-modal-datetime-picker";
import { saveTravel } from '../apiClient'
import moment from 'moment'
class BoxDriver extends Component{
    state={
        date:"",
        hora:"",
        isDateTimePickerVisible: false,
        isDateTimePickerVisible2:false,
        isDateTimePickerVisible3:false,
        nombreUsuario:"",
        distancia:"",
        tiempo:"",
        tarifa:"",
        destino:""
    }
    
      componentDidMount(){
        var date = new Date().getDate();
        var month = new Date().getMonth() + 1;
        var year = new Date().getFullYear();
        var fecha = year+'-'+month+'-'+date

        let nombreUsuario = this.props.navigation.state.params.nombreUsuario
        let tiempo = this.props.navigation.state.params.tiempo
        let tarifa = this.props.navigation.state.params.tarifa
        let distancia = this.props.navigation.state.params.distancia
        let destino = this.props.navigation.state.params.destino
        this.setState({date:fecha,nombreUsuario,tiempo,tarifa,distancia,destino})
       
    }
      
      
     
      showDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: true });
      };
      
      showDateTimePicker2 = () => {
        this.setState({ isDateTimePickerVisible2: true });
      };
      showDateTimePicker3 = () => {
        this.setState({ isDateTimePickerVisible3: true });
      };
      hideDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: false });
      };
      hideDateTimePicker2 = () => {
        this.setState({ isDateTimePickerVisible2: false });
      };
      hideDateTimePicker3 = () => {
        this.setState({ isDateTimePickerVisible3: false });
      };
    
      handleDatePicked = date => {
        console.log("A date has been picked: ", date);
        this.setState({hora: moment(date).format('HH:mm')})   // nos permite dar el formato que necesitemos de horas y fechas
        this.hideDateTimePicker();
      };
      handleDatePicked2 = date => {
        console.log("A date has been picked: ", date);
        this.setState({hora: moment(date).format('HH:mm')})   // nos permite dar el formato que necesitemos de horas y fechas
        this.hideDateTimePicker2();
      };
      handleDatePicked3 = date => {
        console.log("A date has been picked: ", date);
        this.setState({hora: moment(date).format('HH:mm')})   // nos permite dar el formato que necesitemos de horas y fechas
        this.hideDateTimePicker3();
      };
    render()
    {
    onClickViajar=()=>{
        let {nombreUsuario,date,hora,distancia,tiempo,tarifa,destino} = this.state
  
        saveTravel(nombreUsuario,date,hora,"Steven Gómez",distancia,tiempo,tarifa,"EUV-410",destino)
        .then(data=>{
            if(data.estado == 1){
                Alert.alert(
                    'Atención',
                    data.mensaje,
                    [
                        {
                            text:'Entendido',
                            onPress:()=> this.props.navigation.push('Mapa',{nombreDB:this.state.nombreUsuario})    
                        }
                    ],{
                        cancelable:false
                    }
                )
                
            }else{
                Alert.alert(
                    'Atención',
                    'Ocurrio un erro al intentar asignar el viaje'
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
        })
    }
    onClickViajar2=()=>{
        let {nombreUsuario,date,hora,distancia,tiempo,tarifa,destino} = this.state
  
        saveTravel(nombreUsuario,date,hora,"Laura Camacho",distancia,tiempo,tarifa,"THA-231",destino)
        .then(data=>{
            if(data.estado == 1){
                Alert.alert(
                    'Atención',
                    data.mensaje,
                    [
                        {
                            text:'Entendido',
                            onPress:()=> this.props.navigation.push('Mapa',{nombreDB:this.state.nombreUsuario})    
                        }
                    ],{
                        cancelable:false
                    }
                )
                
            }else{
                Alert.alert(
                    'Atención',
                    'Ocurrio un erro al intentar asignar el viaje'
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
        })
    }
    onClickViajar3=()=>{
        let {nombreUsuario,date,hora,distancia,tiempo,tarifa,destino} = this.state
  
        saveTravel(nombreUsuario,date,hora,"Fernando Lozada",distancia,tiempo,tarifa,"PHG-245",destino)
        .then(data=>{
            if(data.estado == 1){
                Alert.alert(
                    'Atención',
                    data.mensaje,
                    [
                        {
                            text:'Entendido',
                            onPress:()=> this.props.navigation.push('Mapa',{nombreDB:this.state.nombreUsuario})    
                        }
                    ],{
                        cancelable:false
                    }
                )
                
            }else{
                Alert.alert(
                    'Atención',
                    'Ocurrio un erro al intentar asignar el viaje'
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
        })
    }
    const image_client = <Icon name="user" size={50} color="#FF5252" />;
    const image_estrella = <Icon name="star" size={25} color="#FE0000"/>
    const image_estrella2 = <Icon name="star" size={25}  color="grey" />
 
    
    if(this.state.hora == ""){
        this.setState({hora:"0:00"})
    }
    return(
      
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.caja} >
                    <View style={styles.cajaDatos}>
                        <Image  source={require('../Imagenes_APP/steben.jpg')} style={{borderRadius:100,maxWidth:80,maxHeight:80}} />
                        
                        <View style={{paddingLeft:20}}>
                            <Text style={{color:"black",fontWeight:"bold",fontSize:20}}>Steven Gómez</Text>
                            <View style={styles.cajaEstrella}>
                                {image_estrella}
                                {image_estrella}
                                {image_estrella}
                                {image_estrella}
                            </View>
                        </View>
                    </View>
                    <View>
                        <Image  source={require('../Imagenes_APP/map2.png')} style={{width:"100%", height:100}} />
                    </View>
                    <View style={styles.cajaViajar}>
                        <DatePicker
                            style={{width: 120}}
                            date={this.state.date}
                            mode="date"
                            placeholder="select date"
                            format="YYYY-MM-DD"
                            minDate={this.state.date}
                            maxDate="2050-12-31"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            customStyles={{
                            dateIcon: {
                                position: 'absolute',
                                left: 0,
                                top: 4,
                                marginLeft: 0
                            },
                            dateInput: {
                                marginLeft: 36
                            }
                            // ... You can check the source to find the other keys.
                            }}
                            onDateChange={(date) => {this.setState({date: date})}}
                        />
                        
                            <View style={{flexDirection:"row",alignItems:"center"}}>
                                
                                   <Icon2 name="clockcircleo" size={25}  color="#FF5252"onPress={this.showDateTimePicker} />
                                    <DateTimePicker
                                    isVisible={this.state.isDateTimePickerVisible}
                                    onConfirm={this.handleDatePicked}
                                    onCancel={this.hideDateTimePicker}
                                    mode={'time'}
                                    is24Hour={false}
                                    />
                                    <Text style={{marginLeft:10,color:"#000",fontSize:15}}>{this.state.hora}</Text>
                                
                            </View> 

                            <View>
                                <Button
                                onPress={()=>onClickViajar()}
                                title="Viajar"
                                color="#FE0000"
                                accessibilityLabel="Learn more about this purple button"
                                />
                            </View>
                        
                    </View>
                </View>
                <View style={styles.caja} >
                    <View style={styles.cajaDatos}>
                        <Image  source={require('../Imagenes_APP/laura.jpg')} style={{borderRadius:100,maxWidth:80,maxHeight:80}} />
                        <View style={{paddingLeft:20}}>
                            <Text style={{color:"black",fontWeight:"bold",fontSize:20}}>Laura Camacho</Text>
                            <View style={styles.cajaEstrella}>
                                {image_estrella}
                                {image_estrella}
                                {image_estrella}
                            </View>
                        </View>
                    </View>
                    <View>
                        <Image  source={require('../Imagenes_APP/map2.png')} style={{width:"100%", height:100}} />
                    </View>
                    <View style={styles.cajaViajar}>
                        <DatePicker
                            style={{width: 120}}
                            date={this.state.date}
                            mode="date"
                            placeholder="select date"
                            format="YYYY-MM-DD"
                            minDate={this.state.date}
                            maxDate="2050-12-31"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            customStyles={{
                            dateIcon: {
                                position: 'absolute',
                                left: 0,
                                top: 4,
                                marginLeft: 0
                            },
                            dateInput: {
                                marginLeft: 36
                            }
                            // ... You can check the source to find the other keys.
                            }}
                            onDateChange={(date) => {this.setState({date: date})}}
                            />  
                        
                            <View style={{flexDirection:"row",alignItems:"center"}}>
                                <Icon2 name="clockcircleo" size={25}  color="#FF5252"onPress={this.showDateTimePicker2} />
                                <DateTimePicker
                                isVisible={this.state.isDateTimePickerVisible2}
                                onConfirm={this.handleDatePicked2}
                                onCancel={this.hideDateTimePicker2}
                                mode={'time'}
                                is24Hour={false}
                                />
                                <Text style={{marginLeft:10,color:"#000",fontSize:15}}>{this.state.hora}</Text>
                            </View>
                            <View>
                                <Button
                                onPress={()=>onClickViajar2()}
                                title="Viajar"
                                color="#FE0000"
                                accessibilityLabel="Learn more about this purple button"
                                />
                            </View>
                        
                    </View>
                </View>
                <View style={styles.caja} >
                    <View style={styles.cajaDatos}>
                        <Image  source={require('../Imagenes_APP/fernando.png')} style={{borderRadius:100,maxWidth:80,maxHeight:80}} />
                        <View style={{paddingLeft:20}}>
                            <Text style={{color:"black",fontWeight:"bold",fontSize:20}}>Fernando Lozada</Text>
                            <View style={styles.cajaEstrella}>
                                {image_estrella}
                                {image_estrella}
                                {image_estrella}
                                {image_estrella}
                                {image_estrella}
                            </View>
                        </View>
                    </View>
                    <View>
                        <Image  source={require('../Imagenes_APP/map2.png')} style={{width:"100%", height:100}} />
                    </View>
                    <View style={styles.cajaViajar}>
                        <DatePicker
                            style={{width: 120}}
                            date={this.state.date}
                            mode="date"
                            placeholder="select date"
                            format="YYYY-MM-DD"
                            minDate={this.state.date}
                            maxDate="2050-12-31"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            customStyles={{
                            dateIcon: {
                                position: 'absolute',
                                left: 0,
                                top: 4,
                                marginLeft: 0
                            },
                            dateInput: {
                                marginLeft: 36
                            }
                            // ... You can check the source to find the other keys.
                            }}
                            onDateChange={(date) => {this.setState({date: date})}}
                        />
                            <View style={{flexDirection:"row",alignItems:"center"}}>
                                <Icon2 name="clockcircleo" size={25}  color="#FF5252"onPress={this.showDateTimePicker3} />
                                <DateTimePicker
                                isVisible={this.state.isDateTimePickerVisible3}
                                onConfirm={this.handleDatePicked3}
                                onCancel={this.hideDateTimePicker3}
                                mode={'time'}
                                is24Hour={false}
                                />
                                <Text style={{marginLeft:10,color:"#000",fontSize:15}}>{this.state.hora}</Text>
                            </View> 
                            <View>
                                <Button
                                onPress={()=>onClickViajar3()}
                                title="Viajar"
                                color="#FE0000"
                                accessibilityLabel="Learn more about this purple button"
                                />
                            </View>
                        
                    </View>
                </View>
            </View>
        </ScrollView>
    )
    }
}


const styles = StyleSheet.create({
    container:{
        alignItems:"center",
        
    },
    cajaViajar:{
        flexDirection:"row",
        justifyContent:"space-between",
        paddingTop:5
    },
    txtInp:{
        
        borderRadius:8,
        borderWidth:1,
        marginBottom:11,
        borderLeftWidth: 5, 
        borderLeftColor: "#FE0000",
        borderRightWidth:5,
        borderRightColor:"#FE0000",
       
        color:"#757575"
    },
    caja:{
        padding:5, 
        borderBottomWidth: 2, 
        borderBottomColor: "#000",
        borderRadius:10,
        marginBottom:10,
        width:"100%"
    },
    cajaEstrella:{
        flexDirection:"row"
    },
    txtTitulo:{
        fontWeight:"bold",
        color:"#212121",
        fontSize:15,
        marginBottom:5
    },
    txtSub:{
        color:"#757575",
        fontSize:15,
        marginBottom:5
    },
    cajaDatos:{
       flexDirection:"row"
    },
    cajaImg:{
        padding:2
    }
})
export default BoxDriver