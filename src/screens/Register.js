import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import Input from '../components/Input';
import Button from '../components/Button';
import {useNavigation} from '@react-navigation/native';
import Auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {useDispatch} from 'react-redux';
import {isLogin, userData} from '../redux/Actions/AuthAction';

const Register = () => {
  const navigation = useNavigation();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const dispatch = useDispatch();

  const onSignUp = () => {
    if (!email || !password || !confirmPassword) {
      return alert('Please fill all the fields');
    }
    if (password !== confirmPassword) {
      return alert('Passwords do not match');
    }
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
          .then(() => {});
      })
      .catch(err => {
        alert(err.message);
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
      <Button title="Register" onPress={onSignUp} />
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
