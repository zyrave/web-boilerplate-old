import React, { FC } from 'react';
import { FieldProps } from 'formik';
import { InputGroup, FormControl } from 'react-bootstrap';

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
        <FormControl {...field} {...props} />
      </InputGroup>
      {errorMessage && <div className="text-danger">{errorMessage}</div>}
    </>
  );
};
