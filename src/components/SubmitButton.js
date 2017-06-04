import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  LayoutAnimation,
  TouchableOpacity
} from 'react-native';

let { height, width } = Dimensions.get("window");

export default class SubmitButton extends Component {
    submit(){
        this.props.voting();
    }
    render() {
        return (
            <TouchableOpacity onPress={this.submit.bind(this)}>
            <View style={{
                marginTop:40,
                height:32,
                width:124,
                borderRadius:16,
                backgroundColor:'#00E676',
                justifyContent: 'center',
                alignSelf: 'center'
            }}>
                 <Text style={styles.buttonText}>SUBMIT</Text>
            </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
 
 
 buttonText: {
    alignSelf: 'center',
    fontSize:13,
    color:'#FFF',
    fontFamily: 'Raleway-ExtraBold',

 }
  
});