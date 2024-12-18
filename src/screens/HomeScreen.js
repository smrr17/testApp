import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {allPosts} from '../redux/Actions/PostAction';
import {FlatList} from 'react-native-gesture-handler';

const HomeScreen = () => {
  const posts = useSelector(state => state.PostReducer.posts);
  const navigation = useNavigation();
  console.log('posts', posts);
  const onDelete = id => {
    firestore()
      .collection('posts')
      .doc(Auth().currentUser.uid)
      .collection('userPosts')
      .doc(id)
      .delete()
      .then(() => {
        alert('Post deleted successfully');
        let newPosts = posts.filter(post => post.id !== id);
        dispatch(allPosts(newPosts));
      });
  };

  const dispatch = useDispatch();
  const getAllPosts = () => {
    firestore()
      .collection('posts')
      .doc(Auth().currentUser.uid)
      .collection('userPosts')
      .get()
      .then(querySnapshot => {
        dispatch(
          allPosts(
            querySnapshot.docs.map(doc => ({...doc.data(), id: doc.id})),
          ),
        );
        querySnapshot.docs.forEach(doc => {});
      });
  };
  useFocusEffect(
    React.useCallback(() => {
      getAllPosts();
    }, []),
  );

  const onPostLike = item => {
    firestore()
      .collection('posts')
      .doc(Auth().currentUser.uid)
      .collection('userPosts')
      .doc(item.id)
      .update({
        ...item,
        isLiked: !item.isLiked,
      });

    let newPosts = posts.map(post => {
      if (post.id === item.id) {
        return {...post, isLiked: !post.isLiked};
      }
      return post;
    });
    dispatch(allPosts(newPosts));
  };
  const RenderItem = ({item, index}) => {
    return (
      <View
        style={{
          padding: 10,
          paddingVertical: 15,
          backgroundColor: 'white',
          marginVertical: 10,
          borderRadius: 5,
          flexDirection: 'row',
          alignItems: 'center',
          gap: 10,
        }}>
        <View style={{flex: 1}}>
          <Text>{item.post}</Text>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('Comments', {item})}>
          <Image
            source={require('../assets/images/comment.png')}
            style={{width: 20, height: 20}}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onPostLike(item)}>
          <Image
            tintColor={item.isLiked ? 'red' : 'grey'}
            source={require('../assets/images/heart1.png')}
            style={{width: 20, height: 20}}
          />
        </TouchableOpacity>
        <Text
          onPress={() => onDelete(item.id)}
          style={{color: 'red', textDecorationLine: 'underline', fontSize: 12}}>
          Remove
        </Text>
      </View>
    );
  };
  return (
    <View style={{flex: 1}}>
      <FlatList
        style={{padding: 20}}
        data={posts}
        keyExtractor={item => item.post}
        renderItem={({item, index}) => {
          return <RenderItem index={index} item={item} />;
        }}
      />
    </View>
  );
};

export default HomeScreen;
