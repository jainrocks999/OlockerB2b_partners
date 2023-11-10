import { StyleSheet } from 'react-native';
export default StyleSheet.create({
    container:{ flex: 1, backgroundColor: '#f0eeef' },
    main:{ flexDirection: 'row', padding: 15, width: '100%' },
    main1:{
        backgroundColor: '#fff',
        height: 100,
        width: '30%',
        borderRadius: 10,
      },
      
      details:{ marginLeft: 10, width: '60%', marginTop: -4 },
      text1:{ color: '#fff',  fontFamily: 'Acephimere' },
      star:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        alignItems: 'center',
        width: '100%',
      },

blankV:{ height: 20,marginTop:15,alignItems:'center' },
      phone:{ alignItems: 'center', justifyContent: 'center' },
      addButtonV:{
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
      },
      addButton:{
        backgroundColor: '#ea056c',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 20,
      },
      card :{alignItems:'center'},
    tabStyle:{
        alignItems:'center',
        justifyContent:'center'
    },
    text2:{ marginTop: 3, fontFamily: 'Acephimere', fontSize: 13 },
    img1:{ width: 50, height: 50 },
    tabContainer:{
        width:'100%',
        flexDirection:'row',
        justifyContent:'space-between',
        paddingVertical:15,
        paddingHorizontal:25,
        backgroundColor:'#fff'
    }
})