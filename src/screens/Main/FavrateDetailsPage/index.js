import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Image,
  Dimensions,
  Share,
} from 'react-native';
import Header from '../../../components/Header2';
import { useNavigation } from '@react-navigation/native';
import { useIsFocused } from '@react-navigation/native';
import ImagePath from '../../../components/ImagePath';
import styles from './styles';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Loader from '../../../components/Loader'
const MyProducts = ({ route }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const [liked, setLiked] = useState([]);
  const win = Dimensions.get('window');
  const WishList = useSelector(state => state.WishList)
  const isFetching = useSelector(state => state.isFetching);
  const [click1, setClick1] = useState(false);


  useEffect(() => {
    if (isFocused) {
     
      Apicall();

    }
  }, [isFocused])
  const Apicall = async () => {
    const partnerid = await AsyncStorage.getItem('Partnersrno');
    const Token = await AsyncStorage.getItem('loginToken');
    dispatch({
      type: 'Get_wishListProduct_Request',
      url: 'partners/wishListProduct',
      partnerId: partnerid,
      userType: 'partner',
      Token: Token,

    });
  }



  const ProductDetalis = async item => {
console.log('virendra,,,,,favlist  ,,,,',item);
    const partnerid = await AsyncStorage.getItem('Partnersrno');
    const Token = await AsyncStorage.getItem('loginToken');
    dispatch({
      type: 'User_singleProductDetail_Request',
      url: 'partners/singleProductDetail',
      userId:  item.PartnerSrNo==0? item.SupplierSrNo: item.PartnerSrNo,
      userType:  item.PartnerSrNo==0?'supplier':'partner',
      productId: item.SrNo,
      Token: Token,
      name: item.ItemName,
      login_user_id: partnerid,
      login_user_type: 'partner',
      mg: item.is_exist,
      navigation,
    });
  };

  const RemoveWislist = async (item, index) => {

    const partnerid = await AsyncStorage.getItem('Partnersrno');
    const Token = await AsyncStorage.getItem('loginToken');
    dispatch({
      type: 'Get_removeProductWishlist_Request',
      url: 'partners/removeProductWishlist',
      PartnerSrNo: partnerid,
      productId: item.SrNo,
      userType: 'partner',
      Token: Token,
      navigation,

    });
  }
  const share = async () => {
    await Share.share({
      message: `Product Name : ${name} \nProduct Price : ${pr} \n Product Description : ${Description}`,
    });
  };
  return (
    <View style={styles.container}>
      <Header
        source={require('../../../assets/L.png')}
        source2={require('../../../assets/Fo.png')}
        //  source2={require('../../../assets/Image/dil.png')}
        title={'Wishlist'}
        onPress={() =>
          navigation.reset({ index: 0, routes: [{ name: 'Home' }] })
        }
        onPress2={() => navigation.navigate('MessageBox')}
      />
      {isFetching ? <Loader /> : null}
     
      {WishList?.wishlistitems?.length == 0 ?

        <View style={{ justifyContent: 'center', alignSelf: 'center', height: '90%', }}>
          <Text style={{ color: 'grey', fontFamily: 'Acephimere', fontSize: 19, fontWeight: '700' }}> {'No WishList Data'} </Text>
          {/* <Text style={styles.tlength}>{data2?.length === 0 ? 'No Pending Approval' : `${selector?.suppliers?.length}${'Pending Approval'}`}</Text> */}
        </View> :
         <ScrollView style={{flex:1}}>
        <View>
          <View style={styles.main}>
            <View>
              <Text style={styles.text}>{WishList?.wishlistitems?.length == 1 ? `${WishList?.wishlistitems?.length} Item` : `${WishList?.wishlistitems?.length} Items`}</Text>
            </View>
          </View>
          {console.log('virendra,,,,,favlist  ,,,1212,',WishList?.wishlistitems)}
          <View style={styles.card}>
            <FlatList
              data={WishList?.wishlistitems}
              numColumns={2}
              renderItem={({ item, index }) => (
                <View style={styles.cardview}>
               
                  <View
                    style={{
                      height: hp('100%'),
                      width: wp('45%'),
                      maxHeight: hp('25%'),
                      borderWidth: 0,
                      // borderColor: 'red',
                    }}>
                    <View
                      style={{ height: hp('7%'), width: '100%', borderWidth: 0 }}>
                      <View
                        style={{
                          padding: 0,
                          height: hp('5%'),
                          width: '18%',
                          borderWidth: 0,
                          marginTop: 0,
                        }}>
                        <TouchableOpacity
                          onPress={() => {
                            RemoveWislist(item, index)
                           
                            // if (liked.includes(index)) {
                            //   let unlike = liked.filter(elem => elem !== index);
                            //   setLiked(unlike);


                            // } else {
                            //   setLiked([...liked, index]);
                            //   { RemoveWislist(item, index) }
                            // }
                          }}
                        // onPress={() => click(click1)}
                        >
                          <Image
                            style={{
                              height: hp('2.4%'),
                              width: wp('6%'),
                              marginLeft: 5,
                              marginTop: 5,
                              tintColor: 'red',
                            }}
                            source={require('../../../assets/Image/dil.png')}
                          />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => share(item)}>
                          <Image
                            style={{
                              height: hp('2%'),
                              width: wp('6%'),
                              marginTop: 10,
                              marginLeft: 8,
                            }}
                            source={require('../../../assets/Image/share1.png')}
                          />
                        </TouchableOpacity>
                      </View>

                     
                      <View
                        style={{
                          borderTopRightRadius: 10,
                          borderBottomLeftRadius: 10,
                          backgroundColor: '#24a31e',
                          marginTop: Platform.OS == 'android' ? hp('-5%') : -44,
                          alignSelf: 'flex-end',
                          height: hp('2.4%'),
                          width: '45%',
                        }}>
                        <Text style={styles.cardview2text}>
                         { parseFloat(item?.GrossWt)?.toFixed(2)}
                          <Text style={styles.cardview2text}> GM</Text>
                          </Text>
                      </View>
                    </View>
                    <TouchableOpacity
                       onPress={() =>ProductDetalis(item)}
                      style={{
                        height: hp('13%'),
                        width: wp('33%'),
                        marginLeft: 19,
                        maxHeight: hp('14%'),
                        borderWidth: 0,
                      }}>
                      <Image
                        style={{
                          width: win.width * 0.35,
                          height: '100%',
                          resizeMode: 'contain',
                          alignSelf: 'center',
                          // borderWidth: 5,
                        }}
                        source={item.ImageName ? { uri: `${WishList.imagepath}${item.ImageName}` } : require('../../../assets/logo.png')}
                      />
                    </TouchableOpacity>
                    <View
                      style={{ height: hp('3%'), width: '100%', marginLeft: 20 }}>
                      <Text style={styles.cardbottomtext}>{`ID# ${item.ProductSku}`}</Text>
                      <View style={styles.cardbottom1}>
                        <Image
                          style={{ width: 16, height: 20 }}
                          source={require('../../../assets/Image/rupay.png')}
                        />
                        <Text style={styles.cardbottom1text}>{parseFloat(item.ProductsPrice)?.toFixed(2)}</Text>
                      </View>
                    </View>
                  </View>
                </View>
              )}
            />
          </View>
        </View>
        <View style={{ height: 70 }} />
        </ScrollView>
      }
      {/*  */}
     
    </View>
  );
};
export default MyProducts;
const data1 = [
  {
    title: 'Milind Jewellers',
    title1: require('../../../assets/logo.png'),
    text: 'We can supply product you have as..',
    time: 'Last replied on 07 Sep,2020',
  },
  {
    title: 'Mahabir Jewellers',
    title1: require('../../../assets/logo.png'),
    text: 'Payments term can be discussed as per..',
    time: 'Last replied on 01 Sep,2020',
  },
  {
    title: 'Narendra Jewellers',
    title1: require('../../../assets/logo.png'),
    text: 'We can supply product you have as..',
    time: 'Last replied on 03 Sep,2020',
  },
];