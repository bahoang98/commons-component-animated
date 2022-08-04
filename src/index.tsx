import React from 'react';
import { MainNavigation } from './navigation';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const App = () => {
  return (
    <>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <MainNavigation />
      </GestureHandlerRootView>
    </>
  );
};

export { App };
