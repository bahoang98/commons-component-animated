import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  SwitchCustomScreen,
  HomeScreen,
  FloatButtonScreen,
  ReactionEmojiScreen,
} from '@/screens';

export type RootStackParamList = {
  HomeScreen: undefined;
  SwitchCustomScreen: undefined;
  FloatButtonScreen: undefined;
  ReactionEmojiScreen: undefined;
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
      </Stack.Navigator>
    </NavigationContainer>
  );
};
