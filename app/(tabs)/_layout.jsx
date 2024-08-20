import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import Entypo from '@expo/vector-icons/Entypo';
import {Colors} from '../../constants/Colors'

export default function TabLayout() {
  return (
  <Tabs screenOptions={{
    headerShown:false,
    tabBarActiveTintColor: Colors.yellow,

  }}>
    <Tabs.Screen name='MyTrip'
    options={{
      title:'My Trip',
      tabBarIcon:({color})=><Entypo name="location" size={24} color={color} />

    }}  
    
    />
    <Tabs.Screen name='Discover'   options={{
      title:'Discover',
      tabBarIcon:({color})=><Entypo name="globe" size={24} color={color} />

    }}  />
    <Tabs.Screen name='Profile' options={{
      tabBarIcon:({color})=><Entypo name="user" size={24} color={color} />
    }} />
  </Tabs>
  )
}