import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import { AppState } from '../app/redux/root-reducer';
import {
  IDLE, LOADING, SUCCESS, GroupType,
} from '../features/login/types';

interface ProtectedProps {
  children?: React.ReactNode;
  groups: GroupType[];
}

const Protected: React.FC<ProtectedProps> = ({ children, groups: targetGroups }) => {
  const recoverLoginStatus = useSelector((state: AppState) => state.login.status.recoverLogin);
  const loginStatus = useSelector((state: AppState) => state.login.status.login);
  const group = useSelector((state: AppState) => state.login.group);

  const dispatch = useDispatch();

  useEffect(() => {
    if (recoverLoginStatus !== IDLE && recoverLoginStatus !== LOADING && loginStatus !== SUCCESS && !targetGroups.includes(group)) {
      dispatch(push('/login'));
    }
  }, [dispatch, group, loginStatus, recoverLoginStatus, targetGroups]);

  return (
    <>
      {recoverLoginStatus !== IDLE && recoverLoginStatus !== LOADING && loginStatus === SUCCESS && children}
    </>
  );
};

export default Protected;
