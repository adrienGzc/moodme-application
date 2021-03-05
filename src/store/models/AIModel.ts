import { createModel } from '@rematch/core';

import { RootModel } from './types';

interface AIModelState {
  model: any;
}

const INITIAL_STATE = {
  model: undefined,
};

const aiModel = createModel<RootModel>()({
  state: INITIAL_STATE as AIModelState,
  reducers: {
    setModel: (state: any, model: any) => {
      return { ...state, model };
    },
    reset: () => {
      return INITIAL_STATE;
    },
  },
});

export type AIModelType = typeof aiModel;
export default aiModel;
