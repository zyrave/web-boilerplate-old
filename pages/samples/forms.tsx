import React, { useState } from 'react';
import { NextPage } from 'next';
import * as yup from 'yup';
import { Formik } from 'formik';
import { Form, Card, Row, Col, Button, Alert, InputGroup } from 'react-bootstrap';

import { Layout } from '../../components';

const schema = yup.object({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  username: yup.string().required(),
  city: yup.string().required(),
  state: yup.string().required(),
  zip: yup.string().required(),
  terms: yup.bool().required(),
});

interface Props {}

const Forms: NextPage<Props> = () => {
  const [visible, setVisible] = useState(false);

  return (
    <Layout title="Basic Forms">
      <Row>
        <Col>
          <Alert variant="info" show={visible}>
            <strong>Success!</strong> Thank you for subscribing!
          </Alert>
        </Col>
      </Row>
      <Row>
        <Col xs="6">
          <Card>
            <Card.Header>
              <strong>Basic Form</strong> Elements
            </Card.Header>
            <Card.Body>
              <Formik
                validationSchema={schema}
                onSubmit={values => {
                  setVisible(true);
                  setTimeout(() => {
                    setVisible(false);
                  }, 2000);
                }}
                initialValues={{
                  firstName: 'John',
                  lastName: 'Doe',
                  username: 'john.doe@company.com',
                  city: 'Boston',
                  state: '',
                  zip: '',
                  terms: false,
                }}
              >
                {({ handleSubmit, handleChange, values, touched, errors }) => (
                  <Form noValidate onSubmit={handleSubmit}>
                    <Form.Group controlId="validationFormik01">
                      <Form.Label>First name</Form.Label>
                      <Form.Control
                        type="text"
                        name="firstName"
                        value={values.firstName}
                        onChange={handleChange}
                        isValid={touched.firstName && !errors.firstName}
                      />
                      <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="validationFormik02">
                      <Form.Label>Last name</Form.Label>
                      <Form.Control
                        type="text"
                        name="lastName"
                        value={values.lastName}
                        onChange={handleChange}
                        isValid={touched.lastName && !errors.lastName}
                      />
                      <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="validationFormikUsername">
                      <Form.Label>Username</Form.Label>
                      <InputGroup>
                        <InputGroup.Prepend>
                          <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control
                          type="text"
                          placeholder="Username"
                          aria-describedby="inputGroupPrepend"
                          name="username"
                          value={values.username}
                          onChange={handleChange}
                          isInvalid={!!errors.username}
                        />
                        <Form.Control.Feedback type="invalid">{errors.username}</Form.Control.Feedback>
                      </InputGroup>
                    </Form.Group>
                    <Form.Group controlId="validationFormik03">
                      <Form.Label>City</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="City"
                        name="city"
                        value={values.city}
                        onChange={handleChange}
                        isInvalid={!!errors.city}
                      />
                      <Form.Control.Feedback type="invalid">{errors.city}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="validationFormik04">
                      <Form.Label>State</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="State"
                        name="state"
                        value={values.state}
                        onChange={handleChange}
                        isInvalid={!!errors.state}
                      />
                      <Form.Control.Feedback type="invalid">{errors.state}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="validationFormik05">
                      <Form.Label>Zip</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Zip"
                        name="zip"
                        value={values.zip}
                        onChange={handleChange}
                        isInvalid={!!errors.zip}
                      />
                      <Form.Control.Feedback type="invalid">{errors.zip}</Form.Control.Feedback>
                    </Form.Group>
                    <Button type="submit" className="float-right">
                      Submit form
                    </Button>
                  </Form>
                )}
              </Formik>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Layout>
  );
};

export default Forms;
