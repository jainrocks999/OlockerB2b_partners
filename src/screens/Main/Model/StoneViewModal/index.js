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
const StoneViewModal = ({ visi, close = () => { }, isBrekup, prodcutfile, ...props }) => {
    const productType = useSelector(state => state.ProductItem);
    const session_id = useSelector(state => state.session);
    const AddStone1 = useSelector(state => state.AddStone)
    const hProductSrNo = useSelector(state => state.HproductSrNo)
   
    const isFetching = useSelector(state => state.isFetching)
    const dispatch = useDispatch();
    const [inputs, setInputs] = useState({
        StoneWt: '',
        StoneWtUnit: '',
        ChargAmt: '',
        StoneName: '',
        isAdd: 1,
        hProductSrNo: '',
        hStonesSrNo: '',
        current_session_id: '',
    })
    useEffect(() => {
        setInputs({
            StoneWt: '',
            StoneWtUnit: '',
            ChargAmt: '',
            StoneName: '',
            isAdd: 1,
            hProductSrNo: 0,
            hStonesSrNo: '',
            current_session_id: prodcutfile ? 0 : session_id,
        })

    }, [AddStone1?.result])


    const handleInputs = (text, input) => {
        setInputs(prev => ({ ...prev, [text]: input }));
    };

    const stoneDetails = productType?.stoneDetails?.map((item) => {
        return { label: item.Value, value: item.Value }
    })

    const AddStone = async (isEdit, item) => {
      
        if (isEdit) {
            setInputs({
                ChargAmt: item?.StoneChargeableAmount,
                StoneWtUnit: item?.UnitStoneWt,
                StoneWt: item?.StoneWt,
                StoneName: item?.StoneName,

                hStonesSrNo: item.SrNo,

            })
        }

        else {

            const Token = await AsyncStorage.getItem('loginToken');
            const Id = await AsyncStorage.getItem('Partnersrno');
            dispatch({
                type: 'product_addStone_Request',
                url: 'partners/addStone',
                Token: Token,

                data: {
                    ...inputs,
                    BreakUp: isBrekup == 0 ? 1 : 0,
                    isAdd: prodcutfile ? 0 : 1,
                    current_session_id: prodcutfile ? 0 : session_id,
                    hProductSrNo: prodcutfile ? hProductSrNo : 0,
                },

            })

        }
    }

    const RemoveStone = async (item) => {
        const Token = await AsyncStorage.getItem('loginToken');
        dispatch({
            type: 'product_removeStone_Request',
            url: 'partners/removeStone',
            Token: Token,
            StoneId: item.SrNo,
            current_session_id: prodcutfile ? 0 : item.Session,
            hProductSrNo: prodcutfile ? hProductSrNo : 0,
        })

    }

    return (
        <View style={styles.container}>
            <Modal animationType='fade' transparent visible={visi} >
                {isFetching ? <Loading /> : null}
                <View style={styles.modalView}>
                    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: wp(4) }}>
                        <TouchableOpacity onPress={() => close()} style={styles.crossbtn}>
                            <Text style={styles.xbtn}>X</Text>
                        </TouchableOpacity>
                        <View style={styles.modalText}>
                            <View style={styles.item}>
                                <Text style={styles.textItem}>Stone Details</Text>
                            </View>
                            <View style={{ width: wp(60) }}>
                                <Text style={styles.deta}>(DETAILS OF PRECIOUS/SEMI-PRECIOUS STONES USED IN PRODUCT)</Text>
                            </View>
                        </View>

                        {AddStone1?.result ? (
                            <View>

                                <FlatList
                                    data={AddStone1?.result}
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
                                                    <TouchableOpacity onPress={() => AddStone('edit', item)}>
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
                                                    <TouchableOpacity onPress={() => RemoveStone(item)}>
                                                        <MaterialCommunityIcons
                                                            name="delete"
                                                            size={wp(4.5)}
                                                            color={'black'}
                                                        />
                                                    </TouchableOpacity>
                                                </View>
                                                <View style={[styles.cartItem, { marginTop: wp(5) }]}>
                                                    <Text style={[styles.cardTitle, { color: 'black' }]}>
                                                        StoneName
                                                    </Text>

                                                    <Text style={[styles.cardTitle, styles.dot]}>:</Text>
                                                    <Text style={[styles.cardTitle, { color: 'black' }]}>
                                                        {item?.StoneName}</Text>
                                                </View>
                                                <View style={styles.cartItem}>
                                                    <Text style={[styles.cardTitle, { color: 'black' }]}>
                                                        StoneWt.
                                                    </Text>

                                                    <Text style={[styles.cardTitle, styles.dot]}>:</Text>
                                                    <Text style={[styles.cardTitle, { color: 'black' }]}>
                                                        {item?.StoneWt}</Text>
                                                </View>
                                                <View style={styles.cartItem}>
                                                    <Text style={[styles.cardTitle, { color: 'black' }]}>
                                                        UnitStoneWt
                                                    </Text>
                                                    <Text style={[styles.cardTitle, styles.dot]}>:</Text>
                                                    <Text style={[styles.cardTitle, { color: 'black' }]}>
                                                        {item?.UnitStoneWt}
                                                    </Text>
                                                </View>
                                                {isBrekup == 0 ?
                                                    <View style={styles.cartItem}>
                                                        <Text style={[styles.cardTitle, { color: 'black' }]}>
                                                            StoneChargeableAmount
                                                        </Text>
                                                        <Text style={[styles.cardTitle, styles.dot]}>:</Text>
                                                        <Text style={[styles.cardTitle, { color: 'black' }]}>
                                                            {item?.StoneChargeableAmount}
                                                        </Text>
                                                    </View> : null

                                                }
                                            </View>


                                        )
                                    }}
                                />
                            </View>) : null}

                        <View style={{ marginLeft: wp(1) }}>
                            <Text style={styles.buttonClose}>Stone weight <Text style={{ color: 'red' }}>*</Text></Text>
                            {/* <View style={[styles.inputFiled, { paddingHorizontal: 10, marginHorizontal: wp(2) }]}>
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
                                    // itemTextStyle={{ fontSize: 15 }}
                                    // itemContainerStyle={{ marginBottom: -20, }}
                                    searchPlaceholder="search.."
                                    maxHeight={250}
                                    search
                                    labelField="label"
                                    valueField="value"
                                    placeholder="Stone weight"
                                    value={inputs.stoneweight}
                                    onChange={item => {
                                        handleInputs('stoneweight', item.value)
                                    }}
                                />
                            </View> */}

                            <View style={styles.inputFiled}>
                                <TextInput style={styles.input1}
                                    placeholderTextColor='#474747'
                                placeholder='Stone Wt '
                                    value={inputs.StoneWt}
                                    onChangeText={inputs => handleInputs('StoneWt', inputs)}
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
                                    fontSize: wp(4),
                                    marginBottom: -1,
                                    fontFamily: 'Acephimere',
                                }}
                                // iconStyle={{ tintColor: '#ffff' }}
                                data={DropData}
                                inputSearchStyle={{
                                    borderRadius: 10,
                                    backgroundColor: '#f0f0f0',
                                }}
                                itemTextStyle={{color:'#474747' }}
                                // itemContainerStyle={{ marginBottom: -20, }}
                                searchPlaceholder="search.."
                                maxHeight={250}
                                search
                                labelField="label"
                                valueField="value"
                                placeholder="Cts"
                                value={inputs.StoneWtUnit}
                                onChange={item => {
                                    handleInputs('StoneWtUnit', item.value)
                                }}
                            />
                        </View>
                        {isBrekup == 0 ?
                            <>

                                <Text style={[styles.buttonClose, { marginLeft: wp(3) }]}>Stone value<Text style={{ color: 'red' }}>*</Text></Text>
                                <View style={[styles.inputFiled, { marginHorizontal: wp(2) }]}>
                                    <TextInput style={styles.input1}
                                    placeholderTextColor='#474747'
                                    placeholder='Amount in Rs.'

                                        value={inputs.ChargAmt}
                                        onChangeText={(input) => handleInputs('ChargAmt', input)}
                                    />

                                </View>
                            </>
                            : null}
                        {/*  <Text style={[styles.buttonClose, { marginLeft: wp(3) }]}>Metal net wt.<Text style={{ color: 'red' }}>*</Text></Text>
                        <View style={[styles.inputFiled, { marginHorizontal: wp(2) }]}>
                            <TextInput placeholder='Gross Wt Gms.' />
                        </View> */}
                        <Text style={[styles.buttonClose, { marginLeft: wp(3) }]}>Stone details <Text style={{ color: 'red' }}>*</Text></Text>

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
                                data={stoneDetails}
                                inputSearchStyle={{
                                    borderRadius: 10,
                                    backgroundColor: '#f0f0f0',
                                }}
                               itemTextStyle={{color:'#474747'}}
                                // itemContainerStyle={{ marginBottom: -20, }}
                                searchPlaceholder="search.."
                                maxHeight={250}
                                search
                                labelField="label"
                                valueField="value"
                                placeholder="Stone Detail"
                                value={inputs.StoneName}
                                onChange={item => {
                                   
                                    handleInputs('StoneName', item.value)
                                }}
                            />
                        </View>
                        <TouchableOpacity style={styles.buttonOpen}
                            onPress={() => AddStone()}
                        >
                            <Text style={{ color: 'white', fontSize: wp(4.5), fontWeight: 'bold' }}>Add Stone Detail</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </View>
            </Modal>
        </View>

    );
};
export default StoneViewModal;
const DropData = [
    { label: 'Cts.', value: 'Cts.' },
    { label: 'Gms.', value: 'Gms.' },

];