/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import Login from './Login/CmpLogin'
import Splash from './splashScreen'
import Registro from './Registro'
import Mapa from './Mapa'
import CmpHeader from './staticComponent/Header'
import { createStackNavigator, createAppContainer } from "react-navigation";


const AppNavigator = createStackNavigator({
    Splash:{
      screen: Splash,
      navigationOptions: ({
        header:null
     })
    },
    Login:{
      screen:Login,
      navigationOptions: ({
         header:null
      })
    },
    Regitro:{
      screen:Registro,
      navigationOptions:({
        navigation
      })=>({
         title: "Registro"
      })
    },
    Mapa:{
      screen:Mapa,
      navigationOptions: ({
        navigation
      }) => ({
        title: "My Rute",
        
      }),
    }

},
{ //Se estable n los parametros para la pila de pantallas
  initialRouteName:"Mapa",
  defaultNavigationOptions: {
    header: props => <CmpHeader {...props} />,
    title: "SELECCIONE UNA OPCIÓN",
    headerStyle: {
      backgroundColor: 'transparent',   
      marginLeft: -15,
      width: '100%'
    },
    headerTitleStyle: {
      fontWeight: "300",
      color: "black",
      fontSize: 30,
      fontFamily:"LeckerliOne-Regular"
    },
    headerTintColor: "#fff",
    animationEnabled: true,
    headerLeft: null
  }

})

const AppContainer = createAppContainer(AppNavigator)

export default class App extends Component {
  render() {
    return <AppContainer />;
  }
}

