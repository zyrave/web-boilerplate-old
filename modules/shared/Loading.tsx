import React from 'react';
import { Row, Col, ProgressBar } from 'react-bootstrap';

const Loading = () => (
  <Row>
    <Col md={{ span: 6, offset: 3 }}>
      <div className="page-is-loading">
        <ProgressBar animated now={100}>
          Loading
        </ProgressBar>
      </div>
    </Col>
  </Row>
);

export default Loading;
