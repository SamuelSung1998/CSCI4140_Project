import React, { useEffect, useState } from 'react';
import {
  Table, Container, ListGroup, Button, Form,
} from 'react-bootstrap';
import * as Yup from 'yup';

import { useSelector, useDispatch } from 'react-redux';
import { Formik } from 'formik';
import { AppState } from '../../app/redux/root-reducer';
import {
  usersListLoadReq, adminUnload, userLoadReq, userUpdateReq, userUnload, userDeleteReq,
} from './redux/slice';
import {
  IDLE, SUCCESS, FAILURE, FormType,
} from './types';

import './TablePage.css';
import FormTextInput from '../../common/FormTextInput';
import FormSelect from '../../common/FormSelect';
import { USER, ADMIN } from '../login/types';

const updateSchema = Yup.object().shape({
  id: Yup.string(),
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
});

const UsersTable: React.FC = () => {
  const editorGroup = useSelector((state: AppState) => state.login.group);
  const usersList = useSelector((state:AppState) => state.admin.usersList);
  const initialValues = useSelector((state:AppState) => state.admin.initialValues);
  const status = useSelector((state:AppState) => state.admin.status);
  const errors = useSelector((state: AppState) => state.admin.errors);

  const dispatch = useDispatch();

  useEffect(() => {
    if (status.userLoad === IDLE || status.userUpdate === SUCCESS) dispatch(usersListLoadReq());
  }, [dispatch, status.userLoad, status.userUpdate]);

  useEffect(() => () => {
    dispatch(adminUnload());
  }, [dispatch]);

  const [currentEdit, setCurrentEdit] = useState('');

  const handleEdit = (id: string) => {
    setCurrentEdit('Edit User');
    dispatch(userLoadReq({ id }));
  };

  const handleAdd = () => {
    setCurrentEdit('Add User');
    dispatch(userUnload());
  };

  const handleDelete = (id: string) => {
    setCurrentEdit('');
    dispatch(userDeleteReq({ id }));
  };

  const handleCancel = () => {
    setCurrentEdit('');
    dispatch(userUnload());
  };

  const handleUpdate = (form: FormType) => {
    dispatch(userUpdateReq({ form }));
  };

  const isAddUser = currentEdit === 'Add User';
  const isUserLoaded = status.userLoad === SUCCESS;
  const isEnable = isAddUser || isUserLoaded;


  return (
    <div>
      <Container className="users-list">
        <h1>Users List</h1>
        {status.usersListLoad === FAILURE
            && (
              <ListGroup>
                {errors.usersListLoad.map((err) => (
                  <ListGroup.Item variant="danger" key={`update-error-${err}`}>
                    {err}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}
        <Table responsive className="my-4">
          <thead>
            <tr>
              <th>#</th>
              <th>Username</th>
              <th>Group</th>
              <th>User ID</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {usersList.map((item, index) => (
              <tr key={`user-${item.id}`}>
                <td>{index + 1}</td>
                <td>{item.username}</td>
                <td>{item.group}</td>
                <td>{item.id}</td>
                <td>{item.email}</td>
                <td>
                  <Button onClick={() => handleEdit(item.id)} className="mx-1">
                    Edit
                  </Button>
                  <Button onClick={() => handleDelete(item.id)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
            <tr>
              <td>{usersList.length + 1}</td>
              <td>add a new user</td>
              <td />
              <td />
              <td />
              <td>
                <Button onClick={handleAdd}>
                  Add
                </Button>
              </td>
            </tr>
          </tbody>
        </Table>
      </Container>
      {currentEdit !== ''
      && (
      <Container className="user-edit">
        <h1 className="form-message">{currentEdit}</h1>
        {status.userUpdate === SUCCESS
            && (
              <ListGroup>
                <ListGroup.Item variant="info" key="update-success">
                  Upload settings success
                </ListGroup.Item>
              </ListGroup>
            )}
        {status.userLoad === FAILURE
            && (
              <ListGroup>
                {errors.userLoad.map((err) => (
                  <ListGroup.Item variant="danger" key={`load-error-${err}`}>
                    {err}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}
        {status.userUpdate === FAILURE
            && (
              <ListGroup>
                {errors.userUpdate.map((err) => (
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
          validationSchema={updateSchema}
        >
          {({ handleSubmit, values, handleReset }) => (
            <Form noValidate className="justify-content-center py-4" onSubmit={handleSubmit}>
              {isAddUser
                || (
                <FormTextInput
                  disabled
                  label="User ID: "
                  name="id"
                  placeholder="ID"
                />
                )}
              <FormTextInput
                disabled={!isEnable}
                label="Username:"
                name="username"
                placeholder="Username"
              />
              <FormSelect
                disabled={!isEnable || editorGroup !== ADMIN}
                label="Group:"
                name="group"
                placeholder="Uesr Group"
              >
                <option>{USER}</option>
                <option>{ADMIN}</option>
              </FormSelect>
              <FormTextInput
                disabled={!isEnable}
                label="Email:"
                name="email"
                placeholder="Email"
              />
              <FormTextInput
                disabled={!isEnable}
                label="Phone:"
                name="phone"
                placeholder="Phone No."
              />
              <FormTextInput
                disabled={!isEnable}
                label="New Password:"
                name="password"
                placeholder="New Password"
                type="password"
              />
              <FormTextInput
                disabled={!isEnable}
                label="Enter The Password Again:"
                name="password2"
                placeholder="Enter The Password Again"
                type="password"
              />
              <Form.Row className="justify-content-end">
                {isAddUser
                || (
                <Button
                  value="primary"
                  type="button"
                  onClick={() => handleDelete(values.id)}
                  className="mr-2"
                >
                  Delete
                </Button>
                )}
                <Button
                  value="primary"
                  type="button"
                  onClick={handleCancel}
                  className="mx-2"
                >
                  Cancel
                </Button>
                <Button
                  value="primary"
                  type="button"
                  onClick={handleReset}
                  className="mx-2"
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
      )}
    </div>
  );
};

export default UsersTable;
