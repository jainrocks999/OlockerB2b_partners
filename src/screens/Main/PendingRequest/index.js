import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Dimensions,
  Alert,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import Toast from 'react-native-simple-toast';
import Header from '../../../components/CustomHeader';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import StatusBar from '../../../components/StatusBar';
import BottomTab from '../../../components/StoreButtomTab';
import styles from './styles';
import Loader from '../../../components/Loader';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CheckBox from '@react-native-community/checkbox';

const HomeScreen = ({route}) => {
  const navigation = useNavigation();

  const dispatch = useDispatch();
  const [visiable1, setVisible1] = useState(false);
  const [visiable2, setVisible2] = useState(false);
  const selector = useSelector(state => state.Pending?.list);
  const isFetching = useSelector(state => state?.isFetching);
  const [viewProd, setViewProd] = useState(false);
  const [active, setActive] = useState(true);
  const focus = useIsFocused();
  const demo = (ind, index2) => {
    var data = [...selector].filter((item, index) => {
      return ind != item.SupplierSrNo;
    });
    dispatch({
      type: 'Get_Pending_Success',
      payload: {list: data},
    });
  };

  useEffect(() => {
    if (focus) {
      pendingRequest();
    }
  }, [focus]);

  const pendingRequest = async () => {
    console.log('calll with notificvcicac');
    const srno = await AsyncStorage.getItem('Partnersrno');
    const Token = await AsyncStorage.getItem('loginToken');
    dispatch({
      type: 'Get_Pending_Request',
      url: '/partners/pendingSupplierRequest',
      partnerId: srno,
      Token: Token,
      // navigation,
    });
  };

  const AcceptMEthod = async (id, index) => {
    const srno = await AsyncStorage.getItem('Partnersrno');
    const Token = await AsyncStorage.getItem('loginToken');
    setVisible1(true);
    const axios = require('axios');
    let data = new FormData();
    data.append('supplier_id', id);
    data.append('statusId', '1');
    data.append('partnerId', srno);
    data.append('rejectReason', '');
    data.append('IsShowInRetailerApp', viewProd == true ? 1 : 0);
    data.append('ddlCategory', 'Category A');

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://olocker.co/api//partners/updateSupplierRequest',
      headers: {
        Olocker: `Bearer ${Token}`,
        // ...data.getHeaders()
      },
      data: data,
    };

    axios
      .request(config)
      .then(response => {
        if (response?.data?.status == true) {
          setVisible1(false);
          demo(id, index);
          Toast.show(response?.data?.msg);
        }
      })
      .catch(error => {
        setVisible1(false);
        console.log(error);
      });
  };
  const RejectMEthod = async (id, index) => {
    const srno = await AsyncStorage.getItem('Partnersrno');
    const Token = await AsyncStorage.getItem('loginToken');
    setVisible2(true);
    const axios = require('axios');
    let data = new FormData();
    data.append('supplier_id', id);
    data.append('statusId', '2');
    data.append('partnerId', srno);
    data.append('rejectReason', '');
    data.append('IsShowInRetailerApp', viewProd == true ? 1 : 0);
    data.append('ddlCategory', 'Category A');

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://olocker.co/api//partners/updateSupplierRequest',
      headers: {
        Olocker: `Bearer ${Token}`,
        // ...data.getHeaders()
      },
      data: data,
    };

    axios
      .request(config)
      .then(response => {
        if (response.data.status == true) {
          setVisible2(false);
          demo(id, index);
          // Toast.show(response?.data?.msg);
        }
      })
      .catch(error => {
        setVisible2(false);
        console.log(error);
      });
  };

  setTimeout(() => {
    if (route.params.id) {
      setActive(false);
    }
  }, 2000);
  return (
    <View style={{flex: 1, backgroundColor: '#f0eeef'}}>
      <Header
        source={require('../../../assets/L.png')}
        source2={require('../../../assets/Image/dil.png')}
        source1={require('../../../assets/Fo.png')}
        title={'Pending Request '}
        onPress={() => navigation.goBack()}
        onPress1={() => navigation.navigate('MessageBox')}
        onPress2={() => navigation.navigate('FavDetails')}
      />

      {isFetching || visiable1 || visiable2 ? <Loader /> : null}
      {selector?.length == 0 ? (
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            alignSelf: 'center',
            height: '90%',
          }}>
          <Text
            style={{
              color: 'grey',
              fontFamily: 'Acephimere',
              fontSize: 19,
              fontWeight: '700',
            }}>
            {' '}
            {'No Pending Requests'}{' '}
          </Text>
        </View>
      ) : (
        <ScrollView>
          <View>
            <Text
              style={{
                color: '#565656',
                fontFamily: 'Acephimere',
                marginLeft: 10,
                marginTop: 5,
              }}>
              {selector?.length == 1
                ? `${selector?.length}Pending Request`
                : `${selector?.length}Pending Requests`}
            </Text>
            <FlatList
              data={selector}
              renderItem={({item, index}) => (
                <View
                  style={{
                    marginTop: 10,
                    paddingHorizontal: 20,
                    // height:140,
                    elevation: 5,
                    shadowColor: '#000',
                    shadowOffset: {width: 0, height: 2},
                    shadowOpacity: 0.3,
                    shadowRadius: 8,
                    borderRadius: 8,
                    backgroundColor:
                      item.SupplierSrNo == route.params.id && active == true
                        ? '#a8c6e3'
                        : '#fff',
                  }}>
                  <View style={{flexDirection: 'row'}}>
                    <View
                      style={{
                        width: '38%',
                        height: 100,
                        backgroundColor: '#fff',
                        marginTop: 20,
                        borderRadius: 8,
                      }}>
                      <Image
                        style={{height: '100%', width: '100%'}}
                        resizeMode={'cover'}
                        source={
                          item.logoImage
                            ? {uri: item.logoImage}
                            : require('../../../assets/logo.png')
                        }
                      />
                    </View>
                    <View style={{marginLeft: 20, marginTop: 20}}>
                      <Text
                        style={{
                          fontSize: 16,
                          color: '#032e63',
                          fontFamily: 'Acephimere',
                        }}>
                        {item.SupplierName}
                      </Text>
                      <Text
                        style={{
                          fontSize: 13,
                          color: '#032e63',
                          fontFamily: 'Acephimere',
                        }}>
                        {item.CityName}
                      </Text>
                      <Text
                        style={{
                          fontSize: 11,
                          color: '#575757',
                          fontFamily: 'Acephimere',
                        }}>
                        {item.Timestamp}
                      </Text>
                      <View
                        style={{
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          flexDirection: 'row',
                          marginTop: 20,
                        }}>
                        <TouchableOpacity
                          onPress={() => AcceptMEthod(item.SupplierSrNo, index)}
                          style={{
                            backgroundColor: '#5dc95c',
                            paddingHorizontal: 15,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: 15,
                            paddingVertical: 5,
                          }}>
                          <Text
                            style={{
                              color: '#fff',
                              fontSize: 12,
                              fontFamily: 'Acephimere',
                              textAlign: 'center',
                            }}>
                            Accept
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => RejectMEthod(item.SupplierSrNo, index)}
                          style={{
                            backgroundColor: 'red',
                            paddingHorizontal: 15,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: 15,
                            paddingVertical: 5,
                            marginLeft: 10,
                          }}>
                          <Text
                            style={{
                              color: '#fff',
                              fontSize: 12,
                              fontFamily: 'Acephimere',
                              textAlign: 'center',
                            }}>
                            Reject
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                  <View style={{marginTop: 10, marginBottom: 10}}>
                    <View style={{flexDirection: 'row', marginLeft: -5}}>
                      <CheckBox
                        disabled={false}
                        value={viewProd}
                        onValueChange={newValue => {
                          setViewProd(newValue);
                        }}
                        tintColors={{true: '#032e63', false: '#032e63'}}
                        onTintColor="#032e63"
                        onCheckColor="#032e63"
                        boxType="square"
                        style={{height: 16, width: 18}}
                      />
                      <Text
                        style={{
                          marginLeft: 16,
                          color: '#000',
                          fontSize: 12,
                          fontFamily: 'Acephimere',
                          textAlign: 'center',
                        }}>
                        Let my jewellery seen by your customers
                      </Text>
                    </View>
                    <View></View>
                  </View>
                </View>
              )}
            />
          </View>
        </ScrollView>
      )}

      {/* <View style={{bottom:0,position:'absolute',left:0,right:0}}>
      <BottomTab/>
      </View> */}
      <StatusBar />
    </View>
  );
};
export default HomeScreen;
const data = [
  {
    image: '',
    name: 'RC Bafna Jewellers',
    city: 'Mumbai',
    time: '17 Minutes ago',
  },
  {
    image: '',
    name: 'RC Bafna Jewellers',
    city: 'Mumbai',
    time: '17 Minutes ago',
  },
  {
    image: '',
    name: 'RC Bafna Jewellers',
    city: 'Mumbai',
    time: '17 Minutes ago',
  },
];
