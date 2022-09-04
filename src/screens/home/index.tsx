import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/navigation';

type Props = NativeStackScreenProps<
  RootStackParamList,
  'HomeScreen',
  undefined
>;

type ItemProps = {
  name: keyof RootStackParamList;
  display: string;
};

const LIST_SCREEN = [
  {
    name: 'SwitchCustomScreen',
    display: 'Switch Custom',
  },
  {
    name: 'FloatButtonScreen',
    display: 'Float Button',
  },
  {
    name: 'ReactionEmojiScreen',
    display: 'Reaction Emoji',
  },
  {
    name: 'BubbleButton',
    display: 'Bubble Button',
  },
  {
    name: 'ScrollStoryInstagram',
    display: 'Scroll Story Instagram',
  },
  {
    name: 'NumberAnimation',
    display: 'Number Animation',
  },
];

const HomeScreen = ({ navigation }: Props) => {
  const onClick = (nameScreen: keyof RootStackParamList) => {
    return () => {
      navigation.navigate(nameScreen);
    };
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={LIST_SCREEN as ItemProps[]}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              style={styles.button}
              onPress={onClick(item.name)}>
              <Text>{item.display}</Text>
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item, index) => `${item}${index}`}
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
  button: {
    width: '100%',
    padding: 10,
    backgroundColor: '#d1c1c1',
    borderRadius: 5,
    marginBottom: 10,
  },
});

export { HomeScreen };
