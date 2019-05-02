import React, {Component} from 'react'
import {Animated,Image,AsyncStorage,StyleSheet,View,Text,TextInput,StatusBar,Button,ScrollView,Dimensions,BackHandler,Alert,TouchableOpacity,Keyboard} from 'react-native'
import MapView,{PROVIDER_GOOGLE,Polyline,Marker} from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import PolyLine from '@mapbox/polyline'
import apiKey from '../google_api_key'
import Icon from 'react-native-vector-icons/FontAwesome5' //Ionicons
import Icon2 from 'react-native-vector-icons/Ionicons' //Ionicons

import {getViajes} from "../apiClient"
import CmpHeader from './staticComponent/Header'
import ListViajes from './ListViajes'
const {width,height} = Dimensions.get('window')
const SCREEN_HEIGHT = height;
const SCREEE_WIDTH = width;
const ASPECT_RATIO = width/height
const LATTITUDE_DELTA = 0.015
const LONGITUDE_DELTA = LATTITUDE_DELTA * ASPECT_RATIO
export default class ViewRegistros extends Component{
    constructor(props){
        super(props)
        this.state={
            error: "",
            latitude: 0,
            longitude:0,
            initialPosition:{
                latitude: 0,
                longitude: 0,
                latitudeDelta: 0,
                longitudeDelta: 0,
            },
            markerPosition:{
                latitude:0,
                longitude:0
            },
            pointsCoords:[],
            destination:"",
            predictions:[],
            textDistancia:'',
            textTiempo:'',
            valueDistancia:0,
            tarifa:0,
            nombreUsuario:"",
            dataViajes:[],
            visibleViajes:false,
            visibleChat:false
        }
    }
  

    async getRouteDirections(destinationPLaceId,destinatioName){
        
        try{
            const response = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${this.state.latitude},${this.state.longitude}&destination=place_id:${destinationPLaceId}&key=${apiKey}`)
            const json = await response.json()
            let distancia_txt =json.routes[0].legs[0].distance.text
            let tiempo_txt = json.routes[0].legs[0].duration.text
            let value_distancia = json.routes[0].legs[0].distance.value
            let tarifa_calculada = (value_distancia * 1) /1 
         
            this.setState({textDistancia:distancia_txt,textTiempo:tiempo_txt,tarifa:tarifa_calculada})
            const points = PolyLine.decode(json.routes[0].overview_polyline.points)
            const pointsCoords = points.map(point=>{
                return {latitude:point[0],longitude:point[1]}
            })
            this.setState({pointsCoords,predictions:[],destination:destinatioName})
            Keyboard.dismiss()
            this.map.fitToCoordinates(pointsCoords)
        }catch(error) {
         console.log(error)
        }
        

    }
    async onChangeDestination (destination){
        this.setState({destination})
        const apiUrl =`https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${apiKey}
        &input=${destination}&location=${this.state.latitude},${
          this.state.longitude
        }&radius=2000`
        try{
            const response = await fetch(apiUrl)
            const json = await  response.json()
          
            this.setState({predictions:json.predictions})
        }catch(error){
            console.log(error)
        }
    }

  


    watchID: ?number = null
    componentDidMount(){
         navigator.geolocation.getCurrentPosition(
            position => {
              this.setState({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
              });
              this.getRouteDirections()
            },
            error => this.setState({ error: error.message }),
            { enableHighAccuracy: true, maximumAge: 2000, timeout: 20000 }
          );

            try{
                var nombreDB = this.props.navigation.state.params.nombreDB 

            }catch(error)
            {
                
            }
            try{
            let guardarNombre = async()=>{
                const guardoEstado= await this.setState({nombreUsuario:nombreDB})
                getViajes(this.state.nombreUsuario)
                .then(res =>{
                    console.log(res)
                    this.setState({dataViajes:res})
                })
            }
            guardarNombre();
        } catch{

        }
           
                
        /*
          Nos permite obtener la region inicial y colocar un markador en esa posición
        navigator.geolocation.getCurrentPosition((position)=>{
            var lat = parseFloat(position.coords.latitude)
            var long = parseFloat(position.coords.longitude)

            var initialRegion ={
                latitude: lat,
                longitude: long,
                latitudeDelta: LATTITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
            }
            this.setState({initialPosition:initialRegion})
            this.setState({markerPosition:initialRegion})
        },(error)=>alert(JSON.stringify(error)),
        {enableHighAccuracy:true,timeout:20000,maximumAge:1000})
        */
        /*
          NOS SIRVE PARA OBTENER LA ULTIMA GEOLOCALIZACION QUE SE DETECTO
        this.watchID = navigator.geolocation.watchPosition((position)=>
        {
            var lat= parseFloat(position.coords.latitude)
            var long = parseFloat(position.coords.longitude)

            var lastRegion ={
                latitude: lat,
                longitude: long,
                latitudeDelta: LATTITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
            }
            this.setState({initialPosition:lastRegion})
            this.setState({markerPosition:lastRegion})
        })*/
    }

    componentWillMount(){
        
        navigator.geolocation.clearWatch(this.watchID)
        BackHandler.addEventListener('hardwareBackPress', this.backButtonClick);
    }
    componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.backButtonClick);
    }
    backButtonClick() {
    Alert.alert(
        "Confirme",
        "¿Desea salir de la aplicación?",
        [{
            text: 'No',
            onPress: () => {
            return false
            }
        },
        {
            text: 'Si, cerrar',
            onPress: () => BackHandler.exitApp()
        },
        ], {
        cancelable: false
        },
    )

    return true;

    }

    onClickViajesPendientes = ()=>{
        this.setState((prevState, prevProps) => ({
            visibleViajes: !prevState.visibleViajes
        }))

    }
    onClickChats = ()=>{
        this.setState((prevState, prevProps) => ({
            visibleChat: !prevState.visibleChat
        }))
    }
    render(){
        onClickConfirmar=()=>{
            Alert.alert(
                'Atención',
                'Desea confirmar su Viaje',
                [   
                    {
                        text: 'No',
                        onPress: () => {
                        return false
                        }
                    },
                    {
                        text:'Si',
                        onPress:()=> this.props.navigation.push('Conductores',{distancia:this.state.textDistancia,tiempo:this.state.textTiempo,tarifa:this.state.tarifa.toString(),nombreUsuario:this.state.nombreUsuario,destino:this.state.destination})
                    }
                ],{
                    
                    cancelable:false
                }
            )
         
        }
        /*
        
        <MapView
                         provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                        style={styles.map}
                        region={{
                            latitude: 37.78825,
                            longitude: -122.4324,
                            latitudeDelta: 0.015,
                            longitudeDelta: 0.0121,
                        }}
                        >
                        <MapView.Marker
                        coordinate={{
                            latitude: 37.78825,
                            longitude: -122.4324,
                        }}
                        title="My Location"
                        description="Here I am."
                        />
                        </MapView>



                        <MapView
                        rotateEnabled={false}
                        showsCompass={true}
                       ....<<<<< showsUserLocation={true}
                        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                        style={styles.map}
                        region={{
                            latitude: 4.6097100,
                            longitude: -74.0817500,
                            latitudeDelta: 0.015,
                            longitudeDelta: 0.0121,
                        }}(
                        >
                        </MapView>

        */

       let IconoCarro = <Icon  name={"car-alt"}  color={"#FE0000"} size={20}/>
       let IconoAdd = <Icon2 name={"ios-add-circle"} color={"#FE0000"} size={40} />
       let marker = null                     
       let btn = null
       if(this.state.pointsCoords.length > 1){
        marker = (<Marker coordinate ={this.state.pointsCoords[this.state.pointsCoords.length-1]} />)
        btn = (<View style={{borderColor:"#000",borderWidth:1,borderRadius:10,margin:5,width:"95%",marginBottom:5,justifyContent:"space-between"}}>
                <View style={{padding:5,flexDirection:"row"}}>
                        <View style={{justifyContent:"center",alignItems:"center",flexDirection:"row"}} >
                            {IconoCarro}
                            <Text style={{marginLeft:5,color:"#000",fontWeight: "300",fontSize:30,fontFamily:"LeckerliOne-Regular"}}>My Rute</Text>
                         
                        </View>
                        
                        <View style={{flex:1,alignItems:"flex-end",justifyContent:"center"}}>
                            <Text style={{color:"#000",fontSize:25,fontWeight:"bold",marginTop:30}}> ${this.state.tarifa}</Text>
                        </View>
                </View>
                <View style={{marginLeft:9,paddingBottom:3}}>
                       <Text style={{color:"#000"}}>Destino a<Text style={{color:"#000",fontWeight:"bold"}}> {this.state.textDistancia}</Text></Text>
                       <Text style={{color:"#000"}}>Tiempo de viaje<Text style={{color:"#000",fontWeight:"bold"}}> {this.state.textTiempo}</Text></Text>
                </View>
                <View style={styles.btn}>
                            <Button
                            onPress={()=>onClickConfirmar()}
                            title="Confirmar"
                            color="#FE0000"
                            accessibilityLabel="Learn more about this purple button"
                            />
                        </View>
               </View>)
       }
       const predictions = this.state.predictions.map(prediction => (
        <TouchableOpacity onPress={()=>this.getRouteDirections(prediction.place_id,prediction.structured_formatting.main_text)} key={prediction.id}>
            <View>
                <Text style={styles.suggestions}>
                    {prediction.description}
                </Text>
            </View>
        </TouchableOpacity>
      ));

        let viajes = null
        let chat =  null
        console.log(this.state.dataViajes)
        if(this.state.visibleViajes === true)
        {
            viajes =(<View style={{position:"absolute",bottom:50,flex:1,backgroundColor:"rgba(255,255,255,.7)",height:"50%",width:"100%"}}>
                            <Text style={styles.txtTitulo} >VIAJES ASIGNADOS</Text>                   
                            <ListViajes  viajes={this.state.dataViajes.usuarioDb} /> 
                         
                        </View>)
        }
        
        if(this.state.visibleChat === true){
            chat = (
                <View style={{position:"absolute",bottom:50,flex:1,backgroundColor:"rgba(255,255,255,.7)",height:"90%",width:"100%",justifyContent:"center",alignItems:"center"}}>
                    <Text style={{color:"#000",fontWeight:"bold",fontSize:20}}>Aun no tienes chats</Text>
                    {IconoAdd}
                </View>
            )
        }

        return(
                <View style={styles.container2}>
                    <StatusBar backgroundColor="#D32F2F" barStyle="dark-content" />
                    
                    <View style={styles.container}>
                        <MapView
                            ref={map =>{

                                this.map = map;
                            }}
                            region={{
                                latitude:this.state.latitude,
                                longitude:this.state.longitude,
                                latitudeDelta:LATTITUDE_DELTA,
                                longitudeDelta:LONGITUDE_DELTA
                            }}
                            style={styles.map}
                            showsUserLocation={true}
                            >

                            <Polyline
                            coordinates={this.state.pointsCoords}
                            strokeWidth={3}
                            strokeColor="#FF5252"
                            /> 
                            {marker}
                        </MapView>
                        <TextInput
                        placeholder="Ingrese su Destino..."
                        style={styles.destinationInput}
                        value={this.state.destination}
                        onChangeText={destination => this.onChangeDestination(destination)}
                        />
                    </View>
                    {predictions}
                    
                    <View style={{position:"absolute", bottom:0,backgroundColor:"#fff",flex:1, width:"100%",alignItems:"center",zIndex:2}}>
                        {btn}
                      
                    </View>
                    <TouchableOpacity  onPress={()=>{this.onClickViajesPendientes()}} style={{width:"50%",position:"absolute",bottom:0,zIndex:1}}>
                        <View style={{backgroundColor:"#fff"}}>
                            <View style={{flexDirection:"row",alignItems:"center",justifyContent:"center",width:"100%"}}>
                                <Image  source={require('../Imagenes_APP/viaje3.png')} style={{maxHeight:60,maxWidth:60}} />
                                <Text style={{fontSize:20,color:"#000",fontWeight:"bold"}}>{this.state.dataViajes.contador}</Text>
                               
                            </View>
                        </View>
                    </TouchableOpacity>
                    
                    <TouchableOpacity  onPress={()=>{this.onClickChats()}} style={{width:"50%",position:"absolute",bottom:0,right:0,zIndex:1}}>
                        <View style={{backgroundColor:"#fff"}}>
                            <View style={{flexDirection:"row",alignItems:"center",justifyContent:"center",width:"100%"}}>
                                <Image  source={require('../Imagenes_APP/chat.png')} style={{maxHeight:60,maxWidth:60}} />
                            </View>
                        </View>
                    </TouchableOpacity>
                    {viajes}
                    {chat}
                </View>
        )
    }
}

const styles = StyleSheet.create({
    container2:{
        flex:1,
        justifyContent:"center",
        backgroundColor:"#fff"
    },
    contentContainer:{
        backgroundColor:"#fff",
        flexGrow:1,
        paddingBottom:10
    },
    container: {
        ...StyleSheet.absoluteFillObject,
    
      },
      map: {
        ...StyleSheet.absoluteFillObject,
      },
      btn:{
        width:"100%",
        padding:10
    },
      destinationInput: {
        marginTop:10,
        height: 40,
        borderWidth: 0.5,
        marginLeft: 5,
        marginRight: 5,
        padding: 5,
        backgroundColor: "white",
        borderRadius:10,
      },
      suggestions:{
      
        backgroundColor: "white",
        padding: 5,
        fontSize: 14,
        borderWidth: 0.5,
        marginLeft: 5,
        marginRight: 5,
        borderRadius:5
      },
      txtTitulo:{
        fontSize:20,
        color:"#000",
        textAlign:"center",
        padding:5,
        fontWeight:"bold"
    }
})
