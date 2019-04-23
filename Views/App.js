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
import {Stack,Scene, Router} from 'react-native-router-flux'
import SplashScreen from 'react-native-splash-screen'


export default class App extends Component {
  render() {
    return (
      <Router>
          
          <Stack  key="root" > 
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
