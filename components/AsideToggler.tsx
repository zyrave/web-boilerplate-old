/* eslint-disable react-hooks/exhaustive-deps */
import React, { ReactNode, useEffect } from 'react';
import classNames from 'classnames';

import { asideMenuCssClasses, validBreakpoints, checkBreakpoint } from '../lib/layouts/index';
import toggleClasses from '../lib/layouts/toggle-classes';

interface Props {
  children?: ReactNode;
  className?: string;
  defaultOpen?: boolean;
  display?: any;
  mobile?: boolean;
  tag?: JSX.Element;
  type?: any;
}

const AsideToggler: React.FC<Props> = ({
  children,
  className,
  defaultOpen = false,
  display = 'lg',
  mobile = false,
  type = 'button',
  ...attributes
}) => {
  const toggle = (force?: boolean) => {
    let cssClass = asideMenuCssClasses[0];
    if (!mobile && display && checkBreakpoint(display, validBreakpoints)) {
      cssClass = `aside-menu-${display}-show`;
    }
    toggleClasses(cssClass, asideMenuCssClasses, force);
  };

  useEffect(() => {
    toggle(defaultOpen);
  }, [defaultOpen, toggle]);

  const asideToggle = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    toggle();
  };

  // delete attributes.defaultOpen;
  // delete attributes.display;
  // delete attributes.mobile;

  const classes = classNames(className, 'navbar-toggler');

  return (
    <button type={type} className={classes} {...attributes} onClick={e => asideToggle(e)}>
      {children || <span className="navbar-toggler-icon" />}
    </button>
  );
};

export default AsideToggler;
