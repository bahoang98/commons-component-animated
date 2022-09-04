import React, { useState } from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { ButtonBase } from './components/button';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';

const { width, height } = Dimensions.get('screen');
const HEADER_HEIGHT = 100;

const randomRangeColor = () => {
  return Math.round(Math.random() * 256);
};

let interval: NodeJS.Timeout;

type Props = {};

const BubbleButton = ({}: Props) => {
  const [isRunning, setIsRunning] = useState(false);
  const animatedTranslateY = useSharedValue(0);
  const animatedTranslateX = useSharedValue(0);

  const animatedR = useSharedValue(0);
  const animatedG = useSharedValue(0);
  const animatedB = useSharedValue(0);

  const _onPanGestureEvent = useAnimatedGestureHandler({
    onStart: (event, ctx: { startX?: number; startY?: number }) => {
      ctx.startX = animatedTranslateX.value;
      ctx.startY = animatedTranslateY.value;
    },
    onActive: (event, ctx: { startX?: number; startY?: number }) => {
      const newTranslateY = (ctx.startY || 0) + event.translationY;
      const newTranslateX = (ctx.startX || 0) + event.translationX;
      if (newTranslateY > 0 && newTranslateY < height - HEADER_HEIGHT - 50) {
        animatedTranslateY.value = newTranslateY;
      }
      if (newTranslateX > 0 && newTranslateX < width - 100) {
        animatedTranslateX.value = newTranslateX;
      }
    },
    onEnd: (event, ctx) => {
      // console.log('onEnd, ', event, ctx);
    },
  });

  const onStartRandomColor = () => {
    if (!isRunning) {
      setIsRunning(true);
      interval = setInterval(() => {
        animatedR.value = withTiming(randomRangeColor(), {
          duration: 1000,
          easing: Easing.bezier(0.68, -0.6, 0.32, 1.6),
        });
        animatedG.value = withTiming(randomRangeColor(), {
          duration: 1000,
          easing: Easing.bezier(0.68, -0.6, 0.32, 1.6),
        });
        animatedB.value = withTiming(randomRangeColor(), {
          duration: 1000,
          easing: Easing.bezier(0.68, -0.6, 0.32, 1.6),
        });
      }, 1000);
    } else {
      setIsRunning(false);
      clearInterval(interval);
    }
  };

  const animatedStyleBtnBubble = useAnimatedStyle(() => {
    return {
      transform: [
        { translateY: animatedTranslateY.value },
        { translateX: animatedTranslateX.value },
      ],
    };
  });

  const animatedStyleBaseColor = useAnimatedStyle(() => {
    return {
      backgroundColor: `rgb(${animatedR.value}, ${animatedG.value}, ${animatedB.value})`,
    };
  });

  return (
    <>
      <PanGestureHandler onGestureEvent={_onPanGestureEvent}>
        <Animated.View style={[animatedStyleBtnBubble]}>
          <ButtonBase onPress={onStartRandomColor} />
        </Animated.View>
      </PanGestureHandler>
      <Animated.View style={[styles.baseColor, animatedStyleBaseColor]} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  baseColor: {
    width: '100%',
    height: 100,
    backgroundColor: 'rgb(123,3,0)',
  },
});

export { BubbleButton };
