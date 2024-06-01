import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
  Alert,
} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import styles from './styles';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Loader from '../../../components/Loader';
import {TextInput} from 'react-native';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import Toast from 'react-native-simple-toast';
import axios from 'axios';
const MessageBox2 = () => {
  const navigation = useNavigation();
  const isFoucse = useIsFocused();
  const [data1, setData1] = useState();
  console.log('supplier,,,, contact list675776 ,', data1);
  const [visible, setVisiable] = useState(false);

  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState();
  useEffect(() => {
    setFilteredDataSource(data1);
    setMasterDataSource(data1);
  }, [data1]);

  const [masterDataSource, setMasterDataSource] = useState();
  const searchFilterFunction = text => {
    if (text) {
      const newData = masterDataSource.filter(function (item) {
        const itemData = `${item?.SupplierName} ${item?.created_at?.substring(
          0,
          29,
        )} `
          ? `${item?.SupplierName} ${item?.created_at?.substring(
              0,
              29,
            )}`.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      console.log('new data>>>>>>>>>>>>>', newData);
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };

  const handleSearch = () => {
    setSearch('');
    setFilteredDataSource(masterDataSource);
  };

  const dispatch = useDispatch();

  const manageBusiness = async () => {
    const Id = await AsyncStorage.getItem('Partnersrno');
    const Token = await AsyncStorage.getItem('loginToken');

    setVisiable(true);

    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `https://olocker.co/api/supplier//supplierListForPartners?user_id=${Id}`,
      headers: {
        Olocker: `Bearer ${Token}`,
      },
    };

    axios
      .request(config)
      .then(response => {
        if (response.data.status == true) {
          setData1(response.data.data);
          console.log(JSON.stringify(response.data.data));
          setVisiable(false);
        } else {
          setData1(response.data.data);
          setVisiable(false);
          Toast.show(response?.data?.msg);
        }
      })
      .catch(error => {
        setVisiable(false);
        console.log(error);
      });
  };
  useEffect(() => {
    if (isFoucse) {
      manageBusiness();
    }
  }, [isFoucse]);

  const Logout = () => {
    Alert.alert(
      'Are you sure you want to log out?',
      '',
      [
        {
          text: 'Cancel',
          onPress: () => {
            cancelable: false;
          },
          style: 'cancel',
        },
        {text: 'ok', onPress: () => LogoutApp()},
      ],
      {cancelable: false},
    );
  };

  const LogoutApp = async () => {
    const Token = await AsyncStorage.getItem('loginToken');
    const fcmToken = await AsyncStorage.getItem('Tokenfcm');
    const Id = await AsyncStorage.getItem('Partnersrno');
    setVisiable(true);
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `https://olocker.co/api/partners/logout?partnerId=${Id}&fcm_token=${fcmToken}`,
      headers: {
        Olocker: `Bearer ${Token}`,
      },
    };

    axios
      .request(config)
      .then(response => {
        if (response.data.status == true) {
          setVisiable(false);
          navigation.navigate('Login');
          AsyncStorage.setItem('loginToken', '');
          Toast.show(response.data.msg);
        } else {
          Toast.show(response.data.msg);
          setVisiable(false);
        }
        console.log(JSON.stringify('logout,,,,,', response.data));
      })
      .catch(error => {
        setVisiable(false);
        console.log(error);
      });
  };

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      {visible ? <Loader /> : null}

      <View style={styles.container}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity
            style={{
              height: 25,
              width: 45,
              borderWidth: 0,
              justifyContent: 'center',
            }}
            delayPressIn={0}
            onPress={() => navigation.goBack()}>
            <Image
              style={styles.img}
              source={require('../../../assets/L.png')}
            />
          </TouchableOpacity>
          <Text style={[styles.text, {marginLeft: 0}]}>Message Box</Text>
        </View>
        <View style={styles.headertouch}>
          <TouchableOpacity
            style={{marginLeft: 15}}
            onPress={() => navigation.navigate('FavDetails')}>
            <Image
              style={styles.img2}
              source={require('../../../assets/Image/dil.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Logout()}>
            <Image
              style={[styles.img3, {tintColor: '#fff'}]}
              resizeMode="contain"
              source={require('../../../assets/Image/logout.png')}
            />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={[styles.searchbar, {marginTop: 20}]}>
          <TextInput
            placeholder="Search"
            placeholderTextColor="#474747"
            style={{fontSize: 18, color: '#474747'}}
            value={search}
            onChangeText={val => searchFilterFunction(val)}
          />
          {search.length == 0 ? (
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <TouchableOpacity>
                <Feather name="search" size={30} />
              </TouchableOpacity>
            </View>
          ) : (
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <TouchableOpacity onPress={() => setSearch('')}>
                <Entypo name="circle-with-cross" size={30} />
              </TouchableOpacity>
            </View>
          )}
        </View>
        <View>
          <FlatList
            data={filteredDataSource}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('ChatScreen', {item: item, Id: true});
                }}
                style={styles.Usercard}>
                <View
                  style={{
                    height: 60,
                    width: 60,
                    borderRadius: 30,
                    backgroundColor: '#f0f0f0',
                    marginRight: 10,
                    marginTop: 5,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{fontSize: 22, fontWeight: '700', color: '#474747'}}>
                    {' '}
                    {item?.SupplierName?.substring(0, 1).toUpperCase()}
                  </Text>
                </View>
                <View
                  style={{
                    justifyContent: 'center',
                    width: '65%',
                    marginLeft: 10,
                  }}>
                  <Text
                    style={{fontSize: 18, fontWeight: '800', color: '#000'}}>
                    {item?.SupplierName}
                  </Text>
                  <Text style={{color: 'grey'}}>
                    {item?.created_at?.substring(0, 19)}
                  </Text>
                </View>
                {/* <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={{ fontWeight: '800' }}>Now</Text>
                  <View
                    style={{
                      backgroundColor: '#4eaefc',
                      height: 15,
                      width: 15,
                      borderWidth: 1,
                      marginTop: 15,
                      borderRadius: 7.5,
                    }}
                  />
                </View> */}
              </TouchableOpacity>
            )}
          />
        </View>

        <View style={{height: 30}} />
      </ScrollView>
    </View>
  );
};
export default MessageBox2;
