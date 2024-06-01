import {StyleSheet} from 'react-native';
export default StyleSheet.create({
  text: {
    color: '#000',
    fontFamily: 'Acephimere',
    fontSize:15,
    fontWeight:'700'
  },
  dropdown: {
    marginVertical: 10,
    height: 45,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  placeholderStyle: {
    fontSize: 15,
    color: 'grey',
  },
  selectedTextStyle: {
    fontSize: 15,
    color: 'black',
  },

  uploadView: {
    borderWidth: 1,
    marginTop: 4,
    height: 40,
    borderRadius: 6,
    borderColor: 'grey',
    flexDirection: 'row',
    alignItems: 'center',
  },
  grey: {
    backgroundColor: 'grey',
    height: 40,
    width: '30%',
    borderTopLeftRadius: 6,
    borderBottomLeftRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  multiline: {
    borderWidth: 1,
    marginTop: 4,
    borderRadius: 6,
    borderColor: 'grey',
    height: 100,
  },
  input: {
    paddingLeft: 10,
    fontSize: 14,
    includeFontPadding: false,
    padding: 0,
    margin: 0,
  },
  sView: {
    borderWidth: 1,
    marginTop: 4,
    height: 40,
    borderRadius: 6,
    borderColor: 'grey',
    flexDirection: 'row',
    alignItems: 'center',
  },
  sTouch: {
    backgroundColor: 'grey',
    height: 40,
    width: '30%',
    borderTopLeftRadius: 6,
    borderBottomLeftRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

// import {StyleSheet} from 'react-native';
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
//     backgroundColor: '#fff',
//   },
//   img: {
//     height: 25,
//     width: 25,
//     marginTop: 20,
//   },

//   Text1: {
//     fontWeight: '500',
//     color: 'grey',
//     marginTop: 15,
//     fontSize: 17,
//   },
//   card: {
//     shadowColor: 'black',
//     shadowOpacity: 0.25,
//     shadowRadius: 8,
//     shadowOffset: {height: 2, width: 0},
//     elevation: 5,
//     borderRadius: 10,
//     backgroundColor: 'white',
//     marginBottom: 0,
//     paddingHorizontal: 5,
//     paddingVertical: 20,
//     borderWidth: 0.2,
//   },

//   text: {
//     color: 'white',
//     fontSize: 25,
//     marginTop: 17,
//     fontWeight: '600',
//   },
//   main: {
//      justifyContent: 'center',
//      alignItems: 'center',

//     marginTop: 20,
//   },
//   main1: {
//     borderWidth: 1,
//     borderRadius: 10,
//     height: 45,
//     width: '100%',
//     marginTop: 5,
//     paddingHorizontal: 0,
//     justifyContent: 'center',
//     borderColor: 'grey',
//     backgroundColor: '#fff',
//   },
//  title:{color:'#212529',fontFamily:'Acephimere',fontWeight:'700',marginTop:5},
//   rnimg: {
//     marginLeft: 2,
//     width: 20,
//     height: 13,
//     marginTop: Platform.OS == 'android' ? 14 : 4,
//     //tintColor:'grey'
//   },
//   button: {
//     backgroundColor: '#e9056b',
//     paddingVertical: 7,
//     borderRadius: 40,
//     alignItems: 'center',
//     justifyContent: 'center',
//     // paddingHorizontal:5,
//   },
//   bttext: {
//     color: 'white',
//     fontSize: 20,
//     fontWeight: '500',
//     fontFamily: 'Acephimere',
//   },
// });
