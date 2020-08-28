import React from 'react';
import {View, Text, Image, StyleSheet, Dimensions} from 'react-native'

const {width, height} =Dimensions.get('window')
export const Days =({data,icon})=>{
    return(
    <View style={styles.mainFlex} >
        {data.map(dat=>{
            return (
                <View style={styles.flexDays} key={dat.id} >
                     <View style={styles.scrol} >
                       <Image source={icon} style={{width:30}}/>
                       <Text>{dat.temp} </Text>
                     </View>
                </View>
            )
        })}
    </View>
    )
}

const styles = StyleSheet.create({
    mainFlex:{
        flexDirection:'row',
        justifyContent:'space-around',
        width:width,
    },
    scrol:{
        width:30,
        borderWidth:1,
        borderColor:'red',
        // marginRight:30
    }
})