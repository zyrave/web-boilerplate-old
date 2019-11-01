import React from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import Router from 'next/router';
import Link from 'next/link';
import { Formik, Field } from 'formik';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Row } from 'reactstrap';

import { InputField } from '../../components/fields/InputField';
import { useLoginMutation, MeDocument } from '../../generated/graphql';

const Login: NextPage = () => {
  const [login] = useLoginMutation();

  return (
    <>
      <Head>
        <title>Login Page</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="4">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <h1 className="text-center">Login</h1>
                    <p className="text-center text-muted">Sign In to your account</p>
                    {/* <Alert color="danger" isOpen={!!errorMessage} className="text-center">
                      {errorMessage}
                    </Alert> */}
                    <Formik
                      initialValues={{
                        email: '',
                        password: '',
                      }}
                      onSubmit={async (data, { setErrors }) => {
                        // if (data.password !== data.confirmPassword) {
                        //   setShowAlert(true);
                        //   return;
                        // }

                        // setShowAlert(false);

                        try {
                          await login({
                            variables: data,
                            update: (cache, { data: d }) => {
                              if (!d || !d.login) {
                                return;
                              }
                              cache.writeQuery({
                                query: MeDocument,
                                data: { me: d.login },
                              });
                            },
                          });

                          // if (response && response.data && !response.data.login) {
                          //   setErrors({
                          //     email: 'Invalid login',
                          //   });
                          //   return;
                          // }
                          Router.push('/');
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
                          <Field
                            name="email"
                            type="email"
                            placeholder="Email *"
                            icon="icon-user"
                            component={InputField}
                          />
                          <Field
                            name="password"
                            type="password"
                            placeholder="Password *"
                            icon="icon-lock"
                            component={InputField}
                          />
                          <Row className="mt-3">
                            <Col>
                              <Button type="submit" color="primary" block>
                                Login
                              </Button>
                            </Col>
                          </Row>
                        </Form>
                      )}
                    />
                    <Row className="mb-4">
                      <Col className="text-center">
                        <Link href="/user/forgot-password">
                          <Button color="link">Forgot password?</Button>
                        </Link>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="text-center">
                        Don't have an account?
                        <Link href="/user/register">
                          <Button color="link">Create an account</Button>
                        </Link>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Login;
