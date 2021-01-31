import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import MainScreenContainer from '../../../views/MainScreenContainer';

type HomeStackParamList = {
  MainScreenContainer: undefined;
};

const HomeStackNavigator = () => {
  const HomeStack = createStackNavigator<HomeStackParamList>();

  return (
    <HomeStack.Navigator
      initialRouteName="MainScreenContainer"
      screenOptions={{ headerShown: false }}
    >
      <HomeStack.Screen
        component={MainScreenContainer}
        name="MainScreenContainer"
      />
    </HomeStack.Navigator>
  );
};

export type { HomeStackParamList };
export default HomeStackNavigator;
