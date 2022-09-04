import React from 'react';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';

type Props = {} & TouchableOpacityProps;

const ButtonBase = ({ ...props }: Props) => {
  return (
    <TouchableOpacity style={styles.container} {...props}>
      <Text>ButtonBase</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 100,
    width: 100,
    borderRadius: 50,
    backgroundColor: '#fff',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowColor: '#000',
    shadowRadius: 5,
    shadowOpacity: 0.2,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export { ButtonBase };
