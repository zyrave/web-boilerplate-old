import React, { useContext, ReactNode, FC } from 'react';
import Link from 'next/link';
import { WithRouterProps } from 'next/dist/client/with-router';
import { Badge, Nav } from 'react-bootstrap';
import classNames from 'classnames';
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';
import { withRouter } from 'next/router';

import NavContext from '../lib/NavContext';

interface Props {
  children?: ReactNode;
  className?: string;
  navConfig?: any;
  navFunc?: any;
  isOpen?: boolean;
  staticContext?: any;
  router?: any;
  props?: any;
}

const SidebarNav: FC<Props> = ({
  children,
  className,
  navConfig = {
    items: [
      {
        name: 'Dashboard',
        url: '/dashboard',
        icon: 'icon-speedometer',
        badge: { variant: 'info', text: 'NEW' },
      },
    ],
  },
  props,
  ...attributes
}) => {
  const { openDropdownMenu, onClick } = useContext(NavContext);

  const handleClick = (e: any, path: string) => {
    e.preventDefault();
    onClick(path);
    e.currentTarget.parentElement && e.currentTarget.parentElement.classList.toggle('open');
  };

  const hideMobile = () => {
    if (document.body.classList.contains('sidebar-show')) {
      document.body.classList.toggle('sidebar-show');
    }
  };

  const getAttribs = (attr: any) => JSON.parse(JSON.stringify(attr || {}));

  const navWrapper = (item: any) =>
    item.wrapper && item.wrapper.element
      ? React.createElement(item.wrapper.element, item.wrapper.attributes, item.name)
      : item.name;

  const navTitle = (title: any, key: any) => {
    const classes = classNames('nav-title', title.class, title.className);
    return (
      <li key={key} className={classes}>
        {navWrapper(title)}{' '}
      </li>
    );
  };

  const navDivider = (divider: any, key: any) => {
    const classes = classNames('divider', divider.class, divider.className);
    return <li key={key} className={classes} />;
  };

  const navBadge = (badge: any) => {
    if (badge) {
      const classes = classNames(badge.class, badge.className);
      return (
        <Badge className={classes} variant={badge.variant}>
          {badge.text}
        </Badge>
      );
    }
    return null;
  };

  const isExternal = (url: any, val: any) => {
    const linkType = typeof url;
    const link =
      linkType === 'string'
        ? url
        : linkType === 'object' && url.pathname
        ? url.pathname
        : linkType === 'function' && typeof url(val.location) === 'string'
        ? url(val.location)
        : linkType === 'function' && typeof url(val.location) === 'object'
        ? url(val.location).pathname
        : '';
    return link.substring(0, 4) === 'http';
  };

  const navLink = (item: any, key: any, classes: any) => {
    const url = item.url || '';
    const itemIcon = <i className={classes.icon} />;
    const itemBadge = navBadge(item.badge);
    const attr = getAttribs(item.attributes);
    classes.link = classNames(classes.link, attr.disabled ? '' : 'pointer', attr.class, attr.className);
    const itemAttr = getAttribs(item.itemAttr);
    classes.item = classNames(classes.item, itemAttr.class, itemAttr.className);
    return (
      <Nav.Item key={key} as="li" className={classes.item} {...itemAttr}>
        {attr.disabled ? (
          <Link href={''} passHref>
            <Nav.Link className={classes.link} {...attr}>
              {itemIcon}
              {item.name}
              {itemBadge}
            </Nav.Link>
          </Link>
        ) : isExternal(url, props) ? (
          <Link href={url} passHref>
            <Nav.Link className={classes.link} active {...attr}>
              {itemIcon}
              {item.name}
              {itemBadge}
            </Nav.Link>
          </Link>
        ) : (
          <Link href={url} passHref>
            <Nav.Link className={classes.link} onClick={hideMobile} {...attr}>
              {itemIcon}
              {item.name}
              {itemBadge}
            </Nav.Link>
          </Link>
        )}
      </Nav.Item>
    );
  };

  const navLabel = (item: any, key: any) => {
    const classes = {
      item: classNames('hidden-cn', item.class),
      link: classNames('nav-label', item.class ? item.class : ''),
      icon: classNames(
        'nav-icon',
        !item.icon ? 'fa fa-circle' : item.icon,
        item.label.variant ? `text-${item.label.variant}` : '',
        item.label.class ? item.label.class : '',
      ),
    };
    return navLink(item, key, classes);
  };

  const navDropdown = (item: any, key: any) => {
    const classIcon = classNames('nav-icon', item.icon);
    const attr = getAttribs(item.attributes);
    const classes = classNames('nav-link', 'nav-dropdown-toggle', item.class, attr.class, attr.className);
    const itemAttr = getAttribs(item.itemAttr);
    const liClasses = classNames(
      openDropdownMenu === item.url ? 'nav-item nav-dropdown open' : 'nav-item nav-dropdown',
      itemAttr.class,
      itemAttr.className,
    );

    return (
      <li key={key} className={liClasses} {...itemAttr}>
        <a className={classes} href="/" onClick={e => handleClick(e, item.url)} {...attr}>
          <i className={classIcon} />
          {item.name}
          {navBadge(item.badge)}
        </a>
        <ul className="nav-dropdown-items">{navList(item.children)}</ul>{//eslint-disable-line
        }
      </li>
    );
  };

  const navItem = (item: any, key: any) => {
    const classes = {
      item: classNames(item.class),
      link: classNames('nav-link', item.variant ? `nav-link-${item.variant}` : ''),
      icon: classNames('nav-icon', item.icon),
    };
    return navLink(item, key, classes);
  };

  const navType = (item: any, idx: any) =>
    item.title
      ? navTitle(item, idx)
      : item.divider
      ? navDivider(item, idx)
      : item.label
      ? navLabel(item, idx)
      : item.children
      ? navDropdown(item, idx)
      : navItem(item, idx);

  const navList = (items: any) => items.map((item: string, index: number) => navType(item, index));

  const navClasses = classNames(className, 'sidebar-nav');

  return (
    <PerfectScrollbar className={navClasses} {...attributes}>
      <Nav>{children || navList(navConfig.items)}</Nav>
    </PerfectScrollbar>
  );
};

export default withRouter<WithRouterProps & Props>(SidebarNav);
