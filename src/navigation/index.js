import {View, Text} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BottomTab from './BottomTab';
import Login from '../screens/Login';
import Register from '../screens/Register';
import {useSelector} from 'react-redux';
import Comments from '../screens/Comments';
const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();
const AppNavigation = () => {
  const isLoggedIn = useSelector(state => state.AuthReducer.isLogin);
  console.log(isLoggedIn);
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
        <Drawer.Screen name="BottomTab" component={BottomTab} />
      </Drawer.Navigator>
    );
  };
  return (
    <NavigationContainer>
      {isLoggedIn ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default AppNavigation;
