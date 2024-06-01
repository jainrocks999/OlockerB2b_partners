const { default: AsyncStorage } = require("@react-native-async-storage/async-storage");
const { default: store } = require("../../../Redux/Store");
// import { useDispatch } from 'react-redux';

export const GetMessageCommon = async (id, user_type) => {
   console.log('vireenenenene...........121113322', id, user_type);
  const partnerid = await AsyncStorage.getItem('Partnersrno');
  const Token = await AsyncStorage.getItem('loginToken');
  store.dispatch({
    type: 'get_Message_Request',
    url: 'partners/getMessage',
    sender_id: parseInt(partnerid),
    reciver_id: id,
    user_type: user_type,
    Token: Token,
  });
};