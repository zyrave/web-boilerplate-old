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
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <h1>Login</h1>
                    <p className="text-muted">Sign In to your account</p>
                    <Formik
                      initialValues={{
                        email: '',
                        password: '',
                      }}
                      onSubmit={async (data, { setErrors }) => {
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
                        <Form onSubmit={handleSubmit}>
                          <Field
                            name="email"
                            type="email"
                            placeholder="Email"
                            icon="icon-user"
                            component={InputField}
                          />
                          <Field
                            name="password"
                            type="password"
                            placeholder="Password"
                            icon="icon-lock"
                            component={InputField}
                          />
                          <Row>
                            <Col xs="6">
                              <Button type="submit" color="primary" className="px-4">
                                Login
                              </Button>
                            </Col>
                            <Col xs="6" className="text-right">
                              <Button color="link" className="px-0">
                                Forgot password?
                              </Button>
                            </Col>
                          </Row>
                        </Form>
                      )}
                    />
                  </CardBody>
                </Card>
                <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                  <CardBody className="text-center">
                    <div>
                      <h2>Sign up</h2>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua.
                      </p>
                      <Link href="/user/register">
                        <Button color="primary" className="mt-3" active tabIndex={-1}>
                          Register Now!
                        </Button>
                      </Link>
                    </div>
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
