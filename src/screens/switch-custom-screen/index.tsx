import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { RootStackParamList } from '@/navigation';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SwitchCustomComponent } from '@/components';

type Props = NativeStackScreenProps<
  RootStackParamList,
  'SwitchCustomScreen',
  undefined
>;

const SwitchCustomScreen = ({}: Props) => {
  const [value, setValue] = useState<boolean>(false);
  return (
    <View style={styles.container}>
      <SwitchCustomComponent
        {...{ value }}
        onChange={enabled => {
          setValue(enabled);
        }}
        activeColor="#3308A8"
        inactiveColor="#B9B5C3"
        switchColor="#3308A8"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
});

export { SwitchCustomScreen };
