import { BaseRouter, useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput
} from 'react-native';

const AcModal = props => {
  const navigation = useNavigation();
  return (
    <Modal transparent={true} visible={props.visi}>
      <TouchableOpacity
        onPress={() => {
          props.close();
        }}
        style={props.styles}>
        <View style={styles.container}>
          <View style={{marginLeft:0,}}>
          <TextInput style={{}}
          placeholder='search by'
          value={props.value}
          onChangeText={(val)=>props.onChangeText}

          />
          </View>

          <FlatList
            data={props.data}
            renderItem={({ item }) => (
              <View
                style={{
                  borderRadius: 5,
                  marginBottom: 1,
                  paddingHorizontal: 25,
                  backgroundColor: 'white',
                }}>
                <TouchableOpacity
                  onPress={() => props.onPress1(item.label)}
                  style={{
                    paddingVertical: 5,
                  }}>
                  <Text style={{ fontSize: 15 }}>{item.label}</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        </View>
        <View>
          {/* <TouchableOpacity
            onPress={() => {
              close();
            }}
            style={styles.btn}>
            <Text style={{fontWeight: '700', fontSize: 18}}>Cancel</Text>
          </TouchableOpacity> */}
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  btn: {
    backgroundColor: 'white',
    // alignItems: 'center',
    paddingVertical: 15,
    marginHorizontal: 20,
    borderRadius: 10,
    marginVertical: 10,
  },
  container: {
    borderRadius: 10,
    marginHorizontal: 20,
    paddingVertical: 0,
    backgroundColor: '#f6f6f6',
    // marginTop: '59%',
    //  top: '90%',
     borderWidth:1,
    // position:'relative',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
});

export default AcModal;

const Data = [
  {
    name: 'Case',
  },
  {
    name: 'Insurance',
  },
  {
    name: 'Others',
  },
];
