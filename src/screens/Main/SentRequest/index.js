import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Dimensions,
  Image,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Header from '../../../components/CustomHeader';
import { useNavigation } from '@react-navigation/native';
import StatusBar from '../../../components/StatusBar';
import BottomTab from '../../../components/StoreButtomTab';
import styles from './styles';
import { types } from '@babel/core';
import Loader from '../../../components/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  useDispatch,
  useSelector,
} from 'react-redux';
const HomeScreen = () => {
  const navigation = useNavigation();
  const selector = useSelector(state => state.sentRequest);
  const data2 = useSelector(state => state.deletData)
  const dispatch = useDispatch();
  const isFetching = useSelector(state => state.isFetching)
  const [rejected, setRejected] = useState(false);
  const [pending, setPending] = useState(true);
  const [accepted, setAccepted] = useState(false);
  const demo = (ind, index2) => {
   
    const tempData = data2 ? data2 : selector?.suppliers
    var data = tempData.filter((item, index) => {
      return index != index2;

    })


    dispatch({
      type: 'Get_delete_Success',
      payload: data
    })

  }
  const deteleApi = async (id, index2) => {
    const Token = await AsyncStorage.getItem('loginToken')
    const axios = require('axios');
    setAccepted(true)
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `https://olocker.co/api/partners/removeSupplier?supplier_id=${id}`,
      headers: {
        'Olocker': `Bearer ${Token}`
      }
    };

    axios.request(config)
      .then((response) => {
       
        if (response.data.status == true) {
          demo(id, index2)
          setAccepted(false)
        }
      })
      .catch((error) => {
        setAccepted(false)
        console.log(error);
      });


  }

  const manageRequest = () => {
    setPending(true);
    setAccepted(false);
    setRejected(false);
  };

  const manageRequest1 = () => {
    setPending(false);
    setAccepted(true);
    setRejected(false);
  };

  const manageRequest2 = () => {
    setPending(false);
    setAccepted(false);
    setRejected(true);
  };

  const DeleteModel = (item, index) => {
    Alert.alert(
      'Are you sure you want to delete sent request?',
      '',
      [
        {
          text: 'Cancel',
          onPress: () => {
            cancelable: false;
          },
          style: 'cancel',
        },
        { text: 'ok', onPress: () => deteleApi(item,index) },
      ],
      { cancelable: false },
    );
  };



  return (
    <View style={styles.conatiner}>
      <Header
        source={require('../../../assets/L.png')}
        source2={require('../../../assets/Image/dil.png')}
        source1={require('../../../assets/Fo.png')}
        title={'Sent Requests '}
        onPress={() => navigation.goBack()}
        onPress1={() => navigation.navigate('MessageBox')}
        onPress2={() => navigation.navigate('FavDetails')}
      />
       {isFetching || accepted? <Loader /> : null}
       {
          data2?.length == 0 || selector?.suppliers?.length == 0 ?
            <View style={{ alignItems: 'center', justifyContent: 'center', alignSelf: 'center', height: '90%',}}>
              <Text style={styles.tlength}> {'No Sending Request'} </Text>

            </View>
            :
      <ScrollView>
            <View style={{}}>
              <Text
                style={[
                  styles.touchtext,
                  { color: pending == true ? '#032e63' : '#616161', fontSize: 13, marginLeft: 10, marginTop: 5 },
                ]}>
                {`${data2 ? data2?.length : selector?.suppliers?.length} Sending Request`}
              </Text>
              <View style={{ marginHorizontal: 15, paddingBottom: 100 }}>
                <FlatList style={{}}
                  data={data2 ? data2 : selector?.suppliers}
                  renderItem={({ item, index }) => (
                    <View style={styles.card}>
                      <View style={styles.cardv}>
                        <View style={styles.cardv1}>
                       
                          <View style={styles.cardv2}>
                            <Image
                              style={{ width: 100, height: 80, marginLeft: -10,borderRadius:10 }}
                              resizeMode="cover"
                              source={item.logoImage ? { uri: `${item.logoImage}` } : require('../../../assets/logo.png')}
                            />
                          </View>
                          <View style={{ marginLeft: 10 }}>
                            <Text style={styles.text}>{item.SupplierName}</Text>
                            <Text style={styles.text1}>{item.CityName}</Text>
                            <Text style={styles.text2}>{item.time}</Text>
                          </View>
                        </View>

                      </View>
                      <View style={{ alignSelf: 'flex-end', marginBottom: 20, paddingHorizontal: 10, marginTop: '-10%' }}>
                        <TouchableOpacity style={styles.BTouch}>
                          <Text style={styles.BTouchtext}>Pending</Text>
                        </TouchableOpacity>
                      </View>
                      <View
                        style={{
                          width: '100%',
                          borderTopWidth: 1,
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          borderColor: 'grey',
                        }}>
                        {/* <View style>
                      <Text>Delete Request</Text>
                    </View> */}
                        <View
                          style={{
                            flexDirection: 'row',
                            width: '100%',
                            alignItems: 'center',
                            justifyContent: 'center',
                            paddingVertical: 10,
                          }}>
                            {console.log('list.....',item)}
                          <TouchableOpacity
                            onPress={() => DeleteModel(item.SupplierSrNo, index)}
                            style={{
                              alignItems: 'center',
                              justifyContent: 'center',
                              flexDirection: 'row',
                            }}>
                            <Image
                              style={{ height: 25, width: 25 }}
                              source={require('../../../assets/PartnerImage/5.png')}
                            />

                            <Text
                              style={{ marginLeft: 7, fontFamily: 'Acephimere',color:'#000' }}>
                              Delete Request
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  )}
                />
              </View>

            </View>
            </ScrollView>

        }






     
      <StatusBar />
    </View>
  );
};
export default HomeScreen;
const data = [
  {
    image: '',
    name: 'RC Bafna Jewllers',
    city: 'Mumbai',
    time: '17 Minutes ago',
  },
];
const data1 = [
  {
    image: '',
    name: 'RC Bafna Jewllers1',
    city: 'Mumbai',
    time: '17 Minutes ago',
  },
];
const data2 = [
  {
    image: '',
    name: 'RC Bafna Jewllers2',
    city: 'Mumbai',
    time: '17 Minutes ago',
  },
];
