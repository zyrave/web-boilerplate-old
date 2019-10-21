import React, { ReactNode } from 'react';
import classNames from 'classnames';

import { sidebarCssClasses, validBreakpoints, checkBreakpoint } from '../lib/layouts/index';
import toggleClasses from '../lib/layouts/toggle-classes';

interface Props {
  children?: ReactNode;
  className?: string;
  display?: any;
  mobile?: boolean;
  type?: any;
}

const SidebarToggler: React.FC<Props> = ({ children, className, display = 'lg', mobile = false, ...attributes }) => {
  const toggle = (force?: any) => {
    let cssClass = sidebarCssClasses[0];
    if (!mobile && display && checkBreakpoint(display, validBreakpoints)) {
      cssClass = `sidebar-${display}-show`;
    }
    toggleClasses(cssClass, sidebarCssClasses, force);
  };

  const sidebarToggle = (e: any) => {
    e.preventDefault();
    toggle();
  };

  // delete attributes.mobile;
  // delete attributes.display;

  const classes = classNames(className, 'navbar-toggler');

  return (
    <button
      type="button"
      className={classes}
      {...attributes}
      onClick={event => sidebarToggle(event)}
      data-sidebar-toggler
    >
      {children || <span className="navbar-toggler-icon" />}
    </button>
  );
};

export default SidebarToggler;
