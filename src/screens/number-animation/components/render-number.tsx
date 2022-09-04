import React, { useLayoutEffect } from 'react';
import { Text, StyleSheet } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';

type Props = {
  number: number | string;
  usePanGesture?: boolean;
};

const Numbers = Array(10)
  .fill(0)
  .map((_, index) => index);

const LINE_HIGHT = 40;
const LIMIT_HIGHT = -LINE_HIGHT * 9;

const RenderNumber = ({ number, usePanGesture = false }: Props) => {
  const randomInitNumber = Math.round(Math.random() * 10);
  const toTranslateY = -Math.round(+number) * LINE_HIGHT;
  const initTranslateY = -randomInitNumber * LINE_HIGHT;

  const animationTranslateY = useSharedValue(initTranslateY);

  useLayoutEffect(() => {
    animationTranslateY.value = withTiming(toTranslateY, {
      duration: 5000,
      easing: Easing.bezier(0.65, 0, 0.35, 1),
    });
  }, [animationTranslateY, toTranslateY]);

  const _onRotateGestureEvent = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.startY = animationTranslateY.value;
    },
    onActive: (event, ctx) => {
      if (usePanGesture) {
        const newTranslateY = (ctx.startY || 0) + event.translationY;
        const indexActive = Math.round(newTranslateY / LINE_HIGHT);
        console.log('event => ', newTranslateY > -LINE_HIGHT * 9);

        if (newTranslateY < 0 && newTranslateY > LIMIT_HIGHT) {
          animationTranslateY.value = indexActive * LINE_HIGHT;
        } else {
          if (newTranslateY > 0) {
            animationTranslateY.value = 0;
          } else {
            animationTranslateY.value = LIMIT_HIGHT;
          }
        }
      }
    },
    onEnd: (event, ctx) => {},
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateY: animationTranslateY.value },
        // { translateX: animatedTranslateX.value },
      ],
    };
  });

  return (
    <PanGestureHandler onGestureEvent={_onRotateGestureEvent}>
      <Animated.View style={[styles.container]}>
        {Numbers.map((it, idx) => {
          return (
            <Animated.View key={`${it}${idx}`} style={[animatedStyle]}>
              <Text style={styles.number}>{it}</Text>
            </Animated.View>
          );
        })}
      </Animated.View>
    </PanGestureHandler>
  );
};

const styles = StyleSheet.create({
  container: {
    height: LINE_HIGHT,
    overflow: 'hidden',
  },
  number: {
    fontSize: 34,
    fontWeight: 'bold',
    lineHeight: LINE_HIGHT,
  },
});

export { RenderNumber };
