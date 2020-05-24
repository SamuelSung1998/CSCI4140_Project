import React from 'react';
import { Form } from 'react-bootstrap';
import { useField } from 'formik';

interface FormTextInputPropsType {
  name: string;
  label: string;
  placeholder: string;
  as: any; // FIXME Check the type of { as } in Form.Group
  md: number;
  disabled: boolean;
  type?: string;
}

const FormTextInput: React.FC<FormTextInputPropsType> = ({
  name,
  label,
  placeholder,
  as,
  md,
  disabled,
  type = 'input',
}) => {
  const [field, meta] = useField(name);
  const isValid = !meta.touched || !meta.error;
  return (
    <Form.Group as={as} md={md}>
      <Form.Label>{label}</Form.Label>
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
    </Form.Group>
  );
};

export default FormTextInput;
