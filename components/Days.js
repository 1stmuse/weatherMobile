import React from 'react';
import {View, Text, Image,Animated, StyleSheet, Dimensions} from 'react-native'

const {width, height} =Dimensions.get('window')
export const Days =({data,icon,x})=>{
    
    const inputRange = [-width, 0, width]
    const translateX = x.interpolate({
        inputRange,
        outputRange:[-width/7, 0, width/7]
    })
    return(
    <View>
     <View style={styles.mainFlex} >
     <Animated.View style={[styles.scrollPag, {transform:[{translateX}]}]}/>
        {data.map((dat, index)=>{
            return (
                <View style={styles.scrol} key={dat.id} >
                     {/* <View style={styles.scrol} > */}
                       <Image source={icon} style={{width:30}}/>
                       <Text style={{fontSize:20}} >{dat.temp} </Text>
                     {/* </View> */}
                </View>
            )
        })}
     </View>
    </View>
    )
}

const styles = StyleSheet.create({
    mainFlex:{
        flexDirection:'row',
        justifyContent:'space-between',
        width:width,
        height:'100%',
        // paddingLeft:10,
        position:'relative',
        // borderWidth:1
    },
    scrol:{
        width:width/7,
        justifyContent:'space-between',
        alignItems:'center',
        height:'110%'
        // borderWidth:1,
        // borderColor:'red',
        // marginRight:30
    },
    scrollPag:{
        width:width/7,
        borderRadius:10,
        marginRight:10,
        position:'absolute',
        height:'120%',
        backgroundColor:'#e9e9f5'
    }
})