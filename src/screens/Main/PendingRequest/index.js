import React, { useEffect, useState } from 'react';
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
import { useNavigation } from '@react-navigation/native';
import StatusBar from '../../../components/StatusBar';
import BottomTab from '../../../components/StoreButtomTab';
import styles from './styles';
import Loader from '../../../components/Loader';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
const HomeScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [visiable1,setVisible1]= useState(false);
  const [visiable2,setVisible2]= useState(false);
  const selector = useSelector(state => state.Pending);
  const data2 = useSelector(state => state.deletData1)
  const isFetching = useSelector(state => state?.isFetching)
 
  const demo = (ind, index2) => {
    const tempData = data2 ? data2 : selector?.list

    var data = tempData.filter((item, index) => {
      return index != index2;

    })
    dispatch({
      type: 'Get_delete1_Success',
      payload: data
    })

  }
  const AcceptMEthod = async (id, index) => {
    console.log('dddddd',index);
    const srno = await AsyncStorage.getItem('Partnersrno');
    const Token = await AsyncStorage.getItem('loginToken')
setVisible1(true);
    const axios = require('axios');
    let data = new FormData();
    data.append('sp_networkId', id);
    data.append('statusId', '1');
    data.append('partnerId', srno);
    data.append('rejectReason', '');

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://olocker.co/api//partners/updateSupplierRequest',
      headers: {
        'Olocker': `Bearer ${Token}`,
        // ...data.getHeaders()
      },
      data: data
    };

    axios.request(config)
      .then((response) => {
        if (response?.data?.status == true) {
          setVisible1(false);
          demo(id,index);
          Toast.show(response?.data?.msg);

        }

      })
      .catch((error) => {
        setVisible1(false);
        console.log(error);
      });


  }
  const RejectMEthod = async (id, index) => {
   
    const srno = await AsyncStorage.getItem('Partnersrno');
    const Token = await AsyncStorage.getItem('loginToken')
setVisible2(true)
    const axios = require('axios');
    let data = new FormData();
    data.append('sp_networkId', id);
    data.append('statusId', '2');
    data.append('partnerId', srno);
    data.append('rejectReason', '');

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://olocker.co/api//partners/updateSupplierRequest',
      headers: {
        'Olocker': `Bearer ${Token}`,
        // ...data.getHeaders()
      },
      data: data
    };

    axios.request(config)
      .then((response) => {
       
        if (response.data.status == true) {
          setVisible2(false);
          demo(id,index);
          Toast.show(response?.data?.msg);
          

        }

      })
      .catch((error) => {
        setVisible2(false);
        console.log(error);
      });

    // dispatch({
    //   type: 'Get_updateSupplierRequest1_Request',
    //   url: '/partners/updateSupplierRequest',
    //   sp_networkId: id,
    //   statusId: 2,
    //   partnerId: srno,
    //   rejectReason:'',
    //   Token:Token,

    // }) 

  }
  return (
    <View style={{ flex: 1, backgroundColor: '#f0eeef' }}>
      <Header
        source={require('../../../assets/L.png')}
        source2={require('../../../assets/Image/dil.png')}
        source1={require('../../../assets/Fo.png')}
        title={'Pending Request '}
        onPress={() => navigation.goBack()}
        onPress1={() => navigation.navigate('MessageBox')}
        onPress2={() => navigation.navigate('FavDetails')}
      />
      {/* <ScrollView> */}

      {/* <View style={{ paddingHorizontal: 20, alignItems: 'center', alignSelf: 'center' }}>
        {data2 ?
          <Text style={{ color: '#565656', fontFamily: 'Acephimere', fontSize: 16, fontWeight: '700' }}>{`${data2.length === 0 ? 'No' : data2.length}${' Pending Requests'}`}</Text> :
          <Text style={{ color: '#565656', fontFamily: 'Acephimere', fontSize: 16, fontWeight: '700' }}>{`${selector.list.length === 0 ? 'No' : selector?.list?.length}${' Pending Requests'}`}</Text>

        }
         </View> */}
      {/* <Text style={{ color: '#565656', fontFamily: 'Acephimere' }}>{`${selector?.list?.length === 0 ? 'No' : selector?.list?.length}${' Pending Requests'}`}</Text> */}


      {isFetching ||visiable1||visiable2 ? <Loader /> : null}
      {data2?.length === 0 || selector?.list?.length === 0 ?
        <View style={{ alignItems: 'center', justifyContent: 'center', alignSelf: 'center', height: '90%', }}>
          <Text style={{ color: 'grey', fontFamily: 'Acephimere', fontSize: 19, fontWeight: '700' }}> {'No Pending Requests'} </Text>
          {/* <Text style={{ color: 'grey', fontFamily: 'Acephimere', fontSize: 19, fontWeight: '700' }}>{data2?.length == 0 ? 'No Pending Requests' : `${selector?.list?.length}${' Pending Requests'}`}</Text> */}
        </View>
        :
        <View>
          {/* {`${data2 ? data2?.length : selector?.suppliers?.length} Pending Approval`} */}
          <Text style={{ color: '#565656', fontFamily: 'Acephimere' ,marginLeft:10}}>{`${data2 ? data2?.length : selector?.list?.length}${' Pending Requests'}`}</Text>
          <FlatList
            data={data2 ? data2 : selector?.list}
            renderItem={({ item, index }) => (
              <View
                style={{
                  marginTop: 20,
                  paddingHorizontal: 20,
                  flexDirection: 'row',
                }}>
                  {console.log(item)}
                <View
                  style={{
                    width: '38%',
                    height: 100,
                    backgroundColor: '#fff',
                    elevation: 5,
                    borderRadius: 8,
                  }}>

                  <Image
                    style={{ height: '100%', width: '100%' }}
                    resizeMode={'cover'}
                    source={item.logoImage ? { uri: item.logoImage } : require('../../../assets/Image/Not.jpeg')}
                  />

                </View>
                <View style={{ marginLeft: 20 }}>
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
                      onPress={() => AcceptMEthod(item.SrNo, index)}
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
                        }}>
                        Accept
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => RejectMEthod(item.SrNo, index)}
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
                        }}>
                        REJECT
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )}
          />
        </View>
      }
      {/* </ScrollView> */}
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
