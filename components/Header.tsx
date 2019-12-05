import React, { useEffect } from 'react';
import Link from 'next/link';
import { Nav, Badge, Dropdown } from 'react-bootstrap';
import classNames from 'classnames';

import { AsideToggler, NavbarBrand, SidebarToggler } from '../components';

interface Props {
  className?: string;
  fixed: boolean;
  onLogout: (e: React.MouseEvent<any, MouseEvent>) => void;
}

const Header: React.FC<Props> = ({ className, fixed = false, onLogout, ...attributes }) => {
  useEffect(() => {
    const isFixed = () => {
      if (fixed) {
        document.body.classList.add('header-fixed');
      }
    };
    isFixed();
  }, [fixed]);

  const classes = classNames(className, 'app-header', 'navbar');

  return (
    <header className={classes} {...attributes}>
      <SidebarToggler className="d-lg-none" display="md" mobile />
      <NavbarBrand
        full={{
          src: '/static/images/brand/logo.svg',
          width: 89,
          height: 25,
          alt: 'CoreUI Logo',
        }}
        minimized={{
          src: '/static/images/brand/sygnet.svg',
          width: 30,
          height: 30,
          alt: 'CoreUI Logo',
        }}
      />
      <SidebarToggler className="d-md-down-none" display="lg" />
      <Nav className="d-md-down-none navbar-nav">
        <Nav.Item className="px-3">
          <Link href="/samples/dashboard">
            <a className="nav-link">Dashboard</a>
          </Link>
        </Nav.Item>
        <Nav.Item className="px-3">
          <Link href="/products">
            <a className="nav-link">Products</a>
          </Link>
        </Nav.Item>
        <Nav.Item className="px-3">
          <Link href="/samples/forms">
            <a className="nav-link">Forms</a>
          </Link>
        </Nav.Item>
      </Nav>
      <Nav className="ml-auto navbar-nav">
        <Nav.Item className="d-md-down-none">
          <Link href="#">
            <a className="nav-link">
              <i className="icon-bell" />
              <Badge pill variant="danger">
                5
              </Badge>
            </a>
          </Link>
        </Nav.Item>
        <Nav.Item className="d-md-down-none">
          <Link href="#">
            <a className="nav-link">
              <i className="icon-list" />
            </a>
          </Link>
        </Nav.Item>
        <Nav.Item className="d-md-down-none">
          <Link href="#">
            <a className="nav-link">
              <i className="icon-location-pin" />
            </a>
          </Link>
        </Nav.Item>
        <Dropdown className="nav-item mr-2">
          <Dropdown.Toggle id="" className="nav-link" as="a">
            <img src={'/static/images/avatars/6.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" />
          </Dropdown.Toggle>
          <Dropdown.Menu alignRight>
            <Dropdown.Header as="div" className="text-center">
              <strong>Account</strong>
            </Dropdown.Header>
            <Dropdown.Item>
              <i className="fas fa-bell-o" /> Updates
              <Badge variant="info">42</Badge>
            </Dropdown.Item>
            <Dropdown.Item>
              <i className="fas fa-envelope-o" /> Messages
              <Badge variant="success">42</Badge>
            </Dropdown.Item>
            <Dropdown.Item>
              <i className="fas fa-tasks" /> Tasks
              <Badge variant="danger">42</Badge>
            </Dropdown.Item>
            <Dropdown.Item>
              <i className="fas fa-comments" /> Comments
              <Badge variant="warning">42</Badge>
            </Dropdown.Item>
            <Dropdown.Header as="div" className="text-center">
              <strong>Settings</strong>
            </Dropdown.Header>
            <Dropdown.Item>
              <i className="fas fa-user" /> Profile
            </Dropdown.Item>
            <Dropdown.Item>
              <i className="fas fa-wrench" /> Settings
            </Dropdown.Item>
            <Dropdown.Item>
              <i className="fas fa-usd" /> Payments
              <Badge variant="secondary">42</Badge>
            </Dropdown.Item>
            <Dropdown.Item>
              <i className="fas fa-file" /> Projects
              <Badge variant="primary">42</Badge>
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item>
              <i className="fas fa-shield" /> Lock Account
            </Dropdown.Item>
            <Dropdown.Item onClick={(e: React.MouseEvent<any, MouseEvent>) => onLogout(e)}>
              <i className="fas fa-lock" /> Logout
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Nav>
      <AsideToggler className="d-md-down-none" />
    </header>
  );
};

export default Header;
