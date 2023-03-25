import React, { useEffect, useState } from "react";
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    TextInput,
    Image,
    Alert,ActivityIndicator
  } from 'react-native';
import { TouchableOpacity } from "react-native-gesture-handler";
  import Header from "../components/Header";
  import product from './../assets/images/product.jpg';
  import closeicon from './../assets/images/closeicon.png';
  import add from './../assets/images/add.png';
  import minus from './../assets/images/minus.png';
  import AsyncStorage from '@react-native-async-storage/async-storage';

  const AllOrders = (props) => {
    const [orderslist, setorderslist] = useState([]);
    const [showloader, setshowloader] = useState(true);
    const checkfororders = async() => {
        console.log('hit >>>');
        setshowloader(true);
        await AsyncStorage.getItem('orderlist').then((result) => {
            if(result) {
                var data = JSON.parse(result);
                setorderslist(data);
                setshowloader(false);
            } else {
                setshowloader(false);
            }
        })
    }
    // await AsyncStorage.getItem('asyncformdata').then((result) => {
    useEffect(() => {
        props.navigation.addListener('focus', () => {
            checkfororders();
        });
    }, [props.navigation])

    return (
        <View style={{backgroundColor: '#fff', flex: 1}}>
            {
                showloader ?
                <ActivityIndicator size="large" color="#516C8F" style={{marginTop: 20}}/> :
                <ScrollView>
                <Header title={'Orders List'} />
                <View style={{paddingHorizontal: 20, marginBottom: 30, marginTop: 20}}>
                    {
                        Object.keys(orderslist).length > 0 ?
                        orderslist?.map((item, index) => {
                            return (
                                <View key={index} style={{borderColor: '#ccc', borderWidth: 1, borderRadius: 15, marginTop: 15}}>
                                    <View style={{flexDirection: 'row', padding: 5}}>
                                        <Image source={product} style={{width: 100, height: 100, resizeMode: 'contain', borderRadius: 15}} />
                                        <View style={{marginLeft: 15, marginTop: 10}}>
                                            <Text style={{color: '#000', fontSize: 14}}>Order Id : <Text style={{marginLeft: 5}}>{item.orderid}</Text></Text>
                                            <Text style={{color: '#000', fontSize: 14, marginTop: 5}}>Total Price : <Text style={{marginLeft: 5}}>{item.pricetotal}</Text></Text>
                                        </View>
                                    </View>
                                </View>
                            )   
                        }) : 
                        <View>
                            <Text style={{color: '#000'}}>Empty List</Text>
                        </View>
                    }
                </View>
            </ScrollView>
            }
            
            
        </View>
    )
  }

  export default AllOrders;