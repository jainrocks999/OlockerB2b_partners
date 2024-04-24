import React from 'react';
import { Image } from 'react-native';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../screens/Auth/SplashPage';
import Login from '../screens/Auth/LoginPage';
import ForgotPassword from "../screens/Auth/ForgotPassword";
import Register from '../screens/Auth/RegisterPage';
import HomeScreen from '../screens/Main/HomeScreen';
import MyCatalogue from '../screens/Main/MyCatalogue';
import SelectOption from '../screens/Main/SelectOption';
import AddCategory from '../screens/Main/Addcategory';
import Addcollection from '../screens/Main/Addcollection';
import Addproduct from '../screens/Main/Addproduct';
import DetailsFav from '../screens/Main/FavrateDetailsPage';
import MyProductDetails from '../screens/Main/MyProductDetails';
import SubCategory from '../screens/Main/SubCategory';
import MessageList from '../screens/Main/MessageList';
import Customers from '../screens/Main/Customers';
import Mycustomer from '../screens/Main/Mycustomers';
import MyCustomerDetail from '../screens/Main/MyCustomerDetail';
import Feedback from '../screens/Main/Feedback';
import Messagebox from '../screens/Main/Messagebox';
import Chat from '../screens/Main/MessageboxChat';
import Purchase from '../screens/Main/Purchasehistory';
import LoyaltyPage from '../screens/Main/Loyaltypage';
import Loyalty from '../screens/Main/Loyalty';
import MyNetwork from '../screens/Main/MyNetwork';
import PendingRequest from '../screens/Main/PendingRequest';
import SentRequest from '../screens/Main/SentRequest';
import MyNetworks from '../screens/Main/MyNetworks';
import PartnerProfile from '../screens/Main/PartnerProfile';
import editProduct from '../screens/Main/EditProductDetails';
import CategoryDetails from '../screens/Main/CategoryDetails';
import MyProducts from '../screens/Main/MyProducts';
import Filter from '../screens/Main/Filter';
import Edit from '../screens/Main/Editprofile';
import ChangePassword from '../screens/Main/ChangePassword';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ChatScreen from '../screens/Main/ChatScreen'
import MessageBox2 from '../screens/Main/MessageBox2';

const Stack1 = createNativeStackNavigator();
function HomeScreen1() {
  return (
    <Stack1.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}>
      <Stack1.Screen name="Home" component={HomeScreen} />
      <Stack1.Screen name="SelectOption" component={SelectOption} />
      <Stack1.Screen name="Addcategory" component={AddCategory} />
      <Stack1.Screen name="Addproduct" component={Addproduct} />
      <Stack1.Screen name="Addcollection" component={Addcollection} />
      <Stack1.Screen name="MyCatalogue" component={MyCatalogue} />
      <Stack1.Screen name="MyProductDetails" component={MyProductDetails} />
      <Stack1.Screen name="SubCategory" component={SubCategory} />
      <Stack1.Screen name="MyProducts" component={MyProducts} />
      <Stack1.Screen name="CategoryDetails" component={CategoryDetails} />
      <Stack1.Screen name="Filter" component={Filter} />
      <Stack1.Screen name="FavDetails" component={DetailsFav} />
      <Stack1.Screen name="Editproduct" component={editProduct} />

    </Stack1.Navigator>
  );
}
const Stack3 = createNativeStackNavigator();
function Customer1() {
  return (
    <Stack3.Navigator
      initialRouteName="Customers"
      screenOptions={{ headerShown: false }}>
      <Stack3.Screen name="Customers" component={Customers} />
      <Stack3.Screen name="Mycustomer" component={Mycustomer} />
      <Stack3.Screen name="Feedback" component={Feedback} />
      <Stack3.Screen name="MyCustomerDetail" component={MyCustomerDetail} />
      <Stack3.Screen name="Messagebox" component={Messagebox} />
      <Stack3.Screen name="Purchase" component={Purchase} />
      <Stack3.Screen name="Editprofile" component={Edit} />
      <Stack3.Screen name="changepassword" component={ChangePassword} />
      <Stack3.Screen name="Loyalty" component={Loyalty} />
      <Stack3.Screen name="Loyalty1" component={LoyaltyPage} />
      <Stack3.Screen name="Chat" component={Chat} />
    </Stack3.Navigator>
  );
}
const Stack2 = createNativeStackNavigator();
function MyNetwork1() {
  return (
    <Stack2.Navigator
      initialRouteName="MyNetwork"
      screenOptions={{ headerShown: false }}>
      <Stack2.Screen name="MyNetwork" component={MyNetwork} />
      <Stack2.Screen name="MyNetworks" component={MyNetworks} />
      <Stack2.Screen name="PartnerProfile" component={PartnerProfile} />
      <Stack2.Screen name="PendingRequest" component={PendingRequest} />
      <Stack2.Screen name="SentRequest" component={SentRequest} />
    </Stack2.Navigator>
  );
}
const Tab = createBottomTabNavigator();
function Bottom() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,

        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: '#01377d',
          paddingTop: 5,
          paddingBottom: 5,
        },
      }}>
      <Tab.Screen
        name="Home1"
        component={HomeScreen1}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <Image
                style={{
                  tintColor: focused ? '#fff' : 'grey',
                  height: 26,
                  width: 24,
                }}
                source={require('../assets/For.png')}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="MyNetwork1"
        component={MyNetwork1}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <Image
                style={{
                  tintColor: focused ? '#fff' : 'grey',
                  height: 26,
                  width: 26,
                }}
                source={require('../assets/Lay.png')}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Message"
        component={MessageList}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <Image
                style={{
                  tintColor: focused ? '#fff' : 'grey',
                  height: 28,
                  width: 28,
                }}
                source={require('../assets/noti.png')}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Customer1"
        component={Customer1}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <Image
                style={{
                  tintColor: focused ? '#fff' : 'grey',
                  height: 25,
                  width: 22,
                }}
                source={require('../assets/Sh.png')}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
}

const Stack = createNativeStackNavigator();
function Navigate() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Home" component={Bottom} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="RegisterPage" component={Register} />
        <Stack1.Screen name='ChatScreen' component={ChatScreen} />
        <Stack1.Screen name='MessageBox' component={MessageBox2} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default Navigate;
// const Stack = createNativeStackNavigator();
// function Navigate() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator
//         initialRouteName="Splash"
//         screenOptions={{headerShown: false}}>
//         <Stack.Screen name="Splash" component={SplashScreen} />
//         <Stack.Screen name="Login" component={Login} />
//         <Stack.Screen name="RegisterPage" component={Register} />
//         <Stack.Screen name="Home" component={HomeScreen} />
//         <Stack.Screen name="MyCatalogue" component={MyCatalogue} />
//         <Stack.Screen name="SelectOption" component={SelectOption} />
//         <Stack.Screen name="Addcategory" component={AddCategory} />
//         <Stack.Screen name="Addproduct" component={Addproduct} />
//         <Stack.Screen name="Addcollection" component={Addcollection} />
//         <Stack.Screen name="FavDetails" component={DetailsFav} />
//         <Stack.Screen name="MyProductDetails" component={MyProductDetails} />
//         <Stack.Screen name="SubCategory" component={SubCategory} />
//         <Stack.Screen name="MyProducts" component={MyProducts} />

//         <Stack.Screen name="Editproduct" component={editProduct} />
//         <Stack.Screen name="CategoryDetails" component={CategoryDetails} />
//         <Stack.Screen name="Message" component={MessageList} />
//         <Stack.Screen name="Customers" component={Customers} />
//         <Stack.Screen name="Mycustomer" component={Mycustomer} />
//         <Stack.Screen name="MyCustomerDetail" component={MyCustomerDetail} />
//         <Stack.Screen name="Feedback" component={Feedback} />
//         <Stack.Screen name="Messagebox" component={Messagebox} />
//         <Stack.Screen name="Purchase" component={Purchase} />

//         {/*<Stack3.Screen name="Editprofile" component={Edit} />*/}
//         <Stack.Screen name="Loyalty" component={Loyalty} />
//         <Stack.Screen name="Loyalty1" component={LoyaltyPage} />
//         <Stack.Screen name="Chat" component={Chat} />

//         <Stack.Screen name="MyNetwork" component={MyNetwork} />
//         <Stack.Screen name="MyNetworks" component={MyNetworks} />
//         <Stack.Screen name="PartnerProfile" component={PartnerProfile} />
//         <Stack.Screen name="PendingRequest" component={PendingRequest} />
//         <Stack.Screen name="SentRequest" component={SentRequest} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }
// export default Navigate;
