/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Login from './Login/CmpLogin'
import Splash from './splashScreen'
import Registro from './Registro'
import Mapa from './Mapa'
import {Stack,Scene, Router} from 'react-native-router-flux'


export default class App extends Component {
  render() {
    return (
      <Router>
          
          <Stack  key="root" > 
              <Scene key="mapa" component={Mapa} title="My Rute"  />
              <Scene key="Registro" component={Registro} hideNavBar />
              <Scene key="splah" component={Splash} hideNavBar />
              <Scene key="login" component={Login} hideNavBar  />            
          </Stack>
        
      </Router>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  }
});
