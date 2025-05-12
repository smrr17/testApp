import {View, Text, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import Input from '../components/Input';
import Button from '../components/Button';
import {useNavigation} from '@react-navigation/native';
import Auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {useDispatch} from 'react-redux';
import {isLogin, userData} from '../redux/Actions/AuthAction';
import MMKVStorage from '../utils/Storage';

const Register = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const onSignUp = () => {
    if (!email || !password || !confirmPassword) {
      return alert('Please fill all the fields');
    }
    if (password !== confirmPassword) {
      return alert('Passwords do not match');
    }
    setLoading(true);
    Auth()
      .createUserWithEmailAndPassword(email, password)
      .then(res => {
        dispatch(
          userData({
            email: email,
            id: res.user.uid,
            password: password,
          }),
        );
        dispatch(isLogin(true));

        firestore()
          .collection('users')
          .doc(res.user.uid)
          .set({
            email: email,
            password: password,
            id: res.user.uid,
          })
          .then(() => {
            MMKVStorage.setItem(
              'user',
              JSON.stringify({
                email: data?.data()?.email,
                id: data.data().id,
                password: data.data().password,
              }),
            );
          });
      })
      .catch(err => {
        alert(err.message);
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
        placeholder="Password"
      />
      <Input
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        placeholder="Confirm Password"
      />
      <Button loading={loading} title="Register" onPress={onSignUp} />
      <View style={{flexDirection: 'row', marginTop: 20}}>
        <Text>aAlready have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={{color: 'blue'}}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Register;
