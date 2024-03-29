import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Modal,
    TextInput, FlatList
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
const DiamondViewModal = ({ visi, close = () => { }, isBrekup, prodcutfile, ...props }) => {
    const dispatch = useDispatch();
    const productType = useSelector(state => state.ProductItem);
    const session_id = useSelector(state => state.session);
    const isFetching = useSelector(state => state.isFetching)
    const AddDiamond1 = useSelector(state => state.AddDaimond)
    const hProductSrNo = useSelector(state => state.HproductSrNo)

    const [inputs, setInputs] = useState({
        Diamondwt: '',
        ChargAmt: '',
        DiamondWtUnit: '',
        DiamondName: '',
        DiamondShape: '',
        DiamondQuality: '',
        hProductSrNo: '',
        hDiamondSrNo: '',
        isAdd: 1,
    })

    useEffect(() => {
        setInputs({
            Diamondwt: '',
            ChargAmt: '',
            DiamondWtUnit: '',
            DiamondName: '',
            DiamondShape: '',
            DiamondQuality: '',
            hDiamondSrNo: '',
            hProductSrNo: 0,
            isAdd: 1,
        });
    }, [AddDiamond1?.result]);

const closeFunction =()=>{
    close();
    setInputs({
        Diamondwt: '',
        ChargAmt: '',
        DiamondWtUnit: '',
        DiamondName: '',
        DiamondShape: '',
        DiamondQuality: '',
        hDiamondSrNo: '',
        hProductSrNo: 0,
        isAdd: 1,
    });
}

    const handleInputs = (text, input) => {
        setInputs(prev => ({ ...prev, [text]: input }));
    };
    const dimondDetails = productType?.dimondDetails?.map((item) => {
        return { label: item.Value, value: item.Value }
    })
    const dimondShape = productType?.dimondShape?.map((item) => {
        return { label: item.Value, value: item.Value }
    })
    const dimondQuality = productType?.dimondQuality?.map((item) => {
        return { label: item.Value, value: item.Value }
    })

    const validateInputs = () => {
      
            if (inputs.Diamondwt=='') {
            Toast.show('Please enter the diamond weight');   
            return;
           }else if(inputs.DiamondWtUnit==''){
            Toast.show('Please select the unit weight');   
            return;
           }else if(inputs.DiamondName==''){
            Toast.show('Please select the diamond details');   
            return;
           }else if(inputs.DiamondShape==''){
            Toast.show('Please select the diamond shape');   
            return;
           }else if(inputs.DiamondQuality==''){
            Toast.show('Please select the diamond quality');   
            return;
           }
        
    }


    const AddDiamond = async (isEdit, item) => {
      
        // if(item.SrNo == ""){
        //     if (!validateInputs()) {
        //         return;
        //     } 
        // }
        if (isEdit) {
            setInputs({
                Diamondwt: item?.StoneWt,
                DiamondWtUnit: item?.UnitStoneWt,
                DiamondName: item?.StoneName,
                ChargAmt: item?.StoneChargeableAmount,
                DiamondShape: item?.StoneShape,
                DiamondQuality: item?.StoneQuality,
                hDiamondSrNo: item.SrNo,
            });
        }
        else {
            if (inputs.Diamondwt==0) {
                Toast.show('Please enter the diamond weight');   
                return;
               }else if(inputs.DiamondWtUnit==''){
                Toast.show('Please select the unit weight');   
                return;
               }else if(inputs.DiamondName==''){
                Toast.show('Please select the diamond details');   
                return;
               }else if(inputs.DiamondShape==''){
                Toast.show('Please select the diamond shape');   
                return;
               }else if(inputs.DiamondQuality==''){
                Toast.show('Please select the diamond quality');   
                return;
               }
            const Token = await AsyncStorage.getItem('loginToken');
            const Id = await AsyncStorage.getItem('Partnersrno');

           
            dispatch({
                type: 'product_addDiamond_Request',
                url: 'partners/addDiamond',
                Token: Token,
                data: {
                    ...inputs,
                    current_session_id: prodcutfile ? 0 : session_id,
                    BreakUp: isBrekup == 0 ? 1 : 0,
                    hProductSrNo: prodcutfile ? hProductSrNo : 0,
                    isAdd: prodcutfile ? 0 : 1,
                }
            })
        }
    }
    const RemoveDiamond = async (item) => {
       
        const Token = await AsyncStorage.getItem('loginToken');
        dispatch({
            type: 'product_removeDiamond_Request',
            url: 'partners/removeDiamond',
            Token: Token,
            DiamondId: item.SrNo,
            hProductSrNo: prodcutfile ? hProductSrNo : 0,
            current_session_id: prodcutfile ? 0 : item.Session
        })

    }



   

    return (

        <View style={styles.container}>
            <Modal animationType='fade' transparent visible={visi} >
            <View style={{flex:1,backgroundColor:'rgba(69, 71, 71,0.9)',justifyContent:'center'}}>
                {isFetching ? <Loading /> : null}
                <View style={styles.modalView}>
                    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: wp(4) }}>
                        <TouchableOpacity onPress={() => closeFunction()} style={styles.crossbtn}>
                            <Text style={styles.xbtn}>X</Text>
                        </TouchableOpacity>
                        <View style={styles.modalText}>
                            <View style={styles.item}>
                                <Text style={styles.textItem}>Diamond Details</Text>

                            </View>
                            <View style={{ width: wp(60) }}>
                                <Text style={styles.deta}>(DETAILS OF PRECIOUS Diamond S USED IN PRODUCT)</Text>
                            </View>
                        </View>

                        {
                            <View>
                                {AddDiamond1?.result ? <FlatList
                                    data={AddDiamond1?.result}
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
                                                    <TouchableOpacity onPress={() => AddDiamond('edit', item)}>
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
                                                    <TouchableOpacity onPress={() => RemoveDiamond(item)}>
                                                        <MaterialCommunityIcons
                                                            name="delete"
                                                            size={wp(4.5)}
                                                            color={'black'}
                                                        />
                                                    </TouchableOpacity>
                                                </View>
                                                <View style={[styles.cartItem, { marginTop: wp(5) }]}>
                                                    <Text style={[styles.cardTitle, { color: 'black' }]}>
                                                        Diamond Name
                                                    </Text>

                                                    <Text style={[styles.cardTitle, styles.dot]}>:</Text>
                                                    <Text style={[styles.cardTitle, { color: 'black' }]}>{item?.StoneName}</Text>
                                                </View>
                                                <View style={styles.cartItem}>
                                                    <Text style={[styles.cardTitle, { color: 'black' }]}>
                                                        Diamond Wt.
                                                    </Text>

                                                    <Text style={[styles.cardTitle, styles.dot]}>:</Text>
                                                    <Text style={[styles.cardTitle, { color: 'black' }]}>{item?.StoneWt}</Text>
                                                </View>
                                                <View style={styles.cartItem}>
                                                    <Text style={[styles.cardTitle, { color: 'black' }]}>
                                                        Unit of Diamond Wt.
                                                    </Text>
                                                    <Text style={[styles.cardTitle, styles.dot]}>:</Text>
                                                    <Text style={[styles.cardTitle, { color: 'black' }]}>
                                                        {item?.UnitStoneWt}
                                                    </Text>
                                                </View>
                                                <View style={styles.cartItem}>
                                                    <Text style={[styles.cardTitle, { color: 'black' }]}>
                                                        Diamond Quality
                                                    </Text>

                                                    <Text style={[styles.cardTitle, styles.dot]}>:</Text>
                                                    <Text style={[styles.cardTitle, { color: 'black' }]}>
                                                        {item?.StoneQuality}
                                                    </Text>
                                                </View>
                                                <View style={styles.cartItem}>
                                                    <Text style={[styles.cardTitle, { color: 'black' }]}>
                                                        Diamond Shape
                                                    </Text>

                                                    <Text style={[styles.cardTitle, styles.dot]}>:</Text>
                                                    <Text style={[styles.cardTitle, { color: 'black' }]}>
                                                        {item?.StoneShape}
                                                    </Text>
                                                </View>
                                                {isBrekup == 0 ?
                                                    <View style={styles.cartItem}>
                                                        <Text style={[styles.cardTitle, { color: 'black' }]}>
                                                            Diamond value
                                                        </Text>

                                                        <Text style={[styles.cardTitle, styles.dot]}>:</Text>
                                                        <Text style={[styles.cardTitle, { color: 'black' }]}>
                                                            {item?.StoneChargeableAmount}
                                                        </Text>
                                                    </View> : null}
                                            </View>
                                        )
                                    }}
                                /> : null}

                            </View>}



                        <View style={{ marginLeft: wp(1) }}>
                            <Text style={styles.buttonClose}>Diamond weight <Text style={{ color: 'red' }}>*</Text></Text>
                            <View style={styles.inputFiled}>
                                <TextInput style={styles.input1}
                                    placeholderTextColor='#474747'
                                placeholder='Diamond weight'
                                keyboardType='numeric'
                                    value={inputs.Diamondwt}
                                    onChangeText={inputs => handleInputs('Diamondwt', inputs)}
                                />
                            </View>
                            <Text style={[styles.buttonClose, { marginLeft: wp(1) }]}>Unit of wt. <Text style={{ color: 'red' }}>*</Text></Text>
                        </View>
                        <View style={[styles.inputFiled, { marginLeft: wp(1), paddingHorizontal: 10 }]}>
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
                                    fontSize: wp(4.5),
                                    marginBottom: -1,
                                    fontFamily: 'Acephimere',
                                }}
                                // iconStyle={{ tintColor: '#ffff' }}
                                data={DropData}
                                inputSearchStyle={{
                                    borderRadius: 10,
                                    backgroundColor: '#f0f0f0',
                                }}
                                 itemTextStyle={{ color:'#474747' }}
                                // itemContainerStyle={{ marginBottom: -20, }}
                                searchPlaceholder="search.."
                                maxHeight={250}
                                search
                                labelField="label"
                                valueField="value"
                                placeholder="CTS"
                                value={inputs.DiamondWtUnit}
                                onChange={item => {
                                    handleInputs('DiamondWtUnit', item.value)
                                }}
                            />
                        </View>
                        {isBrekup == 0 ?
                            <>
                                <Text style={[styles.buttonClose, { marginLeft: wp(2) }]}>Diamond Value<Text style={{ color: 'red' }}>*</Text></Text>
                                <View style={[styles.inputFiled, { marginHorizontal: wp(1) }]}>
                                    <TextInput style={styles.input1}
                                    placeholderTextColor='#474747'
                                    placeholder='Amount in Rs.'
                                    keyboardType='numeric'
                                        value={inputs.ChargAmt}
                                        onChangeText={(input) => handleInputs('ChargAmt', input)}
                                    />
                                </View>
                            </>
                            : null}
                      
                        <Text style={[styles.buttonClose, { marginLeft: wp(2) }]}>Diamond details <Text style={{ color: 'red' }}>*</Text></Text>
                        <View style={[styles.inputFiled, { paddingHorizontal: 10, marginHorizontal: wp(1) }]}>
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
                                    fontSize: wp(4.5)
                                }}
                                selectedTextStyle={{
                                    color: '#474747',
                                    width: '100%',
                                    fontSize: wp(4.5),
                                    marginBottom: -1,
                                    fontFamily: 'Acephimere',
                                }}
                                // iconStyle={{ tintColor: '#ffff' }}
                                data={dimondDetails}
                                inputSearchStyle={{
                                    borderRadius: 10,
                                    backgroundColor: '#f0f0f0',
                                }}
                                 itemTextStyle={{ color:'#474747'}}
                                // itemContainerStyle={{ marginBottom: -20, }}
                                searchPlaceholder="search.."
                                maxHeight={250}
                                search
                                labelField="label"
                                valueField="value"
                                placeholder="Diamond details"
                                value={inputs.DiamondName}
                                onChange={item => {
                                    handleInputs('DiamondName', item.value)
                                }}
                            />
                        </View>
                        <Text style={[styles.buttonClose, { marginLeft: wp(2) }]}>Diamond Shape <Text style={{ color: 'red' }}>*</Text></Text>
                        <View style={[styles.inputFiled, { paddingHorizontal: 10, marginHorizontal: wp(1) }]}>
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
                                    fontSize: wp(4.5)
                                }}
                                selectedTextStyle={{
                                    color: '#474747',
                                    width: '100%',
                                    fontSize: wp(4.5),
                                    marginBottom: -1,
                                    fontFamily: 'Acephimere',
                                }}
                                // iconStyle={{ tintColor: '#ffff' }}
                                data={dimondShape}
                                inputSearchStyle={{
                                    borderRadius: 10,
                                    backgroundColor: '#f0f0f0',
                                }}
                                 itemTextStyle={{ color:'#474747'}}
                                // itemContainerStyle={{ marginBottom: -20, }}
                                searchPlaceholder="search.."
                                maxHeight={250}
                                search
                                labelField="label"
                                valueField="value"
                                placeholder="Diamond Shape"
                                value={inputs.DiamondShape}
                                onChange={item => {
                                    handleInputs('DiamondShape', item.value)
                                }}
                            />
                        </View>
                        <Text style={[styles.buttonClose, { marginLeft: wp(2) }]}>Diamond Quality <Text style={{ color: 'red' }}>*</Text></Text>
                        <View style={[styles.inputFiled, { paddingHorizontal: 10, marginHorizontal: wp(1) }]}>
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
                                    fontSize: wp(4.5)
                                }}
                                selectedTextStyle={{
                                    color: '#474747',
                                    width: '100%',
                                    fontSize: wp(4.5),
                                    marginBottom: -1,
                                    fontFamily: 'Acephimere',
                                }}
                                // iconStyle={{ tintColor: '#ffff' }}
                                data={dimondQuality}
                                inputSearchStyle={{
                                    borderRadius: 10,
                                    backgroundColor: '#f0f0f0',
                                }}
                                 itemTextStyle={{ color:'#474747'}}
                                // itemContainerStyle={{ marginBottom: -20, }}
                                searchPlaceholder="search.."
                                maxHeight={250}
                                search
                                labelField="label"
                                valueField="value"
                                placeholder="Diamond Quality"
                                value={inputs.DiamondQuality}
                                onChange={item => {
                                    handleInputs('DiamondQuality', item.value)
                                }}
                            />
                        </View>

                        <TouchableOpacity style={styles.buttonOpen}
                            onPress={() => AddDiamond('')}
                        >
                            <Text style={{ color: 'white', fontSize: wp(4.5), fontWeight: 'bold' }}>Add Diamond Detail</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </View>
</View>

            </Modal>
        </View>

    );
};
export default DiamondViewModal;
const DropData = [
    { label: 'Cts.', value: 'Cts.' },
    { label: 'Gms.', value: 'Gms.' },

];