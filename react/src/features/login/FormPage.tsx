import React, { useEffect } from 'react';
import * as Yup from 'yup';
import { useRouteMatch } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container, Form, Alert, Col, Button,
} from 'react-bootstrap';
import { useFormik } from 'formik';

import { GroupType, FAILURE } from './types';
import { loginReq, loginFailureReset } from './redux/slice';
import { AppState } from '../../app/redux/root-reducer';

import './FormPage.css';

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Please input a valid email')
    .required('Email is required'),
  password: Yup.string()
    .required('Password is required'),
  keepLogin: Yup.boolean()
    .notRequired(),
});

interface FormType {
  email: string;
  password: string;
  keepLogin: boolean;
}

const initialValues: FormType = {
  email: '',
  password: '',
  keepLogin: false,
};

interface LoginFormProps {
  group: GroupType;
}


const LoginForm: React.FC<LoginFormProps> = ({ group }) => {
  const match = useRouteMatch();
  const dispatch = useDispatch();

  const status = useSelector((state: AppState) => state.login.status);

  const handleLogin = (values: FormType) => {
    dispatch(loginReq({
      ...values,
      group,
    }));
  };

  const formik = useFormik({
    initialValues,
    onSubmit: handleLogin,
    validationSchema: loginSchema,
  });

  useEffect(() => () => {
    dispatch(loginFailureReset());
  }, [match.url, dispatch]);

  return (
    <Container>
      <Form className="form-custom" onSubmit={formik.handleSubmit}>
        <h1 className="form-message">
          {`Login as ${group}`}
        </h1>
        {status === FAILURE && (
          <Alert variant="danger">
            Login failed, please try again.
          </Alert>
        )}
        <Form.Row>
          <Form.Group as={Col} md="12">
            <Form.Label>Email:</Form.Label>
            <Form.Control
              name="email"
              value={formik.values.email}
              type="input"
              isInvalid={!!formik.touched.email && !!formik.errors.email}
              onChange={formik.handleChange}
              placeholder="Email"
              disabled={false}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.email}
            </Form.Control.Feedback>
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} md="12">
            <Form.Label>Password:</Form.Label>
            <Form.Control
              name="password"
              value={formik.values.password}
              type="password"
              isInvalid={!!formik.touched.password && !!formik.errors.password}
              onChange={formik.handleChange}
              placeholder="Password"
              disabled={false}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.email}
            </Form.Control.Feedback>
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Col>
            <Form.Check
              type="checkbox"
              name="keepLogin"
              checked={formik.values.keepLogin}
              onChange={formik.handleChange}
              label="Keep Login"
            />
          </Col>
        </Form.Row>
        <Form.Row>
          <Col>
            <Button
              value="primary"
              type="submit"
            >
              Login
            </Button>
          </Col>
        </Form.Row>
      </Form>
    </Container>
  );
};

export default LoginForm;
