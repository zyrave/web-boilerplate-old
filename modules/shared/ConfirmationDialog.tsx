import React from 'react';
import { Button, Modal } from 'react-bootstrap';

interface Props {
  title?: string;
  message: string;
  defaultButtonText?: string;
  defaultButtonStyle?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'dark' | 'light';
  onClick: () => void;
  onClose: () => void;
}

const ConfirmationDialog: React.FC<Props> = ({
  title = 'Confirmation',
  message = '',
  defaultButtonText = 'OK',
  defaultButtonStyle = 'primary',
  onClick,
  onClose,
}) => (
  <Modal show={true} onHide={onClose} size="sm" centered>
    <Modal.Header closeButton>
      <Modal.Title>{title}</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <p>{message}</p>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="light" onClick={onClose}>
        Cancel
      </Button>
      <Button variant={defaultButtonStyle} onClick={onClick}>
        {defaultButtonText}
      </Button>
    </Modal.Footer>
  </Modal>
);

export default ConfirmationDialog;
