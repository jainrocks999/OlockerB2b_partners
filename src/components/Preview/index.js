import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Platform,
  Dimensions,
} from 'react-native';

const Preview = ({style, item, imageKey, onPress, index, active, local}) => {
  const BannerWidth = (Dimensions.get('window').width * 15) / 18;
  const BannerHeight = 180;
  return (
    <View
      style={{
        // alignItems: 'center',
        // justifyContent: 'center',
        borderWidth: 5,
        borderColor: '#032e63',
        borderRadius: 15,
        // marginRight:-2
        marginLeft: -1.5,
        // alignSelf: 'center',
      }}>
      <TouchableOpacity onPress={() => console.log('jssfsfns')}>
        <View style={[styles.imageContainer]}>
          <Image
            style={{height: 190, width: BannerWidth, borderRadius: BannerWidth}}
            source={{uri: item[imageKey]}}
            resizeMode={Platform.OS == 'android' ? 'contain' : ''}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};
export default Preview;
const styles = StyleSheet.create({
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    height: 200,
    width: '100%',
  },
  shadow: {
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.1,
        shadowRadius: 5,
      },
      android: {
        elevation: 5,
      },
    }),
  },
});
