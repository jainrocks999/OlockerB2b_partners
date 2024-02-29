import React, { Fragment, useEffect, useState } from 'react';
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
import { Provider } from 'react-redux';
import Store from './src/Redux/Store';
import RootApp from './src/navigation';
import StatusBar from './src/components/StatusBar';
import crashlytics from '@react-native-firebase/crashlytics';
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import PushNotification from "react-native-push-notification";
import AsyncStorage from '@react-native-async-storage/async-storage';

LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreAllLogs();
PushNotification.createChannel(
  {
    channelId: "default-channel-id",
    channelName: "My channel",
    vibrate: true,
  },
  (created) => console.log(`createChannel returned '${created}'`)
);

// PushNotification.configure({
//   onRegister: function (token) {
//     console.log("TOKEN: virendra", token);
//     AsyncStorage.setItem('Tokenfcm',token.token)
//   },
//     onNotification: function (notification) {
//       PushNotification.localNotification({
//         title: notification.message,
//         message: notification.title,
//       });
//     console.log("NOTIFICATION:", notification);  
//     notification.finish(PushNotificationIOS.FetchResult.NoData);
//   },
//     onAction: function (notification) {
//     console.log("ACTION:", notification.action);
//     console.log("NOTIFICATION:", notification);
//     },
//     onRegistrationError: function(err) {
//     console.error(err.message, err);
//   },
//     permissions: {
//     alert: true,
//     badge: true,
//     sound: true,
//   },
//   popInitialNotification: true,
//   requestPermissions: true,
// }); 
const App = () => {

  const initializeNotifications = () => {
    PushNotification.deleteChannel('default');
    PushNotification.createChannel(
      {
        channelId: 'default', // (required)
        channelName: 'default', // (required)
        soundName: 'notification.mp3', // (optional) See `soundName` parameter of `localNotification` function
        importance: 4, // (optional) default: 4. Int value of the Android notification importance
        vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
        playSound: true,
      },
      created => console.log(`Notification channel created '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
    );
    PushNotification.configure({
      onRegister: function (token) {
             console.log("TOKEN: virendra", token);
             AsyncStorage.setItem('Tokenfcm',token.token)
           },

      onNotification: function (notification) {
        if (notification.userInteraction) {
          if (notification.data.toScreen) {
          }
        } else {
          PushNotification.localNotification({
            allowWhileIdle: true,
            ignoreInForeground: false,
            title: notification.title,
            message: notification.message,
            soundName: 'notification.mp3',
            visibility: 'public',
            channelId: 'default',
            playSound: true,
          });
          console.log('notification ,android',notification);
        }
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
    crashlytics().log('Analytics page just mounted')
    getCrashlyticsDetail()
    return () => {
      crashlytics().log('Analytics page just unmounted')
    }
  }, [])

   const getCrashlyticsDetail = async() => {
    // const user_id=await AsyncStorage.getItem(Storage.user_id)
    // const name=await AsyncStorage.getItem(Storage.name)

    try {
      crashlytics().setUserId('123')
      crashlytics().setAttribute('username','virendra')
    } catch (err) {
      crashlytics().recordError(err)
    }
  }

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
