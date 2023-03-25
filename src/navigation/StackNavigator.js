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
import Checkout from "../screens/Checkout";
import AllOrders from '../screens/AllOrders';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
    return(
        <NavigationContainer>
            <Drawer.Navigator initialRouteName="CreateOrder" drawerContent={(props) => <Sidebar {...props} />} >
                <Drawer.Screen options={{headerShown: false}} name="CreateOrder" component={CreateOrder} />
                <Drawer.Screen options={{headerShown: false}} name="Checkout" component={Checkout} />
                <Drawer.Screen options={{headerShown: false}} name="AllOrders" component={AllOrders} />
            </Drawer.Navigator>
        </NavigationContainer>
    )
}

export default DrawerNavigator;