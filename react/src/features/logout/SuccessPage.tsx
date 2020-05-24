import React from 'react';
import { useDispatch } from 'react-redux';
import { Container, Jumbotron } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { push } from 'connected-react-router';
import useTimeout from '../../common/useTimeout';

import './SuccessPage.css';

const SuccessPage: React.FC = () => {
  const dispatch = useDispatch();

  const url = '/';

  const handleRedirect = () => {
    dispatch(push(url));
  };

  const time = useTimeout({ timeout: 5, handleTimeout: handleRedirect });


  return (
    <Container>
      <Jumbotron className="justify-content-center logout-success-prompt">
        <h1 className="justify-content-center">Logout Success</h1>
        <p>You have successfully Logout.</p>
        <p>
          {`You will be redirect in ${time} seconds or click `}
          <Link to={url}>here</Link>
          {' to the home page'}
        </p>
      </Jumbotron>
    </Container>
  );
};

export default SuccessPage;
