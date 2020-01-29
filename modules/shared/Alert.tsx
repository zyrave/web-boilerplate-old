import classNames from 'classnames';
import React from 'react';
import { Alert as RbAlert } from 'react-bootstrap';

interface Props {
  show: boolean;
  type?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'dark' | 'light';
  message?: string | null;
  onClose: () => void;
}

const Alert: React.FC<Props> = ({ show = true, type = 'success', message = '', onClose }) => {
  let icon: string;

  switch (type) {
    case 'danger':
      icon = 'fa-times-circle';
      break;
    case 'info':
      icon = 'fa-info-circle';
      break;
    case 'warning':
      icon = 'fa-exclamation-circle';
      break;
    default:
      icon = 'fa-check-circle';
  }

  const classes = classNames('fas mr-2', icon);

  return (
    <RbAlert show={show} variant={type} onClose={onClose} dismissible>
      <i className={classes} />
      {message}
    </RbAlert>
  );
};

export default Alert;
