import React, {useContext, useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Text,
  Animated,
  Image,
  Dimensions,
} from 'react-native';

import {AppImages} from '../Theme/AppImages';
import CommonStyle from '../Theme/CommonStyle';
import {setIsMute} from '../redux/Actions/AuthAction';
import {useSelector} from 'react-redux';
import {appTheme} from '../utils/theme';
import Icon, {IconTypes} from './CustomIcon';
const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  outer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 5,
    borderWidth: 1,
    marginVertical: 5,
    minWidth: 100,
    ...CommonStyle.center,
  },
  dot: {
    fontSize: 16,
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
  },
  followText: {
    fontSize: 13,
    paddingRight: 10,
    paddingLeft: 2,
    paddingVertical: 8,
    fontWeight: 'bold',
  },
  touchArea: {
    width,
    height: height / 2,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  muteBtn: {
    position: 'absolute',
    height: 60,
    width: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mute: {
    height: 20,
    width: 20,
  },
});

const ButtonComponent = props => {
  const {title, onPress, style, border, backColor, textColor, isProcessing} =
    props;
  const {outer} = styles;

  return (
    <TouchableOpacity onPress={onPress} disabled={isProcessing}>
      <View
        style={[
          outer,
          {
            backgroundColor: backColor,
            borderColor: border,
          },
          style,
        ]}>
        {(!isProcessing && <Text style={{color: textColor}}>{title}</Text>) || (
          <ActivityIndicator color={textColor} />
        )}
      </View>
    </TouchableOpacity>
  );
};

const FollowButton = ({onPress, text = 'Follow', exStyle = {}}) => {
  const {dot, followText} = styles;
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={{
          backgroundColor: 'teal',
          borderRadius: 5,
          paddingVertical: 4,
          paddingHorizontal: 5,
          flexDirection: 'row',
        }}>
        <Text style={[{color: 'white', fontSize: 12, fontWeight: '700'}]}>
          {text}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const VolumeButton = () => {
  const isMute = useSelector(state => state.AuthReducer.isMute);
  const [viewAnim] = useState(new Animated.Value(0));

  const onVolumePress = () => {
    setIsMute();
    Animated.timing(viewAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      fadeOut();
    });
  };

  const fadeOut = () => {
    Animated.timing(viewAnim, {
      delay: 500,
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={onVolumePress}
      style={styles.touchArea}>
      <Animated.View
        style={[
          styles.muteBtn,
          {
            opacity: viewAnim,
          },
        ]}>
        <Icon
          type={IconTypes.MaterialCommunityIcons}
          name={isMute ? 'volume-off' : 'volume-high'}
          size={20}
          color={'white'}
          onPress={() => {}}
          style={styles.mute}
        />
      </Animated.View>
    </TouchableOpacity>
  );
};

export {ButtonComponent, FollowButton, VolumeButton};
