import { isArray, isFunction, isNil } from 'lodash-es';
import React, { forwardRef, ForwardRefRenderFunction, useState } from 'react';
import {
  Pressable,
  PressableProps,
  StyleProp,
  View,
  ViewStyle,
  StyleSheet,
} from 'react-native';

const BaseTouchableShadow: ForwardRefRenderFunction<View, PressableProps> = (
  { style = [], ...props },
  ref,
) => {
  const [isPressed, setIsPressed] = useState(false);
  const styles: StyleProp<ViewStyle> = isArray(style)
    ? style
    : !isNil(style) && !isFunction(style)
    ? [style]
    : [];

  return (
    <Pressable
      {...props}
      ref={ref}
      onPressIn={() => !props.disabled && setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      style={[...styles, isPressed && stylesBase.pressed]}
    />
  );
};

const stylesBase = StyleSheet.create({
  pressed: {
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.24,
    shadowRadius: 7,
    elevation: 12,
  },
})

export const TouchableShadow = forwardRef(BaseTouchableShadow);
