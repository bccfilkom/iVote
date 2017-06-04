import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import Main from "./src/Main";


export default class iVote extends Component {
  render() {
    return (
            <Main> </Main>

    );
  }
}

AppRegistry.registerComponent('iVote', () => iVote);
