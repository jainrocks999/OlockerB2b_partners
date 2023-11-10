import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Platform,
  Dimensions
} from 'react-native';

const Preview = ({
  style,
  item,
  imageKey,
  onPress,
  index,
  active,
  local,
}) => {
  const BannerWidth = (Dimensions.get('window').width * 15) / 18;
  const BannerHeight = 180;
  return (
      <View style={{alignItems:'center',justifyContent:'center',borderRadius:15}}>
    <TouchableOpacity
      // onPress={() => onPress(item)}
      >
      <View style={[styles.imageContainer]}>
        <Image
          style={{height:170,width:BannerWidth,borderRadius:15}}
          source={{uri: item[imageKey]}}
        />
      </View>
    </TouchableOpacity>
    </View>
  );
};
export default Preview
const styles = StyleSheet.create({
  
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:15
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