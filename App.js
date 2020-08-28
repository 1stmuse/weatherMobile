import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet,View,FlatList,Text, Dimensions } from 'react-native';

import Main from './components/Main'
import {Days} from './components/Days'
import icon from './assets/favicon.png'
import {datas} from './data.js'

const {width, height} =Dimensions.get('window')

const App = () => {

  const renderWe=({item})=>(
        <Main info={item} key={item.id} data={datas.data} />
  )

  return (
    <View style={styles.container}>
      <StatusBar style='auto' />
      <View style={styles.cityName} ><Text style={{fontSize:20}} >{datas.country} </Text></View>
      <View style={{height:height/1.6}} >
        <FlatList 
         horizontal
         data={datas.data}
         renderItem={renderWe}
         pagingEnabled
         keyExtractor={item=>item.id}
         showsHorizontalScrollIndicator={false}
        />
      </View>
      <View style={styles.txtView} >
        <View style={styles.hidText}>
          {datas.data.map(dat=>{
            return <Text style={styles.txt}>{dat.day} </Text>
         })}
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
  hidText:{
    flexDirection:'row',
    width:width/2,
    overflow:'hidden',

  },
  txtView:{
    width,
    alignItems:'center'
  },
  txt:{
    textAlign:'center',
    width:'100%',
    fontSize:20,
    textTransform:'uppercase'
  },
  cityName:{
    alignItems:'center',
    marginBottom:20
},
});
