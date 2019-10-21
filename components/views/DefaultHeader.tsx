import React from 'react';
import Link from 'next/link';
import { Badge, UncontrolledDropdown, DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem } from 'reactstrap';

import { AsideToggler, NavbarBrand, SidebarToggler } from '../../components';
// import logo from '../../static/images/brand/logo.svg';
// import sygnet from '../../static/images/brand/sygnet.svg';

interface Props {
  onLogout: (e: React.MouseEvent<any, MouseEvent>) => void;
}

const DefaultHeader: React.FC<Props> = ({ onLogout }) => (
  <>
    <SidebarToggler className="d-lg-none" display="md" mobile />
    <NavbarBrand
      full={{ src: '/static/images/brand/logo.svg', width: 89, height: 25, alt: 'CoreUI Logo' }}
      minimized={{ src: '/static/images/brand/sygnet.svg', width: 30, height: 30, alt: 'CoreUI Logo' }}
    />
    <SidebarToggler className="d-md-down-none" display="lg" />

    <Nav className="d-md-down-none" navbar>
      <NavItem className="px-3">
        <Link href="/dashboard">
          <a className="nav-link">Dashboard</a>
        </Link>
      </NavItem>
      <NavItem className="px-3">
        <Link href="/users">
          <a className="nav-link">Users</a>
        </Link>
      </NavItem>
      <NavItem className="px-3">
        <Link href="#">
          <a className="nav-link">Settings</a>
        </Link>
      </NavItem>
    </Nav>
    <Nav className="ml-auto" navbar>
      <NavItem className="d-md-down-none">
        <Link href="#">
          <a className="nav-link">
            <i className="icon-bell" />
            <Badge pill color="danger">
              5
            </Badge>
          </a>
        </Link>
      </NavItem>
      <NavItem className="d-md-down-none">
        <Link href="#">
          <a className="nav-link">
            <i className="icon-list" />
          </a>
        </Link>
      </NavItem>
      <NavItem className="d-md-down-none">
        <Link href="#">
          <a className="nav-link">
            <i className="icon-location-pin" />
          </a>
        </Link>
      </NavItem>
      <UncontrolledDropdown nav direction="down">
        <DropdownToggle nav>
          <img src={'../../static/images/avatars/6.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" />
        </DropdownToggle>
        <DropdownMenu right>
          <DropdownItem header tag="div" className="text-center">
            <strong>Account</strong>
          </DropdownItem>
          <DropdownItem>
            <i className="fa fa-bell-o" /> Updates<Badge color="info">42</Badge>
          </DropdownItem>
          <DropdownItem>
            <i className="fa fa-envelope-o" /> Messages<Badge color="success">42</Badge>
          </DropdownItem>
          <DropdownItem>
            <i className="fa fa-tasks" /> Tasks<Badge color="danger">42</Badge>
          </DropdownItem>
          <DropdownItem>
            <i className="fa fa-comments" /> Comments<Badge color="warning">42</Badge>
          </DropdownItem>
          <DropdownItem header tag="div" className="text-center">
            <strong>Settings</strong>
          </DropdownItem>
          <DropdownItem>
            <i className="fa fa-user" /> Profile
          </DropdownItem>
          <DropdownItem>
            <i className="fa fa-wrench" /> Settings
          </DropdownItem>
          <DropdownItem>
            <i className="fa fa-usd" /> Payments<Badge color="secondary">42</Badge>
          </DropdownItem>
          <DropdownItem>
            <i className="fa fa-file" /> Projects<Badge color="primary">42</Badge>
          </DropdownItem>
          <DropdownItem divider />
          <DropdownItem>
            <i className="fa fa-shield" /> Lock Account
          </DropdownItem>
          <DropdownItem onClick={e => onLogout(e)}>
            <i className="fa fa-lock" /> Logout
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    </Nav>
    <AsideToggler className="d-md-down-none" />
  </>
);

export default DefaultHeader;
