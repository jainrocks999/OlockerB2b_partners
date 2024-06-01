import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Dimensions,
  Image,
  ScrollView,
  TouchableOpacity,
  Share,
  Alert,
} from 'react-native';
import Header from '../../../components/CustomHeader';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import StatusBar from '../../../components/StatusBar';
import axios from 'axios';
import styles from './styles';
import Loader from '../../../components/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSelector, useDispatch} from 'react-redux';
import Toast from 'react-native-simple-toast';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
const HomeScreen = ({route}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const isFocuse = useIsFocused();
  const selector = useSelector(state => state?.partnerprofile);
  const detail = selector?.partnerdetails;
  const [data1, setData1] = useState('');
  const isFetching = useSelector(state => state.isFetching);
  const [visiable, setVisiable] = useState(false);
  const [rating1, setRatting1] = useState(0);
  const [clicked, setClicked] = useState(false);
  const BannerWidth = (Dimensions.get('window').width * 15) / 16;
  const BannerHeight = 140;

  const share = async () => {
    await Share.share({
      message: `Supplier Name : ${detail?.CompanyName}\nEmail Address :${detail?.BillingContactEmail}`,
    });
  };
  useEffect(() => {
    if (isFocuse) {
      partnerDetail();
    }
  }, [isFocuse]);

  const partnerDetail = async () => {
    const partnerid = await AsyncStorage.getItem('Partnersrno');
    const Token = await AsyncStorage.getItem('loginToken');
    dispatch({
      type: 'User_editProfile_Request',
      url: 'partners/editProfile',
      partnerId: partnerid,
      Token: Token,
    });
  };

  useEffect(() => {
    {
      detail?.PinCode ? handlePincode(detail?.PinCode) : null;
    }
  }, [detail?.PinCode]);

  const handlePincode = async val => {
    const Token = await AsyncStorage.getItem('loginToken');
    if (val.length == 6) {
      setVisiable(true);
      try {
        const response = await axios({
          method: 'GET',
          headers: {
            'content-type': 'application/json',
            Olocker: `Bearer ${Token}`,
          },
          url: `https://olocker.co/api/partners//getCityByState?pincode=${val}`,
        });

        if (response.status == 200) {
          console.log('response ...data ', response.data);
          setData1(response.data);
          // handleInputs1('District', response.data.District);
          // handleInputs1('State', response.data.State);
          setVisiable(false);
          // Toast.show(response.data.msg);
        } else {
          setVisiable(false);
          // Toast.show(response.data.msg);
        }
      } catch (error) {
        Toast.show('Something went wrong');
        setVisiable(false);
      }
    } else {
      //  setPinCode(val)
    }
  };
  function extractImages(selector) {
    const images = {
      owner: [],
      showroom: [],
      product: [],
    };

    selector?.partnerimagedetails?.forEach(item => {
      for (let i = 1; i <= 3; i++) {
        const ownerImage = item[`OwnerImageName${i}`];
        const showroomImage = item[`ShowRoomImageName${i}`];
        const productImage = item[`ProductImage${i}`];
        const ownerName = item[`OwnerName${i}`];
        const ProductName=item[`ProductName${i}`];
        ownerImage && images.owner.push({Image: ownerImage, name: ownerName});
        showroomImage && images.showroom.push({Image: showroomImage});
        productImage && images.product.push({Image: productImage,name:ProductName});
      }
    });
    return images;
  }
  const extractedImages = extractImages(selector);

  const manageoption = async () => {
    const Token = await AsyncStorage.getItem('loginToken');
    dispatch({
      type: 'Get_getCities_Request',
      url: '/partners/getCities',
      stateId: selector?.partnerdetails?.StateId,
      Token: Token,
      selector: selector,
      extractedImages: extractedImages,
      navigation,
    });
  };

  const Logout = () => {
    Alert.alert(
      'Are you sure you want to log out?',
      '',
      [
        {
          text: 'Cancel',
          onPress: () => {
            cancelable: false;
          },
          style: 'cancel',
        },
        {text: 'ok', onPress: () => LogoutApp()},
      ],
      {cancelable: false},
    );
  };

  const LogoutApp = async () => {
    const Token = await AsyncStorage.getItem('loginToken');
    const fcmToken = await AsyncStorage.getItem('Tokenfcm');
    const Id = await AsyncStorage.getItem('Partnersrno');
    setVisiable(true);
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `https://olocker.co/api/partners/logout?partnerId=${Id}&fcm_token=${fcmToken}`,
      headers: {
        Olocker: `Bearer ${Token}`,
      },
    };

    axios
      .request(config)
      .then(response => {
        if (response.data.status == true) {
          setVisiable(false);
          navigation.navigate('Login');
          AsyncStorage.setItem('loginToken', '');
          Toast.show(response.data.msg);
        } else {
          Toast.show(response.data.msg);
          setVisiable(false);
        }
      })
      .catch(error => {
        setVisiable(false);
        console.log(error);
      });
  };

  return (
    <View style={styles.container}>
      <Header
        source={require('../../../assets/L.png')}
        source2={require('../../../assets/Image/dil.png')}
        source1={require('../../../assets/Fo.png')}
        title={'Partner Profile '}
        onPress={() => navigation.goBack()}
        onPress2={() => navigation.navigate('FavDetails')}
        onPress1={() => navigation.navigate('MessageBox')}
      />
      {isFetching || visiable ? <Loader /> : null}
      <ScrollView>
        <View style={{backgroundColor: '#032e63'}}>
          <View style={styles.main}>
            <View style={styles.main1}>
              <Image
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: 10,
                  resizeMode: 'stretch',
                }}
                source={
                  detail?.Logo
                    ? {
                        uri: `https://olocker.co/uploads/partner/${detail?.Logo}`,
                      }
                    : require('../../../assets/logo.png')
                }
              />
            </View>
            <View style={styles.details}>
              <Text style={[styles.text1, {fontSize: 19}]}>
                {' '}
                {detail?.CompanyName}
              </Text>
              <Text style={[styles.text1, {fontSize: 12}]}>
                {' '}
                {detail?.Location}{' '}
              </Text>

              <View style={styles.star}>
                <TouchableOpacity
                  onPress={() => share()}
                  style={[
                    styles.phone,
                    {marginLeft: 10, alignSelf: 'flex-end'},
                  ]}>
                  <Image
                    style={{width: 35, height: 35}}
                    source={require('../../../assets/PartnerImage/15.png')}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={styles.addButtonV}>
            <TouchableOpacity
              onPress={() => manageoption()}
              style={[styles.addButton, {backgroundColor: '#ea056c'}]}>
              <Text
                style={[
                  styles.text1,
                  {fontSize: 12, color: '#FFF', fontWeight: '900'},
                ]}>
                {'Edit profile'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('changepassword')}
              style={[styles.addButton, {backgroundColor: '#ea056c'}]}>
              <Text
                style={[
                  styles.text1,
                  {fontSize: 12, color: '#FFF', fontWeight: '900'},
                ]}>
                {'Change Password'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => Logout()}
              style={[styles.addButton, {backgroundColor: '#ea056c'}]}>
              <Text
                style={[
                  styles.text1,
                  {fontSize: 12, color: '#FFF', fontWeight: '900'},
                ]}>
                {'Logout'}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.blankV} />
        </View>

        <View style={{marginTop: 0}}>
          <View style={{flex: 1, backgroundColor: '#fff', paddingVertical: 20}}>
            <View style={{paddingHorizontal: 20, alignItems: 'flex-start'}}>
              <View
                style={{
                  backgroundColor: '#032e63',
                  // paddingHorizontal: 20,
                  // paddingVertical: 8,
                  borderRadius: 20,
                  height: hp(5),
                  width: wp(35),
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    color: '#fff',
                    fontSize: wp(4),
                    fontFamily: 'Acephimere',
                  }}>
                  About us
                </Text>
              </View>
              <Text
                style={{
                  fontSize: wp(4),
                  textAlign: 'center',
                  marginTop: 20,
                  color: '#535353',
                  fontFamily: 'Acephimere',
                  marginLeft: wp(2),
                }}>
                {detail?.PartnerIntroduction}
              </Text>

              <View
                style={{
                  backgroundColor: '#032e63',
                  // paddingHorizontal: 19,
                  // paddingVertical: 8,
                  borderRadius: 20,
                  height: hp(5),
                  width: wp(35),
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: 15,
                }}>
                <Text
                  style={{
                    color: '#fff',
                    fontSize: wp(4),
                    fontFamily: 'Acephimere',
                  }}>
                  Founders
                </Text>
              </View>

              <View style={{flexDirection: 'row'}}>
                {extractedImages?.owner?.map(item => (
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      width: wp(32),
                      paddingVertical: 15,
                    }}>
                    <View style={{width: '80%', alignItems: 'center'}}>
                      <View style={{height: 90, width: '100%', borderWidth: 1}}>
                        <Image
                          style={{height: '100%', width: '100%'}}
                          resizeMode={'stretch'}
                          source={{
                            uri: `https://olocker.co/uploads/partner/${item?.Image}`,
                          }}
                        />
                      </View>
                      <Text
                        style={{
                          marginTop: 5,
                          color: '#032e63',
                          fontFamily: 'Acephimere',
                          fontSize: 13,
                        }}>
                        {item.name}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>

              <View
                style={{
                  backgroundColor: '#032e63',
                  // paddingHorizontal: 19,
                  // paddingVertical: 8,
                  borderRadius: 20,
                  height: hp(5),
                  width: wp(35),
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: 15,
                }}>
                <Text
                  style={{
                    color: '#fff',
                    fontSize: wp(4),
                    fontFamily: 'Acephimere',
                  }}>
                 Products
                </Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                {extractedImages?.product?.map(item => (
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      width: wp(32),
                      paddingVertical: 15,
                    }}>
                    <View style={{width: '80%', alignItems: 'center'}}>
                      <View style={{height: 90, width: '100%', borderWidth: 1}}>
                        <Image
                          style={{height: '100%', width: '100%'}}
                          resizeMode={'stretch'}
                          source={{
                            uri: `https://olocker.co/uploads/partner/${item?.Image}`,
                          }}
                        />
                      </View>
                      <Text
                        style={{
                          marginTop: 5,
                          color: '#032e63',
                          fontFamily: 'Acephimere',
                          fontSize: 13,
                        }}>
                        {item.name}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>



              <View>
                <View
                  style={{
                    backgroundColor: '#032e63',
                    borderRadius: 20,
                    height: hp(5),
                    width: wp(35),
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: 15,
                  }}>
                  <Text
                    style={{
                      color: '#fff',
                      fontSize: wp(4),
                      fontFamily: 'Acephimere',
                      // width: '90%',
                    }}>
                    Showrooms
                  </Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  {extractedImages?.showroom?.map(item => (
                 
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        width: wp(32),
                        paddingVertical: 15,
                      }}>
                      <View style={{width: '80%', alignItems: 'center'}}>
                        <View
                          style={{height: 90, width: '100%', borderWidth: 1}}>
                          <Image
                            style={{height: '100%', width: '100%'}}
                            resizeMode={'stretch'}
                            source={{
                              uri: `https://olocker.co/uploads/partner/${item?.Image}`,
                            }}
                          />
                        </View>
                        {/* <Text style={{ marginTop: 5, color: '#032e63', fontFamily: 'Acephimere', fontSize: 13 }}>{item.name}</Text> */}
                      </View>
                    </View>
                  ))}
                </View>
              </View>

              <View
                style={{
                  backgroundColor: '#032e63',
                  // paddingHorizontal: 20,
                  // paddingVertical: 8,
                  borderRadius: 20,
                  height: hp(5),
                  width: wp(35),
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: 15,
                }}>
                <Text
                  style={{
                    color: '#fff',
                    fontSize: wp(4),
                    fontFamily: 'Acephimere',
                  }}>
                  Address
                </Text>
              </View>
              <View style={{paddingHorizontal: 20, marginTop: 10}}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Image
                    style={{height: 30, width: 22}}
                    source={require('../../../assets/Image/loc.png')}
                  />
                  <Text
                    style={{
                      marginLeft: 20,
                      fontSize: wp(4),
                      fontFamily: 'Acephimere',
                      color: '#424242',
                    }}>
                    {`${
                      detail?.HOaddress
                    } , ${data1?.District?.toLowerCase()} , ${data1?.State?.toLowerCase()} , ${
                      data1?.Pincode
                    }`}
                  </Text>
                </View>
              </View>

              <View>
                <View
                  style={{
                    backgroundColor: '#032e63',
                    // paddingHorizontal: 20,
                    // paddingVertical: 8,
                    borderRadius: 20,
                    height: hp(5),
                    width: wp(35),
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: 15,
                  }}>
                  <Text
                    style={{
                      color: '#fff',
                      fontSize: wp(4),
                      fontFamily: 'Acephimere',
                    }}>
                    Contact
                  </Text>
                </View>
                <View style={{paddingHorizontal: 20, marginTop: 20}}>
                  <View style={{flexDirection: 'row',alignItems:'center'}}>
                    <Image
                      style={{height: 28, width: 28}}
                      source={require('../../../assets/PartnerImage/16.png')}
                    />
                    <View>
                      <Text
                        style={{
                          marginLeft: 20,
                          fontSize: wp(4),
                          fontFamily: 'Acephimere',
                          color: '#424242',
                        }}>{`+91${selector?.partnerlogins?.Mobile}`}</Text>
                    </View>
                  </View>
                  <View style={{flexDirection: 'row', marginTop: 20,alignItems:'center'}}>
                    <Image
                      style={{height: 28, width: 28}}
                      source={require('../../../assets/PartnerImage/msg.png')}
                    />
                   
                      <Text
                        style={{
                          marginLeft: 20,
                          fontSize: wp(4),
                          fontFamily: 'Acephimere',
                          color: '#424242',textAlign:'center'
                        }}>
                        {detail?.BillingContactEmail}
                      </Text>
                    
                  </View>
                  {/* {detail?.Website ? ( */}
                    <View style={{flexDirection: 'row', marginTop: 20}}>
                      <Image
                        style={{height: 28, width: 28}}
                        source={require('../../../assets/PartnerImage/website.png')}
                      />
                      <View>
                        <Text
                          style={{
                            marginLeft: 20,
                            fontSize: wp(4),
                            fontFamily: 'Acephimere',
                            color: '#424242',
                          }}>
                          {detail?.Website}
                        </Text>
                      </View>
                    </View>
                  {/* ) : null} */}
                  <View style={{height: 100}} />
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      <StatusBar />
    </View>
  );
};
export default HomeScreen;

// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   ScrollView,
//   Image,
//   TouchableOpacity,
//   TextInput,
//   FlatList,
// } from 'react-native';
// import TabView from '../../../components/StoreButtomTab';
// import Header from '../../../components/CustomHeader';
// import { useNavigation } from '@react-navigation/native';
// import {
//   VictoryBar,
//   VictoryChart,
//   VictoryAxis,
//   VictoryTheme,
// } from 'victory-native';
// import RNPickerSelect from 'react-native-picker-select';
// import styles from './styles';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const MyCatalogue = () => {
//   const navigation = useNavigation();
//   const [status, setStatus] = useState('');
//   const [data1, setUserdata] = useState(false);
//   const [data2, setUserdata1] = useState('');
//   const date = new Date();
//   let ToDAY = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;

//   const data = [
//     { quarter: 1, earnings: 500 },
//     { quarter: 2, earnings: 1000 },
//     { quarter: 3, earnings: 2000 },
//     { quarter: 4, earnings: 3000 },
//     { quarter: 5, earnings: 4000 },
//     { quarter: 6, earnings: 5000 },
//     { quarter: 7, earnings: 6000 },
//     { quarter: 8, earnings: 7000 },
//     { quarter: 9, earnings: '' },
//     { quarter: 10, earnings: '' },
//     { quarter: 11, earnings: '' },
//     { quarter: 12, earnings: '' },
//   ];
//   return (
//     <View style={{ flex: 1 }}>
//       <Header
//         source1={require('../../../assets/Fo.png')}
//         source2={require('../../../assets/Image/dil.png')}
//         title={'My Customers '}
//         onPress={() => navigation.goBack()}
//         // onPress1={() => navigation.navigate('Message')}
//         onPress2={() => navigation.navigate('FavDetails')}
//       />

//       <ScrollView>
//         <View style={styles.main}>
//           <View style={{ height: 150 }} />
//         </View>
//         <View style={styles.card}>
//           <View style={styles.cardV}>
//             <View style={styles.cardV1}>
//               <Text style={styles.cardV1t}>{123}</Text>
//               <Text style={styles.cardV1tt}>Today Downloads</Text>
//             </View>
//             <View style={styles.cardV1}>
//               <Text style={styles.cardV1t}>{1234}</Text>
//               <Text style={styles.cardV1tt}>Total Downloads</Text>
//             </View>
//           </View>
//         </View>
//         <View style={styles.card2}>
//           <TouchableOpacity
//             onPress={() => navigation.navigate('Mycustomer')}
//             style={{ alignItems: 'center' }}>
//             <View style={{}}>
//               <Image
//                 style={styles.card2img}
//                 source={require('../../../assets/Image/myCustomerImage.png')}
//               />
//             </View>
//             <Text style={styles.card2t}>{'My Customers'}</Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             onPress={() => navigation.navigate('Feedback')}
//             style={{ alignItems: 'center' }}>
//             <View style={{}}>
//               <Image
//                 style={styles.card2img}
//                 source={require('../../../assets/Image/feedbackI.png')}
//               />
//             </View>
//             <Text style={styles.card2t}>{'Feedback'}</Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             onPress={() => navigation.navigate('Loyalty1')}
//             style={{ alignItems: 'center' }}>
//             <View style={{}}>
//               <Image
//                 style={styles.card2img}
//                 source={require('../../../assets/Image/heart.png')}
//               />
//             </View>
//             <Text style={styles.card2t}>{'Loyalty'}</Text>
//           </TouchableOpacity>
//         </View>
//         {/* <View style={styles.blog}>
//           <Image style={{ height: 13, width: 20 }} resizeMode={'contain'}
//             source={require('../../../assets/Image/serch.png')}
//           />
//           <TextInput
//             //  style={{marginLeft: 10}}
//             placeholder="Search by Name or Phone Number"
//             placeholderTextColor='9a9a9a'
//             style={{ color: '9a9a9a', width: '100%', marginLeft: 10, fontFamily: 'Roboto-Regular' }}
//             returnKeyType="done"
//              value={search}
//             onChangeText={(val) => searchFilterFunction(val)}
//           />
//         </View> */}

//         <View style={styles.bottom}>
//           <Text style={styles.bottomt}>Recents downloads</Text>
//         </View>
//         <View>
//           <FlatList
//             data={User}
//             renderItem={({ item }) => (
//               <TouchableOpacity
//                 // onPress={() => userProfile(item.SrNo)}
//                 //  onPress={()=>navigation.navigate('MyCustomerDetail')}
//                 style={styles.cardView}>

//                 <View style={styles.carditem}>
//                   <Image
//                     style={styles.carditemimg}
//                     source={require('../../../assets/user.jpeg')}
//                   />
//                   <Text style={styles.carditemt}>{item.title}</Text>
//                 </View>
//                 <View>
//                   <Text style={styles.carditemtt}>{item.mobile}</Text>
//                 </View>
//               </TouchableOpacity>
//             )}
//           />
//         </View>
//         <View style={{ height: 140 }} />
//       </ScrollView>
//       {/* <View style={{backgroundColor:'#032e63',width:60,height:60,
//           position:'absolute',bottom:80,right:15,borderRadius:30,
//           alignItems:'center',
//           justifyContent:'center'
//         }}>
//           <Image style={{height:30,width:30}} source={require('../../../assets/plus.png')}/>
//         </View> */}
//       {/* <View style={{bottom: 0, position: 'absolute', left: 0, right: 0}}>
//         <TabView />
//       </View> */}
//     </View>
//   );
// };
// export default MyCatalogue;
// const data = [
//   { title: 'Hello' },
//   { title: 'Hello' },
//   { title: 'Hello' },
//   { title: 'Hello' },
//   { title: 'Hello' },
//   { title: 'Hello' },
//   { title: 'Hello' },
//   { title: 'Hello' },
//   { title: 'Hello', type: 'add' },
// ];
// const Data = [
//   { label: 'Today Downloads', value: 'Today Downloads' },
//   { label: 'Total Downloads', value: 'Total Downloads' },
//   // { label: 'Last 3 year', value: '3' },
// ];
// const User = [
//   {
//     image: require('../../../assets/user.jpeg'),
//     title: 'Milind Shethiya',
//     mobile: '+918765457324',
//   },
//   {
//     image: require('../../../assets/user.jpeg'),
//     title: 'Milind Shethiya',
//     mobile: '+918765457324',
//   },
//   {
//     image: require('../../../assets/user.jpeg'),
//     title: 'Milind Shethiya',
//     mobile: '+918765457324',
//   },
//   {
//     image: require('../../../assets/user.jpeg'),
//     title: 'Milind Shethiya',
//     mobile: '+918765457324',
//   },
//   {
//     image: require('../../../assets/user.jpeg'),
//     title: 'Milind Shethiya',
//     mobile: '+918765457324',
//   },
//   {
//     image: require('../../../assets/user.jpeg'),
//     title: 'Milind Shethiya',
//     mobile: '+918765457324',
//   },
// ];
