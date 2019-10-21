import React, { useContext } from 'react';
import Link from 'next/link';
import { Badge, Nav, NavItem, NavLink as RsNavLink } from 'reactstrap';
import classNames from 'classnames';
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';
import { withRouter } from 'next/router';

import NavContext from './NavContext';

// interface Props {
//   children?: ReactNode;
//   className?: string;
//   navConfig?: any;
//   navFunc?: any;
//   isOpen?: boolean;
//   staticContext?: any;
//   router?: any;
//   props?: any;
// }

const SidebarNav: React.FC<any> = ({
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
  // router,
  props,
  ...attributes
}) => {
  const { openDropdownMenu, onClick } = useContext(NavContext);

  const handleClick = (e: any, path: string) => {
    e.preventDefault();
    // console.log('E: ', path);
    onClick(path);
    e.currentTarget.parentElement && e.currentTarget.parentElement.classList.toggle('open');
  };

  // const activeRoute = (routeName: string, val: any) => {
  //   const { openNavItems } = useContext(NavContext); //eslint-disable-line
  //   console.log('**router.pathname:', router.pathname);
  //   console.log('**routeName:', routeName);
  //   console.log('**val:', val);
  //   console.log('**openNavItems:', openNavItems);
  //   console.log(router.pathname.indexOf(routeName));
  //   // if (val && val.location) {
  //   //   if (val.location.pathname.indexOf(routeName) > -1) {
  //   //     console.log('TEST5');
  //   //     return 'nav-item nav-dropdown open';
  //   //   }
  //   // }
  //   // console.log('PathName: ', val.pathName);
  //   // console.log('RouteName: ', routeName);
  //   if (router.pathname.indexOf(routeName) > -1) {
  //     // console.log('TEST5');
  //     return 'nav-item nav-dropdown open';
  //   }
  //   // console.log('TEST6');
  //   return 'nav-item nav-dropdown';
  // };

  const hideMobile = () => {
    if (document.body.classList.contains('sidebar-show')) {
      document.body.classList.toggle('sidebar-show');
    }
  };

  const getAttribs = (attr: any) => JSON.parse(JSON.stringify(attr || {}));

  // simple wrapper for nav-title item
  const navWrapper = (item: any) =>
    item.wrapper && item.wrapper.element
      ? React.createElement(item.wrapper.element, item.wrapper.attributes, item.name)
      : item.name;

  // nav list section title
  const navTitle = (title: any, key: any) => {
    const classes = classNames('nav-title', title.class, title.className);
    return (
      <li key={key} className={classes}>
        {navWrapper(title)}{' '}
      </li>
    );
  };

  // nav list divider
  const navDivider = (divider: any, key: any) => {
    const classes = classNames('divider', divider.class, divider.className);
    return <li key={key} className={classes} />;
  };

  // badge addon to NavItem
  const navBadge = (badge: any) => {
    if (badge) {
      const classes = classNames(badge.class, badge.className);
      return (
        <Badge className={classes} color={badge.variant}>
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

  // nav link
  const navLink = (item: any, key: any, classes: any) => {
    const url = item.url || '';
    const itemIcon = <i className={classes.icon} />;
    const itemBadge = navBadge(item.badge);
    const attr = getAttribs(item.attributes);
    classes.link = classNames(classes.link, attr.class, attr.className);
    // delete attributes.class;
    // delete attributes.className;
    const itemAttr = getAttribs(item.itemAttr);
    classes.item = classNames(classes.item, itemAttr.class, itemAttr.className);
    // delete itemAttr.class;
    // delete itemAttr.className;
    // const NavLink = router.NavLink || RsNavLink;
    return (
      <NavItem key={key} className={classes.item} {...itemAttr}>
        {attr.disabled ? (
          <Link href={''}>
            <RsNavLink className={classes.link} {...attr}>
              {itemIcon}
              {item.name}
              {itemBadge}
            </RsNavLink>
          </Link>
        ) : isExternal(url, props) /*|| NavLink === RsNavLink*/ ? (
          <Link href={url}>
            <RsNavLink className={classes.link} active {...attr}>
              {itemIcon}
              {item.name}
              {itemBadge}
            </RsNavLink>
          </Link>
        ) : (
          <Link href={url}>
            <RsNavLink className={classes.link} /*activeClassName="active"*/ onClick={hideMobile} {...attr}>
              {itemIcon}
              {item.name}
              {itemBadge}
            </RsNavLink>
          </Link>
        )}
      </NavItem>
    );
  };

  // nav label with nav link
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

  // nav dropdown
  const navDropdown = (item: any, key: any) => {
    //  const { openNavItems } = useContext(NavContext); //eslint-disable-line
    const classIcon = classNames('nav-icon', item.icon);
    const attr = getAttribs(item.attributes);
    const classes = classNames('nav-link', 'nav-dropdown-toggle', item.class, attr.class, attr.className);
    // delete attributes.class;
    // delete attributes.className;
    const itemAttr = getAttribs(item.itemAttr);
    // console.log('@: ', openDropdownMenu);
    // const liClasses = classNames(activeRoute(item.url, props), itemAttr.class, itemAttr.className);
    // const isOpen = openDropdownMenu.indexOf(item.url);
    // console.log('^^^^^:', isOpen);
    const liClasses = classNames(
      openDropdownMenu === item.url ? 'nav-item nav-dropdown open' : 'nav-item nav-dropdown',
      itemAttr.class,
      itemAttr.className,
    );
    // console.log('######', item.url, ' = ', liClasses);
    // delete itemAttr.class;
    // delete itemAttr.className;
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

  // nav item with nav link
  const navItem = (item: any, key: any) => {
    const classes = {
      item: classNames(item.class),
      link: classNames('nav-link', item.variant ? `nav-link-${item.variant}` : ''),
      icon: classNames('nav-icon', item.icon),
    };
    return navLink(item, key, classes);
  };

  // nav type
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

  // nav list
  const navList = (items: any) => items.map((item: string, index: number) => navType(item, index));

  // delete attributes.isOpen
  // delete attributes.staticContext
  // delete attributes.Tag
  // delete attributes.router

  const navClasses = classNames(className, 'sidebar-nav');

  // ToDo: find better rtl fix
  // const isRtl = getComputedStyle(document.documentElement).direction === 'rtl';

  // sidebar-nav root
  return (
    <PerfectScrollbar className={navClasses} {...attributes} /*options={{ suppressScrollX: !isRtl }}*/>
      <Nav>{children || navList(navConfig.items)}</Nav>
    </PerfectScrollbar>
  );
};

export default withRouter(SidebarNav);
