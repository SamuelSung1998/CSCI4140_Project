import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import { useField } from 'formik';

interface FormSelectPropsType {
  name: string;
  label: string;
  placeholder: string;
  disabled?: boolean;
  type?: string;
  children: React.DetailedHTMLProps<React.OptionHTMLAttributes<HTMLOptionElement>, HTMLOptionElement>;
}

const FormSelect: React.FC<FormSelectPropsType> = ({
  name,
  label,
  placeholder,
  children,
  disabled = false,
}) => {
  const [field, meta] = useField(name);
  const isValid = !meta.touched || !meta.error;
  return (
    <Form.Group as={Row}>
      <Form.Label column sm={4}>{label}</Form.Label>
      <Col sm={8}>
        <Form.Control
          {...field} // eslint-disable-line react/jsx-props-no-spreading
          as="select"
          type="select"
          className="custom-select"
          isInvalid={!isValid}
          disabled={disabled}
        >
          <option value="">{placeholder}</option>
          {children}
        </Form.Control>
        <Form.Control.Feedback type="invalid">
          {meta.error}
        </Form.Control.Feedback>
      </Col>
    </Form.Group>
  );
};

export default FormSelect;
