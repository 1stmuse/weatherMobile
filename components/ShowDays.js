import React from 'react'
import {View, Text, StyleSheet, Dimensions, Animated,} from 'react-native'
import { datas } from '../data'

const {width, height} =Dimensions.get('window')

const ShowDays=({dat, x})=>{
   const inputRange = [-width, 0, width]
   const moveX= x.interpolate({
       inputRange,
       outputRange:[(width/2), 0, -(width/2)]
   })
      return (
          <Animated.View style={[styles.hidText, {transform:[{translateX:moveX}]}]} >
              {dat.map((data, ind)=>(
                  <Text key={ind} style={styles.txt} >{data.day} </Text>
              ))}
          </Animated.View>
      )
  }

  export default ShowDays

  const styles = StyleSheet.create({
    hidText:{
        flexDirection:'row',
        width:width/2,
    
      },
      txt:{
        textAlign:'center',
        width:'100%',
        fontSize:20,
        textTransform:'uppercase'
      },
  })