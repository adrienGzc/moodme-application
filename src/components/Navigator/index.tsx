import React from 'react';
import { connect } from 'react-redux';

import { NavigationContainer } from '@react-navigation/native';

import { navigationRef } from '@moodme/services/Navigation';

import { types } from '@moodme/constants';
import { RootState } from '@moodme/store';
import { SplashScreen } from '@moodme/views';

import HomeStackNavigator from './HomeNavigator';

interface NavProps extends StateProps {}

const Navigator = ({ appStatus }: NavProps) => {
  const SwitchNavigator: { [key in types.NavStatus]: React.ReactNode } = {
    SPLASH: <SplashScreen />,
    APP: <HomeStackNavigator />,
  };

  const getSwitchNavigatorKey = () => {
    if (appStatus !== 'LOADED') return 'SPLASH';
    return 'APP';
  };

  const switchNavigatorKey: types.NavStatus = getSwitchNavigatorKey();

  return (
    <NavigationContainer ref={navigationRef}>
      {SwitchNavigator[switchNavigatorKey]}
    </NavigationContainer>
  );
};

const mapState = ({ session: { appStatus } }: RootState) => ({
  appStatus,
});
type StateProps = ReturnType<typeof mapState>;

export default connect(mapState)(Navigator);
