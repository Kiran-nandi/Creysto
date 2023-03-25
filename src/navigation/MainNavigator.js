import React from "react";
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
  } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Sidebar from "../screens/Sidebar";
import CreateOrder from "../screens/CreateOrder";
import StackNavigator from './StackNavigator'

  const MainNavigator = () => {
    return (
      <StackNavigator />
    )
  }

  export default MainNavigator;