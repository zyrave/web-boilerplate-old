import React from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import Router from 'next/router';
import { Formik, Field } from 'formik';
import { Button, Card, CardBody, Col, Container, Form, Row } from 'reactstrap';

import { InputField } from '../../components/fields/InputField';
import { useRegisterMutation } from '../../generated/graphql';

interface Props {}

const Register: NextPage<Props> = () => {
  const [register] = useRegisterMutation();

  return (
    <>
      <Head>
        <title>Register Page</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="9" lg="7" xl="6">
              <Card className="mx-4">
                <CardBody className="p-4">
                  <h1>Register</h1>
                  <p className="text-muted">Create your account</p>
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
                        Router.push('/user/check-email');
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
                      <Form onSubmit={handleSubmit}>
                        <Field name="firstName" placeholder="First Name" icon="icon-user" component={InputField} />
                        <Field name="lastName" placeholder="Last Name" icon="icon-user" component={InputField} />
                        <Field name="email" placeholder="Email" icon="icon-envelope" component={InputField} />
                        <Field
                          name="password"
                          type="password"
                          placeholder="Password"
                          icon="icon-lock"
                          component={InputField}
                        />
                        <Button type="submit" color="success" block>
                          Create Account
                        </Button>
                      </Form>
                    )}
                  />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Register;
