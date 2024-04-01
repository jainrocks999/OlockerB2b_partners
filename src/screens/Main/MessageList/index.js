import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Dimensions,
  Image,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Header from '../../../components/CustomHeader';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import StatusBar from '../../../components/StatusBar';
import BottomTab from '../../../components/StoreButtomTab';
import Loader from '../../../components/Loader';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
const HomeScreen = () => {
  const navigation = useNavigation();
 const selector =useSelector(state=>state.Notification);
 const isFetching= useSelector(state=>state.isFetching)
 const dispatch =useDispatch();
  const isfocus=useIsFocused();
useEffect(()=>{
if(isfocus){
  Apicall();
}
},[isfocus])
const Apicall =async()=>{
  const Token = await AsyncStorage.getItem('loginToken');
    const Id = await AsyncStorage.getItem('Partnersrno');
  dispatch({
    type:'Get_pushNotificationList_Request',
    url:'/partners/pushNotificationList',
    partnerId:Id,
    Token:Token
   })
}

 const supplierprofile = async (id) => {
  const Token = await AsyncStorage.getItem('loginToken');
  const Id = await AsyncStorage.getItem('Partnersrno');
 console.log('data...get,,,,,',id);
 if(id.title=='New Invitation Request'){
  navigation.navigate('MyNetwork1',{screen:'PendingRequest'})
 }else if(id.title=='Request Accepted')
 navigation.navigate('MyNetwork1',{screen:'MyNetworks'})
}

  return (
    <View style={{flex: 1, backgroundColor: '#f0eeef'}}>
 
      <Header
        source={require('../../../assets/L.png')}
        source2={require('../../../assets/Image/dil.png')}
        title={'Notification '}
        onPress={() => navigation.goBack()}
        onPress2={() => navigation.navigate('FavDetails')}
      />
     {isFetching?<Loader/>:null}

     {
        selector?.length == 0 ?
            <View style={{ alignItems: 'center', justifyContent: 'center', alignSelf: 'center', height: '90%',}}>
              <Text style={{
        fontFamily: 'Acephimere',
        fontSize: 19,
        color: 'grey', fontWeight: '700'
    }}> {'No Notification'} </Text>

            </View>
            :


      <ScrollView style={{paddingHorizontal:0}}>

<View style={{}}>
              <Text
               style={{color:'#000',marginLeft:10,marginTop:10}}>
                {selector?.length==1?    `${selector?.length}  Notification`:`${selector?.length}  Notifications`}
              </Text>
      {/* <Text  style={{color:'#000',marginLeft:10,marginTop:10}}>{`${selector.length}${'  Notification'}`}</Text> */}
        <View style={{marginBottom:20}}>
            <FlatList
              data={selector}
              renderItem={({item}) => (
                <View
                  style={{
                    backgroundColor: '#f0f0f0',
                    // marginTop: 10,
                     paddingHorizontal: 10,
                    paddingVertical: 10,
                    // paddingLeft: 20,
                    shadowColor: 'black',
    shadowOffset: {width: 3, height: 12},
    shadowOpacity: 0.8,
     shadowRadius: 0,
    elevation: 8,}}>

      <TouchableOpacity onPress={()=>supplierprofile(item)}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}>
                    <Text style={{fontSize: 17,color:'#000',fontWeight:'700'}}>{item.senderName}</Text>
                    <View
                      style={{
                        backgroundColor: '#24a31e',
                        paddingHorizontal: 6,
                        paddingVertical: 2,borderRadius:5
                      }}>
                        
                      <Text style={{color: '#fff', fontSize: 13,}}>
                        {item.title}
                      </Text>
                    </View>
                  </View>
                  </TouchableOpacity>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginTop: 5,
                    }}>
                    <Image
                      style={{tintColor: 'grey', height: 13, width: 17}}
                      source={require('../../../assets/Fo.png')}
                    />

                    <Text style={{marginLeft: 6, fontSize: 14, color: '#000',fontWeight:'500'}}>
                    {item.message}
                    </Text>
                  </View>
                  <Text style={{color:'#000',marginTop:5,fontSize:13,fontWeight:'600'}}>Last seen: <Text style={{color:'#000',fontWeight:'500'}}>{item?.created_at}</Text></Text>
                  <View style={{borderWidth:0.5,marginTop:5}}/>
                </View>
              )}
            />
        </View>
        </View>
        <View style={{height:'20%',width:'30%',alignSelf:'flex-end'}}>
         <Text>Clear</Text>
        </View>
      </ScrollView>
}
      <StatusBar />
    </View>
  );
};
export default HomeScreen;
const data = [
  {
    title: 'Milind Jewellers',
    text: 'We can supply product you have as..',
    time: 'Last replied on 07 Sep,2020',
  },
  {
    title: 'Mahabir Jewellers',
    text: 'Payments term can be discussed as per..',
    time: 'Last replied on 01 Sep,2020',
  },
  {
    title: 'Narendra Jewellers',
    text: 'We can supply product you have as..',
    time: 'Last replied on 03 Sep,2020',
  },
];



































// import React, {useState} from 'react';
// import {
//   View,
//   Text,
//   Dimensions,
//   Image,
//   FlatList,
//   ScrollView,
//   TouchableOpacity,
// } from 'react-native';
// import Header from '../../../components/CustomHeader';
// import {useNavigation} from '@react-navigation/native';
// import StatusBar from '../../../components/StatusBar';
// import BottomTab from '../../../components/StoreButtomTab';
// import Loader from '../../../components/Loader';
// import { useSelector } from 'react-redux';
// const HomeScreen = () => {
//   const navigation = useNavigation();
//   const [business, setBusiness] = useState(true);
//   const [customer, setCustomer] = useState(false);
//  const selector =useSelector(state=>state.Notification)
//  console.log('notifiyyyyyyy...........',selector);
//   const Data1 = [];
//   const Data2 = [];

//   const manageBusiness = () => {
//     setBusiness(true);
//     setCustomer(false);
//   };
//   const [value, setVlue] = useState(0);
//   const [value1, setVlue1] = useState(0);
//   const manageCustomer = () => {
//     setCustomer(true);
//     setBusiness(false);
//   };
//   // const arr=[44,23,45,67,32,23,43,45,43,24]
//   // const array=[]
//   // const sort=()=>{
//   //   let i, j,temp;
//   //   for( i = 0; i<10; i++)
//   //   {
//   //       for(j = i+1; j<10; j++)
//   //       {
//   //           if(array[j] > array[i])
//   //           {
//   //               temp = array[i];
//   //               array[i] = array[j];
//   //               array[j] = temp;

//   //           }
//   //       }

//   //   }

//   //   for(i = 0; i<10; i++)
//   //   {
//   //     setVlue(array[i])

//   //   }
//   //  let largest = arr[0];
//   //   let  sec_largest = arr[1];
//   //     for(i=0;i<arr.length;i++)
//   //     {
//   //         if(arr[i]>largest)
//   //         {
//   //             sec_largest = largest;
//   //             largest = arr[i];
//   //         }
//   //         else if (arr[i]>sec_largest && arr[i]!=largest)
//   //         {
//   //             sec_largest=arr[i];

//   //         }
//   //     }
//   //     setVlue(largest)
//   //     setVlue1(sec_largest)
//   //  printf("largest = %d, second largest = %d",largest,sec_largest);
//   //}
//   return (
//     <View style={{flex: 1, backgroundColor: '#f0eeef'}}>
//       {/* <TouchableOpacity>
//          <Text>Here is the eelement of array</Text>
//        </TouchableOpacity>
//       <Text>{` ${arr}`}</Text>

//        <View style={{width:'100%',alignItems:'center'}}>
//          <TouchableOpacity onPress={()=>sort()} style={{height:40,backgroundColor:'blue',padding:10,marginTop:20}}>
//            <Text style={{color:'#fff'}}>Click to Sort</Text>
//          </TouchableOpacity>
//          </View>
//        <Text>{` ${value } ${value1 }`}</Text> */}
//       <Header
//         source={require('../../../assets/L.png')}
//         source2={require('../../../assets/Image/dil.png')}
//         title={'Notification '}
//         onPress={() => navigation.goBack()}
//         onPress2={() => navigation.navigate('FavDetails')}
//       />
//       <ScrollView style={{paddingHorizontal:0}}>
//         {/* <View
//           style={{
//             paddingHorizontal: 20,
//             paddingVertical: 5,
//             flexDirection: 'row',
//             width: '75%',
//             alignItems: 'center',
//             marginTop: 8,
//           }}>
//           <TouchableOpacity
//             onPress={() => manageBusiness()}
//             style={{
//               borderWidth: 1,
//               height: 35,
//               borderRadius: 16,
//               alignItems: 'center',
//               justifyContent: 'center',
//               paddingHorizontal: 20,
//               backgroundColor: business == true ? '#032e63' : '#fff',
//               borderColor: business == true ? '#032e63' : '#2b2b2b',
//             }}>
//             <Text
//               style={{
//                 fontSize: 13,
//                 fontFamily: 'Acephimere',
//                 color: business == true ? '#fff' : '#2b2b2b',
//               }}>
//               Business
//             </Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             onPress={() => manageCustomer()}
//             style={{
//               borderWidth: 1,
//               height: 35,
//               borderRadius: 16,
//               alignItems: 'center',
//               justifyContent: 'center',
//               paddingHorizontal: 20,
//               marginLeft: 15,
//               backgroundColor: customer == true ? '#032e63' : '#fff',
//               borderColor: customer == true ? '#032e63' : '#2b2b2b',
//             }}>
//             <Text
//               style={{
//                 fontSize: 13,
//                 fontFamily: 'Acephimere',
//                 color: customer == true ? '#fff' : '#2b2b2b',
//               }}>
//               Customer
//             </Text>
//           </TouchableOpacity>
//         </View> */}
//         <View>
//           {/* {business == true ? ( */}
//             <FlatList
//               data={selector}
//               renderItem={({item}) => (
//                 <View
//                   style={{
//                     backgroundColor: '#fff',
//                     marginTop: 10,
//                     paddingHorizontal: 10,
//                     paddingVertical: 10,
//                     paddingLeft: 20,
//                   }}>
//                   <View
//                     style={{
//                       flexDirection: 'row',
//                       alignItems: 'center',
//                       justifyContent: 'space-between',
//                     }}>
//                     <Text style={{fontSize: 16}}>{item.created_at}</Text>
//                     <View
//                       style={{
//                         backgroundColor: '#24a31e',
//                         paddingHorizontal: 6,
//                         paddingVertical: 2,
//                       }}>
//                       <Text style={{color: '#fff', fontSize: 13}}>
//                         {item.message}
//                       </Text>
//                     </View>
//                   </View>
//                   <Text>{item.title}</Text>
//                   <View
//                     style={{
//                       flexDirection: 'row',
//                       alignItems: 'center',
//                       marginTop: 10,
//                     }}>
//                     <Image
//                       style={{tintColor: 'grey', height: 12, width: 16}}
//                       source={require('../../../assets/Fo.png')}
//                     />
//                     <Text style={{marginLeft: 6, fontSize: 12, color: 'grey'}}>
//                       {item.time}
//                     </Text>
//                   </View>
//                 </View>
//               )}
//             />
//            {/* ) : null} */}
//           {/* {customer == true ? (
//             <FlatList
//               data={data}
//               renderItem={({item}) => (
//                 <View
//                   style={{
//                     backgroundColor: '#fff',
//                     marginTop: 10,
//                     paddingHorizontal: 10,
//                     paddingVertical: 10,
//                     paddingLeft: 20,
//                   }}>
//                   <View>
//                     <View
//                       style={{
//                         flexDirection: 'row',
//                         alignItems: 'center',
//                         justifyContent: 'space-between',
//                       }}>
//                       <Text style={{fontSize: 16}}>{item.time}</Text>
//                       <View
//                         style={{
//                           backgroundColor: '#24a31e',
//                           paddingHorizontal: 6,
//                           paddingVertical: 2,
//                         }}>
//                         <Text style={{color: '#fff', fontSize: 13}}>
//                           {item.title}
//                         </Text>
//                       </View>
//                     </View>
//                     <Text>{item.text}</Text>
//                     <View
//                       style={{
//                         flexDirection: 'row',
//                         alignItems: 'center',
//                         marginTop: 10,
//                       }}>
//                       <Image
//                         style={{tintColor: 'grey', height: 12, width: 16}}
//                         source={require('../../../assets/Fo.png')}
//                       />
//                       <Text
//                         style={{marginLeft: 6, fontSize: 12, color: 'grey'}}>
//                         {item.time}
//                       </Text>
//                     </View>
//                   </View>
//                 </View>
//               )}
//             />
//           ) : null} */}
//         </View>
//       </ScrollView>
//       {/* <View style={{bottom:0,position:'absolute',left:0,right:0}}>
//       <BottomTab/>
//       </View> */}
//       <StatusBar />
//     </View>
//   );
// };
// export default HomeScreen;
// const data = [
//   {
//     title: 'Milind Jewellers',
//     text: 'We can supply product you have as..',
//     time: 'Last replied on 07 Sep,2020',
//   },
//   {
//     title: 'Mahabir Jewellers',
//     text: 'Payments term can be discussed as per..',
//     time: 'Last replied on 01 Sep,2020',
//   },
//   {
//     title: 'Narendra Jewellers',
//     text: 'We can supply product you have as..',
//     time: 'Last replied on 03 Sep,2020',
//   },
// ];
