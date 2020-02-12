import { Formik, Field } from 'formik';
import { NextPage } from 'next';
import Link from 'next/link';
import Router from 'next/router';
import { NextSeo } from 'next-seo';
import React, { useState } from 'react';
import { Button, Card, Col, Container, Form, Modal, Row, Spinner } from 'react-bootstrap';
import * as yup from 'yup';

import { InputField } from '../../modules/shared/fields/InputField';
import { useRegisterMutation } from '../../generated/graphql';

const schema = yup.object({
  firstName: yup.string().required(`First Name can't be blank`),
  lastName: yup.string().required(`Last Name can't be blank`),
  email: yup
    .string()
    .email('Invalid email')
    .required(`Email can't be blank`),
  password: yup
    .string()
    .min(6, 'Use 6 characters or more for your password')
    .required('Enter a password'),
  confirmPassword: yup.string().oneOf([yup.ref('password'), null], `Passwords doesn't match`),
});

interface Props {}

const Register: NextPage<Props> = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [register, { loading }] = useRegisterMutation();

  const handleCloseModal = () => {
    setShowModal(false);
    Router.push('/users/login');
  };

  return (
    <>
      <NextSeo title="Register Page" />
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col sm="11" md="9" lg="5">
              <Card className="mx-4">
                <Card.Body className="p-4">
                  <h1 className="text-center">Register</h1>
                  <p className="text-center text-muted">Create an account</p>
                  <Formik
                    validationSchema={schema}
                    initialValues={{
                      firstName: '',
                      lastName: '',
                      email: '',
                      password: '',
                      confirmPassword: '',
                    }}
                    onSubmit={async (data, { setErrors }) => {
                      delete data.confirmPassword;

                      try {
                        await register({ variables: { data } });
                        setShowModal(true);
                      } catch (err) {
                        const errors: { [key: string]: string } = {};

                        err &&
                          err.graphQLErrors &&
                          err.graphQLErrors[0].extensions.exception.validationErrors.map((validationErr: any) => {
                            Object.values(validationErr.constraints).map((message: any) => {
                              errors[validationErr.property] = message;
                            });
                          });
                        setErrors(errors);
                      }
                    }}
                  >
                    {({ handleSubmit }) => (
                      <Form onSubmit={handleSubmit}>
                        <Field
                          name="firstName"
                          placeholder="First Name *"
                          icon="icon-user"
                          disabled={loading}
                          component={InputField}
                        />
                        <Field
                          name="lastName"
                          placeholder="Last Name *"
                          icon="icon-user"
                          disabled={loading}
                          component={InputField}
                        />
                        <Field
                          name="email"
                          placeholder="Email *"
                          icon="icon-envelope"
                          disabled={loading}
                          component={InputField}
                        />
                        <Field
                          name="password"
                          type="password"
                          placeholder="Password *"
                          icon="icon-lock"
                          disabled={loading}
                          component={InputField}
                        />
                        <Field
                          name="confirmPassword"
                          type="password"
                          placeholder="Password (Confirm) *"
                          icon="icon-lock"
                          disabled={loading}
                          component={InputField}
                        />
                        <Row className="mt-3">
                          <Col>
                            {loading ? (
                              <Button type="submit" variant="primary" block disabled>
                                <Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" />
                                Loading...
                              </Button>
                            ) : (
                              <Button type="submit" color="primary" block>
                                Create Account
                              </Button>
                            )}
                          </Col>
                        </Row>
                      </Form>
                    )}
                  </Formik>
                  <Row className="mt-4">
                    <Col className="mt-2 text-center">
                      Already have an account?
                      <Row>
                        <Col className="mt-1 text-center">
                          <Link href="/users/login">
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
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>Please check your email to confirm your account</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Register;
