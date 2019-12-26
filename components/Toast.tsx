import React, { FC } from 'react';
import { Toast as BsToast } from 'react-bootstrap';
import classNames from 'classnames';

interface Props {
  show: boolean;
  onClose: () => void;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  width?: string;
}

const Toast: FC<Props> = ({ show = false, onClose, type = 'info', message = '', width = '300px' }) => {
  let title;
  let icon;

  if (type === 'success') {
    title = 'Success!';
    icon = 'fa-check-circle';
  } else if (type === 'error') {
    title = 'Error!';
    icon = 'fa-times-circle';
  } else if (type === 'warning') {
    title = 'Warning!';
    icon = 'fa-info-circle';
  } else if (type === 'info') {
    title = 'Info!';
    icon = 'fa-info-circle';
  }

  return (
    <BsToast
      className={`bg-${type} text-white`}
      style={{
        position: 'absolute',
        top: 30,
        right: 30,
        zIndex: 9999,
        width,
      }}
      show={show}
    >
      <BsToast.Body>
        <div className="d-flex">
          <div className="mr-2">
            <i className={classNames('fas ', icon, 'fa-2x')} />
          </div>
          <div>
            <strong>{title}</strong>
            <p>{message}</p>
          </div>
          <div
            className="ml-auto mr-1"
            style={{ cursor: 'pointer' }}
            role="presentation"
            onClick={() => onClose()}
            onKeyDown={() => {}}
          >
            <i className="fas fa-times" />
          </div>
        </div>
      </BsToast.Body>
    </BsToast>
  );
};

export default Toast;
