import React, { useEffect } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Splash = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const unmemory = setInterval(() => { }, 3000);

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
