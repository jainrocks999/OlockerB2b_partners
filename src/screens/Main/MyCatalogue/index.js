import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  FlatList,
  ScrollView,
  Dimensions,
  Image,
  TouchableOpacity,
  LogBox,
} from 'react-native';
import TabView from '../../../components/StoreButtomTab';
import Header from '../../../components/CustomHeader';
import Carousel from 'react-native-banner-carousel';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

import Loader from '../../../components/Loader';
import Banner from '../../../components/Banner';
import { FlatListSlider } from 'react-native-flatlist-slider';
import ImagePath from '../../../components/ImagePath';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles';
import Toast from 'react-native-simple-toast';
import { useIsFocused } from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useSelector, useDispatch } from 'react-redux';
const MyCatalogue = ({ route }) => {
  const dispatch = useDispatch();
  const [product, setProduct] = useState(true);
  const [partner, setPartner] = useState(false);
  const [userdata, setUserdata] = useState(false);
  const isFetching = useSelector(state => state.isFetching);
  const selector = useSelector(state => state.Collection?.collection);
  const [supplier,setSupplier]=useState();



  const selector1 = useSelector(state => state.SupplierList?.suppliers);
  const selector2 = useSelector(state => state.Categories);
  const selector3 = useSelector(state => state.SupplierCategories);
  const selector4 = useSelector(state => state.BannerList?.data);



  const BannerData = [];
  selector4?.map((item) => {
    if (item.ImageSection == "partnerCatalog" && item.isActive == 1) {
      const url = `${ImagePath.path2}${item.ImageUrl}${item.ImageName
        }`;
      BannerData.push({
        image: url,
        desc: 'Red fort',
      });
    }
  })
  const lenght = BannerData.length;
  const navigation = useNavigation();
  const BannerWidth = (Dimensions.get('window').width * 8) / 9;
  const BannerHeight = 140;
  // const scrollRef = useRef();
  const win = Dimensions.get('window');
  const isFocused = useIsFocused();
  const [tc, setTc] = useState(0);
  const [tc1, setTc1] = useState(0);

  const scrollViewRef = useRef();

  useEffect(() => {
    //  setUserdata(true)
  }, [tc1]);
  const onPressTouch1 = () => {
    scrollRef.current?.scrollTo({
      y: 199,
      animated: true,
    });
  };


  useEffect(() => {
    if (isFocused) {
      collectionDataR()
    }
  }, [isFocused])
  const collectionDataR = async () => {
    AsyncStorage.setItem('supplierID','');
    const Token = await AsyncStorage.getItem('loginToken');
    const Id = await AsyncStorage.getItem('Partnersrno');
    const supplier =await AsyncStorage.getItem('supplierID');
   setSupplier(supplier);
    dispatch({
      type: 'User_categories_Request',
      url: 'partners/productTypeList',
      userId: Id,
      userType: 'partner',
      Token: Token,
    });
    dispatch({
      type: 'User_collection_Request',
      url: '/partners/collectionList',
      Token: Token,
      partnerId: Id,
    });
   
  }


  const ProductList = async (id, Value) => {
    const partnerid = await AsyncStorage.getItem('Partnersrno');
    const Token = await AsyncStorage.getItem('loginToken');
    dispatch({
      type: 'User_ProductList_Request',
      url: 'partners/productTypeProducts',
      userId: partnerid,
      userType: 'partner',
      typeId: id,
      Token: Token,
      login_user_id: partnerid,
      login_user_type: 'partner',
      name: Value,
      navigation,
    });
  };

  const ProductList1 = async item => {
    const partnerid = await AsyncStorage.getItem('Partnersrno');
    const supplier = await AsyncStorage.getItem('supplierID');
    const Token = await AsyncStorage.getItem('loginToken');
    dispatch({
      type: 'User_SupplierProductList_Request',
      url: 'partners/productTypeProducts',
      userId: supplier,
      userType: 'supplier',
      typeId: item.Id,
      Token: Token,
      login_user_id: partnerid,
      login_user_type: 'partner',
      name: item.Value,
      navigation,
    });
  };
 
  const manageProfile = async id => {
    const Token = await AsyncStorage.getItem('loginToken');
   
    AsyncStorage.setItem('supplierID', id);
    setSupplier(id)
    dispatch({
      type: 'User_SupplierCategories_Request',
      url: 'partners/productTypeList',
      userId: id,
      userType: 'supplier',
      Token: Token,
    });
   
  };

  const manageProduct = async () => {
    const Token = await AsyncStorage.getItem('loginToken');
    const Id = await AsyncStorage.getItem('Partnersrno');
    dispatch({
      type: 'User_categories_Request',
      url: 'partners/productTypeList',
      userId: Id,
      userType: 'partner',
      Token: Token,
    });
    dispatch({
      type: 'User_collection_Request',
      url: '/partners/collectionList',
      Token: Token,
      partnerId: Id,
    });
    setProduct(true);
    setPartner(false);
    setUserdata(false);
    // Myproduct();
  };
  const tabCategory = () => {
    setUserdata(false);
    setPartner(true);
    setProduct(false);
  };

  return (
    <View style={{ flex: 1 }}>
      <Header
        source1={require('../../../assets/Fo.png')}
        source2={require('../../../assets/Image/dil.png')}
        title={'My Catalogue '}
        onPress={() => navigation.goBack()}
        onPress1={() => navigation.navigate('MessageBox')}
        onPress2={() => navigation.navigate('FavDetails')}
      />
      {isFetching ? <Loader /> : null}
      <ScrollView
        ref={scrollViewRef}
        contentOffset={{
          x: 0,
          y: userdata ? tc : tc1,
        }}>

        <ScrollView
          ref={scrollViewRef}
          onLayout={event => {
            let layout = event.nativeEvent.layout;
            setTc(layout.height);
          }}>
          <View style={styles.container}>
          {lenght > 0 ?
            <View style={styles.container1}>

                <FlatListSlider
                  data={BannerData}
                  height={170}
                  timer={3000}
                  contentContainerStyle={{
                    marginVertical: 0,
                    paddingHorizontal: 16,
                  }}
                  indicatorContainerStyle={{ position: 'absolute', bottom: -16 }}
                  indicatorActiveColor={'#ffffff'}
                  indicatorInActiveColor={'#ffffff'}
                  indicatorActiveWidth={5}
                  animation
                  component={<Banner />}
                  separatorWidth={15}
                  width={300}
                  autoscroll={true}
                  loop={false}
                /> 
            </View>: null}
            <View
              ref={scrollViewRef}
              // ref={scrollViewRef}
              onLayout={event => {
                const layout = event.nativeEvent.layout;
                setTc1(layout.height);
              }}
              style={styles.main}>
              <TouchableOpacity
               disabled={partner==true?true:false}
                style={{ alignItems: 'center' }}
                onPress={
                  () => setUserdata(false)
                  // navigation.navigate('MyProducts')
                }>
                  
                <View style={styles.main1}>
                <View style={{height:30,width:30,borderRadius:15,backgroundColor:'#da062f',zIndex:1,alignSelf:'flex-end',bottom:5}}>
                <Text style={{fontSize:20,color:'#fff',textAlign:'center'}}>{selector2?.list?.length}</Text>
                </View>
                  <Image
                    style={styles.img}
                    source={require('../../../assets/Image/my.png')}
                  />
                </View>
                <Text style={styles.tt}>{'MY PRODUCTS'}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setUserdata(true)}
                disabled={partner==true?true:false}
                style={styles.touch}>
                 
                <View style={styles.main1}>
                <View style={{bottom:5,height:30,width:30,borderRadius:15,backgroundColor:'#da062f',zIndex:5,alignSelf:'flex-end',}}>
                <Text style={{fontSize:20,color:'#fff',textAlign:'center'}}>{selector?.length}</Text>
                </View>
                  <Image
                    style={styles.img1}
                    source={require('../../../assets/Image/neck.png')}
                  />
                </View>
                <Text style={styles.tt}>{'MY COLLECTIONS'}</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.main2}>
              <TouchableOpacity
                onPress={() => navigation.navigate('SelectOption')}>
                <LinearGradient
                  style={styles.liner}
                  colors={['#da062f', '#a90022']}>
                  <View style={styles.linerview}>
                    <Image
                      style={{ height: 22, width: 30 }}
                      source={require('../../../assets/plus.png')}
                    />
                    <Text style={styles.linert}>{'ADD'}</Text>
                    <View style={{ width: 30 }} />
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            </View>
            <View style={{ height: 28 }} />
          </View>

          <View style={styles.card}>
            <TouchableOpacity
              onPress={() => manageProduct()}
              style={[
                styles.cardtouch,
                { backgroundColor: product == true ? '#032e63' : '#fff' },
              ]}>
              <Text
                style={[
                  styles.tcard,
                  { color: product == true ? '#fff' : '#032e63' },
                ]}>
                My Products
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => tabCategory()}
              style={[
                styles.cardtouch,
                { backgroundColor: partner == true ? '#032e63' : '#fff' },
              ]}>
              <Text
                style={[
                  styles.tcard,
                  { color: partner == true ? '#fff' : '#032e63' },
                ]}>
                Partner Categories
              </Text>
            </TouchableOpacity>
          </View>

          <View style={{ marginTop: 10 }}>
            {product == true ? (
              <FlatList
                data={selector2?.list}
                numColumns={3}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={
                      () => ProductList(item.Id, item.Value)
                      // navigation.navigate('MyProductDetails')
                    }
                    style={styles.card1}>




                    {item.ImageName === '' ? (
                      <Image
                        style={{
                          width: win.width * 0.33,
                          height: '74%',
                          resizeMode: 'contain',
                          alignSelf: 'center',
                        }}
                        // resizeMode={'stretch'}
                        source={require('../../../assets/logo.png')}
                      />
                    ) : (
                      <Image
                        style={{
                          width: win.width * 0.33,
                          height: '71%',
                          resizeMode: 'contain',
                          alignSelf: 'center',
                          // borderWidth: 5,
                        }}
                        resizeMode={'stretch'}
                        source={{
                          uri: `${selector2.imagepath}${item.ImageName
                            }`,
                        }}
                      />
                    )}
                    <View style={styles.card1v}>
                      
                      <Text
                        style={[
                          styles.card1t,
                          { color: '#032e63', fontWeight: '700' },
                        ]}>
                        {item.Value}
                      </Text>

                      <Text style={[styles.card1t, { color: '#0d0d0d',fontWeight:'700', }]}>
                        {item.pTotal <= 0
                          ? `${item.pTotal} Item`
                          : `${item.pTotal} Items`}
                      </Text>
                    </View>
                  </TouchableOpacity>
                )}
              />
            ) : null}

            {partner == true ? (
              <Text style={styles.partnert}>MY Supplier List</Text>
            ) : null}
            {partner == true ? (
              <FlatList
                showsHorizontalScrollIndicator={false}
                horizontal={true}
                data={selector1}
                style={{ margin: 10, marginTop: 0, marginBottom: 10 }}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => manageProfile(item.SupplierSrNo)}
                    style={[styles.card2,{  shadowColor:supplier==item.SupplierSrNo?'#032e63':'#fff',
                     shadowOpacity: 0.6,
                     shadowOffset: { width: 0, height: 2 },
                     shadowRadius: 20,
                       elevation: 6,borderWidth:supplier==item.SupplierSrNo?1:0
                    }]}>
   
                    <View style={[styles.card2v,{borderWidth:0}
                      ]}>
                      <Image
                        style={[styles.card2img,{width:supplier==item.SupplierSrNo?'100%':'100%'}]}
                        resizeMode="stretch"
                        source={item.logoImage ? { uri: `${item.logoImage}` } : require('../../../assets/logo.png')}
                      />
                    </View>
                    <View style={[styles.card2v1,{}]}>
                      {supplier==item.SupplierSrNo?
                      <Text style={styles.card2v1t}>{item.SupplierName}</Text>:
                      <Text style={[{color:'grey',fontSize:15,fontFamily: 'Acephimere',}]}>{item.SupplierName}</Text>}
                      {/* <Text style={{ fontFamily: 'Acephimere', color: '#666666', fontSize: 12 }}>{item.CityName}</Text> */}
                    </View>
                  </TouchableOpacity>
                )}
              />
            ) : null}

            {partner == true ? (
              <Text style={styles.partnert}>Supplier Categories List</Text>
            ) : null}
           {supplier? (
              <FlatList
                data={selector3?.list}
                numColumns={3}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => ProductList1(item)}
                    // onPress={() =>
                    //   navigation.navigate('MyProductDetails', {id: item.Id})
                    // }
                    style={styles.card1}>

                    <Image
                      style={{
                        width: win.width * 0.33,
                        height: '71%',
                        resizeMode: 'contain',
                        alignSelf: 'center',
                        // borderWidth: 5,
                      }}
                      resizeMode={'stretch'}
                      source={item.ImageName === '' ? require('../../../assets/logo.png') : {
                        uri: `${ImagePath.path2}${'uploads/product_type/'}${item.ImageName}`
                      }}
                    />

                    <View style={styles.card1v}>
                      <Text
                        style={[
                          styles.card1t,
                          { color: '#032e63', fontWeight: '700' },
                        ]}>
                        {item.Value}
                      </Text>
                      <Text style={[styles.card1t, { color: '#0d0d0d',fontWeight:'700' }]}>
                        {item.pTotal <= 0
                          ? `${item.pTotal} Item`
                          : `${item.pTotal} Items`}
                      </Text>
                    </View>
                  </TouchableOpacity>
                )}
              />
            ) : null}
          </View>
        </ScrollView>

        {product == true ? (
          <View ref={scrollViewRef} style={{ backgroundColor: '#fff' }}>
            <View style={styles.card3}>
              <Text style={styles.card3t}>My Collections</Text>
            </View>
            <View style={{ marginTop: selector?.length > 0 ? -10 : 0 }}>
              <FlatList
                data={selector}
                renderItem={({ item }) => (
                  <View
                    style={{
                      height: hp('23%'),
                      width: '100%',
                      marginTop: '0.5%',
                      // alignSelf: 'center',
                      borderWidth: 0.5,
                    }}>
                    <View
                      style={{
                        height: hp('2.8%'),
                        width: '100%',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Text style={styles.card3vt}>{item.Name}</Text>
                    </View>
                    <View
                      style={{
                        height: hp('20%'),
                        width: wp('100%'),
                        // maxHeight: hp('21.5%'),
                      }}>

                      <Image
                        style={{
                          width: win.width * 0.99,
                          height: '100%',borderRadius:10
                           
                        }}
                     resizeMode='stretch'
                        source={item.ImageName ?
                          { uri: `${ImagePath.path2}${'uploads/collection/'}${item.ImageName}` } : require('../../../assets/logo.png')}
                      />

                    </View>
                  </View>
                )}
              />
            </View>
          </View>
        ) : null}

        <View style={{ height: 30 }} />
      </ScrollView>
      <View style={{ bottom: 0, position: 'absolute', left: 0, right: 0 }}>
        {/* <TabView /> */}
      </View>
    </View>
  );
};
export default MyCatalogue;
const data = [
  { title: require('../../../assets/Image/myjewlery.png') },
  { title: require('../../../assets/Image/myjewlery.png') },
  { title: require('../../../assets/Image/myjewlery.png') },
  { title: require('../../../assets/Image/myjewlery.png') },
  { title: require('../../../assets/Image/myjewlery.png') },
  { title: require('../../../assets/Image/myjewlery.png') },
  { title: require('../../../assets/Image/myjewlery.png') },
  { title: require('../../../assets/Image/myjewlery.png'), type: 'add' },
];
const data1 = [
  {
    title: 'Milind Jewellers',
    title1: require('../../../assets/Image/myjewlery.png'),
    text: 'We can supply product you have as..',
    time: 'Last replied on 07 Sep,2020',
  },
  {
    title: 'Mahabir Jewellers',
    title1: require('../../../assets/Image/myjewlery.png'),
    text: 'Payments term can be discussed as per..',
    time: 'Last replied on 01 Sep,2020',
  },
  {
    title: 'Narendra Jewellers',
    title1: require('../../../assets/Image/myjewlery.png'),
    text: 'We can supply product you have as..',
    time: 'Last replied on 03 Sep,2020',
  },
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