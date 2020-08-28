import { StatusBar } from 'expo-status-bar';
import React, {useRef} from 'react';
import { StyleSheet,View,FlatList,Text, Dimensions, Animated } from 'react-native';

import Main from './components/Main'
import {Days} from './components/Days'
import icon from './assets/favicon.png'
import {datas} from './data.js'
import ShowDays from './components/ShowDays'
const {width, height} =Dimensions.get('window')

const App = () => {
  const scrollX = useRef(new Animated.Value(0)).current
  const ind = datas.data.map((dat,ind)=>{
    return ind
  })
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
      <StatusBar style='auto' />
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
        <Days data={datas.data} icon={icon} />
      </View>
    </View>
  );
}

export default App

const styles = StyleSheet.create({
  container: {
    backgroundColor:'#16c2c2',
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
});
