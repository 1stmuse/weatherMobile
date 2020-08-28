import React from 'react';
import {View, Text, Image, StyleSheet, Dimensions} from 'react-native'

import icon from '../assets/favicon.png'

const {width, height} =Dimensions.get('window')

const Main = ({info, data}) => {

    return (
        <View style={styles.cont} >
           <View style={styles.city} >
               <View style={styles.tempFlex} >
                    <Text style={styles.cityTemp} >{info.temp} </Text>
                    <Text style={styles.tempN} >0</Text>
               </View>
           </View>
           <View style={{alignItems:'center'}} >
               <Image source={require('../assets/favicon.png')} style={styles.img} />
           </View>
        </View>
    );
};

export default Main;

const styles = StyleSheet.create({
    cont: {
      flex: 1,
      width
    },
    city:{
        alignItems:'center',
        justifyContent:'space-between',
        height:height/3
    },
    tempFlex:{
        flexDirection:"row",
        justifyContent:'center',
        alignItems:'center'
        // borderColor:'blue',
        // borderWidth:1,
    },
    cityTemp:{
        fontSize:150,
        textAlign:'right',
        // marginLeft:40
    },
    tempN:{
        fontSize:40,
        paddingBottom:35,
        marginLeft:-50,
        alignSelf:'flex-end'
    },
    img:{
        width:150,
        height:150
    },
  });