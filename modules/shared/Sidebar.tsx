import React, { ReactNode, useEffect } from 'react';
import classNames from 'classnames';
import ClickOutHandler from 'react-onclickout';

import '../../utils/layouts/element-closest';
import { sidebarCssClasses } from '../../utils/layouts';
// import LayoutHelper from './shared/layout/layout';

interface Props {
  children: ReactNode;
  className?: string;
  compact?: boolean;
  display?: string;
  fixed?: boolean;
  minimized?: boolean;
  isOpen?: boolean;
  offCanvas?: boolean;
  staticContext?: any;
  tag?: React.ElementType;
}

const Sidebar: React.FC<Props> = ({
  children,
  className,
  compact = false,
  display = '',
  fixed = false,
  minimized = false,
  offCanvas = false,
  tag: Tag = 'div',
  ...attributes
}) => {
  useEffect(() => {
    const displayBreakpoint = () => {
      const cssTemplate = `sidebar-${display}-show`;
      let [cssClass] = sidebarCssClasses[0];
      if (display && sidebarCssClasses.indexOf(cssTemplate) > -1) {
        cssClass = cssTemplate;
      }
      document.body.classList.add(cssClass);
    };

    const isCompact = () => {
      if (compact) {
        document.body.classList.add('sidebar-compact');
      }
    };

    const isFixed = () => {
      if (fixed) {
        document.body.classList.add('sidebar-fixed');
      }
    };

    const isMinimized = () => {
      // LayoutHelper.sidebarToggle(minimized);
    };

    const isOffCanvas = () => {
      if (offCanvas) {
        document.body.classList.add('sidebar-off-canvas');
      }
    };
    displayBreakpoint();
    isCompact();
    isFixed();
    isMinimized();
    isOffCanvas();
  }, [compact, display, fixed, minimized, offCanvas]);

  const hideMobile = () => {
    if (document.body.classList.contains('sidebar-show')) {
      document.body.classList.remove('sidebar-show');
    }
  };

  const onClickOut = (e: any) => {
    if (typeof window !== 'undefined' && document.body.classList.contains('sidebar-show')) {
      if (!e.target.closest('[data-sidebar-toggler]')) {
        hideMobile();
      }
    }
  };

  const classes = classNames(className, 'sidebar');

  return (
    <ClickOutHandler
      onClickOut={(e: React.FormEvent<HTMLInputElement>) => {
        onClickOut(e);
      }}
    >
      <Tag className={classes} {...attributes}>
        {children}
      </Tag>
    </ClickOutHandler>
  );
};

export default Sidebar;
