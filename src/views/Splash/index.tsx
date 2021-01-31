import React, { FunctionComponent } from 'react';
import { connect } from 'react-redux';

import type { Dispatch } from '@moodme/store';

interface SplashProps extends DispatchProps {}

const SplashScreen: FunctionComponent<SplashProps> = ({ setAppStatus }) => {
  const startupAsync = async () => {
    setAppStatus('LOADED');
  };

  startupAsync();

  return <></>;
};

const mapDispatch = ({ session: { setAppStatus } }: Dispatch) => ({
  setAppStatus,
});
type DispatchProps = ReturnType<typeof mapDispatch>;

export default connect(null, mapDispatch)(SplashScreen);
