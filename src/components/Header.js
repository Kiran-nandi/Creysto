import React from "react";
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,Image
  } from 'react-native';
import { TouchableOpacity } from "react-native-gesture-handler";
  import menu from '../assets/images/menu.png'; 
  import { useNavigation } from '@react-navigation/native';

  const Header = ({title}) => {
    const navigation = useNavigation();
    return (
        <View style={{marginTop: 20, paddingHorizontal: 20}}>
            <TouchableOpacity onPress={() => {navigation.toggleDrawer();}}>
                <Image source={menu} style={{width: 25, height: 25, resizeMode: 'contain'}} />
            </TouchableOpacity>
            <Text style={{textAlign: 'center', fontSize: 17, fontWeight: '700', color: '#000'}}>{title}</Text>
        </View>
    )
  }

  export default Header