import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Image,
  Dimensions,
  Platform,
  Share,
  Alert,
} from 'react-native';
import Header from '../../../components/CustomHeader';
import TabView from '../../../components/StoreButtomTab';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import styles from './styles';
import Loader from '../../../components/Loader';
import {useDispatch, useSelector} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
const MyProducts = ({route}) => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const name = route.params.name;
  //   const name1 = route.params.name;
  //   const id1 = route.params.id;
  //   const partner = route.params.ProductL;
  const selector = useSelector(state => state.CollectionProduct);
  const isFetching = useSelector(state => state.isFetching);
  const [liked, setLiked] = useState([]);
  const win = Dimensions.get('window');

  const RemoveWislist = async item => {
    const partnerid = await AsyncStorage.getItem('Partnersrno');
    const Token = await AsyncStorage.getItem('loginToken');
    dispatch({
      type: 'Get_removeProductWishlist_Request',
      url: 'partners/removeProductWishlist',
      PartnerSrNo: partnerid,
      productId: item.SrNo,
      userType: 'partner',
      collectionid: item.collection_srno,
      name: item.Name,
      iscollection: true,
      Token,
    });
  };

  const AddWishList = async (item, index) => {
    const partnerid = await AsyncStorage.getItem('Partnersrno');
    const Token = await AsyncStorage.getItem('loginToken');
    dispatch({
      type: 'User_addProductWishlist_Request',
      url: 'partners/addProductitemWishlist',
      checkProduct: item.SrNo,
      PartnerSrNo: partnerid,
      userType: 'partner',
      Token: Token,
      collectionid: item.collection_srno,
      name: item.Name,
      iscollection: true,
    });
  };
  const share1 = async id => {
    let pr = id.Price;
    let name = id.ItemName;
    let image = id.ImageName;
    let Description = id.Description;

    await Share.share({
      message: `Product Name : ${name}${
        id.ProductSku
      } \n app url:${'https://olocker.co/partners'}\n  playStore url: ${'https://play.google.com/store/apps'}`,
      // url1 : 'https://play.google.com/store/apps',
    });
  };

  const ProductDetalis = async item => {
    const partnerid = await AsyncStorage.getItem('Partnersrno');
    const Token = await AsyncStorage.getItem('loginToken');
    dispatch({
      type: 'User_singleProductDetail_Request',
      url: 'partners/singleProductDetail',
      userId: partnerid,
      userType: 'partner',
      productId: item.SrNo,
      Token: Token,
      name: item.ItemName,
      login_user_id: partnerid,
      login_user_type: 'partner',
      mg: item.is_exist,
      navigation,
      collection_id: item.collection_srno,
    });
  };

  return (
    <View style={styles.container}>
      <Header
        source={require('../../../assets/L.png')}
        source1={require('../../../assets/Fo.png')}
        source2={require('../../../assets/Image/dil.png')}
        title={`${name}`}
        onPress={() => navigation.goBack()}
        onPress1={() => navigation.navigate('MessageBox')}
        onPress2={() => navigation.navigate('FavDetails')}
      />
      {isFetching ? <Loader /> : null}

      {selector?.list?.length == 0 || selector?.list?.length == undefined ? (
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
            {'Collection product not found.'}{' '}
          </Text>
        </View>
      ) : (
        <ScrollView>
          <View style={styles.main}>
            <View>
              <Text style={styles.text}>
                {selector?.list?.length === 1
                  ? `${selector?.list?.length} Item`
                  : `${selector?.list?.length} Items`}
              </Text>
            </View>
          </View>
          <View style={styles.card}>
            <FlatList
              data={selector?.list}
              numColumns={2}
              scrollEnabled={false}
              // keyExtractor={index => index}
              renderItem={({item, index}) => (
                <TouchableOpacity
                  onPress={() => ProductDetalis(item)}
                  style={styles.cardview}>
                  <View
                    style={{
                      height: hp('100%'),
                      width: wp('45%'),
                      maxHeight: hp('24%'),
                      borderWidth: 0,
                      borderColor: 'red',
                    }}>
                    <View
                      style={{
                        width: '100%',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <View style={{width: '18%'}}>
                        {item.is_exist == false ? (
                          <TouchableOpacity
                            style={{alignItems: 'center', alignSelf: 'center'}}
                            onPress={() => {
                              AddWishList(item, index);
                            }}>
                            <Image
                              style={{
                                width: 22,
                                height: 19,
                                marginLeft: 5,
                                marginTop: 7,
                                tintColor: 'grey',
                              }}
                              source={require('../../../assets/Image/dil.png')}
                            />
                          </TouchableOpacity>
                        ) : (
                          <TouchableOpacity
                            style={{alignItems: 'center', alignSelf: 'center'}}
                            onPress={() => {
                              RemoveWislist(item, index);
                            }}>
                            <Image
                              style={{
                                width: 22,
                                height: 19,
                                marginLeft: 5,
                                marginTop: 7,
                                tintColor: 'red',
                              }}
                              source={require('../../../assets/Image/dil.png')}
                            />
                          </TouchableOpacity>
                        )}
                      </View>
                      <View
                        style={{
                          borderTopRightRadius: 10,
                          borderBottomLeftRadius: 10,
                          backgroundColor: '#24a31e',
                          marginTop: Platform.OS === 'android' ? 0 : 0,
                          height: hp('2.4%'),
                          paddingHorizontal: 5,
                          alignItems: 'center',
                          justifyContent: 'center',
                          // width: '45.5%',
                        }}>
                        <Text style={styles.cardview2text}>
                          {parseFloat(item.GrossWt)?.toFixed(2)}
                          <Text style={styles.cardview2text}> GM</Text>
                        </Text>
                      </View>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        paddingHorizontal: 10,
                      }}>
                      <TouchableOpacity onPress={() => share1(item)}>
                        <Image
                          style={{
                            height: hp('2%'),
                            width: wp('5.7%'),
                            marginTop: 10,
                            marginLeft: 0,
                          }}
                          source={require('../../../assets/Image/share1.png')}
                        />
                      </TouchableOpacity>
                      <View
                        style={{
                          height: hp('13.9%'),
                          width: wp('38%'),
                        }}>
                        <Image
                          style={{
                            width: win.width * 0.33,
                            height: '100%',
                            resizeMode: 'contain',
                            alignSelf: 'center',
                          }}
                          source={
                            item.ImageName
                              ? {
                                  uri: `${'https://olocker.co/uploads/product/'}${
                                    item.ImageName
                                  }`,
                                }
                              : require('../../../assets/logo.png')
                          }
                        />
                      </View>
                    </View>
                    <View
                      style={{
                        height: hp('3%'),
                        width: '100%',
                        marginLeft: 35,
                      }}>
                      <Text
                        style={
                          styles.cardbottomtext
                        }>{`ID# ${item.ProductSku}`}</Text>
                      <View style={styles.cardbottom1}>
                        <Image
                          style={{width: 16, height: 20}}
                          source={require('../../../assets/Image/rupay.png')}
                        />
                        <Text style={styles.cardbottom1text}>
                          {item?.ProductsPrice == null
                            ? parseFloat(item.ProductCharges)?.toFixed(2)
                            : parseFloat(item.ProductsPrice)?.toFixed(2) ?? '0'}
                        </Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>
          <View style={{height: 70}} />
        </ScrollView>
      )}
      <View style={{bottom: 0, left: 0, right: 0, position: 'absolute'}}>
        {/* <TabView /> */}
      </View>
    </View>
  );
};
export default MyProducts;
