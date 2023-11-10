import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  FlatList,
} from 'react-native';
import TabView from '../../../components/StoreButtomTab';
import Header from '../../../components/CustomHeader';
import { useNavigation } from '@react-navigation/native';
import {
  VictoryBar,
  VictoryChart,
  VictoryAxis,
  VictoryTheme,
} from 'victory-native';
import RNPickerSelect from 'react-native-picker-select';
import styles from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MyCatalogue = () => {
  const navigation = useNavigation();
  const [status, setStatus] = useState('');
  const [data1, setUserdata] = useState(false);
  const [data2, setUserdata1] = useState('');
  const date = new Date();
  let ToDAY = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;


  const data = [
    { quarter: 1, earnings: 500 },
    { quarter: 2, earnings: 1000 },
    { quarter: 3, earnings: 2000 },
    { quarter: 4, earnings: 3000 },
    { quarter: 5, earnings: 4000 },
    { quarter: 6, earnings: 5000 },
    { quarter: 7, earnings: 6000 },
    { quarter: 8, earnings: 7000 },
    { quarter: 9, earnings: '' },
    { quarter: 10, earnings: '' },
    { quarter: 11, earnings: '' },
    { quarter: 12, earnings: '' },
  ];
  return (
    <View style={{ flex: 1 }}>
      <Header
        source1={require('../../../assets/Fo.png')}
        source2={require('../../../assets/Image/dil.png')}
        title={'My Customers '}
        onPress={() => navigation.goBack()}
        onPress1={() => navigation.navigate('Message')}
        onPress2={() => navigation.navigate('FavDetails')}
      />

      <ScrollView>
        <View style={styles.main}>
          <View style={{ height: 150 }} />
        </View>
        <View style={styles.card}>
          <View style={styles.cardV}>
            <View style={styles.cardV1}>
              <Text style={styles.cardV1t}>{123}</Text>
              <Text style={styles.cardV1tt}>Today Downloads</Text>
            </View>
            <View style={styles.cardV1}>
              <Text style={styles.cardV1t}>{1234}</Text>
              <Text style={styles.cardV1tt}>Total Downloads</Text>
            </View>
          </View>
        </View>
        <View style={styles.card2}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Mycustomer')}
            style={{ alignItems: 'center' }}>
            <View style={{}}>
              <Image
                style={styles.card2img}
                source={require('../../../assets/Image/myCustomerImage.png')}
              />
            </View>
            <Text style={styles.card2t}>{'My Customers'}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('Feedback')}
            style={{ alignItems: 'center' }}>
            <View style={{}}>
              <Image
                style={styles.card2img}
                source={require('../../../assets/Image/feedbackI.png')}
              />
            </View>
            <Text style={styles.card2t}>{'Feedback'}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('Loyalty1')}
            style={{ alignItems: 'center' }}>
            <View style={{}}>
              <Image
                style={styles.card2img}
                source={require('../../../assets/Image/heart.png')}
              />
            </View>
            <Text style={styles.card2t}>{'Loyalty'}</Text>
          </TouchableOpacity>
        </View>
        {/* <View style={styles.blog}>
          <Image style={{ height: 13, width: 20 }} resizeMode={'contain'}
            source={require('../../../assets/Image/serch.png')}
          />
          <TextInput
            //  style={{marginLeft: 10}}
            placeholder="Search by Name or Phone Number"
            placeholderTextColor='9a9a9a'
            style={{ color: '9a9a9a', width: '100%', marginLeft: 10, fontFamily: 'Roboto-Regular' }}
            returnKeyType="done"
             value={search}
            onChangeText={(val) => searchFilterFunction(val)}
          />
        </View> */}

        <View style={styles.bottom}>
          <Text style={styles.bottomt}>Recents downloads</Text>
        </View>
        <View>
          <FlatList
            data={User}
            renderItem={({ item }) => (
              <TouchableOpacity
                // onPress={() => userProfile(item.SrNo)}
                //  onPress={()=>navigation.navigate('MyCustomerDetail')}
                style={styles.cardView}>

                <View style={styles.carditem}>
                  <Image
                    style={styles.carditemimg}
                    source={require('../../../assets/user.jpeg')}
                  />
                  <Text style={styles.carditemt}>{item.title}</Text>
                </View>
                <View>
                  <Text style={styles.carditemtt}>{item.mobile}</Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
        <View style={{ height: 140 }} />
      </ScrollView>
      {/* <View style={{backgroundColor:'#032e63',width:60,height:60,
          position:'absolute',bottom:80,right:15,borderRadius:30,
          alignItems:'center',
          justifyContent:'center'
        }}>
          <Image style={{height:30,width:30}} source={require('../../../assets/plus.png')}/>
        </View> */}
      {/* <View style={{bottom: 0, position: 'absolute', left: 0, right: 0}}>
        <TabView />
      </View> */}
    </View>
  );
};
export default MyCatalogue;
const data = [
  { title: 'Hello' },
  { title: 'Hello' },
  { title: 'Hello' },
  { title: 'Hello' },
  { title: 'Hello' },
  { title: 'Hello' },
  { title: 'Hello' },
  { title: 'Hello' },
  { title: 'Hello', type: 'add' },
];
const Data = [
  { label: 'Today Downloads', value: 'Today Downloads' },
  { label: 'Total Downloads', value: 'Total Downloads' },
  // { label: 'Last 3 year', value: '3' },
];
const User = [
  {
    image: require('../../../assets/user.jpeg'),
    title: 'Milind Shethiya',
    mobile: '+918765457324',
  },
  {
    image: require('../../../assets/user.jpeg'),
    title: 'Milind Shethiya',
    mobile: '+918765457324',
  },
  {
    image: require('../../../assets/user.jpeg'),
    title: 'Milind Shethiya',
    mobile: '+918765457324',
  },
  {
    image: require('../../../assets/user.jpeg'),
    title: 'Milind Shethiya',
    mobile: '+918765457324',
  },
  {
    image: require('../../../assets/user.jpeg'),
    title: 'Milind Shethiya',
    mobile: '+918765457324',
  },
  {
    image: require('../../../assets/user.jpeg'),
    title: 'Milind Shethiya',
    mobile: '+918765457324',
  },
];
