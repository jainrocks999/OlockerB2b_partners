import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';
import Header from '../../../components/CustomHeader';
import {useNavigation} from '@react-navigation/native';
import styles from './styles';
import {RadioButton} from 'react-native-paper';
import CheckBox from '@react-native-community/checkbox';
import MultiSelect from 'react-native-multiple-select';
import {launchImageLibrary} from 'react-native-image-picker';
import Toast from 'react-native-simple-toast';
import {useDispatch, useSelector} from 'react-redux';
import Loading from '../../../components/Loader';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Dropdown} from 'react-native-element-dropdown';
import {Image} from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {FlatList} from 'react-native';
import {color} from 'react-native-elements/dist/helpers';
let goldSpecilization = [];
let diamondSpecilization = [];
let silverSpecilization = [];
let platinumSpecilization = [];
const EditSupplierProfile = ({route}) => {
  const navigation = useNavigation();
  const selector = useSelector(state => state?.partnerprofile);
  const details = route.params?.selector?.partnerdetails;
  const details2 = route.params?.extractedImages;
  const [fetching, setFetching] = useState(false);

  const [customPurityDia, setCustomPurityDia] = useState(false);
  const [customPurityGo, setCustomPurityGo] = useState(false);
  const [customPurityPla, setCustomPurityPla] = useState(false);
  const [customPuritySil, setCustomPuritySil] = useState(false);

  const [pincode, setPinCode] = useState(details?.PinCode);

  useEffect(() => {
    route.params?.selector?.specialisation.map(item => {
      if (item.metaltype == 'Gold') {
        if (goldSpecilization.length > 0) {
          if (!goldSpecilization.includes(item)) {
            goldSpecilization.push(item);
          }
        } else {
          goldSpecilization.push(item);
        }
      } else if (item.metaltype == 'Diamond') {
        if (diamondSpecilization.length > 0) {
          if (!diamondSpecilization.includes(item)) {
            diamondSpecilization.push(item);
          }
        } else {
          diamondSpecilization.push(item);
        }
      } else if (item.metaltype == 'Platinum') {
        if (platinumSpecilization.length > 0) {
          if (!platinumSpecilization.includes(item)) {
            platinumSpecilization.push(item);
          }
        } else {
          platinumSpecilization.push(item);
        }
      } else if (item.metaltype == 'Silver') {
        if (silverSpecilization.length > 0) {
          if (!silverSpecilization.includes(item)) {
            silverSpecilization.push(item);
          }
        } else {
          silverSpecilization.push(item);
        }
      }
    });
  }, []);

  const [inputs1, setInputs1] = useState({
    State: '',
    District: '',
  });
  const handleInputs1 = (key, value) => {
    setInputs1(prev => ({...prev, [key]: value}));
  };

  const [inputs, setInputs] = useState({
    // SrNo: details?.SrNo,
    CompanyName: details?.CompanyName,
    DisplayName: details?.DisplayName,
    txtOwnerName: details?.OwnersName,
    txtAddress: details?.HOaddress,
    StateId: details?.StateId,
    CityId: details?.CityId,
    WebSiteUrl: details?.Website,
    EmailId: selector?.partnerlogins?.Email,
    Mobile: selector?.partnerlogins?.Mobile,
    BillingContactEmail: details?.BillingContactEmail,
    NoofEmployee: details?.NoofEmployee,
    Create_InvoiceDone: 0,
    AccessToMyJewellerApp: details?.AccessToMyJewellerApp,
    IsOnlineSelling: details?.IsOnlineSelling,
    IsLaunchSavingScheme: details?.IsLaunchSavingScheme,
  
    BranchSrNo: selector?.partnerlogins?.BranchSrNo,
    PartnerIntroduction: details?.PartnerIntroduction,
    JTypep: '',
    JTyped: '',
    JTypeg: '',
    JTypes: '',
    diamond_purity: [],
    diamond_specialisation: [],
    gold_purity: [],
    gold_specialisation: [],
    silver_purity: [],
    silver_specialisation: [],
    platinum_specialisation: [],
    platinum_purity: [],
    goldcustom_purity: '',
    diamondcustom_purity: '',
    platinumcustom_purity: '',
    silvercustom_purity: '',

    ProductLogo: {
      name: selector?.partnerdetails?.Logo,
      type: 'image/jpg',
      uri: `https://olocker.co/uploads/partner/${selector?.partnerdetails?.Logo}`,
    },
    pimgname1: '',
    ProductName1: selector?.partnerimagedetails[0]?.ProductName1,

    ProductName2: selector?.partnerimagedetails[0]?.ProductName2,
    pimgname2: '',
    ProductName3: selector?.partnerimagedetails[0]?.ProductName3,
    pimgname3: '',

    ProductImage1: {
      name: selector?.partnerimagedetails[0]?.ProductImage1,
      type: 'image/jpg',
      uri: `https://olocker.co/uploads/partner/${selector?.partnerimagedetails[0]?.ProductImage1}`,
    },
    ProductImage2: {
      name: selector?.partnerimagedetails[0]?.ProductImage2,
      type: 'image/jpg',
      uri: `https://olocker.co/uploads/partner/${selector?.partnerimagedetails[0]?.ProductImage2}`,
    },
    ProductImage3: {
      name: selector?.partnerimagedetails[0]?.ProductImage3,
      type: 'image/jpg',
      uri: `https://olocker.co/uploads/partner/${selector?.partnerimagedetails[0]?.ProductImage3}`,
    },
    showroomimage1: {
      name: selector?.partnerimagedetails[0]?.ShowRoomImageName1,
      type: 'image/jpg',
      uri: `https://olocker.co/uploads/partner/${selector?.partnerimagedetails[0]?.ShowRoomImageName1}`,
    },
    showroomimage2: {
      name: selector?.partnerimagedetails[0]?.ShowRoomImageName2,
      type: 'image/jpg',
      uri: `https://olocker.co/uploads/partner/${selector?.partnerimagedetails[0]?.ShowRoomImageName2}`,
    },
    showroomimage3: {
      name: selector?.partnerimagedetails[0]?.ShowRoomImageName3,
      type: 'image/jpg',
      uri: `https://olocker.co/uploads/partner/${selector?.partnerimagedetails[0]?.ShowRoomImageName3}`,
    },
    Ownerimg1: {
      name: selector?.partnerimagedetails[0]?.OwnerImageName1,
      type: 'image/jpg',
      uri: `https://olocker.co/uploads/partner/${selector?.partnerimagedetails[0]?.OwnerImageName1}`,
    },
    OwnerName1: selector?.partnerimagedetails[0]?.OwnerName1,
    OwnerDescription1: selector?.partnerimagedetails[0]?.OwnerDescription1,
    Ownerimg2: {
      name: selector?.partnerimagedetails[0]?.OwnerImageName2,
      type: 'image/jpg',
      uri: `https://olocker.co/uploads/partner/${selector?.partnerimagedetails[0]?.OwnerImageName2}`,
    },
    OwnerName2: selector?.partnerimagedetails[0]?.OwnerName2,
    OwnerDescription2: selector?.partnerimagedetails[0]?.OwnerDescription2,
    Ownerimg3: {
      name: selector?.partnerimagedetails[0]?.OwnerImageName3,
      type: 'image/jpg',
      uri: `https://olocker.co/uploads/partner/${selector?.partnerimagedetails[0]?.OwnerImageName3}`,
    },
    OwnerName3: selector?.partnerimagedetails[0]?.OwnerName3,
    OwnerDescription3: selector?.partnerimagedetails[0]?.OwnerDescription3,
  });
  const handleOnSumit = async () => {
    const srno = await AsyncStorage.getItem('Partnersrno');

    const newData = {...inputs, SrNo: srno};
    let data = new FormData();
    let valid = true;
    if (pincode == '') {
      Toast.show('please enter PinCode');
      valid = false;
      return;
    }
    data.append('PinCode', pincode);
    Object.keys(newData).map(item => {
      //  Object.keys(newData).map(async (item, index) => {
      switch (item) {
        case 'ProductLogo':
          data.append(item, newData[item]);
          break;

        case 'CompanyName': {
          if (newData[item] == '') {
            Toast.show('Please enter CompanyName');
            valid = false;
            return;
          }
          data.append(item, newData[item]);
          break;
        }
        case 'DisplayName':
          if (newData[item] == '') {
            Toast.show('please enter DisplayName');
            valid = false;
            return;
          }
          data.append(item, newData[item]);
          break;
        case 'txtOwnerName':
          if (newData[item] == '') {
            Toast.show('please enter OwnerName');
            valid = false;
            return;
          }
          data.append(item, newData[item]);
          break;

        case 'txtAddress':
          if (newData[item] == '') {
            Toast.show('please enter Address');
            valid = false;
            return;
          }
          data.append(item, newData[item]);
          break;

        case 'StateId':
          if (newData[item] == '') {
            Toast.show('please enter State');
            valid = false;
            return;
          }
          data.append(item, newData[item]);
          break;

        case 'CityId':
          if (newData[item] == '') {
            Toast.show('please enter CityId');
            valid = false;
            return;
          }
          data.append(item, newData[item]);
          break;

        case 'EmailId':
          if (newData[item] == '') {
            Toast.show('please enter EmailId');
            valid = false;
            return;
          }
          data.append(item, newData[item]);
          break;

        case 'Mobile':
          if (newData[item] == '') {
            Toast.show('please enter Mobile Number');
            valid = false;
            return;
          }
          data.append(item, newData[item]);
          break;

        case 'BillingContactEmail':
          if (newData[item] == '') {
            Toast.show('please enter BillingContactEmail');
            valid = false;
            return;
          }
          data.append(item, newData[item]);
          break;

        case 'platinum_specialisation':
          newData[item].map((item, index) => {
            data.append(`platinum_specialisation[${index}]`, item);
          });
          break;
        case 'silver_specialisation':
          newData[item].map((item, index) => {
            data.append(`silver_specialisationp[${index}]`, item);
          });
          break;
        case 'gold_specialisation':
          newData[item].map((item, index) => {
            data.append(`gold_specialisation[${index}]`, item);
          });
          break;
        case 'diamond_specialisation':
          newData[item].map((item, index) => {
            data.append(`diamond_specialisation[${index}]`, item);
          });
          break;
        case 'diamond_purity':
          newData[item].map((item, index) => {
            data.append(`diamond_purity[${index}]`, item);
          });
          break;
        case 'gold_purity':
          newData[item].map((item, index) => {
            data.append(`gold_purity[${index}]`, item);
          });
          break;
        case 'silver_purity':
          newData[item].map((item, index) => {
            data.append(`silver_purity[${index}]`, item);
          });
          break;
        case 'platinum_purity':
          newData[item].map((item, index) => {
            data.append(`platinum_purity[${index}]`, item);
          });
          break;
        case 'JTyped':
          data.append(item, newData[item] ? 'Diamond' : '');
          break;
        case 'JTypep':
          data.append(item, newData[item] ? 'Platinum' : '');
          break;
        case 'JTypeg':
          data.append(item, newData[item] ? 'Gold' : '');
          break;
        case 'JTypes':
          data.append(item, newData[item] ? 'Silver' : '');
          break;

        default:
          data.append(item, newData[item]);
      }
    });
    if (valid) {
      validateUser(data);
    } else {
      Alert.alert('APLI NOT CALLED');
    }
  };
  const validateUser = async () => {
    
    let valid =true;
    const Token = await AsyncStorage.getItem('loginToken');
    const srno = await AsyncStorage.getItem('Partnersrno');
    if (!inputs || !inputs.CompanyName || inputs.CompanyName.trim() == '') {
      Toast.show('Please enter CompanyName');
      valid =false;
      console.log('check  the data ,,',inputs.CompanyName);
      return;
  }else if(inputs.DisplayName==''){
    Toast.show('please enter DisplayName');
    valid = false;
    return;
  }else if(inputs.txtOwnerName==''){
    Toast.show('please enter OnwerName');
    valid = false;
    return;
  }else if(inputs.txtAddress==''){
    Toast.show('please enter Ho Address');
    valid = false;
    return;
  }
  else if (pincode == '') {
    Toast.show('please enter PinCode');
    valid = false;
    return;
  }else if(inputs.StateId==''){
    Toast.show('please enter State');
    valid = false;
    return;
  }else if(inputs.CityId==''){
    Toast.show('please enter City');
    valid = false;
    return;
  }else if(inputs.EmailId==''){
    Toast.show('please enter EmailId');
    valid = false;
    return;
  }else if(inputs.Mobile==''){
    Toast.show('please enter Moblie Number');
    valid = false;
    return;
  }else if(inputs.BillingContactEmail==''){
    Toast.show('please enter BillingContactEmail');
    valid = false;
    return;
  }
 if(valid){

   setFetching(true);
try{

    const axios = require('axios');
    let data = new FormData();
    data.append('SrNo', srno);
    if(inputs.ProductLogo.name==''|| inputs.ProductLogo.name==undefined){
      console.log('data.append(',inputs.ProductLogo.name);
      data.append('productlogo','');
    }else{
      console.log('product imanfger',inputs.ProductLogo.name);
      data.append('productlogo', {
      uri: inputs.ProductLogo.uri,
      name: inputs.ProductLogo.name,
      type: inputs.ProductLogo.type,
    });}
    data.append('CompanyName', inputs.CompanyName);
    data.append('DisplayName', inputs.DisplayName);
    data.append('txtOwnerName', inputs.txtOwnerName);
    data.append('StateId', inputs.StateId);
    data.append('CityId', inputs.CityId);
    data.append('PinCode', pincode);
    data.append('Mobile', inputs.Mobile);
    data.append('txtAddress', inputs.txtAddress);
    data.append('WebSiteUrl', inputs.WebSiteUrl);
    data.append('EmailId', inputs.EmailId);
    data.append('BillingContactEmail', inputs.BillingContactEmail);
    // data.append('Password', inputs.Password);
    data.append('JTyped', inputs.JTyped);
    data.append('JTypeg', inputs.JTypeg);
    data.append('JTypep', inputs.JTypep);
    data.append('JTypes', inputs.JTypes);
     inputs["diamond_purity"].map((item,index)=>{
      data.append(`diamond_purity[${index}]`, item.toString());
     })

    data.append('diamondcustom_purity', inputs.diamondcustom_purity);
    inputs["diamond_specialisation"].map((item,index)=>{
      data.append(`diamond_specialisation[${index}]`, item.toString());
     })
   
    inputs["gold_purity"].map((item,index)=>{
      data.append(`gold_purity[${index}]`, item.toString());
     })
    
    data.append('goldcustom_purity',inputs.goldcustom_purity);
    inputs["gold_specialisation"].map((item,index)=>{
      data.append(`gold_specialisation[${index}]`, item.toString());
     })


    data.append('platinum_purity',inputs.goldcustom_purity);
    inputs["platinum_purity"].map((item,index)=>{
      data.append(`platinum_purity[${index}]`, item.toString());
     })
    
   data.append('platinumcustom_purity', inputs.platinumcustom_purity);

   inputs["platinum_specialisation"].map((item,index)=>{
    data.append(`platinum_specialisation[${index}]`, item.toString());
   })
      inputs["silver_purity"].map((item,index)=>{
        data.append(`silver_purity[${index}]`, item.toString());
       })
    data.append('silvercustom_purity',inputs.silvercustom_purity);
    inputs["silver_specialisation"].map((item,index)=>{
      data.append(`silver_specialisation[${index}]`, item.toString());
     })
    data.append('ProductName1', inputs.ProductName1??'');
  
    data.append('ProductName2', inputs.ProductName2??'');
   
    data.append('ProductName3', inputs.ProductName3??'');
 
    data.append('PartnerIntroduction', inputs.PartnerIntroduction??'');
      data.append('NoofEmployee', inputs.NoofEmployee??'');
    data.append('OwnerName1', inputs.OwnerName1??'');
    data.append('OwnerDescription1', inputs.OwnerDescription1??'');
    data.append('OwnerName2', inputs.OwnerName2??'');
     data.append('OwnerDescription2', inputs.OwnerDescription2??'');
     data.append('OwnerName3', inputs.OwnerName3??'');
     data.append('OwnerDescription3', inputs.OwnerDescription3??'');
    //  data.append('productlogo', '');
     data.append('Create_InvoiceDone', inputs.Create_InvoiceDone);
     data.append('AccessToMyJewellerApp', inputs.AccessToMyJewellerApp??'');
     data.append('IsOnlineSelling', inputs.IsOnlineSelling??'');
     data.append('IsLaunchSavingScheme', inputs.IsLaunchSavingScheme??'');
    data.append('BranchSrNo', inputs.BranchSrNo);
if(inputs.showroomimage1.name==''||inputs.showroomimage1.name==undefined){
  data.append('showroomImg1','');
}else
   { data.append('showroomImg1', {
      uri: inputs.showroomimage1.uri,
      name: inputs.showroomimage1.name,
      type: inputs.showroomimage1.type,
    });}
    if(inputs.showroomimage2.name==''||inputs.showroomimage2.name==undefined){
      data.append('showroomImg2','');
    }else{
    data.append('showroomImg2', {
      uri: inputs.showroomimage2.uri,
      name: inputs.showroomimage2.name,
      type: inputs.showroomimage3.type,
    });}
if(inputs.showroomimage3.name==''||inputs.showroomimage3.name==undefined){
  data.append('showroomImg3','');
}else{
    data.append('showroomImg3',{
      uri: inputs.showroomimage3.uri,
      name: inputs.showroomimage3.name,
      type: inputs.showroomimage3.type,
    });}
    if(inputs.Ownerimg1.name==''||inputs.Ownerimg1.name==undefined){
      data.append('ownerImage1', '')
    }else {
      data.append('ownerImage1', {
      uri: inputs.Ownerimg1.uri,
      name: inputs.Ownerimg1.name,
      type: inputs.Ownerimg1.type,
    });}

    if (inputs.Ownerimg2.name == '' || inputs.Ownerimg2.name == undefined)  {
      data.append('ownerImage2', '');
  }else{
    data.append('ownerImage2', {
        uri: inputs.Ownerimg2.uri,
        name: inputs.Ownerimg2.name,
        type: inputs.Ownerimg2.type,
    });
} 
if(inputs.Ownerimg3.name==''||inputs.Ownerimg3.name==undefined){
   data.append('ownerImage3','');
}
else{
    data.append('ownerImage3', {
      uri: inputs.Ownerimg3.uri,
      name: inputs.Ownerimg3.name,
      type: inputs.Ownerimg3.type,
    });
  }
  if(inputs.ProductImage1.name==''||inputs.ProductImage1.name==undefined)
  {
    console.log('hihih');
    data.append('productImage1','')
  }
  else { data.append('productImage1', { 
      uri: inputs.ProductImage1.uri,
      name: inputs.ProductImage1.name,
      type: inputs.ProductImage1.type,
    });}

    if(inputs.ProductImage2.name==''||inputs.ProductImage2.name==undefined){
      data.append('productImage2','')
    }
    else{
    data.append('productImage2',  {
      uri: inputs.ProductImage2.uri,
      name: inputs.ProductImage2.name,
      type: inputs.ProductImage2.type,
    });}
    if(inputs.ProductImage3.name==''||inputs.ProductImage3.name==undefined){
      data.append('productImage3','')
    }else{
    data.append('productImage3',  {
      uri: inputs.ProductImage3.uri,
      name: inputs.ProductImage3.name,
      type: inputs.ProductImage3.type,
    });}
    
console.log('request sned on update data ',data);

    let config = {
      method: 'post',
      maxBodyLength: Infinity,

      url: 'https://olocker.co/api/partners/updateProfile',
      headers: {
        Olocker: `Bearer ${Token}`,
      },
      data: data,
    };

    axios.request(config).then(response => {
         if(response?.data?.success==true){
          navigation.navigate('Customers')
          Toast.show(response?.data?.msg);
          setFetching(false);
         
         }
         else{
          setFetching(false);
          Toast.show(response?.data?.msg)
         }
      })
      .catch(error => {
        setFetching(false);
        console.log( 'error,,,,,,,,,,,',error);
      });}catch {
           console.log('catch block error',error);
      }

    }
  };

  const handleInputs = (key, value) => {
    setInputs(prev => ({...prev, [key]: value}));
  };

  const handleImageUpload = type => {
    let options = {
      mediaType: 'photo',
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
      selectionLimit: type == 'showroom_image' ? 3 : 1,
    };
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        return;
      } else if (response.errorCode == 'camera_unavailable') {
        return;
      } else if (response.errorCode == 'permission') {
        return;
      } else if (response.errorCode == 'others') {
        return;
      }

      const obj = {
        name: response?.assets[0]?.fileName?.replace(
          /^rn_image_picker_lib_temp_/,
          '',
        ),
        type: response?.assets[0]?.type,
        uri: response.assets[0].uri,
      };
      let arr = [];

      switch (type) {
        case 'ProductLogo':
          handleInputs('ProductLogo', obj);
          break;

        case 'ProductImage1': {
          handleInputs('ProductImage1', obj);
          break;
        }

        case 'ProductImage2': {
          handleInputs('ProductImage2', obj);
          break;
        }
        case 'ProductImage3': {
          handleInputs('ProductImage3', obj);
          break;
        }
        case 'showroomimage1': {
          handleInputs('showroomimage1', obj);
          break;
        }
        case 'showroomimage2': {
          handleInputs('showroomimage2', obj);
          break;
        }
        case 'showroomimage3': {
          handleInputs('showroomimage3', obj);
          break;
        }
        case 'Ownerimg1': {
          handleInputs('Ownerimg1', obj);
          break;
        }
        case 'Ownerimg2': {
          handleInputs('Ownerimg2', obj);
          break;
        }
        case 'Ownerimg3': {
          handleInputs('Ownerimg3', obj);
          break;
        }
        // case 'showroom_image': {
        //   response.assets.map(item => {
        //     let obj2 = {
        //       name: item.fileName?.replace(/^rn_image_picker_lib_temp_/, ''),
        //       type: item.type,
        //       uri: item.uri,
        //     };

        //     arr.push(obj2);
        //     console.log(item);
        //   });
        //   handleInputs('showroom_image', arr);
        //   break;
        // }

        default:
          return;
      }
    });
  };

  const getSpecilization = data => {
    let arr = [];
    data?.map((item, index) => {
      let obj = {id: index.toString(), name: item?.name};
      arr.push(obj);
    });
    return arr;
  };

  useEffect(() => {
    {
      details?.PinCode ? handlePincode(details?.PinCode) : null;
    }
  }, [details?.PinCode]);

  const handlePincode = async val => {
    const Token = await AsyncStorage.getItem('loginToken');
    if (val.length == 6) {
      setPinCode(val);
      try {
        const response = await axios({
          method: 'GET',
          headers: {
            'content-type': 'application/json',
            Olocker: `Bearer ${Token}`,
          },
          url: `https://olocker.co/api/partners//getCityByState?pincode=${val}`,
        });

        if (response.status == 200) {
          setPinCode(response.data.Pincode);
          handleInputs('StateId', response.data.StateId);
          handleInputs('CityId', response.data.CityId);
          handleInputs1('District', response.data.District);
          handleInputs1('State', response.data.State);
          // setFetching(false);
          // Toast.show(response.data.msg);
        } else {
          // setFetching(false);
          // Toast.show(response.data.msg);
        }
      } catch (error) {
        Toast.show('Something went wrong');
        setFetching(false);
        console.log('this is iresponae', error);
      }
    } else {
      //  setPinCode(val)
    }
  };

  const renderScreen = () => {
    return (
      <ScrollView style={{paddingHorizontal: 10, paddingVertical: 10}}>
        <View>
          <Text style={styles.text}>
            CompanyName<Text style={{color: 'red'}}>{' *'}</Text>
          </Text>
          <TextInput
            placeholder="CompanyName"
            style={{
              borderWidth: 1,
              marginTop: 4,
              height: 40,
              borderRadius: 6,
              borderColor: 'grey',
              paddingLeft: 10,
              color: 'black',
            }}
            placeholderTextColor={'grey'}
            value={inputs.CompanyName}
            onChangeText={val => handleInputs('CompanyName', val)}
          />
        </View>
        <View style={{marginTop: 10}}>
          <Text style={styles.text}>
            DisplayName<Text style={{color: 'red'}}>{' *'}</Text>
          </Text>
          <TextInput
            placeholder="DisplayName"
            style={{
              borderWidth: 1,
              marginTop: 4,
              height: 40,
              borderRadius: 6,
              borderColor: 'grey',
              paddingLeft: 10,
              color: '#000',
            }}
            placeholderTextColor={'grey'}
            value={inputs.DisplayName}
            onChangeText={val => handleInputs('DisplayName', val)}
          />
        </View>
        <View style={{marginTop: 10}}>
          <Text style={styles.text}>
            OwnerName<Text style={{color: 'red'}}>{' *'}</Text>
          </Text>
          <TextInput
            placeholder="OwnerName"
            style={{
              borderWidth: 1,
              marginTop: 4,
              height: 40,
              borderRadius: 6,
              borderColor: 'grey',
              paddingLeft: 10,
              color: '#000',
            }}
            placeholderTextColor={'grey'}
            value={inputs.txtOwnerName}
            onChangeText={val => handleInputs('txtOwnerName', val)}
          />
        </View>
        <View style={{marginTop: 10}}>
          <Text style={styles.text}>
            HO Address*<Text style={{color: 'red'}}>{' *'}</Text>
          </Text>
          <TextInput
            placeholder="Address"
            style={{
              borderWidth: 1,
              marginTop: 4,
              height: 40,
              borderRadius: 6,
              borderColor: 'grey',
              paddingLeft: 10,
              color: '#000',
            }}
            placeholderTextColor={'grey'}
            value={inputs.txtAddress}
            onChangeText={val => handleInputs('txtAddress', val)}
          />
        </View>
        <View style={{marginTop: 10}}>
          <Text style={styles.text}>Pincode</Text>
          <TextInput
            placeholder="Pincode"
            style={{
              borderWidth: 1,
              marginTop: 4,
              height: 40,
              borderRadius: 6,
              borderColor: 'grey',
              paddingLeft: 10,
              color: '#000',
            }}
            placeholderTextColor={'grey'}
            defaultValue={pincode}
            keyboardType="number-pad"
            onChangeText={val => handlePincode(val)}
            //  onChangeText={val =>setPinCode(val)}
          />
        </View>

        <View style={{marginTop: 10}}>
          <Text style={styles.text}>
            State<Text style={{color: 'red'}}>{' *'}</Text>
          </Text>

          <TextInput
            placeholder="State"
            style={{
              borderWidth: 1,
              marginTop: 4,
              height: 40,
              borderRadius: 6,
              borderColor: 'grey',
              paddingLeft: 10,
              color: '#000',
            }}
            placeholderTextColor={'grey'}
            value={inputs1.State}
            editable={false}
            onChangeText={val => handleInputs1('State', val)}
          />

          {/* <View style={{}}>



            <Dropdown
              style={[
                styles.dropdown,
                {borderWidth: 1, borderColor: '#979998'},
              ]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              iconStyle={styles.iconStyle}         
              data={items1}
              itemTextStyle={{color: '#000'}}
              inputSearchStyle={{
                borderRadius: 10,
                color: '#474747',
                        backgroundColor: '#f0f0f0'
              }}
              searchPlaceholder="search.."
              maxHeight={250}
              search
              labelField="label"
              valueField="value"
              placeholder="state"
              value={inputs.StateId}
              onChange={item => {
                // manageCity(item.value);
                handleInputs('StateId', item.value);
              }}
            />
          </View> */}
        </View>
        <View style={{marginTop: 10}}>
          <Text style={styles.text}>
            City<Text style={{color: 'red'}}>{' *'}</Text>
          </Text>
          <TextInput
            placeholder="City"
            style={{
              borderWidth: 1,
              marginTop: 4,
              height: 40,
              borderRadius: 6,
              borderColor: 'grey',
              paddingLeft: 10,
              color: '#000',
            }}
            placeholderTextColor={'grey'}
            value={inputs1.District}
            editable={false}
            onChangeText={val => handleInputs1('District', val)}
          />

          {/* <View>
        <Dropdown
              style={[
                styles.dropdown,
                {borderWidth: 1, borderColor: '#979998'},
              ]}
              search
              searchPlaceholder="search.."
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              iconStyle={styles.iconStyle}
              data={items1}
              // data={cityList2 ? cityList2 : cityList ? cityList : []}
              maxHeight={250}
              labelField="label"
              valueField="value"
              placeholder="City"
              value={inputs.CityId}
              onChange={item => {
                handleInputs('CityId', item.value);
              }}
              itemTextStyle={{color: '#000'}}
              inputSearchStyle={{
                borderRadius: 10,
                color: '#474747',
                        backgroundColor: '#f0f0f0'
              }}
            /> 
          </View> */}
        </View>

        <View style={{marginTop: 10}}>
          <Text style={styles.text}>Website URL</Text>
          <TextInput
            placeholder="Website URL"
            style={{
              borderWidth: 1,
              marginTop: 4,
              height: 40,
              borderRadius: 6,
              borderColor: 'grey',
              paddingLeft: 10,
              color: '#000',
            }}
            placeholderTextColor={'grey'}
            value={inputs.WebSiteUrl}
            onChangeText={val => handleInputs('WebSiteUrl', val)}
          />
        </View>
        <View style={{marginTop: 10}}>
          <Text style={styles.text}>
            Email Address<Text style={{color: 'red'}}>{' *'}</Text>
          </Text>
          <TextInput
            placeholder="emailid"
            style={{
              borderWidth: 1,
              marginTop: 4,
              height: 40,
              borderRadius: 6,
              borderColor: 'grey',
              paddingLeft: 10,
              color: '#000',
            }}
            placeholderTextColor={'grey'}
            value={inputs.EmailId}
            onChangeText={val => handleInputs('EmailId', val)}
          />
        </View>
        <View style={{marginTop: 10}}>
          <Text style={styles.text}>
            Mobile number<Text style={{color: 'red'}}>{' *'}</Text>
          </Text>
          <TextInput
            placeholder="Mobile No."
            style={{
              borderWidth: 1,
              marginTop: 4,
              height: 40,
              borderRadius: 6,
              borderColor: 'grey',
              paddingLeft: 10,
              color: '#000',
            }}
            placeholderTextColor={'grey'}
            value={inputs.Mobile}
            onChangeText={val => handleInputs('Mobile', val)}
          />
        </View>
        <View style={{marginTop: 10}}>
          <Text style={styles.text}>
            Billing Contact Email<Text style={{color: 'red'}}>{' *'}</Text>
          </Text>
          <TextInput
            placeholder="billing contact email"
            style={{
              borderWidth: 1,
              marginTop: 4,
              height: 40,
              borderRadius: 6,
              borderColor: 'grey',
              paddingLeft: 10,
              color: '#000',
            }}
            placeholderTextColor={'grey'}
            value={inputs.BillingContactEmail}
            onChangeText={val => handleInputs('BillingContactEmail', val)}
          />
        </View>

        {/* <View style={{marginTop: 10}}>
          <Text style={styles.text}>Password</Text>
          <TextInput
            placeholder="Password"
            style={{
              borderWidth: 1,
              marginTop: 4,
              height: 40,
              borderRadius: 6,
              borderColor: 'grey',
              paddingLeft: 10,
              color: '#000',
            }}
            placeholderTextColor={'grey'}
            value={inputs.Password}
            onChangeText={val => handleInputs('Password', val)}
          />
        </View> */}

        {/* <View style={{marginTop: 10}}>
          <Text style={styles.text}>
            Tell us what are you<Text style={{color: 'red'}}>{' *'}</Text>
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <RadioButton
                value="first"
                // status={inputs.SupplierType == 1 ? 'checked' : 'unchecked'}
                // onPress={() => handleInputs('SupplierType', 1)}
                uncheckedColor="#032e63"
                color="#032e63"
              />
              <Text style={{color:'#000'}}>Manufacturer</Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <RadioButton
                value="first"
                // status={inputs.SupplierType == 2 ? 'checked' : 'unchecked'}
                // onPress={() => handleInputs('SupplierType', 2)}
                uncheckedColor="#032e63"
                color="#032e63"
              />
              <Text style={{color:'#000'}} >Wholesaler</Text>
            </View>

            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <RadioButton
                value="first"
                // status={inputs.SupplierType == 3 ? 'checked' : 'unchecked'}
                // onPress={() => handleInputs('SupplierType', 3)}
                uncheckedColor="#032e63"
                color="#032e63"
              />
              <Text style={{color:'#000'}}>Both</Text>
            </View>
          </View>
        </View> */}
        {/* <View style={{marginTop: 10}}>
          <Text style={styles.text}>
            Any branches you have<Text style={{color: 'red'}}>{' *'}</Text>
          </Text>
          <CheckBox
            disabled={false}
            // value={inputs.IsAnyBranch}
            // onValueChange={newValue =>
            //   handleInputs('IsAnyBranch', !inputs.IsAnyBranch)
            // }
            tintColors={{true: '#032e63', false: '#032e63'}}
            onTintColor="#032e63"
            onCheckColor="#032e63"
            boxType="square"
            style={{height: 16, width: 18, marginTop: 10}}
          />
        </View> */}
        <View style={{marginTop: 10}}>
          <Text style={styles.text}>Type of jewellery</Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: 10,
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <CheckBox
                disabled={false}
                value={inputs.JTyped}
                onValueChange={newValue => {
                  setInputs(prev => ({...prev, JTyped: newValue}));
                }}
                tintColors={{true: '#032e63', false: '#032e63'}}
                onTintColor="#032e63"
                onCheckColor="#032e63"
                boxType="square"
                style={{height: 16, width: 18}}
              />
              <Text style={{marginLeft: 10, color: '#000'}}>Diamond</Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <CheckBox
                disabled={false}
                value={inputs.JTypeg}
                onValueChange={newValue => handleInputs('JTypeg', newValue)}
                tintColors={{true: '#032e63', false: '#032e63'}}
                onTintColor="#032e63"
                onCheckColor="#032e63"
                boxType="square"
                style={{height: 16, width: 18}}
              />
              <Text style={{marginLeft: 10, color: '#000'}}>Gold</Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <CheckBox
                disabled={false}
                value={inputs.JTypep}
                onValueChange={newValue => handleInputs('JTypep', newValue)}
                tintColors={{true: '#032e63', false: '#032e63'}}
                onTintColor="#032e63"
                onCheckColor="#032e63"
                boxType="square"
                style={{height: 16, width: 18}}
              />
              <Text style={{marginLeft: 10, color: '#000'}}>Platinum</Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <CheckBox
                disabled={false}
                value={inputs.JTypes}
                onValueChange={newValue => handleInputs('JTypes', newValue)}
                tintColors={{true: '#032e63', false: '#032e63'}}
                onTintColor="#032e63"
                onCheckColor="#032e63"
                boxType="square"
                style={{height: 16, width: 18}}
              />
              <Text style={{marginLeft: 10, color: '#000'}}>Silver</Text>
            </View>
          </View>
        </View>
        {inputs.JTyped == true ? (
          <View>
            <View style={{marginTop: 10}}>
              <Text style={styles.text}>
                Diamond purity<Text style={{color: 'red'}}>{' *'}</Text>
              </Text>
              <MultiSelect
                items={items1}
                uniqueKey="name"
                onSelectedItemsChange={val => {
                  handleInputs('diamond_purity', val);
                  if (val.includes('Custom Purity')) {
                    setCustomPurityDia(true);
                  } else {
                    setCustomPurityDia(false);
                  }
                }}
                selectedItems={inputs.diamond_purity}
                searchIcon={false}
                tagBorderColor={'#032e63'}
                tagRemoveIconColor={'#fff'}
                tagTextColor={'#fff'}
                selectText={
                  inputs.diamond_purity > 0 ? '' : 'Select Diamond Purity'
                }
                single={false}
                searchInputPlaceholderText="Select Diamond Purity"
                selectedItemTextColor={'#032e63'}
                selectedItemIconColor={'#032e63'}
                itemTextColor={'#032e63'}
                displayKey="name"
                submitButtonColor={'#032e63'}
                submitButtonText="Submit"
                textInputProps={{editable: false, autoFocus: false}}
                styleDropdownMenu={{
                  // width:'100%',
                  borderBottomWidth: 1.5,
                  borderColor: '#032e63',
                  height: 55,
                  alignSelf: 'center',
                  flexDirection: 'row',
                  backgroundColor: '#fff',
                  paddingHorizontal: 12,
                  marginTop: 5,
                  // borderWidth:1
                }}
                tagContainerStyle={{
                  backgroundColor: '#032e63',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: '48%',
                }}
              />
            </View>
            {customPurityDia == true ? (
              <View style={{marginTop: 10}}>
                <TextInput
                  placeholder="Please specify custom purity"
                  style={{
                    borderWidth: 1,
                    marginTop: 4,
                    height: 40,
                    borderRadius: 6,
                    borderColor: 'grey',
                    paddingLeft: 10,
                    color: '#000',
                  }}
                  placeholderTextColor={'grey'}
                  value={inputs.diamondcustom_purity}
                  onChangeText={val =>
                    handleInputs('diamondcustom_purity', val)
                  }
                />
              </View>
            ) : null}
            <View style={{marginTop: 10}}>
              <Text style={styles.text}>
                Choose Diamond Specialisation
                <Text style={{color: 'red'}}>{' *'}</Text>
              </Text>
              <MultiSelect
                items={getSpecilization(diamondSpecilization)}
                uniqueKey="id"
                onSelectedItemsChange={val =>
                  handleInputs('diamond_specialisation', val)
                }
                selectedItems={inputs.diamond_specialisation}
                searchIcon={false}
                tagBorderColor={'#032e63'}
                tagRemoveIconColor={'#fff'}
                tagTextColor={'#fff'}
                selectText={
                  inputs.diamond_specialisation.length > 0
                    ? ''
                    : 'Choose Diamond Specialisation'
                }
                single={false}
                searchInputPlaceholderText="Choose Diamond Specialisation"
                selectedItemTextColor={'#032e63'}
                selectedItemIconColor={'#032e63'}
                itemTextColor={'#032e63'}
                displayKey="name"
                submitButtonColor={'#032e63'}
                submitButtonText="Submit"
                textInputProps={{editable: false, autoFocus: false}}
                styleDropdownMenu={{
                  // width:'100%',
                  borderBottomWidth: 1.5,
                  borderColor: '#032e63',
                  height: 55,
                  alignSelf: 'center',
                  flexDirection: 'row',
                  backgroundColor: '#fff',
                  paddingHorizontal: 12,
                  marginTop: 5,
                  // borderWidth:1
                }}
                tagContainerStyle={{
                  backgroundColor: '#032e63',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: '48%',
                }}
              />
            </View>
          </View>
        ) : null}
        {inputs.JTypeg == true ? (
          <View>
            <View style={{marginTop: 10}}>
              <Text style={styles.text}>
                Gold purity<Text style={{color: 'red'}}>{' *'}</Text>
              </Text>
              <MultiSelect
                items={items}
                uniqueKey="name"
                onSelectedItemsChange={val => {
                  handleInputs('gold_purity', val);
                  if (val.includes('Custom Purity')) {
                    setCustomPurityGo(true);
                  } else {
                    setCustomPurityGo(false);
                  }
                }}
                selectedItems={inputs.gold_purity}
                searchIcon={false}
                tagBorderColor={'#032e63'}
                tagRemoveIconColor={'#fff'}
                tagTextColor={'#fff'}
                selectText={
                  inputs.gold_purity.length > 0 ? '' : 'Select Gold Purity'
                }
                single={false}
                searchInputPlaceholderText="Select Gold Purity"
                selectedItemTextColor={'#032e63'}
                selectedItemIconColor={'#032e63'}
                itemTextColor={'#032e63'}
                displayKey="name"
                submitButtonColor={'#032e63'}
                submitButtonText="Submit"
                textInputProps={{editable: false, autoFocus: false}}
                styleDropdownMenu={{
                  // width:'100%',
                  borderBottomWidth: 1.5,
                  borderColor: '#032e63',
                  height: 55,
                  alignSelf: 'center',
                  flexDirection: 'row',
                  backgroundColor: '#fff',
                  paddingHorizontal: 12,
                  marginTop: 5,
                  // borderWidth:1
                }}
                tagContainerStyle={{
                  backgroundColor: '#032e63',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: '48%',
                }}
              />
            </View>

            {customPurityGo == true ? (
              <View style={{marginTop: 10}}>
                <TextInput
                  placeholder="Please specify custom purity"
                  style={{
                    borderWidth: 1,
                    marginTop: 4,
                    height: 40,
                    borderRadius: 6,
                    borderColor: 'grey',
                    paddingLeft: 10,
                    color: '#000',
                  }}
                  placeholderTextColor={'grey'}
                  value={inputs.goldcustom_purity}
                  onChangeText={val => handleInputs('goldcustom_purity', val)}
                />
              </View>
            ) : null}
            <View style={{marginTop: 10}}>
              <Text style={styles.text}>
                Choose Gold Specialisation
                <Text style={{color: 'red'}}>{' *'}</Text>
              </Text>
              <MultiSelect
                items={getSpecilization(goldSpecilization)}
                uniqueKey="id"
                onSelectedItemsChange={val =>
                  handleInputs('gold_specialisation', val)
                }
                selectedItems={inputs.gold_specialisation}
                searchIcon={false}
                tagBorderColor={'#032e63'}
                tagRemoveIconColor={'#fff'}
                tagTextColor={'#fff'}
                selectText={
                  inputs.gold_specialisation.length > 0
                    ? ''
                    : 'Choose Gold Specialisation'
                }
                single={false}
                searchInputPlaceholderText="Choose Gold Specialisation"
                selectedItemTextColor={'#032e63'}
                selectedItemIconColor={'#032e63'}
                itemTextColor={'#032e63'}
                displayKey="name"
                submitButtonColor={'#032e63'}
                submitButtonText="Submit"
                textInputProps={{editable: false, autoFocus: false}}
                styleDropdownMenu={{
                  // width:'100%',
                  borderBottomWidth: 1.5,
                  borderColor: '#032e63',
                  height: 55,
                  alignSelf: 'center',
                  flexDirection: 'row',
                  backgroundColor: '#fff',
                  paddingHorizontal: 12,
                  marginTop: 5,
                  // borderWidth:1
                }}
                tagContainerStyle={{
                  backgroundColor: '#032e63',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: '48%',
                }}
              />
            </View>
          </View>
        ) : null}
        {inputs.JTypep == true ? (
          <View>
            <View style={{marginTop: 10}}>
              <Text style={styles.text}>
                Platinum purity<Text style={{color: 'red'}}>{' *'}</Text>
              </Text>
              <MultiSelect
                items={items2}
                uniqueKey="name"
                onSelectedItemsChange={val => {
                  handleInputs('platinum_purity', val);
                  if (val.includes('Custom Purity')) {
                    setCustomPurityPla(true);
                  } else {
                    setCustomPurityPla(false);
                  }
                }}
                selectedItems={inputs.platinum_purity}
                searchIcon={false}
                tagBorderColor={'#032e63'}
                tagRemoveIconColor={'#fff'}
                tagTextColor={'#fff'}
                selectText={
                  inputs.platinum_purity.length > 0
                    ? ''
                    : 'Select Platinum Purity'
                }
                single={false}
                searchInputPlaceholderText="Select Platinum Purity"
                selectedItemTextColor={'#032e63'}
                selectedItemIconColor={'#032e63'}
                itemTextColor={'#032e63'}
                displayKey="name"
                submitButtonColor={'#032e63'}
                submitButtonText="Submit"
                textInputProps={{editable: false, autoFocus: false}}
                styleDropdownMenu={{
                  // width:'100%',
                  borderBottomWidth: 1.5,
                  borderColor: '#032e63',
                  height: 55,
                  alignSelf: 'center',
                  flexDirection: 'row',
                  backgroundColor: '#fff',
                  paddingHorizontal: 12,
                  marginTop: 5,
                  // borderWidth:1
                }}
                tagContainerStyle={{
                  backgroundColor: '#032e63',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: '48%',
                }}
              />
            </View>
            {customPurityPla == true ? (
              <View style={{marginTop: 10}}>
                <TextInput
                  placeholder="Please specify custom purity"
                  style={{
                    borderWidth: 1,
                    marginTop: 4,
                    height: 40,
                    borderRadius: 6,
                    borderColor: 'grey',
                    paddingLeft: 10,
                    color: '#000',
                  }}
                  placeholderTextColor={'grey'}
                  value={inputs.platinumcustom_purity}
                  onChangeText={val =>
                    handleInputs('platinumcustom_purity', val)
                  }
                />
              </View>
            ) : null}
            <View style={{marginTop: 10}}>
              <Text style={styles.text}>
                Choose Platinum Specialisation
                <Text style={{color: 'red'}}>{' *'}</Text>
              </Text>
              <MultiSelect
                items={getSpecilization(platinumSpecilization)}
                uniqueKey="id"
                onSelectedItemsChange={val =>
                  handleInputs('platinum_specialisation', val)
                }
                selectedItems={inputs.platinum_specialisation}
                searchIcon={false}
                tagBorderColor={'#032e63'}
                tagRemoveIconColor={'#fff'}
                tagTextColor={'#fff'}
                selectText={
                  inputs.platinum_specialisation.length > 0
                    ? ''
                    : 'Choose Platinum Specialisation'
                }
                single={false}
                searchInputPlaceholderText="Choose Platinum Specialisation"
                selectedItemTextColor={'#032e63'}
                selectedItemIconColor={'#032e63'}
                itemTextColor={'#032e63'}
                displayKey="name"
                submitButtonColor={'#032e63'}
                submitButtonText="Submit"
                textInputProps={{editable: false, autoFocus: false}}
                styleDropdownMenu={{
                  borderBottomWidth: 1.5,
                  borderColor: '#032e63',
                  height: 55,
                  alignSelf: 'center',
                  flexDirection: 'row',
                  backgroundColor: '#fff',
                  paddingHorizontal: 12,
                  marginTop: 5,
                  // borderWidth:1
                }}
                tagContainerStyle={{
                  backgroundColor: '#032e63',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: '48%',
                }}
              />
            </View>
          </View>
        ) : null}
        {inputs.JTypes == true ? (
          <View>
            <View style={{marginTop: 10}}>
              <Text style={styles.text}>
                Silver purity<Text style={{color: 'red'}}>{' *'}</Text>
              </Text>
              <MultiSelect
                items={items3}
                uniqueKey="name"
                onSelectedItemsChange={val => {
                  handleInputs('silver_purity', val);
                  if (val.includes('Custom Purity')) {
                    setCustomPuritySil(true);
                  } else {
                    setCustomPuritySil(false);
                  }
                }}
                selectedItems={inputs.silver_purity}
                searchIcon={false}
                tagBorderColor={'#032e63'}
                tagRemoveIconColor={'#fff'}
                tagTextColor={'#fff'}
                selectText={
                  inputs.silver_purity.length > 0 ? '' : 'Select Silver Purity'
                }
                single={false}
                searchInputPlaceholderText="Select Gold Purity"
                selectedItemTextColor={'#032e63'}
                selectedItemIconColor={'#032e63'}
                itemTextColor={'#032e63'}
                displayKey="name"
                submitButtonColor={'#032e63'}
                submitButtonText="Submit"
                textInputProps={{editable: false, autoFocus: false}}
                styleDropdownMenu={{
                  // width:'100%',
                  borderBottomWidth: 1.5,
                  borderColor: '#032e63',
                  height: 55,
                  alignSelf: 'center',
                  flexDirection: 'row',
                  backgroundColor: '#fff',
                  paddingHorizontal: 12,
                  marginTop: 5,
                  // borderWidth:1
                }}
                tagContainerStyle={{
                  backgroundColor: '#032e63',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: '48%',
                }}
              />
            </View>
            {customPuritySil == true ? (
              <View style={{marginTop: 10}}>
                <TextInput
                  placeholder="Please specify custom purity"
                  style={{
                    borderWidth: 1,
                    marginTop: 4,
                    height: 40,
                    borderRadius: 6,
                    borderColor: 'grey',
                    paddingLeft: 10,
                    color: '#000',
                  }}
                  placeholderTextColor={'grey'}
                  value={inputs.silvercustom_purity}
                  onChangeText={val => handleInputs('silvercustom_purity', val)}
                />
              </View>
            ) : null}
            <View style={{marginTop: 10}}>
              <Text style={styles.text}>
                Choose Silver Specialisation
                <Text style={{color: 'red'}}>{' *'}</Text>
              </Text>
              <MultiSelect
                items={getSpecilization(silverSpecilization)}
                uniqueKey="id"
                onSelectedItemsChange={val =>
                  handleInputs('silver_specialisation', val)
                }
                selectedItems={inputs.silver_specialisation}
                searchIcon={false}
                tagBorderColor={'#032e63'}
                tagRemoveIconColor={'#fff'}
                tagTextColor={'#fff'}
                selectText={
                  inputs.silver_specialisation.length > 0
                    ? ''
                    : 'Choose Silver Specialisation'
                }
                single={false}
                searchInputPlaceholderText="Choose Silver Specialisation"
                selectedItemTextColor={'#032e63'}
                selectedItemIconColor={'#032e63'}
                itemTextColor={'#032e63'}
                displayKey="name"
                submitButtonColor={'#032e63'}
                submitButtonText="Submit"
                textInputProps={{editable: false, autoFocus: false}}
                styleDropdownMenu={{
                  // width:'100%',
                  borderBottomWidth: 1.5,
                  borderColor: '#032e63',
                  height: 55,
                  alignSelf: 'center',
                  flexDirection: 'row',
                  backgroundColor: '#fff',
                  paddingHorizontal: 12,
                  marginTop: 5,
                  // borderWidth:1
                }}
                tagContainerStyle={{
                  backgroundColor: '#032e63',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: '48%',
                }}
              />
            </View>
          </View>
        ) : null}
        {/* <View style={{marginTop: 10}}>
          <Text style={styles.text}>Diamond quality</Text>
          <TextInput
            placeholder="Specify Your Qualities"
            style={{
              borderWidth: 1,
              marginTop: 4,
              height: 40,
              borderRadius: 6,
              borderColor: 'grey',
              paddingLeft: 10,color:'#000'
            }}
            placeholderTextColor={'grey'}
            value={inputs.DiamondQuality}
            onChangeText={val => handleInputs('DiamondQuality', val)}
          />
        </View> */}
        {/* <View style={{marginTop: 10}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: 10,
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <CheckBox
                disabled={false}
                value={inputs.IsActive}
                onValueChange={newValue => handleInputs('IsActive', newValue)}
                tintColors={{true: '#032e63', false: '#032e63'}}
                onTintColor="#032e63"
                onCheckColor="#032e63"
                boxType="square"
                style={{height: 16, width: 18}}
              />
              <Text style={{marginLeft: 10,color:'#000'}}>Is Active</Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <CheckBox
                disabled={false}
                value={inputs.IsDefaultSupplier}
                onValueChange={newValue =>
                  handleInputs('IsDefaultSupplier', newValue)
                }
                tintColors={{true: '#032e63', false: '#032e63'}}
                onTintColor="#032e63"
                onCheckColor="#032e63"
                boxType="square"
                style={{height: 16, width: 18}}
              />
              <Text style={{marginLeft: 10 ,color:'#000'}}>
                Default Supplier for all retailers
              </Text>
            </View>
          </View>
        </View> */}

        <View style={{marginTop: 10}}>
          <Text style={styles.text}>Upload image of your product:</Text>

          <View
            style={{
              borderWidth: 1,
              marginTop: 4,
              height: 40,
              borderRadius: 6,
              borderColor: 'grey',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              onPress={() => handleImageUpload('ProductImage1')}
              style={{
                backgroundColor: 'grey',
                height: 40,
                width: '30%',
                borderTopLeftRadius: 6,
                borderBottomLeftRadius: 6,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={{color: '#fff'}}>Choose File</Text>
            </TouchableOpacity>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                width: '70%',
              }}>
              {inputs.ProductImage1?.name == '' ? (
                <Text>No File Choosen</Text>
              ) : (
                <Text style={{color: 'grey'}}>
                  {inputs.ProductImage1?.name}
                </Text>
              )}
            </View>
          </View>
          <TextInput
            placeholder={'Product Name'}
            placeholderTextColor={'grey'}
            style={{
              borderWidth: 1,
              marginTop: 4,
              height: 40,
              borderRadius: 6,
              borderColor: 'grey',
              paddingLeft: 10,
              color: '#000',
            }}
            value={inputs.ProductName1}
            onChangeText={val => handleInputs('ProductName1', val)}
          />
          {inputs.ProductImage1?.uri ? (
            <View
              style={{
                elevation: 5,
                shadowColor: 'black',
                shadowOffset: {height: 4, width: 4},
                shadowOpacity: 5,
                shadowRadius: 4,
              }}>
              <Image
                style={{
                  height: widthPercentageToDP(30),
                  width: widthPercentageToDP(30),
                  alignSelf: 'center',
                  marginTop: 10,
                }}
                source={{uri: inputs.ProductImage1?.uri}}
              />
            </View>
          ) : null}

          <View style={{marginTop: 10}}>
            <View
              style={{
                borderWidth: 1,
                marginTop: 4,
                height: 40,
                borderRadius: 6,
                borderColor: 'grey',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                onPress={() => handleImageUpload('ProductImage2')}
                style={{
                  backgroundColor: 'grey',
                  height: 40,
                  width: '30%',
                  borderTopLeftRadius: 6,
                  borderBottomLeftRadius: 6,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text style={{color: '#fff'}}>Choose File</Text>
              </TouchableOpacity>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '70%',
                }}>
                {inputs.ProductImage2?.name == '' ? (
                  <Text>No File Choosen</Text>
                ) : (
                  <Text style={{color: 'grey'}}>
                    {inputs.ProductImage2?.name}
                  </Text>
                )}
              </View>
            </View>
            <TextInput
              placeholder={'Product Name'}
              placeholderTextColor={'grey'}
              style={{
                borderWidth: 1,
                marginTop: 4,
                height: 40,
                borderRadius: 6,
                borderColor: 'grey',
                paddingLeft: 10,
                color: '#000',
              }}
              value={inputs.ProductName2}
              onChangeText={val => handleInputs('ProductName2', val)}
            />
            {inputs.ProductImage2?.uri ? (
              <View
                style={{
                  elevation: 5,
                  shadowColor: 'black',
                  shadowOffset: {height: 4, width: 4},
                  shadowOpacity: 5,
                  shadowRadius: 4,
                }}>
                <Image
                  style={{
                    height: widthPercentageToDP(30),
                    width: widthPercentageToDP(30),
                    alignSelf: 'center',
                    marginTop: 10,
                  }}
                  source={{uri: inputs.ProductImage2?.uri}}
                />
              </View>
            ) : null}
          </View>
          <View style={{marginTop: 10}}>
            <View
              style={{
                borderWidth: 1,
                marginTop: 4,
                height: 40,
                borderRadius: 6,
                borderColor: 'grey',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                onPress={() => handleImageUpload('ProductImage3')}
                style={{
                  backgroundColor: 'grey',
                  height: 40,
                  width: '30%',
                  borderTopLeftRadius: 6,
                  borderBottomLeftRadius: 6,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text style={{color: '#fff'}}>Choose File</Text>
              </TouchableOpacity>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '70%',
                }}>
                {inputs.ProductImage3?.name == '' ? (
                  <Text>No File Choosen</Text>
                ) : (
                  <Text style={{color: 'grey'}}>
                    {inputs.ProductImage3?.name}
                  </Text>
                )}
              </View>
            </View>
            <TextInput
              placeholder={'Product Name'}
              placeholderTextColor={'grey'}
              style={{
                borderWidth: 1,
                marginTop: 4,
                height: 40,
                borderRadius: 6,
                borderColor: 'grey',
                paddingLeft: 10,
                color: '#000',
              }}
              value={inputs.ProductName3}
              onChangeText={val => handleProductImages('ProductName3', val)}
            />
            {inputs.ProductImage3?.uri ? (
              <View
                style={{
                  elevation: 5,
                  shadowColor: 'black',
                  shadowOffset: {height: 4, width: 4},
                  shadowOpacity: 5,
                  shadowRadius: 4,
                }}>
                <Image
                  style={{
                    height: widthPercentageToDP(30),
                    width: widthPercentageToDP(30),
                    alignSelf: 'center',
                    marginTop: 10,
                  }}
                  source={{uri: inputs.ProductImage3?.uri}}
                />
              </View>
            ) : null}
          </View>

          {/* <FlatList
            data={details2?.product}
            renderItem={({item, index}) => (
              <View>
                <View style={styles.uploadView}>
                  <TouchableOpacity
                    onPress={() => handleProductImages(index, 'image')}
                    style={styles.grey}>
                    <Text style={{color: '#fff'}}>Choose File</Text>
                  </TouchableOpacity>
                  <View
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '70%',
                    }}>
                    {item.image2`${index + 1}`?.name == '' ||
                    undefined ? (
                      <Text style={{color:'#000'}}>No File Choosen</Text>
                    ) : (
                      <Text style={{color:'#000'}}>
                        {item[`image2${index + 1}`]?.name}
                      </Text>
                    )}
                  </View>
                </View>
                <TextInput
                  placeholder={'Product Name'}
                  placeholderTextColor={item?.OwnerName ? 'black' : 'grey'}
                  style={{
                    borderWidth: 1,
                    marginTop: 4,
                    height: 40,
                    borderRadius: 6,
                    borderColor: 'grey',
                    paddingLeft: 10,color:'#000'
                  }}
                  value={item?.(`product_name${index + 1}`)}
                  onChangeText={val => handleProductImages(index, val)}
                />
                {item.image2
                `${index + 1}`?.uri ? (
                  <View
                    style={{
                      elevation: 5,
                      shadowColor: 'black',
                      shadowOffset: {height: 4, width: 4},
                      shadowOpacity: 5,
                      shadowRadius: 4,
                    }}>
                    <Image
                      style={{
                        height: widthPercentageToDP(30),
                        width: widthPercentageToDP(30),
                        alignSelf: 'center',
                        marginTop: 10,
                      }}
                      source={{uri: `https://olocker.co/uploads/partner/${item[`image2${index + 1}`]}`
                      }}
                    
                    />
                  </View>
                ) : null}
              </View>
            )}
          /> */}
        </View>

        <View style={{marginTop: 10}}>
          <Text style={styles.text}>About you</Text>
          <View
            style={{
              borderWidth: 1,
              marginTop: 4,
              borderRadius: 6,
              borderColor: 'grey',
              height: 70,
            }}>
            <TextInput
              placeholder="About "
              placeholderTextColor={'grey'}
              style={{
                paddingLeft: 10,
                color: '#000',
                fontSize: 12,
                includeFontPadding: false,
                padding: 0,
                margin: 0,
              }}
              value={inputs.PartnerIntroduction}
              onChangeText={val => handleInputs('PartnerIntroduction', val)}
              multiline
            />
          </View>
        </View>

        <View style={{marginTop: 10}}>
          <Text style={styles.text}>Number of employees</Text>
          <View style={{alignItems: 'flex-start'}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <RadioButton
                value="first"
                status={inputs.NoofEmployee == 1 ? 'checked' : 'unchecked'}
                onPress={() => handleInputs('NoofEmployee', 1)}
                uncheckedColor="#032e63"
                color="#032e63"
              />
              <Text style={{color: '#000'}}>Upto 10 employees</Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <RadioButton
                value="first"
                status={inputs.NoofEmployee == 2 ? 'checked' : 'unchecked'}
                onPress={() => handleInputs('NoofEmployee', 2)}
                uncheckedColor="#032e63"
                color="#032e63"
              />
              <Text style={{color: '#000'}}>11-25 employees</Text>
            </View>

            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <RadioButton
                value="first"
                status={inputs.NoofEmployee == 3 ? 'checked' : 'unchecked'}
                onPress={() => handleInputs('NoofEmployee', 3)}
                uncheckedColor="#032e63"
                color="#032e63"
              />
              <Text style={{color: '#000'}}>26-35 employees</Text>
            </View>

            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <RadioButton
                value="first"
                status={inputs.NoofEmployee == 4 ? 'checked' : 'unchecked'}
                onPress={() => handleInputs('NoofEmployee', 4)}
                uncheckedColor="#032e63"
                color="#032e63"
              />
              <Text style={{color: '#000'}}>36-50 employees</Text>
            </View>

            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <RadioButton
                value="first"
                status={inputs.NoofEmployee == 5 ? 'checked' : 'unchecked'}
                onPress={() => handleInputs('NoofEmployee', 5)}
                uncheckedColor="#032e63"
                color="#032e63"
              />
              <Text style={{color: '#000'}}>Above 50 employees</Text>
            </View>
          </View>
        </View>

        <View style={{marginTop: 10}}>
          <Text style={styles.text}>Upload Showroom Images (upto 3):</Text>
          <View>
            <View
              style={{
                borderWidth: 1,
                marginTop: 10,
                height: 40,
                borderRadius: 6,
                borderColor: 'grey',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                onPress={() => handleImageUpload('showroomimage1')}
                style={{
                  backgroundColor: 'grey',
                  height: 40,
                  width: '30%',
                  borderTopLeftRadius: 6,
                  borderBottomLeftRadius: 6,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text style={{color: '#fff'}}>Choose File</Text>
              </TouchableOpacity>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '70%',
                }}>
                {inputs.showroomimage1?.name == '' ? (
                  <Text>No File Choosen</Text>
                ) : (
                  <Text style={{color: 'grey'}}>
                    {inputs.showroomimage1?.name}
                  </Text>
                )}
              </View>
            </View>
            {inputs.showroomimage1?.uri ? (
              <View
                style={{
                  elevation: 5,
                  shadowColor: 'black',
                  shadowOffset: {height: 4, width: 4},
                  shadowOpacity: 5,
                  shadowRadius: 4,
                }}>
                <Image
                  style={{
                    height: widthPercentageToDP(30),
                    width: widthPercentageToDP(30),
                    alignSelf: 'center',
                    marginTop: 10,
                  }}
                  source={{uri: inputs.showroomimage1?.uri}}
                />
              </View>
            ) : null}

            <View
              style={{
                borderWidth: 1,
                marginTop: 4,
                height: 40,
                borderRadius: 6,
                borderColor: 'grey',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                onPress={() => handleImageUpload('showroomimage2')}
                style={{
                  backgroundColor: 'grey',
                  height: 40,
                  width: '30%',
                  borderTopLeftRadius: 6,
                  borderBottomLeftRadius: 6,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text style={{color: '#fff'}}>Choose File</Text>
              </TouchableOpacity>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '70%',
                }}>
                {inputs.showroomimage2?.name == '' ? (
                  <Text>No File Choosen</Text>
                ) : (
                  <Text style={{color: 'grey'}}>
                    {inputs.showroomimage2?.name}
                  </Text>
                )}
              </View>
            </View>
            {inputs.showroomimage2?.uri ? (
              <View
                style={{
                  elevation: 5,
                  shadowColor: 'black',
                  shadowOffset: {height: 4, width: 4},
                  shadowOpacity: 5,
                  shadowRadius: 4,
                }}>
                <Image
                  style={{
                    height: widthPercentageToDP(30),
                    width: widthPercentageToDP(30),
                    alignSelf: 'center',
                    marginTop: 10,
                  }}
                  source={{uri: inputs.showroomimage2?.uri}}
                />
              </View>
            ) : null}

            <View
              style={{
                borderWidth: 1,
                marginTop: 4,
                height: 40,
                borderRadius: 6,
                borderColor: 'grey',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                onPress={() => handleImageUpload('showroomimage3')}
                style={{
                  backgroundColor: 'grey',
                  height: 40,
                  width: '30%',
                  borderTopLeftRadius: 6,
                  borderBottomLeftRadius: 6,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text style={{color: '#fff'}}>Choose File</Text>
              </TouchableOpacity>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '70%',
                }}>
                {inputs.showroomimage3?.name == '' ? (
                  <Text>No File Choosen</Text>
                ) : (
                  <Text style={{color: 'grey'}}>
                    {inputs.showroomimage3?.name}
                  </Text>
                )}
              </View>
            </View>
            {inputs.showroomimage3?.uri ? (
              <View
                style={{
                  elevation: 5,
                  shadowColor: 'black',
                  shadowOffset: {height: 4, width: 4},
                  shadowOpacity: 5,
                  shadowRadius: 4,
                }}>
                <Image
                  style={{
                    height: widthPercentageToDP(30),
                    width: widthPercentageToDP(30),
                    alignSelf: 'center',
                    marginTop: 10,
                  }}
                  source={{uri: inputs.showroomimage3?.uri}}
                />
              </View>
            ) : null}

            {/* <View style={styles.sView}>
              <TouchableOpacity
                onPress={() => handleImageUpload('showroom_image')}
                style={styles.sTouch}>
                <Text style={{color: '#fff'}}>Choose File</Text>
              </TouchableOpacity>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '70%',
                }}>
                {inputs.showroom_image.length <= 0 ? (
                  <Text style={{color:'#000'}}>No File Choosen</Text>
                ) : (
                  <Text style={{color:'#000'}}>
                    {
                      inputs.showroom_image[inputs.showroom_image.length - 1]
                        ?.name
                    }
                  </Text>
                )}
              </View>
            </View>
            <FlatList
              data={inputs.showroom_image}
              horizontal
              style={{marginTop: 10}}
              renderItem={({item}) => {
                console.log('thjos os called', item);
                return (
                  <View
                    style={{
                      height: widthPercentageToDP(30),
                      width: widthPercentageToDP(30),
                      elevation: 5,
                      shadowColor: 'black',
                      shadowOffset: {height: 4, width: 4},
                      shadowOpacity: 5,
                      shadowRadius: 4,
                      marginHorizontal: widthPercentageToDP(2),
                    }}>
                    <Image
                      style={{height: '100%', width: '100%'}}
                      source={{uri: item.uri}}
                    />
                  </View>
                );
              }}
            /> */}
          </View>
        </View>

        <View style={{marginTop: 10}}>
          <Text style={styles.text}>Upload Owner images:</Text>
          <TextInput
            placeholder="Owner Name"
            style={{
              borderWidth: 1,
              marginTop: 5,
              height: 40,
              borderRadius: 6,
              borderColor: 'grey',
              paddingLeft: 10,
              color: '#000',
            }}
            placeholderTextColor={'grey'}
            value={inputs.OwnerName1}
            onChangeText={val => handleInputs('OwnerName1', val)}
          />
          <View style={styles.multiline}>
            <TextInput
              placeholderTextColor={'grey'}
              placeholder="Write about owner description"
              style={[styles.input, {color: '#000'}]}
              multiline
              value={inputs.OwnerDescription1}
              onChangeText={val => handleInputs('OwnerDescription1', val)}
            />
          </View>

          <View
            style={{
              borderWidth: 1,
              marginTop: 4,
              height: 40,
              borderRadius: 6,
              borderColor: 'grey',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              onPress={() => handleImageUpload('Ownerimg1')}
              style={{
                backgroundColor: 'grey',
                height: 40,
                width: '30%',
                borderTopLeftRadius: 6,
                borderBottomLeftRadius: 6,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={{color: '#fff'}}>Choose File</Text>
            </TouchableOpacity>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                width: '70%',
              }}>
              {inputs.Ownerimg1?.name == '' ? (
                <Text>No File Choosen</Text>
              ) : (
                <Text style={{color: 'grey'}}>{inputs.Ownerimg1?.name}</Text>
              )}
            </View>
          </View>
          {inputs.Ownerimg1?.uri ? (
            <View
              style={{
                elevation: 5,
                shadowColor: 'black',
                shadowOffset: {height: 4, width: 4},
                shadowOpacity: 5,
                shadowRadius: 4,
              }}>
              <Image
                style={{
                  height: widthPercentageToDP(30),
                  width: widthPercentageToDP(30),
                  alignSelf: 'center',
                  marginTop: 10,
                }}
                source={{uri: inputs.Ownerimg1?.uri}}
              />
            </View>
          ) : null}

          <TextInput
            placeholder="Owner Name"
            style={{
              borderWidth: 1,
              marginTop: 5,
              height: 40,
              borderRadius: 6,
              borderColor: 'grey',
              paddingLeft: 10,
              color: '#000',
            }}
            placeholderTextColor={'grey'}
            value={inputs.OwnerName2}
            onChangeText={val => handleInputs('OwnerName2', val)}
          />
          <View style={styles.multiline}>
            <TextInput
              placeholderTextColor={'grey'}
              placeholder="Write about owner description"
              style={[styles.input, {color: '#000'}]}
              multiline
              value={inputs.OwnerDescription2}
              onChangeText={val => handleInputs('OwnerDescription2', val)}
            />
          </View>

          <View
            style={{
              borderWidth: 1,
              marginTop: 4,
              height: 40,
              borderRadius: 6,
              borderColor: 'grey',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              onPress={() => handleImageUpload('Ownerimg2')}
              style={{
                backgroundColor: 'grey',
                height: 40,
                width: '30%',
                borderTopLeftRadius: 6,
                borderBottomLeftRadius: 6,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={{color: '#fff'}}>Choose File</Text>
            </TouchableOpacity>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                width: '70%',
              }}>
              {inputs.Ownerimg2?.name == '' ? (
                <Text>No File Choosen</Text>
              ) : (
                <Text style={{color: 'grey'}}>{inputs.Ownerimg2?.name}</Text>
              )}
            </View>
          </View>
          {inputs.Ownerimg2?.uri ? (
            <View
              style={{
                elevation: 5,
                shadowColor: 'black',
                shadowOffset: {height: 4, width: 4},
                shadowOpacity: 5,
                shadowRadius: 4,
              }}>
              <Image
                style={{
                  height: widthPercentageToDP(30),
                  width: widthPercentageToDP(30),
                  alignSelf: 'center',
                  marginTop: 10,
                }}
                source={{uri: inputs.Ownerimg2?.uri}}
              />
            </View>
          ) : null}

          <TextInput
            placeholder="Owner Name"
            style={{
              borderWidth: 1,
              marginTop: 5,
              height: 40,
              borderRadius: 6,
              borderColor: 'grey',
              paddingLeft: 10,
              color: '#000',
            }}
            placeholderTextColor={'grey'}
            value={inputs.OwnerName3}
            onChangeText={val => handleInputs('OwnerName3', val)}
          />
          <View style={styles.multiline}>
            <TextInput
              placeholderTextColor={'grey'}
              placeholder="Write about owner description"
              style={[styles.input, {color: '#000'}]}
              multiline
              value={inputs.OwnerDescription3}
              onChangeText={val => handleInputs('OwnerDescription3', val)}
            />
          </View>

          <View
            style={{
              borderWidth: 1,
              marginTop: 4,
              height: 40,
              borderRadius: 6,
              borderColor: 'grey',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              onPress={() => handleImageUpload('Ownerimg3')}
              style={{
                backgroundColor: 'grey',
                height: 40,
                width: '30%',
                borderTopLeftRadius: 6,
                borderBottomLeftRadius: 6,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={{color: '#fff'}}>Choose File</Text>
            </TouchableOpacity>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                width: '70%',
              }}>
              {inputs.Ownerimg3?.name == '' ? (
                <Text>No File Choosen</Text>
              ) : (
                <Text style={{color: 'grey'}}>{inputs.Ownerimg3?.name}</Text>
              )}
            </View>
          </View>
          {inputs.Ownerimg3?.uri ? (
            <View
              style={{
                elevation: 5,
                shadowColor: 'black',
                shadowOffset: {height: 4, width: 4},
                shadowOpacity: 5,
                shadowRadius: 4,
              }}>
              <Image
                style={{
                  height: widthPercentageToDP(30),
                  width: widthPercentageToDP(30),
                  alignSelf: 'center',
                  marginTop: 10,
                }}
                source={{uri: inputs.Ownerimg3?.uri}}
              />
            </View>
          ) : null}

          {/* <FlatList
            data={ownerImages}
            renderItem={({item, index}) => (
              <View>
                <View>
                  <View style={styles.uploadView}>
                    <TouchableOpacity
                      onPress={() => handleOwnerImages(index, 'image', '')}
                      style={styles.grey}>
                      <Text style={{color: '#fff'}}>Choose File</Text>
                    </TouchableOpacity>
                    <View
                      style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '70%',
                      }}>
                      {item[`hiddenowner_image${index + 1}`]?.name == '' ? (
                        <Text style={{color:'#000'}}>No File Choosen</Text>
                      ) : (
                        <Text style={{color:'#000'}}>
                          {item[`hiddenowner_image${index + 1}`]?.name}
                        </Text>
                      )}
                    </View>
                  </View>
                  {item[`hiddenowner_image${index + 1}`]?.uri ? (
                    <View
                      style={{
                        elevation: 5,
                        shadowColor: 'black',
                        shadowOffset: {height: 4, width: 4},
                        shadowOpacity: 5,
                        shadowRadius: 4,
                      }}>
                      <Image
                        style={{
                          height: widthPercentageToDP(30),
                          width: widthPercentageToDP(30),
                          alignSelf: 'center',
                          marginTop: 10,
                        }}
                        source={{
                          uri: item[`hiddenowner_image${index + 1}`]?.uri,
                        }}
                      />
                    </View>
                  ) : null}
                </View>
                <TextInput
                  placeholder="Owner Name"
                  style={{
                    borderWidth: 1,
                    marginTop: 4,
                    height: 40,
                    borderRadius: 6,
                    borderColor: 'grey',
                    paddingLeft: 10,color:'#000'
                  }}
                  placeholderTextColor={'grey'}
                  value={item[`owner_name${index + 1}`]}
                  onChangeText={val => handleOwnerImages(index, val, 'name')}
                />
                <View style={styles.multiline}>
                  <TextInput
                  placeholderTextColor={'grey'}
                    placeholder="Write about owner description"
                    style={[styles.input,{color:'#000'}]}
                    multiline
                    value={item[`owner_description${index + 1}`]}
                    onChangeText={val => handleOwnerImages(index, val, '')}
                  />
                </View>
              </View>
            )}
          /> */}
        </View>
        <View style={{marginTop: 10}}>
          <Text style={styles.text}>Logo Upload</Text>
          <View
            style={{
              borderWidth: 1,
              marginTop: 4,
              height: 40,
              borderRadius: 6,
              borderColor: 'grey',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              onPress={() => handleImageUpload('ProductLogo')}
              style={{
                backgroundColor: 'grey',
                height: 40,
                width: '30%',
                borderTopLeftRadius: 6,
                borderBottomLeftRadius: 6,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={{color: '#fff'}}>Choose File</Text>
            </TouchableOpacity>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                width: '70%',
              }}>
              {inputs.ProductLogo?.name == '' ? (
                <Text>No File Choosen</Text>
              ) : (
                <Text style={{color: 'grey'}}>{inputs.ProductLogo?.name}</Text>
              )}
            </View>
          </View>
          {inputs.ProductLogo?.uri ? (
            <View
              style={{
                elevation: 5,
                shadowColor: 'black',
                shadowOffset: {height: 4, width: 4},
                shadowOpacity: 5,
                shadowRadius: 4,
              }}>
              <Image
                style={{
                  height: widthPercentageToDP(30),
                  width: widthPercentageToDP(30),
                  alignSelf: 'center',
                  marginTop: 10,
                }}
                source={{uri: inputs.ProductLogo?.uri}}
              />
            </View>
          ) : null}
        </View>

        <View>
          <TouchableOpacity
            onPress={() => validateUser()}
            style={{
              height: 40,
              width: '100%',
              backgroundColor: '#032e63',
              marginTop: 20,
              borderRadius: 8,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{color: '#fff', fontSize: 15}}>Submit</Text>
          </TouchableOpacity>
        </View>
        <View style={{height: 40}} />
      </ScrollView>
    );
  };
  if (details) {
    return (
      <View style={{flex: 1, backgroundColor: '#f0eeef'}}>
        <Header
          source={require('../../../assets/L.png')}
          title={'Edit Profile '}
          onPress={() => navigation.goBack()}
        />
        {fetching  ? <Loading /> : null}
        {renderScreen()}
      </View>
    );
  } else {
    return (
      <View style={{flex: 1, backgroundColor: '#f0eeef'}}>
        <Header
          source={require('../../../assets/L.png')}
          title={'Edit Profile '}
          onPress={() => navigation.goBack()}
        />
        <Loading />
      </View>
    );
  }
};
export default EditSupplierProfile;

const items = [
  {
    id: '1',
    name: 'Custom Purity',
  },
  {
    id: '2',
    name: '585 (14k)',
  },
  {
    id: '3',
    name: '750 (18k)',
  },
  {
    id: '4',
    name: '916 (22k)',
  },
];
const items1 = [
  {id: '1', name: 'Custom purity'},
  {id: '2', name: 'I-FG'},
  {id: '3', name: 'IF'},
  {id: '4', name: 'SI-FG'},
  {id: '5', name: 'SI-GH'},
  {id: '6', name: 'SI-I-FG'},
  {id: '7', name: 'SI-I-GH'},
  {id: '8', name: 'VS-EF'},
  {id: '9', name: 'VS-FG'},
  {id: '10', name: 'VS-GH'},
  {id: '11', name: 'VS-SI-EF'},
  {id: '12', name: 'VS-SI-FG'},
  {id: '13', name: 'VS-SI-GH'},
  {id: '14', name: 'VVS-EF'},
  {id: '15', name: 'VVS-FG'},
  {id: '16', name: 'VVS-VS-EF'},
  {id: '17', name: 'VVS-VS-FG'},
  {id: '18', name: 'VVS-VS-GH'},
];
const items2 = [
  {id: '1', name: 'Custom purity'},
  {id: '2', name: '950'},
];
const items3 = [
  {id: '1', name: 'Custom purity'},
  {id: '2', name: '92'},
];

// import React, {useEffect, useState} from 'react';
// import {
//   View,
//   Text,
//   Image,
//   ScrollView,
//   TouchableOpacity,
//   TextInput,
//   Platform,
// } from 'react-native';
// import {useNavigation} from '@react-navigation/native';
// import StatusBar from '../../../components/StatusBar';
// import styles from './styles';
// import Buttom from '../../../components/StoreButtomTab';
// import Header from '../../../components/CustomHeader';
// const Editprofile = () => {
//   const navigation = useNavigation();
//   const [selectedItems, setSelectedItems] = useState('');
//   return (
//     <View style={styles.container1}>
//        <Header
//         source={require('../../../assets/L.png')}
//         source2={require('../../../assets/Image/dil.png')}
//         source1={require('../../../assets/Fo.png')}
//         title={'Edit Profile '}
//         onPress={() => navigation.goBack()}
//         onPress2={() => navigation.navigate('FavDetails')}
//         onPress1={() => navigation.navigate('MessageBox')}
//       />
//       <ScrollView style={{flex: 1, paddingHorizontal: 10, paddingVertical: 20}}>
//         <View style={styles.main}>
//           <View
//             style={{
//               height: 114,
//               width: 114,
//               backgroundColor: '#918f99',
//               borderRadius: 57,
//               alignItems: 'center',
//               justifyContent: 'center',
//             }}>
//             <Text style={{fontSize: 16, color: '#fff'}}>Add Photo</Text>
//           </View>
//           </View>
//           <View>
//           <Text style={styles.title}>Company Name <Text style={{color:'red'}}>*</Text></Text>
//           <View style={styles.main1}>
//             <TextInput
//               style={{width: '90%', marginLeft: 10}}
//               placeholder="Company Name"
//               placeholderTextColor="black"
//             />
//           </View>

//           <Text style={styles.title}>Display Name <Text style={{color:'red'}}>*</Text></Text>
//           <View style={styles.main1}>
//             <TextInput
//               style={{width: '90%', marginLeft: 10}}
//               placeholder="Display Name"
//               placeholderTextColor="black"
//             />
//           </View>
//           <Text style={styles.title}>OwnerName <Text style={{color:'red'}}>*</Text></Text>
//           <View style={styles.main1}>
//             <TextInput
//               style={{width: '90%', marginLeft: 10}}
//               placeholder="OwnerName"
//               placeholderTextColor="black"
//             />
//           </View>
//           <Text style={styles.title}>HO Address <Text style={{color:'red'}}>*</Text></Text>
//           <View style={styles.main1}>
//             <TextInput
//               style={{width: '90%', marginLeft: 10}}
//               placeholder="HO Address"
//               placeholderTextColor="black"
//             />
//           </View>
//           </View>
//         <View style={{marginTop: 20, marginHorizontal: 110, marginBottom: 60}}>
//           <TouchableOpacity
//             // onPress={() => navigation.navigate('Loyalty')}
//             style={styles.button}>
//             <Text style={styles.bttext}>{'Save'}</Text>
//           </TouchableOpacity>

//         </View>
//       </ScrollView>
//       <StatusBar />

//     </View>
//   );
// };
// export default Editprofile;

// const Data = [
//   {label: 'Football', value: 'football'},
//   {label: 'Baseball', value: 'baseball'},
//   {label: 'Hockey', value: 'hockey'},
// ];
