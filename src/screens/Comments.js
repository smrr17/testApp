import {View, Text, FlatList} from 'react-native';
import React, {useState} from 'react';
import Button from '../components/Button';
import Input from '../components/Input';
import Auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {useDispatch, useSelector} from 'react-redux';
import {allPosts} from '../redux/Actions/PostAction';

const Comments = ({route}) => {
  const [comment, setComment] = useState([]);
  const item1 = route.params.item;
  const [item, setItem] = useState(item1);
  const dispatch = useDispatch();
  const posts = useSelector(state => state.PostReducer.posts);
  const onPress = () => {
    if (!comment) {
      return alert('Please fill the comment');
    }
    firestore()
      .collection('posts')
      .doc(Auth().currentUser.uid)
      .collection('userPosts')
      .doc(item.id)
      .update({
        ...item,
        comments: [...item.comments, {comment: comment}],
      })
      .then(() => {
        let newPosts = posts.map(post =>
          post.id === item.id
            ? {...item, comments: [...item.comments, {comment: comment}]}
            : post,
        );
        dispatch(allPosts(newPosts));
        setItem({...item, comments: [...item.comments, {comment: comment}]});
        alert('Comment added successfully');
        setComment('');
      });
  };
  return (
    <View style={{flex: 1}}>
      <View style={{flex: 1, padding: 20}}>
        <Text style={{fontSize: 20, fontWeight: 'bold'}}>Post:</Text>
        <Text style={{color: 'black'}}>{item?.post}</Text>
        <FlatList
        style={{marginTop: 10}}
          ListHeaderComponent={() => (
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>Comments:</Text>
          )}
          ListEmptyComponent={() => (
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Text>No Comments</Text>
            </View>
          )}
          data={item.comments}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <View
              style={{
                padding: 10,
                borderBottomWidth: 1,
                borderBottomColor: 'gray',
              }}>
              <Text>{item.comment}</Text>
            </View>
          )}
        />
      </View>
      <Input
        style={{alignSelf: 'center', marginBottom: 5}}
        placeholder="Add Comment"
        value={comment}
        onChangeText={setComment}
      />
      <Button
        onPress={onPress}
        style={{alignSelf: 'center', marginBottom: 10}}
        title="Add Comment"
      />
    </View>
  );
};

export default Comments;
