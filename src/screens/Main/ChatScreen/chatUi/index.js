import {
  View,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import axios from 'axios';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import React, {useState, useCallback, useEffect} from 'react';
import {Bubble, GiftedChat, InputToolbar, Send} from 'react-native-gifted-chat';
import {useIsFocused, useNavigation, useRoute} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import Loader from '../../../../components/Loader';
const ChatScreen2 = ({...props}) => {
  const data = useSelector(state => state.GetMessage);
  const [message, setMessages] = useState([]);
  const data1 = useSelector(state => state.SentMessage);
  const isFetching = useSelector(state => state.isFetching);
  // const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const [fetching, setFetching] = useState(false);
  const [userId, setUserId] = useState();
  const navigation = useNavigation();

  const isFocused = useIsFocused();
  useEffect(() => {
    GetMessage();
  }, [isFocused]);

  const GetMessage = async () => {
    const partnerid = await AsyncStorage.getItem('Partnersrno');
    const Token = await AsyncStorage.getItem('loginToken');
    setUserId(parseInt(partnerid));
    dispatch({
      type: 'get_Message_Request',
      url: 'partners/getMessage',
      sender_id: parseInt(partnerid),
      reciver_id: props?.Id
        ? parseInt(props?.data?.SrNo)
        : parseInt(props.data.id),
      user_type: 'supplier',
      Token: Token,
    });
  };

  const onSend = async msg => {
    console.log(
      'ssioghsgsug',
      props?.Id ? parseInt(props?.data?.SrNo) : parseInt(props.data.id),
    );
    const partnerid = await AsyncStorage.getItem('Partnersrno');
    //  setUserId(parseInt(partnerid))
    const Token = await AsyncStorage.getItem('loginToken');
    let text = await msg[0].text;

    dispatch({
      type: 'Message_Send_Request',
      url: 'partners/msgSentSuccessPartnerSide',
      sender_id: parseInt(partnerid),
      reciver_id: props?.Id
        ? parseInt(props?.data?.SrNo)
        : parseInt(props.data.id),
      user_type: 'partner',
      message: text,
      Token: Token,
    });
    // if (data1) {
    //   await GetMessage();
    // }
  };

  const renderActions = useCallback(() => {
    return (
      <TouchableOpacity
        onPress={() => {
          // setVisiable(true);
        }}
        style={{paddingBottom: 8, marginLeft: 5, height: 40, width: 40}}>
        <Entypo name="emoji-happy" size={32} color={'#333'} />
      </TouchableOpacity>
    );
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: '#f0f0f0'}}>
      {/* {isFetching || fetching ? <Loader /> : null} */}
      {/* {isFetching ? <View /> : */}
      <GiftedChat
        messages={data}
        alwaysShowSend={true}
        onSend={onSend}
        user={{
          _id: userId,
        }}
        textInputStyle={{
          backgroundColor: '#e1e3e3',
          borderRadius: 10,
          paddingHorizontal: 10,
          marginTop: 5,
          borderColor: 'grey',
          color: '#474747',
        }}
        // renderActions={renderActions}
        renderInputToolbar={props => {
          return (
            <InputToolbar
              containerStyle={{
                backgroundColor: '#f6f6f6',
              }}
              {...props}
            />
          );
        }}
        renderSend={props => {
          return (
            <View
              style={{
                paddingVertical: 2,
                alignItems: 'center',
                width: '20%',
                paddingHorizontal: 10,
                justifyContent: 'space-evenly',
                flexDirection: 'row',
              }}>
              {/* <TouchableOpacity
                style={{width: '35%'}}
                onPress={() => {
                  openCamera();
                }}>
                <Feather name="camera" size={28} color={'#000'} />
              </TouchableOpacity> */}
              {/* <TouchableOpacity
                style={{width: '35%'}}
                onPress={() => {
                  navigation.navigate('Audio');
                }}>
                <Feather name="mic" size={28} color={'#000'} />
              </TouchableOpacity> */}
              <View style={{width: '80%'}}>
                <Send {...props}>
                  <Ionicons
                    name="ios-send"
                    size={30}
                    color={'#4282eb'}
                    style={{marginBottom: 6}}
                  />
                </Send>
              </View>
            </View>
          );
        }}
        renderBubble={props => {
          return (
            <Bubble
              {...props}
              textStyle={{
                right: {
                  color: 'white',
                },
                left: {
                  color: 'white',
                },
              }}
              timeTextStyle={{
                left: {
                  color: 'white',
                },
                right: {
                  color: 'white',
                },
              }}
              wrapperStyle={{
                right: {
                  maxWidth: '100%',
                  backgroundColor: '#032e63',
                  borderRadius: 5,
                  shadowColor: '#000',
                  marginVertical: 2,
                  shadowOffset: {
                    width: 0,
                    height: 1,
                  },
                  shadowOpacity: 0.22,
                  shadowRadius: 2.22,

                  elevation: 3,
                },
                left: {
                  maxWidth: '100%',
                  backgroundColor: '#032e63',
                  borderRadius: 5,
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 1,
                  },
                  marginLeft: -35,
                  marginVertical: 2,
                  shadowOpacity: 0.22,
                  shadowRadius: 2.22,

                  elevation: 3,
                },
              }}
            />
          );
        }}
      />
      {/* } */}
    </View>
  );
};
export default ChatScreen2;
