import React, { useEffect } from 'react';
import classNames from 'classnames';

interface Props {
  className?: string;
  fixed?: boolean;
}

const Footer: React.FC<Props> = ({ className, fixed = 'false', ...attributes }) => {
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
      <span>
        <a href="https://coreui.io">CoreUI</a> &copy; 2019 creativeLabs.
      </span>
      <span className="ml-auto">
        Powered by <a href="https://coreui.io/react">CoreUI for React</a>
      </span>
    </footer>
  );
};

export default Footer;
