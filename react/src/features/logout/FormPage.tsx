import React, { FormEvent } from 'react';
import { Container, Jumbotron, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '../../app/redux/root-reducer';
import { logoutReq } from './redux/slice';

import './FormPage.css';

const LogoutForm: React.FC = () => {
  const username = useSelector((state: AppState) => state.login.username);
  const dispatch = useDispatch();

  const handleLogout = (e: FormEvent) => {
    e.preventDefault();
    dispatch(logoutReq());
  };

  return (
    <Container>
      <Jumbotron className="logout-prompt">
        <h1>
          {`${username}, are you sure to logout?`}
        </h1>
        <form onSubmit={handleLogout}>
          <Button type="submit">Logout</Button>
        </form>
      </Jumbotron>
    </Container>
  );
};

export default LogoutForm;
