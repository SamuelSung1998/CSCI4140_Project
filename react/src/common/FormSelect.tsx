import React from 'react';
import { Form } from 'react-bootstrap';
import { useField } from 'formik';

interface FormSelectPropsType {
  name: string;
  label: string;
  placeholder: string;
  as: any; // FIXME Check the type of { as } in Form.Group
  md: number;
  disabled?: boolean;
  type?: string;
  children: React.DetailedHTMLProps<React.OptionHTMLAttributes<HTMLOptionElement>, HTMLOptionElement>;
}

const FormSelect: React.FC<FormSelectPropsType> = ({
  name,
  label,
  placeholder,
  as,
  md,
  children,
  disabled = false,
}) => {
  const [field, meta] = useField(name);
  const isValid = !meta.touched || !meta.error;
  return (
    <Form.Group as={as} md={md}>
      <Form.Label>{label}</Form.Label>
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
    </Form.Group>
  );
};

export default FormSelect;
