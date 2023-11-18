import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,TextInput
} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
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

import { useIsFocused, useNavigation } from '@react-navigation/native';
import Loader from '../../../components/Loader';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DiamondViewModal from '../Model/DiamondViewModal';
import MetalViewModal from '../Model/MetalViewModal';
import DecorativeViewModal from '../Model/DecorativeViewModal';
import StoneViewModal from '../Model/StoneViewModal';
import { RadioButton } from 'react-native-paper';
import DocumentPicker from 'react-native-document-picker';
import Constants from '../../../Redux/Constants';
import axios from 'axios';
import Toast from 'react-native-simple-toast'
const AddProducts = ({ route }) => {
  const prodcutfile = route.params.productEdit1
  const [ViewMetalModal, setViewMetalModal] = useState(false);
  const [ViewStoneModal, setViewStoneModal] = useState(false);
  const [ViewDiamondModal, setViewDiamondModal] = useState(false);
  const [ViewDecorativeModal, setViewDecorativeModal] = useState(false);
  const productType = useSelector(state => state.ProductItem);
  const isFetching = useSelector(state => state.isFetching);
  const AddStone1 = useSelector(state => state.AddStone)
  const GrossWt1 = useSelector(state => state.GrossWt1)
  const session_id = useSelector(state => state.session);
  const msg = useSelector(state => state.VeryFy);
  const itemField = useSelector(state => state.Itemfield1)
 
  const editProduct = useSelector(state => state.EditProduct);
  const products = editProduct?.products;
  const productEdit = useSelector(state => state.productEdit)
  const hProductSrNo = useSelector(state => state.HproductSrNo)
  const datadelete = useSelector(state => state.datadelete);
  const Decorative = useSelector(state => state.Decorative1)
  const MetalList = useSelector(state => state.AddMetal)
  const AddDiamond1 = useSelector(state => state.AddDaimond)
 
  const [inputs, setInputs] = useState({
    radioInventoryPreInsured: 0,
    radioPriceCalculator: 1,
    ItemName: '',
    Status: 'Live',
    ProductSku: '',
    StyleID: 0,
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
      editProduct?.productimages?.length > 0 ?
        editProduct?.productimages?.map(item => {
          return {
            uri: `https://olocker.co/uploads/product/${item?.ImageName}`,
            type: 'image/jpg',
            name: item.ImageName,
          };
        }) : [
          {
            uri: 'https://thumbs.dreamstime.com/b/diamond-ring-rose-resting-pink-flower-45235273.jpg?w=768',
            name: 'diamond-ring-rose-resting-pink-flower-45235273.jpg',
            type: 'image/jpg',
          },
        ]

    return imageArr;
  };
  useEffect(() => {
    prodcutfile ? EditData() : null;
  }, [editProduct]);
  const EditData = () => {
  //   console.log('dfffddf',products.ProductsPrice);
  //  if(products.ProductsPrice === null)
  //  {
  //   console.log('virendra mish');
  // }
  //  else {
  //   console.log('viruuuuuuuuuu',parseFloat(products?.ProductsPrice)?.toFixed(2))
  // }


    setInputs(prev => ({
      ...prev,
      radioInventoryPreInsured: products?.isPreInsured,
      IsBestSeller: products?.isBestSeller == '1' ? true : false,
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
      txtMrp:products?.ProductsPrice==null?0: parseFloat(products?.ProductsPrice)?.toFixed(2),
      isProductCertd: products?.isProductCertified,
      ImgUpload: getImage(),
      chk_sc: editProduct?.getmaping,
      chk_c: editProduct?.getcollection,
      txtProductWidth: products?.Width,
      txtProductBreadth: products?.Breadth,
      txtProductHeight: products?.Height,
      txtSize: products?.Size,
      radioPriceCalculator: products?.isMrpBasis,
      DeliveryDays: products?.EstimateDeliveryDays,
      ItemType: editProduct?.products?.ItemType,
      txtLabourCharges: products?.LabourCharges,
      ProductCertifiedBy: products?.ProductCertifiedBy
    }));
    dispatch({
      type: 'get_itemfieldlist_request',
      url: 'partners/getItemFields',
      itemSrNo: editProduct.products?.ItemType,
    });

  }




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
      hdnProductBranch: "",
      IsBestSeller: inputs.IsBestSeller ? 1 : 0,
      hdnImagecount: inputs.ImgUpload.length,
    }

    data.ImgUpload;

    let data2 = new FormData();
    await Object.keys(data).map(async (item, index) => {
      if (item === 'chk_sc') {
        data[item].map((item, index) => {
          data2.append(`chk_sc[${index}]`, item);
        });
      } else if (item === 'ImgUpload') {
        data[item].map((item, index) => {
          data2.append(`ImgUpload[${index}]`, item);
        })
      }
      else if (item === 'chk_c') {
        if (inputs.chk_c.length > 0) {
          data[item].map((item, index) => {
            data2.append(`chk_c[${index}]`, item);
          });
          // chk_c[0]=23
          // chk_c[1],23
          // chk_c[2],23

        }
        // else {
        //   data2.append(`chk_c[]`, "");
        // }
      }
      else { data2.append(item, data[item]); }
    });
    
    fetchDataByPOST1(data2);
  };
  const [isFetching3, setIfetching] = useState(false);

  const fetchDataByPOST1 = async (data) => {
    const Token = await AsyncStorage.getItem('loginToken')
    console.log(data);
    try {
      var headers = {
        'content-type': 'application/json',
        "Olocker": `Bearer ${Token}`,
      }
     
      setIfetching(true)
      const response = await axios({
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          "Olocker": `Bearer ${Token}`,
        },
        url: Constants.MainUrl + 'partners/createProduct',
        data: data,
      });
     
      if (response.data.status == true) {
        setIfetching(false);
        Toast.show(response.data.msg)
        navigation.navigate("Home1", {
          screen: 'MyCatalogue'
        })
      }

    } catch (error) {
      setIfetching(false)
      Toast.show('something went wrong')
      throw error;
    }




  }


  const handleInputs = (text, input) => {
    setInputs(prev => ({ ...prev, [text]: input }));
  };
  const isFocuse = useIsFocused();


  useEffect(() => {
    AddStone1?.result?.length > 0 != undefined || datadelete?.stone ? AddStone() : null
  }, [AddStone1?.result])
  useEffect(() => {
    AddDiamond1?.result?.length > 0 != undefined || datadelete?.diamond ? addDiamondData() : null
  }, [AddDiamond1?.result])

  useEffect(() => {
    MetalList?.result?.length > 0 != undefined || datadelete?.metal ? AddMetal() : null;
  }, [MetalList?.result])
  useEffect(() => {
    Decorative?.result?.length > 0 != undefined || datadelete?.decorative ? addDecorative() : null
  }, [Decorative?.result])



  const uploadImage = async () => {
    try {
      const res = await DocumentPicker.pickMultiple({
        type: [DocumentPicker.types.images,DocumentPicker.types.pdf],
      });
       
      let arr = [];
      res.map(item => {
        let obj = {
          uri: item.uri,
          name: item.name,
          type: item.type,
        };
        arr.push(obj);
      });

      setInputs(prev => ({
        ...prev,
        ImgUpload: [...inputs.ImgUpload, ...arr],
      }));
      handleInputs('hdnImagecount', inputs.ImgUpload.length);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
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
      lblSizeUnit: itemField?.lblSizeUnit,
      lblBreadthUnit: itemField?.lblBreadthUnit,
      lblwidthUnit: itemField?.lblwidthUnit,
      lblheightUnit: itemField?.lblheightUnit,
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
    let weight = 0

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
    VeryFy1();
    getProductPrice();
  };

  const AddStone = async () => {
    let StoneWt = 0;
    let StoneWtUnit = []
    let StoneName = []
    let StoneChargeableAmount = 0
    let hStonesSrNo = []
    let stonesingleWiegt = [];
    let weight = 0
    AddStone1?.result?.map((item) => {
    
      let weight = item?.UnitStoneWt == 'Cts.' ? item.StoneWt / 5 : item.StoneWt;
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
    VeryFy1();
    getProductPrice();
  };




  const addDecorative = async () => {
    let hDecorationSrNo = [];
    let DecorativeItemWt = 0;
    let DecoItemName = [];
    let DecoWtUnit = [];
    let DecorativeChargeableAmount = 0;
    let DecorationGrandTotal = []
    let DecoWt = 0
    // let weight = 0
    await Decorative?.result?.map((item) => {
      let weight = item.UnitDecoItemWt == 'Cts.' ? item.DecorativeItemWt / 5 : item.DecorativeItemWt;
      hDecorationSrNo.push(item?.SrNo);
      DecoWt = parseFloat(DecoWt) + parseFloat(weight);
      DecorationGrandTotal.push(weight)
      DecorativeChargeableAmount =
        parseFloat(DecorativeChargeableAmount) +
        parseFloat(item?.DecorativeChargeableAmount);
      DecorativeItemWt = parseFloat(DecorativeItemWt) + parseFloat(item?.DecorativeItemWt)
      DecoItemName.push(item?.DecorativeItemName);
      DecoWtUnit.push(item.UnitDecoItemWt);
    })

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
    VeryFy1();
    getProductPrice();
  }


  const AddMetal = async () => {

    let hMetalWt = 0;
    let MetalTypes = [];
    let Metal_Purity = [];
    let MetalWtUnit = [];
    let MetalWtGrandTotal = [];

    await MetalList?.result?.map((item) => {
      let weight = item.UnitMetalWt == 'Cts.' ? item?.MetalWt / 5 : item?.MetalWt
      hMetalWt = parseFloat(hMetalWt) + parseFloat(weight)
      MetalWtGrandTotal.push(weight)
      MetalWtUnit.push(item?.UnitMetalWt);
      Metal_Purity.push(item?.MetalPurity);
      MetalTypes.push(item?.MetalType);
      // MetalWt.push(weight)
    })
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
    getProductPrice();

  }


  // useEffect(() => {
  //   inputs.radioPriceCalculator == 0 ? calculatePrice() : null;
  // }, [
  //   inputs.DiamondChargeableAmount,
  //   inputs.StoneChargeableAmount,
  //   inputs.DecorativeChargeableAmount,
  //   inputs.txtLabourCharges
  // ]);
  useEffect(() => {
    inputs.radioPriceCalculator == 0 ? getProductPrice() : null;
  }, [
    inputs.DiamondChargeableAmount,
    inputs.StoneChargeableAmount,
    inputs.DecorativeChargeableAmount,
    inputs.txtLabourCharges
  ]);
  const getProductPrice = async () => {

    const data = {

      current_session_id: prodcutfile ? 0 : session_id,
      IsWastage: inputs.radioIsWastage,
      LabourCharges: inputs.txtLabourCharges,
      hProductSrNo: inputs.txtLabourCharges,
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
      handleInputs('txtProductCharges', response.data.amount)
    } catch (error) {
      throw error;
    }
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
    productTypeList();

  }, [isFocuse]);


  const dispatch = useDispatch();

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

  const VeryFy1 = async () => {

    try {
      let stonewt = 0;
      let dimondwt = 0;
      let decorativewt = 0;
      let metalwt = 0;
      {
        AddStone1?.result?.length > 0 ?
          AddStone1?.result?.map(item => {
            let stonewieght =
              item?.UnitStoneWt === 'Cts.' ? item?.StoneWt / 5 : item?.StoneWt;
            stonewt = parseFloat(stonewt) + parseFloat(stonewieght);
          }) : null
      };
      {
        AddDiamond1?.result?.length > 0 ?
          AddDiamond1?.result?.map(item => {
            let dimondWieght =
              item?.UnitStoneWt == 'Cts.' ? item?.StoneWt / 5 : item?.StoneWt;
            dimondwt = parseFloat(dimondwt) + parseFloat(dimondWieght);
          
          }) : null
      };
      {
        Decorative?.result?.length > 0 ?
          Decorative?.result?.map(item => {
            let decovwie =
              item?.UnitDecoItemWt === 'Cts.'
                ? item?.DecorativeItemWt / 5
                : item?.DecorativeItemWt;
            decorativewt = parseFloat(decorativewt) + parseFloat(decovwie);
          }) : null
      }
      {
        MetalList?.result?.length > 0 ?
          MetalList?.result?.map(item => {
            let metalweight =
              item?.UnitMetalWt === 'Cts.' ? item?.MetalWt / 5 : item?.MetalWt;
            metalwt = parseFloat(metalwt) + parseFloat(metalweight);
          }) : null
      }
      const Token = await AsyncStorage.getItem('loginToken')
      dispatch({
        type: 'product_verifyWt_Request',
        url: 'partners/verifyWt',
        Token: Token,
        GrossWt: GrossWt1,
        MetalWtGrandTotal: metalwt,
        //  hMetalWt
        //   ? hMetalWt
        //   : inputs.MetalWtGrandTotal
        //     ? inputs.MetalWtGrandTotal
        //     : editProduct?.productMetalGrandTotal,
        DiamondGrandTotal: dimondwt,
        //  diamondWt
        //   ? diamondWt
        //   : inputs.DiamondGrandTotal
        //     ? inputs.DiamondGrandTotal
        //     : editProduct?.productDiamondGrandTotal,
        StoneGrandTotal: stonewt,
        // StoneWt
        //   ? StoneWt
        //   : inputs.StoneGrandTotal
        //     ? inputs.StoneGrandTotal
        //     : editProduct?.productStoneGrandTotal,
        DecorationGrandTotal: decorativewt,
        //  DecoWt ?
        //   DecoWt : inputs.DecorationGrandTotal ? inputs.DecorationGrandTotal
        //     : editProduct?.productDecoGrandTotal
      })
    } catch (error) {
     
    }

  }

  const handleCategorysub = SrNo => {
    if (!inputs.chk_c?.includes(SrNo)) {
      handleInputs('chk_c', [...inputs.chk_c, SrNo]);
    }
  };
  const navigation = useNavigation();
  const renderItem = item => {
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
              handleCategory(item.SrNo);
            }}
            value={inputs.chk_sc.includes(item.SrNo) ? true : false}
            tintColors={{ true: '#032e63', false: '#032e63' }}

          />
          <Text
            style={{
              fontSize: 18,
              marginLeft: 5,
              fontWeight: '700',
              color: '#000',
            }}>
            {item.Name}
          </Text>
        </View>
      </>
    );
  };
  const handleCategory = SrNo => {
    if (inputs.chk_sc.includes(SrNo)) {
      let res = inputs.chk_sc.filter(item => item != SrNo);
      handleInputs('chk_sc', res);
    } else {
      handleInputs('chk_sc', [...inputs.chk_sc, SrNo]);
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
          </View>{
            // Break Up Pricing

            //   MRP Pricing
          }
          <View style={styles.breakupV}>
            <RadioButton
              value={inputs.radioPriceCalculator}
              color="#032e63"
              uncheckedColor="#474747"
              status={
                inputs.radioPriceCalculator == 0 ? 'checked' : 'unchecked'
              }
              onPress={() => handleInputs('radioPriceCalculator', 0)}
            />
            <Text style={styles.textBreack}>
              Break Up Pricing
            </Text>
            <View style={{ marginLeft: wp(5) }}>
              <RadioButton
                value={inputs.radioPriceCalculator}
                color="#032e63"
                uncheckedColor="#474747"
                status={
                  inputs.radioPriceCalculator == 1 ? 'checked' : 'unchecked'
                }
                onPress={() => handleInputs('radioPriceCalculator', 1)}
              /></View>

<Text style={styles.textBreack}>
              MRP Pricing
            </Text>
          </View>

        </View>
        {//  MRP Pricing
          // Break Up Pricing
          //FILL PRODUCT DETAILS
        }
        <View>


          <View style={styles.mrt}>
            <Text style={styles.text}>
              Item Name <Text style={{ color: 'red' }}>*</Text>
            </Text>
            <View>

              {productType?.productType &&
                <Dropdown
                  style={[
                    styles.dropdown,
                    { borderWidth: 1, borderColor: '#979998' },
                  ]}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  iconStyle={styles.iconStyle}
                  itemTextStyle={{ color: '#474747',}}
                  data={productType?.productType}
                  maxHeight={250}
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
              }
            </View>
          </View>
          <View style={styles.mrt}>
            <Text style={styles.text}>
              Status <Text style={{ color: 'red' }}>*</Text>
            </Text>
            <View>
              <Dropdown
                style={[
                  styles.dropdown,
                  { borderWidth: 1, borderColor: '#979998' },
                ]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                itemTextStyle={{ color: '#474747',}}
                iconStyle={styles.iconStyle}
                data={live}
                maxHeight={250}
                labelField="label"
                valueField="value"
                placeholder="Live"
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
                    { borderWidth: 1, borderColor: '#979998' },
                  ]}
                  placeholderTextColor='#474747'
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
            <Text style={styles.text}>
              ProductSku
            </Text>
            <View>
              <TextInput
                style={[
                  styles.dropdown,
                  { borderWidth: 1, borderColor: '#979998' },
                ]}
                placeholder="option"
                placeholderTextColor='#474747'
                value={inputs.ProductSku}
                onChangeText={input => {
                  handleInputs('ProductSku', input);
                  handleInputs('hdnProductSku', input);
                }}
              />
            </View>
          </View>
          <View style={styles.mrt}>
            <Text style={styles.text}>
              Style Id <Text style={{ color: 'red' }}>*</Text>
            </Text>
            <View>
              <TextInput
                style={[
                  styles.dropdown,
                  { borderWidth: 1, borderColor: '#979998' },
                ]}
                placeholder="Style Id"
                placeholderTextColor='#474747'
                value={inputs.StyleID}
                onChangeText={input => handleInputs('StyleID', input)}
              />
            </View>
          </View>
        </View>
        {
          //Hallmarked
        }
        <View style={[styles.mrt, { marginTop: wp(4) }]}>

        <Text style={styles.TextMain}>
            {' '}
            Hallmarked
          </Text>
          <View
            style={{

              alignItems: 'center',
              //justifyContent: 'space-between',

              flexDirection: 'row',
              marginHorizontal: wp(3),
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
            <View style={{ marginLeft: wp(5) }}>
              <RadioButton
                value={inputs.Hallmarked}
                color="#032e63"
                uncheckedColor="#474747"
                status={inputs.Hallmarked == 0 ? 'checked' : 'unchecked'}
                onPress={() => {
                  handleInputs('Hallmarked', 0);
                }}
              /></View>

<Text style={styles.textBreack}> No </Text>

          </View>
        </View>
        <View style={styles.mrt}>

        <Text style={styles.TextMain}>
            {' '}
            Gender
          </Text>
          <View
            style={{
              alignItems: 'center',
              //justifyContent: 'space-between',
              flexDirection: 'row',
              marginHorizontal: wp(3),
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
            <View style={{ marginLeft: wp(5) }}>
              <RadioButton
                value={inputs.radioGender}
                color="#032e63"
                uncheckedColor="#474747"
                status={
                  inputs.radioGender == 'Female' ? 'checked' : 'unchecked'
                }
                onPress={() => handleInputs('radioGender', 'Female')}
              /></View>

<Text style={styles.textBreack}>Female</Text>
            <View style={{ marginLeft: wp(5) }}>
              <RadioButton
                value={inputs.radioGender}
                color="#032e63"
                uncheckedColor="#474747"
                status={inputs.radioGender == 'Kids' ? 'checked' : 'unchecked'}
                onPress={() => handleInputs('radioGender', 'Kids')}
              /></View>

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
              marginHorizontal: wp(3),
              marginTop: wp(4),
              justifyContent: 'space-between',
            }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', }}>
              <View>
                <CheckBox
                  value={inputs.IsBestSeller}
                  onChange={() =>
                    handleInputs('IsBestSeller', !inputs.IsBestSeller)
                  }
                  tintColors={{ true: '#032e63', false: '#032e63' }}
                />
              </View>
              <Text style={{ fontSize: wp(4.5), color: '#000', fontWeight: '600' }}>
                Is Best Seller
              </Text>
            </View>
          </View>
        </View>

        {itemField?.lblDimension == 1 ? (
          <View style={{ marginHorizontal: wp(3), marginTop: wp(5) }}>
            <Text
              style={{
                fontSize: wp(4.5),
                fontWeight: '800',
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
              <View style={{ width: '45%' }}>
                <View
                  style={{
                    borderWidth: 1,
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
                    placeholderTextColor='#474747'
                    editable={itemField?.divWidth == 1 ? true : false}
                    style={{ fontSize: wp(4.5), fontWeight: '700', flex: 1, color: 'black', }}
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
                    }}>
                    <Text style={{ color: 'black', fontWeight: '700' }}>
                      {inputs.lblwidthUnit}
                    </Text>
                  </View>
                </View>
              </View>
              <View style={{ width: '45%' }}>
                <View
                  style={{
                    borderWidth: 1,
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
                    placeholderTextColor='#474747'
                    editable={itemField?.divHeight == 1 ? true : false}
                    style={{ fontSize: wp(4.5), fontWeight: '700', flex: 1, color: 'black', }}
                    value={inputs.txtProductHeight}
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
                    }}>
                    <Text style={{ color: 'black', fontWeight: '700' }}>
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
              <View style={{ width: '45%' }}>
                <View
                  style={{
                    borderWidth: 1,
                    borderRadius: wp(2),
                    height: hp(5.5),
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    overflow: 'hidden',
                    paddingLeft: wp(4.5),
                  }}>
                  <TextInput
                    placeholder="Thikness"
                    placeholderTextColor='#474747'
                    editable={itemField?.divBreadth == 1 ? true : false}
                    style={{ fontSize: wp(4.5), fontWeight: '700', flex: 1, color: 'black', }}
                    value={inputs.txtProductBreadth}
                    onChangeText={input =>
                      handleInputs('txtProductBreadth', input)
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
                    }}>
                    <Text style={{ color: 'black', fontWeight: '700' }}>
                      {inputs.lblBreadthUnit}
                    </Text>
                  </View>
                </View>
              </View>
              <View style={{ width: '45%' }}>
                <View
                  style={{
                    borderWidth: 1,
                    borderRadius: wp(2),
                    height: hp(5.5),
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    overflow: 'hidden',
                    paddingLeft: wp(4),
                  }}>

                  <TextInput
                    editable={itemField?.divSize == 1 ? true : false}
                    value={inputs.txtSize}
                    placeholder="Size"
                    placeholderTextColor='#474747'
                    onChangeText={input => handleInputs('txtSize', input)}
                    style={{ fontSize: wp(4.5), fontWeight: '700', flex: 1, color: 'black', }}
                  />
                  <View
                    style={{
                      borderLeftWidth: 1,
                      width: '30%',
                      height: '100%',
                      backgroundColor: 'lightgrey',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Text style={{ color: 'black', fontWeight: '700' }}>
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
            marginHorizontal: 10,
            marginTop: 15,
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity
            onPress={() => {
              setViewMetalModal(true);
            }}
            style={styles.btn}>
            <Text style={styles.txt2}>
              Metal Details
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setViewStoneModal(true);
            }}
            style={[styles.btn, { backgroundColor: '#032e63' }]}>
            <Text style={[styles.txt2, { color: 'white' }]}>
              Stone Details
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: 'row',
            marginHorizontal: wp(2),
            marginTop: wp(2),
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity
            onPress={() => {
              setViewDiamondModal(true);
            }}
            style={styles.btn}>
            <Text style={styles.txt2}>
              Diamond Details
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setViewDecorativeModal(true);
            }}
            style={[styles.btn, { backgroundColor: '#032e63', }]}>
            <Text style={[styles.txt2, { color: 'white', textAlign: 'center' }]}>
              Decorative item Details
            </Text>
          </TouchableOpacity>
        </View>

        <View style={{ marginHorizontal: 20, marginTop: 15 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={{ width: '48%' }}>
              <View style={{ marginHorizontal: 10, marginVertical: 10 }}>
                <Text style={styles.modelText}>
                  Decorative Wt.
                </Text>
              </View>
              <View
                style={{
                  borderWidth: 1,
                  borderRadius: wp(2),
                  height: hp(5.5),
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                <TextInput
                  placeholder={
                    inputs.DecorationGrandTotal
                      ? inputs.DecorationGrandTotal.toString() +
                      ' ' +
                      'Gms.'
                      : 'Decorative Wt.'
                  }

                  placeholderTextColor='#474747'
                  editable={false}
                  style={{ fontSize: wp(4), fontWeight: '700' }}
                />
              </View>
            </View>
            <View style={{ width: '48%' }}>
              <View style={{ marginHorizontal: 10, marginVertical: 10 }}>
              <Text style={styles.modelText}>
                  Gross Wt.
                </Text>
              </View>
              <View
                style={{
                  borderWidth: 1,
                  borderRadius: wp(2),
                  height: hp(5.5),
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                <TextInput
                  placeholder={GrossWt1 ? GrossWt1 : inputs.GrossWt ? inputs.GrossWt : 'Gross Wt.'}
                  placeholderTextColor='#474747'
                  editable={false}
                  style={{ fontSize: wp(4), fontWeight: '700' }}
                />
              </View>
            </View>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={{ width: '48%' }}>
              <View style={{ marginHorizontal: 10, marginVertical: 10 }}>
              <Text style={styles.modelText}>
                  Metal Wt.
                </Text>
              </View>
              <View
                style={{
                  borderWidth: 1,
                  borderRadius: wp(2),
                  height: hp(5.5),
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                <TextInput
                  placeholder={
                    inputs.MetalWtGrandTotal
                      ? inputs.MetalWtGrandTotal.toString() +
                      ' ' +
                      'Gms.'
                      : 'Metal Wt.'
                  }
                  placeholderTextColor='#474747'
                  // value={inputs.hMetalWt}
                  editable={false}
                  style={{ fontSize: wp(4), fontWeight: '700' }}
                />
              </View>
            </View>
            <View style={{ width: '48%' }}>
              <View style={{ marginHorizontal: 10, marginVertical: 10 }}>
              <Text style={styles.modelText}>
                  Diamond Wt.
                </Text>
              </View>
              <View
                style={{
                  borderWidth: 1,
                  borderRadius: wp(2),
                  height: hp(5.5),
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                <TextInput
                  placeholder={inputs.DiamondGrandTotal
                    ? inputs.DiamondGrandTotal +
                    ' ' +
                    'Gms.'
                    : 'Diamond Wt.'
                  }
                  placeholderTextColor='#474747'
                  // value={inputs.DiamondGrandTotal}
                  editable={false}
                  style={{ fontSize: wp(4), fontWeight: '700' }}
                />
              </View>
            </View>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={{ width: '48%' }}>
              <View style={{ marginHorizontal: 10, marginVertical: 10 }}>
              <Text style={styles.modelText}>
                  Stone Wt.
                </Text>
              </View>
              <View
                style={{
                  borderWidth: 1,
                  borderRadius: wp(2),
                  height: hp(5.5),
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                <TextInput
                  placeholder={
                    inputs.StoneGrandTotal
                      ? inputs.StoneGrandTotal + ' ' + 'Gms.'
                      : 'Stone Wt.'
                  }
                  placeholderTextColor='#474747'
                  editable={false}
                  style={{ fontSize: wp(4), fontWeight: '700' }}
                />
              </View>
            </View>
            <View style={{ width: '48%' }}>
              <View style={{ marginHorizontal: 10, marginVertical: 10 }}>
              <Text style={styles.modelText}>
                  Verify Wt.
                </Text>
              </View>
              <TouchableOpacity
                style={{
                  borderWidth: 1,
                  borderRadius: wp(2),
                  height: hp(5.5),
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'green'
                }}
                onPress={() => VeryFy1()}
              >
                {/* <TextInput
                  placeholder="Decorative Wt."
                  style={{ fontSize: wp(4), fontWeight: '700' }}
                /> */}
                <Text
                  style={{ fontSize: wp(5), fontWeight: '500', color: 'white' }}>
                  Verify Wt.
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={{ width: '90%', marginTop: wp(2), alignSelf: 'center' }}>
          <Text
            style={{
              alignSelf: 'center',
              color: msg?.error ? 'red' : 'green',
              fontSize: wp(3),
              fontWeight: '800',
            }}>
            {msg?.VeryFy}
          </Text>
        </View>
        <View style={{ marginVertical: 20 }}>
          {inputs.radioPriceCalculator == 0 ? (
            <>
              <View style={styles.mrt}>
              <Text style={styles.TextMain}>
                  {' '}
                  Chargeable amount for Labour
                </Text>
              </View>
              <View
                style={{
                  alignItems: 'center',
                  flexDirection: 'row',
                  marginHorizontal: wp(1),
                }}>
                <RadioButton
                  value={inputs.radioIsWastage}
                  color="#032e63"
                  uncheckedColor="#474747"
                  status={inputs.radioIsWastage == 0 ? 'checked' : 'unchecked'}
                  onPress={() => handleInputs('radioIsWastage', 0)}
                />
                <Text style={{ fontSize: wp(3), fontWeight: '600',color:'#474747' }}>
                  Charges Per Gram Rs
                </Text>
                <View style={{ marginLeft: wp(2) }}>
                  <RadioButton
                    value={inputs.radioIsWastage}
                    color="#032e63"
                    uncheckedColor="#474747"
                    status={
                      inputs.radioIsWastage == 1 ? 'checked' : 'unchecked'
                    }
                    onPress={() => handleInputs('radioIsWastage', 1)}
                  // status={checked === 'Gold' ? 'checked' : 'unchecked'}
                  // onPress={() => setChecked('Gold')}
                  />
                </View>

                <Text style={{ fontSize: wp(3), fontWeight: '600',color:'#474747' }}>
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
             <Text style={styles.TextMain}>
                {' '}
                {inputs.radioIsWastage == 1
                  ? 'Wastage % between 0-100'
                  : 'Amount in Rs.'}
              </Text>

              <View
                style={{
                  borderWidth: 1,
                  height: hp(5.5),
                  borderRadius: wp(2),
                  marginTop: wp(2),
                  paddingHorizontal: 5,
                  marginHorizontal: wp(3),
                }}>
                  <TextInput style={{color:'#474747'}}
                  value={inputs.txtLabourCharges}
                  onChangeText={input => {
                    handleInputs('txtLabourCharges', input);
                  }}
                  placeholder={
                    inputs.radioIsWastage
                      ? 'Wastage % between 0-100'
                      : 'Amount in Rs.'
                  }
                  placeholderTextColor='#474747'
                />
              </View>
            </>
          ) : null}
          {
            //Chargeable amount for Product RS
          }
          <View style={{ marginTop: wp(3) }}>
          <Text style={styles.TextMain}>
              {' '}
              {inputs.radioPriceCalculator == 0
                ? 'Chargeable amount for Product RS'
                : 'Specify MRP pricing * '}
            </Text>
            <View
              style={{
                borderWidth: 1,
                height: hp(5.5),
                borderRadius: wp(2),
                marginTop: wp(2),
                paddingHorizontal: 5,
                marginHorizontal: wp(3)
              }}>
              <TextInput style={{color:'#474747'}}
                editable={inputs.radioPriceCalculator == 1 ? true : false}
                value={
                  inputs.radioPriceCalculator == 0
                    ? inputs.txtProductCharges
                    : inputs.txtMrp
                }
               
                onChangeText={input =>
                  handleInputs(
                    inputs.radioPriceCalculator == 0
                      ? 'txtProductCharges'
                      : 'txtMrp',
                    input,
                  )
                }
                placeholder={'0.00'}
                placeholderTextColor='#474747'
              />

            </View>
          </View>
          {
            //CERTIFICATION DETAILS
          }
          <View style={{ marginTop: wp(3.5) }}>

          <Text style={styles.TextMain}>
              {' '}
              CERTIFICATION DETAILS
            </Text>
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
            <View style={{ marginHorizontal: wp(3) }}>
              <Dropdown
                style={[styles.dropdown, { borderWidth: 1 }]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                iconStyle={styles.iconStyle}
                data={DropData2}
                itemTextStyle={{color:'#474747'}}
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
                <Text
                  style={{
                    marginLeft: wp(3),
                    fontSize: wp(4.5),
                    marginTop: wp(2),
                    fontWeight: 'bold',
                    color: 'black',
                  }}>
                  Certification agency
                </Text>
                <View
                  style={{
                    borderWidth: 1,
                    height: hp(5.5),
                    borderRadius: wp(2),
                    marginTop: wp(2),
                    paddingHorizontal: 5,
                    marginHorizontal: wp(3),
                  }}>
                   <TextInput style={{color:'#474747'}}
                     autoCapitalize = {"characters"}
                    value={inputs.ProductCertifiedBy}
                    onChangeText={input =>
                      handleInputs('ProductCertifiedBy', input)
                    }
                    placeholderTextColor='#474747'
                    placeholder="Certification agency"
                  />
                </View>
              </>
            ) : null}
          </View>

          <TouchableOpacity
            onPress={() => uploadImage()}
            style={styles.upload}>
            <Entypo name="upload" size={20} color={'#032e63'} />
            <Text style={{ color: '#032e63', fontWeight: '700', fontSize: wp(4) }}>
              Upload Images 6
            </Text>
          </TouchableOpacity>

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
              renderItem={({ item, index }) => (
                <Image
                  style={{
                    height: hp(15),
                    width: wp(30),
                    alignSelf: 'center',
                    marginHorizontal: wp(1),
                  }}
                  source={{ uri: item.uri }}
                />
              )}
            />
          </View>
        </View>

        <View style={{ marginHorizontal: wp(3), marginTop: 0 }}>
        <Text style={styles.TextMain}>
            CHOOSE CATEGORIES TO PRODUCT
          </Text>
          <Text style={{ fontSize: wp(3), fontWeight: '800', color: 'grey' }}>
            (DEFINE TABS:- TICKS MARK ALL THE TABS WHERE YOU WANT THIS JEWELLERY
            TO APPEAR IN CLINT SEARCH)
          </Text>
        </View>
        <View style={{ marginTop: wp(3.5) }}>
          <FlatList
            data={productType?.category}
            renderItem={({ item }) => (

              <TouchableOpacity
                activeOpacity={1}
                // onPress={() => handleCategorysub(item.SrNo)}
                style={{ marginVertical: 5 }}>
                <View style={{
                  marginHorizontal: 20,
                  borderBottomWidth: 0,
                  marginTop: 5,
                  height: 40,
                  backgroundColor: '#032E63',
                }}>
                  <Text style={{
                    fontSize: 20, fontWeight: '700',
                    marginLeft: 10,
                    color: '#fff'
                  }}>{item.Name}</Text>
                </View>
                <View
                  style={{
                    marginHorizontal: 20,
                    borderWidth: 2,
                    borderBottomWidth: 0,


                  }}>
                  <Dropdown
                    style={{ borderBottomWidth: 2, height: 40 }}
                    placeholderStyle={[
                      styles.placeholderStyle,
                      { fontWeight: '800', fontSize: 18, marginLeft: 10, color: '#000' },
                    ]}
                    selectedTextStyle={[
                      styles.selectedTextStyle,
                      { fontSize: 18, fontWeight: '700', color: '#000', marginLeft: 10 },
                    ]}
                    iconStyle={{ width: 30, height: 30 }}
                    data={item.subcategory}
                    maxHeight={200}
                    labelField="Name"
                    valueField="Name"
                    placeholder="Select"
                    value={inputs.chk_sc}
                    renderItem={renderItem}
                    itemTextStyle={{ fontSize: 18, fontWeight: '700', color: '#000' }}         
                  />
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
        <View style={{ marginHorizontal: 10, marginTop: 15 }}>
        <Text style={styles.TextMain}>
            CHOOSE CATEGORIES TO PRODUCT
          </Text>
          <Text style={{ fontSize: wp(4), fontWeight: '800', color: 'grey' }}>
            (DEFINE TABS:- TICKS MARK ALL THE TABS WHERE YOU WANT THIS JEWELLERY
            TO APPEAR IN CLINT SEARCH)
          </Text>
        </View>
        <View>
          {productType?.collection &&
            <FlatList
              data={productType?.collection}
              renderItem={({ item }) => (
                <View
                  style={{
                    marginHorizontal: 20,
                    borderWidth: 2,
                    marginTop: 15,
                    borderBottomWidth: 0,
                  }}>
                  <View
                    style={{
                      borderBottomWidth: 2,
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
                          handleInputs('chk_c', [...inputs.chk_c, item.SrNo]);
                        }
                      }}
                      value={inputs?.chk_c?.includes(item.SrNo) ? true : false}
                      tintColors={{ true: '#032e63', false: '#032e63' }}

                    />
                    <Text
                      style={{
                        fontSize: 18,
                        marginLeft: 5,
                        fontWeight: '700',
                        color: '#000',
                      }}>
                      {item.Name}
                    </Text>
                  </View>
                </View>
              )}
            />
          }
        </View>

        <View style={{ marginHorizontal: 20, marginTop: 15 }}>
          <TouchableOpacity onPress={() => AddProduct2()}
            style={{
              height: 40,
              borderRadius: 30,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#032e63',
            }}>
            <Text style={{ fontSize: 18, color: 'white', fontWeight: '600' }}>
              {prodcutfile ? 'Update Product' : 'Add Product'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              height: 40,
              borderRadius: 30,
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 15,
              backgroundColor: '#666564',
            }}>
            <Text style={{ fontSize: 18, color: 'white', fontWeight: '600' }}>
              Cancel
            </Text>
          </TouchableOpacity>

        </View>

      </ScrollView>
    </View>
  )
}

export default AddProducts;
const DropData = [
  { label: 'Yes', value: 1 },
  { label: 'No', value: 2 },

];
const DropData2 = [
  { label: 'Yes', value: 1 },
  { label: 'No', value: 0 },
];
const live = [
  { label: 'Live', value: 'Live' },
  { label: 'Catalog', value: 'Catalog' },
];





