import React, {useRef, useState} from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Image,
  Animated,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import Content from './Content';

export const BANNER_H = 350;
export const TOPNAVI_H = 50;

const handleScroll = (scrollA: Number) => {
  // Handle scroll event here
  console.log(scrollA);
};

const ParallaxImage = () => {
  const scrollA = useRef(new Animated.Value(0)).current;
  const [activeColor, setActiveColor] = useState('#fff');

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const {contentOffset} = event.nativeEvent;
    handleScroll(contentOffset.y);
    if (contentOffset.y > BANNER_H) {
      setActiveColor('green');
    } else {
      setActiveColor('#fff');
    }
  };

  return (
    <View>
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollA}}}],
          {
            useNativeDriver: true,
            listener: onScroll,
          },
        )}
        scrollEventThrottle={16}>
        <View style={styles.bannerContainer}>
          <Animated.Image
            style={{
              height: BANNER_H,
              width: '200%',
              opacity: scrollA.interpolate({
                inputRange: [-BANNER_H, 0, BANNER_H, BANNER_H + 1],
                outputRange: [1, 1, 0.1, 0.1],
              }),
              transform: [
                {
                  translateY: scrollA.interpolate({
                    inputRange: [-BANNER_H, 0, BANNER_H, BANNER_H + 1],
                    outputRange: [
                      -BANNER_H / 2,
                      0,
                      BANNER_H * 0.75,
                      BANNER_H * 0.75,
                    ],
                  }),
                },
                {
                  scale: scrollA.interpolate({
                    inputRange: [-BANNER_H, 0, BANNER_H, BANNER_H + 1],
                    outputRange: [2, 1, 0.5, 0.5],
                  }),
                },
              ],
            }}
            source={require('./img.jpg')}
          />
        </View>
        <Content activeColor={activeColor} />
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  bannerContainer: {
    marginTop: -1000,
    paddingTop: 1000,
    alignItems: 'center',
    overflow: 'hidden',
  },
  // banner: (scrollA: Animated.Value) => ({
  //   height: BANNER_H,
  //   width: '200%',
  //   transform: [
  //     {
  //       translateY: scrollA.interpolate({
  //         inputRange: [-BANNER_H, 0, BANNER_H, BANNER_H + 1],
  //         outputRange: [-BANNER_H / 2, 0, BANNER_H * 0.75, BANNER_H * 0.75],
  //       }),
  //     },
  //     {
  //       scale: scrollA.interpolate({
  //         inputRange: [-BANNER_H, 0, BANNER_H, BANNER_H + 1],
  //         outputRange: [2, 1, 0.5, 0.5],
  //       }),
  //     },
  //   ],
  // }),
});

export default ParallaxImage;
