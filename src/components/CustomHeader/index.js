import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const Header = ({
  title,
  source,
  onPress,
  source1,
  source2,
  onPress1,
  onPress2,
}) => {
  const navigation = useNavigation();
  return (
    <View>
      <View style={styles.container}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          {source?<TouchableOpacity
            style={{paddingVertical:15, width: 35,alignItems:'center',justifyContent:'center',marginLeft:-15}}
            delayPressIn={0}
            onPress={() => navigation.goBack()}>
            <Image style={styles.img} source={source} />
          </TouchableOpacity>:null}
          <Text style={[styles.text, {marginLeft: 5}]}>{title}</Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity onPress={onPress1}>
            <Image style={styles.img1} source={source1} />
          </TouchableOpacity>
          <TouchableOpacity onPress={onPress2}
          style={{marginLeft: 20}}>
            <Image style={styles.img2} source={source2} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
export default Header;
const styles = StyleSheet.create({
  container1: {
    flex: 1,
    backgroundColor: '#f0eeee',
  },
  img: {
    height: 18,
    width: 12,
  },
  img1: {
    height: 20,
    width: 25,
  },
  img2: {
    height: 22,
    width: 26,
    tintColor:'#fff'

  },
  // img1: {
  //   height: 20,
  //   width: 25,
  // },
  // img2: {
  //   height: 26,
  //   width: 22,
  // },
  container: {
    width: '100%',
    backgroundColor: '#032e63',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    flexDirection: 'row',
    paddingVertical: 12,
  },
  text: {
    color: 'white',
    fontSize: 18,
    fontFamily:'Roboto-Medium'
  },
});
