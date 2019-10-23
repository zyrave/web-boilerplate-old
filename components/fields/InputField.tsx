import React, { FC } from 'react';
import { FieldProps } from 'formik';
import { Alert, InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';

interface InputProps {
  props: any;
  icon?: string;
}

export const InputField: FC<FieldProps & InputProps> = ({ field, form: { errors, touched }, icon, ...props }) => {
  const errorMessage = touched[field.name] && errors[field.name];

  return (
    <>
      <Alert color="danger" isOpen={!!errorMessage} className="text-center">
        {errorMessage}
      </Alert>
      <InputGroup className="mb-3">
        {icon && (
          <InputGroupAddon addonType="prepend">
            <InputGroupText>
              <i className={icon} />
            </InputGroupText>
          </InputGroupAddon>
        )}
        <Input {...field} {...props} />
      </InputGroup>
    </>
  );
};
