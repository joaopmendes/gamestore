import React from 'react';
import SideNavigation from '../sideNavigation';
import { MDBContainer } from 'mdbreact';
import Navbar from '../../../Components/Navbar/Navbar';

const AdminLayout = ({ children }) => {
  return (
    <>
      <SideNavigation/>
        <Navbar />
      <div style={{ marginLeft: '270px', paddingTop: "2rem" }}>
        <MDBContainer>
          {children}
        </MDBContainer>
      </div>
    </>
  );
};

export default AdminLayout;
