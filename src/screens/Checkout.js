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
    Alert,
  } from 'react-native';
import { TouchableOpacity } from "react-native-gesture-handler";
  import Header from "../components/Header";
  import product from './../assets/images/product.jpg';
  import closeicon from './../assets/images/closeicon.png';
  import add from './../assets/images/add.png';
  import minus from './../assets/images/minus.png';
  import AsyncStorage from '@react-native-async-storage/async-storage';

  const Checkout = (props) => {

    const ordernowpressed = async() => {
        var storearr = [];
        // await AsyncStorage.removeItem('orderlist');
        await AsyncStorage.getItem('orderlist').then((result) => {
            if(result) {
                // var data = JSON.parse(result);
                var olddata = JSON.parse(result);
                for(var i = 0; i < olddata.length; i++) {
                    storearr.push(olddata[i]);
                }
                var num = olddata.length - 1
                var dt = data;
                dt['orderid'] = olddata[num].orderid + 1;
                storearr.push(dt);
            } else {
                var dt = data;
                dt['orderid'] = 1;
                storearr.push(dt);
            }
        })
        try {
            await AsyncStorage.setItem('orderlist',JSON.stringify(storearr));
        } catch {

        }
        props.navigation.navigate('AllOrders');

        
    }

    let data = props?.route?.params?.data;
    console.log('data products length >>', data?.productsarr?.length)
    return (
        <View style={{backgroundColor: '#fff', flex: 1}}>
            <ScrollView>
                <Header title={'Checkout'} />
                <View style={{paddingHorizontal: 20, marginBottom: 30, marginTop: 20}}>
                    <Text style={{color:'#000', fontWeight: '600', fontSize: 16, marginLeft: 10}}>User Details</Text>
                    <View style={{borderColor: '#ccc', borderWidth: 1, borderRadius: 20, marginTop: 5}}>
                        <View style={{ paddingHorizontal: 20}}>
                            <View style={{flexDirection: 'row', marginTop: 20,paddingBottom: 10, borderBottomWidth: 1, borderBottomColor: '#ccc'}}>
                                <Text style={{color: '#000', fontSize: 14, width: '50%'}}>Full Name :</Text>
                                <Text style={{color: '#000', fontSize: 14, fontWeight: '600',  width: '50%'}}>{data?.fullname}</Text>
                            </View>
                            <View style={{flexDirection: 'row', marginTop: 15,paddingBottom: 15, borderBottomWidth: 1, borderBottomColor: '#ccc'}}>
                                <Text style={{color: '#000', fontSize: 14, width: '50%'}}>Email :</Text>
                                <Text style={{color: '#000', fontSize: 14, fontWeight: '600',  width: '50%'}}>{data?.email}</Text>
                            </View>
                            <View style={{flexDirection: 'row', marginTop: 15,paddingBottom: 15, borderBottomWidth: 1, borderBottomColor: '#ccc'}}>
                                <Text style={{color: '#000', fontSize: 14, width: '50%'}}>Phone Number :</Text>
                                <Text style={{color: '#000', fontSize: 14, fontWeight: '600', width: '50%'}}>{data?.mobile}</Text>
                            </View>
                            <View style={{flexDirection: 'row', marginTop: 15,paddingBottom: 15}}>
                                <Text style={{color: '#000', fontSize: 14, width: '50%'}}>Address :</Text>
                                <Text style={{color: '#000', fontSize: 14, fontWeight: '600',  width: '50%'}}>{data?.address}</Text>
                            </View>
                        </View>
                    </View>
                    <Text style={{color:'#000', fontWeight: '600', fontSize: 16, marginLeft: 10, marginTop: 20}}>Products List</Text>
                    <View style={{paddingHorizontal: 0, marginTop: 5}}>
                        {data?.productsarr?.map((item, index) => {
                            console.log('name >>', item.name);
                            return (
                                <View key={index} style={{borderColor: '#ccc', borderWidth: 1, borderRadius: 15, marginTop: 15}}>
                                    <View style={{flexDirection: 'row', padding: 5}}>
                                        <Image source={product} style={{width: 100, height: 100, resizeMode: 'contain', borderRadius: 15}} />
                                        <View style={{marginLeft: 15, marginTop: 10}}>
                                            <Text style={{color: '#000', fontSize: 14}}>Name : <Text style={{marginLeft: 5}}>{item.name}</Text></Text>
                                            <Text style={{color: '#000', fontSize: 14, marginTop: 5}}>Price : <Text style={{marginLeft: 5}}>{item.price}</Text></Text>
                                            <Text style={{color: '#000', fontSize: 14, marginTop: 5}}>Qty : <Text style={{marginLeft: 5}}>{item.quantity}</Text></Text>
                                        </View>
                                    </View>
                                </View>
                            )   
                        })}
                    </View>
                    <TouchableOpacity onPress={() => {ordernowpressed()}} style={{backgroundColor: '#0d6efd', paddingVertical: 15, width: '100%', marginTop: 15, borderRadius: 10}}>
                        <Text style={{color: '#fff', fontSize: 16, textAlign: 'center'}}>Order Now</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    )
  }

  export default Checkout;