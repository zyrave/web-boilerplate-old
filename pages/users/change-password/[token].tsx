import { NextPage, NextPageContext } from 'next';
import { Formik, Field } from 'formik';
import Router from 'next/router';

import Layout from '../../../components/Layout';
import { useChangePasswordMutation } from '../../../generated/graphql';
import { InputField } from '../../../components/fields/InputField';

interface Props {
  token?: {};
}

const getInitialProps = async ({ query: { token } }: NextPageContext) => ({ token });

const ChangePassword: NextPage<Props> = ({ token }) => {
  const [changePassword] = useChangePasswordMutation();

  return (
    <Layout title="Forgot Password Page">
      <Formik
        initialValues={{
          password: '',
        }}
        onSubmit={async data => {
          await changePassword({
            variables: {
              data: {
                password: data.password,
                token: token as string,
              },
            },
          });
          Router.push('/');
        }}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Field name="password" type="password" placeholder="Password" component={InputField} />
            <button type="submit">Submit</button>
          </form>
        )}
      />
    </Layout>
  );
};

ChangePassword.getInitialProps = getInitialProps;

export default ChangePassword;
