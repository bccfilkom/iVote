import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  LayoutAnimation,
  TouchableWithoutFeedback
} from 'react-native';

let { height, width } = Dimensions.get("window");

export default class VoteCanvas extends Component {
     constructor(props) {
        super(props);
        this.state = {
            buttonColor: '#00E676',
            
        };
    }
    votingFunc = () => {
        if(this.props.vote == 1){
            this.props.changeVote(1);

        } else {
            this.props.changeVote(0);

        }
    }
    render() {
        return (
            <View style={styles.container}>
                 <Text style={styles.textStyle}>{this.props.nama}</Text>
                 <TouchableWithoutFeedback onPress={this.votingFunc}>
                    <View>
                        <Image 
                        source={this.props.source}
                        style={styles.imageStyle}/>

                        <View style={styles.buttonContainer}>

                            
                                <View style={{
                                    height:32,
                                    width:81,
                                    borderRadius:16,
                                    backgroundColor:this.props.clr,
                                    justifyContent: 'center',
                                    zIndex:99,
                                    alignSelf: 'center'
                                }}>
                                    <Text style={styles.buttonText}>VOTE</Text>
                            </View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </View>
           

        );
    }

}

const styles = StyleSheet.create({
 container :{
    width:153.16,
    height:212.79,
    justifyContent: 'center',
 },
 imageStyle: {
    width:153.16,
    height:212.79,
    resizeMode: 'cover',
    borderRadius:9,
    zIndex:98,
 },
 textStyle: {
    alignSelf: 'center',
    marginBottom:10,
    fontSize:12,
    color:'#505050',
    fontFamily: 'Raleway-Bold',
 },
 buttonContainer: {
    marginTop:-16,
    justifyContent: 'center',
    flexDirection: 'row'


 },

 
 buttonText: {
    alignSelf: 'center',
    fontSize:13,
    color:'#FFF',
    fontFamily: 'Raleway-ExtraBold',

 }
  
});