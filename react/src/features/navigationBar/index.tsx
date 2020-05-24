import React from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector } from 'react-redux';

import { AppState } from '../../app/redux/root-reducer';
import NavList, { left, right, NavListType } from './NavList';

import './index.css';

const NavItems: React.FC<{ navList: NavListType }> = ({ navList }) => (
  <>
    {navList
      .map((item) => (
        'address' in item
          ? (
            <LinkContainer to={item.address} key={item.id}>
              <Nav.Link>{item.name}</Nav.Link>
            </LinkContainer>
          )
          : (
            <NavDropdown title={item.name} id={`${item.id}-nav-dropdown`} key={item.id}>
              {item.subtab.map((subitem) => (
                <LinkContainer to={subitem.address} key={subitem.id}>
                  <NavDropdown.Item>{subitem.name}</NavDropdown.Item>
                </LinkContainer>
              ))}
            </NavDropdown>
          )
      ))}
  </>
);

const NavBar: React.FC = () => {
  const group = useSelector((state: AppState) => state.login.group);

  const currentNavList = NavList
    .filter((item) => item.groups.includes(group));

  const brand = 'Grocery';

  return (
    <Navbar variant="dark" collapseOnSelect expand="sm">
      <LinkContainer to="/">
        <Navbar.Brand href="/">{brand}</Navbar.Brand>
      </LinkContainer>
      <Navbar.Toggle aria-controls="main-navbar-nav" />
      <Navbar.Collapse id="main-navbar-nav">
        <Nav className="mr-auto">
          <NavItems navList={currentNavList.filter((item) => item.float === left)} />
        </Nav>
        <Nav>
          <NavItems navList={currentNavList.filter((item) => item.float === right)} />
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
