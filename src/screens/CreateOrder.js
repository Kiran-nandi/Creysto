import React, { useEffect, useState, useRef } from "react";
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
    Alert
  } from 'react-native';
import { TouchableOpacity } from "react-native-gesture-handler";
  import Header from "../components/Header";
  import product from './../assets/images/product.jpg';
  import closeicon from './../assets/images/closeicon.png';
  import add from './../assets/images/add.png';
  import minus from './../assets/images/minus.png';

  const CreateOrder = (props) => {
    const [fullname, setfullname] = useState(null);
    const [email, setemail] = useState(null);
    const [mobile, setmobile] = useState(null);
    const [address, setaddress] = useState(null);
    const [productsarr, setproductsarr] = useState([]);
    const [pricetotal, setpricetotal] = useState(0);
    const [priceloader, setpriceloader] = useState(false);

    const productsarrRef = useRef(productsarr);
    const addproductclicked = async() => {
        console.log('addproductclicked >>');
        var data = productsarr;
        if(data.length > 0) {
            var num = data.length - 1
            var obj = {'id': data[num].id + 1, 'name': '', 'price': '', 'quantity': 1}
            setproductsarr(prev => [...prev, obj])
        } else {
            var newarr = [];
            var obj = {'id': 0, 'name': '', 'price': '', 'quantity': 1}
            newarr.push(obj);
            console.log('newarr >>', newarr);
            setproductsarr(newarr);
        }
    }

    console.log('productsarr >>', productsarr.length);

    const changefunctionname = (id, text) => {
        var data = productsarr;
        var newarr = [];
        for(var i = 0; i < data.length; i++) {
            if(data[i].id == id) {
                data[i].name = text;
            } else {
            }
            newarr.push(data[i]);
        }
        setproductsarr(newarr);
    }

    const changefunctionprice = (id, text) => {
        var data = productsarr;
        var newarr = [];
        for(var i = 0; i < data.length; i++) {
            if(data[i].id == id) {
                data[i].price = text;
            } else {
            }
            newarr.push(data[i]);
        }
        setproductsarr(newarr);
        setpriceloader(!priceloader);
    }

    const removeproduct = (id) => {
        var data = productsarr;
        var newarr = [];
        for(var i = 0; i < data.length; i++) {
            if(data[i].id == id) {
                
            } else {
                newarr.push(data[i]);
            }
        }
        setproductsarr(newarr);
        setpriceloader(!priceloader);
    }

    const addquantity = (id) => {
        var data = productsarr;
        var newarr = [];
        for(var i = 0; i < data.length; i++) {
            if(data[i].id == id) {
                data[i].quantity = data[i].quantity + 1;
            } else {
               
            }
            newarr.push(data[i]);
        }
        setproductsarr(newarr);
        setpriceloader(!priceloader);
    }

    const removequantity = (id) => {
        var data = productsarr;
        var newarr = [];
        for(var i = 0; i < data.length; i++) {
            if(data[i].id == id) {
                data[i].quantity = data[i].quantity - 1;
            } else {
               
            }
            newarr.push(data[i]);
        }
        setproductsarr(newarr);
        setpriceloader(!priceloader);
    }

    const calculatepricefunction = () => {
        var pricearr = [];
        var data = productsarr;
        for(var i = 0; i < data.length; i++) {
            if(data[i].price) {
                var amount = parseInt(data[i].price) * parseInt(data[i].quantity);
                pricearr.push(amount);
            } else {

            }
        }
        var total = pricearr.reduce((a, b) => a + b, 0);
        // console.log('total >>', total);
        setpricetotal(total);
    }

    const checkoutpressed = () => {
        console.log('checkoutpressed >>');
        if(fullname && email && mobile && address && pricetotal > 0) {
            var data = {
                'fullname': fullname,
                'email': email,
                'mobile': mobile,
                'address': address,
                'productsarr': productsarr,
                'pricetotal': pricetotal
            }
            props.navigation.navigate('Checkout', {data: data});
        } else {
            Alert.alert('', 'Please fill all required details')
        }
    }

    useEffect(() => {
        calculatepricefunction();
    }, [priceloader])

    return (
        <View style={{backgroundColor: '#fff', flex: 1}}>
            <ScrollView>
            <Header title={'Create Order'} />
            <View style={{paddingHorizontal: 20, marginBottom: 50}}>
                <View style={{marginTop: 15}}>
                    <Text style={styles.inputtext}>Full Name*</Text>
                    <TextInput style={styles.inputbox} value={fullname} onChangeText={(text) => setfullname(text)} placeholder={'Enter Your Fullname'} />
                </View>
                <View style={{marginTop: 15}}>
                    <Text style={styles.inputtext}>Email*</Text>
                    <TextInput style={styles.inputbox} value={email} onChangeText={(text) => setemail(text)} placeholder={'Enter Your Email'} />
                </View>
                <View style={{marginTop: 15}}>
                    <Text style={styles.inputtext}>Mobile Number*</Text>
                    <TextInput style={styles.inputbox} keyboardType={'number-pad'} maxLength={10} value={mobile} onChangeText={(text) => setmobile(text)} placeholder={'Enter Your Mobile Number'} />
                </View>
                <View style={{marginTop: 15}}>
                    <Text style={styles.inputtext}>Address*</Text>
                    <TextInput style={styles.inputbox} value={address} onChangeText={(text) => setaddress(text)} placeholder={'Enter Your Address'} />
                </View>
                <TouchableOpacity onPress={() => {addproductclicked()}} style={{backgroundColor: '#0d6efd', borderRadius: 10, paddingVertical: 10, marginTop: 15}}>
                    <Text style={{color: '#fff', textAlign: 'center', fontSize: 16}}>Add Product</Text>
                </TouchableOpacity>
                {
                    productsarr.length > 0 ?
                    productsarr.map((item, index) => {
                        return (
                            <View key={index} style={{borderRadius: 15,borderColor: '#ccc',borderWidth: 1, flexDirection: 'row', marginTop: 10, padding: 10}}>
                                <Image source={product} style={{width: 140, height: 140, resizeMode: 'contain', borderRadius: 15}} />
                                <View style={{marginLeft: 15, flex: 1}}>
                                <TouchableOpacity onPress={() => {removeproduct(item.id)}} style={{alignSelf: 'flex-end'}}>
                                    <Image source={closeicon} style={{width: 20, height: 20,resizeMode: 'contain'}} />
                                </TouchableOpacity>
                                <TextInput style={styles.inputbox1} value={item.name} onChangeText={(text) => changefunctionname(item.id, text)} placeholder={'Product Name'} />
                                <TextInput style={[styles.inputbox1, {marginTop: 10, width: 90}]} keyboardType={'number-pad'} maxLength={4} value={item.price} onChangeText={(text) => changefunctionprice(item.id, text)} placeholder={'Product Price'} />
                                    <View style={{flexDirection: 'row', marginTop: 15}}>
                                        {
                                            item.quantity == 1 ?
                                            <View>
                                                <Image source={minus} style={{width: 20, height: 20, resizeMode: 'contain', opacity: 0.5}} />
                                            </View> :
                                            <TouchableOpacity onPress={() => {
                                                removequantity(item.id)
                                            }} >
                                                <Image source={minus} style={{width: 20, height: 20, resizeMode: 'contain'}} />
                                            </TouchableOpacity>
                                        }
                                        <Text style={{marginHorizontal: 10, color: '#000', fontWeight: '800', fontSize: 16}}>{item.quantity}</Text>
                                        <TouchableOpacity onPress={() => {
                                            addquantity(item.id)
                                        }}>
                                            <Image source={add} style={{width: 20, height: 20, resizeMode: 'contain'}} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                </View>
                        )
                    }) : null
                }
            </View>
            </ScrollView>
            <View style={{backgroundColor: '#fff', paddingTop: 10, paddingBottom: 30, paddingHorizontal: 20, borderTopColor: '#ccc', borderTopWidth: 1}}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text style={{color: '#000', fontSize: 22, fontWeight: '800'}}>₹ {pricetotal}</Text>
                    <TouchableOpacity onPress={() => {checkoutpressed()}} style={{backgroundColor: '#198754', paddingVertical: 12, paddingHorizontal: 40, borderRadius: 10}}>
                        <Text style={{color: '#fff', fontSize: 16}}>Checkout</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
  }

  const styles = StyleSheet.create({
    inputbox: {
        height: 45,
        borderRadius: 10,
        borderColor: '#ccc',
        borderWidth: 1,
        paddingLeft: 10,
        marginTop: 2,
        color: '#000'
    },
    inputbox1: {
        height: 35,
        borderRadius: 7,
        borderColor: '#ccc',
        borderWidth: 1,
        paddingLeft: 10,
        marginTop: 2,
        width: 120,
        color: '#000'
    },
    inputtext: {
        fontSize: 13,
        color: '#000'
    }
  });

  export default CreateOrder