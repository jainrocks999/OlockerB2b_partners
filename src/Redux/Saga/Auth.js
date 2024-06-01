import {Alert, ToastAndroid, YellowBox} from 'react-native';
import {takeEvery, put, call} from 'redux-saga/effects';
import Api from '../Api';
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Add WishList  partner
function* AddwishList(action) {
  try {
    const data = new FormData();
    data.append('checkProduct', action.checkProduct);
    data.append('PartnerSrNo', action.PartnerSrNo);
    data.append('userType', action.userType);
    const response = yield call(
      Api.fetchDataByPOST1,
      action.url,
      data,
      action.Token,
    );

    if (response.status == true) {
      yield put({
        type: 'User_addProductWishlist_Success',
        payload: response,
      });
      yield put({
        type: 'User_mg_Success',
        payload: action.mg,
      });

      if (!action.iscollection) {
        if (action.partner) {
          yield put({
            type: 'User_ProductList_Success',
            payload: {list: action.Data},
          });

          // yield put({
          //   type: 'User_ProductList_Request',
          //   url: 'partners/productTypeProducts',
          //   userId: action.PartnerSrNo,
          //   userType: 'partner',
          //   typeId: action.id,
          //   Token: action.Token,
          //   name: action.name,
          //   login_user_id: action.PartnerSrNo,
          //   login_user_type: 'partner',
          //   start: action.start,
          //   limit: action.limit,
          //   navigation: action.navigation,
          //   page: action.page,
          // });
          if (action.collection_id) {
            // Alert.alert(action.collection_id.toStri)
            yield put({
              type: 'User_collectionProductViewList_Request',
              url: 'partners//collectionProductViewList',
              collection_id: action.collection_id,
              login_user_id: action.PartnerSrNo,
              login_user_type: 'partner',
              Token: action.Token,
              name: false,
              navigation: false,
            });
          }
        } else {
          yield put({
            type: 'User_ProductList_Success',
            payload: {list: action.Data},
          });

          // yield put({
          //   type: 'User_SupplierProductList_Request',
          //   url: 'partners/productTypeProducts',
          //   userId: action.supllier,
          //   userType: 'supplier',
          //   typeId: action.id,
          //   Token: action.Token,
          //   name: action.name,
          //   login_user_id: action.PartnerSrNo,
          //   login_user_type: 'partner',
          //   navigation: action.navigation,
          //   start: action.start,
          //   limit: action.limit,
          //   page: action.page,
          // });
        }
      } else {
        yield put({
          type: 'User_collectionProductViewList_Request',
          url: 'partners//collectionProductViewList',
          collection_id: action.collectionid,
          login_user_id: action.PartnerSrNo,
          login_user_type: action.userType,
          Token: action.Token,
          name: action.name,
          navigation: false,
        });
      }
      // if (action && action.navigation) {
      //   action.navigation.navigate('FavDetails',)
      // }

      Toast.show(response.msg);
    } else {
      yield put({
        type: 'User_addProductWishlist_Error',
      });
      Toast.show(response.msg);
    }
  } catch (error) {
    Toast.show(response.msg);
    yield put({
      type: 'User_addProductWishlist_Error',
    });
  }
}

// Add WishList  Supplier
function* AddwishList1(action) {
  try {
    const data = new FormData();
    data.append('checkProduct', action.checkProduct);
    data.append('PartnerSrNo', action.PartnerSrNo);
    data.append('userType', action.userType);

    const response = yield call(
      Api.fetchDataByPOST1,
      action.url,
      data,
      action.Token,
    );

    if (response.status == true) {
      yield put({
        type: 'User_addProductWishlist1_Success',
        payload: response,
      });
      // action.navigation.navigate('FavDetails', { FavDAta: false })
      Toast.show(response.msg);
    } else {
      yield put({
        type: 'User_addProductWishlist1_Error',
      });
      Toast.show(response.msg);
    }
  } catch (error) {
    yield put({
      type: 'User_addProductWishlist1_Error',
    });
  }
}

//Login
function* doLogin(action) {
  try {
    const data = {
      email: action.email,
      password: action.password,
      fcm_token: action.fcm_token,
    };

    const response = yield call(Api.fetchDataByGET, action.url, data);

    if (response.status == true) {
      yield put({
        type: 'User_Login_Success',
        payload: response,
      });

      AsyncStorage.setItem('Partnersrno', response.id);
      AsyncStorage.setItem('loginToken', response.token);
      AsyncStorage.setItem('Branch', response.branch_id);
      AsyncStorage.setItem('userEmail', action.email);
      action.navigation.replace('Home');
      // Toast.show(response.message);
    } else {
      yield put({
        type: 'User_Login_Error',
      });
      Toast.show(response.message);
    }
  } catch (error) {
    yield put({
      type: 'User_Login_Error',
    });
    Toast.show('something went wrong');
  }
}
// Collection
function* getCollection(action) {
  try {
    const data = {
      partnerId: action.partnerId,
    };
    const response = yield call(
      Api.fetchDataByGET1,
      action.url,
      action.Token,
      data,
    );
    if (response.status == true) {
      yield put({
        type: 'User_collection_Success',
        payload: response.collection,
      });
    } else {
      yield put({
        type: 'User_collection_Error',
      });
    }
  } catch (error) {
    yield put({
      type: 'User_collection_Error',
    });
    Toast.show(error);
  }
}
// Gold price
function* getGold(action) {
  try {
    const data = {
      partnerId: action.partnerId,
    };
    const response = yield call(
      Api.fetchDataByGET1,
      action.url,
      action.Token,
      data,
    );
    if (response.status == true) {
      yield put({
        type: 'User_Gold_Success',
        payload: response,
      });
    } else {
      yield put({
        type: 'User_Gold_Error',
      });
    }
  } catch (error) {
    yield put({
      type: 'User_collection_Error',
    });
    Toast.show(error);
  }
}
// Supplier List
function* SupplierList(action) {
  try {
    const data = {
      partnerId: action.partnerId,
    };
    const response = yield call(
      Api.fetchDataByGET1,
      action.url,
      action.Token,
      data,
    );
    if (response.status == true) {
      yield put({
        type: 'User_SupplierList_Success',
        payload: response,
      });
    } else {
      yield put({
        type: 'User_SupplierList_Error',
      });
    }
  } catch (error) {
    yield put({
      type: 'User_SupplierList_Error',
    });
    Toast.show(error);
  }
}

function* collectionProdcut(action) {
  try {
    const data = {
      collection_id: action.collection_id,
      login_user_id: action.login_user_id,
      login_user_type: action.login_user_type,
    };
    const response = yield call(
      Api.fetchDataByGET1,
      action.url,
      action.Token,
      data,
    );
    if (response.status == true) {
      yield put({
        type: 'User_collectionProductViewList_Success',
        payload: response,
      });
      if (action.navigation) {
        action.navigation.navigate('collectionproductlist', {
          name: action.name,
        });
      }
      // if (action.page != 'data') {
      //   action.navigation.navigate('MyProductDetails', {
      //     name: action.name,
      //     ProductL: true,
      //     id: action.typeId
      //   });
      // }
    } else {
      yield put({
        type: 'User_collectionProductViewList_Error',
      });
    }
  } catch (error) {
    yield put({
      type: 'User_collectionProductViewList_Error',
    });
    Toast.show(error);
  }
}

// my Product list
function* ProductList(action) {
  try {
    const data = {
      userId: action.userId,
      userType: action.userType,
      typeId: action.typeId,
      login_user_id: action.login_user_id,
      login_user_type: action.login_user_type,
      start: action.start,
      limit: action.limit,
    };
    const response = yield call(
      Api.fetchDataByGET1,
      action.url,
      action.Token,
      data,
    );

    if (response.status == true) {
      yield put({
        type: 'User_ProductList_Success',
        payload: action.Data
          ? {...response, list: [...action.Data, ...response.list]}
          : response,
      });
      yield put({
        type: 'Product_limit',
        payload: action.start,
      });

      // if (action.page == 'data') {
      //   action.navigation.navigate('MyProductDetails', {

      //     ProductL:false,
      //     // id: action.typeId,
      //   });
      // }
    } else {
      Toast.show(response.msg);
      yield put({
        type: 'User_ProductList_Error',
      });
    }
  } catch (error) {
    yield put({
      type: 'User_ProductList_Error',
    });
    Toast.show(error);
  }
}
//SupplierProductList

function* SupplierProductList(action) {
  try {
    const data = {
      userId: action.userId,
      userType: action.userType,
      typeId: action.typeId,
      login_user_id: action.login_user_id,
      login_user_type: action.login_user_type,
      start: action.start,
      limit: action.limit,
    };
    const response = yield call(
      Api.fetchDataByGET1,
      action.url,
      action.Token,
      data,
    );
    if (response.status == true) {
      yield put({
        type: 'User_SupplierProductList_Success',
        payload: action.Data
          ? {...response, list: [...action.Data, ...response.list]}
          : response,
      });
      yield put({
        type: 'Product_limit',
        payload: response.list.length <= 0 ? action.start - 20 : action.start,
      });

      if (action.page != 'data') {
        action.navigation.navigate('MyProductDetails', {
          name: action.name,
          ProductL: false,
          id: action.typeId,
          supplierId: action.userId,
        });
      }
    } else {
      Toast.show(response.msg);
      yield put({
        type: 'User_SupplierProductList_Error',
      });
    }
  } catch (error) {
    yield put({
      type: 'User_SupplierProductList_Error',
    });
    Toast.show(error);
  }
}

//Supplier Categories

function* SupplierCategories(action) {
  try {
    const data = {
      userId: action.userId,
      userType: action.userType,
    };
    const response = yield call(
      Api.fetchDataByGET1,
      action.url,
      action.Token,
      data,
    );
    if (response.status == true) {
      yield put({
        type: 'User_SupplierCategories_Success',
        payload: response,
      });

      // AsyncStorage.setItem('ImagePath', response.imagepath);
    } else {
      yield put({
        type: 'User_SupplierCategories_Error',
      });
    }
  } catch (error) {
    yield put({
      type: 'User_SupplierCategories_Error',
    });
    Toast.show(error);
  }
}

// My Product Categories
function* ProductCategories(action) {
  try {
    const data = {
      userId: action.userId,
      userType: action.userType,
    };
    const response = yield call(
      Api.fetchDataByGET1,
      action.url,
      action.Token,
      data,
    );
    if (response.status == true) {
      yield put({
        type: 'User_categories_Success',
        payload: response,
      });
      yield put({
        type: 'is_product_edit',
        payload: true,
      });

      // AsyncStorage.setItem('ImagePath', response.imagepath);
    } else {
      yield put({
        type: 'User_categories_Error',
      });
    }
  } catch (error) {
    yield put({
      type: 'User_categories_Error',
    });
    Toast.show(error);
  }
}

// my Product Details
function* ProductDetails(action) {
  try {
    const data = {
      userId: action.userId,
      userType: action.userType,
      productId: action.productId,
      login_user_id: action.login_user_id,
      login_user_type: action.login_user_type,
    };
    const response = yield call(
      Api.fetchDataByGET1,
      action.url,
      action.Token,
      data,
    );
    if (response.status == true) {
      yield put({
        type: 'User_singleProductDetail_Success',
        payload: response,
      });
      yield put({
        type: 'User_mg_Success',
        payload: action.mg,
      });

      action.navigation.navigate('SubCategory', {
        name: action.name,
        productId: action.productId,
        Details: action.part,
        collection_id: action?.collection_id ?? false,
      });
    } else {
      yield put({
        type: 'User_singleProductDetail_Error',
      });
    }
  } catch (error) {
    yield put({
      type: 'User_singleProductDetail_Error',
    });
    Toast.show(error);
  }
}

//SupplierProductDetails
function* SupplierProductDetails(action) {
  try {
    const data = {
      userId: action.userId,
      userType: action.userType,
      productId: action.productId,
      login_user_id: action.login_user_id,
      login_user_type: action.login_user_type,
    };
    const response = yield call(
      Api.fetchDataByGET1,
      action.url,
      action.Token,
      data,
    );
    if (response.status == true) {
      yield put({
        type: 'User_SupplierProDetail_Success',
        payload: response,
      });
      yield put({
        type: 'User_mg_Success',
        payload: action.mg,
      });
      action.navigation.navigate('SubCategory', {
        name: action.name,
        Details: false,
      });
    } else {
      yield put({
        type: 'User_SupplierProDetail_Error',
      });
    }
  } catch (error) {
    yield put({
      type: 'User_SupplierProDetail_Error',
    });
    Toast.show(error);
  }
}

// State List
function* StateList(action) {
  try {
    const data = {};
    const response = yield call(Api.fetchDataByGET1, action.url, action.Token);
    if (response.status == true) {
      yield put({
        type: 'Get_State_Success',
        payload: response,
      });
      // action.navigation.navigate('MyNetwork1', { screen: 'MyNetwork' })
    } else {
      yield put({
        type: 'Get_State_Error',
      });
    }
  } catch (error) {
    yield put({
      type: 'Get_State_Error',
    });
    Toast.show(error);
  }
}
// Pending Request
function* pendinRequest(action) {
  try {
    const data = {
      partnerId: action.partnerId,
    };
    const response = yield call(
      Api.fetchDataByGET1,
      action.url,
      action.Token,
      data,
    );
    if (response.status == true) {
      yield put({
        type: 'Get_Pending_Success',
        payload: response,
      });

      // action.navigation.navigate('PendingRequest');
    } else {
      yield put({
        type: 'Get_Pending_Error',
      });
    }
  } catch (error) {
    yield put({
      type: 'Get_Pending_Error',
    });
    Toast.show(error);
  }
}

// sent Request
function* SentRequest(action) {
  try {
    const data = {
      partnerId: action.partnerId,
    };
    const response = yield call(
      Api.fetchDataByGET1,
      action.url,
      action.Token,
      data,
    );
    if (response.status == true) {
      yield put({
        type: 'Get_Sent_Success',
        payload: response,
      });

      // action.navigation.navigate('SentRequest');
    } else {
      yield put({
        type: 'Get_Sent_Error',
      });
    }
  } catch (error) {
    yield put({
      type: 'Get_Sent_Error',
    });
    Toast.show(error);
  }
}

// Acecpt Reequest
function* AcecptRequest(action) {
  try {
    let data = new FormData();
    data.append('partnerId', action.partnerId);
    data.append('sp_networkId', action.sp_networkId);
    data.append('statusId', action.statusId);
    data.append('rejectReason', action.rejectReason);
    // const data = {
    //   partnerId: action.partnerId,
    //   sp_networkId: action.sp_networkId,
    //   statusId: action.statusId,
    // };
    const response = yield call(
      Api.fetchDataByGET3,
      action.url,
      action.Token,
      data,
    );
    if (response.status == true) {
      yield put({
        type: 'Get_/updateSupplierRequest_Success',
        payload: response,
      });

      //  action.navigation.navigate('SentRequest');
    } else {
      yield put({
        type: 'Get_/updateSupplierRequest_Error',
      });
    }
  } catch (error) {
    yield put({
      type: 'Get_/updateSupplierRequest_Error',
    });
    Toast.show(error);
  }
}

// Reject Reequest
function* RejectRequest(action) {
  try {
    let data = new FormData();
    data.append('partnerId', action.partnerId);
    data.append('sp_networkId', action.sp_networkId);
    data.append('statusId', action.statusId);
    data.append('rejectReason', action.rejectReason);
    // const data = {
    //   partnerId: action.partnerId,
    //   sp_networkId: action.sp_networkId,
    //   statusId: action.statusId,
    // };
    const response = yield call(
      Api.fetchDataByGET3,
      action.url,
      action.Token,
      data,
    );
    if (response.status == true) {
      yield put({
        type: 'Get_/updateSupplierRequest1_Success',
        payload: response,
      });

      //  action.navigation.navigate('SentRequest');
    } else {
      yield put({
        type: 'Get_/updateSupplierRequest1_Error',
      });
    }
  } catch (error) {
    yield put({
      type: 'Get_/updateSupplierRequest1_Error',
    });
    Toast.show(error);
  }
}
// Supplier Details
function* SupplierDetail(action) {
  try {
    const data = {
      supplierId: action.supplierId,
      partnerId: action.partnerId,
    };
    const response = yield call(
      Api.fetchDataByGET1,
      action.url,
      action.Token,
      data,
    );
    if (response.status == true) {
      yield put({
        type: 'User_supplierDetail_Success',
        payload: response,
        Status: action.Status,
      });

      action.navigation.navigate('MyNetwork1', {screen: 'PartnerProfile'});
    } else {
      yield put({
        type: 'User_supplierDetail_Error',
      });
    }
  } catch (error) {
    yield put({
      type: 'User_supplierDetail_Error',
    });
    Toast.show(error);
  }
}

// WishList Request

function* WishListRequest(action) {
  try {
    const data = {
      partnerId: action.partnerId,
      userType: action.userType,
    };
    const response = yield call(
      Api.fetchDataByGET12,
      action.url,
      action.Token,
      data,
    );

    if (response.status == true) {
      yield put({
        type: 'Get_wishListProduct_Success',
        payload: response.data,
      });

      // action.navigation.navigate('MyNetwork1', { screen: 'MyNetwork' })
    } else if (response.status == false && response.error == true) {
      yield put({
        type: 'Get_wishListProduct_Success',
        payload: response.data,
      });
    } else {
      yield put({
        type: 'Get_wishListProduct_Error',
      });
    }
  } catch (error) {
    if (response.data == 'error') {
      yield put({
        type: 'Get_wishListProduct_Error',
      });
      Toast.show(error);
    }
  }
}

// Banner List
function* BannerLIst(action) {
  try {
    const data = {};
    const response = yield call(Api.fetchDataByGET1, action.url, action.Token);
    if (response.status == true) {
      yield put({
        type: 'User_getBannerList_Success',
        payload: response,
      });
      // action.navigation.navigate('MyNetwork1', { screen: 'MyNetwork' })
    } else {
      yield put({
        type: 'User_getBannerList_Error',
      });
    }
  } catch (error) {
    yield put({
      type: 'User_getBannerList_Error',
    });
    Toast.show(error);
  }
}

// Add Collection

function* Addcollection(action) {
  try {
    const data = new FormData();
    data.append('hidden_image', action.hidden_image);
    data.append('Description', action.Description);
    data.append('Title', action.Title);
    data.append('Name', action.Name);
    data.append('IsActive', action.IsActive);
    data.append('ImageName', action.ImageName);
    data.append('partnerId', action.partnerId);

    const response = yield call(
      Api.fetchDataByPOST1,
      action.url,
      action.Token,
      data,
    );
    if (response.data.success == true) {
      Toast.show('collection added successfully ');
      yield put({
        type: 'Add_Collection_Success',
        payload: response,
      });

      action.navigation.navigate('Home1', {
        screen: 'MyCatalogue',
      });
    } else {
      Toast.show('collection Not Added ');
      yield put({
        type: 'Add_Collection_Error',
      });
    }
  } catch (error) {
    yield put({
      type: 'Add_Collection_Error',
    });
    Toast.show(error);
  }
}
// Remove WishList
function* RemoveWishlist(action) {
  try {
    const data = {
      PartnerSrNo: action.PartnerSrNo,
      productId: action.productId,
      userType: action.userType,
    };
    const response = yield call(
      Api.fetchDataByGET12,
      action.url,
      action.Token,
      data,
    );

    if (response.status == true) {
      yield put({
        type: 'Get_removeProductWishlist_Success',
        payload: response,
      });
      yield put({
        type: 'User_mg_Success',
        payload: action.mg,
      });
      if (!action.iscollection) {
        if (action.partner) {
          yield put({
            type: 'User_ProductList_Success',
            payload: {list: action.Data},
          });

          // yield put({
          //   type: 'User_ProductList_Request',
          //   url: 'partners/productTypeProducts',
          //   userId: action.PartnerSrNo,
          //   userType: 'partner',
          //   typeId: action.id,
          //   Token: action.Token,
          //   name: action.name,
          //   start: action.start,
          //   limit: action.limit,
          //   login_user_id: action.PartnerSrNo,
          //   login_user_type: 'partner',
          //   navigation: action.navigation,
          //   page: action.page,
          // });

          if (action.collection_id) {
            yield put({
              type: 'User_collectionProductViewList_Request',
              url: 'partners//collectionProductViewList',
              collection_id: action.collection_id,
              login_user_id: action.PartnerSrNo,
              login_user_type: 'partner',
              Token: action.Token,
              name: false,
              navigation: false,
            });
          }
        } else {
          console.log('suplier ............request ', action.partner);
          yield put({
            type: 'User_ProductList_Success',
            payload: {list: action.Data},
          });

          // yield put({
          //   type: 'User_SupplierProductList_Request',
          //   url: 'partners/productTypeProducts',
          //   userId: action.supllier,
          //   userType: 'supplier',
          //   typeId: action.id,
          //   Token: action.Token,
          //   name: action.name,
          //   login_user_id: action.PartnerSrNo,
          //   login_user_type: 'partner',
          //   start: action.start,
          //   limit: action.limit,
          //   navigation: action.navigation,
          //   page: action.page,
          // });
        }
      } else {
        yield put({
          type: 'User_collectionProductViewList_Request',
          url: 'partners//collectionProductViewList',
          collection_id: action.collectionid,
          login_user_id: action.PartnerSrNo,
          login_user_type: action.userType,
          Token: action.Token,
          name: action.name,
          navigation: false,
        });
      }
      yield put({
        type: 'Get_wishListProduct_Request',
        url: 'partners/wishListProduct',
        partnerId: action.PartnerSrNo,
        userType: 'partner',
        Token: action.Token,
      });
      Toast.show(response.msg);
    } else {
      yield put({
        type: 'Get_removeProductWishlist_Error',
      });
    }
  } catch (error) {
    // Toast.show(response.msg);
    yield put({
      type: 'Get_removeProductWishlist_Error',
    });
    Toast.show(error);
  }
}
// partner contact
function* partnerContact(action) {
  try {
    const data = {
      user_id: action.user_id,
    };

    const response = yield call(
      Api.fetchDataByGET1,
      action.url,
      action.Token,
      data,
    );
    if (response.status == true) {
      yield put({
        type: 'Patner_Contact_Success',
        payload: response.data,
      });
    } else {
      yield put({
        type: 'Patner_Contact_Error',
      });
    }
  } catch (error) {
    yield put({
      type: 'Patner_Contact_Error',
    });
    Toast.show(error);
  }
}
// GetMessage
function* GetMeassege(action) {
  try {
    const data = {
      sender_id: action.sender_id,
      reciver_id: action.reciver_id,
      user_type: action.user_type,
    };
    const response = yield call(
      Api.fetchDataByGET1,
      action.url,
      action.Token,
      data,
    );

    if (response.status == true) {
      let message = [];
      response.data.map(item => {
        let sendId = parseInt(item.sender_id);
        message.push({
          _id: item.id,
          text: item.message,
          createdAt: item.created_at,
          user: {
            _id: sendId,
          },
        });
      }),
        // Toast.show('get successss')

        yield put({
          type: 'get_Message_Success',
          payload: message,
        });
    } else {
      yield put({
        type: 'get_Message_Error',
      });
    }
  } catch (error) {
    yield put({
      type: 'get_Message_Error',
    });
    Toast.show(error);
  }
}
// Sent Message
function* SentMeassge(action) {
  try {
    const response = yield call(Api.fetchDataByPOSTchat, action);
    if (response.status == true) {
      yield put({
        type: 'Message_Send_Success',
        payload: response.status,
      });
      // GetMessageCommon(action.reciver_id, action.user_type);
      yield put({
        type: 'get_Message_Request',
        url: 'partners/getMessage',
        sender_id: action.sender_id,
        reciver_id: action.reciver_id,
        user_type: 'supplier',
        Token: action.Token,
      });
      yield put({
        type: 'Patner_Contact_Request',
        url: 'supplier//supplierListForPartners',
        user_id: action.sender_id,
        Token: action.Token,
      });
    } else {
      // Toast.show('collection Not Added ')
      yield put({
        type: 'Message_Send_Error',
      });
    }
  } catch (error) {
    yield put({
      type: 'Message_Send_Error',
    });
    Toast.show(error);
  }
}
// Add To Network

function* AddToNetwork(action) {
  try {
    let data = new FormData();
    data.append('partnerId', action.partnerId);
    data.append('supplierId', action.supplierId);

    const response = yield call(
      Api.fetchDataByPOST1,
      action.url,
      data,
      action.Token,
    );
    if (response.status == true) {
      yield put({
        type: 'User_sendRequestToSupplier_Success',
        payload: response,
      });
      yield put({
        type: 'User_supplierDetail_Request',
        url: '/partners/supplierDetail',
        supplierId: action.supplierId,
        Token: action.Token,
        partnerId: action.partnerId,
        supplier_id: action.supplierId,
        navigation: action.navigation,
        Status: 1,

        // type: 'Get_Sent_Request',
        // url: '/partners/requestedSupplierList',
        // partnerId: action.partnerId,
        // Token:action.Token
        // // navigation,
      });
      Toast.show(response.msg);
    } else {
      Toast.show(response.msg);
      yield put({
        type: 'User_sendRequestToSupplier_Error',
      });
    }
  } catch (error) {
    yield put({
      type: 'User_sendRequestToSupplier_Error',
    });
    Toast.show(error);
  }
}

// Remove From Network
function* RemoveFromNetwork(action) {
  try {
    const data = {
      supplier_id: action.supplierId,
    };
    const response = yield call(
      Api.fetchDataByGET1,
      action.url,
      action.Token,
      data,
    );

    if (response.status == true) {
      yield put({
        type: 'User_removeNetworkSupplier_Success',
        payload: response,
      });
      console.log('remove from ntemowrk ', action);
      yield put({
        type: 'User_supplierDetail_Request',
        url: '/partners/supplierDetail',
        supplierId: action.supplierId,
        Token: action.Token,
        partnerId: action.partnerId,
        navigation: action.navigation,
        Status: action.Status,
      });
      Toast.show(response.msg);
    } else {
      yield put({
        type: 'User_removeNetworkSupplier_Error',
      });
      Toast.show(response.msg);
    }
  } catch (error) {
    yield put({
      type: 'User_removeNetworkSupplier_Error',
    });
    Toast.show(error);
  }
}
// Item List
function* ItemList11(action) {
  try {
    const data = {
      PartnerSrNo: action.PartnerSrNo,
      category: action.category,
      BranchSrNo: action.BranchSrNo,
    };
    const response = yield call(
      Api.fetchDataByGET1,
      action.url,
      action.Token,
      data,
    );

    if (response.status == true) {
      yield put({
        type: 'product_TypeList_Success',
        payload: response.data,
      });
      yield put({
        type: 'product_session_Success',
        payload: response.current_session_id,
      });
    } else {
      yield put({
        type: 'product_TypeList_Error',
      });
    }
  } catch (error) {
    yield put({
      type: 'product_TypeList_Error',
    });
    Toast.show(error);
  }
}
// Add Metal

function* AddMetal(action) {
  try {
    const data = new FormData();
    data.append('current_session_id', action.data.current_session_id);
    data.append('GrossWt', action.data.grosswt);
    data.append('MetalPurity', action.data.purity);
    data.append('MetalTypes', action.data.metaltype);
    data.append('MetalWt', action.data.metalnetwt);
    data.append('MetalWtUnit', action.data.unitwt);
    data.append('hMetalWt', action.data.hMetalWt);
    data.append('hProductSrNo', action.data.hProductSrNo);
    data.append('isAdd', action.data.isAdd);

    const response = yield call(
      Api.fetchDataByPOST1,
      action.url,
      data,
      action.Token,
    );

    if (response.status == true) {
      yield put({
        type: 'product_addMetal_Success',
        payload: response.data,
        GrossWt1: action.data.grosswt,
      });
      Toast.show(response.msg);
    } else {
      yield put({
        type: 'product_addMetal_Error',
        payload: response.data,
      });
      Toast.show(response.msg);
    }
  } catch (error) {
    yield put({
      type: 'product_addMetal_Error',
    });
    Toast.show(error);
  }
}
// Add Diamond

function* AddDaimond(action) {
  try {
    const data = new FormData();

    data.append('current_session_id', action.data.current_session_id);
    data.append('BreakUp', action.data.BreakUp);
    data.append('ChargAmt', action.data.ChargAmt);
    data.append('DiamondName', action.data.DiamondName);
    data.append('DiamondQuality', action.data.DiamondQuality);
    data.append('DiamondShape', action.data.DiamondShape);
    data.append('DiamondWtUnit', action.data.DiamondWtUnit);
    data.append('Diamondwt', action.data.Diamondwt);
    data.append('hDiamondSrNo', action.data.hDiamondSrNo);
    data.append('hProductSrNo', action.data.hProductSrNo);
    data.append('isAdd', action.data.isAdd);

    const response = yield call(
      Api.fetchDataByPOST1,
      action.url,
      data,
      action.Token,
    );

    if (response.status == true) {
      yield put({
        type: 'product_addDiamond_Success',
        payload: response.data,
      });
      Toast.show(response.msg);
    } else {
      yield put({
        type: 'product_addDiamond_Error',
        payload: response.data,
      });
      Toast.show(response.msg);
    }
  } catch (error) {
    yield put({
      type: 'product_addDiamond_Error',
    });
    Toast.show(error);
  }
}
// Add Stone
function* AddStone(action) {
  try {
    const data = new FormData();
    data.append('current_session_id', action.data.current_session_id);
    data.append('BreakUp', action.data.BreakUp);
    data.append('ChargAmt', action.data.ChargAmt);
    data.append('StoneName', action.data.StoneName);
    data.append('StoneWt', action.data.StoneWt);
    data.append('StoneWtUnit', action.data.StoneWtUnit);
    data.append('hProductSrNo', action.data.hProductSrNo);
    data.append('hStonesSrNo', action.data.hStonesSrNo);
    data.append('isAdd', action.data.isAdd);

    const response = yield call(
      Api.fetchDataByPOST1,
      action.url,
      data,
      action.Token,
    );
    if (response.status == true) {
      yield put({
        type: 'product_addStone_Success',
        payload: response.data,
      });
      Toast.show(response.msg);
    } else {
      yield put({
        type: 'product_addStone_Error',
        payload: response.data,
      });
      Toast.show(response.msg);
    }
  } catch (error) {
    yield put({
      type: 'product_addStone_Error',
    });
    Toast.show(error);
  }
}
// Add Decorative
function* AddDecorative(action) {
  try {
    const data = new FormData();
    data.append('current_session_id', action.data.current_session_id);
    data.append('BreakUp', action.data.BreakUp);
    data.append('ChargAmt', action.data.ChargAmt);
    data.append('DecoItemName', action.data.DecoItemName);
    data.append('DecoWt', action.data.DecoWt);
    data.append('DecoWtUnit', action.data.DecoWtUnit);
    data.append('hDecorationSrNo', action.data.hDecorationSrNo);
    data.append('hProductSrNo', action.data.hProductSrNo);
    data.append('isAdd', action.data.isAdd);

    const response = yield call(
      Api.fetchDataByPOST1,
      action.url,
      data,
      action.Token,
    );

    if (response.status == true) {
      yield put({
        type: 'product_addDecorative_Success',
        payload: response.data,
      });
      Toast.show(response.msg);
    } else {
      yield put({
        type: 'product_addDecorative_Error',
        payload: response.data,
      });
      Toast.show(response.msg);
    }
  } catch (error) {
    yield put({
      type: 'product_addDecorative_Error',
    });
    Toast.show(error);
  }
}

// VeryFy MEtal

function* VeryMEtal(action) {
  console.log('very fy metal ', action);
  try {
    const data = {
      GrossWt: action.GrossWt,
      MetalWtGrandTotal: action.MetalWtGrandTotal,
      DiamondGrandTotal: action.DiamondGrandTotal,
      StoneGrandTotal: action.StoneGrandTotal,
      DecorationGrandTotal: action.DecorationGrandTotal,
    };
    const response = yield call(
      Api.fetchDataByGET1,
      action.url,
      action.Token,
      data,
    );
    if (
      response.status == true ||
      response.status == 201 ||
      response.status == 202
    ) {
      yield put({
        type: 'product_verifyWt_Success',
        payload: response,
      });

      // Toast.show(response.msg)

      // Toast.show(response.msg)
    } else {
      yield put({
        type: 'product_verifyWt_Error',
      });
    }
  } catch (error) {
    yield put({
      type: 'product_verifyWt_Error',
    });
    Toast.show(error);
  }
}

// Item Field

function* ItemField(action) {
  try {
    const data = {
      itemSrNo: action.itemSrNo,
    };
    const response = yield call(
      Api.fetchDataByGET4,
      action.url,

      data,
    );

    if (response.status == true) {
      yield put({
        type: 'get_itemfieldlist_Success',
        payload: response?.fields,
      });
    } else {
      yield put({
        type: 'get_itemfieldlist_Error',
      });
    }
  } catch (error) {
    yield put({
      type: 'get_itemfieldlist_Error',
    });
    Toast.show(error);
  }
}

// Add Product

function* AddProducts(action) {
  try {
    let data = new FormData();
    yield Object.keys(action.data).map(item => {
      data.append(item, action.data[item]);
    });

    const response = yield call(
      Api.fetchDataByPOST1,
      action.url,
      data,
      action.Token,
    );

    if (response.status == true) {
      yield put({
        type: 'product_createProduct_Success',
        payload: response,
      });
      // Toast.show(response.msg)
    } else {
      yield put({
        type: 'product_createProduct_Error',
      });
      // Toast.show(response.msg)
    }
  } catch (error) {
    yield put({
      type: 'product_createProduct_Error',
    });
    Toast.show(error);
  }
}
// Remove Metal

function* RemoveMetal(action) {
  try {
    const data = {
      MetalId: action.MetalId,
      current_session_id: action.current_session_id,
      hProductSrNo: action.hProductSrNo,
    };
    const response = yield call(
      Api.fetchDataByGET1,
      action.url,
      action.Token,
      data,
    );

    if (response.status == true) {
      yield put({
        type: 'product_removeMetal_Success',
        payload: action.MetalId,
      });
      Toast.show(response.msg);
    } else {
      yield put({
        type: 'product_removeMetal_Error',
      });
      Toast.show(response.msg);
    }
  } catch (error) {
    yield put({
      type: 'product_removeMetal_Error',
    });
    Toast.show(error);
  }
}

// Remove Diamond

function* RemoveDiamond(action) {
  try {
    const data = {
      DiamondId: action.DiamondId,
      current_session_id: action.current_session_id,
      hProductSrNo: action.hProductSrNo,
    };
    const response = yield call(
      Api.fetchDataByGET1,
      action.url,
      action.Token,
      data,
    );
    if (response.status == true) {
      yield put({
        type: 'product_removeDiamond_Success',
        payload: action.DiamondId,
      });
      Toast.show(response.msg);
    } else {
      yield put({
        type: 'product_removeDiamond_Error',
      });
      Toast.show(response.msg);
    }
  } catch (error) {
    yield put({
      type: 'product_removeDiamond_Error',
    });
    Toast.show(error);
  }
}
// Remove Decorative
function* RemoveDecorative(action) {
  try {
    const data = {
      DecorativeId: action.DecorativeId,
      current_session_id: action.current_session_id,
      hProductSrNo: action.hProductSrNo,
    };
    const response = yield call(
      Api.fetchDataByGET1,
      action.url,
      action.Token,
      data,
    );
    if (response.status == true) {
      yield put({
        type: 'product_removeDecorative_Success',
        payload: action.DecorativeId,
      });
      Toast.show(response.msg);
    } else {
      yield put({
        type: 'product_removeDecorative_Error',
      });
      Toast.show(response.msg);
    }
  } catch (error) {
    console.log(error);
    yield put({
      type: 'product_removeDecorative_Error',
    });
    Toast.show(error);
  }
}

// Remove Stone

function* RemoveStone(action) {
  try {
    const data = {
      StoneId: action.StoneId,
      current_session_id: action.current_session_id,
      hProductSrNo: action.hProductSrNo,
    };
    const response = yield call(
      Api.fetchDataByGET1,
      action.url,
      action.Token,
      data,
    );
    if (response.status == true) {
      yield put({
        type: 'product_removeStone_Success',
        payload: action.StoneId,
      });
      Toast.show(response.msg);
    } else {
      yield put({
        type: 'product_removeStone_Error',
      });
      Toast.show(response.msg);
    }
  } catch (error) {
    console.log(error);
    yield put({
      type: 'product_removeStone_Error',
    });
    Toast.show(error);
  }
}
// Edit Product
function* EditProduct(action) {
  try {
    const data = {
      ProductSrNo: action.ProductSrNo,
      PartnerSrNo: action.PartnerSrNo,
      // BranchSrNo: action.BranchSrNo,
    };
    const response = yield call(
      Api.fetchDataByGET1,
      action.url,
      action.Token,
      data,
    );

    if (response.status == true) {
      yield put({
        type: 'User_editProduct_Success',
        payload: response.data,
        productEdit: true,
      });
      action.navigation.navigate('Addproduct', {productEdit1: true});
    } else {
      yield put({
        type: 'User_editProduct_Error',
      });
    }
  } catch (error) {
    console.log(error);
    yield put({
      type: 'User_editProduct_Error',
    });
    Toast.show(error);
  }
}
// collection image
function* collectionimg(action) {
  try {
    const data = {
      partnerId: action.partnerId,
    };
    const response = yield call(
      Api.fetchDataByGET1,
      action.url,
      action.Token,
      data,
    );

    if (response.status == true) {
      yield put({
        type: 'Get_creativeImgList_Success',
        payload: response,
      });
    } else {
      yield put({
        type: 'Get_creativeImgList_Error',
      });
    }
  } catch (error) {
    console.log(error);
    yield put({
      type: 'Get_creativeImgList_Error',
    });
    Toast.show(error);
  }
}

function* Notification(action) {
  try {
    const data = {
      partnerId: action.partnerId,
    };
    const response = yield call(
      Api.fetchDataByGET1,
      action.url,
      action.Token,
      data,
    );

    if (response.status == true) {
      yield put({
        type: 'Get_pushNotificationList_Success',
        payload: response.data,
      });
      // Toast.show(response?.msg)
    } else {
      yield put({
        type: 'Get_pushNotificationList_Error',
      });

      // Toast.show(response?.msg)
    }
  } catch (error) {
    yield put({
      type: 'Get_pushNotificationList_Error',
    });
    Toast.show(error);
  }
}

function* partnerProfile(action) {
  try {
    const data = {
      partnerId: action.partnerId,
    };
    const response = yield call(
      Api.fetchDataByGET1,
      action.url,
      action.Token,
      data,
    );

    if (response.status == true) {
      yield put({
        type: 'User_editProfile_Success',
        payload: response.data,
      });
      // Toast.show(response?.msg)
    } else {
      yield put({
        type: 'User_editProfile_Error',
      });
    }
  } catch (error) {
    yield put({
      type: 'User_editProfile_Error',
    });
    Toast.show(error);
  }
}

function* Getcity(action) {
  try {
    const data = {
      stateId: action.stateId,
    };
    const response = yield call(
      Api.fetchDataByGET1,
      action.url,
      action.Token,
      data,
    );

    if (response.status == true) {
      yield put({
        type: 'Get_getCities_Success',
        payload: response,
      });
      action.navigation.navigate('Editprofile', {
        selector: action.selector,
        extractedImages: action.extractedImages,
      });
    } else {
      yield put({
        type: 'Get_getCities_Error',
      });
    }
  } catch (error) {
    yield put({
      type: 'Get_getCities_Error',
    });
    Toast.show(error);
  }
}

export default function* authSaga() {
  yield takeEvery('User_Login_Request', doLogin);
  yield takeEvery('User_collection_Request', getCollection);
  yield takeEvery('User_Gold_Request', getGold);
  yield takeEvery('User_SupplierList_Request', SupplierList);
  yield takeEvery('User_ProductList_Request', ProductList);
  yield takeEvery('User_categories_Request', ProductCategories);
  yield takeEvery('User_singleProductDetail_Request', ProductDetails);
  yield takeEvery('User_SupplierCategories_Request', SupplierCategories);
  yield takeEvery('User_SupplierProductList_Request', SupplierProductList);
  yield takeEvery('User_SupplierProDetail_Request', SupplierProductDetails);
  yield takeEvery('Get_State_Request', StateList);
  yield takeEvery('Get_Pending_Request', pendinRequest);
  yield takeEvery('Get_Sent_Request', SentRequest);
  yield takeEvery('Get_updateSupplierRequest_Request', AcecptRequest);
  yield takeEvery('Get_updateSupplierRequest1_Request', RejectRequest);
  yield takeEvery('User_supplierDetail_Request', SupplierDetail);
  yield takeEvery('Get_wishListProduct_Request', WishListRequest);
  yield takeEvery('User_getBannerList_Request', BannerLIst);
  yield takeEvery('Add_Collection_Request', Addcollection);
  yield takeEvery('User_addProductWishlist_Request', AddwishList);
  yield takeEvery('User_addProductWishlist1_Request', AddwishList1);
  yield takeEvery('Get_removeProductWishlist_Request', RemoveWishlist);
  yield takeEvery('Patner_Contact_Request', partnerContact);
  yield takeEvery('get_Message_Request', GetMeassege);
  yield takeEvery('Message_Send_Request', SentMeassge);
  yield takeEvery('User_sendRequestToSupplier_Request', AddToNetwork);
  yield takeEvery('User_removeNetworkSupplier_Request', RemoveFromNetwork);
  yield takeEvery('product_TypeList_Request', ItemList11);
  yield takeEvery('product_addMetal_Request', AddMetal);
  yield takeEvery('product_addDiamond_Request', AddDaimond);
  yield takeEvery('product_addStone_Request', AddStone);
  yield takeEvery('product_addDecorative_Request', AddDecorative);
  yield takeEvery('product_verifyWt_Request', VeryMEtal);
  yield takeEvery('get_itemfieldlist_request', ItemField);
  yield takeEvery('product_createProduct_Request', AddProducts);
  yield takeEvery('product_removeMetal_Request', RemoveMetal);
  yield takeEvery('product_removeDiamond_Request', RemoveDiamond);
  yield takeEvery('product_removeDecorative_Request', RemoveDecorative);
  yield takeEvery('product_removeStone_Request', RemoveStone);
  yield takeEvery('User_editProduct_Request', EditProduct);
  yield takeEvery('Get_creativeImgList_Request', collectionimg);
  yield takeEvery('Get_pushNotificationList_Request', Notification);
  yield takeEvery('User_editProfile_Request', partnerProfile);
  yield takeEvery('Get_getCities_Request', Getcity);
  yield takeEvery('User_collectionProductViewList_Request', collectionProdcut);
}
