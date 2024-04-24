import React from 'react';
import { Platform, StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
export default StyleSheet.create({
  container1:{ flex: 1, backgroundColor: 'white' },
  breakupV:{
    alignItems: 'center',
    flexDirection: 'row',
    marginHorizontal: wp(3),
    // borderWidth: 1
  },
  modelText:{ fontSize: 16, fontWeight: '700', color: '#000' },
  // color: '#032e63'
  upload:{
    alignSelf: 'center',
    marginTop: 5,
    borderWidth: 1, borderColor: '#979998' ,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    
    flexDirection: 'row',
    height: hp(5.5),
    borderRadius: wp(3.5),
    width: '55%',
  },
  TextMain:{ fontSize: 16, fontWeight: '700', color: '#000' },
  textBreack:{ fontSize: 14, fontWeight: '600',color:'#474747' },
  dropdown: {
    marginTop: wp(2),
    color:'#474747',
    height: hp(5.5),
    backgroundColor: 'white',
    borderRadius: wp(3),
    padding: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    marginLeft:5,
    // elevation: 3,
  },
  icon: {
    marginRight: 5,
  },
  item: {
    padding: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

  },
  textItem: {
    flex: 1,
    fontSize: 16,
  },
  placeholderStyle: {
    fontSize: 16,
    color:'#474747'
  },
  selectedTextStyle: {
    fontSize: 16,
    color: '#474747',
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  Card: {
    borderRadius: 10,
    marginBottom: 10,
    marginTop: 10,
    height: hp(81),
    marginHorizontal: 20,
    shadowColor: '#000',
    backgroundColor: 'white',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
  searchbar: {
    borderWidth: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 8,
    borderColor: '#032E63',
    marginBottom: 20,
    paddingHorizontal: 20,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 10,
      height: 20,
    },
    shadowOpacity: 0.57,
    shadowRadius: 15.19,
  },
  img: {
    height: wp(4),
    width: wp(4),
  },
  img1: {
    height: wp(5.5),
    width: wp(6.5),
  },
  img2: {
    height: wp(5.5),
    width: wp(6.5),
    tintColor: '#fff',
  },
  img3: {
    width: wp(6),
    height: wp(5.5),
  },



  container: {
    width: '100%',
    backgroundColor: '#032e63',
    justifyContent: 'space-between',
    alignItems: 'center',
    // paddingHorizontal: 12,
    flexDirection: 'row',
    paddingVertical: wp(3),
    paddingHorizontal: wp(3)

  },
  text: {
    color: '#000',
    fontSize: 16,
    fontWeight: '700',
    marginLeft:4
  },
  headertouch: {
    flexDirection: 'row',
    width: wp(30),
    // borderWidth: 1,
    justifyContent: 'space-between'
  },


  row: {
    backgroundColor: '#032e63',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 10,
    width: '100%'
  },
  Subrow: {

    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 2,
    borderColor: '#032e63',
    borderColor: '#ccc',
    paddingVertical: 10,
    height: 60
  },
  cell: {
    color: 'white',
    flex: 1,
    textAlign: 'center',
    fontWeight: '600'
  },
  Subcell: {
    color: '#000',
    flex: 1,
    textAlign: 'center',
    fontWeight: '700'
  },
  mrt:
    {
       marginHorizontal: wp(3), 
       marginTop: wp(3.5) },
 
  btn: {
    borderWidth: 1, borderColor: '#979998' ,
    width: '49%',
    height: hp(5.5),
    borderRadius: wp(3),
    alignItems: 'center',
    justifyContent: 'center',
  },
  txt2: { fontSize: 14, fontWeight: '600', color: '#032e63' }

});






// import {StyleSheet, Platform} from 'react-native';
// export default StyleSheet.create({
//   container: {
//     width: '100%',
//     backgroundColor: '#032e63',
//     //alignItems:'center',
//     justifyContent: 'space-between',
//     paddingHorizontal: 10,
//     flexDirection: 'row',
//     paddingVertical: 20,
//   },
//   container1: {
//     flex: 1,
//     backgroundColor: 'white',
//     // backgroundColor: '#f0eeee',
//   },

//   Text1: {
//     fontWeight: '500',
//     color: '#949494',
//     marginTop: 15,
//     fontSize: 17,
//     fontFamily: 'Acephimere',
//   },
//   main: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     paddingHorizontal: 10,
//     marginTop: 7,
//   },
//   main1: {
//     borderWidth: 1,
//     borderRadius: 30,
//     height: 40,
//     width: '59%',
//     marginTop: 10,
//     paddingHorizontal: 15,
//     justifyContent: 'center',
//     borderColor: 'grey',
//   },

//   img: {
//     height: 25,
//     width: 25,
//     marginTop: 20,
//   },
//   text: {
//     color: 'white',
//     fontSize: 25,
//     marginTop: 17,
//     fontWeight: '600',
//   },
//   card: {
//     // shadowColor: 'black',
//     // shadowOpacity: 0.25,
//     // shadowRadius: 8,
//     // shadowOffset: {height: 2, width: 0},
//     //  elevation: 5,
//     marginTop: 0,
//     borderRadius: 10,
//     backgroundColor: 'white',
//     borderColor: '#ccc',
//     borderWidth: 1,
//     marginBottom: 0,
//     paddingHorizontal: 5,
//     paddingBottom: 0,
//   },

//   bottom: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingHorizontal: 10,
//     marginTop: 20,
//   },
//   btview: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     height: 80,
//     width: 80,
//     backgroundColor: 'white',
//     borderRadius: 10,
//     borderWidth: 0.5,
//   },
//   textview: {
//     fontSize: 23,
//     color: 'grey',
//     fontWeight: '500',
//     marginTop: 10,
//   },
//   textview1: {
//     fontSize: 14,
//     color: 'grey',
//     marginTop: 3,
//   },
//   button: {
//     backgroundColor: '#e9056b',
//     paddingVertical: 8,
//     borderRadius: 30,
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingHorizontal: 40,
//   },
//   bttext: {
//     color: 'white',
//     fontSize: 20,
//     fontWeight: '500',
//     fontFamily: 'Acephimere',
//   },
//   rn: {
//     inputAndroid: {
//       color: '#474747',
//       width: '100%',
//       fontSize: 14,
//       marginBottom: -1,
//       fontFamily: 'Acephimere',
//     },
//     inputIOS: {
//       color: '#474747',
//       width: '100%',
//       fontSize: 14,
//       marginBottom: -1,
//       fontFamily: 'Acephimere',
//     },
//     placeholder: {
//       color: '#474747',
//       width: '100%',
//       alignSelf: 'center',
//       fontFamily: 'Acephimere',
//     },
//   },
//   rnimg: {
//     marginLeft: 2,
//     width: 16,
//     height: 13,
//     marginTop: Platform.OS == 'android' ? 12 : 1,
//   },
// });
