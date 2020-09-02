import { StatusBar } from 'expo-status-bar';
import React, {useRef, useEffect} from 'react';
import { StyleSheet,View,Text, Dimensions, Animated, Alert,Platform, Linking } from 'react-native';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import * as IntentLauncher from 'expo-intent-launcher';

import Main from './components/Main'
import {Days} from './components/Days'
import icon from './assets/favicon.png'
import {datas} from './data.js'
import ShowDays from './components/ShowDays'
const {width, height} =Dimensions.get('window')
const colors =['#d4fc79', '#1dccb5', '#b15ae0','#ffbe0a','#c9327e','#f0590e','#5f58cc',]

const App = () => {
  const scrollX = useRef(new Animated.Value(0)).current
  console.log('praisss00')
  const getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      Alert.alert("alert Message", "Instructions based on OS", [
        {
          text: 'Open Settings',
          onPress: () => goToSettings(),
          style: 'cancel',
        },
        { onPress: () => navigation.goback()},
      ]);
    }else{
      try{
        let location = await Location.getCurrentPositionAsync({});
        console.log(location)
      }catch(e){
        Alert.alert("alert Message", "Instructions based on OS", [
          {
            text: 'Open Settings',
            onPress: () => goToSettings(),
            style: 'cancel',
          },
          { onPress: () => navigation.goback()},
        ]);
      }
    } 
  } 
  const goToSettings = () => {
    if (Platform.OS == 'ios') {
      // Linking for iOS
      Linking.openURL('app-settings:');
    } else {
      // IntentLauncher for Android
      IntentLauncher.startActivityAsync(
        IntentLauncher.ACTION_LOCATION_SOURCE_SETTINGS
      );
    }
  };
  useEffect(()=>{
    getLocationAsync()
},[])

  const ColorBg=({x})=>{
    return (
      <View style={[StyleSheet.absoluteFillObject, styles.BG]} >
        {colors.map((color, ind)=>{
          const inputRange = [(ind -1)* width, ind *width, (ind+1)*width]
          const scale = x.interpolate({
            inputRange,
            outputRange:[0,1,0],
            extrapolate:'clamp'
          })
          return <Animated.View style={[styles.bgColor, {backgroundColor:color, opacity:scale}]} key={ind} />
       })}
      </View>
    )
  }
  const renderWe=({item, index})=>(
    <Main 
      info={item} 
         key={item.id} 
         data={datas.data} 
         index={index}
    x={scrollX} />
  )
  return (
    <View style={styles.container}>
      <StatusBar style='auto' hidden/>
      <ColorBg x={scrollX} />
      <View style={styles.cityName} ><Text style={{fontSize:20}} >{datas.country} </Text></View>
      <View style={{height:height/1.6}} >
        <Animated.FlatList 
        scrollEventThrottle={16}
         horizontal
         data={datas.data}
         renderItem={renderWe}
         pagingEnabled
         keyExtractor={item=>item.id}
         showsHorizontalScrollIndicator={false}
         onScroll={Animated.event(
           [{nativeEvent:{contentOffset:{x:scrollX}}}],
           {useNativeDriver:true}
         )}
        />
      </View>
      <View style={styles.txtView} >
        <View style={styles.center} >
          <ShowDays dat={datas.data}  x={scrollX} />
        </View>
      </View>
      <View style={styles.abso}>
        <Days data={datas.data} icon={icon} x={scrollX} />
      </View>
    </View>
  );
}

export default App

const styles = StyleSheet.create({
  container: {
    // backgroundColor:'#16c2c2',
    flex: 1,
    paddingTop:50,
  },
  abso:{
    // flex:1,
    position:'absolute',
    width:width,
    bottom:20,
  },
  center:{
    width:width/2,
    overflow:'hidden'
  },
  txtView:{
    width,
    alignItems:'center'
  },
  cityName:{
    alignItems:'center',
    marginBottom:20
},
BG:{
  justifyContent:'center',
  alignItems:'center'
},
bgColor:{
  width,
  height,
  position:'absolute'
}
});
