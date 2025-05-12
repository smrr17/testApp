import React from 'react';
import {View} from 'react-native';
import {FeedSideBar} from './FeedSideBar';
import {VideoComponent} from './VideoComponent';
import {FeedFooter} from './FeedFooter';

const FeedRow = ({item, isNext, isVisible, index, transitionAnimation}) => {
  const {post} = item;
  return (
    <View>
      <VideoComponent post={item} isNext={isNext} isVisible={isVisible} />
      <FeedSideBar item={item} animation={transitionAnimation(index)} />
      <FeedFooter item={item} animation={transitionAnimation(index)} />
    </View>
  );
};

export {FeedRow};
