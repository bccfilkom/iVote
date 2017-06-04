import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TextInput,
  Image,
  Dimensions,
  Button,
  AsyncStorage,
  Alert,
  ToastAndroid,
  LayoutAnimation
} from 'react-native';

let { height, width } = Dimensions.get("window");


export default class Login extends Component {
    constructor(props) {
            super(props);
                this.state = {
                    translucent: true,
                    username: '',
                    password: '',
                };
    }
    loginFunction(){
        if(this.state.username !== '' && this.state.password !== ''){
            ToastAndroid.show('Loading..', ToastAndroid.SHORT);
            fetch('http://45.32.115.11:1404/api/login', {
                method: 'POST',
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                username: this.state.username,
                password: this.state.password,
                })
            })
            .then((response) => response.json())
            .then((responseJson) => {
            console.log(responseJson)

                if(responseJson.token){
                console.log(responseJson.token)
                try {
                    AsyncStorage.setItem('display_name', responseJson.display_name)
                    AsyncStorage.setItem('tokenAuth', responseJson.token)
                    
                    .then(() => {
                    ToastAndroid.show('Selamat datang, ' + responseJson.display_name, ToastAndroid.SHORT);
                    })
                    .then(() => {
                    this.props.login();
                    })
                    .done()

                } catch (error) {
                    // Error saving data
                }
                } else {
                if(responseJson.msg){
                    ToastAndroid.show(responseJson.msg, ToastAndroid.SHORT);
                }
                }
            })
            .catch((error) => {
                console.error(error);
            });
        } else {
            Alert.alert(
                'Hi, There',
                'Please fill your username and password before submit',
                [
                
                    {text: 'OK', onPress: () => console.log('OK Pressed')},
                ],
                { cancelable: false }
                )

        }

    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar
                    backgroundColor="blue"
                    barStyle="light-content"
                    hidden={true}
                />
                <Image 
                source={require('../assets/logo3.png')}
                style={styles.iconStyle} />
                <View style={styles.inputContainer}>
                    <Text style={styles.textStyle}>Username</Text>
                    <TextInput
                        style={styles.inputStyle}
                        onChangeText={(username) => this.setState({username})}
                        value={this.state.username}
                        underlineColorAndroid={'rgba(255, 255, 255, 0)'}
                    />
                    <Text style={styles.textStyle}>Password</Text>
                    <TextInput
                        style={styles.inputStyle}
                        onChangeText={(password) => this.setState({password})}
                        value={this.state.password}
                        underlineColorAndroid={'rgba(255, 255, 255, 0)'}
                        autoCorrect={false}
                        secureTextEntry={true}
                    />
                    <View style={{marginTop:17}}/>
                    <Button
                    style={styles.buttonStyle}
                    onPress={this.loginFunction.bind(this)}
                    title="Login"
                    color="#039BE5"
                    accessibilityLabel="Learn more about this purple button"
                    />

                </View>
            
                
            </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#F5F5F5',
  },
  iconStyle: {
      alignSelf: 'center',
      resizeMode: 'contain',
      width: width*0.6,
      height: height*0.40,
  },
  inputContainer: {
      padding:25,
  },
  textStyle: {
    fontSize:16,
    marginTop:10,
    marginBottom:10,
    fontFamily: 'Raleway-SemiBold',

  },
  inputStyle: {
    backgroundColor:'#FFF',
    height: 40,
    paddingLeft:10,
    paddingRight:10,
    borderRadius:5,

  },
  buttonStyle: {
    marginTop:15,
  }
});