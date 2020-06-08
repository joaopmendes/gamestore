import React, { FC, PropsWithChildren, useState } from 'react';
import { NavbarBrand } from './NavbarSC';
import {
  MDBCollapse,
  MDBDropdown,
  MDBDropdownItem, MDBDropdownMenu, MDBDropdownToggle, MDBIcon,
  MDBNavbar,
  MDBNavbarNav, MDBNavbarToggler,
  MDBNavItem,
  MDBFormInline, MDBNavLink,
} from 'mdbreact';

type Props = {}
const Navbar: FC<PropsWithChildren<Props>> = () => {
  const [open, setOpen] = useState(false);
  // const auth = useSelector((state: RootState) => state.auth)
  const auth = {
    userLoggedIn: true
  }
  return (
    <MDBNavbar color="white" light expand="md">
      <NavbarBrand>
        <span>Game</span>shop
      </NavbarBrand>
      <MDBNavbarToggler onClick={() => setOpen(!open)}/>
      <MDBCollapse id="navbarCollapse3" isOpen={open} navbar>
        <MDBNavbarNav right>
          <MDBNavItem>
            <MDBFormInline waves>
              <div className="md-form my-0">
                <input className="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search"/>
              </div>
            </MDBFormInline>
          </MDBNavItem>
          {
            auth.userLoggedIn ? (
              <>
                <MDBNavItem style={{ paddingTop: '12px' }}>
                  <MDBDropdown>
                    <MDBDropdownToggle nav caret>
                      <MDBIcon icon="user"/>
                    </MDBDropdownToggle>
                    <MDBDropdownMenu className="dropdown-default">
                      <MDBDropdownItem href="#!">Action</MDBDropdownItem>
                      <MDBDropdownItem href="#!">Another Action</MDBDropdownItem>
                      <MDBDropdownItem href="#!">Something else here</MDBDropdownItem>
                      <MDBDropdownItem href="#!">Something else here</MDBDropdownItem>
                    </MDBDropdownMenu>
                  </MDBDropdown>
                </MDBNavItem>
                <MDBNavItem style={{
                  padding: '0px 0.5rem',
                  display: 'flex',
                  justifyContent: 'end',
                  marginTop: '10px',
                }}>
                  <MDBFormInline waves>
                    <MDBIcon icon={'shopping-cart'} />
                    <span className={'ml-2'}>115.55€</span>
                  </MDBFormInline>
                </MDBNavItem>
              </>
            ) : (
              <>
                <MDBNavItem style={{
                  padding: '0px 0.5rem',
                  display: 'flex',
                  justifyContent: 'end',
                  marginTop: '10px',
                }}>
                  <MDBNavLink to={'/register'}>Register</MDBNavLink>
                </MDBNavItem>
                <MDBNavItem style={{
                  padding: '0px 0.5rem',
                  display: 'flex',
                  justifyContent: 'end',
                  marginTop: '10px',
                }}>
                  <MDBNavLink to={'/login'}>Login</MDBNavLink>
                </MDBNavItem>
              </>
            )
          }

        </MDBNavbarNav>
      </MDBCollapse>
    </MDBNavbar>
  );
};

export default Navbar;
