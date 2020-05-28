import { combineEpics } from 'redux-observable';

import * as loginEpics from '../../features/login/redux/epics';
import * as logoutEpics from '../../features/logout/redux/epics';
import * as settingsEpic from '../../features/settings/redux/epics';
import * as adminEpic from '../../features/admin/redux/epics';
import * as chatEpic from '../../features/chat/redux/epics';

const rootEpic = combineEpics(
  ...Object.values(loginEpics),
  ...Object.values(logoutEpics),
  ...Object.values(settingsEpic),
  ...Object.values(adminEpic),
  ...Object.values(chatEpic),
);

export default rootEpic;
