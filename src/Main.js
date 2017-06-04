import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Platform,
  UIManager,
  AsyncStorage,
  LayoutAnimation
} from 'react-native';


import Login from "./screen/Login";
import Home from "./screen/Home";

var STORAGE_KEY = 'tokenAuth';

export default class Main extends Component {
 

  constructor(props) {
    super(props);
    this.state = {loggedIn: false, loading: true,};
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

  componentWillMount() {
   console.disableYellowBox = true
    this._loadInitialState().done();
  }

  login(){
    console.log("logging in... ");
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);


    this.setState({
        loggedIn: true,
        loading: false
    });
  }

  _loadInitialState = async () => {
    try {
      var value = await AsyncStorage.getItem(STORAGE_KEY);
      if (value !== null){
        LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
        this.setState({loggedIn: true, loading:false});
        console.log('KETEMU');
      } else {
        this.setState({loggedIn: false, loading:false});
        console.log('NOT KETEMU');

      }
    } catch (error) {
    }
  };
  render() {
    if(this.state.loggedIn === false && this.state.loading == true ){
      return (
          <View><Text>AgNJAY</Text></View>
        );
    } else if(this.state.loggedIn === false && this.state.loading == false){
        return (
          <Login login={this.login.bind(this)} registered={this.state.loggedIn} ></Login>
        );
    } else if(this.state.loggedIn === true && this.state.loading == false){
        return (
          <Home></Home>
        );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

