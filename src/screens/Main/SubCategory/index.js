import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  Share,
  TextInput,
  Dimensions,
} from 'react-native';
import Header from '../../../components/CustomHeader';
import {useNavigation} from '@react-navigation/native';
import {FlatListSlider} from 'react-native-flatlist-slider';
import Preview from '../../../components/Preview';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles';
import {useSelector, useDispatch} from 'react-redux';
import Loader from '../../../components/Loader';
const SubCategory = ({route}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const selector = useSelector(state => state.ProductDetail?.detail);
  const productId = route?.params?.productId;
  const Detail = route.params.Details;
  const isLiked = useSelector(state => state.mg);
  const BannerWidth = (Dimensions.get('window').width * 15) / 18;
 const limit1 =useSelector(state => state.limit)
  const Data = [];

  selector?.productimages.map(Item => {
    Item.images == ''
      ? Data
      : Data.push({
          image: Item.images,
          desc: 'abcsd',
        });
  });

  const lenght = Data.length;
  const isFetching = useSelector(state => state.isFetching);
  const [collection, setCollection] = useState(
    selector?.productDetail?.ProductSku,
  );
  const [stockNo, setStock] = useState(selector?.productDetail?.ItemName);

  const [demo, setDemo] = useState(
    `${parseFloat(selector?.productDetail?.GrossWt).toFixed(2)} GM`,
  );

  const [editable, setEditable] = useState(false);
  const [editable1, setEditable1] = useState(false);
  const [editable2, setEditable2] = useState(false);

  const share = async () => {
    await Share.share({
      message: `Product Name : ${
        selector?.productDetail?.ItemName
      }\nProduct Details : ${
        selector?.productDetail?.ItemDesc
      }\n app url:${'https://olocker.co/partners'}\n  playStore url: ${'https://play.google.com/store/apps'}`,
      // url1 : 'https://play.google.com/store/apps',
    });
  };

  const RemoveWislist = async item => {
    const partnerid = await AsyncStorage.getItem('Partnersrno');
    const Token = await AsyncStorage.getItem('loginToken');

    dispatch({
      type: 'Get_removeProductWishlist_Request',
      url: 'partners/removeProductWishlist',
      PartnerSrNo: partnerid,
      productId: item,
      userType: 'partner',
      Token: Token,
      navigation,
      mg: false,
      supllier: selector?.productDetail?.SupplierSrNo,
      name: selector?.productDetail?.ItemName,
      partner: Detail ? true : false,
      id: selector?.productDetail?.ItemType,
      navigation: navigation,
      page: 'data',
      iscollection: false,
      collection_id: route.params.collection_id,
    });
  };
  const AddWishList = async (item, index) => {
    console.log('virenDRA', item);
    const partnerid = await AsyncStorage.getItem('Partnersrno');
    const Token = await AsyncStorage.getItem('loginToken');
    dispatch({
      type: 'User_addProductWishlist_Request',
      url: 'partners/addProductitemWishlist',
      PartnerSrNo: partnerid,
      userType: 'partner',
      Token: Token,
      mg: true,
      name: selector?.productDetail?.ItemName,
      checkProduct: item,
      supllier: selector?.productDetail?.SupplierSrNo,
      partner: Detail ? true : false,
      id: selector?.productDetail?.ItemType,
      navigation: navigation,
      page: 'data',
      iscollection: false,
      collection_id: route.params.collection_id,
    });
  };
  const EditProduct = async item => {
    const partnerid = await AsyncStorage.getItem('Partnersrno');
    const Token = await AsyncStorage.getItem('loginToken');
    const Branch = await AsyncStorage.getItem('Branch');
    dispatch({
      type: 'User_editProduct_Request',
      url: 'partners//editProduct',
      ProductSrNo: productId,
      PartnerSrNo: partnerid,
      // BranchSrNo: Branch,
      Token: Token,
      navigation: navigation,
    });
  };
  return (
    <View style={styles.container}>
      <Header
        source={require('../../../assets/L.png')}
        source1={require('../../../assets/Fo.png')}
        source2={require('../../../assets/Image/dil.png')}
        title={'Product Details'}
        onPress={() => navigation.goBack()}
        onPress1={() => navigation.navigate('MessageBox')}
        onPress2={() => navigation.navigate('FavDetails')}
      />
      {isFetching ? <Loader /> : null}
      <ScrollView>
        <View style={styles.main}>
          {isLiked === false ? (
            <TouchableOpacity
              onPress={() => {
                AddWishList(selector?.productDetail?.SrNo);
              }}>
              <Image
                style={{width: 21, height: 18, tintColor: 'grey'}}
                source={require('../../../assets/Image/dil.png')}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => {
                RemoveWislist(selector?.productDetail?.SrNo);
              }}>
              <Image
                style={{width: 21, height: 18, tintColor: 'red'}}
                source={require('../../../assets/Image/dil.png')}
              />
            </TouchableOpacity>
          )}

          <View>
            <TouchableOpacity onPress={() => share()}>
              <Image
                style={styles.img}
                source={require('../../../assets/Image/share1.png')}
              />
            </TouchableOpacity>
          </View>
        </View>

        {lenght > 0 ? (
          <View style={{marginTop: 10}}>
            {lenght == 1 ? (
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 15,
                  height: 200,
                  width: '100%',
                }}>
                <Image
                  style={{height: 190, width: BannerWidth, borderRadius: 190}}
                  source={{uri: Data[0].image}}
                  resizeMode={Platform.OS == 'android' ? 'contain' : ''}
                />
              </View>
            ) : (
              <FlatListSlider
                data={Data}
                height={200}
                // timer={5000}
                contentContainerStyle={{
                  paddingHorizontal: 30,
                  alignItems: 'center',
                }}
                indicatorContainerStyle={{position: 'absolute', bottom: -20}}
                indicatorActiveColor={'red'}
                indicatorInActiveColor={'grey'}
                indicatorActiveWidth={5}
                component={<Preview />}
                separatorWidth={9}
                width={310}
                autoscroll={true}
                loop={false}
              />
            )}
          </View>
        ) : (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 15,
              height: 200,
              width: '100%',
            }}>
            <Image
              style={{height: 190, width: BannerWidth, borderRadius: 190}}
              source={require('../../../assets/logo.png')}
              resizeMode={Platform.OS == 'android' ? 'contain' : ''}
            />
          </View>
        )}

        <View style={styles.view}>
          <Image
            style={styles.img1}
            source={require('../../../assets/Image/rupay.png')}
          />
          <Text style={styles.text}>
            {selector?.productDetail?.ProductsPrice == null
              ? parseFloat(selector?.productDetail?.ProductCharges)?.toFixed(2)
              : parseFloat(selector?.productDetail?.ProductsPrice)?.toFixed(2)}
          </Text>
          <Text style={styles.text1}>( Approximate Price )</Text>
        </View>
        <View style={{padding: 20}}>
          <View style={styles.main1}>
            <View style={styles.main1view}>
              <View style={styles.main1view1}>
                <Text style={styles.main1view1text}>
                  {'PRODUCT DESCRIPTION'}
                </Text>
              </View>
   

              {Detail ? (
                <TouchableOpacity
                  onPress={() => EditProduct(selector?.productDetail)}
                  style={{alignItems: 'flex-end'}}>
                  <Image
                    style={{width: 20, height: 20}}
                    source={require('../../../assets/Image/edit.png')}
                  />
                </TouchableOpacity>
              ) : null}
            </View>
            <View style={{marginLeft: 20, marginTop: 8}}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={styles.cardtext}>{'Name       :      '}</Text>
                <TextInput
                  style={{height: 40, color: '#052a47'}}
                  value={stockNo}
                  editable={editable1}
                  onChangeText={val => setStock(val)}
                />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: -15,
                }}>
                <Text style={styles.cardtext}>{'Stock No :      '}</Text>
                <TextInput
                  style={{height: 40, color: '#052a47'}}
                  value={collection}
                  editable={editable}
                  onChangeText={val => setCollection(val)}
                />
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: -15,
                }}>
                <Text style={styles.cardtext}>{'Metal        :     '}</Text>

                <TextInput
                  style={{height: 40, color: '#052a47'}}
                  value={demo}
                  editable={editable2}
                  onChangeText={val => setDemo(val)}
                />
                {/* )} */}
              </View>
            </View>
          </View>
          {/* {Detail ?null:
          (<View style={{
            alignItems:'center',
            justifyContent:'space-between',
            marginTop:25,
            flexDirection:'row',
            paddingHorizontal:1
            }}>
              <TouchableOpacity style={styles.Enqure}>
                <Text style={styles.textEQ}>ADD TO CATALOGUE</Text>
              </TouchableOpacity>

            {console.log('selector?.productDetail....',selector)}
              <TouchableOpacity 
               onPress={()=>  navigation.navigate('ChatScreen',{ item: selector?.productDetail,Id:true })}
              style={styles.Enqure}>
                <Text style={styles.textEQ}>ENQUIRE NOW</Text>
              </TouchableOpacity>
          </View>)} */}
        </View>
        <View style={{height: 100}} />
      </ScrollView>
      <View style={{bottom: 0, left: 0, right: 0, position: 'absolute'}}></View>
    </View>
  );
};
export default SubCategory;

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
];
