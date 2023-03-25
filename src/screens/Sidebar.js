import React from "react";
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    Image,
    TouchableOpacity
  } from 'react-native';
  import closeicon from './../assets/images/closeicon.png';

  const Sidebar = (props) => {
    return (
      <View style={{flex: 1, paddingVertical: 15}}>
        <TouchableOpacity
          onPress={() => {
            props.navigation.closeDrawer();
          }}
          style={{
            display: 'flex',
            alignSelf: 'flex-end',
            paddingHorizontal: 15,
          }}>
          <Image
            source={closeicon}
            style={{width: 30, height: 30, resizeMode: 'contain'}}
          />
        </TouchableOpacity>
        <View style={{marginTop: 20, paddingHorizontal: 15}}>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('CreateOrder');
            }}>
            <Text style={styles.menuitem}>Create Order</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('AllOrders');
            }}>
            <Text style={styles.menuitem}> All orders</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  const styles = StyleSheet.create({
    mainview: {
        flex: 1,
    },
    closeicon: {
        height: 40
    },
    profileimage: {
        width: 120,
        height: 120,
        borderRadius: 120/2,
        borderWidth: 1,
        borderColor: '#fff'
    },
    menuitem: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#000',
        paddingBottom: 12,
        marginTop: 12
    }
})

  export default Sidebar;