import React, { DetailedHTMLProps, InputHTMLAttributes } from 'react';
import { FieldProps, ErrorMessage } from 'formik';

type InputProps = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

export const InputField = ({ field, form: { errors, touched }, ...props }: FieldProps & InputProps) => {
  const errorMessage = touched[field.name] && errors[field.name];

  return (
    <div>
      <input {...field} {...props} />
      {errorMessage && (
        <ErrorMessage name={field.name} render={(msg: string) => <div style={{ color: 'red' }}>{msg}</div>} />
      )}
    </div>
  );
};
