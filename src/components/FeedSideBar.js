import React, {useContext} from 'react';
import {
  View,
  Animated,
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
// import {AppContext} from '../Context';r
// import {AppImages} from '../Theme/AppImages';

import {appTheme} from '../utils/theme';
import Icon, {IconTypes} from './CustomIcon';

const styles = StyleSheet.create({
  icon: {
    marginHorizontal: 10,
    marginVertical: 5,
  },
  text: {
    fontSize: 15,
    textAlign: 'center',
  },
  sideBar: {
    width: 80,
    position: 'absolute',
    zIndex: 1000,
    right: 0,
    alignItems: 'center',
  },
  iconOuter: {
    marginVertical: 8,
  },
  center: {
    alignItems: 'center',
  },
  imageOuter: {
    width,
    justifyContent: 'center',
  },
});
const {width} = Dimensions.get('window');

const RenderIcon = ({obj, onPress, exStyle = {}}) => {
  //   const {appTheme} = useContext(AppContext);
  const {iconOuter, center, icon, text} = styles;
  const {type, imageIcon, size = 30, disText} = obj;

  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={() => onPress(type)}
      style={iconOuter}>
      <View styles={center}>
        {/* <Image
          source={imageIcon}
          style={[
            icon,
            {
              height: size,
              width: size,
              tintColor: appTheme?.tint,
            },
            exStyle,
          ]}
          resizeMode={'contain'}
        /> */}
        <Icon
          name={type}
          type={IconTypes.MaterialCommunityIcons}
          size={size}
          color={'white'}
          style={icon}
        />
        {(disText && (
          <Text style={[text, {color: appTheme?.tint}]}>{`${disText}`}</Text>
        )) ||
          null}
      </View>
    </TouchableOpacity>
  );
};

const FeedSideBar = ({item, animation}) => {
  //   const {appTheme} = useContext(AppContext);
  const insets = useSafeAreaInsets();
  const {sideBar} = styles;
  const {like, comment, likeStatus} = item;

  const makeAction = async type => {
    // Here perfom feed action based on Type
  };

  return (
    <Animated.View
      style={[
        sideBar,
        {
          bottom: 50,
        },
        animation,
      ]}>
      <RenderIcon
        obj={{
          //   imageIcon: AppImages.heart,
          disText: like,
          size: 35,
          type: 'cards-heart',
        }}
        exStyle={{tintColor: (likeStatus && 'red') || appTheme?.tint}}
        onPress={makeAction}
      />
      <RenderIcon
        obj={{
          // imageIcon: AppImages.comment,
          disText: comment,
          type: 'comment',
        }}
        onPress={makeAction}
      />
      <RenderIcon
        obj={{
          // imageIcon: AppImages.share,
          type: 'share-circle',
        }}
        onPress={makeAction}
      />
      <RenderIcon
        obj={{
          // imageIcon: AppImages.more,
          size: 35,
          type: 'more',
        }}
        onPress={makeAction}
      />
    </Animated.View>
  );
};

export {FeedSideBar};
