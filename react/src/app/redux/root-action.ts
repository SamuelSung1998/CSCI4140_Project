import { actions as loginActions } from '../../features/login/redux/slice';
import { actions as logoutActions } from '../../features/logout/redux/slice';
import { actions as settingsActions } from '../../features/settings/redux/slice';

const rootAction = {
  login: loginActions,
  logout: logoutActions,
  settings: settingsActions,
};

export default rootAction;
