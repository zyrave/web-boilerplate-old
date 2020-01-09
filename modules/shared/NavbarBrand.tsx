import React, { ReactNode } from 'react';
import classNames from 'classnames';

interface Props {
  children?: ReactNode;
  className?: string;
  brand?: any;
  full?: any;
  minimized?: any;
}

const NavbarBrand: React.FC<Props> = ({ children, className, brand, full, minimized, ...attributes }) => {
  const imgSrc = (image: any) => (image.src ? image.src : '');

  const imgWidth = (image: any) => (image.width ? image.width : 'auto');

  const imgHeight = (image: any) => (image.height ? image.height : 'auto');

  const imgAlt = (image: any) => (image.alt ? image.alt : '');

  const navbarBrandImg = (props: string, classBrand: any, key: any) => (
    <img
      src={imgSrc(props)}
      width={imgWidth(props)}
      height={imgHeight(props)}
      alt={imgAlt(props)}
      className={classBrand}
      key={key.toString()}
    />
  );

  const classes = classNames(className, 'navbar-brand');

  const img = [];
  if (brand) {
    const props = brand;
    const classBrand = 'navbar-brand';
    img.push(navbarBrandImg(props, classBrand, img.length + 1));
  }
  if (full) {
    const props = full;
    const classBrand = 'navbar-brand-full';
    img.push(navbarBrandImg(props, classBrand, img.length + 1));
  }
  if (minimized) {
    const props = minimized;
    const classBrand = 'navbar-brand-minimized';
    img.push(navbarBrandImg(props, classBrand, img.length + 1));
  }

  return (
    <a {...attributes} className={classes}>
      {children || img}
    </a>
  );
};

export default NavbarBrand;
