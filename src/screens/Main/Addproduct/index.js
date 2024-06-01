import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
  TextInput,
  Alert,
} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import styles from './styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CheckBox from '@react-native-community/checkbox';
import Header from '../../../components/CustomHeader';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {useIsFocused, useNavigation} from '@react-navigation/native';
import Loader from '../../../components/Loader';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DiamondViewModal from '../Model/DiamondViewModal';
import MetalViewModal from '../Model/MetalViewModal';
import DecorativeViewModal from '../Model/DecorativeViewModal';
import StoneViewModal from '../Model/StoneViewModal';
import {RadioButton} from 'react-native-paper';
import DocumentPicker from 'react-native-document-picker';
import Constants from '../../../Redux/Constants';
import axios from 'axios';
import Toast from 'react-native-simple-toast';
const AddProducts = ({route}) => {
  const prodcutfile = route.params?.productEdit1;
  const [ViewMetalModal, setViewMetalModal] = useState(false);
  const [ViewStoneModal, setViewStoneModal] = useState(false);
  const [ViewDiamondModal, setViewDiamondModal] = useState(false);
  const [ViewDecorativeModal, setViewDecorativeModal] = useState(false);
  const productType = useSelector(state => state.ProductItem);
  const isFetching = useSelector(state => state.isFetching);
  const AddStone1 = useSelector(state => state.AddStone);
  const GrossWt1 = useSelector(state => state.GrossWt1);
  const session_id = useSelector(state => state.session);
  const msg1 = useSelector(state => state.VeryFy);
  const itemField = useSelector(state => state.Itemfield1);
  const editProduct = useSelector(state => state.EditProduct);
  const products = editProduct?.products;
  const productEdit = useSelector(state => state.productEdit);
  const hProductSrNo = useSelector(state => state.HproductSrNo);
  const datadelete = useSelector(state => state.datadelete);
  const Decorative = useSelector(state => state.Decorative1);
  const MetalList = useSelector(state => state.AddMetal);
  const AddDiamond1 = useSelector(state => state.AddDaimond);
  const [inputs, setInputs] = useState({
    radioInventoryPreInsured: 0,
    radioPriceCalculator: 1,
    ItemName: '',
    Status: '',
    ProductSku: '',
    StyleID: '',
    Hallmarked: 1,
    radioGender: 'Male',
    IsBestSeller: false,
    StoneWt: '',
    StoneWtUnit: [],
    StoneName: [],
    StoneChargeableAmount: 0,
    StoneGrandTotal: 0,
    hStonesSrNo: [],
    DiamondGrandTotal: '',
    hDiamondSrNo: [],
    Diamondwt: 0,
    DiamondWtUnit: [],
    DiamondChargeableAmount: 0,
    DiamondShape: [],
    DiamondQuality: [],
    DiamondName: [],
    MetalWtGrandTotal: 0,
    hMetalWt: [],
    GrossWt: 0,
    MetalTypes: '',
    Metal_Purity: '',
    MetalWt: 0,
    MetalWtUnit: '',
    DecorationGrandTotal: 0,
    hDecorationSrNo: [],
    DecoWt: 0,
    DecorativeChargeableAmount: 0,
    DecorativeItemName: [],
    DecoWtUnit: [],
    txtLabourCharges: 0,
    radioIsWastage: 0,
    txtProductCharges: 0,
    isProductCertd: 0,
    ProductCertifiedBy: '',
    ImgUpload: '',
    chk_sc: [],
    hdnImagecount: 0,
    lblwidthUnit: '',
    lblBreadthUnit: '',
    lblSizeUnit: '',
    lblheightUnit: '',
    txtProductWidth: 0,
    txtProductHeight: 0,
    txtProductBreadth: 0,
    txtSize: 0,
    txtVGrossWt: '',
    txtVMetalWt: '',
    txtVDiamondWt: '',
    txtVStoneWt: '',
    txtVDecoWt: '',
    txtMrp: '',
    DeliveryDays: 0,
    hdnGrossWt: '',
    DecoItemName: '',
    submit: 'create product',
    ItemType: 0,
    hdnProductSku: '',
    hdnProductType: '',
    rbCategory: 'Category B',
    chk_c: [],
  });

  const getImage = () => {
    //https://olocker.co${item?.ImageLocation}/${item?.ImageName}

    const imageArr =
      editProduct?.productimages?.length > 0
        ? editProduct?.productimages?.map(item => {
            return {
              uri: `https://olocker.co/uploads/product/${item?.ImageName}`,
              type: 'image/jpg',
              name: item.ImageName,
            };
          })
        : [];

    return imageArr;
  };
  useEffect(() => {
    prodcutfile ? EditData() : null;
  }, [editProduct]);
  console.log('ojgjdfgpojdfpgjdfg',productType);
  const EditData = () => {
   
    setInputs(prev => ({
      ...prev,
      radioInventoryPreInsured: products?.isPreInsured,
      IsBestSeller: products?.isBestSeller == '1' ? true : false,
      radioIsWastage: products?.isWastage,
      ItemName: products?.ItemName,
      Status: products?.ProductStatus,
      ProductSku: products?.ProductSku,
      StyleID: products?.StyleID,
      Hallmarked: products?.isHallmarked,
      radioGender: products?.Gender,
      rbCategory: products?.CategoryType,
      MetalWtGrandTotal: editProduct?.productMetalGrandTotal,
      DiamondGrandTotal: editProduct?.productDiamondGrandTotal,
      StoneGrandTotal: editProduct?.productStoneGrandTotal,
      DecorationGrandTotal: editProduct?.productDecoGrandTotal,
      GrossWt: products?.GrossWt,
      txtProductCharges:products?.ProductCharges==null?0:parseFloat(products?.ProductCharges)?.toFixed(2),
      txtMrp:
        products?.ProductsPrice == null
          ? 0
          : parseFloat(products?.ProductsPrice)?.toFixed(2),
      isProductCertd: products?.isProductCertified,
      ImgUpload: getImage(),
      chk_sc: editProduct?.getmaping,
      chk_c: editProduct?.getcollection,
      txtProductWidth:
        products?.Width == null ? 0 : parseFloat(products?.Width)?.toFixed(2),
      txtProductBreadth:
        products?.Breadth == null
          ? 0
          : parseFloat(products?.Breadth)?.toFixed(2),
      txtProductHeight:
        products?.Height == null ? 0 : parseFloat(products?.Height)?.toFixed(2),
      txtSize:
        products?.Size == null ? 0 : parseFloat(products?.Size)?.toFixed(2),
      radioPriceCalculator: products?.isMrpBasis,
      DeliveryDays: products?.EstimateDeliveryDays,
      ItemType: editProduct?.products?.ItemType,
      txtLabourCharges: products?.LabourCharges,
      ProductCertifiedBy: products?.ProductCertifiedBy,
    }));
    dispatch({
      type: 'get_itemfieldlist_request',
      url: 'partners/getItemFields',
      itemSrNo: editProduct.products?.ItemType,
    });
  };
  const AddProduct2 = async () => {
    const Id = await AsyncStorage.getItem('Partnersrno');
    const Branch = await AsyncStorage.getItem('Branch');
    let data = {
      ...inputs,
      current_session_id: prodcutfile ? '' : session_id,
      PartnerSrNo: Id,
      BranchSrNo: Branch,
      hProductSrNo: prodcutfile ? hProductSrNo : 0,
      hdnIsMrp: inputs.radioPriceCalculator,
      hdnProductPartner: '',
      hdnProductBranch: '',
      IsBestSeller: inputs.IsBestSeller ? 1 : 0,
      hdnImagecount: inputs.ImgUpload.length,
    };

    data.ImgUpload;

    if (inputs.ItemName == '') {
      Toast.show('Please select the item name');
      return;
    }
    if (inputs.Status == '') {
      Toast.show('Please select the status');
      return;
    }
    if (GrossWt1 == undefined) {
      Toast.show('Please complete metal details section');
      return;
    }
    if (msg1.error && GrossWt1) {
      Toast.show(msg1?.msg);
      return;
    }

    if (inputs.radioPriceCalculator == 0) {
      if (inputs.txtLabourCharges == '') {
        Toast.show(
          inputs.radioIsWastage == 0
            ? 'Please enter charges per gram rs'
            : 'Please enter wastage % between 0-100',
        );
        return;
      }
    } else {
      if (inputs.txtMrp == '') {
        Toast.show('Please enter the amount');
        return;
      }
    }
    if (prodcutfile && inputs.ImgUpload.length <= 0) {
      Toast.show('Please Select an image');

      return; // If no image selected, stop execution of the function
    }

    let data2 = new FormData();
    await Object.keys(data).map(async (item, index) => {
      if (item === 'chk_sc') {
        data[item].map((item, index) => {
          data2.append(`chk_sc[${index}]`, item);
        });
      } else if (item === 'ImgUpload') {
        if (prodcutfile && data[item].length <= 0) {
          Toast.show('Please Select an image');
          return;
        }
        data[item].map((item, index) => {
          data2.append(`ImgUpload[${index}]`, item);
        });
      } else if (item === 'chk_c') {
        if (inputs.chk_c.length > 0) {
          data[item].map((item, index) => {
            data2.append(`chk_c[${index}]`, item);
          });
        }
      } else {
        data2.append(item, data[item]);
      }
    });

    fetchDataByPOST1(data2);
  };
  const [isFetching3, setIfetching] = useState(false);

  const fetchDataByPOST1 = async data => {
    const Token = await AsyncStorage.getItem('loginToken');
    console.log('add to product the data request ..', data);
    try {
      setIfetching(true);
      const response = await axios({
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          Olocker: `Bearer ${Token}`,
        },
        url: Constants.MainUrl + 'partners/createProduct',
        data: data,
      });
      console.log('add product    ........response...', response.data);
      if (response.data.status == true) {
        setIfetching(false);
        Toast.show(response.data.msg);
        navigation.navigate('Home1', {
          screen: 'MyCatalogue',
        });
      }
    } catch (error) {
      setIfetching(false);
      // Toast.show('something went wrong');
      throw error;
    }
  };

  const handleInputs = (text, input) => {
    setInputs(prev => ({...prev, [text]: input}));
  };
  const isFocuse = useIsFocused();

  useEffect(() => {
    AddStone1?.result?.length > 0 != undefined || datadelete?.stone
      ? AddStone()
      : null;
  }, [AddStone1?.result]);
  useEffect(() => {
    AddDiamond1?.result?.length > 0 != undefined || datadelete?.diamond
      ? addDiamondData()
      : null;
  }, [AddDiamond1?.result]);

  useEffect(() => {
    MetalList?.result?.length > 0 != undefined || datadelete?.metal
      ? AddMetal()
      : null;
  }, [MetalList?.result]);
  useEffect(() => {
    Decorative?.result?.length > 0 != undefined || datadelete?.decorative
      ? addDecorative()
      : null;
  }, [Decorative?.result]);

  const uploadImage = async () => {
    try {
      const res = await DocumentPicker.pickMultiple({
        type: [DocumentPicker.types.images, DocumentPicker.types.pdf],
      });

      // Calculate the remaining slots available
      const remainingSlots = 6 - inputs.ImgUpload.length;

      // If the selected images exceed the remaining slots, slice the array to fit the limit
      const newImages = res.slice(0, remainingSlots);

      // Map the selected images to the required format
      const newImageArray = newImages.map(item => ({
        uri: item.uri,
        name: item.name,
        type: item.type,
      }));

      // Update the state with the new images
      setInputs(prev => ({
        ...prev,
        ImgUpload: [...inputs.ImgUpload, ...newImageArray],
      }));

      // Handle input to set the hidden image count
      handleInputs(
        'hdnImagecount',
        inputs.ImgUpload.length + newImageArray.length,
      );
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker
      } else {
        throw err;
      }
    }
  };

  useEffect(() => {
    itemField ? handleitemFIleds() : null;
  }, [itemField]);

  const handleitemFIleds = () => {
    setInputs(prev => ({
      ...prev,
      lblSizeUnit: 'mm',
      lblBreadthUnit: 'mm',
      lblwidthUnit: 'mm',
      lblheightUnit: 'mm',
      // lblSizeUnit: itemField?.lblSizeUnit,
      // lblBreadthUnit: itemField?.lblBreadthUnit,
      // lblwidthUnit: itemField?.lblwidthUnit,
      // lblheightUnit: itemField?.lblheightUnit,
    }));
  };

  const addDiamondData = async () => {
    let hDiamondSrNo = [];
    let diamondWt = 0;
    let DiamondWtUnit = [];
    let DiamondChargeableAmount = 0;
    let DiamondName = [];
    let DiamondShape = [];
    let DiamondQuality = [];
    let DiamondGrandTotal = [];
    let weight = 0;

    await AddDiamond1?.result?.map(item => {
      let weight = item.UnitStoneWt == 'Cts.' ? item.StoneWt / 5 : item.StoneWt;
      hDiamondSrNo.push(item?.SrNo);
      diamondWt = parseFloat(diamondWt) + parseFloat(weight);
      DiamondWtUnit.push(item?.UnitStoneWt);
      DiamondGrandTotal.push(weight);
      DiamondChargeableAmount =
        parseFloat(DiamondChargeableAmount) +
        parseFloat(item?.StoneChargeableAmount);
      DiamondName.push(item?.StoneName);
      DiamondShape.push(item?.StoneShape);
      DiamondQuality.push(item?.StoneQuality);
    });
    setInputs(prev => ({
      ...prev,
      DiamondGrandTotal: diamondWt,
      hDiamondSrNo: hDiamondSrNo,
      Diamondwt: DiamondGrandTotal,
      DiamondWtUnit: ['Gms.'],
      DiamondChargeableAmount: DiamondChargeableAmount,
      DiamondName: DiamondName,
      DiamondShape: DiamondShape,
      DiamondQuality: DiamondQuality,
      txtVDiamondWt: `${diamondWt} Gms.`,
    }));

    diamondWt != 0 ? VeryFy1() : null;
    inputs.radioPriceCalculator == 0 ? getProductPrice() : null;
  };

  const AddStone = async () => {
    let StoneWt = 0;
    let StoneWtUnit = [];
    let StoneName = [];
    let StoneChargeableAmount = 0;
    let hStonesSrNo = [];
    let stonesingleWiegt = [];
    let weight = 0;
    AddStone1?.result?.map(item => {
      let weight =
        item?.UnitStoneWt == 'Cts.' ? item.StoneWt / 5 : item.StoneWt;
      stonesingleWiegt.push(weight);
      StoneWt = parseFloat(StoneWt) + parseFloat(weight);
      StoneChargeableAmount =
        parseFloat(StoneChargeableAmount) +
        parseFloat(item?.StoneChargeableAmount);
      StoneWtUnit.push(item?.UnitStoneWt);
      StoneName.push(item?.StoneName);
      hStonesSrNo.push(item?.SrNo);
    });

    setInputs(prev => ({
      ...prev,
      StoneWt: stonesingleWiegt,
      StoneWtUnit: ['Gms.'],
      StoneName: StoneName,
      StoneChargeableAmount: StoneChargeableAmount,
      StoneGrandTotal: StoneWt,
      hStonesSrNo: hStonesSrNo,
      txtVStoneWt: `${StoneWt} Gms.`,
    }));

    StoneWt != 0 ? VeryFy1() : null;
    inputs.radioPriceCalculator == 0 ? getProductPrice() : null;
  };

  const addDecorative = async () => {
    let hDecorationSrNo = [];
    let DecorativeItemWt = 0;
    let DecoItemName = [];
    let DecoWtUnit = [];
    let DecorativeChargeableAmount = 0;
    let DecorationGrandTotal = [];
    let DecoWt = 0;
    // let weight = 0
    await Decorative?.result?.map(item => {
      let weight =
        item.UnitDecoItemWt == 'Cts.'
          ? item.DecorativeItemWt / 5
          : item.DecorativeItemWt;
      hDecorationSrNo.push(item?.SrNo);
      DecoWt = parseFloat(DecoWt) + parseFloat(weight);
      DecorationGrandTotal.push(weight);
      DecorativeChargeableAmount =
        parseFloat(DecorativeChargeableAmount) +
        parseFloat(item?.DecorativeChargeableAmount);
      DecorativeItemWt =
        parseFloat(DecorativeItemWt) + parseFloat(item?.DecorativeItemWt);
      DecoItemName.push(item?.DecorativeItemName);
      DecoWtUnit.push(item.UnitDecoItemWt);
    });

    setInputs(prev => ({
      ...prev,
      hDecorationSrNo: hDecorationSrNo,
      DecorationGrandTotal: DecoWt,
      DecoWt: DecorationGrandTotal,
      DecorativeChargeableAmount: DecorativeChargeableAmount,
      DecoItemName: DecoItemName,
      DecoWtUnit: ['Gms.'],
      txtVDecoWt: `${DecoWt} Gms.`,
    }));

    DecoWt != 0 ? VeryFy1() : null;
    inputs.radioPriceCalculator == 0 ? getProductPrice() : null;
  };

  const AddMetal = async () => {
    let hMetalWt = 0;
    let MetalTypes = [];
    let Metal_Purity = [];
    let MetalWtUnit = [];
    let MetalWtGrandTotal = [];

    await MetalList?.result?.map(item => {
      let weight =
        item.UnitMetalWt == 'Cts.' ? item?.MetalWt / 5 : item?.MetalWt;
      hMetalWt = parseFloat(hMetalWt) + parseFloat(weight);
      MetalWtGrandTotal.push(weight);
      MetalWtUnit.push(item?.UnitMetalWt);
      Metal_Purity.push(item?.MetalPurity);
      MetalTypes.push(item?.MetalType);
      // MetalWt.push(weight)
    });
    setInputs(prev => ({
      ...prev,
      hMetalWt: hMetalWt,
      MetalWtGrandTotal: hMetalWt,
      GrossWt: GrossWt1,
      MetalWt: MetalWtGrandTotal,
      MetalWtUnit: MetalWtUnit[MetalWtUnit.length - 1],
      Metal_Purity: Metal_Purity[Metal_Purity.length - 1],
      MetalTypes: MetalTypes[MetalTypes.length - 1],
      txtVGrossWt: `${GrossWt1} ${MetalWtUnit[0]}`,
      txtVMetalWt: `${hMetalWt} Gms.`,
      hdnGrossWt: GrossWt1,
    }));
    VeryFy1();
    inputs.radioPriceCalculator == 0 ? getProductPrice() : null;
  };
  useEffect(() => {
    inputs.radioPriceCalculator == 0 ? getProductPrice() : null;
  }, [inputs.txtLabourCharges, inputs.radioIsWastage]);
  const getProductPrice = async () => {
    const Id = await AsyncStorage.getItem('Partnersrno');
    const data = {
      partnerSrNo: Id,
      current_session_id: session_id,
      IsWastage: inputs.radioIsWastage,
      LabourCharges: inputs.txtLabourCharges,
      hProductSrNo: prodcutfile ? hProductSrNo : 0,
      gross_wt: GrossWt1,
    };
    const Token = await AsyncStorage.getItem('loginToken');
    try {
      const response = await axios({
        method: 'GET',
        url: Constants.MainUrl + 'partners/getProductsPrice',
        params: data,
        headers: {
          Olocker: `Bearer ${Token}`,
        },
      });
      console.log('response data ,,,,,', response.data, data);
      handleInputs('txtProductCharges', response.data.amount);
    } catch (error) {
      throw error;
    }
  };

  const handleOnVisible = (indexx, items) => {
    const res = inputs.ImgUpload.filter(item => item.name != items.name);
    setInputs(prev => ({...prev, ImgUpload: res}));
  };

  const calculatePrice = () => {
    inputs.DiamondChargeableAmount;
    inputs.DecorativeChargeableAmount;
    inputs.StoneChargeableAmount;
    inputs.txtLabourCharges;

    const res =
      parseFloat(
        inputs.DiamondChargeableAmount > 0
          ? inputs.DecorativeChargeableAmount
          : 0,
      ) +
      parseFloat(
        inputs.StoneChargeableAmount > 0 ? inputs.StoneChargeableAmount : 0,
      ) +
      parseFloat(
        inputs.DiamondChargeableAmount > 0 ? inputs.DiamondChargeableAmount : 0,
      );
    handleInputs('txtProductCharges', res.toFixed(2));
  };

  useEffect(() => {
    if (isFocuse) {
      productTypeList();
    }
  }, [isFocuse]);

  const dispatch = useDispatch();

  const productTypeList = async () => {
    const Token = await AsyncStorage.getItem('loginToken');
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

  const VeryFy1 = async () => {
    try {
      let stonewt = 0;
      let dimondwt = 0;
      let decorativewt = 0;
      let metalwt = 0;
      {
        AddStone1?.result?.length > 0
          ? AddStone1?.result?.map(item => {
              let stonewieght =
                item?.UnitStoneWt === 'Cts.'
                  ? item?.StoneWt / 5
                  : item?.StoneWt;
              stonewt = parseFloat(stonewt) + parseFloat(stonewieght);
            })
          : null;
      }
      {
        AddDiamond1?.result?.length > 0
          ? AddDiamond1?.result?.map(item => {
              let dimondWieght =
                item?.UnitStoneWt == 'Cts.' ? item?.StoneWt / 5 : item?.StoneWt;
              dimondwt = parseFloat(dimondwt) + parseFloat(dimondWieght);
            })
          : null;
      }
      {
        Decorative?.result?.length > 0
          ? Decorative?.result?.map(item => {
              let decovwie =
                item?.UnitDecoItemWt === 'Cts.'
                  ? item?.DecorativeItemWt / 5
                  : item?.DecorativeItemWt;
              decorativewt = parseFloat(decorativewt) + parseFloat(decovwie);
            })
          : null;
      }
      {
        MetalList?.result?.length > 0
          ? MetalList?.result?.map(item => {
              let metalweight =
                item?.UnitMetalWt === 'Cts.'
                  ? item?.MetalWt / 5
                  : item?.MetalWt;
              metalwt = parseFloat(metalwt) + parseFloat(metalweight);
            })
          : null;
      }
      const Token = await AsyncStorage.getItem('loginToken');
      dispatch({
        type: 'product_verifyWt_Request',
        url: 'partners/verifyWt',
        Token: Token,
        GrossWt: GrossWt1,
        MetalWtGrandTotal: metalwt,
        DiamondGrandTotal: dimondwt,
        StoneGrandTotal: stonewt,
        DecorationGrandTotal: decorativewt,
      });
    } catch (error) {
      console.log('errorrrr   very fy ', error);
    }
  };

  const handleCategorysub = SrNo => {
    if (!inputs.chk_c?.includes(SrNo)) {
      handleInputs('chk_c', [...inputs.chk_c, SrNo]);
    }
  };
  const navigation = useNavigation();
  const renderItem = item1 => {
    return (
      <>
        <View
          style={{
            borderBottomWidth: 2,
            height: 40,
            flexDirection: 'row',
            alignItems: 'center',
            borderWidth: 2,
            paddingLeft: 5,
            width: '100%',
          }}>
          <CheckBox
            onChange={() => {
              //  handleCategory(item1?.SrNo);}}
              if (inputs?.chk_sc?.includes(item1?.SrNo)) {
                let res = inputs?.chk_sc?.filter(item => item != item1?.SrNo);
                handleInputs('chk_sc', res);
              } else {
                handleInputs('chk_sc', [...inputs?.chk_sc, item1?.SrNo]);
              }
            }}
            value={inputs?.chk_sc?.includes(item1?.SrNo) ? true : false}
            tintColors={{true: '#032e63', false: '#032e63'}}
          />
          <Text
            style={{
              fontSize: 14,
              marginLeft: 5,
              fontWeight: '700',
              color: '#000',
            }}>
            {item1?.Name}
          </Text>
        </View>
      </>
    );
  };
  const handleCategory = SrNo => {
    if (inputs?.chk_sc?.includes(SrNo)) {
      let res = inputs?.chk_sc?.filter(item => item != SrNo);
      handleInputs('chk_sc', res);
    } else {
      handleInputs('chk_sc', [...inputs?.chk_sc, SrNo]);
    }
  };
  return (
    <View style={styles.container1}>
      <Header
        source={require('../../../assets/L.png')}
        source2={require('../../../assets/Image/dil.png')}
        source1={require('../../../assets/Fo.png')}
        title={prodcutfile ? 'Update Product' : 'Add Product '}
        onPress={() => navigation.goBack()}
        onPress1={() => navigation.navigate('MessageBox')}
        onPress2={() => navigation.navigate('FavDetails')}
      />
      {isFetching || isFetching3 ? <Loader /> : null}
      <ScrollView contentContainerStyle={{}}>
        <DiamondViewModal
          visi={ViewDiamondModal}
          close={() => setViewDiamondModal(false)}
          isBrekup={inputs.radioPriceCalculator}
          prodcutfile={prodcutfile}
        />
        <MetalViewModal
          visi={ViewMetalModal}
          close={() => setViewMetalModal(false)}
          isBrekup={inputs.radioPriceCalculator}
          prodcutfile={prodcutfile}
        />
        <DecorativeViewModal
          visi={ViewDecorativeModal}
          close={() => setViewDecorativeModal(false)}
          isBrekup={inputs.radioPriceCalculator}
          prodcutfile={prodcutfile}
        />
        <StoneViewModal
          visi={ViewStoneModal}
          close={() => setViewStoneModal(false)}
          isBrekup={inputs.radioPriceCalculator}
          prodcutfile={prodcutfile}
        />

        <View>
          <View style={styles.mrt}>
            <Text style={styles.TextMain}>
              {' '}
              Choose Price Calculation Method
            </Text>
          </View>
          <View style={styles.breakupV}>
            <RadioButton
              value={inputs.radioPriceCalculator}
              color="#032e63"
              uncheckedColor="#474747"
              status={
                inputs.radioPriceCalculator == 0 ? 'checked' : 'unchecked'
              }
              onPress={() => {
                handleInputs('radioPriceCalculator', 0),
                  handleInputs('txtMrp', '');
              }}
            />
            <Text style={styles.textBreack}>Break Up Pricing</Text>
            <View style={{marginLeft: wp(5)}}>
              <RadioButton
                value={inputs.radioPriceCalculator}
                color="#032e63"
                uncheckedColor="#474747"
                status={
                  inputs.radioPriceCalculator == 1 ? 'checked' : 'unchecked'
                }
                onPress={() => {
                  handleInputs('radioPriceCalculator', 1);
                  handleInputs('txtLabourCharges', '');
                }}
              />
            </View>

            <Text style={styles.textBreack}>MRP Pricing</Text>
          </View>
        </View>
        <View>
          <View style={styles.mrt}>
            <Text style={styles.text}>
              Item Name <Text style={{color: 'red'}}>*</Text>
            </Text>
            <View>
              {productType?.productType && (
                <Dropdown
                  style={[
                    styles.dropdown,
                    {borderWidth: 1, borderColor: '#979998'},
                  ]}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  iconStyle={styles.iconStyle}
                  itemTextStyle={{color: '#474747'}}
                  data={productType?.productType}
                  maxHeight={250}
                  search
                  searchPlaceholder="search.."
                  inputSearchStyle={{
                    borderRadius: 10,
                    color: '#474747',
                    backgroundColor: '#fff',
                  }}
                  labelField="Value"
                  valueField="lable"
                  placeholder={
                    inputs.ItemName ? inputs.ItemName : 'Product/item type'
                  }
                  value={inputs.ItemName}
                  onChange={item => {
                    handleInputs('ItemName', item?.Value);
                    handleInputs('ItemType', item?.lable);

                    dispatch({
                      type: 'get_itemfieldlist_request',
                      url: 'partners/getItemFields',
                      itemSrNo: item.lable,
                    });
                  }}
                />
              )}
            </View>
          </View>
          <View style={styles.mrt}>
            <Text style={styles.text}>
              Status <Text style={{color: 'red'}}>*</Text>
            </Text>
            <View>
              <Dropdown
                style={[
                  styles.dropdown,
                  {borderWidth: 1, borderColor: '#979998'},
                ]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                itemTextStyle={{color: '#474747'}}
                iconStyle={styles.iconStyle}
                data={live}
                maxHeight={250}
                labelField="label"
                valueField="value"
                placeholder="Product Status"
                value={inputs.Status}
                onChange={item => {
                  handleInputs('Status', item.value);
                }}
              />
            </View>
          </View>

          {inputs.Status == 'Catalog' ? (
            <View style={styles.mrt}>
              <Text style={styles.text}>Estimate Delivery Days</Text>
              <View>
                <TextInput
                  style={[
                    styles.dropdown,
                    {borderWidth: 1, borderColor: '#979998'},
                  ]}
                  placeholderTextColor="#474747"
                  placeholder="Delivery Days"
                  value={inputs.DeliveryDays}
                  onChangeText={input => {
                    handleInputs('DeliveryDays', input);
                  }}
                />
              </View>
            </View>
          ) : null}
          <View style={styles.mrt}>
            <Text style={styles.text}>ProductSku</Text>
            <View>
              <TextInput
                style={[
                  styles.dropdown,
                  {borderWidth: 1, borderColor: '#979998'},
                ]}
                placeholder="ProductSKU"
                placeholderTextColor="#474747"
                value={inputs.ProductSku}
                onChangeText={input => {
                  handleInputs('ProductSku', input);
                  handleInputs('hdnProductSku', input);
                }}
              />
            </View>
          </View>
          <View style={styles.mrt}>
            <Text style={styles.text}>Style Id</Text>
            <View>
              <TextInput
                style={[
                  styles.dropdown,
                  {borderWidth: 1, borderColor: '#979998'},
                ]}
                placeholder="Style Id"
                placeholderTextColor="#474747"
                value={inputs.StyleID}
                onChangeText={input => handleInputs('StyleID', input)}
              />
            </View>
          </View>
        </View>
        {
          //Hallmarked
        }
        <View style={[styles.mrt, {marginTop: wp(4)}]}>
          <Text style={styles.text}> Hallmarked</Text>
          <View
            style={{
              alignItems: 'center',
              //justifyContent: 'space-between',

              flexDirection: 'row',
              // marginHorizontal: wp(3),
              // borderWidth: 1
            }}>
            <RadioButton
              value={inputs.Hallmarked}
              color="#032e63"
              uncheckedColor="#474747"
              status={inputs.Hallmarked == 1 ? 'checked' : 'unchecked'}
              onPress={() => {
                handleInputs('Hallmarked', 1);
              }}
            />
            <Text style={styles.textBreack}>Yes </Text>
            <View style={{marginLeft: wp(5)}}>
              <RadioButton
                value={inputs.Hallmarked}
                color="#032e63"
                uncheckedColor="#474747"
                status={inputs.Hallmarked == 0 ? 'checked' : 'unchecked'}
                onPress={() => {
                  handleInputs('Hallmarked', 0);
                }}
              />
            </View>

            <Text style={styles.textBreack}> No </Text>
          </View>
        </View>
        <View style={styles.mrt}>
          <Text style={styles.text}> Gender</Text>
          <View
            style={{
              alignItems: 'center',
              //justifyContent: 'space-between',
              flexDirection: 'row',
              // marginHorizontal: wp(3),
              // borderWidth: 1
            }}>
            <RadioButton
              value={inputs.radioGender}
              color="#032e63"
              uncheckedColor="#474747"
              status={inputs.radioGender == 'Male' ? 'checked' : 'unchecked'}
              onPress={() => handleInputs('radioGender', 'Male')}
            />
            <Text style={styles.textBreack}>Male</Text>
            <View style={{marginLeft: wp(5)}}>
              <RadioButton
                value={inputs.radioGender}
                color="#032e63"
                uncheckedColor="#474747"
                status={
                  inputs.radioGender == 'Female' ? 'checked' : 'unchecked'
                }
                onPress={() => handleInputs('radioGender', 'Female')}
              />
            </View>

            <Text style={styles.textBreack}>Female</Text>
            <View style={{marginLeft: wp(5)}}>
              <RadioButton
                value={inputs.radioGender}
                color="#032e63"
                uncheckedColor="#474747"
                status={inputs.radioGender == 'Kids' ? 'checked' : 'unchecked'}
                onPress={() => handleInputs('radioGender', 'Kids')}
              />
            </View>

            <Text style={styles.textBreack}>Kids</Text>
          </View>
        </View>
        {/* <View
          style={{ alignSelf: 'center', mrr: wp(3), marginTop: wp(4) }}>
          <View>
            <Text style={{ fontSize: wp(5), fontWeight: '700', color: '#032e63' }}>
              Assign Category
            </Text>
          </View>
        </View> */}
        <View
          style={{
            flexDirection: 'row',
            marginHorizontal: wp(3),
            marginLeft: wp(4),
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              flexDirection: 'row',
              // marginHorizontal: wp(3),
              marginTop: wp(4),
              justifyContent: 'space-between',
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View>
                <CheckBox
                  value={inputs.IsBestSeller}
                  onChange={() =>
                    handleInputs('IsBestSeller', !inputs.IsBestSeller)
                  }
                  tintColors={{true: '#032e63', false: '#032e63'}}
                />
              </View>
              <Text style={styles.textBreack}>Is Best Seller</Text>
            </View>
          </View>
        </View>

        {itemField?.lblDimension == 1 ? (
          <View style={{marginHorizontal: 15, marginTop: wp(5)}}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: '700',
                color: '#000',
              }}>
              Dimensions
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: wp(1),
              }}>
              <View style={{width: '48.5%'}}>
                <View
                  style={{
                    borderWidth: 1,
                    borderColor: '#979998',
                    borderRadius: wp(2),
                    height: hp(5.5),
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    overflow: 'hidden',
                    paddingLeft: wp(4),
                  }}>
                  <TextInput
                    placeholder="Width"
                    placeholderTextColor="#474747"
                    // editable={itemField?.divWidth == 1 ? true : false}
                    style={{color: 'black'}}
                    keyboardType="numeric"
                    value={inputs.txtProductWidth}
                    onChangeText={input =>
                      handleInputs('txtProductWidth', input)
                    }
                  />
                  <View
                    style={{
                      borderLeftWidth: 1,
                      width: '30%',
                      height: '100%',
                      backgroundColor: 'lightgrey',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderColor: '#979998',
                    }}>
                    <Text style={{color: 'black', fontWeight: '600'}}>
                      {inputs.lblwidthUnit}
                    </Text>
                  </View>
                </View>
              </View>
              <View style={{width: '48.5%'}}>
                <View
                  style={{
                    borderWidth: 1,
                    borderColor: '#979998',
                    borderRadius: wp(2),
                    height: hp(5.5),
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    overflow: 'hidden',
                    paddingLeft: wp(4),
                  }}>
                  <TextInput
                    placeholder="Height"
                    placeholderTextColor="#474747"
                    // editable={itemField?.divHeight == 1 ? true : false}
                    style={{color: 'black'}}
                    value={inputs.txtProductHeight}
                    keyboardType="numeric"
                    onChangeText={input =>
                      handleInputs('txtProductHeight', input)
                    }
                  />
                  <View
                    style={{
                      borderLeftWidth: 1,
                      width: '30%',
                      height: '100%',
                      backgroundColor: 'lightgrey',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderColor: '#979998',
                    }}>
                    <Text style={{color: 'black', fontWeight: '600'}}>
                      {inputs.lblheightUnit}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: wp(3),
              }}>
              <View style={{width: '48.5%'}}>
                <View
                  style={{
                    borderWidth: 1,
                    borderRadius: wp(2),
                    borderColor: '#979998',
                    height: hp(5.5),
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    overflow: 'hidden',
                    paddingLeft: wp(4.5),
                  }}>
                  <TextInput
                    placeholder="Thikness"
                    placeholderTextColor="#474747"
                    // editable={itemField?.divBreadth == 1 ? true : false}
                    style={{color: 'black'}}
                    value={inputs.txtProductBreadth}
                    keyboardType="numeric"
                    onChangeText={input =>
                      handleInputs('txtProductBreadth', input)
                    }
                  />
                  <View
                    style={{
                      borderLeftWidth: 1,
                      borderColor: '#979998',
                      width: '30%',
                      height: '100%',
                      backgroundColor: 'lightgrey',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Text style={{color: 'black', fontWeight: '600'}}>
                      {inputs.lblBreadthUnit}
                    </Text>
                  </View>
                </View>
              </View>
              <View style={{width: '48.5%'}}>
                <View
                  style={{
                    borderWidth: 1,
                    borderColor: '#979998',
                    borderRadius: wp(2),
                    height: hp(5.5),
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    overflow: 'hidden',
                    paddingLeft: wp(4),
                  }}>
                  <TextInput
                    // editable={itemField?.divSize == 1 ? true : false}
                    value={inputs.txtSize}
                    placeholder="Size"
                    placeholderTextColor="#474747"
                    keyboardType="numeric"
                    onChangeText={input => handleInputs('txtSize', input)}
                    style={{color: 'black'}}
                  />
                  <View
                    style={{
                      borderLeftWidth: 1,
                      borderColor: '#979998',
                      width: '30%',
                      height: '100%',
                      backgroundColor: 'lightgrey',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Text style={{color: 'black', fontWeight: '600'}}>
                      {inputs.lblSizeUnit}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        ) : null}

        <View
          style={{
            flexDirection: 'row',
            marginHorizontal: wp(4.5),
            marginTop: 15,
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity
            onPress={() => {
              setViewMetalModal(true);
            }}
            style={[
              styles.btn,
              {
                backgroundColor:
                  MetalList?.result?.length > 0 != undefined ||
                  datadelete?.metal
                    ? '#fff'
                    : '#032e63',
              },
            ]}>
            <Text style={styles.txt2}>Metal Details</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setViewStoneModal(true);
            }}
            style={[styles.btn, {backgroundColor: '#032e63'}]}>
            <Text style={[styles.txt2, {color: 'white'}]}>Stone Details</Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: 'row',
            marginHorizontal: wp(4.5),
            marginTop: 15,
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity
            onPress={() => {
              setViewDiamondModal(true);
            }}
            style={styles.btn}>
            <Text style={styles.txt2}>Diamond Details</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setViewDecorativeModal(true);
            }}
            style={[styles.btn, {backgroundColor: '#032e63'}]}>
            <Text style={[styles.txt2, {color: 'white', textAlign: 'center'}]}>
              Decorative item Details
            </Text>
          </TouchableOpacity>
        </View>

        <View style={{marginHorizontal: 20, marginTop: 15}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={{width: '48%'}}>
              <View style={{marginHorizontal: 0, marginVertical: 8}}>
                <Text style={styles.modelText}>Decorative Wt.</Text>
              </View>
              <View
                style={{
                  borderWidth: 1,
                  borderColor: '#979998',
                  borderRadius: wp(3),
                  height: hp(5.5),
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <TextInput
                  placeholder={
                    inputs.DecorationGrandTotal
                      ? inputs.DecorationGrandTotal.toString() + ' ' + 'Gms.'
                      : 'Decorative Wt.'
                  }
                  placeholderTextColor="#474747"
                  editable={false}
                  style={{fontSize: 14, fontWeight: '600', color: '#032e63'}}
                />
              </View>
            </View>
            <View style={{width: '48%'}}>
              <View style={{marginHorizontal: 0, marginVertical: 8}}>
                <Text style={styles.modelText}>Gross Wt.</Text>
              </View>
              <View
                style={{
                  borderWidth: 1,
                  borderColor: '#979998',
                  borderRadius: wp(3),
                  height: hp(5.5),
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <TextInput
                  placeholder={
                    GrossWt1
                      ? parseFloat(GrossWt1)?.toFixed(2) + ' ' + 'Gms.'
                      : inputs.GrossWt
                      ? parseFloat(inputs.GrossWt)?.toFixed(2) + ' ' + 'Gms.'
                      : 'Gross Wt.'
                  }
                  placeholderTextColor="#474747"
                  editable={false}
                  style={{fontSize: 14, fontWeight: '600', color: '#032e63'}}
                />
              </View>
            </View>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={{width: '48%'}}>
              <View style={{marginHorizontal: 0, marginVertical: 8}}>
                <Text style={styles.modelText}>Metal Wt.</Text>
              </View>
              <View
                style={{
                  borderWidth: 1,
                  borderColor: '#979998',
                  borderRadius: wp(3),
                  height: hp(5.5),
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <TextInput
                  placeholder={
                    inputs.MetalWtGrandTotal
                      ? inputs.MetalWtGrandTotal.toString() + ' ' + 'Gms.'
                      : 'Metal Wt.'
                  }
                  placeholderTextColor="#474747"
                  // value={inputs.hMetalWt}
                  editable={false}
                  style={{fontSize: 14, fontWeight: '600', color: '#032e63'}}
                />
              </View>
            </View>
            <View style={{width: '48%'}}>
              <View style={{marginHorizontal: 0, marginVertical: 8}}>
                <Text style={styles.modelText}>Diamond Wt.</Text>
              </View>
              <View
                style={{
                  borderWidth: 1,
                  borderColor: '#979998',
                  borderRadius: wp(3),
                  height: hp(5.5),
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <TextInput
                  placeholder={
                    inputs.DiamondGrandTotal
                      ? inputs.DiamondGrandTotal + ' ' + 'Gms.'
                      : 'Diamond Wt.'
                  }
                  placeholderTextColor="#474747"
                  // value={inputs.DiamondGrandTotal}
                  editable={false}
                  style={{fontSize: 14, fontWeight: '600', color: '#032e63'}}
                  // style={{ fontSize: wp(4), fontWeight: '700' }}
                />
              </View>
            </View>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={{width: '48%'}}>
              <View style={{marginHorizontal: 0, marginVertical: 8}}>
                <Text style={styles.modelText}>Stone Wt.</Text>
              </View>
              <View
                style={{
                  borderWidth: 1,
                  borderColor: '#979998',
                  borderRadius: wp(3),
                  height: hp(5.5),
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <TextInput
                  placeholder={
                    inputs.StoneGrandTotal
                      ? inputs.StoneGrandTotal + ' ' + 'Gms.'
                      : 'Stone Wt.'
                  }
                  placeholderTextColor="#474747"
                  editable={false}
                  style={{fontSize: 14, fontWeight: '600', color: '#032e63'}}
                  // style={{ fontSize: wp(4), fontWeight: '700' }}
                />
              </View>
            </View>
            <View style={{width: '48%'}}>
              <View style={{marginHorizontal: 0, marginVertical: 8}}>
                <Text style={styles.modelText}>Verify Wt.</Text>
              </View>
              <TouchableOpacity
                style={{
                  borderWidth: 1,
                  borderColor: '#979998',
                  borderRadius: wp(3),
                  height: hp(5.5),
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'green',
                }}
                onPress={() => VeryFy1()}>
                {/* <TextInput
                  placeholder="Decorative Wt."
                  style={{ fontSize: wp(4), fontWeight: '700' }}
                /> */}
                <Text style={{fontSize: 14, fontWeight: '600', color: 'white'}}>
                  Verify Wt.
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {/* {GrossWt1==undefined?null: */}
        <View style={{width: '90%', marginTop: wp(2), alignSelf: 'center'}}>
          <Text
            style={{
              alignSelf: 'center',
              color: msg1?.success ? 'green' : 'red',
              fontSize: wp(3),
              fontWeight: '800',
            }}>
            {msg1?.msg}
          </Text>
        </View>
        {/* } */}
        <View style={{marginVertical: 0}}>
          {inputs.radioPriceCalculator == 0 ? (
            <>
              <View style={styles.mrt}>
                <Text style={styles.text}> Chargeable amount for Labour</Text>
              </View>
              <View
                style={{
                  alignItems: 'center',
                  flexDirection: 'row',
                  marginHorizontal: wp(3),
                }}>
                <RadioButton
                  value={inputs.radioIsWastage}
                  color="#032e63"
                  uncheckedColor="#474747"
                  status={inputs.radioIsWastage == 0 ? 'checked' : 'unchecked'}
                  onPress={() => {
                    handleInputs('radioIsWastage', 0);
                    handleInputs('txtLabourCharges', '');
                  }}
                />
                <Text
                  style={{
                    fontSize: wp(3),
                    fontWeight: '600',
                    color: '#474747',
                  }}>
                  Charges Per Gram Rs
                </Text>
                <View style={{marginLeft: wp(2)}}>
                  <RadioButton
                    value={inputs.radioIsWastage}
                    color="#032e63"
                    uncheckedColor="#474747"
                    status={
                      inputs.radioIsWastage == 1 ? 'checked' : 'unchecked'
                    }
                    onPress={() => {
                      handleInputs('radioIsWastage', 1);
                      handleInputs('txtLabourCharges', '');
                    }}
                    // status={checked === 'Gold' ? 'checked' : 'unchecked'}
                    // onPress={() => setChecked('Gold')}
                  />
                </View>

                <Text
                  style={{
                    fontSize: wp(3),
                    fontWeight: '600',
                    color: '#474747',
                  }}>
                  Wastage(% of Net Gold wt)
                </Text>
              </View>
            </>
          ) : null}
        </View>
        {
          //Wastage % between 0-100
        }
        <View style={styles.mrt}>
          {inputs.radioPriceCalculator == 0 ? (
            <>
              <Text style={[styles.text]}>
                {' '}
                {inputs.radioIsWastage == 1
                  ? 'Wastage % between 0-100'
                  : 'Amount in Rs.'}
                <Text style={{color: 'red'}}>
                  {inputs.radioPriceCalculator == 0 &&
                  inputs.radioIsWastage == 0
                    ? '*'
                    : null}
                </Text>
              </Text>

              <View
                style={{
                  borderWidth: 1,
                  borderColor: '#979998',
                  height: hp(5.5),
                  borderRadius: wp(3),
                  marginTop: wp(2),
                  paddingHorizontal: 5,
                  marginHorizontal: 8,
                  marginBottom: 3,
                }}>
                <TextInput
                  style={{color: '#474747'}}
                  value={inputs.txtLabourCharges}
                  onChangeText={input => {
                    let isValid = false;

                    if (inputs.radioIsWastage) {
                      const regex =
                        /^(100(\.0{0,6})?|[0-9]{0,2}(\.\d{0,2})?)?$/;
                      isValid = regex.test(input);
                    } else {
                      const regex1 = /^\d{0,10}(\.\d{1,2})?$/;
                      isValid = regex1.test(input);
                    }

                    if (isValid || input === '') {
                      handleInputs('txtLabourCharges', input);
                    }
                  }}
                  placeholder={
                    inputs.radioIsWastage
                      ? 'Wastage % between 0-100'
                      : 'Amount in Rs.'
                  }
                  placeholderTextColor="#474747"
                  keyboardType="numeric"
                />
              </View>
            </>
          ) : null}
          {
            //Chargeable amount for Product RS
          }
          <View style={{marginTop: 10}}>
            <Text style={styles.text}>
              {' '}
              {inputs.radioPriceCalculator == 0
                ? 'Chargeable amount for Product RS'
                : 'Specify MRP pricing '}
              <Text style={{color: 'red'}}>
                {' '}
                {inputs.radioPriceCalculator == 1 ? '*' : null}
              </Text>
            </Text>
            <View
              style={{
                borderWidth: 1,
                borderColor: '#979998',
                height: hp(5.5),
                borderRadius: wp(3),
                marginTop: wp(2),
                paddingHorizontal: 5,
                marginHorizontal: 8,
              }}>
              <TextInput
                style={{color: '#474747'}}
                editable={inputs.radioPriceCalculator == 1}
                value={
                  inputs.radioPriceCalculator == 0
                    ? inputs.txtProductCharges.toString()
                    : inputs.txtMrp
                }
                keyboardType="numeric"
                onChangeText={input =>
                  handleInputs(
                    inputs.radioPriceCalculator == 0
                      ? 'txtProductCharges'
                      : 'txtMrp',
                    input,
                  )
                }
                placeholder={'0.00'}
                placeholderTextColor="#474747"
              />
            </View>
          </View>
          {
            //CERTIFICATION DETAILS
          }
          <View style={{marginTop: wp(3.5)}}>
            <Text style={styles.text}> Certification Details</Text>
            <Text
              style={{
                marginLeft: wp(3),
                fontSize: wp(3.5),
                marginTop: wp(1),
                fontWeight: 'bold',
                color: 'black',
              }}>
              Certified
            </Text>
            <View style={{marginHorizontal: 4}}>
              <Dropdown
                style={[
                  styles.dropdown,
                  {borderWidth: 1, borderColor: '#979998'},
                ]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                iconStyle={styles.iconStyle}
                data={DropData2}
                itemTextStyle={{color: '#474747'}}
                maxHeight={250}
                labelField="label"
                valueField="value"
                placeholder={inputs.isProductCertd == '1' ? 'Yes' : 'No'}
                value={inputs.isProductCertd}
                onChange={item => {
                  handleInputs('isProductCertd', item.value);
                }}
              />
            </View>
            {inputs?.isProductCertd == '1' ? (
              <>
                <Text style={[styles.text, {marginTop: 10}]}>
                  Certification agency
                </Text>
                <View
                  style={{
                    borderWidth: 1,
                    borderColor: '#979998',
                    height: hp(5.5),
                    borderRadius: wp(3),
                    marginTop: wp(2),
                    paddingHorizontal: 5,
                    marginHorizontal: 8,
                  }}>
                  <TextInput
                    style={{color: '#474747'}}
                    autoCapitalize={'characters'}
                    value={inputs.ProductCertifiedBy}
                    onChangeText={input =>
                      handleInputs('ProductCertifiedBy', input)
                    }
                    placeholderTextColor="#474747"
                    placeholder="Certification agency"
                  />
                </View>
              </>
            ) : null}
          </View>

          <View style={[styles.mrt, {marginBottom: 10}]}>
            <Text style={[styles.text, {marginLeft: 0}]}>
              Upload Max. 6 Images
            </Text>
          </View>

          {inputs.ImgUpload?.length > 0 ? (
            <View
              style={{
                height: hp(17),
                // borderWidth: 1,
                marginTop: 4,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <FlatList
                data={inputs.ImgUpload}
                keyExtractor={(item, index) => index}
                horizontal={true}
                renderItem={({item, index}) => (
                  <View>
                    <TouchableOpacity
                      onPress={() => {
                        Alert.alert(
                          'Are you want to Delete image ?',
                          '',
                          [
                            {
                              text: 'Cancel',
                              onPress: () => {
                                cancelable: false;
                              },
                              style: 'cancel',
                            },
                            {
                              text: 'ok',
                              onPress: () => handleOnVisible(index, item),
                            },
                          ],
                          {cancelable: false},
                        );
                      }}>
                      <Image
                        style={{
                          height: hp(15),
                          width: wp(30),
                          alignSelf: 'center',
                          marginHorizontal: wp(1),
                        }}
                        source={{uri: item.uri}}
                      />
                    </TouchableOpacity>
                  </View>
                )}
              />
            </View>
          ) : null}

          <TouchableOpacity
            onPress={() => {
              inputs.ImgUpload.length < 6
                ? uploadImage()
                : Toast.show('You cannot uplaod more images');
            }}
            style={styles.upload}>
            <Entypo name="upload" size={20} color={'#032e63'} />
            <Text style={{color: '#000', fontWeight: '700', fontSize: 15}}>
              Upload Image
            </Text>
          </TouchableOpacity>
        </View>

        {/* <View style={{marginHorizontal: 19, marginTop: 15}}>
          <Text style={styles.TextMain}>Choose Categories To Product</Text>
          <Text style={{fontSize: 14, fontWeight: '600', color: 'grey'}}>
            (Define Tabs:- Ticks Mark All The Tabs Where You Want This Jewellery
            To Appear In Clint Search)
          </Text>
        </View> */}
        {/* <View style={{marginTop: wp(2.5)}}>
          <FlatList
            data={productType?.category}
            renderItem={({item}) => (
              <TouchableOpacity
                activeOpacity={1}
                // onPress={() => handleCategorysub(item.SrNo)}
                style={{marginVertical: 5}}>
                <View
                  style={{
                    marginHorizontal: 20,
                    borderBottomWidth: 0,
                    marginTop: 0,
                    height: 40,
                    backgroundColor: '#032E63',
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: '700',
                      marginLeft: 10,
                      color: '#fff',
                    }}>
                    {item.Name}
                  </Text>
                </View>
                <View
                  style={{
                    marginHorizontal: 20,
                    borderWidth: 1,
                    borderColor: '#979998',
                    borderBottomWidth: 0,
                  }}>
                  <Dropdown
                    style={{
                      borderBottomWidth: 1,
                      borderColor: '#979998',
                      height: 40,
                    }}
                    placeholderStyle={[
                      styles.placeholderStyle,
                      {
                        fontWeight: '600',
                        fontSize: 14,
                        marginLeft: 10,
                        color: '#000',
                      },
                    ]}
                    selectedTextStyle={[
                      styles.selectedTextStyle,
                      {
                        fontSize: 15,
                        fontWeight: '700',
                        color: '#000',
                        marginLeft: 10,
                      },
                    ]}
                    iconStyle={{width: 30, height: 30}}
                    data={item.subcategory}
                    maxHeight={200}
                    labelField="Name"
                    valueField="Name"
                    placeholder="Select"
                    value={inputs.chk_sc}
                    onChange={() => {}}
                    renderItem={renderItem}
                    itemTextStyle={{
                      fontSize: 15,
                      fontWeight: '700',
                      color: 'red',
                    }}
                  />
                </View>
              </TouchableOpacity>
            )}
          />
        </View> */}
        <View style={{marginHorizontal: 18, marginTop: 10, marginBottom: 10}}>
          <Text style={styles.TextMain}>Choose Collection To Product</Text>
          <Text style={{fontSize: 14, fontWeight: '600', color: 'grey'}}>
            (Define Tabs:- Ticks Mark All The Tabs Where You Want This Jewellery
            To Appear In Clint Search)
          </Text>
        </View>
        <View>
          {productType?.collection && (
            <View
              style={{
                borderWidth: 1,
                borderColor: '#979998',
                marginHorizontal: 19,
                height: hp(30),
                zIndex: 2,
              }}>
              <ScrollView nestedScrollEnabled>
                <FlatList
                  data={productType?.collection}
                  scrollEnabled={false}
                  renderItem={({item}) => (
                    <View
                      style={{
                        marginHorizontal: 20,
                        // borderWidth: 2,
                        marginTop: 10,
                        borderBottomWidth: 0,
                      }}>
                      <View
                        style={{
                          // borderBottomWidth: 2,
                          height: 40,
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}>
                        <CheckBox
                          onChange={async () => {
                            if (inputs?.chk_c?.includes(item.SrNo)) {
                              const res = inputs?.chk_c.filter(
                                items => items != item.SrNo,
                              );

                              handleInputs('chk_c', res);
                            } else {
                              handleInputs('chk_c', [
                                ...inputs.chk_c,
                                item.SrNo,
                              ]);
                            }
                          }}
                          value={
                            inputs?.chk_c?.includes(item.SrNo) ? true : false
                          }
                          tintColors={{true: '#032e63', false: '#032e63'}}
                        />
                        <Text
                          style={{
                            fontSize: 14,
                            marginLeft: 5,
                            fontWeight: '600',
                            color: '#000',
                          }}>
                          {item.Name}
                        </Text>
                      </View>
                    </View>
                  )}
                />
              </ScrollView>
            </View>
          )}
        </View>

        <View style={{marginHorizontal: 50, marginTop: 1, paddingVertical: 15}}>
          <TouchableOpacity
            onPress={() => AddProduct2()}
            style={{
              height: 40,
              borderRadius: 30,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#032e63',
            }}>
            <Text
              style={{
                fontSize: 18,
                color: 'white',
                fontWeight: '600',
                textAlign: 'center',
                marginBottom: 2,
              }}>
              {prodcutfile ? 'Update Product' : 'Add Product'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('MyCatalogue')}
            style={{
              height: 40,
              borderRadius: 30,
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 15,
              backgroundColor: '#666564',
            }}>
            <Text
              style={{
                fontSize: 18,
                color: 'white',
                fontWeight: '600',
                textAlign: 'center',
                marginBottom: 5,
              }}>
              Cancel
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default AddProducts;
const DropData = [
  {label: 'Yes', value: 1},
  {label: 'No', value: 2},
];
const DropData2 = [
  {label: 'Yes', value: 1},
  {label: 'No', value: 0},
];
const live = [
  {label: 'Live', value: 'Live'},
  {label: 'Catalog', value: 'Catalog'},
];
