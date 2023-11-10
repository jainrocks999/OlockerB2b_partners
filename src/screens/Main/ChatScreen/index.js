import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { useRoute } from '@react-navigation/native';
import ChatHeader from './chatHeader';
import ChatScreen2 from './chatUi';


export default function ChatScreen() {

  const route = useRoute();
  const item = route.params?.item;
  return (
    <View style={{ flex: 1 }}>

      <ChatHeader name={item.ContactPersonName}/>
      <View style={{ flex: 1 }}>
        <ChatScreen2 data={item} />
      </View>
    </View>
  )
}