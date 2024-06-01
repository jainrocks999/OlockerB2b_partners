import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Platform,
} from 'react-native';
import {useNavigation, useIsFocused} from '@react-navigation/native';
import StatusBar from '../../../components/StatusBar';
import styles from './styles';
import Header from '../../../components/CustomHeader';
import DocumentPicker from 'react-native-document-picker';
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../../../components/Loader';
import {Dropdown} from 'react-native-element-dropdown';
import {useDispatch, useSelector} from 'react-redux';
import TempletModel from './TempletModel';
import axios from 'axios';
import RNFS from 'react-native-fs';

const Addcollection = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const isFetching = useSelector(state => state?.isFetching);
  const [camera1, setCamera] = useState(false);
  const [getapi, setGetapi] = useState(false);
  const [templetmodel, setTempletModal] = useState(false);
  const [status1, setStatus] = useState('1');
  const [collection, setCollection] = useState('');
  const [photo, setPhoto] = useState('');
  const [photo1, setPhoto1] = useState('');
  const [Photo2, setPhoto2] = useState('');
  const [visiable, setVisible] = useState(false);
  const onlyCharacters = /^[a-zA-Z\s]*$/;
  useEffect(() => {
    if (isFocused) {
      Apicall();
    }
  }, [isFocused]);
  const Apicall = async () => {
    const partnerid = await AsyncStorage.getItem('Partnersrno');
    const Token = await AsyncStorage.getItem('loginToken');
    dispatch({
      type: 'Get_creativeImgList_Request',
      url: 'partners/creativeImgList',
      partnerId: partnerid,
      Token: Token,
    });
  };
  const getDataFromChild = (data, data1) => {
    console.log('this is data from chiled', data, data1);
    let image2 = data.Logo.split('.').pop();
    setPhoto(`${data1}${data.Logo}`);
    setPhoto1(data.Logo);
    setPhoto2(`image/${image2}`);
    setGetapi(true);
    setCamera(false);
  };
  const uploadApi = async () => {
    setTempletModal(true);
  };
  const uploadPhoto = async () => {
    try {
      const res = await DocumentPicker.pickMultiple({
        type: [DocumentPicker.types.images, DocumentPicker.types.pdf],
      });
      setPhoto(res[0].uri);
      setPhoto1(res[0].name);
      setPhoto2(res[0].type);
      setCamera(true);
      setGetapi(false);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
      } else {
        throw err;
      }
    }
  };

  const AddCollectionData = async () => {
    const Token = await AsyncStorage.getItem('loginToken');
    const Id = await AsyncStorage.getItem('Partnersrno');
    const Branch = await AsyncStorage.getItem('Branch');
    if (onlyCharacters.test(collection) == '') {
      Toast.show('Please enter collection name only alphabetic characters.');
    } else if (status1 == '') {
      Toast.show('Please select status');
    } else if (photo1 == '') {
      Toast.show('Please upload image');
    } else {
      setVisible(true);

      let data = new FormData();
      // getapi == true
      //   ? data.append('hidden_image', {
      //       uri: photo,
      //       name: photo1.substring(photo1.lastIndexOf('/') + 1),
      //       type: Photo2,
      //     }):
      data.append('hidden_image', '');
      data.append('Description', '');
      data.append('Title', '');
      data.append('Name', collection);
      data.append('IsActive', status1);
      data.append('partnerId', Id);
      //   camera1==true||getapi==true
      // // camera1==true
      //     ?
      data.append('ImageName', {
        uri: photo,
        name: photo1.substring(photo1.lastIndexOf('/') + 1),
        type: Photo2,
      });
      // : data.append('ImageName', '');
      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://olocker.co/api/partners//postCreateCollection',
        headers: {
          Olocker: `Bearer ${Token}`,
        },
        data: data,
      };

      axios
        .request(config)
        .then(response => {
          console.log('adaddadad', response.data);
          if (response.data.success == true) {
            Toast.show(response?.data?.msg);
            navigation.navigate('Home1', {
              screen: 'MyCatalogue',
            });

            dispatch({
              type: 'User_collection_Request',
              url: '/partners/collectionList',
              Token: Token,
              partnerId: Id,
            });
            setVisible(false);
          } else {
            setVisible(false);
            Toast.show('collection Not Added ');
          }
        })
        .catch(error => {
          setVisible(false);
          console.log(error);
        });
    }
  };
  return (
    <View style={styles.container1}>
      <Header
        source={require('../../../assets/L.png')}
        source2={require('../../../assets/Image/dil.png')}
        source1={require('../../../assets/Fo.png')}
        title={'Add Collection '}
        onPress={() => navigation.goBack()}
        onPress1={() => navigation.navigate('MessageBox')}
        onPress2={() => navigation.navigate('FavDetails')}
      />
      {visiable || isFetching ? <Loader /> : null}
      <ScrollView style={styles.scroll}>
        <TempletModel
          visi={templetmodel}
          close={() => setTempletModal(false)}
          sendDatatoParent={getDataFromChild}
        />

        <View style={styles.card}>
          <View style={styles.main}>
            <Text style={styles.Text1}>Collection</Text>
            <View style={styles.main1}>
              <TextInput
                style={styles.input}
                placeholder="Enter name"
                placeholderTextColor="#474747"
                value={collection}
                onChangeText={val => setCollection(val)}
              />
            </View>
          </View>

          <View style={styles.main}>
            <Text style={styles.Text1}>Status</Text>
            <View style={styles.main1}>
              <Dropdown
                style={{
                  color: '#032e63',
                  width: '100%',

                  marginBottom: -1,
                  height: 40,
                  // marginTop: 5
                }}
                placeholderStyle={{
                  color: '#474747',
                  width: '100%',
                  fontSize: 14,
                  alignSelf: 'center',
                  fontFamily: 'Acephimere',
                }}
                selectedTextStyle={{
                  color: '#474747',
                  width: '100%',
                  fontSize: 14,
                  marginBottom: -1,
                  fontFamily: 'Acephimere',
                }}
                itemTextStyle={{color: '#474747'}}
                data={Status}
                inputSearchStyle={{
                  borderRadius: 10,
                  backgroundColor: '#f0f0f0',
                }}
                maxHeight={250}
                labelField="label"
                valueField="value"
                placeholder="Select Status"
                value={status1}
                onChange={item => {
                  setStatus(item.value);
                }}
              />
            </View>
          </View>

          <View style={styles.main}>
            <Text style={styles.Text1}>Banner</Text>
          </View>

          <View style={[styles.card1, {marginTop: 20}]}>
            <View style={styles.bottom}>
              <TouchableOpacity onPress={() => uploadPhoto()}>
                {camera1 ? (
                  <Image
                    resizeMode="center"
                    style={[styles.img1, {borderRadius: 10}]}
                    source={{uri: photo}}
                  />
                ) : (
                  <Image
                    style={styles.img1}
                    source={require('../../../assets/Image/add_photo.png')}
                  />
                )}
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  uploadApi();
                }}>
                {getapi ? (
                  <Image
                    resizeMode="center"
                    style={[styles.img1, {borderRadius: 10}]}
                    source={{uri: photo}}
                  />
                ) : (
                  <Image
                    style={[styles.img1]}
                    source={require('../../../assets/Image/select_tmp.png')}
                  />
                )}
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.bottom1}>
            <Text style={styles.bottom1t}>
              Upload banner in 300(H) * 250(W) Dimention
            </Text>
          </View>
        </View>
        <View style={styles.bottom2}>
          <TouchableOpacity
            onPress={
              () => AddCollectionData()
              // navigation.navigate('SelectOption')
            }
            style={styles.button}>
            <Text style={styles.textbt}>{'Save'}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <StatusBar />
      {/* <Buttom /> */}
    </View>
  );
};
export default Addcollection;

const Status = [
  {label: 'Active', value: '1'},
  {label: 'In Active', value: '0'},
];
