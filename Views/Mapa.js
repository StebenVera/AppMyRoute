import React, {Component} from 'react'
import {StyleSheet,View,Text,TextInput,StatusBar,Button,ScrollView,Dimensions,BackHandler,Alert,TouchableOpacity,Keyboard} from 'react-native'
import MapView,{PROVIDER_GOOGLE,Polyline,Marker} from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import PolyLine from '@mapbox/polyline'
import apiKey from '../google_api_key'
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
            predictions:[]
        }
    }
  

    async getRouteDirections(destinationPLaceId,destinatioName){
        
        try{
            const response = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${this.state.latitude},${this.state.longitude}&destination=place_id:${destinationPLaceId}&key=${apiKey}`)
            const json = await response.json()
            console.log(json)
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
    render(){
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
                        showsUserLocation={true}
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
       let marker = null                     
       if(this.state.pointsCoords.length > 1){
        marker = (<Marker coordinate ={this.state.pointsCoords[this.state.pointsCoords.length-1]} />)
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
        
        return(
                <View style={styles.container2}>
                    <StatusBar backgroundColor="#D32F2F" barStyle="light-content" />
                   
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
      }
})
