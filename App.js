import { StatusBar } from 'expo-status-bar';
import React, {useRef, useEffect, useState} from 'react';
import { StyleSheet,View,Text, Dimensions, Animated, Alert,Platform, Linking } from 'react-native';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import * as IntentLauncher from 'expo-intent-launcher';
import Splashscreen from 'react-native-splash-screen'
import {Bars, Pulse, Bubbles, DoubleBounce} from 'react-native-loader'

import Main from './components/Main'
import {Days} from './components/Days'
import icon from './assets/favicon.png'
import ShowDays from './components/ShowDays'
const {width, height} =Dimensions.get('window')
const colors =['#DCB0FF', '#845EC2', '#410063','#4E8397','#54003b','#008B74','#008E9B',]

const App = () => {
  const scrollX = useRef(new Animated.Value(0)).current
  const [weather, setWeather] = useState([])
  const [load, setLoad]= useState(false)
  const [whr, setWhr] = useState('')

  const getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      Alert.alert("alert Message", "allow location", [
        {
          text: 'Open Settings',
          onPress: () => goToSettings(),
          style: 'cancel',
        } 
      ]);
    }else{
      try{
        let location = await Location.getCurrentPositionAsync({});
        setLoad(true)
        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${location.coords.latitude}&lon=${location.coords.longitude}&exclude=hourly,current,minutely&appid=1ffd27ee8105ee9ec0924dc6ed83867b`)
        .then(res=>res.json())
        .then(data=>{
          setWeather(data.daily.splice(0,7))
          setWhr(data.timezone)
          setLoad(false)
        })
        .catch(err=>{
          if(err){
            Alert.alert('error', 'cannot seem to connect to the internet')
          }
        })
      }catch(e){
        Alert.alert("Oooopppsss", "you have to allow loaction", [
          {
            text: 'Open Settings',
            onPress: () => goToSettings(),
            style: 'cancel', 
          }
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
    Splashscreen.hide()
  })

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
         key={index} 
         data={item} 
         index={index}
         whr={whr}
        x={scrollX} />
  )

  if(weather.length === 0){
    return (
      <View style={{flex:1, justifyContent:'center', alignItems:'center', backgroundColor:'black'}} >
        <Bars size={20} color='white'/>
        <StatusBar style='inverted' />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <StatusBar style='inverted' />
      <ColorBg x={scrollX} />
      <View style={styles.cityName} ><Text style={{fontSize:40, color:'white'}} >{whr.split('/')[1]} </Text></View>
      <View style={{height:height/1.6}} >
        <Animated.FlatList 
        scrollEventThrottle={16}
         horizontal
         data={weather}
         renderItem={renderWe}
         pagingEnabled
         keyExtractor={item=> `${item.dt}`}
         showsHorizontalScrollIndicator={false}
         onScroll={Animated.event(
           [{nativeEvent:{contentOffset:{x:scrollX}}}],
           {useNativeDriver:true}
         )}
        />
      </View>
      <View style={styles.txtView} >
        <View style={styles.center} >
          <ShowDays dat={weather}  x={scrollX} />
        </View>
      </View>
      <View style={styles.abso}>
        <Days data={weather} icon={icon} x={scrollX} />
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
    bottom:15,
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
    marginBottom:10,
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
