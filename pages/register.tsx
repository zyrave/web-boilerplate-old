import React from 'react';
import { Formik, Field } from 'formik';

import Layout from '../components/Layout';
import { InputField } from '../components/fields/InputField';
import { useRegisterMutation } from '../generated/graphql';

interface Props {}

const Register: React.FC<Props> = () => {
  const [register] = useRegisterMutation();

  return (
    <Layout title="Register Page">
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
          password: '',
        }}
        onSubmit={async (data, { setErrors }) => {
          try {
            await register({ variables: { data } });
          } catch (err) {
            const errors: { [key: string]: string } = {};

            err.graphQLErrors[0].extensions.exception.validationErrors.map((validationErr: any) => {
              Object.values(validationErr.constraints).map((message: any) => {
                errors[validationErr.property] = message;
              });
            });
            setErrors(errors);
          }
        }}
        validateOnBlur={false}
        validateOnChange={false}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Field name="firstName" placeholder="First Name" component={InputField} />
            <Field name="lastName" placeholder="Last Name" component={InputField} />
            <Field name="email" placeholder="Email" component={InputField} />
            <Field name="password" type="password" placeholder="Password" component={InputField} />
            <button type="submit">Submit</button>
          </form>
        )}
      />
    </Layout>
  );
};

export default Register;
