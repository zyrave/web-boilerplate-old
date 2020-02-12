import { Formik, Field } from 'formik';
import { NextPage } from 'next';
import Link from 'next/link';
import Router from 'next/router';
import { NextSeo } from 'next-seo';
import React, { useState } from 'react';
import { Button, Card, Col, Container, Form, Modal, Row, Spinner } from 'react-bootstrap';
import * as yup from 'yup';

import { useForgotPasswordMutation } from '../../generated/graphql';
import { InputField } from '../../modules/shared/fields/InputField';

const schema = yup.object({
  email: yup
    .string()
    .email('Invalid email')
    .required(`Email can't be blank`),
});

interface Props {}

const ForgotPassword: NextPage<Props> = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [forgotPassword, { loading }] = useForgotPasswordMutation();

  const handleCloseModal = () => {
    setShowModal(false);
    Router.push('/users/login');
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
                  <h3 className="text-center mb-4">Recover Your Password</h3>
                  <Formik
                    validationSchema={schema}
                    initialValues={{
                      email: '',
                    }}
                    onSubmit={async data => {
                      await forgotPassword({ variables: data });
                      setShowModal(true);
                    }}
                  >
                    {({ handleSubmit }) => (
                      <Form onSubmit={handleSubmit}>
                        <Field
                          name="email"
                          placeholder="Email *"
                          icon="icon-envelope"
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
                                Send Rest Link
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
        <Modal.Body>Please check your email to reset your password</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ForgotPassword;
