import React from 'react';
import { View, FlatList, TouchableOpacity, Text, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ImagePath from '../../components/ImagePath';
import Loader from '../../components/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector, useDispatch } from 'react-redux';
const Catalogue = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const categiroes = useSelector(state => state.SupplierCategories.list);
  const isFetching = useSelector(state => state.isFetching);
  const selector = useSelector(state => state.SupplierDetail?.detail);
  const ProductList1 = async item => {
    const srno = await AsyncStorage.getItem('Partnersrno');
    const Token = await AsyncStorage.getItem('loginToken');
    dispatch({
      type: 'User_SupplierProductList_Request',
      url: 'partners/productTypeProducts',
      userId: selector.SrNo,
      typeId: item.Id,
      userType: 'supplier',
      login_user_id: srno,
      login_user_type: 'partner',
      Token: Token,
      name: item.Value,
      navigation,
    });
  };
  return (
    <View>

      <View
        style={{
          backgroundColor: '#fff',
          alignItems: 'center',
          justifyContent: 'center',
          paddingVertical: 14,
        }}>
        <Text
          style={{
            fontSize: 19,
            fontWeight: '700',
            fontFamily: 'Roboto-Medium',
            color: '#032e63',
          }}>
          Categories{' '}
        </Text>
      </View>
      {/* {isFetching ? <Loader /> : null} */}
      <FlatList
        data={categiroes}
        numColumns={3}
        renderItem={({ item }) => (
          <TouchableOpacity
            // onPress={() => navigation.navigate('MyProductDetails', { id: item.Id })}
            onPress={() => ProductList1(item)}
            // onPress={() => navigation.navigate('MyProductDetails')}
            style={{
              width: '33.3%',
              alignItems: 'center',
              // justifyContent: 'center',
              height: 175,
              backgroundColor: '#fff',
              borderWidth: 0.5,
    borderColor:'#807f82'
            }}>


            <Image
              style={{ height: '71%', width: '100%' }}
              // resizeMode={'stretch'}
              // source={require('../../assets/Not.png')}
              source={item.ImageName != null ? {
                uri: `${ImagePath.path2}${'uploads/product_type/'}${item.ImageName
                  }`,
              } : require('../../assets/Image/Not.jpeg')}
            />
            <View style={{ marginTop: 5, alignItems: 'center' }}>
              <Text
                style={{
                  fontFamily: 'Acephimere',
                  fontSize: 14,
                  color: '#032e63',
                  fontWeight: '700',
                }}>
                {item.Value}
              </Text>
              <Text
                style={{
                  fontFamily: 'Acephimere',
                  fontSize: 14,
                  color: '#0d0d0d',fontWeight:'700'
                }}> {item.pTotal <= 0
                  ? `${item.pTotal} Item`
                  : `${item.pTotal} Items`}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
      {/* <View style={{backgroundColor:'#fff'}}>
          <View style={{alignItems:'center',paddingVertical:20}}>
             <Text style={{fontSize:16,fontWeight:'700',fontFamily:'Roboto-Medium',color:'#032e63'}}>Collections</Text>
          </View>
           <View style={{width:'100%',height:180,borderTopWidth:1}}>

           </View>
           <View style={{width:'100%',height:180,borderTopWidth:1}}>

           </View>
           <View style={{width:'100%',height:180,borderWidth:1}}>

           </View>
        </View> */}
    </View>
  );
};
export default Catalogue;
const data1 = [
  { title: require('../../assets/Image/myjewlery.png') },
  { title: require('../../assets/Image/myjewlery.png') },
  { title: require('../../assets/Image/myjewlery.png') },
  { title: require('../../assets/Image/myjewlery.png') },
  { title: require('../../assets/Image/myjewlery.png') },
  { title: require('../../assets/Image/myjewlery.png') },
  { title: require('../../assets/Image/myjewlery.png') },
  { title: require('../../assets/Image/myjewlery.png'), type: 'add' },
];

const data = [
  {
    image: '',
    name: 'RC Bafna Jewllers',
    city: 'Mumbai',
    time: '17 Minutes ago',
  },
  {
    image: '',
    name: 'RC Bafna Jewllers',
    city: 'Mumbai',
    time: '17 Minutes ago',
  },
  {
    image: '',
    name: 'RC Bafna Jewllers',
    city: 'Mumbai',
    time: '17 Minutes ago',
  },
];