import React, { FC } from 'react';
import Link from 'next/link';
import { Row, Col } from 'reactstrap';

interface Props {
  title: string;
  content: string;
}

const Error: FC<Props> = ({ title = '', content = '' }) => (
  <Row>
    <Col lg="4">
      <h2>{title}</h2>
      <p>{content}</p>
      <p>
        <Link href="/">
          <a className="btn btn-primary">Go Home</a>
        </Link>
      </p>
    </Col>
  </Row>
);

export default Error;
