import {View, Text, ScrollView} from 'react-native';
import React from 'react';
import {useRoute} from '@react-navigation/native';
import ChatHeader from './chatHeader';
import ChatScreen2 from './chatUi';

export default function ChatScreen() {
  const route = useRoute();
  const item = route.params?.item;
  const id = route.params?.Id;
  const EmpData = route.params.empty;
  console.log('.....233232', item, id);
  return (
    <View style={{flex: 1}}>
      <ChatHeader name={item.SupplierName} />
      <View style={{flex: 1}}>
        <ChatScreen2 data={item} Id={id} New Data={EmpData} />
      </View>
    </View>
  );
}
