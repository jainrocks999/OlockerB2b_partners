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
  const [id1,setId]=useState();
  const selector = useSelector(state => state.SupplierDetail?.detail)
  const selector3 = useSelector(state => state.sentRequest);
  console.log('detailss,,,,,,',selector3.suppliers);
  console.log('detailss,,,,,,ssssss',selector);
  const selector1 = useSelector(state => state.Status);
  const isFetching = useSelector(state => state.isFetching);
  const [profile, setProfile] = useState(true);
  const [message, setMessage] = useState(false);
  const [catalogue, setCatalogue] = useState(false);
  const [setting, setSetting] = useState(false);
  const [rating1, setRatting1] = useState(0);
  const BannerWidth = (Dimensions.get('window').width * 15) / 16;
  const BannerHeight = 140;
  const share = async () => {
    await Share.share({
      message: `Supplier Name : ${selector?.SupplierName}  Email Address :${selector?.EmailId}`,
    });
  };

  useEffect(()=>{
    selector3.suppliers?.map((item)=>{
      // setId(item.supplierId);
    if( selector?.SrNo===item.SupplierSrNo){
      // console.log('ifdddd',item.SupplierSrNo);
       setId(item.SupplierSrNo)
    }
    },[])
  })
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
  console.log('iss s s',id1);
  const addToNetwork = async (id) => {
   
  
    const partnerid = await AsyncStorage.getItem('Partnersrno');
    const Token = await AsyncStorage.getItem('loginToken');
    dispatch({
      type: 'User_sendRequestToSupplier_Request',
      url: 'partners/sendRequestToSupplier',
      partnerId: partnerid,
      supplierId: id,
      Token: Token,

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
      {isFetching ? <Loader /> : null}
      <ScrollView>
       
        <View style={{backgroundColor: '#032e63',}}>
          <View style={styles.main}>
            <View
              style={styles.main1}>
              <Image   style={{ width: '100%', height: '100%', borderRadius: 10 }}
                source={selector?.logoImage ? { uri: selector.logoImage } : require('../../../assets/Image/Not.jpeg')}
              />
            </View>
            <View style={styles.details}>
              <Text style={[styles.text1,{fontSize: 19,}]}> {selector?.SupplierName}
              </Text>
              <Text
                style={[styles.text1,{fontSize:12}]}> {selector?.cityName} </Text>
             
              <View
                style={styles.star}>
                <Stars
                  half={true}
                  default={0}
                  // display={3}
                  spacing={5}
                  update={val => setRatting1(val)}
                  count={5}
                  starSize={16}
                  fullStar={require('../../../assets/Image/star.png')}
                  emptyStar={require('../../../assets/Image/star1.png')}
                />

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
                    style={[styles.phone,{marginLeft: 10,}]}>
                    <Image
                      style={{ width: 30, height: 30 }}
                      source={require('../../../assets/PartnerImage/15.png')}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.addButtonV}>
            {selector.isAdd == 0 ?
              <TouchableOpacity
              disabled={selector?.SrNo===id1?true:false}
                onPress={() => addToNetwork(selector?.SrNo)}
                style={[styles.addButton,{backgroundColor:selector?.SrNo===id1?'#FFF':'#ea056c'}]}>
                <Text style={[styles.text1,{fontSize:12,color:selector?.SrNo===id1?'#032e63':'#FFF',fontWeight:selector?.SrNo===id1?'900':''}]}>
                 { selector?.SrNo===id1?'Requested':'Add To Network'}

                </Text>
              </TouchableOpacity>
              : <View style={styles.addButton}>
                <Text style={[styles.text1,{fontSize:12}]}>
                  {'Added To Network'}
                </Text>
              </View>
            }

          </View>

          <View style={styles.blankV} />
        </View>
        <View>
          {selector.isAdd == 0 ? null :
            <View style={styles.tabContainer}>
              <View style ={styles.card}>
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
              <View  style ={styles.card}>
                <TouchableOpacity
                   onPress={() => navigation.navigate('Customer1',{screen:'Messagebox'})}
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
              <View style ={styles.card}>
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
              <View  style ={styles.card}>
                <TouchableOpacity
                  onPress={() => manageTab3()}
                  style={styles.tabStyle}>
                  {setting ? (
                     <Image style={styles.img1}
                      source={require('../../../assets/PartnerImage/setting_active.png')}
                    />
                  ) : (
                    <Image style={[styles.img1,{alignSelf:'center'}]}
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
        {/* <View style={{height:70}}/> */}
      </ScrollView>
      {/* <View style={{bottom:0,position:'absolute',left:0,right:0}}>
      <BottomTab/>
      </View> */}
      <StatusBar />
    </View>
  );
};
export default HomeScreen;
