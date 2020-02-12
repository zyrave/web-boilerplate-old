import { Formik, Field } from 'formik';
import { NextPage, NextPageContext } from 'next';
import Link from 'next/link';
import Router from 'next/router';
import { NextSeo } from 'next-seo';
import React, { useState } from 'react';
import { Button, Card, Col, Container, Form, Modal, Row, Spinner } from 'react-bootstrap';
import * as yup from 'yup';

import { useChangePasswordMutation } from '../../../generated/graphql';
import { InputField } from '../../../modules/shared/fields/InputField';

const schema = yup.object({
  password: yup
    .string()
    .min(6, 'Use 6 characters or more for your password')
    .required('Enter a password'),
});

interface Props {
  token?: {};
}

const getInitialProps = async ({ query: { token } }: NextPageContext) => ({ token });

const ChangePassword: NextPage<Props> = ({ token }) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [changePassword, { loading }] = useChangePasswordMutation();

  const handleCloseModal = () => {
    setShowModal(false);
    Router.push('/');
  };

  return (
    <>
      <NextSeo title="Forgot Password Page" />
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="4">
              <Card className="p-4">
                <Card.Body>
                  <h3 className="text-center mb-4">Reset Your Password</h3>
                  <Formik
                    validationSchema={schema}
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
                      setShowModal(true);
                    }}
                  >
                    {({ handleSubmit }) => (
                      <Form onSubmit={handleSubmit}>
                        <Field
                          name="password"
                          type="password"
                          placeholder="Password"
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
                                Change Password
                              </Button>
                            )}
                          </Col>
                        </Row>
                      </Form>
                    )}
                  </Formik>
                  <Row>
                    <Col className="mt-2 text-center">
                      <Link href="/users/login">
                        <a>Go back to login</a>
                      </Link>
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
        <Modal.Body>Your password has been changed successfully</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

ChangePassword.getInitialProps = getInitialProps;

export default ChangePassword;
