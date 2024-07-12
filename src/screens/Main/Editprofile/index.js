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
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {FlatList} from 'react-native';
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

  function convertArrayToItems(array) {
    const items = true ? [{id: 'Custom purity', name: 'Custom purity'}] : [];

    array.forEach((item, index) => {
      items.push({id: item.value, name: item.name});
    });

    return items;
  }

  const [inputs1, setInputs1] = useState({
    State: '',
    District: '',
  });
  const handleInputs1 = (key, value) => {
    setInputs1(prev => ({...prev, [key]: value}));
  };
  const getSelected = array => {
    return array.map(item => item.value);
  };

  const getSelected2 = array => {
    return array.map(item => {
      if (isNaN(item.value)) {
        return item.value;
      } else {
        return parseInt(item.value);
      }
    });
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
    JTypep: selector?.typeOfjewellery?.isPlatinumChecked == 'Platinum',
    JTyped: selector?.typeOfjewellery?.isDaimondChecked == 'Diamond',
    JTypeg: selector?.typeOfjewellery?.isGoldChecked == 'Gold',
    JTypes: selector?.typeOfjewellery?.isSilverChecked == 'Silver',
    diamond_purity:
      // selector?.typeOfjewellery?.isDiamondCp != 'Custom purity'
      //   ?
      getSelected2(selector?.typeOfjewellery?.isDiamond),
    // : [
    //     'Custom purity',
    //     ...getSelected(selector?.typeOfjewellery?.isDiamond),
    //   ],
    diamond_specialisation: getSelected(
      selector?.typeOfjewellery?.isDiamondSpecialization,
    ),
    gold_purity:
      // selector?.typeOfjewellery?.isGoldCp != 'Custom purity'  ?
      getSelected2(selector?.typeOfjewellery?.isGold),
    // : ['Custom purity', ...getSelected2(selector?.typeOfjewellery?.isGold)],
    gold_specialisation: getSelected(
      selector?.typeOfjewellery?.isGoldSpecialization,
    ),
    silver_purity:
      // selector?.typeOfjewellery?.isSilverCp != 'Custom purity'
      //   ?
      getSelected2(selector?.typeOfjewellery?.isSilver),
    // : [
    //     'Custom purity',
    //     ...getSelected2(selector?.typeOfjewellery?.isSilver),
    //   ],
    silver_specialisation: getSelected(
      selector?.typeOfjewellery?.isSilverSpecialization,
    ),
    platinum_specialisation: getSelected(
      selector?.typeOfjewellery?.isPlatinumSpecialization,
    ),
    platinum_purity:
      // selector?.typeOfjewellery?.isPlatinumCp != 'Custom purity'
      //   ?
      getSelected2(selector?.typeOfjewellery?.isPlatinum),
    // : [
    //     'Custom purity',
    //     ...getSelected2(selector?.typeOfjewellery?.isPlatinum),
    //   ],
    goldcustom_purity: selector?.typeOfjewellery?.isGoldCpVal,
    diamondcustom_purity: selector?.typeOfjewellery?.isDiamondCpVal,
    platinumcustom_purity: selector?.typeOfjewellery?.isPlatinumCpVal,
    silvercustom_purity: selector?.typeOfjewellery?.isSilverCpVal,

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
  const validateUser = async () => {
    let valid = true;
    const Token = await AsyncStorage.getItem('loginToken');
    const srno = await AsyncStorage.getItem('Partnersrno');
    if (!inputs || !inputs.CompanyName || inputs.CompanyName.trim() == '') {
      Toast.show('Please enter CompanyName');
      valid = false;
      return;
    } else if (inputs.DisplayName == '') {
      Toast.show('Please enter DisplayName');
      valid = false;
      return;
    } else if (inputs.txtOwnerName == '') {
      Toast.show('Please enter OnwerName');
      valid = false;
      return;
    } else if (inputs.txtAddress == '') {
      Toast.show('Please enter Ho Address');
      valid = false;
      return;
    } else if (pincode == '') {
      Toast.show('Please enter PinCode');
      valid = false;
      return;
    } else if (inputs.StateId == '') {
      Toast.show('Please enter State');
      valid = false;
      return;
    } else if (inputs.CityId == '') {
      Toast.show('Please enter City');
      valid = false;
      return;
    } else if (inputs.EmailId == '') {
      Toast.show('Please enter EmailId');
      valid = false;
      return;
    } else if (inputs.Mobile == '') {
      Toast.show('Please enter Moblie Number');
      valid = false;
      return;
    } else if (inputs.BillingContactEmail == '') {
      Toast.show('Please enter BillingContactEmail');
      valid = false;
      return;
    }
    if (inputs.JTyped) {
      if (inputs.diamond_purity.length <= 0) {
        Toast.show('Please enter diamond purity');
        valid = false;
        return;
      }
      if (inputs.diamond_specialisation.length <= 0) {
        Toast.show('Please enter diamond specialisation');
        valid = false;
        return;
      }
      if (
        inputs.diamond_purity.includes('Custom purity') &&
        inputs.diamondcustom_purity === ''
      ) {
        Toast.show('Please enter diamond Custom purity');
        valid = false;
        return;
      }
    }
    if (inputs.JTypeg) {
      if (inputs.gold_purity.length <= 0) {
        Toast.show('Please enter gold purity');
        valid = false;
        return;
      }
      if (inputs.gold_specialisation.length <= 0) {
        Toast.show('Please enter gold specialisation');
        valid = false;
        return;
      }
      if (
        inputs.gold_purity.includes('Custom purity') &&
        inputs.goldcustom_purity === ''
      ) {
        Toast.show('Please enter gold Custom purity');
        valid = false;
        return;
      }
    }
    if (inputs.JTypep) {
      if (inputs.platinum_purity.length <= 0) {
        Toast.show('Please enter platinum purity');
        valid = false;
        return;
      }
      if (inputs.platinum_specialisation.length <= 0) {
        Toast.show('Please  enter platinum specialisation');
        valid = false;
        return;
      }
      if (
        inputs.platinum_purity.includes('Custom purity') &&
        inputs.platinumcustom_purity === ''
      ) {
        Toast.show('Please enter platinum Custom purity');
        valid = false;
        return;
      }
    }
    if (inputs.JTypes) {
      if (inputs.silver_purity.length <= 0) {
        Toast.show('Please enter silver purity');
        valid = false;
        return;
      }
      if (inputs.silver_specialisation.length <= 0) {
        Toast.show('Please enter silver specialisation');
        valid = false;
        return;
      }
      if (
        inputs.silver_purity.includes('Custom purity') &&
        inputs.silvercustom_purity === ''
      ) {
        Toast.show('Please enter silver Custom purity');
        valid = false;
        return;
      }
    }

    if (valid) {
      setFetching(true);
      try {
        const axios = require('axios');
        let data = new FormData();
        data.append('SrNo', srno);
        if (
          inputs.ProductLogo.name == '' ||
          inputs.ProductLogo.name == undefined
        ) {
          data.append('productlogo', '');
        } else {
          data.append('productlogo', {
            uri: inputs.ProductLogo.uri,
            name: inputs.ProductLogo.name,
            type: inputs.ProductLogo.type,
          });
        }
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
        data.append('JTyped', inputs.JTyped ? 'Diamond' : '');
        data.append('JTypeg', inputs.JTypeg ? 'Gold' : '');
        data.append('JTypep', inputs.JTypep ? 'Platinum' : '');
        data.append('JTypes', inputs.JTypes ? 'Silver' : '');

        inputs['diamond_purity'].map((item, index) => {
          data.append(`diamond_purity[${index}]`, item.toString());
        });

        data.append('diamondcustom_purity', inputs.diamondcustom_purity);
        inputs['diamond_specialisation'].map((item, index) => {
          data.append(`diamond_specialisation[${index}]`, item.toString());
        });

        inputs['gold_purity'].map((item, index) => {
          data.append(`gold_purity[${index}]`, item.toString());
        });

        data.append('goldcustom_purity', inputs.goldcustom_purity);
        inputs['gold_specialisation'].map((item, index) => {
          data.append(`gold_specialisation[${index}]`, item.toString());
        });

        data.append('platinum_purity', inputs.platinum_purity);
        inputs['platinum_purity'].map((item, index) => {
          data.append(`platinum_purity[${index}]`, item.toString());
        });

        data.append('platinumcustom_purity', inputs.platinumcustom_purity);

        inputs['platinum_specialisation'].map((item, index) => {
          data.append(`platinum_specialisation[${index}]`, item.toString());
        });
        inputs['silver_purity'].map((item, index) => {
          data.append(`silver_purity[${index}]`, item.toString());
        });
        data.append('silvercustom_purity', inputs.silvercustom_purity);
        inputs['silver_specialisation'].map((item, index) => {
          data.append(`silver_specialisation[${index}]`, item.toString());
        });
        data.append('ProductName1', inputs.ProductName1 ?? '');
        data.append('ProductName2', inputs.ProductName2 ?? '');
        data.append('ProductName3', inputs.ProductName3 ?? '');
        data.append('PartnerIntroduction', inputs.PartnerIntroduction ?? '');
        data.append('NoofEmployee', inputs.NoofEmployee ?? '');
        data.append('OwnerName1', inputs.OwnerName1 ?? '');
        data.append('OwnerDescription1', inputs.OwnerDescription1 ?? '');
        data.append('OwnerName2', inputs.OwnerName2 ?? '');
        data.append('OwnerDescription2', inputs.OwnerDescription2 ?? '');
        data.append('OwnerName3', inputs.OwnerName3 ?? '');
        data.append('OwnerDescription3', inputs.OwnerDescription3 ?? '');
        //  data.append('productlogo', '');
        data.append('Create_InvoiceDone', inputs.Create_InvoiceDone);
        data.append(
          'AccessToMyJewellerApp',
          inputs.AccessToMyJewellerApp ?? '',
        );
        data.append('IsOnlineSelling', inputs.IsOnlineSelling ?? '');
        data.append('IsLaunchSavingScheme', inputs.IsLaunchSavingScheme ?? '');
        data.append('BranchSrNo', inputs.BranchSrNo);
        if (
          inputs.showroomimage1.name == '' ||
          inputs.showroomimage1.name == undefined
        ) {
          data.append('showroomImg1', '');
        } else {
          data.append('showroomImg1', {
            uri: inputs.showroomimage1.uri,
            name: inputs.showroomimage1.name,
            type: inputs.showroomimage1.type,
          });
        }
        if (
          inputs.showroomimage2.name == '' ||
          inputs.showroomimage2.name == undefined
        ) {
          data.append('showroomImg2', '');
        } else {
          data.append('showroomImg2', {
            uri: inputs.showroomimage2.uri,
            name: inputs.showroomimage2.name,
            type: inputs.showroomimage3.type,
          });
        }
        if (
          inputs.showroomimage3.name == '' ||
          inputs.showroomimage3.name == undefined
        ) {
          data.append('showroomImg3', '');
        } else {
          data.append('showroomImg3', {
            uri: inputs.showroomimage3.uri,
            name: inputs.showroomimage3.name,
            type: inputs.showroomimage3.type,
          });
        }
        if (inputs.Ownerimg1.name == '' || inputs.Ownerimg1.name == undefined) {
          data.append('ownerImage1', '');
        } else {
          data.append('ownerImage1', {
            uri: inputs.Ownerimg1.uri,
            name: inputs.Ownerimg1.name,
            type: inputs.Ownerimg1.type,
          });
        }

        if (inputs.Ownerimg2.name == '' || inputs.Ownerimg2.name == undefined) {
          data.append('ownerImage2', '');
        } else {
          data.append('ownerImage2', {
            uri: inputs.Ownerimg2.uri,
            name: inputs.Ownerimg2.name,
            type: inputs.Ownerimg2.type,
          });
        }
        if (inputs.Ownerimg3.name == '' || inputs.Ownerimg3.name == undefined) {
          data.append('ownerImage3', '');
        } else {
          data.append('ownerImage3', {
            uri: inputs.Ownerimg3.uri,
            name: inputs.Ownerimg3.name,
            type: inputs.Ownerimg3.type,
          });
        }
        if (
          inputs.ProductImage1.name == '' ||
          inputs.ProductImage1.name == undefined
        ) {
          data.append('productImage1', '');
        } else {
          data.append('productImage1', {
            uri: inputs.ProductImage1.uri,
            name: inputs.ProductImage1.name,
            type: inputs.ProductImage1.type,
          });
        }

        if (
          inputs.ProductImage2.name == '' ||
          inputs.ProductImage2.name == undefined
        ) {
          data.append('productImage2', '');
        } else {
          data.append('productImage2', {
            uri: inputs.ProductImage2.uri,
            name: inputs.ProductImage2.name,
            type: inputs.ProductImage2.type,
          });
        }
        if (
          inputs.ProductImage3.name == '' ||
          inputs.ProductImage3.name == undefined
        ) {
          data.append('productImage3', '');
        } else {
          data.append('productImage3', {
            uri: inputs.ProductImage3.uri,
            name: inputs.ProductImage3.name,
            type: inputs.ProductImage3.type,
          });
        }

        console.log('request sned on update data ', data);

        let config = {
          method: 'post',
          maxBodyLength: Infinity,

          url: 'https://olocker.co/api/partners/updateProfile',
          headers: {
            Olocker: `Bearer ${Token}`,
          },
          data: data,
        };

        axios
          .request(config)
          .then(response => {
            console.log('response data ....', response.data);
            if (response?.data?.success == true) {
              navigation.navigate('Customers');
              Toast.show(response?.data?.msg);
              setFetching(false);
            } else {
              setFetching(false);
              Toast.show(response?.data?.msg);
            }
          })
          .catch(error => {
            setFetching(false);
            console.log('error,,,,,,,,,,,', error);
          });
      } catch {
        console.log('catch block error', error);
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

        default:
          return;
      }
    });
  };

  const getSpecilization = data => {
    let arr = [];
    data?.map((item, index) => {
      let obj = {id: item?.SrNo, name: item?.name};
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
      }
    } else {
      //  setPinCode(val)
    }
  };
  useEffect(() => {
    if (inputs.gold_purity.includes('Custom purity')) {
      handleInputs('goldcustom_purity', selector?.typeOfjewellery?.isGoldCpVal);
      setCustomPurityGo(true);
    } else {
      setCustomPurityGo(false);
      handleInputs('goldcustom_purity', '');
    }
  }, [inputs.gold_purity]);
  useEffect(() => {
    if (inputs.diamond_purity.includes('Custom purity')) {
      handleInputs(
        'diamondcustom_purity',
        selector?.typeOfjewellery?.isDiamondCpVal,
      );
      setCustomPurityDia(true);
    } else {
      setCustomPurityDia(false);
      handleInputs('diamondcustom_purity', '');
    }
  }, [inputs.diamond_purity]);

  useEffect(() => {
    if (inputs.platinum_purity.includes('Custom purity')) {
      handleInputs(
        'platinumcustom_purity',
        selector?.typeOfjewellery?.isPlatinumCpVal,
      );
      setCustomPurityPla(true);
    } else {
      setCustomPurityPla(false);
      handleInputs('platinumcustom_purity', '');
    }
  }, [inputs.platinum_purity]);
  useEffect(() => {
    if (inputs.silver_purity.includes('Custom purity')) {
      handleInputs(
        'silvercustom_purity',
        selector?.typeOfjewellery?.isSilverCpVal,
      );
      setCustomPuritySil(true);
    } else {
      setCustomPuritySil(false);
      handleInputs('silvercustom_purity', '');
    }
  }, [inputs.silver_purity]);

  const renderScreen = () => {
    return (
      <ScrollView style={{paddingHorizontal: 10, paddingVertical: 10}}>
        <View>
          <Text style={styles.text}>
            Company Name<Text style={{color: 'red'}}>{' *'}</Text>
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
            Display Name<Text style={{color: 'red'}}>{' *'}</Text>
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
            Owner Name<Text style={{color: 'red'}}>{' *'}</Text>
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
            HO Address<Text style={{color: 'red'}}>{' *'}</Text>
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
                  handleInputs(
                    'diamond_purity',
                    newValue ? [...inputs.diamond_purity] : [],
                  );
                  handleInputs(
                    'diamond_specialisation',
                    newValue ? [...inputs.diamond_specialisation] : [],
                  );
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
                onValueChange={newValue => {
                  handleInputs('JTypeg', newValue),
                    handleInputs(
                      'gold_purity',
                      newValue ? [...inputs.gold_purity] : [],
                    ),
                    handleInputs(
                      'gold_specialisation',
                      newValue ? [...inputs.gold_specialisation] : [],
                    );
                }}
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
                onValueChange={newValue => {
                  handleInputs('JTypep', newValue),
                    handleInputs(
                      'platinum_specialisation',
                      newValue ? [...inputs.platinum_specialisation] : [],
                    ),
                    handleInputs(
                      'platinum_purity',
                      newValue ? [...inputs.platinum_purity] : [],
                    );
                }}
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
                onValueChange={newValue => {
                  handleInputs('JTypes', newValue);
                  handleInputs(
                    'silver_purity',
                    newValue ? [...inputs.silver_purity] : [],
                  );
                  handleInputs(
                    'silver_specialisation',
                    newValue ? [...inputs.silver_specialisation] : [],
                  );
                }}
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
                // items={convertArrayToItems(
                //   selector?.typeOfjewellery?.diamondPurityList,
                // )}
                items={selector?.typeOfjewellery?.diamondPurityList}
                uniqueKey="value"
                onSelectedItemsChange={val => {
                  handleInputs('diamond_purity', val);
                  // if (val.includes('Custom purity')) {
                  //   setCustomPurityDia(true);
                  //   handleInputs('diamondcustom_purity', '');
                  // } else {
                  //   setCustomPurityDia(false);
                  // }
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
                styleItemsContainer={{
                  height: hp(20),
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
                  placeholder="Please specify Custom purity"
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
                  keyboardType="decimal-pad"
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
                styleItemsContainer={{
                  height: hp(20),
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
                // items={convertArrayToItems(
                //   selector?.typeOfjewellery?.goldPurityList,
                // )}
                items={selector?.typeOfjewellery?.goldPurityList}
                uniqueKey="value"
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
                styleItemsContainer={{
                  height: hp(20),
                }}
                tagContainerStyle={{
                  backgroundColor: '#032e63',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: '48%',
                }}
                onSelectedItemsChange={val => {
                  handleInputs('gold_purity', val);
                  // if (val.includes('Custom purity')) {
                  //   setCustomPurityGo(true);
                  //  uses
                  // } else {
                  //   setCustomPurityGo(false);
                  // }
                }}
              />
            </View>

            {customPurityGo == true ? (
              <View style={{marginTop: 10}}>
                <TextInput
                  placeholder="Please specify Custom purity"
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
                  keyboardType="decimal-pad"
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
                styleItemsContainer={{
                  height: hp(20),
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
                // items={convertArrayToItems(
                //   selector?.typeOfjewellery?.platinumPurityList,
                // )}
                items={selector?.typeOfjewellery?.platinumPurityList}
                uniqueKey="value"
                onSelectedItemsChange={val => {
                  handleInputs('platinum_purity', val);
                  // if (val.includes('Custom purity')) {
                  //   setCustomPurityPla(true);
                  //   handleInputs('platinumcustom_purity', '');
                  // } else {
                  //   setCustomPurityPla(false);
                  // }
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
                styleItemsContainer={{
                  height: hp(20),
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
                  placeholder="Please specify Custom purity"
                  style={{
                    borderWidth: 1,
                    marginTop: 4,
                    height: 40,
                    borderRadius: 6,
                    borderColor: 'grey',
                    paddingLeft: 10,
                    color: '#000',
                  }}
                  keyboardType="decimal-pad"
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
                styleItemsContainer={{
                  height: hp(20),
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
                // items={convertArrayToItems(
                //   selector?.typeOfjewellery?.silverPurityList,
                // )}
                items={selector?.typeOfjewellery?.silverPurityList}
                uniqueKey="value"
                onSelectedItemsChange={val => {
                  handleInputs('silver_purity', val);
                  // if (val.includes('Custom purity')) {
                  //   setCustomPuritySil(true);
                  //   handleInputs('silvercustom_purity', '');
                  // } else {
                  //   setCustomPuritySil(false);
                  // }
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
                styleItemsContainer={{
                  height: hp(20),
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
                  placeholder="Please specify Custom purity"
                  style={{
                    borderWidth: 1,
                    marginTop: 4,
                    height: 40,
                    borderRadius: 6,
                    borderColor: 'grey',
                    paddingLeft: 10,
                    color: '#000',
                  }}
                  keyboardType="decimal-pad"
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
                styleItemsContainer={{
                  height: hp(20),
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
                  height: wp(30),
                  width: wp(30),
                  alignSelf: 'flex-start',
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
                    height: wp(30),
                    width: wp(30),
                    alignSelf: 'flex-start',
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
              onChangeText={val => handleInputs('ProductName3', val)}
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
                    height: wp(30),
                    width: wp(30),
                    alignSelf: 'flex-start',
                    marginTop: 10,
                  }}
                  source={{uri: inputs.ProductImage3?.uri}}
                />
              </View>
            ) : null}
          </View>
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
                    height: wp(30),
                    width: wp(30),
                    alignSelf: 'flex-start',
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
                    height: wp(30),
                    width: wp(30),
                    alignSelf: 'flex-start',
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
                    height: wp(30),
                    width: wp(30),
                    alignSelf: 'flex-start',
                    marginTop: 10,
                  }}
                  source={{uri: inputs.showroomimage3?.uri}}
                />
              </View>
            ) : null}
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
                  height: wp(30),
                  width: wp(30),
                  alignSelf: 'flex-start',
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
                  height: wp(30),
                  width: wp(30),
                  alignSelf: 'flex-start',
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
                  height: wp(30),
                  width: wp(30),
                  alignSelf: 'flex-start',
                  marginTop: 10,
                }}
                source={{uri: inputs.Ownerimg3?.uri}}
              />
            </View>
          ) : null}
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
                  height: wp(30),
                  width: wp(30),
                  alignSelf: 'flex-start',
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
        {fetching ? <Loading /> : null}
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
    name: 'Custom purity',
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
