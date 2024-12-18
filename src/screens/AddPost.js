import {View, Text} from 'react-native';
import React from 'react';
import Input from '../components/Input';
import Button from '../components/Button';
import Auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const AddPost = () => {
  const [post, setPost] = React.useState('');
  const onPost = () => {
    if (!post) {
      return alert('Please fill the post');
    }
    firestore()
      .collection('posts')
      .doc(Auth().currentUser.uid)
      .collection('userPosts')
      .add({
        post: post,
        userId: Auth().currentUser.uid,
        isLiked: false,
        comments: [],
      })
      .then(() => {
        alert('Post added successfully');
        setPost('');
      });
  };
 
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Input
        value={post}
        onChangeText={setPost}
        numberOfLines={5}
        placeholder="Add Post"
      />
      <Button onPress={onPost} title="Add Post" />
    </View>
  );
};

export default AddPost;
