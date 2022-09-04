import React from 'react';
import { View } from 'react-native';
import { NumberAnimationProps } from './types';
import { useNumberAnimationStyles } from './styles';
import { RenderNumber } from './components/render-number';

const NUMBER = Math.round(Math.random() * 100000);

const NumberAnimation = ({}: NumberAnimationProps) => {
  const { styles } = useNumberAnimationStyles();
  const Numbers = `${NUMBER}`.split('');

  return (
    <View style={styles.container}>
      {Numbers.map((it, idx) => {
        return <RenderNumber key={`${it}${idx}`} number={it} />;
      })}
    </View>
  );
};

export { NumberAnimation };
