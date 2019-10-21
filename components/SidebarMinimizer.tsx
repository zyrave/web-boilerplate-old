import React, { ReactNode, useEffect } from 'react';
import classNames from 'classnames';

// import LayoutHelper from './shared/layout/layout'

interface Props {
  children?: ReactNode;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

const SidebarMinimizer: React.FC<Props> = ({ className, children, type = 'button', ...attributes }) => {
  useEffect(() => {
    // const isMinimized = document.body.classList.contains('sidebar-minimized');
    // LayoutHelper.sidebarPSToggle(!isMinimized)
  }, []);

  const handleClick = () => {
    // LayoutHelper.sidebarToggle()
  };

  const classes = classNames(className, 'sidebar-minimizer', 'mt-auto');

  return (
    <button className={classes} type={type} {...attributes} onClick={handleClick}>
      {children}
    </button>
  );
};

export default SidebarMinimizer;
