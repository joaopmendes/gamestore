import React from 'react';
import { MDBListGroup, MDBListGroupItem, MDBIcon } from 'mdbreact';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const Brand = styled.div`
    width: 100%;
    padding: 2rem;
    h1 {
    font-size: 1.2rem;
    font-family: 'Balsamiq Sans', cursive;
    text-transform: uppercase;
    color: black;
    text-align: center;
    span {
      font-size: 1.4rem;
      color: ${props => props.theme.primary};
    }
  }
`;
const SideNavigation = () => {
  return (
    <div className="sidebar-fixed position-fixed" style={{ background: 'hsl(210, 12%, 16%)', height: "100%" }}>
      <a href="#!" className="logo-wrapper waves-effect">
        <Brand>
          <h1>
            <span>Game</span>store
          </h1>
        </Brand>
      </a>
      <MDBListGroup className="list-group-flush">
        <NavLink exact={true} to="/backoffice" style={{ background: 'hsl(210, 12%, 16%)', height: "100%" }} activeClassName="activeClass">
          <MDBListGroupItem>
            <MDBIcon icon="chart-pie" className="mr-3"/>
            Dashboard
          </MDBListGroupItem>
        </NavLink>
        <NavLink exact={true} to="/backoffice/categories" style={{ background: 'hsl(210, 12%, 16%)', height: "100%" }} activeClassName="activeClass">
          <MDBListGroupItem>
            <MDBIcon icon="chart-pie" className="mr-3"/>
            Categories
          </MDBListGroupItem>
        </NavLink>
        <NavLink exact={true} to="/backoffice/products" style={{ background: 'hsl(210, 12%, 16%)', height: "100%" }} activeClassName="activeClass">
          <MDBListGroupItem>
            <MDBIcon icon="chart-pie" className="mr-3"/>
            Products
          </MDBListGroupItem>
        </NavLink>
      </MDBListGroup>
    </div>
  );
};

export default SideNavigation;