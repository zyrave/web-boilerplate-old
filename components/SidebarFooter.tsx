import React, { ReactNode } from 'react';
import classNames from 'classnames';

interface Props {
  children?: ReactNode;
  className?: string;
}

const AppSidebarFooter: React.FC<Props> = ({ className, children, ...attributes }) => {
  const classes = classNames(className, 'sidebar-footer');
  const footer = children ? (
    <div className={classes} {...attributes}>
      {children}
    </div>
  ) : null;

  return footer;
};

export default AppSidebarFooter;
