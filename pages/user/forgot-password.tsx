import React from 'react';
import { NextPage } from 'next';
import { Formik, Field } from 'formik';
import Router from 'next/router';

import Layout from '../../components/Layout';
import { InputField } from '../../components/fields/InputField';
import { useForgotPasswordMutation } from '../../generated/graphql';

interface Props {}

const ForgotPassword: NextPage<Props> = () => {
  const [forgotPassword] = useForgotPasswordMutation();

  return (
    <Layout title="Forgot Password Page">
      <Formik
        initialValues={{
          email: '',
        }}
        onSubmit={async data => {
          await forgotPassword({ variables: data });
          Router.push('/user/check-email');
        }}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Field name="email" placeholder="Email" component={InputField} />
            <button type="submit">Submit</button>
          </form>
        )}
      />
    </Layout>
  );
};

export default ForgotPassword;
