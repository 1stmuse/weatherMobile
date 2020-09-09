import React from 'react';
import {View, Text, StyleSheet,Animated, Dimensions} from 'react-native'

const {width, height} =Dimensions.get('window')

const Main = ({info, index,x}) => {
    const inputRange = [(index-1)*width, index *width, (index +1)* width]
    const scale = x.interpolate({
        inputRange,
        outputRange:[-0.6,1,-0.6],
    })
    const opacity = x.interpolate({
        inputRange,
        outputRange:[0,1,0],
    })
    return (
        <Animated.View style={styles.cont} >
           <View style={styles.city} >
                <Animated.View style={[styles.tempFlex, {transform:[{scale}]}]} >
                    <Text style={styles.cityTemp} >{(info.temp.day - 273).toFixed()} </Text>
                    <Text style={styles.tempN} >0</Text>
               </Animated.View>
           </View>
           <View style={{alignItems:'center'}} >
               <Animated.Image source={{uri:`http://openweathermap.org/img/wn/${info.weather[0].icon}@2x.png`}} 
                 style={[styles.img, {transform:[{scale}]}]} />
                 <Animated.Text style={{color:'white', fontSize:20, fontWeight:'bold',opacity}} >{info.weather[0].description} </Animated.Text>
           </View>
        </Animated.View>
    );
};

export default Main;

const styles = StyleSheet.create({
    cont: {
      flex: 1,
      width,
    },
    city:{
        alignItems:'center',
        justifyContent:'space-between',
        height:height/4,
    },
    tempFlex:{
        flexDirection:"row",
        justifyContent:'center',
        alignItems:'center',
    },
    cityTemp:{
        fontSize:150,
        textAlign:'right',
        color:'white'
    },
    tempN:{
        fontSize:40,
        marginLeft:-30,
        paddingTop:30,
        alignSelf:'flex-start',
        color:'white'
    },
    img:{
        width:250,
        height:250,
    },
  });