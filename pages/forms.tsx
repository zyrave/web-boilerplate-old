import React, { useState } from 'react';
import { NextPage } from 'next';
import {
  Form,
  FormGroup,
  Label,
  Input,
  Card,
  CardHeader,
  CardBody,
  Row,
  Col,
  FormText,
  Button,
  Alert,
} from 'reactstrap';

import { Layout } from '../components';

interface Props {}

const Forms: NextPage<Props> = () => {
  const [visible, setVisible] = useState(false);

  return (
    <Layout title="Basic Forms">
      <Row>
        <Col>
          <Alert color="info" isOpen={visible}>
            <strong>Success!</strong> Thank you for subscribing!
          </Alert>
        </Col>
      </Row>
      <Row>
        <Col xs="6">
          <Card>
            <CardHeader>
              <strong>Basic Form</strong> Elements
            </CardHeader>
            <CardBody>
              <Form>
                <FormGroup row>
                  <Label for="firstname" sm="3">
                    First Name
                  </Label>
                  <Col>
                    <Input type="text" name="firstname" id="firstname" placeholder="First Name" />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="lastname" sm="3">
                    Last Name
                  </Label>
                  <Col>
                    <Input type="text" name="lastname" id="lastname" placeholder="Last Name" />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="email" sm="3">
                    Email
                  </Label>
                  <Col>
                    <Input type="text" name="email" id="email" placeholder="Email" />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="password" sm="3">
                    Password
                  </Label>
                  <Col>
                    <Input type="password" name="password" id="password" placeholder="Password" />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="exampleEmail" sm="3">
                    Valid input
                  </Label>
                  <Col>
                    <Input valid />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="exampleEmail" sm="3">
                    Invalid input
                  </Label>
                  <Col>
                    <Input invalid />
                    <FormText color="danger">Field can not be empty</FormText>
                  </Col>
                </FormGroup>
                <Button
                  color="primary"
                  className="float-right"
                  onClick={() => {
                    setVisible(true);
                    setTimeout(() => {
                      setVisible(false);
                    }, 2000);
                  }}
                >
                  Submit
                </Button>
              </Form>
            </CardBody>
          </Card>
        </Col>
        {/* <Col>
          <Toast>
            <ToastHeader icon="success">Reactstrap</ToastHeader>
            <ToastBody>This is a toast with a success icon — check it out!</ToastBody>
          </Toast>
        </Col> */}
      </Row>
    </Layout>
  );
};

export default Forms;
