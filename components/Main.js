import React from 'react';
import {View, Text, Image, StyleSheet,Animated, Dimensions} from 'react-native'

import icon from '../assets/favicon.png'

const {width, height} =Dimensions.get('window')

const Main = ({info, index,x}) => {
    const inputRange = [(index-1)*width, index *width, (index +1)* width]
    const scale = x.interpolate({
        inputRange,
        outputRange:[0,1,0],
    })
    return (
        <Animated.View style={styles.cont} >
           <View style={styles.city} >
                   <Animated.View style={[styles.tempFlex, {transform:[{scale}]}]} >
                    <Text style={styles.cityTemp} >{info.temp} </Text>
                    <Text style={styles.tempN} >0</Text>
               </Animated.View>
           </View>
           <View style={{alignItems:'center'}} >
               <Animated.Image source={require('../assets/favicon.png')} 
                 style={[styles.img, {transform:[{scale}]}]} />
           </View>
        </Animated.View>
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