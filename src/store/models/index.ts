import aiModel from './AIModel';
import sessionModel from './sessionModel';
import { RootModel } from './types';

const models: RootModel = {
  session: sessionModel,
  aiModel,
};

export default models;
