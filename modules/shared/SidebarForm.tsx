import React, { ReactNode } from 'react';
import classNames from 'classnames';

interface Props {
  children?: ReactNode;
  className?: string;
}

const SidebarForm: React.FC<Props> = ({ className, children, ...attributes }) => {
  const classes = classNames(className, 'sidebar-form');
  const form = children ? (
    <div className={classes} {...attributes}>
      {children}
    </div>
  ) : null;

  return form;
};

export default SidebarForm;
