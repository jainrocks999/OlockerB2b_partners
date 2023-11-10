import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  ScrollView,
  Dimensions,
  Image,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Platform,
} from 'react-native';
import TabView from '../../../components/StoreButtomTab';
import Header from '../../../components/CustomHeader';
import Carousel from 'react-native-banner-carousel';
import { useNavigation } from '@react-navigation/native';
import Loader from '../../../components/Loader';
import RNPickerSelect from 'react-native-picker-select';
import Banner from '../../../components/Banner';
import { FlatListSlider } from 'react-native-flatlist-slider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import colors from '../../../components/colors';
import Toast from 'react-native-simple-toast';
import PickerModel from '../../../components/PickerModel';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useDispatch, useSelector } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import { Dropdown } from 'react-native-element-dropdown';
const MyCatalogue = () => {
  const navigation = useNavigation();
  const focus = useIsFocused();
  const dispatch = useDispatch();
  const selector = useSelector(state => state.Statelist?.satates)
  const isFetching = useSelector(state => state?.isFetching);
  const [data, setData1] = useState('')
  const BannerWidth = (Dimensions.get('window').width * 15) / 16;
  const [city, setCity] = useState('');
  const [state, setState] = useState();
  const [metal, setMetal] = useState('');
  const [supplier, setSupplier] = useState('');
  const [show, setShow] = useState(false);
  const BannerHeight = 140;
  const [visiable1, setVisible1] = useState(false);
  const [demoData, setData2] = useState('')
  const [visible, setVisible] = useState(false);
  const selector1 = useSelector(state => state.Pending);
  const data7 = useSelector(state => state.deletData1)
  const [citydemo, setCityDemo] = useState([{ label: 'Select city', value: '1' },])
  const demo = (ind, index2) => {
   
    const tempData = data7 ? data7 : selector1?.list
    var data = tempData.filter((item, index) => {
      return index != index2;

    })


    dispatch({
      type: 'Get_delete1_Success',
      payload: data
    })

  }
  const selector4 = useSelector(state => state.BannerList?.data);
  const BannerData = [];
  selector4?.map((item) => {
    if (item.ImageSection == "supplierCatalog" && item.isActive == 1) {
      const url = `${ImagePath.path2}${item.ImageUrl}${item.ImageName
        }`;
      BannerData.push({
        image: url,
        desc: 'Red fort',
      });
    }
  })
  const lenght = BannerData.length;





  const state2 = async () => {
    const Token = await AsyncStorage.getItem('loginToken');
    //setShow(true)
    dispatch({
      type: 'Get_State_Request',
      url: '/partners/getStateList',
      Token: Token,
    });
  }
  useEffect(() => {
    setSupplier(''),
    setState(''),
      setCity(''),
      setMetal(''),
   setShow(false);
    setVisible1(false);
     setData1(''),
    pendingRequest();
    SentRequest();
  //  getSupplier();
  }
    , [focus])

  const getSupplier = async () => {
   
     if(state ==''&& supplier==''){
      Toast.show('Please search by Partner name or State')
     }else{
    setVisible1(true);
    const Token = await AsyncStorage.getItem('loginToken')
    const Id = await AsyncStorage.getItem('Partnersrno');
    const axios = require('axios');

    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'https://olocker.co/api//partners/searchSupplier',
      headers: {
        'Olocker': `Bearer ${Token}`
      },
      params: {
        partnerId: Id,
        supplierName: supplier,
        stateId: state,
        city: city,
        metalType: metal
      }
    };

    axios.request(config)
      .then((response) => {

        if (response.data.status == true) {
          setData1(response.data.list);
          setVisible1(false);
          setShow(true);

        }

      })
      .catch((error) => {
        setVisible1(false)
        Toast.show('Server not responding')
       
        console.log(error);
      });
    }

  }

  const AcceptMEthod = async (id, index) => {
    const srno = await AsyncStorage.getItem('Partnersrno');
    const Token = await AsyncStorage.getItem('loginToken')

    const axios = require('axios');
    let data = new FormData();
    data.append('sp_networkId', id);
    data.append('statusId', '1');
    data.append('partnerId', srno);
    data.append('rejectReason', '');

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://olocker.co/api//partners/updateSupplierRequest',
      headers: {
        'Olocker': `Bearer ${Token}`,
      },
      data: data
    };

    axios.request(config)
      .then((response) => {
      
        if (response.data.status == true) {
          demo(id,index)

        }

      })
      .catch((error) => {
        console.log(error);
      });



  };

  const Reject = async (id, index) => {
  
    const srno = await AsyncStorage.getItem('Partnersrno');
    const Token = await AsyncStorage.getItem('loginToken')

    const axios = require('axios');
    let data = new FormData();
    data.append('sp_networkId', id);
    data.append('statusId', '2');
    data.append('partnerId', srno);
    data.append('rejectReason', '');

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://olocker.co/api//partners/updateSupplierRequest',
      headers: {
        'Olocker': `Bearer ${Token}`,
        // ...data.getHeaders()
      },
      data: data
    };

    axios.request(config)
      .then((response) => {
        if (response.data.status == true) {
          demo(id,index)

        }

      })
      .catch((error) => {
        console.log(error);
      });
  };
  const pendingRequest = async () => {
    const srno = await AsyncStorage.getItem('Partnersrno');
    const Token = await AsyncStorage.getItem('loginToken')
    dispatch({
      type: 'Get_Pending_Request',
      url: '/partners/pendingSupplierRequest',
      partnerId: srno,
      Token: Token,
      // navigation,
    });
    dispatch({
      type: 'Get_delete1_Success',
      payload: undefined
    })
  };
  const SentRequest = async () => {
    const srno = await AsyncStorage.getItem('Partnersrno');
    const Token = await AsyncStorage.getItem('loginToken')

    dispatch({
      type: 'Get_Sent_Request',
      url: '/partners/requestedSupplierList',
      partnerId: srno,
      Token: Token,
      // navigation,
    });
    dispatch({
      type: 'Get_delete_Success',
      payload: undefined
    })
  };

  const searchJeweller = () => {
    dispatch({
      type: 'Search_Jewellers_Request',
      url: 'RejectSupplierRequest',
      data: {
        SrNo: 1,
        RejectReason: 'string',
      },
    });
  };
  const partnerDetaitl = async (id) => {
    const Token = await AsyncStorage.getItem('loginToken')
    const srno = await AsyncStorage.getItem('Partnersrno');
    console.log('idd,,,,,,,,',id);
    dispatch({
      type: 'User_supplierDetail_Request',
      url: '/partners/supplierDetail',
      supplierId: id.SrNo,
      Token: Token,
      partnerId:srno,
      network_id: id.networkId,
      navigation,
      Status: 1,


    })
  };

  const citySearch = async (value) => {

    const Token = await AsyncStorage.getItem('loginToken')
    setVisible1(true);
    const axios = require('axios');

    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `https://olocker.co/api//partners/getCities`,
      headers: {
        'Olocker': `Bearer ${Token}`
      },
      params: {
        stateId: value,
      },
    };

    axios.request(config)
      .then((response) => {
        if (response.data.status == true) {
          setData2(response.data.cities);
          setVisible1(false);
        }
      })
      .catch((error) => {
        console.log(error);

        Toast.show('Server not responding')
        setVisible1(false);
      });
  };
  return (
    <View style={{ flex: 1, backgroundColor: '#f0eeef' }}>
      <Header
        source1={require('../../../assets/Fo.png')}
        source2={require('../../../assets/Image/dil.png')}
        title={'My Network '}
        onPress={() => navigation.goBack()}
        onPress1={() => navigation.navigate('MessageBox')}
        onPress2={() => navigation.navigate('FavDetails')}
      />
       {isFetching || visiable1 ? <Loader /> : null}
      <ScrollView>
       
        <View
          style={{
            backgroundColor: '#032e63',
            // height: 150,
            width: '100%',
            borderBottomRightRadius: 60,
            borderBottomLeftRadius: 60,
          }}>
          <View style={{ alignItems: 'center', height: 160, marginTop: 0 }}>
            {lenght > 0 ?
              <FlatListSlider
                data={BannerData}
                height={160}
                timer={5000}
                contentContainerStyle={{ marginVertical: 0, paddingHorizontal: 15 }}
                indicatorContainerStyle={{ position: 'absolute', bottom: 10 }}
                indicatorActiveColor={'#032e63'}
                indicatorInActiveColor={'#ffffff'}
                indicatorActiveWidth={5}
                animation
                component={<Banner />}
                separatorWidth={15}
                width={300}
                autoscroll={false}
                loop={false}
              /> : null}
          </View>

          <View style={{ height: 150 }} />
        </View>
        <View style={{ marginTop: -135, paddingHorizontal: 15 }}>
          <Text
            style={{
              color: '#fff',
              fontWeight: '700',
              fontSize: 16,
              fontFamily: 'Philosopher-Regular',
            }}>
            Search Jeweller Partner
          </Text>
          <View
            style={{
              width: '100%',
              backgroundColor: '#fff',
              marginTop: 15,
              elevation: 5,
              borderRadius: 10,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 10,
                justifyContent: 'space-between',
              }}>
              <View style={{ paddingTop: 10 }}>
                <Text
                  style={{
                    fontFamily: 'Acephimere',
                    fontSize: 12,
                    color: '#595959',
                  }}>
                  Search by name of jeweller partner
                </Text>
                <TextInput
                  style={{
                    height: 40,
                    marginTop: -5,
                    fontFamily: 'Acephimere',
                    fontSize: 15,
                    color: '#032e63',
                    marginRight: 5,
                    width: '100%',
                  }}
                  value={supplier}
                  placeholderTextColor='#474747'
                  onChangeText={val => setSupplier(val)}
                  placeholder="Enter Jeweller Partner Name"
                />
              </View>
              {/* <View style={{}}>
                <Image
                  style={{height: 40, width: 40}}
                  source={require('../../../assets/PartnerImage/1.png')}
                />
              </View> */}
            </View>
            <View style={{ borderWidth: 0.5, borderColor: 'grey' }} />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                height: 100,
              }}>
              <View
                style={{
                  padding: 0,
                  justifyContent: 'center',
                  width: '42%',
                  alignItems: 'flex-start',
                }}>
                <View
                  style={{
                    height: 45,
                    width: '100%',
                    marginLeft: 10,
                    marginBottom: 5,
                  }}>
                  <View>
                    <Dropdown
                      style={{
                        color: '#032e63',
                        width: '100%',
                        // paddingHorizontal: 15
                        marginBottom: -1,
                        height: 40,
                        // marginTop: 5
                      }}
                      placeholderStyle={{
                        color: '#032e63',
                        width: '100%', fontWeight: '600',
                        alignSelf: 'center',
                        fontFamily: 'Acephimere',
                      }}
                      selectedTextStyle={{
                        color: '#032e63',
                        width: '100%',
                        alignSelf: 'center',
                        fontFamily: 'Acephimere',
                      }}
                      iconStyle={{ tintColor: '#ffff' }}
                      data={selector != undefined ? selector : undefined}
                      inputSearchStyle={{
                        borderRadius: 10,
                        backgroundColor: '#f0f0f0',
                      }}
                     itemTextStyle={{ color:'#474747' }}
                      itemContainerStyle={{ marginBottom: -20, }}
                      searchPlaceholder="search.."
                    
                      maxHeight={250}
                      search
                      labelField="label"
                      valueField="value"
                      placeholder="Select state"
                      value={state}
                      onChange={item => {
                        citySearch(item.value), setState(item.value);
                      }}
                    />
                  </View>

                </View>

                <View
                  style={{
                    height: 45,
                    width: '100%',
                    borderWidth: 0,
                    marginLeft: 10,
                  }}>

                  <View>
                    <Dropdown
                      style={{
                        color: '#032e63',
                        width: '100%',
                        marginBottom: -1, height: 40,
                        marginTop: 5
                      }}
                      placeholderStyle={{
                        color: '#032e63',
                        width: '100%', fontWeight: '600',
                        alignSelf: 'center',
                        fontFamily: 'Acephimere',
                      }}
                      selectedTextStyle={{
                        color: '#032e63',
                        width: '100%',
                        alignSelf: 'center',
                        fontFamily: 'Acephimere',
                      }}
                      iconStyle={{ tintColor: '#ffff' }}
                      data={demoData ? demoData : citydemo}
                      inputSearchStyle={{
                        borderRadius: 10,
                        backgroundColor: '#f0f0f0',
                      }}
                      itemContainerStyle={{ marginBottom: -10 }}
                      searchPlaceholder="search.."
                      maxHeight={250}
                      itemTextStyle={{color:'#474747'}}
                      search
                      labelField="label"
                      valueField="value"
                      placeholder="Select city"
                      value={city}
                      onChange={item => {
                        setCity(item.value)
                      }}
                    />
                  </View>


                </View>
              </View>

              <View
                style={{
                  borderWidth: 0.5,
                  height: 90,
                  borderColor: 'grey',
                  marginTop: 0,
                }}
              />
              <View
                style={{
                  padding: 0,
                  alignItems: 'flex-end',
                  justifyContent: 'center',
                  width: '42%',
                }}>
                <View
                  style={{
                    height: 45,
                    width: '100%',
                    borderWidth: 0,
                    marginRight: 0,
                  }}>

                  <View>
                    <Dropdown
                      style={{
                        color: '#032e63',
                        width: '100%',
                        marginBottom: -1, height: 40,
                        marginTop: 5
                      }}
                      placeholderStyle={{
                        color: '#032e63',
                        width: '100%', fontWeight: '600',
                        alignSelf: 'center',
                        fontFamily: 'Acephimere',
                      }}
                      selectedTextStyle={{
                        color: '#032e63',
                        width: '100%',
                        alignSelf: 'center',
                        fontFamily: 'Acephimere',
                      }}
                      iconStyle={{ tintColor: '#ffff' }}
                      data={Metal}
                      inputSearchStyle={{
                        borderRadius: 10,
                        backgroundColor: '#f0f0f0',
                      }}
                      itemContainerStyle={{ marginBottom: -10, }}
                      // searchPlaceholder="search.."
                      maxHeight={250}
                      itemTextStyle={{color:'#474747'}}
                      // search
                      labelField="label"
                      valueField="value"
                      placeholder="Select Metal"
                      value={metal}
                      onChange={item => {
                        setMetal(item.value)
                      }}
                    />
                  </View>


                </View>
              </View>
            </View>
          </View>
          <View style={{ alignItems: 'center', marginTop: -20 }}>
            <TouchableOpacity
              onPress={() => getSupplier()}
              style={{
                height: 40,
                width: 130,
                backgroundColor: '#e9056b',
                borderRadius: 20,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{ color: '#fff', fontFamily: 'Acephimere', fontSize: 15 }}>
                Search
              </Text>
            </TouchableOpacity>
          </View>
          {show && data.length <= 0 ? (
            <Text
              style={{
                alignSelf: 'flex-start',
                marginTop: 10,
                fontSize: 13,
                color: 'red',
              }}>
              {'Data Not Found !!!!!'}
            </Text>
          ) : (
            <View style={{ paddingVertical: 10 }}>
             {console.log('datata',data)}
              <FlatList
                data={data}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => partnerDetaitl(item)}
                    style={{
                      elevation: 5,
                      backgroundColor: '#fff',
                      paddingVertical: 15,
                      paddingHorizontal: 10,
                      marginTop: 10,
                      borderRadius: 8,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    
                    <View>
                      {/* <Text style={{ fontSize: 16, color: '#000', fontFamily: 'Acephimere' }}>{item.SrNo}</Text> */}
                      <Text
                        style={{
                          fontSize: 16,
                          color: '#000',
                          fontFamily: 'Acephimere',
                        }}>
                        {item.SupplierName}
                      </Text>
                      <View style={{}}>
                        <Text
                          style={{
                            color: '#595959',
                            fontFamily: 'Acephimere',
                            fontSize: 11,
                          }}>
                          {item.CityName}
                        </Text>
                        <Text
                          style={{
                            color: '#595959',
                            fontFamily: 'Acephimere',
                            fontSize: 11,
                          }}>
                          {item.StateName}
                        </Text>
                      </View>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                      {/* <Image style={{height:20,width:40}} resizeMode='center' source={require('../../../assets/Image/eye.png')}/> */}
                    </View>
                  </TouchableOpacity>
                )}
              />
            </View>
          )}

          <View
            style={{
              width: '100%',
              backgroundColor: '#fff',
              marginTop: 0,
              elevation: 5,
              borderRadius: 10,
            }}>
            <View style={{ paddingHorizontal: 10, paddingVertical: 10 }}>
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: 'Philosopher-Regular',
                  color: '#032e63',
                }}>
                My Network{' '}
              </Text>
            </View>
            <View style={{ borderWidth: 0.5, borderColor: 'grey' }} />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
              }}>
              <TouchableOpacity
                onPress={() => navigation.navigate('MyNetworks')}
                style={{
                  padding: 10,
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '33%',
                }}>
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                  <Image
                    style={{ height: 40, width: 42, tintColor: '#032e63' }}
                    source={require('../../../assets/PartnerImage/4.png')}
                  />
                </View>
                <Text
                  style={{
                    fontSize: 11,
                    marginTop: 5,
                    color: '#343434',
                    fontFamily: 'Acephimere',
                  }}>
                  My Network
                </Text>
              </TouchableOpacity>
              <View
                style={{
                  borderWidth: 0.3,
                  height: '100%',
                  borderColor: 'grey',
                  marginTop: 0,
                }}
              />
              <TouchableOpacity
                onPress={() => navigation.navigate('PendingRequest')}
                style={{
                  padding: 10,
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '33%',
                }}>
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                  <Image
                    style={{ height: 42, width: 50 }}
                    source={require('../../../assets/PartnerImage/2.png')}
                  />
                </View>
                <Text
                  style={{
                    fontSize: 11,
                    marginTop: 5,
                    color: '#343434',
                    fontFamily: 'Acephimere',
                  }}>
                  Pending Request
                </Text>
              </TouchableOpacity>
              <View
                style={{
                  borderWidth: 0.3,
                  height: '100%',
                  borderColor: 'grey',
                  marginTop: 0,
                }}
              />

              <TouchableOpacity
                onPress={() => navigation.navigate('SentRequest')}
                style={{
                  padding: 10,
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '33%',
                }}>
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                  <Image
                    style={{ height: 42, width: 52 }}
                    source={require('../../../assets/PartnerImage/3.png')}
                  />
                </View>
                <Text
                  style={{
                    fontSize: 11,
                    marginTop: 5,
                    color: '#343434',
                    fontFamily: 'Acephimere',
                  }}>
                  Send Request
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ paddingVertical: 10 }}>
            {data7?.length == 0 || selector1?.list?.length == 0 ?

              <View>
                <Text style={{ color: '#565656', fontFamily: 'Acephimere' }}>{''}</Text>
              </View>
              :
              <View>
                <Text style={{ color: '#565656', fontFamily: 'Acephimere' }}>{`${data7 ? data7?.length : selector1?.list?.length}${'Notification'}`}</Text>
                <FlatList
                  data={data7 ? data7 : selector1?.list}
                  renderItem={({ item, index }) => (
                    <View
                      style={{
                        elevation: 5,
                        backgroundColor: '#fff',
                        paddingVertical: 15,
                        paddingHorizontal: 10,
                        marginTop: 10,
                        borderRadius: 8,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <View>
                        <Text
                          style={{
                            fontSize: 16,
                            color: '#000',
                            fontFamily: 'Acephimere',
                          }}>
                          {item.SupplierName}
                        </Text>
                        <Text
                          style={{
                            color: '#000',
                            fontFamily: 'Acephimere',
                            fontSize: 13,
                          }}>
                          {item.CityName}
                        </Text>
                      </View>
                      <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity
                          onPress={() => AcceptMEthod(item.SupplierSrNo, index)}
                          style={{ height: 40, width: 40 }}>
                          <Image
                            style={{ height: '100%', width: '100%' }}
                            source={require('../../../assets/PartnerImage/6.png')}
                          />
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => Reject(item.SupplierSrNo, index)}
                          style={{ height: 40, width: 40, marginLeft: 10 }}>
                          <Image
                            style={{ height: '100%', width: '100%' }}
                            source={require('../../../assets/PartnerImage/5.png')}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  )}
                />
              </View>
            }
          </View>
        </View>

        <View style={{ height: 70 }} />
      </ScrollView>
      <View
        style={{
          marginVertical: hp('2.5%'),
          position: 'absolute',
          top: '50%',
          right: '50%',
        }}>

        {/* <ActivityIndicator size="large" animating={visiable1} color={colors.bc} /> */}
      </View>
    </View>
  );
};
export default MyCatalogue;
const data = [
  { title: 'Hello' },
  { title: 'Hello' },
  { title: 'Hello' },
  { title: 'Hello' },
  { title: 'Hello' },
  { title: 'Hello' },
  { title: 'Hello' },
  { title: 'Hello' },
  { title: 'Hello', type: 'add' },
];
const data1 = [
  { name: 'Milind Jeweller', city: 'Mumbai' },
  { name: 'Milind Jeweller', city: 'Mumbai' },
  { name: 'Milind Jeweller', city: 'Mumbai' },
];

const City = [
  { label: 'Mumbai', value: 'Mumbai' },
  { label: 'Indore', value: 'Indore' },
  { label: 'Bangalore', value: 'Bangalore' },
  { label: 'Mumbai', value: 'Mumbai' },
  { label: 'Indore', value: 'Indore' },
  { label: 'Bangalore', value: 'Bangalore' },
];
const Metal = [
  { label: 'Select Metal', value: 'Select Metal' },
  { label: 'Diamond', value: 'Diamond' },
  { label: 'Gold', value: 'Gold' },
  { label: 'Platinum', value: 'Platinum' },
  { label: 'Silver', value: 'Silver' },

];

const images = [
  {
    image:
      'https://images.unsplash.com/photo-1455620611406-966ca6889d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1130&q=80',
    desc: 'Red fort in India New Delhi is a magnificient masterpeiece of humans',
  },
  {
    image:
      'https://images.unsplash.com/photo-1455620611406-966ca6889d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1130&q=80',
    desc: 'Red fort in India New Delhi is a magnificient masterpeiece of humans',
  },
  {
    image:
      'https://images.unsplash.com/photo-1455620611406-966ca6889d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1130&q=80',
    desc: 'Red fort in India New Delhi is a magnificient masterpeiece of humans',
  },
  {
    image:
      'https://images.unsplash.com/photo-1455620611406-966ca6889d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1130&q=80',
    desc: 'Red fort in India New Delhi is a magnificient masterpeiece of humans',
  },
  {
    image:
      'https://images.unsplash.com/photo-1455620611406-966ca6889d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1130&q=80',
    desc: 'Red fort in India New Delhi is a magnificient masterpeiece of humans',
  },
  {
    image:
      'https://images.unsplash.com/photo-1455620611406-966ca6889d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1130&q=80',
    desc: 'Red fort in India New Delhi is a magnificient masterpeiece of humans',
  },
  {
    image:
      'https://images.unsplash.com/photo-1455620611406-966ca6889d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1130&q=80',
    desc: 'Red fort in India New Delhi is a magnificient masterpeiece of humans',
  },
];
