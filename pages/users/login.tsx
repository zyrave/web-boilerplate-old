import { Formik, Field } from 'formik';
import { NextPage } from 'next';
import Link from 'next/link';
import Router from 'next/router';
import { NextSeo } from 'next-seo';
import React, { useState } from 'react';
import { Button, Card, Col, Container, Form, Row, Spinner } from 'react-bootstrap';

import { useLoginMutation, MeDocument } from '../../generated/graphql';
import { InputField } from '../../modules/shared/fields/InputField';
import { Alert } from '../../modules/shared';

const Login: NextPage = () => {
  const [alert, setAlert] = useState<any>({
    show: false,
    type: 'success',
    message: '',
  });
  const [login, { loading }] = useLoginMutation();

  return (
    <>
      <NextSeo title="Login Page" />
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col sm="8" md="6" lg="4">
              <Card className="p-4">
                <Card.Body>
                  <h1 className="text-center">Login</h1>
                  <p className="text-center text-muted">Sign In to your account</p>
                  <Alert
                    show={alert.show}
                    type={alert.type}
                    message={alert.message}
                    onClose={() => setAlert({ show: false })}
                  />
                  <Formik
                    initialValues={{
                      email: '',
                      password: '',
                    }}
                    onSubmit={async (data, { setErrors }) => {
                      try {
                        const response = await login({
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

                        if (response && response.data && !response.data.login) {
                          setAlert({
                            show: true,
                            type: 'danger',
                            message: 'Invalid login',
                          });
                        }
                        Router.push('/');
                      } catch (err) {
                        console.log('TRYC:', err);
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
                  >
                    {({ handleSubmit }) => (
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
                            {loading ? (
                              <Button type="submit" variant="primary" block disabled>
                                <Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" />
                                Signing in...
                              </Button>
                            ) : (
                              <Button type="submit" color="primary" block>
                                Sign in
                              </Button>
                            )}
                          </Col>
                        </Row>
                      </Form>
                    )}
                  </Formik>
                  <Row className="mb-3">
                    <Col className="mt-2 text-center">
                      <Link href="/users/forgot-password">
                        <a>Forgot password?</a>
                      </Link>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="mt-2 text-center">
                      Don't have an account?
                      <Row>
                        <Col className="mt-1 text-center">
                          <Link href="/users/register">
                            <a>Create an account</a>
                          </Link>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Login;
