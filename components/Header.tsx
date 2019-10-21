import React, { useEffect, ReactNode } from 'react';
import classNames from 'classnames';

interface Props {
  children: ReactNode;
  className?: string;
  fixed: boolean;
  tag?: React.ElementType;
}

const Header: React.FC<Props> = ({ children, className, fixed = false, tag: Tag = 'header', ...attributes }) => {
  useEffect(() => {
    const isFixed = () => {
      if (fixed) {
        document.body.classList.add('header-fixed');
      }
    };
    isFixed();
  }, [fixed]);

  // delete attributes.fixed;

  const classes = classNames(className, 'app-header', 'navbar');

  return (
    <Tag className={classes} {...attributes}>
      {children}
    </Tag>
  );
};

export default Header;
