import React from 'react';
import { View } from 'react-native';

import { connect } from 'react-redux';

import type { Dispatch } from '@moodme/store';

interface Props extends DispatchProps {}

const SplashScreen = ({ setAppStatus }: Props) => {
  const startupAsync = async () => {
    setAppStatus('LOADED');
  };

  startupAsync();

  return <View />;
};

const mapDispatch = (dispatch: Dispatch) => ({
  setAppStatus: dispatch.session.setAppStatus,
});
type DispatchProps = ReturnType<typeof mapDispatch>;

export default connect(null, mapDispatch)(SplashScreen);
