import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import Button from '../components/Button';
import Input from '../components/Input';
import {useNavigation} from '@react-navigation/native';
import Auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {useDispatch} from 'react-redux';
import {isLogin, userData} from '../redux/Actions/AuthAction';
import Storage from '../utils/Storage';
import MMKVStorage from '../utils/Storage';

const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const onLogin = () => {
    if (!email || !password) {
      return Alert.alert('Please fill all the fields');
    }

    setLoading(true);
    Auth()
      .signInWithEmailAndPassword(email, password)
      .then(res => {
        firestore()
          .collection('users')
          .doc(res.user.uid)
          .get()
          .then(data => {
            console.log('data', data);
            dispatch(
              userData({
                email: data?.data()?.email,
                id: data.data().id,
                password: data.data().password,
              }),
            );
            MMKVStorage.setItem(
              'user',
              JSON.stringify({
                email: data?.data()?.email,
                id: data.data().id,
                password: data.data().password,
              }),
            );

            dispatch(isLogin(true));
          });
      })

      .catch(err => {
        Alert.alert(err.message);
      })
      .finally(() => {
        setLoading(false);
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
        secureTextEntry
        placeholder="Password"
      />
      <Button loading={loading} title="Login" onPress={onLogin} />
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
