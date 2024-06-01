import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import style from './styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loading from '../../../components/Loader';
import Toast from 'react-native-simple-toast';
import axios from 'axios';
export default function ChangePassword() {
  const [fetching, setFetching] = useState(false);
  const [inputs, setInputs] = useState({
    visible: true,
    visible1: true,
    visible2: true,
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const handleInputs = (key, value) => {
    setInputs(prev => ({...prev, [key]: value}));
  };

  const ChangePass = async () => {
    if (inputs.oldPassword == '') {
      Toast.show('old password is required.');
    } else if (inputs.newPassword == '') {
      Toast.show('new password is required.');
    } else if (inputs.confirmPassword == '') {
      Toast.show('confirm password is required.');
    } else {
      const Token = await AsyncStorage.getItem('loginToken');
      const srno = await AsyncStorage.getItem('Partnersrno');
      try {
        setFetching(true);

        let config = {
          method: 'get',
          maxBodyLength: Infinity,
          url: `https://olocker.co/api/partners//changePassword?partnerId=${srno}&old_password=${inputs.oldPassword}&new_password=${inputs.newPassword}&confirm_password=${inputs.confirmPassword}`,
          headers: {
            Olocker: `Bearer ${Token}`,
          },
        };

        axios.request(config).then(response => {
          if (response.data.status == true) {
            setFetching(false);
            // console.log(response?.data?.msg);
            Toast.show(response?.data?.msg);
            navigation.navigate('Customers');
          } else if (response.data.status == false && response.data.msg) {
            setFetching(false);
            Toast.show(response?.data?.msg);
          } else {
            setFetching(false);
            Toast.show(response?.data?.data);
          }
          console.log(JSON.stringify(response.data));
        });
      } catch (error) {}
    }
  };
  return (
    <View style={{flex: 1}}>
      <View
        style={{
          height: 50,
          backgroundColor: '#032e63',
          alignItems: 'center',
          flexDirection: 'row',
        }}>
        <TouchableOpacity
          style={{marginLeft: 10}}
          onPress={() => {
            navigation.goBack();
          }}>
          <Image
            source={require('../../../assets/L.png')}
            style={{height: 20, width: 20}}
          />
        </TouchableOpacity>
        <View>
          <Text
            style={{
              color: '#fff',
              fontSize: 20,
              marginLeft: 20,
              fontWeight: '500',
            }}>
            Change Password
          </Text>
        </View>
      </View>
      <ScrollView>
        {fetching ? <Loading /> : null}
        <View>
          <View style={{marginHorizontal: 20}}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: '800',

                color: '#000',
                marginTop: 20,
              }}>
              Create new Password
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontWeight: '500',
                width: '90%',
                marginTop: 5,
                color: 'grey',
              }}>
              Your new password must be different from previous used passwords.
            </Text>
          </View>

          <View style={{marginHorizontal: 20, marginTop: 20}}>
            <Text style={{fontSize: 15, fontWeight: '700', color: '#000'}}>
              Old Password
            </Text>
            <View
              style={[
                style.input,
                {
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                },
              ]}>
              <TextInput
                placeholder="Old password"
                placeholderTextColor={'grey'}
                value={inputs.oldPassword}
                onChangeText={val => handleInputs('oldPassword', val)}
                style={{width: '90%', color: 'grey'}}
                secureTextEntry={inputs.visible}
              />

              {inputs.visible ? (
                <TouchableOpacity
                  onPress={() => handleInputs('visible', !inputs.visible)}>
                  <Ionicons name="eye-off-outline" size={25} color={'#000'} />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => handleInputs('visible', !inputs.visible)}>
                  <Ionicons name="eye-outline" size={25} color={'#000'} />
                </TouchableOpacity>
              )}
            </View>
          </View>
          <View style={{marginHorizontal: 20, marginTop: 10}}>
            <Text style={{fontSize: 15, fontWeight: '700', color: '#000'}}>
              New Password
            </Text>
            <View
              style={[
                style.input,
                {
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                },
              ]}>
              <TextInput
                placeholder="New password"
                value={inputs.newPassword}
                onChangeText={val => handleInputs('newPassword', val)}
                secureTextEntry={inputs.visible1}
                placeholderTextColor={'grey'}
                style={{width: '90%', color: 'grey'}}
              />

              {inputs.visible1 ? (
                <TouchableOpacity
                  onPress={() => handleInputs('visible1', !inputs.visible1)}>
                  <Ionicons name="eye-off-outline" size={25} color={'#000'} />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => handleInputs('visible1', !inputs.visible1)}>
                  <Ionicons name="eye-outline" size={25} color={'#000'} />
                </TouchableOpacity>
              )}
            </View>
          </View>
          <View style={{marginHorizontal: 20, marginTop: 10}}>
            <Text style={{fontSize: 15, fontWeight: '700', color: '#000'}}>
              Confirm Password
            </Text>
            <View
              style={[
                style.input,
                {
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                },
              ]}>
              <TextInput
                placeholder="Confirm password"
                value={inputs.confirmPassword}
                onChangeText={val => handleInputs('confirmPassword', val)}
                secureTextEntry={inputs.visible2}
                placeholderTextColor={'grey'}
                style={{width: '90%', color: 'grey'}}
              />
              {inputs.visible2 ? (
                <TouchableOpacity
                  onPress={() => handleInputs('visible2', !inputs.visible2)}>
                  <Ionicons name="eye-off-outline" size={25} color={'#000'} />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => handleInputs('visible2', !inputs.visible2)}>
                  <Ionicons name="eye-outline" size={25} color={'#000'} />
                </TouchableOpacity>
              )}
            </View>
          </View>
          <View style={{marginTop: 30, marginHorizontal: 20}}>
            <TouchableOpacity
              onPress={() => ChangePass()}
              style={{
                backgroundColor: '#032e63',
                alignItems: 'center',
                justifyContent: 'center',
                height: 50,
                borderRadius: 10,
              }}>
              <Text style={{color: '#fff', fontWeight: '600', fontSize: 16}}>
                Reset Password
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
