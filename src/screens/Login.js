import {View, Text, TextInput, TouchableOpacity, Alert} from 'react-native';
import React from 'react';
import Button from '../components/Button';
import Input from '../components/Input';
import {useNavigation} from '@react-navigation/native';
import Auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {useDispatch} from 'react-redux';
import {isLogin, userData} from '../redux/Actions/AuthAction';

const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const dispatch = useDispatch();
  const onLogin = () => {
    if (!email || !password) {
      return Alert.alert('Please fill all the fields');
    }
    Auth()
      .signInWithEmailAndPassword(email, password)
      .then(res => {
        firestore()
          .collection('users')
          .doc(res.user.uid)
          .get()
          .then(data => {
            dispatch(
              userData({
                email: data.data().email,
                id: data.data().id,
                password: data.data().password,
              }),
            );
            dispatch(isLogin(true));
          });
      })
      .catch(err => {
        Alert.alert(err.message);
      });
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Input value={email} onChangeText={setEmail} placeholder="Email" />
      <Input
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
      />
      <Button title="Login" onPress={onLogin} />
      <View style={{flexDirection: 'row', marginTop: 20}}>
        <Text>Don't have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={{color: 'blue'}}>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;
