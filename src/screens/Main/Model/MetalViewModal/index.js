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
import { Dropdown } from 'react-native-element-dropdown';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CheckBox from '@react-native-community/checkbox';
import styles from './styles';
import { useSelector, useDispatch } from 'react-redux';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loading from '../../../../components/Loader';
import Toast from 'react-native-simple-toast'
const MetalViewModal = ({ visi, close = () => { }, isBrekup, prodcutfile, ...props }) => {
    const productType = useSelector(state => state.ProductItem);
    const isFetching = useSelector(state => state.isFetching)
    const MetalList = useSelector(state => state.AddMetal)
    const GrossWt1 = useSelector(state => state.GrossWt1)
    const hProductSrNo = useSelector(state => state.HproductSrNo)
   console.log('this is metal list',MetalList);
    const [inputs, setInputs] = useState({
        purity: '',
        metaltype: '',
        grosswt: '',
        metalnetwt: '',
        unitwt: '',
        hMetalWt: 0,
        MetalWt: '',
        hProductSrNo: 0,
        isAdd: 1,
        session_id: ''
    })
    const handleInputs = (text, input) => {
        setInputs(prev => ({ ...prev, [text]: input }));
    };
    useEffect(() => {
        setInputs({
            purity: '',
            metaltype: '',
            grosswt: '',
            metalnetwt: '',
            unitwt: '',
            hMetalWt: '',
            MetalWt: '',
            hProductSrNo: '',
            isAdd: 1,
            current_session_id: prodcutfile ? 0 : session_id,
        })

    }, [MetalList?.result])

 const closeFunction =()=>{
    close();
    setInputs({
        purity: '',
        metaltype: '',
        grosswt: '',
        metalnetwt: '',
        unitwt: '',
        hMetalWt: '',
        MetalWt: '',
        hProductSrNo: '',
        isAdd: 1,
        current_session_id: prodcutfile ? 0 : session_id,
    })
 }


    const dispatch = useDispatch();
    const session_id = useSelector(state => state.session)

    const AddMetal = async (isEdit, item) => {
     
       
        if (isEdit) {
            setInputs({
                current_session_id: item.Session,
                grosswt: GrossWt1,
                purity: item?.MetalPurity,
                metaltype: item?.MetalType,
                metalnetwt: item?.MetalWt,
                unitwt: item?.UnitMetalWt,
                hMetalWt: item?.SrNo,

            })

        }

        else {
            if(inputs.grosswt==0){
                Toast.show('Please enter gross wt');
                return;
              }else if(inputs.metaltype==''){
                Toast.show('Please select metal type');
                return;
              }else if(inputs.purity==''){
                Toast.show('Please select metal purity');
                return;
              }
              else if(inputs.metalnetwt==0){
                Toast.show('Please enter metal wt');
                return;
              }else if(inputs.unitwt==''){
                Toast.show('Please select metal unit wt');
                return;
              }
            const Token = await AsyncStorage.getItem('loginToken');
            const Id = await AsyncStorage.getItem('Partnersrno');
            dispatch({
                type: 'product_addMetal_Request',
                url: 'partners/addMetal',
                Token: Token,
                data: {
                    ...inputs,

                    current_session_id: prodcutfile ? 0 : session_id,
                    isAdd: prodcutfile ? 0 : 1,
                    hProductSrNo: prodcutfile ? hProductSrNo : 0,
                }

            })
        }

    }

    const RemoveMetal = async (item) => {
        const Token = await AsyncStorage.getItem('loginToken');
      
        dispatch({
            type: 'product_removeMetal_Request',
            url: 'partners/removeMetal',
            Token: Token,
            MetalId: item.SrNo,
            current_session_id: prodcutfile ? 0 : item.Session,
            hProductSrNo: prodcutfile ? hProductSrNo : 0,
        })

    }


console.log('THIS IS MEYAL PURITY',productType?.Metal_Purity);
    return (

        <View style={styles.container}>
            <Modal animationType='fade' transparent visible={visi} >
                <View style={{flex:1,backgroundColor:'rgba(69, 71, 71,0.9)',  justifyContent:'center',}}>
                {isFetching ? <Loading /> : null}
                <View style={styles.modalView}>
               
                    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: wp(4) }}>
                    <TouchableOpacity onPress={() => closeFunction()} style={styles.crossbtn}>
                            <Text style={styles.xbtn}>X</Text>
                        </TouchableOpacity>
                        <View style={styles.modalText}>
                            <View style={styles.item}>
                                <Text style={styles.textItem}>Metal Details</Text>

                            </View>
                            <View style={{ width: wp(60) }}>
                                <Text style={styles.deta}>(DETAILS OF PRECIOUS METALS USED IN PRODUCT)</Text>
                            </View>
                        </View>


                        {MetalList?.result ?
                            <View style={{}}>

                                <FlatList
                                    data={MetalList?.result}
                                    renderItem={({ item, index }) => {

                                        return (

                                            <View
                                                style={{
                                                    borderWidth: 1,
                                                    marginVertical: wp(1),
                                                    paddingVertical: wp(2),
                                                    paddingHorizontal: wp(3),
                                                    backgroundColor: '#f3f3f5',
                                                    borderRadius: wp(2),
                                                    elevation: 5,
                                                }}>
                                                <View style={styles.editdelete}>
                                                    <TouchableOpacity onPress={() => AddMetal('edit', item)}>
                                                        <MaterialCommunityIcons
                                                            name="pencil"
                                                            size={wp(4.5)}
                                                            color={'black'}
                                                        />
                                                    </TouchableOpacity>
                                                    <Text
                                                        style={[
                                                            styles.cardTitle,
                                                            {
                                                                width: 5,
                                                                fontSize: wp(5),
                                                                color: 'black',
                                                                marginTop: wp(-1),
                                                            },
                                                        ]}>
                                                        |
                                                    </Text>
                                                    <TouchableOpacity onPress={() => RemoveMetal(item)}>
                                                        <MaterialCommunityIcons
                                                            name="delete"
                                                            size={wp(4.5)}
                                                            color={'black'}
                                                        />
                                                    </TouchableOpacity>
                                                </View>
                                                <View style={[styles.cartItem, { marginTop: wp(5) }]}>
                                                    <Text style={[styles.cardTitle, { color: 'black' }]}>
                                                        Metal Wt.
                                                    </Text>

                                                    <Text style={[styles.cardTitle, styles.dot]}>:</Text>
                                                    <Text style={[styles.cardTitle, { color: 'black' }]}>
                                                        {item?.MetalWt}</Text>
                                                </View>
                                                <View style={styles.cartItem}>
                                                    <Text style={[styles.cardTitle, { color: 'black' }]}>
                                                        Unit of Metal Wt.
                                                    </Text>

                                                    <Text style={[styles.cardTitle, styles.dot]}>:</Text>
                                                    <Text style={[styles.cardTitle, { color: 'black' }]}>
                                                        {item?.UnitMetalWt}</Text>
                                                </View>
                                                <View style={styles.cartItem}>
                                                    <Text style={[styles.cardTitle, { color: 'black' }]}>
                                                        Metal Type
                                                    </Text>
                                                    <Text style={[styles.cardTitle, styles.dot]}>:</Text>
                                                    <Text style={[styles.cardTitle, { color: 'black' }]}>
                                                        {item?.MetalType}
                                                    </Text>
                                                </View>
                                                <View style={styles.cartItem}>
                                                    <Text style={[styles.cardTitle, { color: 'black' }]}>
                                                        Metal Purity
                                                    </Text>

                                                    <Text style={[styles.cardTitle, styles.dot]}>:</Text>
                                                    <Text style={[styles.cardTitle, { color: 'black' }]}>
                                                        {item?.MetalPurity}
                                                    </Text>
                                                </View>
                                            </View>


                                        )
                                    }}
                                />
                            </View> : null}
                        <View style={{ marginLeft: wp(2) }}>
                            <Text style={styles.buttonClose}>Gross wt. Gms. <Text style={{ color: 'red' }}>*</Text></Text>
                            <View style={styles.inputFiled}>
                                <TextInput style={styles.textinput1}
                                placeholder='Gross Wt Gms.'
                                    value={inputs.grosswt}
                                    placeholderTextColor='#474747'
                                    keyboardType='numeric'
                                    onChangeText={(text) => handleInputs('grosswt', text)}
                                />
                            </View>
                            <Text style={[styles.buttonClose, { marginLeft: wp(1) }]}>Metal type <Text style={{ color: 'red' }}>*</Text></Text>
                        </View>
                        <View style={[styles.inputFiled, { paddingHorizontal: 10, marginHorizontal: wp(2) }]}>
                            <Dropdown
                                style={{
                                    color: '#032e63',
                                    width: '100%',

                                    marginBottom: -1,
                                    height: 40,
                                    // marginTop: 5
                                }}
                                placeholderStyle={{
                                    color: '#474747',
                                    width: '100%',
                                    alignSelf: 'center',
                                    // fontFamily: 'Acephimere'
                                }}
                                itemTextStyle={{color:'#474747'}}
                                selectedTextStyle={{
                                    color: '#474747',
                                    width: '100%',
                                    fontSize: 14,
                                    marginBottom: -1,
                                    fontFamily: 'Acephimere',
                                }}
                                // iconStyle={{ tintColor: '#ffff' }}
                                data={productType?.metalType}
                                inputSearchStyle={{
                                    borderRadius: 10,
                                    backgroundColor: '#f0f0f0',
                                }}
                                // itemTextStyle={{ fontSize: 15 }}
                                // itemContainerStyle={{ marginBottom: -20, }}
                                searchPlaceholder="search.."
                                maxHeight={250}
                                search
                                labelField="label"
                                valueField="value"
                                placeholder="Metal type"
                                value={inputs.metaltype}
                                onChange={item => {

                                    handleInputs('metaltype', item.value)
                                }}
                            />
                        </View>
                        <Text style={[styles.buttonClose, { marginLeft: wp(3) }]}>Metal purity <Text style={{ color: 'red' }}>*</Text></Text>
                        <View style={[styles.inputFiled, { paddingHorizontal: 10, marginHorizontal: wp(2) }]}>

                          
                            <Dropdown
                                style={{
                                    color: '#032e63',
                                    width: '100%',

                                    marginBottom: -1,
                                    height: 40,
                                    // marginTop: 5
                                }}
                                placeholderStyle={{
                                    color: '#474747',
                                    width: '100%',
                                    alignSelf: 'center',
                                    // fontFamily: 'Acephimere'
                                }}
                                itemTextStyle={{color:'#474747'}}
                                selectedTextStyle={{
                                    color: '#474747',
                                    width: '100%',
                                    fontSize: 14,
                                    marginBottom: -1,
                                    fontFamily: 'Acephimere',
                                }}
                                // iconStyle={{ tintColor: '#ffff' }}
                                data={productType?.Metal_Purity}
                                inputSearchStyle={{
                                    borderRadius: 10,
                                    backgroundColor: '#f0f0f0',
                                }}
                                // itemTextStyle={{ fontSize: 15 }}
                                // itemContainerStyle={{ marginBottom: -20, }}
                                searchPlaceholder="search.."
                                maxHeight={250}
                                search
                                labelField="label"
                                valueField="value"
                                placeholder="Metal purity"
                                value={inputs.purity}
                                onChange={item => {
                                    handleInputs('purity', item.value)
                                }}
                            />
                        </View>
                        <Text style={[styles.buttonClose, { marginLeft: wp(3) }]}>Metal net wt.<Text style={{ color: 'red' }}>*</Text></Text>
                        <View style={[styles.inputFiled, { marginHorizontal: wp(2) }]}>
                            <TextInput style={styles.textinput1}
                             placeholder='Metal Wt Gms.'
                                value={inputs.metalnetwt}
                                keyboardType='numeric'
                                placeholderTextColor='#474747'
                                onChangeText={(text) => handleInputs('metalnetwt', text)}
                            />
                        </View>
                        <Text style={[styles.buttonClose, { marginLeft: wp(3) }]}>Unit of wt.<Text style={{ color: 'red' }}>*</Text></Text>
                        <View style={[styles.inputFiled, { paddingHorizontal: 10, marginHorizontal: wp(2) }]}>
                            <Dropdown
                                style={{
                                    color: '#032e63',
                                    width: '100%',

                                    marginBottom: -1,
                                    height: 40,
                                    // marginTop: 5
                                }}
                                placeholderStyle={{
                                    color: '#474747',
                                    width: '100%',
                                    alignSelf: 'center',
                                    // fontFamily: 'Acephimere'
                                }}
                                itemTextStyle={{color:'#474747'}}
                                selectedTextStyle={{
                                    color: '#474747',
                                    width: '100%',
                                    fontSize: 14,
                                    marginBottom: -1,
                                    fontFamily: 'Acephimere',
                                }}
                                data={DropData}
                                inputSearchStyle={{
                                    borderRadius: 10,
                                    backgroundColor: '#f0f0f0',
                                }}

                                searchPlaceholder="search.."
                                maxHeight={250}
                                search
                                labelField="label"
                                valueField="value"
                                placeholder="metal unit of wt"
                                value={inputs.unitwt}
                                onChange={item => {

                                    handleInputs('unitwt', item.value)
                                }}
                            />
                        </View>
                        {/* <View style={[styles.inputFiled, { marginHorizontal: wp(2) }]}>
                            <TextInput placeholder='Gross of wt.'
                                value={unitwt}
                                onChangeText={(text) => setUnitwt(text)}

                            />
                        </View> */}
                        <TouchableOpacity
                            onPress={() => AddMetal('')}
                            style={styles.buttonOpen} >
                            <Text style={{ color: 'white', fontSize: wp(4.5), fontWeight: 'bold' }}>Add Details</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </View>
                </View>

            </Modal>
        </View>

    );
};
export default MetalViewModal;
const DropData = [
    { label: 'Cts.', value: 'Cts.' },
    { label: 'Gms.', value: 'Gms.' },

];