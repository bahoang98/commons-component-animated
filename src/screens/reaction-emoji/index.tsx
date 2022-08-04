import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ItemEmoji } from './components/item-emoji';

type Props = {};

type PropsItem = {
  key: string;
  element: JSX.Element;
};

const ReactionEmojiScreen = ({}: Props) => {
  const [list, setList] = useState<PropsItem[]>([]);
  const onClick = () => {
    setList([
      ...list,
      {
        key: list.length ? `${+list[list.length - 1].key + 1}` : '1',
        element: (
          <ItemEmoji
            index={list.length ? `${+list[list.length - 1].key + 1}` : '1'}
            key={list.length ? `${+list[list.length - 1].key + 1}` : '1'}
            callback={(index: string) => {
              console.log(index);
            }}
          />
        ),
      },
    ]);
  };
  return (
    <View style={styles.container}>
      {/* <View style={styles.base}>
        <TouchableOpacity style={styles.baseBtn} onPress={onClick}>
          <Text>Click me!!</Text>
        </TouchableOpacity>
      </View> */}
      <View style={styles.base}>
        <TouchableOpacity style={styles.baseBtn} onPress={onClick}>
          <Text>♥️</Text>
        </TouchableOpacity>
        {list.map(item => item.element)}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  base: {
    position: 'absolute',
    bottom: 100,
    left: 100,
  },
  baseBtn: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowRadius: 2,
    shadowOpacity: 0.2,
    elevation: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
});

export { ReactionEmojiScreen };
