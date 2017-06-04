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
  LayoutAnimation,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';

let { height, width } = Dimensions.get("window");
import VoteCanvas from "../components/VoteCanvas";
import SubmitButton from "../components/SubmitButton";
var STORAGE_KEY = 'tokenAuth';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nim:'',
            nama:'',
            animating:false,
            validated: false,
            voted: false,
            votingFor: 3,
            clr0:'#3A7AFF',
            clr1:'#3A7AFF',
            accessToken: '',

        };
        this.changeVote = this.changeVote.bind(this);
    }

    componentWillMount() {
        this._loadInitialState().done();
    }

    _loadInitialState = async () => {
        try {
            var value = await AsyncStorage.getItem('tokenAuth');
            if (value !== null){
                this.setState({accessToken: value});
                console.log(value)
            } else {
                
            }

            } catch (error) {
        }
    };
    submitVote(){
        if(this.state.votingFor >= 0 && this.state.votingFor < 2){
            


            fetch('http://45.32.115.11:1404/vote/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': this.state.accessToken,
                },
                body: JSON.stringify({
                nim: this.state.nim,
                vote: this.state.votingFor.toString(),
                })
            })
            .then((response) => {
                if(response.ok) {
                    return response.json();
                }
                else {
                    throw new Error('Something went wrong on api server!');
                }

            })
            .then((response) => {
                ToastAndroid.show(response.msg, ToastAndroid.SHORT);
                LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
                this.setState({
                    validated: false,
                    nim:'',
                    vote: 0,
                    clr0: '#3A7AFF',
                    clr1: '#3A7AFF'

                })
                
            })
            .catch((error) => {
            console.log(error);
            });
        } else {
            ToastAndroid.show('Maaf anda belum memilih', ToastAndroid.SHORT);

        }
    }

    searchNim(){
        if(this.state.nim !== ''){
            ToastAndroid.show('Loading..', ToastAndroid.SHORT);

            fetch('http://45.32.115.11:1404/vote/check', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                nim: this.state.nim,
                })
            })
            .then((response) => {
                if(response.ok) {
                    return response.json();
                }
                else {
                    throw new Error('Something went wrong on api server!');
                }
            })
            .then((response) => {
                LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
                this.setState({
                    validated: true,
                    nama:response.nama,
                })

                              
            })
            .catch((error) => {
                    ToastAndroid.show('Maaf nim tidak ditemukan', ToastAndroid.SHORT);
                  this.setState({animating: !this.state.animating});

            });
        } else {
            ToastAndroid.show('Maaf anda belum memasukan nim', ToastAndroid.SHORT);

        }
    }

    

    changeVote(number){
        if(number==0 && this.state.clr0 == '#3A7AFF'){
            this.setState({
                votingFor: number,
                clr0: '#00E676',
                clr1: '#3A7AFF'
            })
        } else if(number==1 && this.state.clr1 == '#3A7AFF'){
            this.setState({
                votingFor: number,
                clr0: '#3A7AFF',
                clr1: '#00E676'
            })
        } else {
              this.setState({
                votingFor: number,
            })
        }

        if(number == 0){
            ToastAndroid.show('Anda Memilih Ahmad Nizbah Faiz', ToastAndroid.SHORT);

        } else {
            ToastAndroid.show('Anda Memilih Anjas Pramono', ToastAndroid.SHORT);
        }
    }

    render() {
        let mainContent;

        if(this.state.validated == false){
            mainContent = (
                <View style={{
                    padding:15,
                    marginTop:25,
                }}>
                    <Text style={styles.votingName}>Masukan Nim</Text>

                    <TextInput
                        style={styles.inputStyle}
                        onChangeText={(nim) => this.setState({nim})}
                        value={this.state.nim}
                        underlineColorAndroid={'rgba(255, 255, 255, 0)'}
                        keyboardType={'numeric'}

                    />

                    <TouchableOpacity onPress={this.searchNim.bind(this)}>
                    <View style={{
                        marginTop:15,
                        height:32,
                        width:width*0.75,
                        borderRadius:16,
                        backgroundColor:'#00E676',
                        justifyContent: 'center',
                        alignSelf: 'center'
                    }}>
                        <Text style={styles.buttonText}>SUBMIT</Text>
                    </View>
                    </TouchableOpacity>

                </View>
            )
        } else {
            mainContent = (
                <View style={styles.votingContainer}>
                    <Text style={styles.votingName}>{this.state.nama}</Text>
                    <Text style={styles.votingText}>Tentukan Pilihanmu Demi {"\n"}Kelanjutan Angkatan 2016</Text>
                    <View style={{marginTop:30,flexDirection: 'row', justifyContent:'space-between'}}>
                        <VoteCanvas clr={this.state.clr0} vote={0} changeVote={this.changeVote} nama={"Ahmad Nisbah Faiz" }source={require("../assets/1.jpg")}/>
                        <VoteCanvas clr={this.state.clr1} vote={1} changeVote={this.changeVote} nama={"Anjas Pramono"} source={require("../assets/2.jpg")}/>
                    </View>
                    <SubmitButton voting={this.submitVote.bind(this)}/>
                    
                </View>
            )
        }
        return (
            <View style={styles.container}>
                 <StatusBar
                    backgroundColor="blue"
                    barStyle="light-content"
                    hidden={true}
                />
               
                <View style={styles.topContainer}>
                    <Image 
                    source={require('../assets/rtop.png')}
                    style={{width:width,flex:1,resizeMode: 'stretch'}}>
                        <Image 
                        source={require('../assets/logo3.png')}
                        style={{marginTop:8,alignSelf:'center',width:99,height:42,resizeMode: 'stretch'}} />
                    </Image>
                    
                </View>

                <View style={styles.contentContainer}>
                    {mainContent}
                </View>

                <View style={styles.bottomContainer}>
                    <Image 
                    source={require('../assets/rbottom.png')}
                    style={{width:width,flex:1,resizeMode: 'stretch'}} />

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

  topContainer: {
    flex:1.7,
    backgroundColor: '#F5F5F5',
  },
  contentContainer: {
    flex:7.3,
    backgroundColor: '#F5F5F5',
    
  },
  bottomContainer: {
    flex:1,
    backgroundColor: '#FFF',

  },

  inputStyle: {
    backgroundColor:'#FFF',
    height: 40,
    paddingLeft:10,
    paddingRight:10,
    borderRadius:5,

  },

  votingContainer: {
    padding:15,
    flex:1,
    justifyContent: 'center'
  },
  votingName: {
    fontSize:17,
    color:'#505050',
    fontFamily: 'Raleway-SemiBold',
    marginBottom:10,
  },
  votingText: {
    fontSize:17,
    color:'#6E7274',
    fontFamily: 'Raleway-Medium',
    marginBottom:10,
  },

  buttonText: {
    alignSelf: 'center',
    fontSize:13,
    color:'#FFF',
    fontFamily: 'Raleway-ExtraBold',

 }
  
});