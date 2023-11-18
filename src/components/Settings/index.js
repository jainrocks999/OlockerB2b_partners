import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../Loader';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { select } from 'redux-saga/effects';
import Toast from 'react-native-simple-toast';

const Settings =() => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const network_id = useSelector(state => state.network_id)
  console.log(network_id);
  const selector = useSelector(state => state.SupplierDetail?.detail)
  const selector1 = useSelector(state => state.Status)
  const removenetwork = async (id) => {
    const Token = await AsyncStorage.getItem('loginToken');
    const srno = await AsyncStorage.getItem('Partnersrno');
    dispatch({
      type: 'User_removeNetworkSupplier_Request',
      url: '/partners/removeNetworkSupplier',
      supplierId: selector.SrNo,
      Token: Token,
      network_id: id,
      partnerId:srno,
      navigation,
      Status: 1,

    })
  }
  return (
    <View>
      {selector.isAdd == 0 ? null :
        <View style={{
          backgroundColor: '#fff',
          paddingVertical: 30,
          paddingHorizontal: 15,
        }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: 0,
              width: '33%',
            }}>
            <View style={{ width: '100%' }}>
              <Text
                style={{
                  fontSize: 14,
                  width: '100%',
                  color: '#3e3e3e',
                  fontFamily: 'Acephimere',
                }}>
                {'Remove from network'}
              </Text>
            </View>
            <View
              style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 20 }}>

              <TouchableOpacity
                onPress={() => removenetwork(network_id)}
                style={{
                  borderColor: '#e9056b',
                  paddingHorizontal: 18,
                  paddingVertical: 6,
                  borderRadius: 8,
                  borderWidth: 1,
                }}>
                <Text
                  style={{
                    color: '#e9056b',
                    fontFamily: 'Acephimere',
                    fontSize: 12,
                  }}>
                  {'REMOVE'}
                </Text>
              </TouchableOpacity>

            </View>
          </View>
        </View>
      }
    </View>
  );
};
export default Settings;
