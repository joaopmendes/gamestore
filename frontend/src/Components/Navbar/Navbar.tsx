import React, { FC, PropsWithChildren, useState } from 'react';
import { NavbarBrand } from './NavbarSC';
import {
  MDBCollapse,
  MDBDropdown,
  MDBDropdownItem, MDBDropdownMenu, MDBDropdownToggle,
  MDBNavbar,
  MDBNavbarNav, MDBNavbarToggler,
  MDBNavItem,
  MDBNavLink, MDBNavbarBrand, MDBContainer,
} from 'mdbreact';
import {NavLink} from 'react-router-dom'
import { useSelector } from 'react-redux';
import { authSlice, getCurrentUser, isUserLoggedIn } from '../../Store/authSlice';
import { useAppDispatch } from '../../create-store.config';
import { useToasts } from 'react-toast-notifications';

type Props = {}
const Navbar: FC<PropsWithChildren<Props>> = () => {
  const dispatch = useAppDispatch();
  const { addToast } = useToasts();
  const [open, setOpen] = useState(false);
  const currentUser = useSelector(getCurrentUser);
  const isUserLogged = useSelector(isUserLoggedIn);

  return (
    <header>
      <MDBNavbar style={{ background: 'hsl(210, 12%, 16%)' }} dark expand="md">
        <MDBContainer>
          <MDBNavbarBrand href="/">
            <strong>Gameshop</strong>
          </MDBNavbarBrand>
          <MDBNavbarToggler onClick={() => setOpen(!open)}/>
          <MDBCollapse isOpen={open} navbar>
            <MDBNavbarNav right>
              {
                isUserLogged ? <>
                  <MDBNavItem>
                    <MDBDropdown>
                      <MDBDropdownToggle nav caret>
                        <div className="d-none d-md-inline">{currentUser.name}</div>
                      </MDBDropdownToggle>
                      <MDBDropdownMenu className="dropdown-default">
                        <MDBDropdownItem>
                          <NavLink to={'/notimplemented'}>Profile</NavLink>
                        </MDBDropdownItem>
                        {currentUser.admin ? <MDBDropdownItem>
                          <NavLink to={'/backoffice'}>Backoffice</NavLink>
                        </MDBDropdownItem> : null}
                        <MDBDropdownItem onClick={() => {
                          addToast('Logout successfully', { appearance: 'success' });
                          dispatch(authSlice.actions.logout());
                        }}>
                          <NavLink to={'/'}>Logout</NavLink>
                        </MDBDropdownItem>
                      </MDBDropdownMenu>
                    </MDBDropdown>
                  </MDBNavItem>
                </> : <>
                  <MDBNavItem>
                    <MDBNavLink to="/register">Sign In</MDBNavLink>
                  </MDBNavItem>
                  <MDBNavItem>
                    <MDBNavLink to="/login">Login</MDBNavLink>
                  </MDBNavItem>
                </>
              }

            </MDBNavbarNav>
          </MDBCollapse>
        </MDBContainer>
      </MDBNavbar>

    </header>
  );
};

export default Navbar;
