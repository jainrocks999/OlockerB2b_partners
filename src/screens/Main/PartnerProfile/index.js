import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Dimensions,
  Image,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Linking,
  Share,
  Alert,
} from 'react-native';
import Header from '../../../components/CustomHeader';
import { useNavigation } from '@react-navigation/native';
import StatusBar from '../../../components/StatusBar';
import BottomTab from '../../../components/StoreButtomTab';
import Stars from 'react-native-stars';
import styles from './styles';
import Catalogue from '../../../components/Catalogue';
import Profile from '../../../components/Profile';
import Setting from '../../../components/Settings';
import Loader from '../../../components/Loader';
import ImagePath from '../../../components/ImagePath';
import axios from 'axios';
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector, useDispatch } from 'react-redux';
const HomeScreen = ({ route }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [id1, setId] = useState();
  const [visiable1, setVisible] = useState(false);
  const selector = useSelector(state => state.SupplierDetail?.detail)

  const selector1 = useSelector(state => state.Status);
  const isFetching = useSelector(state => state.isFetching);
  const [profile, setProfile] = useState(true);
  const [message, setMessage] = useState(false);
  const [catalogue, setCatalogue] = useState(false);
  const [setting, setSetting] = useState(false);
  const [rating1, setRatting1] = useState(0);
  const [clicked, setClicked] = useState(false);
  const BannerWidth = (Dimensions.get('window').width * 15) / 16;
  const BannerHeight = 140;
  const [loader,setLoader]=useState(false)

  const share = async () => {
    await Share.share({
      message: `Supplier Name : ${selector?.SupplierName}  Email Address :${selector?.EmailId}`,
    });
  };
  const manageTab = () => {
    setProfile(true);
    setMessage(false);
    setCatalogue(false);
    setSetting(false);
  };
  const manageTab1 = () => {
    setProfile(false);
    setMessage(true);
    setCatalogue(false);
    setSetting(false);
  };
  const manageTab2 = () => {
    setProfile(false);
    setMessage(false);
    setCatalogue(true);
    setSetting(false);
  };
  const manageTab3 = () => {
    setProfile(false);
    setMessage(false);
    setCatalogue(false);
    setSetting(true);
  };
  const getStatus = () => {
    const data = selector
    console.log('IsPartnerSend', data.IsPartnerSend);
    console.log('issuppliersend', data.IsSupplierSend)
    return (
      <View style={{ flexDirection: 'row', width: '80%', justifyContent: data?.IsSupplierSend == 1 ? 'space-evenly' : 'center' }}>
        <TouchableOpacity
          style={[styles.addButton, { backgroundColor: data.network_status == 'Reject' ? 'red' : data?.IsPartnerSend == 1 ? '#FFF' : data?.IsSupplierSend == 1 ? 'green' : '#ea056c' }]}
          disabled={data?.IsPartnerSend == 1 || data.network_status == 'Reject'}
          onPress={addToNetwork}
        >
          <Text style={[styles.text1, { color: data.network_status == 'Reject' ? '#fff' : data?.IsPartnerSend == 1 ? '#032e63' : '#FFF', fontWeight: data?.IsPartnerSend == 1 ? '900' : '500' }]}>
            {data.network_status == 'Reject' ? "Rejected" : data?.IsPartnerSend == 1 ? "Requested" : data?.IsSupplierSend == 1 ? "Confirm" : "Add To Network"}
          </Text>
        </TouchableOpacity>
        {data?.IsSupplierSend == 1 && data.network_status != 'Reject' ?
          <TouchableOpacity style={[styles.addButton, { backgroundColor: 'red' }]} onPress={RejectMEthod}>
            <Text style={styles.text1}>
              {"Reject"}
            </Text>
          </TouchableOpacity> : null
        }
      </View>
    )
  }
  const RejectMEthod = async (id, index) => {

    const srno = await AsyncStorage.getItem('Partnersrno');
    const Token = await AsyncStorage.getItem('loginToken')
    setVisible(true)
    const axios = require('axios');
    let data = new FormData();
    data.append('supplier_id', selector?.SrNo);
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
          setVisible(false);
          partnerDetaitl(selector?.SrNo)

        }

      })
      .catch((error) => {
        setVisible(false);
        console.log(error);
      });

  }


  const partnerDetaitl = async (id) => {
    const Token = await AsyncStorage.getItem('loginToken')
    const srno = await AsyncStorage.getItem('Partnersrno');
    console.log('idd,,,,,,,,,,,,,,,,', id);
    dispatch({
      type: 'User_supplierDetail_Request',
      url: '/partners/supplierDetail',
      supplierId: id,
      Token: Token,
      partnerId: srno,
      supplier_id: id,
      navigation,
      Status: 1,


    })
  };
  const addToNetwork = async () => {
    const data = selector;
    console.log('data ....', data?.SrNo);
    const partnerid = await AsyncStorage.getItem('Partnersrno');
    const Token = await AsyncStorage.getItem('loginToken');
    if (data.IsPartnerSend == 0 && data.IsSupplierSend == 0) {
      dispatch({
        type: 'User_sendRequestToSupplier_Request',
        url: 'partners/sendRequestToSupplier',
        partnerId: partnerid,
        supplierId: data?.SrNo,
        Token: Token,
        navigation,

      });
    }
    else if (data.IsSupplierSend == 1) {
      setVisible(true);
      const axios = require('axios');
      let data1 = new FormData();
      data1.append('supplier_id', data?.SrNo);
      data1.append('statusId', '1');
      data1.append('partnerId', partnerid);
      data1.append('rejectReason', '');

      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://olocker.co/api//partners/updateSupplierRequest',
        headers: {
          'Olocker': `Bearer ${Token}`,
          // ...data.getHeaders()
        },
        data: data1
      };

      axios.request(config)
        .then((response) => {
          if (response?.data?.status == true) {
            setVisible(false);
            partnerDetaitl(data?.SrNo)
            // Toast.show(response?.data?.msg);

          }

        })
        .catch((error) => {
          setVisible(false);
          console.log('erororo why sree', error);
        });
    }
  }

  const handleRating=async(value)=>{
    const srno = await AsyncStorage.getItem('Partnersrno');
    const Token = await AsyncStorage.getItem('loginToken')
    setRatting1(value)
    setLoader(true)
    const axios = require('axios');
    let config = {
      method: 'GET',
      maxBodyLength: Infinity,
      url: `https://olocker.co/api/partners/supplierRating?partnerId=${srno}&supplierId=${selector?.SrNo}&rating=${value}`,
      headers: {
        'Olocker': `Bearer ${Token}`,
      },
    };

    axios.request(config)
      .then((response) => {
        console.log('this is response',response.data);
        if (response.data.status == true) {
          setLoader(false)
          Toast.show(response.data.msg)
        }
        else{
          setLoader(false)
        }
      })
      .catch((error) => {
        setLoader(false)
        console.log(error);
      });
  }
  return (
    <View style={styles.container}>
      <Header
        source={require('../../../assets/L.png')}
        source2={require('../../../assets/Image/dil.png')}
        source1={require('../../../assets/Fo.png')}
        title={'Supplier Profile '}
        onPress={() => navigation.goBack()}
        onPress2={() => navigation.navigate('FavDetails')}
        onPress1={() => navigation.navigate('MessageBox')}
      />
      {isFetching || visiable1 ||loader ? <Loader /> : null}
      <ScrollView>

        <View style={{ backgroundColor: '#032e63', }}>
          <View style={styles.main}>
            <View
              style={styles.main1}>
              <Image style={{ width: '100%', height: '100%', borderRadius: 10 }}
                source={selector?.logoImage ? { uri: selector.logoImage } : require('../../../assets/logo.png')}
              />
            </View>
            <View style={styles.details}>
              <Text style={[styles.text1, { fontSize: 19, }]}> {selector?.SupplierName}
              </Text>
              <Text
                style={[styles.text1, { fontSize: 12, marginLeft: 2 }]}> {selector?.cityName} </Text>

              <View
                style={styles.star}>

                {selector?.isAdd == 1 ?
                  <Stars
                    half={true}
                    default={selector?.rating?parseFloat(selector?.rating):rating1}
                    // display={selector?.rating?parseFloat(selector?.rating):rating1}
                    spacing={5}
                    update={val => handleRating(val)}
                    count={5}
                    starSize={16}
                    fullStar={require('../../../assets/Image/star.png')}
                    emptyStar={require('../../../assets/Image/star1.png')}
                    halfStar={require('../../../assets/Image/star2.png')}
                  />
                  : null}
                <View style={{ flexDirection: 'row' }}>
                  <TouchableOpacity
                    onPress={() => Linking.openURL(`tel:${selector.MobileNo}`)}
                    style={styles.phone}>
                    <Image
                      style={{ width: 30, height: 30 }}
                      source={require('../../../assets/PartnerImage/16.png')}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => share()}
                    style={[styles.phone, { marginLeft: 10, }]}>
                    <Image
                      style={{ width: 30, height: 30 }}
                      source={require('../../../assets/PartnerImage/15.png')}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
          <View style={[styles.addButtonV1, {
            marginTop: 10,
            alignSelf: 'flex-end',
            flexDirection: 'row',
            width: '70%',
          }]}>
            {selector?.isAdd == 0 ?
              getStatus()
              // <TouchableOpacity 
              // disabled={selector?.SrNo==id1?true:false}
              // onPressIn={addToNetwork}
              //   style={[styles.addButton,{backgroundColor:selector?.SrNo===id1?'#FFF':'#ea056c'}]}>
              //   <Text style={[styles.text1,{fontSize:12,color:selector?.SrNo===id1?'#032e63':'#FFF',fontWeight:selector?.SrNo===id1?'900':''}]}>
              //    { selector?.SrNo===id1?'Requested':'Add To Network'}

              //   </Text>
              // </TouchableOpacity>
              : <View style={styles.addButton}>
                <Text style={[styles.text1, { fontSize: 12 }]}>
                  {'Added To Network'}
                </Text>
              </View>
            }

          </View>

          <View style={styles.blankV} />
        </View>
        <View>
          {selector?.isAdd == 0 ? null :
            <View style={styles.tabContainer}>
              <View style={styles.card}>
                <TouchableOpacity
                  onPress={() => manageTab()}
                  style={styles.tabStyle}>
                  {profile ? (
                    <Image style={styles.img1}
                      source={require('../../../assets/PartnerImage/10.png')}
                    />
                  ) : (
                    <Image style={styles.img1}
                      source={require('../../../assets/PartnerImage/pro_uncolor.png')}
                    />
                  )}
                </TouchableOpacity>
                <Text style={styles.text2}>
                  Profile
                </Text>
              </View>
              <View style={styles.card}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('ChatScreen', { item: selector, Id: true })
                    //  navigation.navigate('Customer1',{screen:'Messagebox'})
                  }
                  style={styles.tabStyle}>
                  {message ? (
                    <Image style={styles.img1}
                      source={require('../../../assets/PartnerImage/msg_active.png')}
                    />
                  ) : (
                    <Image style={styles.img1}
                      source={require('../../../assets/PartnerImage/11.png')}
                    />
                  )}
                </TouchableOpacity>
                <Text style={styles.text2}>
                  Message
                </Text>
              </View>
              <View style={styles.card}>
                <TouchableOpacity
                  onPress={() => manageTab2()}
                  style={styles.tabStyle}>
                  {catalogue ? (
                    <Image style={styles.img1}
                      source={require('../../../assets/PartnerImage/nackactive.png')}
                    />
                  ) : (
                    <Image style={styles.img1}
                      source={require('../../../assets/PartnerImage/8.png')}
                    />
                  )}
                </TouchableOpacity>
                <Text style={styles.text2}>
                  Catalogue
                </Text>
              </View>
              <View style={styles.card}>
                <TouchableOpacity
                  onPress={() => manageTab3()}
                  style={styles.tabStyle}>
                  {setting ? (
                    <Image style={styles.img1}
                      source={require('../../../assets/PartnerImage/setting_active.png')}
                    />
                  ) : (
                    <Image style={[styles.img1, { alignSelf: 'center' }]}
                      source={require('../../../assets/PartnerImage/7.png')}
                    />
                  )}
                </TouchableOpacity>
                <Text style={styles.text2}>
                  Settings
                </Text>
              </View>
            </View>
          }
        </View>


        <View style={{ marginTop: 10 }}>
          {profile == true ? <Profile /> : null}
          {catalogue == true ? <Catalogue /> : null}
          {setting == true ? <Setting /> : null}
        </View>

      </ScrollView>

      <StatusBar />
    </View>
  );
};
export default HomeScreen;
