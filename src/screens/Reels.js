import {
  ActivityIndicator,
  Animated,
  Dimensions,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import CommonStyle from '../Theme/CommonStyle';
import axios from 'axios';
import {FeedRow} from '../components/FeedRow';

const Reels = () => {
  const {height, width} = Dimensions.get('window');
  const [isLoading, setIsLoading] = useState(false);
  const isIOS = Platform.OS === 'ios';
  const [displayHeight, setDisplayHeight] = useState(height);
  const [data, setData] = useState([]);
  const [metaData, setMetaData] = useState(null);
  const refFlatList = useRef();
  const [scrollY] = useState(new Animated.Value(0));
  const [scrollInfo, setScrollInfo] = useState({isViewable: true, index: 0});

  const viewabilityConfig = {viewAreaCoveragePercentThreshold: 80};
  const onViewableItemsChanged = useRef(viewableItems => {
    const info = {
      isViewable: viewableItems.changed[0].isViewable,
      index: viewableItems.changed[0].index,
    };
    setScrollInfo(info);
  });

  const transitionAnimation = index => {
    const rowHeight = displayHeight * index;
    return {
      opacity: scrollY.interpolate({
        inputRange: [
          rowHeight,
          rowHeight + displayHeight / 2,
          rowHeight + displayHeight,
        ],
        outputRange: [1, 0.2, 0],
        useNativeDriver: true,
        extrapolate: 'clamp',
      }),
    };
  };

  const getItemLayout = (item, index) => ({
    length: displayHeight,
    offset: displayHeight * index,
    index,
  });

  const onLayout = ({nativeEvent}) => {
    setDisplayHeight(nativeEvent.layout.height);
  };
  const onEndReached = () => {
    // make api call here
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        'https://api.pexels.com/videos/popular',
        {
          headers: {
            Authorization: `hD2wA9KF9xqEBbi8xqNJfTGDEpnyqEwxwgIYmBErahMAPRzMctMKNj6e`,
          },
        },
      );
      console.log('response', JSON.stringify(response.data, null, 3));
      if (response?.data?.videos) {
        setData(response.data.videos);
        setMetaData(response.data);
      }
      // make api call here
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
    // make api call here
    // setData(response);
  };

  const keyExtractor = (item, index) => {
    return `${item.id}`;
  };

  const renderItem = ({item, index}) => {
    const scrollIndex = scrollInfo?.index || 0;
    const isNext = index >= scrollIndex - 1 && index <= scrollIndex + 1;
    return (
      <FeedRow
        item={item}
        isNext={isNext}
        index={index}
        transitionAnimation={transitionAnimation}
        visible={scrollInfo}
        isVisible={scrollIndex === index}
      />
    );
  };

  return (
    <View style={CommonStyle.flexContainer} onLayout={onLayout}>
      {isLoading ? (
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ActivityIndicator
            size="large"
            color="#FFFFFF"
            // style={{
            //   position: 'absolute',
            //   top: 0,
            //   left: 0,
            //   right: 0,
            //   bottom: 0,
            // }}
          />
        </View>
      ) : (
        <Animated.FlatList
          style={{width: width, height: '100%'}}
          //   contentContainerStyle={{width: width, height: displayHeight}}
          pagingEnabled
          showsVerticalScrollIndicator={false}
          ref={refFlatList}
          //   automaticallyAdjustContentInsets={true}
          onViewableItemsChanged={onViewableItemsChanged.current}
          viewabilityConfig={viewabilityConfig}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {contentOffset: {y: scrollY}},
              },
            ],
            {
              useNativeDriver: false,
            },
          )}
          data={data}
          renderItem={renderItem}
          getItemLayout={getItemLayout}
          keyExtractor={keyExtractor}
          onEndReachedThreshold={20}
          onEndReached={onEndReached}
          removeClippedSubviews={true}
        />
      )}
    </View>
  );
};

export default Reels;

const styles = StyleSheet.create({});
