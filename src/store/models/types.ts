import { Models } from '@rematch/core';

import type { AIModelType } from './aiModel';
import type { SessionModelType } from './sessionModel';

export interface RootModel extends Models<RootModel> {
  session: SessionModelType;
  aiModel: AIModelType;
}
