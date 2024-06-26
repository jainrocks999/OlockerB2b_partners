import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Image,
  ImageBackground,
} from 'react-native';
import Header from '../../../components/CustomHeader';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles';
import {useSelector} from 'react-redux';
const MyProducts = ({route}) => {
  const navigation = useNavigation();
  const selector = useSelector(state => state.Gold?.goldPrices);
  return (
    <View style={{flex: 1}}>
      <Header
        source={require('../../../assets/L.png')}
        source1={require('../../../assets/Fo.png')}
        source2={require('../../../assets/Image/dil.png')}
        title={'Gold Price'}
        onPress1={() => navigation.navigate('Message')}
        onPress2={() => navigation.navigate('FavDetails')}
      />
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
            {'No Gold Price List'}{' '}
          </Text>
        </View>
      ) : (
      <ScrollView>
        <View style={styles.bottomv}>
          <FlatList
            numColumns={3}
            data={selector}
            renderItem={({item}) => (
              <ImageBackground
                source={require('../../../assets/PartnerImage/goldIcon.png')}
                style={styles.Bimg}>
                <Text style={styles.Bt}>{`${((item.Purity * 24) / 1000).toFixed(
                  0,
                )} K`}</Text>
                <View style={styles.Bv}>
                <Text style={{ fontFamily: 'Roboto-Medium',
    fontSize: 13,
    
    fontWeight: '600',
    color:'#474747'}}>({`${item.Purity}`})</Text>
                  <View style={{flexDirection:'row',bottom:-3,alignItems:'center',justifyContent:'center'}}>

                 
                  <Image
                    style={{height: 16, width: 20,marginTop:3}}
                    source={require('../../../assets/Image/rupay.png')}
                  />
                  <Text style={styles.Btt}>{item.AM}</Text>
                  </View>
                </View>
              </ImageBackground>
            )}
          />
        </View>
        <View style={{height: 70}} />
      </ScrollView>
      )}
    </View>
  );
};
export default MyProducts;
