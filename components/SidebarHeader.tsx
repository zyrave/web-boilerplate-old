import React, { ReactNode } from 'react';
import classNames from 'classnames';

interface Props {
  children?: ReactNode;
  className?: string;
}

const SidebarHeader: React.FC<Props> = ({ className, children, ...attributes }) => {
  const classes = classNames(className, 'sidebar-header');
  const header = children ? (
    <div className={classes} {...attributes}>
      {children}
    </div>
  ) : null;

  return header;
};

export default SidebarHeader;
