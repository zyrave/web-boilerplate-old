import React, { useState } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import Router from 'next/router';
import Link from 'next/link';
import { Formik, Field } from 'formik';
import { Alert, Button, Card, Col, Container, Form, Row } from 'react-bootstrap';

import { InputField } from '../../components/fields/InputField';
import { useRegisterMutation } from '../../generated/graphql';

interface Props {}

const Register: NextPage<Props> = () => {
  const [showAlert, setShowAlert] = useState<boolean>(false);
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
            <Col md="5">
              <Card className="mx-4">
                <Card.Body className="p-4">
                  <h1 className="text-center">Register</h1>
                  <p className="text-center text-muted">Create an account</p>
                  <Alert variant="danger" show={showAlert} className="text-center">
                    Password doesn't match. Try again.
                  </Alert>
                  <Formik
                    initialValues={{
                      firstName: '',
                      lastName: '',
                      email: '',
                      password: '',
                      confirmPassword: '',
                    }}
                    onSubmit={async (data, { setErrors }) => {
                      if (data.password !== data.confirmPassword) {
                        setShowAlert(true);
                        return;
                      }

                      setShowAlert(false);
                      delete data.confirmPassword;

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
                        <Field name="firstName" placeholder="First Name *" icon="icon-user" component={InputField} />
                        <Field name="lastName" placeholder="Last Name *" icon="icon-user" component={InputField} />
                        <Field name="email" placeholder="Email *" icon="icon-envelope" component={InputField} />
                        <Field
                          name="password"
                          type="password"
                          placeholder="Password *"
                          icon="icon-lock"
                          component={InputField}
                        />
                        <Field
                          name="confirmPassword"
                          type="password"
                          placeholder="Password (Confirm) *"
                          icon="icon-lock"
                          component={InputField}
                        />
                        <Row className="mt-3">
                          <Col>
                            <Button type="submit" color="primary" block>
                              Create Account
                            </Button>
                          </Col>
                        </Row>
                      </Form>
                    )}
                  />
                  <Row className="mt-4">
                    <Col className="mt-2 text-center">
                      Already have an account?
                      <Row>
                        <Col className="mt-1 text-center">
                          <Link href="/user/login">
                            <a>Login</a>
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

export default Register;
