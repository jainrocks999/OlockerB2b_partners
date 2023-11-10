import axios from 'axios';
import Constants from '../Constants';
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default class Api {
  static fetchDataByPOST1 = async (url, data, Token) => {

    try {
      console.log('virendra112222ffffffffff2', Constants.MainUrl + url, data, Token);
      const response = await axios({
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          "Olocker": `Bearer ${Token}`,
        },
        url: Constants.MainUrl + url,
        data: data,
      });
      return response.data;

    } catch (error) {
      Toast.show("Please Try again..")
      console.log('vireeeeenenne.....', error);
      throw error;
    }
  };

  static fetchDataByPOSTchat = async (action) => {
    var myHeaders = new Headers();
    myHeaders.append("Olocker", `Bearer ${action.Token}`);
    var data = new FormData();
    data.append("sender_id", action.sender_id);
    data.append("reciver_id", action.reciver_id);
    data.append("user_type", action.user_type);
    data.append("message", action.message);


    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: data,
      redirect: 'follow'
    };

    const res = fetch("https://olocker.co/api/partners/msgSentSuccessPartnerSide", requestOptions)
      .then(response => response.text())
      .then(result => { return JSON.parse(result) })
      .catch(error => console.log('error', error));

    return res
  };
  static fetchDataByPOST = async (url, data) => {
    console.log('main url ,,,,,,', Constants.MainUrl + url);
    try {
      const response = await axios({
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          "Olocker": `Bearer ${Token}`,
        },
        url: Constants.MainUrl + url,
        params: data,
      });

      return response;
    } catch (error) {
      console.log('why eorror fatch by login', error);
      throw error;
    }
  };

  static fetchDataByGET = async (url, data) => {
    try {
      console.log('main url ,,,,,,', Constants.MainUrl + url);
      const response = await axios({
        method: 'GET',
        headers: {
          'content-type': 'application/json',

        },
        url: Constants.MainUrl + url,
        params: data,
      });

      return response.data;
    } catch (error) {
      Toast.show('Server not responding')
      console.log('error123', error);
      throw error;
    }
  };
  static fetchDataByGET1 = async (url, Token, data) => {
    console.log('dataaa   ,v', Constants.MainUrl + url, data, Token);
    try {
      const response = await axios({
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          "Olocker": `Bearer ${Token}`,
        },
        url: Constants.MainUrl + url,
        params: data,
      });

      return response.data;
    } catch (error) {
      Toast.show('Server not responding')
      console.log('error123', error);
      throw error;
    }
  };


  static fetchDataByGET12 = async (url, Token, data) => {
    console.log('vkm   ...', Constants.MainUrl + url);
    try {
      const response = await axios({
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          "Olocker": `Bearer ${Token}`,
        },
        url: Constants.MainUrl + url,
        params: data,
      });

      return response.data;
    } catch (error) {
      Toast.show('Server not responding')
      return response.data = 'error';
      console.log('error123', error);
      throw error;
    }
  };


  static fetchDataByGET3 = async (url, Token, data) => {
    console.log(
      'virendra mishra......token',
      Constants.MainUrl + url,
    );
    try {
      const response = await axios({
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          "Olocker": `Bearer ${Token}`,
        },
        url: Constants.MainUrl + url,
        data: data,
      });
      return response.data;
    } catch (error) {
      console.log(error);
      Toast.show('Server not responding')

      throw error;
    }
  };


  static fetchDataByGET4 = async (url, data) => {
    const Token = await AsyncStorage.getItem('loginToken');
    try {
      console.log('vireneenenene', Constants.MainUrl + url, data);
      const response = await axios({
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          "Olocker": `Bearer ${Token}`,
        },
        url: Constants.MainUrl + url,
        params: data,
      });

      return response.data;
    } catch (error) {
      Toast.show('Server not responding')
      console.log('error123', error);
      throw error;
    }
  };


  static fetchDataByGET2 = async (url, Token) => {

    try {
      const response = await axios({
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          "Olocker": `Bearer ${Token}`,
        },
        url: Constants.MainUrl + url,
      });
      return response.data;
    } catch (error) {
      Toast.show('Server not responding')
      throw error;
    }
  };
}

