import { actions as loginActions } from '../../features/login/redux/slice';
import { actions as logoutActions } from '../../features/logout/redux/slice';
import { actions as settingsActions } from '../../features/settings/redux/slice';
import { actions as adminActions } from '../../features/admin/redux/slice';
import { actions as chatActions } from '../../features/chat/redux/slice';

const rootAction = {
  login: loginActions,
  logout: logoutActions,
  settings: settingsActions,
  admin: adminActions,
  chat: chatActions,
};

export default rootAction;
