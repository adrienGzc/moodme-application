/* eslint-disable react/style-prop-object */
import React from 'react';
import { Provider } from 'react-redux';

import { StatusBar } from 'expo-status-bar';

import Navigator from '@moodme/components/Navigator';

import store from '@moodme/store';

const App = () => {
  return (
    <Provider store={store}>
      <Navigator />
      <StatusBar style="auto" />
    </Provider>
  );
};

export default App;
