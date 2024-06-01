import React, {useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  PermissionsAndroid,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import styles from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Splash = () => {
  const navigation = useNavigation();

  useEffect(() => {
    requestPermissions();
  }, []);

  const requestPermissions = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
        {
          title: 'Olocker Notification Permission',
          message:
            'Olocker would like to send you push notifications ' +
            'to keep you updated on the latest photo trends and app features.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Don’t Allow',
          buttonPositive: 'Allow',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the camera');
      }
      console.log('this', granted);
    } catch (err) {
      console.warn(err);
    }
  };

  useEffect(() => {
    const unmemory = setInterval(() => {}, 3000);

    return () => {
      clearInterval(unmemory);
    };
  });
  useEffect(() => {
    initial();
  }, []);

  const initial = async () => {
    // setTimeout(() => navigation.replace('Login'), 2000);
    let Token = await AsyncStorage.getItem('loginToken');

    if (!Token) {
      setTimeout(() => navigation.replace('Login'), 2000);
    } else {
      //  if(SubscribeDetails.exp_date >= currentDate){
      setTimeout(() => navigation.replace('Home'), 2000);
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.view}>
        <Image
          style={styles.image}
          source={require('../../../assets/ol.png')}
        />
      </View>
    </View>
  );
};
export default Splash;
