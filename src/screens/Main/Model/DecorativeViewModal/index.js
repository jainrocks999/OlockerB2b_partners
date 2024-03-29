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
import Toast from 'react-native-simple-toast';
const DecorativeViewModal = ({ visi, close = () => { }, isBrekup, prodcutfile, ...props }) => {
    const dispatch = useDispatch();
    const productType = useSelector(state => state.ProductItem);
    const session_id = useSelector(state => state.session);
    const Decorative = useSelector(state => state.Decorative1)

    const isFetching = useSelector(state => state.isFetching)
    const hProductSrNo = useSelector(state => state.HproductSrNo)

    const [value, setValue] = useState(null);
    const [inputs, setInputs] = useState({
        DecoWt: '',
        DecoWtUnit: '',
        ChargAmt: '',
        DecoItemName: '',
        hDecorationSrNo: '',
        hProductSrNo: 0,
        isAdd: 1,
    })
    const handleInputs = (text, input) => {
        setInputs(prev => ({ ...prev, [text]: input }));
    };
    const decItemDetails = productType?.decItemDetails?.map((item) => {
        return { label: item.Value, value: item.Value }
    })
    useEffect(() => {
        setInputs({
            DecoWt: '',
            DecoWtUnit: '',
            ChargAmt: '',
            DecoItemName: '',
            hDecorationSrNo: '',
            hProductSrNo: 0,
            isAdd: 1,
        });
    }, [Decorative?.result])
 const closeFunction=()=>{
    close();
    setInputs({
        DecoWt: '',
        DecoWtUnit: '',
        ChargAmt: '',
        DecoItemName: '',
        hDecorationSrNo: '',
        hProductSrNo: 0,
        isAdd: 1,
    });
 }

    const AddDecorative = async (isEdit, item) => {
        
        if (isEdit) {

            setInputs({
                DecoWt: item?.DecorativeItemWt,
                DecoWtUnit: item?.UnitDecoItemWt,
                DecoItemName: item?.DecorativeItemName,
                ChargAmt: item?.DecorativeChargeableAmount,
                hDecorationSrNo: item.SrNo,
            });

        }
        else {
            if (inputs.DecoWt==0) {
                Toast.show('Please enter the decorative item weight');
                
                return; 
              }else if (inputs.DecoWtUnit==''){
                Toast.show('Please select decorative unit weight');
                
                return; 
              } else if(inputs.DecoItemName==''){
                Toast.show('Please select decorative details');
                
                return; 
              }

            const Token = await AsyncStorage.getItem('loginToken');
            const Id = await AsyncStorage.getItem('Partnersrno');


            dispatch({
                type: 'product_addDecorative_Request',
                url: 'partners/addDecorative',
                Token: Token,
                data: {
                    ...inputs,
                    current_session_id: prodcutfile ? 0 : session_id,
                    isAdd: prodcutfile ? 0 : 1,
                    BreakUp: isBrekup == 0 ? 1 : 0,
                    hProductSrNo: prodcutfile ? hProductSrNo : 0,

                }
            })
        }
    }
    const RemoveDecorative = async (item) => {
        const Token = await AsyncStorage.getItem('loginToken');
        dispatch({
            type: 'product_removeDecorative_Request',
            url: 'partners/removeDecorative',
            Token: Token,
            hProductSrNo: prodcutfile ? hProductSrNo : 0,
            DecorativeId: item.SrNo,
            current_session_id: prodcutfile ? 0 : item.Session
        })
    }
    return (

        <View style={styles.container}>
            <Modal animationType='fade' transparent visible={visi} >
                <View style={{ flex: 1, backgroundColor: 'rgba(69, 71, 71,0.9)' ,justifyContent:'center'}}>
                    {isFetching ? <Loading /> : null}
                    <View style={styles.modalView}>
                        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: wp(4) }}>
                            <TouchableOpacity onPress={() => closeFunction()} style={styles.crossbtn}>
                                <Text style={styles.xbtn}>X</Text>
                            </TouchableOpacity>
                            <View style={styles.modalText}>
                                <View style={styles.item}>
                                    <Text style={styles.textItem}>Decorative Details</Text>

                                </View>
                                <View style={{ width: wp(60) }}>
                                    <Text style={styles.deta}>(DETAILS OF PRECIOUS STONES USED IN PRODUCT)</Text>
                                </View>
                            </View>
                            {Decorative?.result ?
                                <View >
                                    <FlatList
                                        data={Decorative?.result}
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
                                                        <TouchableOpacity onPress={() => AddDecorative('edit', item)}>
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
                                                        <TouchableOpacity onPress={() => RemoveDecorative(item)}>
                                                            <MaterialCommunityIcons
                                                                name="delete"
                                                                size={wp(4.5)}
                                                                color={'black'}
                                                            />
                                                        </TouchableOpacity>
                                                    </View>
                                                    <View style={[styles.cartItem, { marginTop: wp(5) }]}>
                                                        <Text style={[styles.cardTitle, { color: 'black' }]}>
                                                            DecorativeItemName
                                                        </Text>

                                                        <Text style={[styles.cardTitle, styles.dot]}>:</Text>
                                                        <Text style={[styles.cardTitle, { color: 'black' }]}>{item?.DecorativeItemName}</Text>
                                                    </View>
                                                    <View style={styles.cartItem}>
                                                        <Text style={[styles.cardTitle, { color: 'black' }]}>
                                                            DecorativeItemWt
                                                        </Text>

                                                        <Text style={[styles.cardTitle, styles.dot]}>:</Text>
                                                        <Text style={[styles.cardTitle, { color: 'black' }]}>{item?.DecorativeItemWt}</Text>
                                                    </View>
                                                    <View style={styles.cartItem}>
                                                        <Text style={[styles.cardTitle, { color: 'black' }]}>
                                                            UnitDecoItemWt
                                                        </Text>
                                                        <Text style={[styles.cardTitle, styles.dot]}>:</Text>
                                                        <Text style={[styles.cardTitle, { color: 'black' }]}>
                                                            {item?.UnitDecoItemWt}
                                                        </Text>
                                                    </View>
                                                    {isBrekup == 0 ? <View style={styles.cartItem}>
                                                        <Text style={[styles.cardTitle, { color: 'black' }]}>
                                                            DecorativeChargeableAmount
                                                        </Text>
                                                        <Text style={[styles.cardTitle, styles.dot]}>:</Text>
                                                        <Text style={[styles.cardTitle, { color: 'black' }]}>
                                                            {item?.DecorativeChargeableAmount
                                                            }
                                                        </Text>
                                                    </View> : null
                                                    }
                                                </View>
                                            )
                                        }}
                                    />


                                </View> : null}


                            <View style={{ marginLeft: wp(2) }}>
                                <Text style={styles.buttonClose}>Decorative item weight<Text style={{ color: 'red' }}>*</Text></Text>
                                <View style={styles.inputFiled}>
                                    <TextInput style={styles.input1}
                                        placeholderTextColor='#474747'
                                        placeholder='Decorative item weight '
                                        keyboardType='numeric'
                                        value={inputs.DecoWt}
                                        onChangeText={inputs => handleInputs('DecoWt', inputs)}
                                    />
                                </View>
                            </View>
                            <Text style={[styles.buttonClose, { marginLeft: wp(3) }]}>Unit of Wt. <Text style={{ color: 'red' }}>*</Text></Text>

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
                                    selectedTextStyle={{
                                        color: '#474747',
                                        width: '100%',
                                        fontSize: 14,
                                        marginBottom: -1,
                                        fontFamily: 'Acephimere',
                                    }}
                                    // iconStyle={{ tintColor: '#ffff' }}
                                    data={DropData}
                                    inputSearchStyle={{
                                        borderRadius: 10,
                                        backgroundColor: '#f0f0f0',
                                    }}
                                    itemTextStyle={{ color: '#474747' }}
                                    // itemContainerStyle={{ marginBottom: -20, }}
                                    searchPlaceholder="search.."
                                    maxHeight={250}
                                    search
                                    labelField="label"
                                    valueField="value"
                                    placeholder="Select Unit of Wt."
                                    value={inputs.DecoWtUnit}
                                    onChange={item => {
                                        handleInputs('DecoWtUnit', item.value)
                                    }}
                                />
                            </View>
                            {isBrekup == 0 ?
                                <>
                                    <Text style={[styles.buttonClose, { marginLeft: wp(3) }]}>Decorative item value<Text style={{ color: 'red' }}>*</Text></Text>
                                    <View style={[styles.inputFiled, { marginHorizontal: wp(2) }]}>
                                        <TextInput style={styles.input1}
                                            placeholderTextColor='#474747'
                                            placeholder='Amount in Rs.'
                                            value={inputs.ChargAmt}
                                            keyboardType='numeric'
                                            onChangeText={inputs => handleInputs('ChargAmt', inputs)}
                                        />
                                    </View>
                                </>
                                : null}
                            <Text style={[styles.buttonClose, { marginLeft: wp(3) }]}>Decorative item details <Text style={{ color: 'red' }}>*</Text></Text>

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
                                        color: 'grey',
                                        width: '100%',
                                        alignSelf: 'center',
                                        // fontFamily: 'Acephimere'
                                        fontSize: wp(4)
                                    }}
                                    selectedTextStyle={{
                                        color: '#474747',
                                        width: '100%',
                                        fontSize: wp(4),
                                        marginBottom: -1,
                                        fontFamily: 'Acephimere',
                                    }}
                                    // iconStyle={{ tintColor: '#ffff' }}
                                    data={decItemDetails}
                                    inputSearchStyle={{
                                        borderRadius: 10,
                                        backgroundColor: '#f0f0f0',
                                    }}
                                    itemTextStyle={{ color: '#474747' }}
                                    // itemContainerStyle={{ marginBottom: -20, }}
                                    searchPlaceholder="Decorative item details .."
                                    maxHeight={250}
                                    search
                                    labelField="label"
                                    valueField="value"
                                    placeholder="Decorative item details"
                                    value={inputs.DecoItemName}
                                    onChange={item => {
                                        handleInputs('DecoItemName', item.value)
                                    }}
                                />
                            </View>
                            <TouchableOpacity style={styles.buttonOpen}
                                onPress={() => AddDecorative('')}
                            >
                                <Text style={{ color: 'white', fontSize: wp(4.5), fontWeight: 'bold' }}>Add Decorative Detail</Text>
                            </TouchableOpacity>
                        </ScrollView>
                    </View>

                </View>
            </Modal>
        </View>

    );
};
export default DecorativeViewModal;
const DropData = [
    { label: 'Cts.', value: 'Cts.' },
    { label: 'Gms.', value: 'Gms.' },

];