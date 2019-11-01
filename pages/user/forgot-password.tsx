import React from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import Router from 'next/router';
import Link from 'next/link';
import { Formik, Field } from 'formik';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Row } from 'reactstrap';

import { InputField } from '../../components/fields/InputField';
import { useForgotPasswordMutation } from '../../generated/graphql';

interface Props {}

const ForgotPassword: NextPage<Props> = () => {
  const [forgotPassword] = useForgotPasswordMutation();

  return (
    <>
      <Head>
        <title>Forgot Password Page</title>
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
                    <h3 className="text-center mb-4">Recover Your Password</h3>
                    <Formik
                      initialValues={{
                        email: '',
                      }}
                      onSubmit={async data => {
                        await forgotPassword({ variables: data });
                        Router.push('/user/check-email');
                      }}
                      render={({ handleSubmit }) => (
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
                    />
                    <Row>
                      <Col className="text-center">
                        <Link href="/user/login">
                          <Button color="link">Go back to login</Button>
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

export default ForgotPassword;
