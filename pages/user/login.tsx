import React from 'react';
import { NextPage } from 'next';
import { Formik, Field } from 'formik';
import Router from 'next/router';

import Layout from '../../components/Layout';
import { InputField } from '../../components/fields/InputField';
import { useLoginMutation } from '../../generated/graphql';

interface Props {}

const Login: NextPage<Props> = () => {
  const [login] = useLoginMutation();

  return (
    <Layout title="Login Page">
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        onSubmit={async (data, { setErrors }) => {
          const response = await login({ variables: data });

          if (response && response.data && !response.data.login) {
            setErrors({
              email: 'Invalid login',
            });
            return;
          }
          Router.push('/');
        }}
        validateOnBlur={false}
        validateOnChange={false}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Field name="email" placeholder="Email" component={InputField} />
            <Field name="password" type="password" placeholder="Password" component={InputField} />
            <button type="submit">Submit</button>
          </form>
        )}
      />
    </Layout>
  );
};

export default Login;
