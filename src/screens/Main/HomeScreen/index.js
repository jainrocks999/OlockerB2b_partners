import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Dimensions,
  Image,
  FlatList,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  SafeAreaView,
  Alert,
  BackHandler,
} from 'react-native';
import Carousel from 'react-native-banner-carousel';
import { useNavigation } from '@react-navigation/native';
import Header from '../../../components/CustomHeader';
import styles from './styles';
import Toast from 'react-native-simple-toast';
import Loader from '../../../components/Loader';
import { FlatListSlider } from 'react-native-flatlist-slider';
import Banner from '../../../components/Banner';
import ImagePath from '../../../components/ImagePath';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
let backPress = 0;
const HomeScreen = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const isFetching = useSelector(state => state.isFetching);

  const selector = useSelector(state => state.Gold?.goldPrices);
  const selector1 = useSelector(state => state.SupplierList?.suppliers);
  const selector2 = useSelector(state => state.BannerList?.data);
  const BannerData = [];
  selector2?.map((item) => {
    if (item.ImageSection == "supplierHome" && item.isActive == 1) {
      const url = `${ImagePath.path2}${item.ImageUrl}${item.ImageName
        }`;
      BannerData.push({
        image: url,
        desc: 'Red fort',
      });
    }
  })
  const lenght = BannerData.length;
  const [data, setData] = useState();
  const [collections, setCollecions] = useState();
  const win = Dimensions.get('window');


  const [sliderdata, setSlider] = useState();

  const BannerWidth = (Dimensions.get('window').width * 15) / 16;
  const BannerHeight = 180;

  const date = new Date();
  let ToDAY = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;

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
        { text: 'ok', onPress: () => LogoutApp() },
      ],
      { cancelable: false },
    );
  };

  const LogoutApp = async () => {
    await AsyncStorage.setItem('loginToken', '');

    navigation.navigate('Login');
    const Token = await AsyncStorage.getItem('loginToken');
   
  };

  const dispatch = useDispatch();

  useEffect(() => {
    if (isFocused) {
      ApiCallWithUseEffect();
    }
  }, [isFocused]);

  const MyNetwork = async () => {
    const Token = await AsyncStorage.getItem('loginToken');
    dispatch({
      type: 'Get_State_Request',
      url: '/partners/getStateList',
      Token: Token,
      navigation,
    });
  }
  const ApiCallWithUseEffect = async () => {
    const Token = await AsyncStorage.getItem('loginToken');
    const Id = await AsyncStorage.getItem('Partnersrno');

    dispatch({
      type: 'User_getBannerList_Request',
      url: 'partners//getBannerList',
      Token: Token,
    });

    dispatch({
      type: 'Patner_Contact_Request',
      url: 'supplier//supplierListForPartners',
      user_id: Id,
      Token: Token,
    });

    dispatch({
      type: 'User_Gold_Request',
      url: '/partners/goldPrice',
      Token: Token,
      partnerId: Id,
    });
    dispatch({
      type: 'User_SupplierList_Request',
      url: '/partners/supplierList',
      Token: Token,
      partnerId: Id,
      // navigation,
    });
  };


  const supplierprofile = async (id) => {
    const Token = await AsyncStorage.getItem('loginToken');
    const Id = await AsyncStorage.getItem('Partnersrno');
    AsyncStorage.setItem('supplierID', id.SupplierSrNo);
    dispatch({
      type: 'User_supplierDetail_Request',
      url: '/partners/supplierDetail',
      supplierId: id.SupplierSrNo,
      Token: Token,
      partnerId:Id,
      network_id: id.SrNo,
      navigation,
      Status: 2

    })
    dispatch({
      type: 'User_SupplierCategories_Request',
      url: 'partners/productTypeList',
      userId: id.SupplierSrNo,
      userType: 'supplier',
      Token: Token,
    });
  }
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackButtonClick,
    );
    return () => backHandler.remove();
  }, []);

  const handleBackButtonClick = () => {
    if (navigation.isFocused()) {
      if (backPress > 0) {
        BackHandler.exitApp();
        backPress = 0;
      } else {
        backPress++;
        Toast.show('Press again to exit app');
        setTimeout(() => {
          backPress = 0;
        }, 2000);
        BackHandler.removeEventListener('hardwareBackPress');
      }
      return true;
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={styles.scroll}>
        {isFetching ? <Loader /> : null}
        <ImageBackground
          style={styles.imgback}
          source={require('../../../assets/Image/1.png')}>
          <View style={styles.container}>
            <View style={styles.headertouch}>
              <TouchableOpacity onPress={() => navigation.navigate('MessageBox')}>
                <Image
                  style={styles.img1}
                  source={require('../../../assets/Fo.png')}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{ marginLeft: 15 }}
                onPress={() => navigation.navigate('FavDetails')}>
                <Image
                  style={styles.img2}
                  source={require('../../../assets/Image/dil.png')}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => Logout()}>
                <Image
                  style={[styles.img3, { tintColor: '#FFFF', height: 26, width: 26 }]}
                  source={require('../../../assets/Image/logout.png')}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ paddingHorizontal: 10 }}>
            <Text style={styles.text1}>Welcome to MyJeweller</Text>
            <Text style={styles.text2}>{'Onestop solution\nfor you'}</Text>
          </View>
        </ImageBackground>
        <View style={styles.main}>
          {lenght > 0 ?
            <FlatListSlider
              data={BannerData}
              height={170}
              timer={3000}
              contentContainerStyle={{
                marginVertical: 0,
                paddingHorizontal: 30,
              }}
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
        <View style={styles.itemview}>
          <View style={styles.itemview1}>
            <Image
              style={{
                width: 102,
                height: 22,
                tintColor: '#032e63',
                marginLeft: 5,
              }}
              source={require('../../../assets/Image/myjewlery.png')}
            />
            <TouchableOpacity
            //  onPress={()=>updateFieldChanged('1')}
            >
              <Text style={styles.text4}>Network</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            data={selector1}
            style={{ marginTop: 7 }}
            renderItem={({ item }) => (
              <View style={{borderWidth:0}}>
                <TouchableOpacity
                  onPress={() => supplierprofile(item)}
                  style={[styles.cardview]}>
                  <Image
                    style={{
                      width: win.width * 0.33,
                      height: '100%',
                      resizeMode: 'contain',
                      borderRadius: 10,
                    }}
                    source={item.logoImage ? { uri: `${item.logoImage}` } : require('../../../assets/Image/Not.jpeg')}
                  />
                </TouchableOpacity>
                <Text
                  style={{
                    textAlign: 'center',
                    // width: '100%',
                    fontFamily: 'Acephimere',
                  }}>
                  {item.SupplierName}
                </Text>
              </View>
            )}
          />
        </View>
        <View style={styles.middle1}>
          <View style={styles.middle}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('MyCatalogue', {
                  data: data,
                  collections: collections,
                })
              }
              style={{ alignItems: 'center' }}>
              <View style={styles.card1}>
                <Image
                  style={styles.img4}
                  source={require('../../../assets/Image/services.png')}
                />
              </View>
              <Text style={styles.textc}>{'Catalogue'}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('Customer1', { screen: 'Customers' })
              }
              style={{ alignItems: 'center' }}>
              <View style={styles.card1}>
                <Image
                  style={styles.img4}
                  source={require('../../../assets/Image/custmer.png')}
                />
              </View>
              <Text style={styles.textc}>{'Customers'}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                MyNetwork()
              }
              style={{ alignItems: 'center' }}>
              <View style={styles.card1}>
                <Image
                  style={styles.img4}
                  source={require('../../../assets/Image/partner.png')}
                />
              </View>
              <Text style={styles.textc}>{'My Network'}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.bottom}>
            <View style={styles.Gold}>
              <Image
                style={styles.Goldimg}
                source={require('../../../assets/Image/gold.png')}
              />
              <View style={styles.Goldview}>
                <Text style={styles.Goldt}>{'Gold '}</Text>
                <Text style={styles.Goldtt}>{'Price '}</Text>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate('MyProducts')}
              style={styles.touch}>
              <Text style={{ color: '#fff', fontSize: 12 }}>MORE</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.bottomv}>
          <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            data={selector?.slice(0, 3)}
            renderItem={({ item }) => (
              <ImageBackground
                source={require('../../../assets/PartnerImage/goldIcon.png')}
                style={styles.Bimg}>
                <Text style={styles.Bt}>{`${((item.Purity * 24) / 1000).toFixed(
                  0,
                )} K`}</Text>
                <View style={styles.Bv}>
                  <Image
                    style={{ height: 16, width: 20 }}
                    source={require('../../../assets/Image/rupay.png')}
                  />
                  <Text style={styles.Btt}>{item.PM}</Text>
                </View>
              </ImageBackground>
            )}
          />
        </View>
      </ScrollView>
      {/* <TabView /> */}

    </SafeAreaView>
  );
};
export default HomeScreen;

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
    image: 'https://devappapi.olocker.in/images/rss/no-image.jpg',
    desc: 'Red fort in India New Delhi is a magnificient masterpeiece of humans',
  },
];

var object = {
  dataAttribute: [
    {
      id: 1,
      title: 'A',
      data: [
        { id: '1', name: 'First Name', type: 'text' },
        { id: '2', name: 'Last Name', type: 'text' },
      ],
    },
    {
      id: 2,
      title: 'B',
      data: [
        { id: '1', name: 'Twitter', type: 'text' },
        { id: '2', name: 'Twitter follower', type: 'number' },
      ],
    },
  ],
};
object.dataAttribute[0].data[0].statusSelected = true;
