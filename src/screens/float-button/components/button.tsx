import React from 'react';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
  View,
  TouchableOpacityProps,
} from 'react-native';

type Props = {
  style?: ViewStyle;
  label?: string;
} & TouchableOpacityProps;

const ButtonComponent = ({ style, label, ...props }: Props) => {
  return (
    <TouchableOpacity style={[styles.base, style]} {...props}>
      <Text>{label || 'root'}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    height: 60,
    width: 60,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: {
      height: 1,
      width: 0,
    },
    shadowRadius: 1,
    elevation: 5,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    position: 'absolute',
  },
});

export { ButtonComponent };
