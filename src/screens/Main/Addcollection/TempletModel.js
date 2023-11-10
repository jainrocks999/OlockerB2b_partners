import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Image,
    Modal,
    FlatList,
    TextInput
} from 'react-native';

import CheckBox from '@react-native-community/checkbox';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loading from '../../../components/Loader';
import styles from './styles';
import { useSelector } from 'react-redux';
const TempletModel = ({ visi,sendDatatoParent=()=>{}, close = () => { }, ...props }) => {

   const selector =useSelector(state=>state.Collectionimg)
//    console.log('virendra......',selector);
    const [inputs, setInputs] = useState({
       photo:'',
       chk_c:''
    })
    const handleInputs = (text, input) => {
        setInputs(prev => ({ ...prev, [text]: input }));
    };
   
   
  
    return (

        <View style={[styles.container1,{}]}>
            <Modal animationType='fade' transparent visible={visi} >
           
                <View style={styles.modalView}>
              
                    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: wp(4) }}>
                        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                            <Text style={{fontWeight:'bold',fontSize:22,marginTop:10}}>Creative Library</Text>
                    <TouchableOpacity onPress={() =>close()} style={styles.crossbtn}>
                            <Text style={styles.xbtn}>X</Text>
                        </TouchableOpacity>
                        </View>
                   <View style={styles.modalText}>
                   <View
                    style={{
                       borderWidth:0.5,
                       height:50,
                      flexDirection: 'row',
                      // justifyContent:'space-around'
                    }}>
                      
                       <View style={{width:'16.2%',justifyContent:'center'}}>
                         <Text style={{fontWeight:'bold',fontSize:15,marginTop:0,marginLeft:5}}>Check Box</Text>
                         </View>
                         <View style={{borderWidth:0.5,height:50,}}/>
                   <View style={{justifyContent:'center',alignItems:'center'}}> 
                    <Text style={{fontWeight:'bold',fontSize:15,marginTop:0,marginLeft:50}}>Image</Text>
                    </View> 
                    </View> 
                    <FlatList
              data={selector?.data}
              renderItem={({ item,index }) => (
                // <View
                //   style={{
                //     marginHorizontal: 10,
                //     // borderWidth: 2,
                //     marginTop: 5,
                //     marginBottom:5
                //   }}>
                  <View
                    style={{
                       borderWidth:0.5,
                      height:150,
                      flexDirection: 'row',
                      alignItems: 'center',justifyContent:'space-around'
                    }}>
                      <View>
                    <CheckBox
                      onChange={ () => {handleInputs('chk_c',item.SrNo),sendDatatoParent(item,selector.url) }}
                      value={inputs.chk_c===item.SrNo}
                      tintColors={{ true: '#032e63', false: '#032e63' }}
                    />
                    </View>
                    <View style={{borderWidth:0.5,height:150,}}/>
                    <View>
                   <Image
                    style={{
                     width: 250,
                 height: 140,marginRight:5,
                      //  resizeMode: 'cover',
                      borderRadius: 5,
                    }}
                    source={ { uri: `${selector.url}${item.Logo}` }}
                  />
                  </View>
                  </View>
                // </View>
              )}
            />
                       
                       </View>       
                       <TouchableOpacity onPress={() =>close()} style={{height:40,width:100,backgroundColor:'#032e63',alignSelf:'flex-end',marginTop:5,alignItems:'center',justifyContent:'center',borderRadius:10}}>
                            <Text style={styles.xbtn}>Cancel</Text>
                        </TouchableOpacity>
                    </ScrollView>
                   
                </View>


            </Modal>
        </View>

    );
};
export default TempletModel;
const DropData = [
    { label: 'Cts.', value: 'Cts.' },
    { label: 'Gms.', value: 'Gms.' },

];