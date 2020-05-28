import React from 'react';
import { Form, Col, Row } from 'react-bootstrap';
import { useField } from 'formik';

interface FormTextInputPropsType {
  name: string;
  label: string;
  placeholder: string;
  disabled: boolean;
  type?: string;
}

const FormTextInput: React.FC<FormTextInputPropsType> = ({
  name,
  label,
  placeholder,
  disabled,
  type = 'input',
}) => {
  const [field, meta] = useField(name);
  const isValid = !meta.touched || !meta.error;
  return (
    <Form.Group as={Row}>
      <Form.Label column sm={4}>{label}</Form.Label>
      <Col sm={8}>
        <Form.Control
          {...field} // eslint-disable-line react/jsx-props-no-spreading
          type={type}
          isInvalid={!isValid}
          placeholder={placeholder}
          disabled={disabled}
        />
        <Form.Control.Feedback type="invalid">
          {meta.error}
        </Form.Control.Feedback>
      </Col>
    </Form.Group>
  );
};

export default FormTextInput;
