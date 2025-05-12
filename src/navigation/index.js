import {View, Text} from 'react-native';
import React, {useEffect, useLayoutEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BottomTab from './BottomTab';
import Login from '../screens/Login';
import Register from '../screens/Register';
import {useSelector} from 'react-redux';
import Comments from '../screens/Comments';
import Reels from '../screens/Reels';
import {isLogin, userData} from '../redux/Actions/AuthAction';
import {useDispatch} from 'react-redux';
import Storage from '../utils/Storage';
import {useNavigation} from '@react-navigation/native';
import MMKVStorage from '../utils/Storage';
const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();
const AppNavigation = () => {
  const isLoggedIn = useSelector(state => state.AuthReducer.isLogin);

  console.log(isLoggedIn);
  const dispatch = useDispatch();

  const getInitailThings = async () => {
    const user = await MMKVStorage.getItem('user');
    console.log('user--->', user);
    if (user) {
      const userdata = JSON.parse(user);
      dispatch(isLogin(true));
      dispatch(
        userData({
          email: userdata.email,
          id: userdata.id,
          password: userdata.password,
        }),
      );
    } else {
      dispatch(isLogin(false));
    }
  };
  useLayoutEffect(() => {
    getInitailThings();
  }, [isLoggedIn]);

  const AuthStack = () => {
    return (
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
      </Stack.Navigator>
    );
  };

  const AppStack = () => {
    return (
      <Drawer.Navigator screenOptions={{headerShown: false}}>
        <Drawer.Screen name="BottomTab" component={Reels} />
      </Drawer.Navigator>
    );
  };

  if (isLoggedIn === undefined) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'black',
        }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      {isLoggedIn ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default AppNavigation;
