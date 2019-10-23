import React, { ReactNode, useEffect } from 'react';
import classNames from 'classnames';

interface Props {
  children?: ReactNode;
  className?: string;
  fixed?: boolean;
}

const Footer: React.FC<Props> = ({ children, className, fixed = 'false', ...attributes }) => {
  useEffect(() => {
    const isFixed = () => {
      if (fixed) {
        document.body.classList.add('footer-fixed');
      }
    };
    isFixed();
  }, [fixed]);

  const classes = classNames(className, 'app-footer');

  return (
    <footer className={classes} {...attributes}>
      {children}
    </footer>
  );
};

export default Footer;
