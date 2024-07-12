import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, Image, FlatList} from 'react-native';
import ImagePath from '../ImagePath';
import {useSelector} from 'react-redux';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const Profile = () => {
  const selector = useSelector(state => state.SupplierDetail?.detail);
  const isFetching = useSelector(state => state.isFetching);
  const [ownerDetails, setOwnerDetails] = useState([]);
  const [productImg1, setProductImg1] = useState([]);

  useEffect(() => {
    const original = Array.isArray(selector?.productImg)
      ? selector?.productImg
      : [];
    getOwneres1(original);
  }, [selector]);
  const getOwneres1 = array => {
    const filtered = array.filter(item => item.ImageName != null);
    setProductImg1(filtered);
  };

  useEffect(() => {
    const original = Array.isArray(selector?.ownerDetail)
      ? selector?.ownerDetail
      : [];
    getOwneres(original);
  }, [selector]);
  const getOwneres = array => {
    const filtered = array.filter(item => item.ImageName != null);
    setOwnerDetails(filtered);
  };

  const ownerImagePath = useSelector(
    state => state.SupplierDetail?.ownerImagePath,
  );
  console.log('details  addd to network ', selector);
  return (
    <View style={{flex: 1, backgroundColor: '#fff', paddingVertical: 20}}>
      {/* {isFetching ? <Loader /> : null} */}

      <View style={{paddingHorizontal: 20, alignItems: 'flex-start'}}>
        {selector?.SupplierIntroduction ? (
          <View
            style={{
              backgroundColor: '#032e63',
              //  paddingHorizontal: 20,
              //  paddingVertical: 8,
              borderRadius: 20,
              height: hp(5),
              width: wp(35),
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                color: '#fff',
                fontSize: wp(4),
                fontFamily: 'Acephimere',
              }}>
              About us
            </Text>
          </View>
        ) : null}
        <Text
          style={{
            fontSize: wp(4),
            textAlign: 'center',
            marginTop: 20,
            color: '#535353',
            fontFamily: 'Acephimere',
            marginLeft: wp(3),
          }}>
          {selector?.SupplierIntroduction}
        </Text>

        {ownerDetails.length == 0 ? null : (
          <View
            style={{
              backgroundColor: '#032e63',
              // paddingHorizontal: 19,
              //  paddingVertical: 8,
              borderRadius: 20,
              height: hp(5),
              width: wp(35),
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 15,
            }}>
            <Text
              style={{
                color: '#fff',
                fontSize: wp(4),
                fontFamily: 'Acephimere',
              }}>
              Founders
            </Text>
          </View>
        )}

        <View style={{flexDirection: 'row'}}>
          {ownerDetails?.map(item =>
            item.Type == 'Owner Image' ? (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: wp(32),
                  paddingVertical: 15,
                }}>
                <View style={{width: '80%', alignItems: 'center'}}>
                  {item.ImageName != null ? (
                    <View style={{height: 90, width: '100%', borderWidth: 1}}>
                      <Image
                        style={{height: '100%', width: '100%'}}
                        resizeMode={'stretch'}
                        source={{uri: `${ownerImagePath}${item.ImageName}`}}
                      />

                      {/* <Image
                      style={{ height: '100%', width: '100%' }}
                      resizeMode={'stretch'}
                      source={

                        item.ImageName!=null? { uri: `${ownerImagePath}${item.ImageName}` } : require('../../assets/logo.png')}
                    /> */}
                    </View>
                  ) : null}
                  <Text
                    style={{
                      marginTop: 5,
                      color: '#032e63',
                      fontFamily: 'Acephimere',
                      fontSize: 13,
                    }}>
                    {item.OwnerName}
                  </Text>
                </View>
              </View>
            ) : null,
          )}
        </View>

        {productImg1.length == 0 ? null : (
          <View
            style={{
              backgroundColor: '#032e63',
              // paddingHorizontal: 19,
              //  paddingVertical: 8,
              borderRadius: 20,
              height: hp(5),
              width: wp(35),
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 15,
            }}>
            <Text
              style={{
                color: '#fff',
                fontSize: wp(4),
                fontFamily: 'Acephimere',
              }}>
              Products
            </Text>
          </View>
        )}
        <View style={{flexDirection: 'row'}}>
          {productImg1?.map(item =>
            item.Type == 'Product Image' ? (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: wp(32),
                  paddingVertical: 15,
                }}>
                <View style={{width: '80%', alignItems: 'center'}}>
                  {item.ImageName != null ? (
                    <View style={{height: 90, width: '100%', borderWidth: 1}}>
                      <Image
                        style={{height: '100%', width: '100%'}}
                        resizeMode={'stretch'}
                        source={{uri: `${ownerImagePath}${item.ImageName}`}}
                      />
                    </View>
                  ) : null}
                  <Text
                    style={{
                      marginTop: 5,
                      color: '#032e63',
                      fontFamily: 'Acephimere',
                      fontSize: 13,
                    }}>
                    {item.OwnerName}
                  </Text>
                </View>
              </View>
            ) : null,
          )}
        </View>

        <View>
          {selector?.showroomImg?.length == 0 ? null : (
            <View
              style={{
                backgroundColor: '#032e63',
                //  paddingHorizontal: 12,
                //  paddingVertical: 8,
                borderRadius: 20,
                height: hp(5),
                width: wp(35),
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 15,
              }}>
              <Text
                style={{
                  color: '#fff',
                  fontSize: wp(4),
                  fontFamily: 'Acephimere',
                  // width: '90%',
                }}>
                Showrooms
              </Text>
            </View>
          )}
          <View style={{flexDirection: 'row'}}>
            {selector?.showroomImg?.map(item =>
              item.Type == 'ShowRoom Image' ? (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: wp(32),
                    paddingVertical: 15,
                  }}>
                  <View style={{width: '80%', alignItems: 'center'}}>
                    {item.ImageName != null ? (
                      <View style={{height: 90, width: '100%', borderWidth: 1}}>
                        <Image
                          style={{height: '100%', width: '100%'}}
                          resizeMode={'stretch'}
                          source={{uri: `${ownerImagePath}${item.ImageName}`}}
                        />

                        {/* <Image
                      style={{ height: '100%', width: '100%' }}
                      resizeMode={'stretch'}
                      source={

                        item.ImageName!=null? { uri: `${ownerImagePath}${item.ImageName}` } : require('../../assets/logo.png')}
                    /> */}
                      </View>
                    ) : null}
                  </View>
                </View>
              ) : null,
            )}
          </View>
        </View>

        {selector?.Address ? (
          <View
            style={{
              backgroundColor: '#032e63',
              //  paddingHorizontal: 12,
              //  paddingVertical: 8,
              borderRadius: 20,
              height: hp(5),
              width: wp(35),
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 15,
            }}>
            <Text
              style={{
                color: '#fff',
                fontSize: wp(4),
                fontFamily: 'Acephimere',
                // width: '90%',
              }}>
              Address
            </Text>
          </View>
        ) : null}

        <View style={{paddingHorizontal: 20, marginTop: 20}}>
          {selector?.Address ? (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                style={{height: 30, width: 22}}
                source={require('../../assets/Image/loc.png')}
              />
              <Text
                style={{
                  marginLeft: 20,
                  fontSize: wp(4),
                  fontFamily: 'Acephimere',
                  color: '#424242',
                }}>
                {selector?.Address}
              </Text>
            </View>
          ) : null}
        </View>

        <View>
          {selector?.MobileNo || selector.EmailId ? (
            <View
              style={{
                backgroundColor: '#032e63',
                borderRadius: 20,

                height: hp(5),
                width: wp(35),
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 15,
              }}>
              <Text
                style={{
                  color: '#fff',
                  fontSize: wp(4),
                  fontFamily: 'Acephimere',
                }}>
                Contact
              </Text>
            </View>
          ) : null}

          <View style={{paddingHorizontal: 20, marginTop: 20}}>
            {selector?.MobileNo ? (
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image
                  style={{height: 28, width: 28}}
                  source={require('../../assets/PartnerImage/16.png')}
                />
                <View>
                  <Text
                    style={{
                      marginLeft: 20,
                      fontSize: wp(4),
                      fontFamily: 'Acephimere',
                      color: '#424242',
                    }}>{`+91${selector?.MobileNo}`}</Text>
                </View>
              </View>
            ) : null}
            {selector?.EmailId ? (
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 20,
                  alignItems: 'center',
                }}>
                <Image
                  style={{height: 28, width: 28}}
                  source={require('../../assets/PartnerImage/msg.png')}
                />
                <View>
                  <Text
                    style={{
                      marginLeft: 20,
                      fontSize: wp(4),
                      fontFamily: 'Acephimere',
                      color: '#424242',
                    }}>
                    {selector?.EmailId}
                  </Text>
                </View>
              </View>
            ) : null}

            {/* <View style={{ flexDirection: 'row', marginTop: 20 }}>
              <Image
                style={{ height: 28, width: 28 }}
                source={require('../../assets/PartnerImage/facebook.png')}
              />
              <View>
                <Text
                  style={{
                    marginLeft: 20,
                    fontSize: 14,
                    fontWeight: '600',
                    fontFamily: 'Acephimere',
                  }}>
                  {'fb.com/rcbafna '}
                </Text>
              </View>
            </View> */}

            <View style={{height: 100}} />
          </View>
        </View>
      </View>
    </View>
  );
};
export default Profile;
