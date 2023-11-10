import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Platform,
} from 'react-native';
import Header from '../../../components/CustomHeader';
import { useNavigation } from '@react-navigation/native';
import StatusBar from '../../../components/StatusBar';
import styles from './styles';
import { useIsFocused } from '@react-navigation/native';
import { Dropdown } from 'react-native-element-dropdown';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';

const SelectOption = () => {
  const navigation = useNavigation();
  const [type, setType] = useState();
  const [visiable, setVisible] = useState([{label:'select',value:'select'}]);
  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  useEffect(
    val => {
      if (isFocused) {
        manageOption;
        setType('');
      }
    },
    [isFocused],
  );
  const productTypeList = async () => {
    const Token = await AsyncStorage.getItem('loginToken')
    const Id = await AsyncStorage.getItem('Partnersrno');
    const Branch = await AsyncStorage.getItem('Branch');
    dispatch({
      type: 'product_TypeList_Request',
      url: 'partners/addProduct',
      PartnerSrNo: Id,
      Token: Token,
      BranchSrNo: Branch,
      category: 'common',
    });
  };
  const manageOption = val => {
    setType(val);

    if (val == 'Product') {
      {
        // setVisible(false);
        navigation.navigate('Addproduct', { productEdit1: false }), { type: val }
        dispatch({
          type: 'User_editProduct_Success',
          payload: '',
          productEdit: false,
        });
        productTypeList()
      }
    } else if (val == 'Collections') {
      {
        // setVisible(false);
        navigation.navigate('Addcollection'), { type: val };
        Apicall();
      }
    }
  };
  const Apicall = async () => {
    const partnerid = await AsyncStorage.getItem('Partnersrno');
    const Token = await AsyncStorage.getItem('loginToken');
    dispatch({
      type: 'Get_creativeImgList_Request',
      url: 'partners/creativeImgList',
      partnerId: partnerid,
      Token: Token,

    });
  }
  
  return (
    <View style={styles.container1}>
      <Header
        source1={require('../../../assets/Fo.png')}
        source={require('../../../assets/L.png')}
        source2={require('../../../assets/Image/dil.png')}
        title={'Select option to add '}
        onPress={() => navigation.goBack()}
        onPress1={() => navigation.navigate('MessageBox')}
        onPress2={() => navigation.navigate('FavDetails')}
      />
      <View style={styles.main2}>
        <View style={[styles.main, { alignItems: 'center' }]}>
          <Text style={styles.Text1}>Select Type</Text>
          <View style={styles.main1}>
          <Dropdown
                  style={styles.card}
                  placeholderStyle={styles.placeholder}
                  selectedTextStyle={styles.rnimg}
                  // iconStyle={{ tintColor: '#ffff' }}
                  data={Data?Data:visiable}
                  itemTextStyle={{ color: '#474747',}}

                  inputSearchStyle={{
                    borderRadius: 10,
                    backgroundColor: '#f0f0f0',
                  }}
                  // itemTextStyle={{ fontSize: 15 }}
                   itemContainerStyle={{ marginBottom: -15, }}
                    maxHeight={250}
                  labelField="label"
                  valueField="value"
                  placeholder="Select Type"
                  value={type}
                  onChange={item => {
                   manageOption(item.value)
                  }}
                />
          </View>
        </View>

      </View>
      <View style={styles.outcard}>
        <Text style={styles.outcardtext}>
          SELECT OPTION TO ADD FROM DROPDOWN
        </Text>
      </View>

     
      <StatusBar />
    </View>
  );
};
export default SelectOption;

const Data = [
  { label: 'Product', value: 'Product' },
  { label: 'Collections', value: 'Collections' },
    // { label: 'Category', value: 'Category' },

];
