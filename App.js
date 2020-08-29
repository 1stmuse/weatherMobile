import { StatusBar } from 'expo-status-bar';
import React, {useRef} from 'react';
import { StyleSheet,View,Text, Dimensions, Animated } from 'react-native';

import Main from './components/Main'
import {Days} from './components/Days'
import icon from './assets/favicon.png'
import {datas} from './data.js'
import ShowDays from './components/ShowDays'
const {width, height} =Dimensions.get('window')
const colors =['16c2c2', '#1dccb5', '#b15ae0','#ffbe0a','#c9327e','#f0590e','#5f58cc', '#5f58cc']

const App = () => {
  const scrollX = useRef(new Animated.Value(0)).current

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
          return <Animated.View style={[styles.bgColor, {backgroundColor:color}]} key={ind} />
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
        bounces
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
    bottom:30,
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
  width,
  justifyContent:'center',
  // backgroundColor:'red',
  alignItems:'center',
  flexDirection:'row',
  overlayColor:'hidden'
},
bgColor:{
  width:'300',
  height,
  // position:'absolute'
}
});
