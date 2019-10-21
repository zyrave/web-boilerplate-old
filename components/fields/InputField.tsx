import React from 'react';
import { FieldProps, ErrorMessage } from 'formik';
import { InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faAngleRight, faUser, faLock, faAt } from '@fortawesome/free-solid-svg-icons';

interface InputProps {
  props: any;
  icon?: string;
}

export const InputField = ({ field, form: { errors, touched }, icon, ...props }: FieldProps & InputProps) => {
  const errorMessage = touched[field.name] && errors[field.name];

  return (
    <InputGroup className="mb-3">
      {icon && (
        <InputGroupAddon addonType="prepend">
          <InputGroupText>
            <i className={icon} />
            {/* <FontAwesomeIcon
              icon={icon === 'user' ? faUser : icon === 'lock' ? faLock : icon === 'at' ? faAt : faAngleRight}
            /> */}
          </InputGroupText>
        </InputGroupAddon>
      )}
      <Input {...field} {...props} />
      {errorMessage && (
        <ErrorMessage name={field.name} render={(msg: string) => <div style={{ color: 'red' }}>{msg}</div>} />
      )}
    </InputGroup>
  );
};
