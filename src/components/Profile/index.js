import React from 'react';
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
  const ownerImagePath = useSelector(
    state => state.SupplierDetail?.ownerImagePath,
  );

  return (
    <View style={{flex: 1, backgroundColor: '#fff', paddingVertical: 20}}>
      {/* {isFetching ? <Loader /> : null} */}

      <View style={{paddingHorizontal: 20, alignItems: 'flex-start'}}>
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
            style={{color: '#fff', fontSize: wp(4), fontFamily: 'Acephimere'}}>
            About us
          </Text>
        </View>
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
            style={{color: '#fff', fontSize: wp(4), fontFamily: 'Acephimere'}}>
            Founders
          </Text>
        </View>

        <View style={{flexDirection: 'row'}}>
          {selector?.ownerDetail?.map(item =>
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
            style={{color: '#fff', fontSize: wp(4), fontFamily: 'Acephimere'}}>
            Products
          </Text>
        </View>

        <View style={{flexDirection: 'row'}}>
          {selector?.productImg?.map(item =>
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

        <View>
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
          <View style={{paddingHorizontal: 20, marginTop: 20}}>
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
          </View>
        

        <View>
          <View
            style={{
              backgroundColor: '#032e63',
              //  paddingHorizontal: 20,
              // paddingVertical: 8,
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
          <View style={{paddingHorizontal: 20, marginTop: 20}}>
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
                {/* <Text style={{marginLeft:30,fontSize:14,fontFamily:'Acephimere',color:'#424242'}}>{'Ph:9876567898 '}</Text>
                     <Text style={{marginLeft:30,fontSize:14,fontFamily:'Acephimere',color:'#424242'}}>{'Ph:9876567898 '}</Text> */}
              </View>
            </View>
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
