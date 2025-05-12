import React, {useContext, useEffect, useRef} from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import Video from 'react-native-video';
// import {AppContext} from '../Context';
import CommonStyle from '../Theme/CommonStyle';

import {VolumeButton} from './AppButton';
import {useSelector} from 'react-redux';
const {width, video_files} = Dimensions.get('window');

const styles = StyleSheet.create({
  videoView: {
    width,
    opacity: 1,
  },
  videoOuter: {
    width,
    ...CommonStyle.center,
  },
});

const VideoComponent = ({post, isVisible, isNext}) => {
  const {height} = Dimensions.get('window');
  const isMute = useSelector(state => state.AuthReducer.isMute);

  const videoRef = useRef(null);
  const {url, video_files} = post;

  console.log('video_files', video_files[0]['link']);
  console.log('video_files', video_files);
  const {videoOuter, videoView} = styles;

  useEffect(() => {
    if (!isVisible && isNext && videoRef) {
      // videoRef.current.seek(0);
    }
  }, [isVisible, isNext]);

  const videoError = error => {
    // Manage error here
  };

  return (
    <View style={[videoOuter, {height: height}]}>
      <Video
        ref={videoRef}
        fullscreenAutorotate={true}
        source={{
          uri: video_files[0]['link'],
        }}
        autoPlay={true}
        repeat={true}
        onError={videoError}
        resizeMode={'cover'}
        muted={(!isVisible && true) || isMute}
        style={[videoView, {height: height}]}
        playInBackground={false}
        paused={!isVisible}
        ignoreSilentSwitch={'ignore'}
      />
      <VolumeButton />
    </View>
  );
  r;
};

export {VideoComponent};
