import React, { FC } from 'react';
import { FieldProps } from 'formik';
import { InputGroup, Form } from 'react-bootstrap';

interface InputProps {
  props: any;
  icon?: string;
}

export const InputField: FC<FieldProps & InputProps> = ({ field, form: { errors, touched }, icon, ...props }) => {
  const errorMessage = touched[field.name] && errors[field.name];

  return (
    <>
      <InputGroup className="mt-3">
        {icon && (
          <InputGroup.Prepend>
            <InputGroup.Text>
              <i className={icon} />
            </InputGroup.Text>
          </InputGroup.Prepend>
        )}
        <Form.Control {...field} {...props} isInvalid={!!errorMessage} />
        <Form.Control.Feedback type="invalid">{errorMessage}</Form.Control.Feedback>
      </InputGroup>
    </>
  );
};
