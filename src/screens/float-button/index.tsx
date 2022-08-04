import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { ButtonComponent } from './components';
import { ButtonChild } from './components/button-child';

type Props = {};

const DATA = [
  {
    name: 'root2',
    rotateZ: 90,
  },
  {
    name: 'root3',
    rotateZ: 60,
  },
  {
    name: 'root4',
    rotateZ: 30,
  },
  {
    name: 'root5',
    rotateZ: 0,
  },
  {
    name: 'root6',
    rotateZ: -30,
  },
  {
    name: 'root7',
    rotateZ: -60,
  },
  {
    name: 'root8',
    rotateZ: -90,
  },
];

const FloatButtonScreen = ({}: Props) => {
  const [isVisible, setIsVisible] = useState(false);

  const onOpen = () => {
    if (isVisible) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
  };

  const renderItem = ({ name, rotateZ }: { name: string; rotateZ: number }) => {
    return <ButtonChild name={name} rotateZ={rotateZ} isVisible={isVisible} />;
  };

  return (
    <View style={styles.container}>
      <ButtonComponent style={[styles.baseBtn]} onPress={onOpen} />
      {DATA.map(item => {
        return renderItem(item);
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  baseBtn: {
    position: 'absolute',
    left: 180,
  },
});

export { FloatButtonScreen };
