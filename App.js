import React, {Fragment, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  LogBox,
  Button,
  Platform,
  SafeAreaView,
  FlatList,
} from 'react-native';
import {Provider} from 'react-redux';
import Store from './src/Redux/Store';
import RootApp from './src/navigation';
import StatusBar from './src/components/StatusBar';
import crashlytics from '@react-native-firebase/crashlytics';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import PushNotification from 'react-native-push-notification';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {GetMessageCommon} from './src/screens/Main/ChatScreen/common';
import * as RootNavigation from './src/navigation/RootNavigation';
LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreAllLogs();

const App = () => {
  const manageLogin = async data1 => {
    const user_id = await AsyncStorage.getItem('loginToken');
    if (user_id == null) {
      RootNavigation.push('Login');
      // navigationRef.current?.dispatch(StackActions.push('FirstPage'));
    } else if (user_id) {
      RootNavigation.push('ChatScreen', {item: data1});

      // navigationRef.current?.dispatch(StackActions.push('FirstPage'));
    }
  };

  const Requestsentosupplier = async () => {
    const user_id = await AsyncStorage.getItem('loginToken');
    if (user_id == null) {
      RootNavigation.push('Login');
      // navigationRef.current?.dispatch(StackActions.push('FirstPage'));
    } else if (user_id) {
      RootNavigation.push('PendingRequest', {id: ''});
      // 'MyNetwork1',{screen:'PendingRequest', id:''}
      // navigationRef.current?.dispatch(StackActions.push('FirstPage'));
    }
  };

  const RequestAccept = async () => {
    const user_id = await AsyncStorage.getItem('loginToken');
    if (user_id == null) {
      RootNavigation.push('Login');
      // navigationRef.current?.dispatch(StackActions.push('FirstPage'));
    } else if (user_id) {
      RootNavigation.push('MyNetworks');
      // 'MyNetwork1',{screen:'MyNetworks'}
      // navigationRef.current?.dispatch(StackActions.push('FirstPage'));
    }
  };

  const initializeNotifications = () => {
    PushNotification.deleteChannel('default-channel-id');
    PushNotification.createChannel(
      {
        channelId: 'default-channel-id', // (required)
        channelName: 'My channel', // (required)
        soundName: 'notification.mp3', // (optional) See `soundName` parameter of `localNotification` function
        importance: 4, // (optional) default: 4. Int value of the Android notification importance
        vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
        playSound: true,
      },
      created => console.log(`Notification channel created '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
    );
    PushNotification.configure({
      onRegister: function (token) {
        console.log('TOKEN: virendra', token);
        AsyncStorage.setItem('Tokenfcm', token.token);
      },

      onNotification: function (notification) {
        // if (notification.userInteraction) {
        //   if (notification.data.toScreen) {
        //   }
        // } else {
        PushNotification.localNotification({
          title: notification.title,
          message: notification.message,
        });

        let obj = notification?.data;
        if (
          notification.userInteraction === true &&
          notification.foreground == false &&
          notification.message == 'New Message From Supplier'
        ) {
          GetMessageCommon(obj?.id, 'supplier');
          manageLogin(obj);

          console.log('login Before  seession', obj);
        } else if (
          notification.userInteraction == true &&
          notification.foreground == true &&
          notification.message == 'New Message From Supplier'
        ) {
          GetMessageCommon(obj?.id, 'supplier');
          console.log('login after seession', obj);
          manageLogin(obj);
        } else if (
          notification.userInteraction == true &&
          notification.foreground == false &&
          notification.message == 'New Invitation Request'
        ) {
          Requestsentosupplier();
        } else if (
          notification.userInteraction == true &&
          notification.foreground == true &&
          notification.message == 'New Invitation Request'
        ) {
          Requestsentosupplier();
        } else if (
          notification.userInteraction == true &&
          notification.foreground == false &&
          notification.message == 'Request Accepted'
        ) {
          RequestAccept();
        } else if (
          notification.userInteraction == true &&
          notification.foreground == true &&
          notification.message == 'Request Accepted'
        ) {
          RequestAccept();
        }

        console.log('notification ,android', notification);

        // }
      },
    });

    if (Platform.OS === 'ios') {
      messaging().onMessage(async remoteMessage => {
        PushNotificationIOS.presentLocalNotification({
          alertTitle: remoteMessage?.notification?.title || '',
          alertBody: remoteMessage?.notification?.body || '',
          userInfo: remoteMessage.data,
          isSilent: false,
          applicationIconBadgeNumber: 0,
        });
      });
    }
  };

  useEffect(() => {
    initializeNotifications();
    crashlytics().log('Analytics page just mounted');
    getCrashlyticsDetail();
    return () => {
      crashlytics().log('Analytics page just unmounted');
    };
  }, []);

  const getCrashlyticsDetail = async () => {
    const Id = await AsyncStorage.getItem('Partnersrno');
    const userid = await AsyncStorage.getItem('userEmail');

    try {
      crashlytics().setUserId(Id);
      crashlytics().setAttribute('username', userid);
    } catch (err) {
      crashlytics().recordError(err);
    }
  };

  return (
    <Fragment>
      {/* <SafeAreaView style={{backgroundColor:Platform.OS=='ios'?'#032e63':'#fff'}}/> */}
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: Platform.OS == 'ios' ? '#052a47' : '#fff',
        }}>
        <Provider store={Store}>
          <RootApp />
        </Provider>
        <StatusBar />
      </SafeAreaView>
    </Fragment>
  );
};

export default App;
