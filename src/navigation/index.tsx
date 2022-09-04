import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  SwitchCustomScreen,
  HomeScreen,
  FloatButtonScreen,
  ReactionEmojiScreen,
  BubbleButton,
  ScrollStoryInstagram,
  NumberAnimation,
} from '@/screens';

export type RootStackParamList = {
  HomeScreen: undefined;
  SwitchCustomScreen: undefined;
  FloatButtonScreen: undefined;
  ReactionEmojiScreen: undefined;
  BubbleButton: undefined;
  ScrollStoryInstagram: undefined;
  NumberAnimation: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const MainNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeScreen" screenOptions={{}}>
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen
          name="SwitchCustomScreen"
          component={SwitchCustomScreen}
        />
        <Stack.Screen name="FloatButtonScreen" component={FloatButtonScreen} />
        <Stack.Screen
          name="ReactionEmojiScreen"
          component={ReactionEmojiScreen}
        />
        <Stack.Screen name="BubbleButton" component={BubbleButton} />
        <Stack.Screen
          name="ScrollStoryInstagram"
          component={ScrollStoryInstagram}
        />
        <Stack.Screen name="NumberAnimation" component={NumberAnimation} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
