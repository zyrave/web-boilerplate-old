import React, { ReactNode, useEffect } from 'react';
import classNames from 'classnames';

import { asideMenuCssClasses, checkBreakpoint, validBreakpoints } from '../lib/layouts';
import toggleClasses from '../lib/layouts/toggle-classes';

interface Props {
  children?: ReactNode;
  className?: string;
  display?: string;
  fixed?: boolean;
  isOpen?: boolean;
  offCanvas?: boolean;
}

const Aside: React.FC<Props> = ({
  children,
  className,
  display = '',
  fixed = false,
  offCanvas = true,
  ...attributes
}) => {
  useEffect(() => {
    const isFixed = () => {
      if (fixed) {
        document.body.classList.add('aside-menu-fixed');
      }
    };

    const isOffCanvas = () => {
      if (offCanvas) {
        document.body.classList.add('aside-menu-off-canvas');
      }
    };

    const displayBreakpoint = () => {
      if (display && checkBreakpoint(display, validBreakpoints)) {
        const cssClass = `aside-menu-${display}-show`;
        toggleClasses(cssClass, asideMenuCssClasses, true);
      }
    };

    isFixed();
    isOffCanvas();
    displayBreakpoint();
  }, [display, fixed, offCanvas]);

  // delete attributes.display;
  // delete attributes.fixed;
  // delete attributes.offCanvas;
  // delete attributes.isOpen;

  const classes = classNames(className, 'aside-menu');

  return (
    <aside {...attributes} className={classes}>
      {children}
    </aside>
  );
};

export default Aside;
