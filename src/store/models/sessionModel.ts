import { createModel } from '@rematch/core';

import { types } from '@moodme/constants';

import { RootModel } from './types';

interface SessionState {
  appStatus: types.LoadingStatus;
}

const INITIAL_STATE = {
  appStatus: 'LOADING',
};

const sessionModel = createModel<RootModel>()({
  state: INITIAL_STATE as SessionState,
  reducers: {
    setAppStatus(state: any, payload: types.LoadingStatus) {
      return { ...state, appStatus: payload };
    },
  },
});

export type SessionModelType = typeof sessionModel;
export default sessionModel;
