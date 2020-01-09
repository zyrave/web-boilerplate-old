import { Formik, Field } from 'formik';
import { NextPage, NextPageContext } from 'next';
import Router from 'next/router';
import { NextSeo } from 'next-seo';

import { useChangePasswordMutation } from '../../../generated/graphql';
import { InputField } from '../../../modules/shared/fields/InputField';

interface Props {
  token?: {};
}

const getInitialProps = async ({ query: { token } }: NextPageContext) => ({ token });

const ChangePassword: NextPage<Props> = ({ token }) => {
  const [changePassword] = useChangePasswordMutation();

  return (
    <>
      <NextSeo title="Forgot Password Page" />
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
    </>
  );
};

ChangePassword.getInitialProps = getInitialProps;

export default ChangePassword;
