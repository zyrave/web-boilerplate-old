import React, { FC } from 'react';
import { FieldProps } from 'formik';
import { InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';

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
          <InputGroupAddon addonType="prepend">
            <InputGroupText>
              <i className={icon} />
            </InputGroupText>
          </InputGroupAddon>
        )}
        <Input {...field} {...props} />
      </InputGroup>
      {errorMessage && <div className="text-danger">{errorMessage}</div>}
    </>
  );
};
