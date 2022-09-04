import React, { useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  Platform,
} from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

type Props = {};

const { width } = Dimensions.get('window');
const perspective = Platform.OS === 'ios' ? 1000 : undefined;

const DATA = [
  {
    id: 1,
    image:
      'https://img.freepik.com/premium-vector/gaming-time-banner-retro-wave-style_92741-214.jpg?w=2000',
  },
  {
    id: 2,
    image:
      'https://c8.alamy.com/comp/2G5MA05/play-games-have-fun-neon-sign-with-game-pad-bright-signboard-light-banner-game-logo-neon-emblem-vector-illustration-2G5MA05.jpg',
  },
  {
    id: 3,
    image:
      'https://static.vecteezy.com/system/resources/previews/002/144/780/original/gaming-banner-for-games-with-glitch-effect-neon-light-on-text-illustration-design-free-vector.jpg',
  },
  {
    id: 4,
    image:
      'https://thumbs.dreamstime.com/b/colorful-gaming-text-style-curved-effect-215656152.jpg',
  },
];

const DURATION = 500;

const ScrollStoryInstagram = ({}: Props) => {
  const animatedTranslateX = useSharedValue(0);
  const preCtxValue = useRef(-width);

  const _onRotateGestureEvent = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      preCtxValue.current = animatedTranslateX.value;
      ctx.startX = animatedTranslateX.value;
    },
    onActive: (event, ctx) => {
      const newTranslateX = ctx.startX + event.translationX;
      // const
      animatedTranslateX.value = newTranslateX;
    },
    onEnd: (event, ctx) => {
      if (
        animatedTranslateX.value < 0 &&
        animatedTranslateX.value > -((DATA.length - 1) * width)
      ) {
        if (preCtxValue.current >= animatedTranslateX.value) {
          animatedTranslateX.value = withTiming(preCtxValue.current - width, {
            duration: DURATION,
          });
        } else {
          animatedTranslateX.value = withTiming(preCtxValue.current + width, {
            duration: DURATION,
          });
        }
      } else {
        animatedTranslateX.value = withTiming(preCtxValue.current, {
          duration: DURATION,
        });
      }
    },
  });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: animatedTranslateX.value }],
  }));

  const animatedImage = useAnimatedStyle(() => {
    const routeYValue = interpolate(
      animatedTranslateX.value,
      [animatedTranslateX.value - preCtxValue.current, 0],
      [0, -90],
      {
        extrapolateLeft: Extrapolation.CLAMP,
        extrapolateRight: Extrapolation.CLAMP,
      },
    );
    return {
      transform: [{ rotateY: `${routeYValue}deg` }, { rotateZ: `${-5}deg` }],
    };
  });

  return (
    <PanGestureHandler onGestureEvent={_onRotateGestureEvent}>
      <Animated.View style={[styles.box, animatedStyle]}>
        {DATA.map((item, index) => {
          return (
            <Animated.View
              style={[{ flex: 1 }, animatedImage]}
              key={`${item.image}${index}`}>
              <Image
                source={{ uri: item.image }}
                style={[
                  styles.image,
                  // index === 1 && {
                  //   transform: [
                  //     { rotateY: '20deg', perspective: width },

                  //     // { rotateZ: '0deg' },
                  //     // {translateX: 200}
                  //   ],
                  // },
                ]}
                resizeMode="cover"
              />
            </Animated.View>
          );
        })}
      </Animated.View>
    </PanGestureHandler>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  box: {
    height: 200,
    width: width * 4,
    // borderWidth: 1,
    // alignSelf: 'center',
    flexDirection: 'row',
  },
  itemBox: {
    height: 200,
    width: width,
  },
  image: {
    flex: 1,
    width: '100%',
    transform: [
      { rotateY: '180deg' },
      // { perspective: width },
      // { rotateZ: '0deg' },
      // {translateX: 200}
    ],
  },
});

export { ScrollStoryInstagram };
