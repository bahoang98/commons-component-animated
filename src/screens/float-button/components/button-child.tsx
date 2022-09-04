import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { ButtonComponent, PropsButtonComponent } from './button';

type Props = {
  name: string;
  rotateZ: number;
  isVisible: boolean;
} & PropsButtonComponent;

const ButtonChild = ({ name, rotateZ, isVisible, ...props }: Props) => {
  const animatedTranslateY = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    const opacityValue = interpolate(
      animatedTranslateY.value,
      [0, 140],
      [0, 1],
    );

    const rotateZValue = interpolate(
      animatedTranslateY.value,
      [0, 140],
      [0, rotateZ],
    );
    return {
      transform: [
        { rotateZ: `${rotateZValue}deg` },
        { translateY: animatedTranslateY.value },
      ],
      opacity: opacityValue,
      zIndex: isVisible ? 9 : -999,
    };
  });

  // effect
  useEffect(() => {
    animatedTranslateY.value = withTiming(isVisible ? 140 : 0, {
      duration: 1000,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    });
  }, [animatedTranslateY, isVisible]);

  return (
    <Animated.View style={[styles.baseBtn, animatedStyle]}>
      <ButtonComponent label={name} {...props} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  baseBtn: {
    position: 'absolute',
    zIndex: -999,
    left: 180,
  },
});

export { ButtonChild };
