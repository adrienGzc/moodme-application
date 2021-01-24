import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { connect } from 'react-redux';

import { types } from '@moodme/constants';
// import { navigationRef } from 'Services/Navigation';
// import { RootState, Dispatch } from 'Store';
import { SplashScreen } from '@moodme/views';

import HomeStackNavigator from './HomeNavigator';

interface NavProps extends StateProps, DispatchProps {}

const Navigator = ({ loadStatus, status }: NavProps) => {
  const SwitchNavigator: { [key in types.NavStatus]: React.ReactNode } = {
    SPLASH: <SplashScreen />,
    APP: <HomeStackNavigator />,
  };

  const getSwitchNavigatorKey = (authStatus: AuthStatus) => {
    if (loadStatus !== 'LOADED') return 'SPLASH';

    switch (authStatus) {
      case 'LOGGED_IN':
        return 'APP';
      case 'LOGGED_OUT':
        return 'AUTH';
      default:
        return 'SPLASH';
    }
  };

  const switchNavigatorKey: types.NavStatus = getSwitchNavigatorKey(status);

  return (
    <NavigationContainer ref={navigationRef}>
      {SwitchNavigator[switchNavigatorKey]}
    </NavigationContainer>
  );
};

const mapState = ({
  auth: { token, status },
  session: { loadStatus },
}: RootState) => ({
  loadStatus,
  token,
  status,
});
type StateProps = ReturnType<typeof mapState>;

const mapDispatch = (dispatch: Dispatch) => ({
  setAuthStatus: dispatch.auth.setStatus,
});
type DispatchProps = ReturnType<typeof mapDispatch>;

export default connect(mapState, mapDispatch)(Navigator);
