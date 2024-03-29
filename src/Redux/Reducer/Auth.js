import { Item } from 'react-native-paper/lib/typescript/components/List/List';
import Addproduct from '../../screens/Main/Addproduct';

initialstate = {
  isFetching: false,
  Login1: '',
  Collection: [],
  partnerprofile:[],
  City:[],
  Gold: [],
  SupplierList: [],
  ProductList: [],
  Categories: [],
  ProductDetail: [],
  SupplierCategories: [],
  SupplierProduct: [],
  SupplierProDetail: [],
  Statelist: [],
  Pending: [],
  sentRequest: [],
  Acecpt: '',
  Reject: '',
  SupplierDetail: [],
  WishList: [],
  BannerList: [],
  AddCollection: '',
  AddWishlist: '',
  AddWishlist1: '',
  RemoWishlist: [],
  patnerContact: [],
  GetMessage: [],
  SentMessage: [],
  Status: 1,
  addTonetwork: '',
  deletData: [],
  deletData1: [],
  network_id: [],
  mg: false,
  RemoveFromNetwork: '',
  ProductItem: [],
  AddMetal: {},
  session: '',
  AddDaimond: {},
  AddStone: {},
  Decorative1: {},
  GrossWt1: '',
  VeryFy: '',
  Itemfield1: {},
  EditProduct: [],
  HproductSrNo: '',
  productEdit: false,
  Notification:[],
  datadelete: {
    decorative: false,
    stone: false,
    metal: false,
    diamond: false,
  },
Collectionimg:[],
};
export default (state = initialstate, action) => {
  switch (action.type) {

    case 'User_mg_Success':
      return { ...state, isFetching: false, mg: action.payload };

    case 'product_session_Success':
      return { ...state, isFetching: false, session: action.payload }; 

      Get_getCities_Request
      case 'Get_getCities_Request':
        return { ...state, isFetching: true };
      case 'Get_getCities_Success':
        return { ...state, isFetching: false, City: action.payload };
      case 'Get_getCities_Error':
        return { ...state, isFetching: false };


      case 'User_editProfile_Request':
        return { ...state, isFetching: true };
      case 'User_editProfile_Success':
        return { ...state, isFetching: false, partnerprofile: action.payload };
      case 'User_editProfile_Error':
        return { ...state, isFetching: false };

      case 'Get_creativeImgList_Request':
        return { ...state, isFetching: true };
      case 'Get_creativeImgList_Success':
        return { ...state, isFetching: false, Collectionimg: action.payload };
      case 'Get_creativeImgList_Error':
        return { ...state, isFetching: false };

    case 'User_removeNetworkSupplier_Request':
      return { ...state, isFetching: true };
    case 'User_removeNetworkSupplier_Success':
      return { ...state, isFetching: false, RemoveFromNetwork: action.payload };
    case 'User_removeNetworkSupplier_Error':
      return { ...state, isFetching: false };

    case 'product_addMetal_Request':
      return { ...state, isFetching: true };
    case 'product_addMetal_Success':
      return { ...state, isFetching: false, AddMetal: action.payload, GrossWt1: action.GrossWt1 };
    case 'product_addMetal_Error':
      return { ...state, isFetching: false };

    case 'product_addDiamond_Request':
      return { ...state, isFetching: true };
    case 'product_addDiamond_Success':
      return { ...state, isFetching: false, AddDaimond: action.payload };
    case 'product_addDiamond_Error':
      return { ...state, isFetching: false };


    case 'product_addDecorative_Request':
      return { ...state, isFetching: true };
    case 'product_addDecorative_Success':
      return { ...state, isFetching: false, Decorative1: action.payload };
    case 'product_addDecorative_Error':
      return { ...state, isFetching: false };


    case 'product_addStone_Request':
      return { ...state, isFetching: true };
    case 'product_addStone_Success':
      return { ...state, isFetching: false, AddStone: action.payload };
    case 'product_addStone_Error':
      return { ...state, isFetching: false };



    case 'product_createProduct_Request':
      return { ...state, isFetching: true };
    case 'product_createProduct_Success':
      return { ...state, isFetching: false, AddProduct1: action.payload };
    case 'product_createProduct_Error':
      return { ...state, isFetching: false };


    case 'product_verifyWt_Request':
      return { ...state, isFetching: true };
    case 'product_verifyWt_Success':
      return { ...state, isFetching: false, VeryFy: { VeryFy: action.payload, error: false } };
    case 'product_verifyWt_Error1':
      return { ...state, isFetching: false, VeryFy: { VeryFy: action.payload, error: true } };

    case 'product_verifyWt_Error':
      return { ...state, isFetching: false };


    case 'get_itemfieldlist_request':
      return { ...state, isFetching: true };
    case 'get_itemfieldlist_Success':

      return { ...state, isFetching: false, Itemfield1: action.payload };
    case 'get_itemfieldlist_Error':
      return { ...state, isFetching: false };



    case 'product_TypeList_Request':
      return { ...state, isFetching: true };
    case 'product_TypeList_Success':

      return { ...state, isFetching: false, ProductItem: action.payload };
    case 'product_TypeList_Error':
      return { ...state, isFetching: false };

    case 'User_Login_Request':
      return { ...state, isFetching: true };
    case 'User_Login_Success':
      return { ...state, isFetching: false, Login1: action.payload };
    case 'User_Login_Error':
      return { ...state, isFetching: false };

    case 'User_sendRequestToSupplier_Request':
      return { ...state, isFetching: true };
    case 'User_sendRequestToSupplier_Success':
      return { ...state, isFetching: false, addTonetwork: action.payload };
    case 'User_sendRequestToSupplier_Error':
      return { ...state, isFetching: false };

    case 'User_getBannerList_Request':
      return { ...state, isFetching: true };
    case 'User_getBannerList_Success':
      return { ...state, isFetching: false, BannerList: action.payload };
    case 'User_getBannerList_Error':
      return { ...state, isFetching: false };

    case 'Patner_Contact_Request':
      return { ...state, isFetching: true };
    case 'Patner_Contact_Success':
      return { ...state, isFetching: false, patnerContact: action.payload };
    case 'Patner_Contact_Error':
      return { ...state, isFetching: false };


    case 'get_Message_Request':
      return { ...state, isFetching: true };
    case 'get_Message_Success':
      return { ...state, isFetching: false, GetMessage: action.payload };
    case 'get_Message_Error':
      return { ...state, isFetching: false };

    case 'Message_Send_Request':
      return { ...state, isFetching: true };
    case 'Message_Send_Success':
      return { ...state, isFetching: false, SentMessage: action.payload };
    case 'Message_Send_Error':
      return { ...state, isFetching: false };



    case 'User_editProduct_Request':
      return { ...state, isFetching: true };
    case 'User_editProduct_Success':

      
      return {
        ...state, isFetching: false,
        EditProduct: action.payload,
        AddMetal: { result: action.payload?.productdetails?.pmetals },
        GrossWt1: action.payload?.products?.GrossWt,
        AddDaimond: { result: action.payload?.productdetails?.pdiamond },
        AddStone: { result: action.payload?.productdetails?.pstones },
        Decorative1: { result: action.payload?.productdetails?.pdecoration },
        HproductSrNo: action.payload?.products?.SrNo,
        productEdit: action.productEdit,

      };
    case 'User_editProduct_Error':
      return { ...state, isFetching: false };
    case 'is_product_edit':
      return { ...state, productEdit: action.payload };



    case 'product_removeMetal_Request':
      return { ...state, isFetching: true };
    case 'product_removeMetal_Success':

      let newdata = state.AddMetal?.result?.filter(
        item => item.SrNo != action.payload
      )
      return {
        ...state, isFetching: false,
        AddMetal: { result: newdata },
        datadelete: {
          decorative: false,
          stone: false,
          metal: true,
          diamond: false,
        },
      };
    case 'product_removeMetal_Error':
      return { ...state, isFetching: false };


    case 'product_removeDiamond_Request':
      return { ...state, isFetching: true };
    case 'product_removeDiamond_Success':

      let newdata1 = state.AddDaimond?.result?.filter(
        item => item.SrNo != action.payload
      )
      return {
        ...state, isFetching: false,
        AddDaimond: { result: newdata1 },
        datadelete: {
          decorative: false,
          stone: false,
          metal: false,
          diamond: true,
        },
      };
    case 'product_removeDiamond_Error':
      return { ...state, isFetching: false };



    case 'product_removeDecorative_Request':
      return { ...state, isFetching: true };
    case 'product_removeDecorative_Success':

      let newdata2 = state.Decorative1?.result?.filter(
        item => item.SrNo != action.payload
      )
      return {
        ...state, isFetching: false,
        Decorative1: { result: newdata2 },
        datadelete: {
          decorative: true,
          stone: false,
          metal: false,
          diamond: false,
        },
      };
    case 'product_removeDecorative_Error':
      return { ...state, isFetching: false };




    case 'product_removeStone_Request':
      return { ...state, isFetching: true };
    case 'product_removeStone_Success':

      let newdata3 = state.AddStone?.result?.filter(
        item => item.SrNo != action.payload
      )
      return {
        ...state, isFetching: false,
        AddStone: { result: newdata3 },
        datadelete: {
          decorative: false,
          stone: true,
          metal: false,
          diamond: false,
        },
      };
    case 'product_removeStone_Error':
      return { ...state, isFetching: false };

    case 'User_collection_Request':
      return { ...state, isFetching: true };
    case 'User_collection_Success':
      return { ...state, isFetching: false, Collection: action.payload };
    case 'User_collection_Error':
      return { ...state, isFetching: false };

    case 'User_Gold_Request':
      return { ...state, isFetching: true };
    case 'User_Gold_Success':
      return { ...state, isFetching: false, Gold: action.payload };
    case 'User_Gold_Error':
      return { ...state, isFetching: false };

    case 'User_SupplierList_Request':
      return { ...state, isFetching: true };
    case 'User_SupplierList_Success':
      return { ...state, isFetching: false, SupplierList: action.payload };
    case 'User_SupplierList_Error':
      return { ...state, isFetching: false };

    case 'User_ProductList_Request':
      return { ...state, isFetching: true };
    case 'User_ProductList_Success':
      return { ...state, isFetching: false, ProductList: action.payload };
    case 'User_ProductList_Error':
      return { ...state, isFetching: false };

    case 'User_addProductWishlist_Request':
      return { ...state, isFetching: true };
    case 'User_addProductWishlist_Success':
      return { ...state, isFetching: false, AddWishlist: action.payload };
    case 'User_addProductWishlist_Error':
      return { ...state, isFetching: false };


    case 'User_addProductWishlist1_Request':
      return { ...state, isFetching: true };
    case 'User_addProductWishlist1_Success':
      return { ...state, isFetching: false, AddWishlist1: action.payload };
    case 'User_addProductWishlist1_Error':
      return { ...state, isFetching: false };


    case 'User_categories_Request':
      return { ...state, isFetching: true };
    case 'User_categories_Success':
      return { ...state, isFetching: false, Categories: action.payload };
    case 'User_categories_Error':
      return { ...state, isFetching: false };

    case 'User_singleProductDetail_Request':
      return { ...state, isFetching: true };
    case 'User_singleProductDetail_Success':
      return { ...state, isFetching: false, ProductDetail: action.payload };
    case 'User_singleProductDetail_Error':
      return { ...state, isFetching: false };

    case 'User_SupplierCategories_Request':
      return { ...state, isFetching: true };
    case 'User_SupplierCategories_Success':
      return { ...state, isFetching: false, SupplierCategories: action.payload };
    case 'User_SupplierCategories_Error':
      return { ...state, isFetching: false };

    case 'User_SupplierProductList_Request':
      return { ...state, isFetching: true };
    case 'User_SupplierProductList_Success':
      return { ...state, isFetching: false, SupplierProduct: action.payload };
    case 'User_SupplierProductList_Error':
      return { ...state, isFetching: false };

    case 'User_SupplierProDetail_Request':
      return { ...state, isFetching: true };
    case 'User_SupplierProDetail_Success':
      return { ...state, isFetching: false, ProductDetail: action.payload };
    case 'User_SupplierProDetail_Error':
      return { ...state, isFetching: false };

    case 'Get_State_Request':
      return { ...state, isFetching: true };
    case 'Get_State_Success':
      return { ...state, isFetching: false, Statelist: action.payload };
    case 'Get_State_Error':
      return { ...state, isFetching: false };

    case 'Get_Pending_Request':
      return { ...state, isFetching: true };
    case 'Get_Pending_Success':
      return { ...state, isFetching: false, Pending: action.payload };
    case 'Get_Pending_Error':
      return { ...state, isFetching: false };

    case 'Get_Sent_Request':
      return { ...state, isFetching: true };
    case 'Get_Sent_Success':
      return { ...state, isFetching: false, sentRequest: action.payload };
    case 'Get_Sent_Error':
      return { ...state, isFetching: false };

    case 'Get_updateSupplierRequest_Request':
      return { ...state, isFetching: true };
    case 'Get_updateSupplierRequest_Success':
      return { ...state, isFetching: false, Acecpt: action.payload };
    case 'Get_updateSupplierRequest_Error':
      return { ...state, isFetching: false };

    case 'Get_updateSupplierRequest1_Request':
      return { ...state, isFetching: true };
    case 'Get_updateSupplierRequest1_Success':
      return { ...state, isFetching: false, Reject: action.payload };
    case 'Get_updateSupplierRequest1_Error':
      return { ...state, isFetching: false };

    case 'User_supplierDetail_Request':
      return { ...state, isFetching: true };
    case 'User_supplierDetail_Success':

      return { ...state, isFetching: false, SupplierDetail: action.payload, Status: action.Status, network_id: action.network_id };
    case 'User_supplierDetail_Error':
      return { ...state, isFetching: false };


    case 'Get_delete_Success':
      return { ...state, isFetching: false, deletData: action.payload };
    case 'Get_delete1_Success':
      return { ...state, isFetching: false, deletData1: action.payload };


    case 'Get_wishListProduct_Request':
      return { ...state, isFetching: true };
    case 'Get_wishListProduct_Success':
      return { ...state, isFetching: false, WishList: action.payload };
    case 'Get_wishListProduct_Error':
      return { ...state, isFetching: false };

    case 'Get_removeProductWishlist_Request':
      return { ...state, isFetching: true };
    case 'Get_removeProductWishlist_Success':
      return { ...state, isFetching: false, RemoWishlist: action.payload };
    case 'Get_removeProductWishlist_Error':
      return { ...state, isFetching: false };

    case 'Add_Collection_Request':
      return { ...state, isFetching: true };
    case 'Add_Collection_Success':
      return { ...state, isFetching: false, AddCollection: action.payload };
    case 'Add_Collection_Error':
      return { ...state, isFetching: false };

      case 'Get_pushNotificationList_Request':
        return { ...state, isFetching: true };
      case 'Get_pushNotificationList_Success':
        return { ...state, isFetching: false, Notification: action.payload };
      case 'Get_pushNotificationList_Error':
        return { ...state, isFetching: false };

    default:
      return state;
  }
};
