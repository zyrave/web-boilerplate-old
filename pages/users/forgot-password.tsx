import React from 'react';
import { NextPage } from 'next';
import Router from 'next/router';
import Link from 'next/link';
import { NextSeo } from 'next-seo';
import { Formik, Field } from 'formik';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';

import { InputField } from '../../modules/shared/fields/InputField';
import { useForgotPasswordMutation } from '../../generated/graphql';

interface Props {}

const ForgotPassword: NextPage<Props> = () => {
  const [forgotPassword] = useForgotPasswordMutation();

  return (
    <>
      <NextSeo title="Forgto Password Page" />
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="4">
              <Card className="p-4">
                <Card.Body>
                  <h3 className="text-center mb-4">Recover Your Password</h3>
                  <Formik
                    initialValues={{
                      email: '',
                    }}
                    onSubmit={async data => {
                      await forgotPassword({ variables: data });
                      Router.push('/users/check-email');
                    }}
                  >
                    {({ handleSubmit }) => (
                      <Form onSubmit={handleSubmit}>
                        <Field name="email" placeholder="Email *" icon="icon-envelope" component={InputField} />
                        <Row className="mt-3">
                          <Col>
                            <Button type="submit" color="primary" block>
                              Send Reset Link
                            </Button>
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
    </>
  );
};

export default ForgotPassword;
