import React, { useEffect } from 'react';
import {
  Container, Form, ListGroup, Button,
} from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { AppState } from '../../app/redux/root-reducer';
import { settingsLoadReq, settingsUnload, settingsUpdateReq } from './redux/slice';
import {
  SUCCESS, IDLE, FormType, FAILURE,
} from './types';
import FormTextInput from '../../common/FormTextInput';
import FormSelect from '../../common/FormSelect';
import { USER, ADMIN } from '../login/types';

// import './FormPage.css';

const settingsSchema = Yup.object().shape({
  id: Yup.string()
    .required('User ID is required'),
  username: Yup.string()
    .required('Username is required'),
  email: Yup.string()
    .email('Invalid Email')
    .required('Email is required'),
  group: Yup.string()
    .required('Group is required'),
  phone: Yup.string()
    .required('Phone No. is required'),
  password: Yup.string()
    .min(6, 'Your password is too short')
    .max(30, 'Your password is too long'),
  password2: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match'),
  oldPassword: Yup.string()
    .required('Your current password is required to update your profile'),
});


const SettingsForm: React.FC = () => {
  const settingsLoadStatus = useSelector((state: AppState) => state.settings.status.load);
  const settingsLoadErrors = useSelector((state: AppState) => state.settings.errors.load);
  const settingsUpdateStatus = useSelector((state: AppState) => state.settings.status.update);
  const settingsUpdateErrors = useSelector((state: AppState) => state.settings.errors.update);
  const initialValues = useSelector((state:AppState) => state.settings.initialValues);

  const dispatch = useDispatch();

  useEffect(() => {
    if (settingsLoadStatus === IDLE) dispatch(settingsLoadReq());
  }, [dispatch, settingsLoadStatus]);

  useEffect(() => () => {
    dispatch(settingsUnload());
  }, [dispatch]);

  const handleUpdate = (form: FormType) => {
    dispatch(settingsUpdateReq({ form }));
  };


  const isLoaded = settingsLoadStatus === SUCCESS;


  return (
    <Container>
      <h1>Update Settings</h1>
      {settingsUpdateStatus === SUCCESS
            && (
              <ListGroup>
                <ListGroup.Item variant="info" key="update-success">
                  Update settings success
                </ListGroup.Item>
              </ListGroup>
            )}
      {settingsLoadStatus === FAILURE
            && (
              <ListGroup>
                {settingsLoadErrors.map((err) => (
                  <ListGroup.Item variant="danger" key={`load-error-${err}`}>
                    {err}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}
      {settingsUpdateStatus === FAILURE
            && (
              <ListGroup>
                {settingsUpdateErrors.map((err) => (
                  <ListGroup.Item variant="danger" key={`update-error-${err}`}>
                    {err}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}
      <Formik
        enableReinitialize
        initialValues={initialValues}
        onSubmit={handleUpdate}
        validationSchema={settingsSchema}
      >
        {({ handleSubmit, values, handleReset }) => (
          <Form noValidate className="justify-content-center py-4" onSubmit={handleSubmit}>
            <FormTextInput
              disabled
              label="User ID: "
              name="id"
              placeholder="ID"
            />
            <FormTextInput
              disabled={!isLoaded}
              label="Username:"
              name="username"
              placeholder="Username"
            />
            <FormSelect
              disabled={!isLoaded || initialValues.group !== ADMIN}
              label="Group:"
              name="group"
              placeholder="Uesr Group"
            >
              <option>{USER}</option>
              <option>{ADMIN}</option>
            </FormSelect>
            <FormTextInput
              disabled={!isLoaded}
              label="Email:"
              name="email"
              placeholder="Email"
            />
            <FormTextInput
              disabled={!isLoaded}
              label="Phone:"
              name="phone"
              placeholder="Phone No."
            />
            <FormTextInput
              disabled={!isLoaded}
              label="New Password:"
              name="password"
              placeholder="New Password"
              type="password"
            />
            <FormTextInput
              disabled={!isLoaded}
              label="Enter Your Password Again:"
              name="password2"
              placeholder="Enter Your Password Again"
              type="password"
            />
            <FormTextInput
              disabled={!isLoaded}
              type="password"
              label="Current Password:"
              name="oldPassword"
              placeholder="Current Password"
            />
            <Form.Row className="justify-content-end">
              <Button
                value="primary"
                type="button"
                onClick={handleReset}
                className="mr-2"
              >
                Reset
              </Button>
              <Button
                value="primary"
                type="submit"
                className="mx-2"
              >
                Submit
              </Button>
            </Form.Row>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default SettingsForm;
