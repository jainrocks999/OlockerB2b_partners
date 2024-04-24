import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import axios from 'axios';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Toast from 'react-native-simple-toast';
import { Formik } from 'formik';
import * as yup from 'yup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../../../components/Loader';
import { join } from 'redux-saga/effects';
import { useDispatch, useSelector } from 'react-redux';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const loginValidationSchema = yup.object().shape({
  email: yup
    .string()
    .required('Please enter your Email')
    .matches(
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/,
      'Please enter valid Email Address',
    ),
});



const Login = () => {

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const isFetching = useSelector(state => state.isFetching);
  const [loader,setLoader]=useState(false)

  const Demo = async values => {
    const token = await AsyncStorage.getItem('Tokenfcm');
    setLoader(true)
    const data = {
        email: values.email,
        fcm_token: token
      };
    const response = await axios({
        method: 'GET',
        headers: {
          'content-type': 'application/json',
        },
        url: 'https://olocker.co/api/partners/forgetPassword',
        params: data,
      });
      if(response.data.status){
       Toast.show(response.data.msg)
       navigation.goBack()
       setLoader(false)
      }
      else{
        setLoader(false)
        Toast.show(response.data.msg)
      }
   
  };
  return (
    <Formik
      initialValues={{ email: ''}}
      onSubmit={values => Demo(values)}
      validateOnMount={true}
      validationSchema={loginValidationSchema}>
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        touched,
        isValid,
        errors,
      }) => (
        <View style={styles.container}>
          <ScrollView>
            {loader ? <Loader /> : null}
            <KeyboardAwareScrollView
              extraScrollHeight={10}
              enableOnAndroid={true}
              keyboardShouldPersistTaps="handled"
              contentContainerStyle={{ flex: 1 }}>
              <View style={styles.headerimg}>
                <Image
                  style={{ marginTop: 40 }}
                  source={require('../../../assets/ol.png')}
                />
              </View>
              <View style={[styles.card, { marginTop: 20 }]}>
                <View style={[styles.view]}>
                  <View style={styles.main}>
                    <Text style={styles.text}>Forgot Password</Text>
                  </View>
                  {/* <View style={styles.line} /> */}
                  <View style={[styles.input, { marginTop: 20 }]}>
                    <View style={{ height: hp('4%'), width: wp('5%') }}>
                      <Image
                        style={{ height: '100%', width: '100%', marginLeft: -2 }}
                        source={require('../../../assets/msg.png')}
                      />
                    </View>
                    <View style={{ width: wp('53%'), marginLeft: 1 }}>
                      <TextInput
                        style={styles.input1}
                        placeholder="Enter your Email"
                        placeholderTextColor={'grey'}
                        keyboardType="email-address"
                        onChangeText={handleChange('email')}
                        onBlur={handleBlur('email')}
                        value={values.email}
                        returnKeyType="go"
                      />
                    </View>
                  </View>
                  <View style={styles.error}>
                    {errors.email && touched.email && (
                      <Text style={styles.warn}>{errors.email}</Text>
                    )}
                  </View>
                 
                
                  <View style={{ paddingHorizontal: 20 }}>
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => {
                        handleSubmit();
                      }}>
                      <Text style={{ color: '#474747' }}>Send</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={{ height: 40 }} />
                </View>
             
              </View>
            </KeyboardAwareScrollView>
          </ScrollView>
        </View>
      )}
    </Formik>
  );
};
export default Login;
