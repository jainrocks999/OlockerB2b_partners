import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList, Alert
} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import styles from './styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Loader from '../../../components/Loader';
import { TextInput } from 'react-native';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import Toast from 'react-native-simple-toast';

const MessageBox2 = () => {
  const navigation = useNavigation();
  const isFoucse = useIsFocused();
  const [data1,setData1]=useState();
  console.log('supplier,,,, contact list675776 ,',data1);
  const[visible,setVisiable]=useState(false);
  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState();
useEffect(()=>{
  setFilteredDataSource(data1)
  setMasterDataSource(data1)
},[data1])

  const [masterDataSource, setMasterDataSource] = useState();
  const searchFilterFunction = text => {
    if (text) {
      const newData = masterDataSource.filter(function (item) {
        const itemData = `${item?.SupplierName} ${item?.created_at?.substring(0, 29)} `
          ? `${item?.SupplierName} ${item?.created_at?.substring(0, 29)}`.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      console.log('new data>>>>>>>>>>>>>',newData);
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };

  const handleSearch = () => {
    setSearch('');
    setFilteredDataSource(masterDataSource);
  };

  const dispatch = useDispatch();
 
 
  const manageBusiness = async () => {
   
    const Id = await AsyncStorage.getItem('Partnersrno');
    const Token = await AsyncStorage.getItem('loginToken')
    // dispatch({
    //   type: 'Patner_Contact_Request',
    //   url: 'supplier//supplierListForPartners',
    //   user_id: Id,
    //   Token: Token,
    // });
setVisiable(true);
    const axios = require('axios');

let config = {
  method: 'get',
  maxBodyLength: Infinity,
  url: `https://olocker.co/api/supplier//supplierListForPartners?user_id=${Id}`,
  headers: { 
    'Olocker': `Bearer ${Token}`
  }
};

axios.request(config)
.then((response) => {
  if(response.data.status==true){
    setData1(response.data.data);
   console.log(JSON.stringify(response.data.data));
   setVisiable(false);
  }else{
    
    setData1(response.data.data);
    setVisiable(false);
    Toast.show(response?.data?.msg);
  }
})
.catch((error) => {
  setVisiable(false);
  console.log(error);
});


  };
  useEffect(() => {
    if(isFoucse){
    manageBusiness();
   
    }
  }, [isFoucse])

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


  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      {visible ? <Loader /> : null}

      <View style={styles.container}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity style={{height:25,width:45,borderWidth:0,justifyContent:'center'}}
            delayPressIn={0}
            onPress={() => navigation.goBack()}>
            <Image
              style={styles.img}
              source={require('../../../assets/L.png')}
            />
          </TouchableOpacity>
          <Text style={[styles.text, { marginLeft: 0 }]}>Message Box</Text>
        </View>
        <View style={styles.headertouch}>
          <TouchableOpacity
            style={{ marginLeft: 15 }}
            onPress={() => navigation.navigate('FavDetails')}
          >
            <Image
              style={styles.img2}
              source={require('../../../assets/Image/dil.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => Logout()}
          >
            <Image
              style={[styles.img3, { tintColor: '#fff' }]}
              resizeMode="contain"
              source={require('../../../assets/Image/logout.png')}
            />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* <View style={{ height: 80, marginTop: 15 }}>
          <FlatList
            data={filteredDataSource}
            horizontal
            showsHorizontalScrollIndicator={false}

            renderItem={({ item }) => (
              <View>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('ChatScreen', { item: item });
                  }}
                  style={{
                    height: 60, width: 60, borderRadius: 30, backgroundColor: '#f0f0f0',
                    borderWidth: 1, margin: 7, justifyContent: 'center', alignItems: 'center'
                  }}
                >
                  <Text style={{ fontSize: 22, fontWeight: '700' }}>{item?.ContactPersonName.substring(0, 1).toUpperCase()}</Text>
                  <View
                    style={{
                      backgroundColor: '#30fc3a',
                      height: 15,
                      width: 15,
                      borderWidth: 1,
                      position: 'absolute',
                      bottom: 2,
                      right: 2,
                      borderRadius: 7.5,
                    }}
                  />
                </TouchableOpacity>
              </View>
            )}
          />
        </View> */}
        <View style={[styles.searchbar, { marginTop: 20 }]}>
          <TextInput placeholder="Search" 
          placeholderTextColor='#474747'
          style={{ fontSize: 18 ,color:'#474747'}}
            value={search}
            onChangeText={val => searchFilterFunction(val)}
          />
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Feather name="search" size={30} />
          </View>
        </View>
        <View>

          <FlatList
            data={filteredDataSource}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('ChatScreen', { item: item ,Id:false});
             
                }}
                style={styles.Usercard}>
                  {/* {console.log('dddata a a',item)} */}
                <View style={{
                  height: 60, width: 60, borderRadius: 30,
                  backgroundColor: '#f0f0f0', marginRight: 10, marginTop: 5,
                  alignItems: 'center', justifyContent: 'center'
                }}>
                  <Text
                    style={{ fontSize: 22, fontWeight: '700',color:'#474747' }}

                  > {item?.SupplierName?.substring(0, 1).toUpperCase()}</Text>
                </View>
                <View style={{ justifyContent: 'center', width: '65%', marginLeft: 10 }}>
                  <Text
                    style={{ fontSize: 18, fontWeight: '800', color: '#000' }}>
                    {item?.SupplierName}
                  </Text>
                  <Text>{item?.created_at?.substring(0, 19)}</Text>
                </View>
                {/* <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={{ fontWeight: '800' }}>Now</Text>
                  <View
                    style={{
                      backgroundColor: '#4eaefc',
                      height: 15,
                      width: 15,
                      borderWidth: 1,
                      marginTop: 15,
                      borderRadius: 7.5,
                    }}
                  />
                </View> */}
              </TouchableOpacity>
            )}
          />
        </View>





        <View style={{ height: 30 }} />
      </ScrollView>
    </View>
  );
};
export default MessageBox2;

const selector = [
  {
    img: 'data:image/jpeg;base64,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',
    conatct_name: 'Supplier',
  },


];
