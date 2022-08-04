import React, { useLayoutEffect, useMemo, useRef } from 'react';
import {
  View,
  StyleSheet,
  StyleProp,
  ViewStyle,
  Animated,
  TouchableWithoutFeedback,
  Insets,
} from 'react-native';
import { colors } from '@/utils';
import { TouchableShadow } from '../touchable-shadow';
import { IconTick } from '@/assets';

const AnimatedTouchableShadow =
  Animated.createAnimatedComponent(TouchableShadow);

const ANIMATION_DEFAULTS: Animated.SpringAnimationConfig = {
  toValue: 0,
  bounciness: 0,
  useNativeDriver: true,
};
const HIT_SLOP_LARGE: Insets = { top: 10, right: 10, bottom: 10, left: 10 };

type Props = {
  value: boolean;
  onChange: (newValue: boolean) => void;
  disabled?: boolean;
  switchSize?: number;
  barWidth?: number;
  barHeight?: number;
  switchColor?: string;
  activeColor?: string;
  inactiveColor?: string;
  style?: StyleProp<ViewStyle>;
};

const SwitchCustomComponent = ({
  value,
  onChange,
  disabled: isDisabled = false,
  switchSize = 30,
  barWidth = 48,
  barHeight = 18,
  switchColor = colors.brand.primary,
  activeColor = colors.brand.active,
  inactiveColor = colors.gray.inactive,
  style = {},
}: Props) => {
  const barStyle = useMemo<ViewStyle>(
    () => ({
      width: barWidth,
      height: barHeight,
      borderRadius: Math.ceil(barHeight / 2),
    }),
    [barWidth, barHeight],
  );
  const switchStyle = useMemo<ViewStyle>(
    () => ({
      width: switchSize,
      height: switchSize,
      borderWidth: 3,
      borderRadius: Math.ceil(switchSize / 2),
      padding: 0,
    }),
    [switchSize, switchColor],
  );
  const activeOffset = useMemo(() => barWidth - switchSize, [barWidth]);
  const inactiveOffset = useMemo(() => 0, []);
  const slideAnimation = useRef(
    new Animated.Value(value ? activeOffset : inactiveOffset),
  ).current;
  const colorAnimation = useRef(new Animated.Value(value ? 1 : 0)).current;
  const opacityAnimation = useRef(new Animated.Value(value ? 1 : 0)).current;
  const barInterpolation: Animated.InterpolationConfigType = useMemo(
    () => ({
      inputRange: [0, 1],
      outputRange: [inactiveColor, activeColor],
    }),
    [activeColor, inactiveColor],
  );
  const switchInterpolation: Animated.InterpolationConfigType = useMemo(
    () => ({
      inputRange: [0, 1],
      outputRange: [colors.white, switchColor],
    }),
    [switchColor],
  );
  const switchBorderInterpolation: Animated.InterpolationConfigType = useMemo(
    () => ({
      inputRange: [0, 1],
      outputRange: [inactiveColor, switchColor],
    }),
    [inactiveColor, switchColor],
  );

  useLayoutEffect(() => {
    Animated.spring(slideAnimation, {
      ...ANIMATION_DEFAULTS,
      toValue: value ? activeOffset : inactiveOffset,
    }).start();
    Animated.spring(colorAnimation, {
      ...ANIMATION_DEFAULTS,
      toValue: value ? 1 : 0,
      useNativeDriver: false,
    }).start();
    Animated.spring(opacityAnimation, {
      ...ANIMATION_DEFAULTS,
      toValue: value ? 1 : 0,
      useNativeDriver: false,
    }).start();
  }, [value]);

  function handleChange() {
    onChange(!value);
  }

  return (
    <View
      style={[
        styles.centerContent,
        { width: barWidth, height: switchSize },
        style,
      ]}>
      <TouchableWithoutFeedback
        onPress={handleChange}
        disabled={isDisabled}
        hitSlop={HIT_SLOP_LARGE}>
        <Animated.View
          style={[
            barStyle,
            { backgroundColor: colorAnimation.interpolate(barInterpolation) },
            isDisabled && styles.barDisabled,
          ]}
        />
      </TouchableWithoutFeedback>

      <Animated.View
        style={[
          styles.switchContainer,
          { transform: [{ translateX: slideAnimation }] },
        ]}>
        <AnimatedTouchableShadow
          onPress={handleChange}
          disabled={isDisabled}
          style={[
            styles.shadow,
            styles.centerContent,
            switchStyle,
            {
              // backgroundColor: colorAnimation.interpolate(switchInterpolation),
              borderColor: colorAnimation.interpolate(
                switchBorderInterpolation,
              ),
              backgroundColor: colors.white,
            },
            isDisabled && styles.switchDisabled,
          ]}>
          <Animated.View
            style={[styles.centerContent, { opacity: opacityAnimation }]}>
            <IconTick />
          </Animated.View>
        </AnimatedTouchableShadow>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  switchContainer: {
    position: 'absolute',
    left: 0,
  },
  switchDisabled: {
    opacity: 1,
    backgroundColor: colors.gray.inactive,
    borderColor: colors.gray.inactive,
  },
  barDisabled: {
    opacity: 0.5,
  },
  shadow: {
    backgroundColor: colors.white,
    borderRadius: 14,
    padding: 20,
    shadowColor: colors.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 5,
  },
  centerContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export { SwitchCustomComponent };
