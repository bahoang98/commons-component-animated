import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, Dimensions } from 'react-native';
import Animated, {
  Easing,
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

type Props = {
  callback?: (index: string) => void;
  index: string;
};
const { height: HEIGHT } = Dimensions.get('window');
const height = HEIGHT - 200;
const STEP_HEIGHT = height / 6;

const randomNumber = () => {
  const value = (Math.random() * 2 - 1) * Math.round(Math.random() * 100);
  return value;
};

const ItemEmoji = ({ callback = () => {}, index }: Props) => {
  const [isDone, setIsDone] = useState(false);
  const animatedTranslateY = useSharedValue(-30);
  const translateXValue1 = randomNumber();
  const translateXValue2 = randomNumber();
  const translateXValue3 = randomNumber();
  const translateXValue4 = randomNumber();
  const translateXValue5 = randomNumber();
  // const translateXValue6 = randomNumber();

  const animatedStyles = useAnimatedStyle(() => {
    const translateX = interpolate(
      animatedTranslateY.value,
      [
        -height,
        -height + STEP_HEIGHT * 2,
        -height + STEP_HEIGHT * 3,
        -height + STEP_HEIGHT * 4,
        -height + STEP_HEIGHT * 5,
        0,
      ],
      [
        translateXValue1,
        translateXValue2,
        translateXValue3,
        translateXValue4,
        translateXValue5,
        0,
      ],
      {
        extrapolateLeft: Extrapolation.CLAMP,
        extrapolateRight: Extrapolation.IDENTITY,
      },
    );

    const animatedOpacity = interpolate(
      animatedTranslateY.value,
      [-height, -height + STEP_HEIGHT * 4, 0],
      [0, 1, 1],
    );

    const animatedScale = interpolate(
      animatedTranslateY.value,
      [-height, -height + STEP_HEIGHT * 3, 0],
      [1, 1, 2],
    );
    return {
      transform: [
        // { rotateZ: `${rotateZ}deg` },
        { translateY: animatedTranslateY.value },
        { translateX: translateX },
        { scale: animatedScale },
      ],
      opacity: animatedOpacity,
    };
  });

  useEffect(() => {
    animatedTranslateY.value = withTiming(
      -height,
      {
        duration: 4000,
        easing: Easing.bezier(0, 0, 0.58, 1),
      },
      () => {
        callback(index);
        setIsDone(true);
      },
    );
  }, [animatedTranslateY, callback, index]);

  if (isDone) {
    return <></>;
  }

  return (
    <Animated.View style={[styles.container, animatedStyles]} key={index}>
      <Text>♥️</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    bottom: 0,
    right: 0,
    height: 30,
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export { ItemEmoji };
